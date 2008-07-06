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

class DocRevision(db.Model):
  hash    = db.StringProperty()
  owner   = db.UserProperty()
  session = db.StringProperty()
  name    = db.StringProperty()
  data    = db.TextProperty()
  version = db.IntegerProperty()
  lastUpdate = db.DateTimeProperty(auto_now_add=True)
  def forJSON(self):
    return {'data' : ''+self.data , 'name' : self.name , 'version' : self.version}

class MainPage(webapp.RequestHandler):

  def randomHash(self):
    return hashlib.sha1(str(random.random())).hexdigest();

  def get(self):
    user = users.get_current_user()

    docHash = self.request.get('id');

    isTest  = self.request.get('test');
    
    if docHash is None or docHash == "":
      self.redirect('/?id='+self.randomHash())
    else:

      newId     = self.randomHash();
      guidBase  = self.randomHash();
      now       = int(time.time() * 1000) + 2000;
      sessionId = self.randomHash();

      #if user:
      self.response.headers['Content-Type'] = 'text/html'

      template_file = 'index.t.html.mini';
      if self.request.get('test') == '1':
        template_file = 'index.t.html'
        
      path = os.path.join(os.path.dirname(__file__), template_file)
      self.response.out.write(template.render(path, { 'docId' : docHash , 'newId' : newId, 'guidBase' : guidBase, 'nowMilliseconds': now, "sessionId" : sessionId, "isTest" : isTest }))
      #else:
      #  self.redirect(users.create_login_url(self.request.uri))

class AddData(webapp.RequestHandler):
  def post(self):
    user = users.get_current_user()
    #if user:

    key     = 'version'

    version = memcache.get(key)

    if version is None:
      version = 1 + int(time.time());
      memcache.set(key, version)
    else:
      # incr doesnt work :(
      # version = memcache.incr(key)
      version = int(memcache.get(key))
      version = version + 1
      memcache.set(key, version)
      
    rev = DocRevision()
    rev.owner   = user
    rev.hash    = self.request.get('hash')
    rev.name    = self.request.get('name').decode('utf-8');
    
    rev.data    = self.request.get('data').decode('utf-8');
    rev.session = self.request.get('session')
    logging.info("Saving data "+rev.hash)
    rev.put()
    rev.version = int(version)
    rev.put()
    self.response.out.write(json.write({}))
      
    #else:
    #  self.response.out.write(json.write({error: "need login"}))
      
class FetchData(webapp.RequestHandler):
  def get(self):
    user = users.get_current_user()
    #if user:
    docHash    = self.request.get('hash')
    session    = self.request.get('session')
    maxVersion = int(self.request.get('max_version'))

    logging.info(maxVersion)
      
    revs       = []
    if maxVersion > 0:
      revs = DocRevision.gql('WHERE hash = :1 AND version > :2 ORDER BY version', docHash, maxVersion).fetch(10)
    else:
      revs = DocRevision.gql("WHERE hash = :1 ORDER BY version DESC", docHash).fetch(1) #WHERE owner = :1, user

    rows = [];

    for rev in revs:
      if maxVersion == 0 or rev.session != session: # filter my own rows (cant do this in the query because of GQL limitations)
        rows.append(rev.forJSON())

    data = {'data' : rows }
      
    self.response.out.write(json.write(data))
    #else:
    #  self.response.out.write(json.write({error: "need login"}))

class FetchCustomShape(webapp.RequestHandler):
  def get(self):
          
    self.response.out.write('{"__CLASS__":"block::ui::CustomShape","_name": "Test", _html: "<table width=100% height=100% style=\'background-color: red\'><tr><td valign=center align=center class=textField></td></tr></table>"}')

def main():
  application = webapp.WSGIApplication(
                                       [('/', MainPage),
                                        ('/add', AddData),
                                        ('/fetch', FetchData),
                                        ('/shape', FetchCustomShape)],
                                       debug=True)
  wsgiref.handlers.CGIHandler().run(application)

if __name__ == "__main__":
  main()
