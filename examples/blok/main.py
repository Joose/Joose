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

  def infoJSON(self):
    return {'name' : self.name , 'hash' : self.hash , 'version' : self.version , 'lastUpdate' : str(self.lastUpdate)}

class SavedDoc(db.Model):
  hash    = db.StringProperty()
  owner   = db.UserProperty()
  session = db.StringProperty()
  def forJSON(self):
    return {'hash' : ''+self.hash}

class Gadget(webapp.RequestHandler):

  def get(self):
    user = users.get_current_user()

    docHash = self.request.get('id');

    template_file = 'gadget.t.xml';
    path          = os.path.join(os.path.dirname(__file__), template_file)

    self.response.headers['Content-Type'] = 'text/xml'
    self.response.out.write(template.render(path, { 'docId' : docHash }))
   
class MainPage(webapp.RequestHandler):

  def randomHash(self):
    return hashlib.sha1(str(random.random())).hexdigest();

  def get(self):
    user = users.get_current_user()

    docHash  = self.request.get('id');
    isTest   = self.request.get('test');
    isBlank  = self.request.get('blank')
    isGadget = self.request.get('gadget')
    gadgetLibs = self.request.get('libs')

    if(gadgetLibs is not None and gadgetLibs != ""):
      gadgetLibs = gadgetLibs.split(",")
    
    if docHash is None or docHash == "":
      uri = '/?id='+self.randomHash()
      if self.request.get('template') != "":
        uri = uri + "&template=" + self.request.get('template')
      self.redirect(uri)
    else:

      userName = "";
      
      if user:
        userName = user.nickname()

      newId     = self.randomHash();
      guidBase  = self.randomHash();
      now       = int(time.time() * 1000);
      sessionId = self.randomHash();

      self.response.headers['Content-Type'] = 'text/html'

      template_file = 'index.t.html.mini';
      if self.request.get('test') == '1':
        template_file = 'index.t.html'
        
      path = os.path.join(os.path.dirname(__file__), template_file)
      self.response.out.write(template.render(path, { 'docId' : docHash , 'userName' : userName, 'newId' : newId, 'guidBase' : guidBase, 'nowMilliseconds': now, "sessionId" : sessionId, "isTest" : isTest, "isBlank" : isBlank, "isGadget" : isGadget, 'gadgetLibs' : gadgetLibs }))

class Login(webapp.RequestHandler):
  def get(self):
    user = users.get_current_user()

    uri  = self.request.get("continue")
    
    if user:
      self.redirect(uri)
    else:
      self.redirect(users.create_login_url(uri))


class SaveDocument(webapp.RequestHandler):
  def get(self):
    user = users.get_current_user()
    if user:

      docHash = self.request.get('hash');

      exists  = False
      docs    = SavedDoc.gql("WHERE owner = :1 AND hash = :2", user, docHash)
      for doc in docs:
        exists = True;
        break;
      
      if not exists:
        doc = SavedDoc();
        doc.hash  = docHash;
        doc.owner = user;
        doc.put()

      self.response.out.write(json.write({ 'success' : True }))
    else:
      self.response.out.write(json.write({ 'error' : "no_login" }))

class GetSavedDocuments(webapp.RequestHandler):
  def get(self):
    user = users.get_current_user()
    if user:
      
      docs = SavedDoc.gql('WHERE owner = :1', user).fetch(100)

      data = []

      for doc in docs:
        # find the current revision
        if doc.hash != "":
          revs  = DocRevision.gql("WHERE hash = :1 ORDER BY version DESC", doc.hash).fetch(1)
          for rev in revs:
            data.append(rev.infoJSON())

      self.response.out.write(json.write(data))
      
    else:
      self.response.out.write(json.write({ 'error' : "no_login" }))

class AddData(webapp.RequestHandler):
  def post(self):
    user = users.get_current_user() # optional

    key     = 'version'

    version = memcache.get(key)

    if version is None:
      version = 1 + int(time.time());
      memcache.set(key, version)
    else:
      version = memcache.incr(key)

    docHash = self.request.get('hash');
    
    rev = DocRevision()
    rev.owner   = user
    rev.hash    = docHash
    rev.name    = self.request.get('name').decode('utf-8');
    
    rev.data    = self.request.get('data').decode('utf-8');
    rev.session = self.request.get('session')
    logging.info("Saving data "+rev.hash)
    rev.version = int(version)
    rev.put()
    self.response.out.write(json.write({}))


    # cleanup old versions
    revs = DocRevision.gql("WHERE hash = :1 ORDER BY version DESC", docHash).fetch(40)

    count = 0;
    for rev in revs:
      if count > 20: # skip entries that might still be needed by other users
        rev.delete()
      count = count + 1
      
class FetchData(webapp.RequestHandler):
  def get(self):
    user = users.get_current_user()
    #if user:
    docHash    = self.request.get('hash')
    session    = self.request.get('session')
    maxVersion = int(self.request.get('max_version'))

    logging.info(maxVersion)

    i = 0;

    found = False;

    logging.info("Looking for data "+str(i))

    newMaxVersion = 0;
      
    revs       = []
    if maxVersion > 0:
      revs  = DocRevision.gql('WHERE hash = :1 AND version > :2 ORDER BY version', docHash, maxVersion).fetch(10)
    else:
      revs  = DocRevision.gql("WHERE hash = :1 ORDER BY version DESC", docHash).fetch(1) #WHERE owner = :1, user
      found = True

    rows = [];
      

    for rev in revs:
      newMaxVersion = rev.version;
      if maxVersion == 0 or rev.session != session: # filter my own rows (cant do this in the query because of GQL limitations)
        rows.append(rev.forJSON())
        found = True;
      else:
        logging.info("ignoring row because it is my own: " + session + " = " + rev.session + ";")

    data = {'data' : rows , 'max_version' : newMaxVersion }
      
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
                                        ('/gadget.xml', Gadget),
                                        ('/shape', FetchCustomShape),
                                        ('/login', Login),
                                        ('/documents', GetSavedDocuments),
                                        ('/save', SaveDocument)],
                                       debug=True)
  wsgiref.handlers.CGIHandler().run(application)

if __name__ == "__main__":
  main()
