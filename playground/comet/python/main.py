#!/usr/bin/env python

import os
import time
import logging
import hashlib
import random

import wsgiref.handlers

from google.appengine.api import users
from google.appengine.ext import webapp
from google.appengine.ext import db

from google.appengine.ext.webapp import template

from google.appengine.api import memcache

import json

# Dear reader: I learned just as much Python to get this somewhat working. I'm sorry.

class ClientActivity(db.Model):
  clientId    = db.StringProperty() # use if *Id is unfortunate
  referrer    = db.StringProperty()
  created     = db.DateTimeProperty(auto_now_add=True)

class Subscription(db.Model):
  client        = db.StringProperty()
  subscription  = db.StringProperty()
  creationTime  = db.IntegerProperty()

class JSONOrJSONPHandler(webapp.RequestHandler):

  def sendError(self,message):
    
    self.sendResponse({ 'isError': True, 'message': message })

  def sendResponse(self, data):
  
    requestStrategy = self.request.get("__STRATEGY__");
    callback        = self.request.get("callback");
    jsonString = json.write(data)
    
    # TODO add mime-types
    if requestStrategy == 'script':
      self.response.out.write('window.Addressable.ScriptRequest.Requests["'+self.request.get('__REQUEST__ID__')+'"].callback('+jsonString+')')
    else:
      if callback is not None and callback != "":
        self.response.out.write(callback+"("+jsonString+")")
      else:
        self.response.out.write(jsonString)

class ClientConnect(JSONOrJSONPHandler):

  def randomHash(self):
    return hashlib.sha1(str(random.random())).hexdigest();

  def get(self):
    id = self.randomHash();
    
    host = "universal-comet.appspot.com"
    if self.request.get("__test__") == "1":
      host = "self:8084"
    
    url  = "http://"+host+"/message/" + id
    
    self.sendResponse({ 'url' : url, 'id' : id })

class Subscribe(JSONOrJSONPHandler):

  def get(self,id,scope):
    
    if scope == "":
      return sendError("Need scope parameter.")
    
    key = "key:"+id+"/"+scope
    
    sub              = Subscription.get_or_insert(key)
    sub.client       = id;
    sub.subscription = scope;
    sub.creationTime = int(time.clock());
    sub.put()
    
    self.sendResponse({ 'success' : True })
	
class SendRequest(JSONOrJSONPHandler):

  def sendMessage(self, id, channel, message):
    key   = "client-"+id;
    
    logging.info("Sending to key "+key)

    requests = memcache.get(key)
    
    if requests is None: # racy
      self.response.set_status(404, "Client not found.")
      self.response.out.write("Client not found")
      return
    
    path = self.request.path.replace("/message/"+id, "", 1)
    
    url  = path + "?" + self.request.query_string
    
    requests.append({ 'url' : url, 'remote_addr' : self.request.remote_addr, 'message' : message, 'channel' : channel });
    memcache.set(key, requests)


  def get(self,id):
  
    (id,channel) = id.split("-");
    
    message  = self.request.get("message");
    
    self.sendMessage(id, channel, message)
          
    self.sendResponse({ 'success' : True })

class PostToSubscription(SendRequest):
  
  def get(self,scope):
  
    message  = self.request.get("message");
    
    expiration = int(time.clock() - 5 * 60);
    
    subscriptions = Subscription.gql("WHERE subscription = :1 AND creationTime > :2", scope, expiration);
    
    count = 0;
    for sub in subscriptions:
      (id,channel) = sub.client.split("-");
      self.sendMessage(id, channel, message)
      count = count + 1
    
    self.sendResponse({ 'success' : True, 'count' : count }) # TODO remove count from response
      
  
class Listen(JSONOrJSONPHandler):
  def get(self):
    
    ids = self.request.get("ids").split(",")

    res = {};
    for id in ids:
      key  = "client-"+id
      logging.info("Listening to key "+key)
      jobs = memcache.get(key)
      memcache.set(key, [])
      res[id] = jobs
      
      count = int(self.request.get("count"))
      if count == 0: # log activity on the first request of a client in a particular session
        activity          = ClientActivity()
        activity.clientId = id;
        activity.referrer = self.request.get("referrer")
        activity.put()
    
    self.sendResponse(res)
    

class Redirect(webapp.RequestHandler):
  def get(self):
    self.redirect("/static/demo/client.html")

def main():
  application = webapp.WSGIApplication(
                                       [
                                         ('/', Redirect),
                                         ('/connect', ClientConnect),
                                         ('/listen', Listen),
                                         (r'/subscribe/(\w+-*\w*)/(.+)', Subscribe),
                                         (r'/post/(.+)', PostToSubscription),
                                         (r'/message/(\w+-*\w*)', SendRequest)
                                       ],
                                       debug=True)
  wsgiref.handlers.CGIHandler().run(application)

if __name__ == "__main__":
  main()
