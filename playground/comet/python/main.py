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
  clientId    = db.StringProperty()
  referrer    = db.StringProperty()
  created     = db.DateTimeProperty(auto_now_add=True)

class ClientConnect(webapp.RequestHandler):

  def randomHash(self):
    return hashlib.sha1(str(random.random())).hexdigest();

  def get(self):
    id = self.randomHash();
    
    url  = "http://self:8084"+"/get/" + id
    
    requestStrategy = self.request.get("__STRATEGY__");
    
    jsonString = json.write({ 'url' : url, 'id' : id })
    
    if requestStrategy == 'script':
      self.response.out.write('window.Addressable.ScriptRequest.Requests["'+self.request.get('__REQUEST__ID__')+'"].callback('+jsonString+')')
    else:
      self.response.out.write(jsonString)

class SendRequest(webapp.RequestHandler):

  def get(self,id):
  
    (id,channel) = id.split("-");
  
    key   = "client-"+id;
    
    logging.info("Sending to key "+key)
    
    paras = {}
    for name in self.request.arguments():
      paras[name] = self.request.get(name);
    
    requests = memcache.get(key)
    
    if requests is None: # racy
      self.response.set_status(404, "Client not found.")
      self.response.out.write("Client not found")
      return
    
    path = self.request.path.replace("/get/"+id, "", 1)
    
    url  = path + "?" + self.request.query_string
    
    requests.append({ 'url' : url, 'remote_addr' : self.request.remote_addr, 'paras' : paras, 'channel' : channel });
    memcache.set(key, requests)
      
    self.response.out.write("Message Queued")
    
class Listen(webapp.RequestHandler):
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
      if count % 100 == 0:
        activity          = ClientActivity()
        activity.clientId = id;
        activity.referrer = self.request.get("referrer")
        activity.put()
    
    requestStrategy = self.request.get("__STRATEGY__");
    
    jsonString = json.write(res)
    
    logging.info(jsonString)
    
    if requestStrategy == 'script':
      self.response.out.write('window.Addressable.ScriptRequest.Requests["'+self.request.get('__REQUEST__ID__')+'"].callback('+jsonString+')')
    else:
      self.response.out.write(jsonString)
    
    
    count = int(self.request.get("count"))
    
    

class Redirect(webapp.RequestHandler):
  def get(self):
    self.redirect("/s/demo/client.html")

def main():
  application = webapp.WSGIApplication(
                                       [
                                         ('/', Redirect),
                                         ('/connect', ClientConnect),
                                         ('/listen', Listen),
                                         (r'/get/(\w+-*\w*)', SendRequest)
                                       ],
                                       debug=True)
  wsgiref.handlers.CGIHandler().run(application)

if __name__ == "__main__":
  main()
