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
   
class HandleClientRequest(webapp.RequestHandler):

  def randomHash(self):
    return hashlib.sha1(str(random.random())).hexdigest();

  def get(self):
  
    if memcache.get('id') is None: # racy
      memcache.set('id', 0);
    
    reqid   = memcache.incr('id');
    data    = { };
    
    for name in self.request.arguments():
      data[name] = self.request.get_all(name);
    
    request = { 'url' : self.request.url, 'requestId': reqid, 'method': 'GET', 'data' : data};
    
    jsonStr = json.write(request)
    
    memcache.set("request"+str(reqid), jsonStr)

    response = ''
    
    time.sleep(0.1) # sleep an initail 100 millis
    
    slepped = 0;
    sleep   = 0.2;
    while True:
      key      = "response"+str(reqid)
      response = memcache.get(key)
      if response is not None:
        memcache.delete(key)
        break
      if slepped < 5:
        time.sleep(sleep)
        slepped = slepped + sleep
      else:
        break
    
    if response is not None:
      if response['body'] is not None:
        self.response.out.write(response['body'])

class Listen(webapp.RequestHandler):
  def post(self):
    sleep   = 1;
    slepped = 0;
    while True:
      cur     = memcache.get('id')
      if cur is None:
        cur   = 0
      key     = 'request'+str(cur);
      request = memcache.get(key)
      if request is not None:
        memcache.delete(key);
        self.response.out.write(request)
        return
          
      if slepped >= 0:
        break
      slepped = slepped + sleep
      time.sleep(sleep);
    
    self.response.out.write('{}')
    
class Response(webapp.RequestHandler):
  def post(self):
    reqid  = self.request.get('requestId')
    header = self.request.get('header')
    body   = self.request.get('body')
    
    response = { 'requestId': reqid, 'header': header, 'body': body }
    
    memcache.set('response'+reqid, response);
    
    self.response.out.write("OK")

class Redirect(webapp.RequestHandler):
  def get(self):
    self.redirect("/static/server.html")

def main():
  application = webapp.WSGIApplication(
                                       [
                                         ('/', Redirect),
                                         ('/listen', Listen),
                                         ('/response', Response),
                                         ('/request', HandleClientRequest)
                                       ],
                                       debug=True)
  wsgiref.handlers.CGIHandler().run(application)

if __name__ == "__main__":
  main()
