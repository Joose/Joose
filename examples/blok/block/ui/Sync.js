JooseGearsInitializeGears()

Module("block.ui", function (m) {
    
    var updateTimer;
    
    Class("Sync", {
        
        has: {
            _maxVersion: {
                is: "rw",
                init: 0
            },
            _doc: {
                is: "rw"
            },
            
            _firstUpdate: {
                is: "rw",
                init: true
            },
            
            _syncInterval: {
                is: "rw"
            },
            
            _syncTime: {
                is: "rw"
            },
            
            _saveTimeout: {
                is: "rw"
            }
        },
        
        methods: {
            
            delayedUpdate: function () {
                var me = this;
                
                clearTimeout(updateTimer);
                
                updateTimer = window.setTimeout(function syncUpdate () {
                    me.update()
                }, 5000) 
            },
            
            startListening: function ()  {
                var me = this;
                
                // Make sure we do an update at least every 20 seconds
                // This only fires if there was an error on a previous update
                // and no next update was triggered
                window.setInterval(function recoverTimer () {
                    var last = me.getSyncTime();
                    var now  = new Date().getTime();
                    
                    if(now - last > 20000) { // restart syncing if there was no update in 20 seconds
                        me.update()
                    }  
                    
                }, 5000)
            },
            
            update: function () {
                this.setSyncTime(new Date().getTime())
                this.fetchStates();
            },
            
            updateFromArray: function (updates) {
                var me = this;
                for(var i = 0; i < updates.length; i++) {
                    var update = updates[i];
                    console.log("Update from version "+update.version)
                    
                    var doc = update.data
                    
                    me.updateDocument(doc)
                }    
                
                this.fireFirstDraw()
                
                // Request next Update
                this.delayedUpdate()
            },
            
            updateDocument: function (doc) {
                console.log("Got something new!")
                var cur;
                var state = doc.getBody()
                
                var newTitle = doc.getHeader().getTitle();
                if(newTitle != null) {
                    this.getDoc().getHeader().setTitle(newTitle)
                }
                
                state.traverse(function updateDocVisitor (shape, container) {
                    var map = document.manager.shapeByGuidMap
                    var cur = map[shape.getGuid()]
                    if(cur) {
                        console.log("Update")
                        if(!cur.isDeleted()) {
                            cur.updateFrom(shape)
                            // if we changed the hierarchy
                        
                            if(cur.getContainer().getGuid() != container.getGuid()) {
                                cur.getContainer().removeElement(cur)
                                var dest = map[container.getGuid()];
                                if(dest) {
                                    dest.add(cur)
                                } else {
                                    console.log("Cannot find "+container.getGuid())
                                }
                            }
                        }
                    } else {
                        console.log("Insert")
                        var dest
                        if(container === state) { // root
                            dest = document.shapes
                        } else {
                            dest = map[container.getGuid()]
                            if(dest) {
                                   dest.add(cur)
                            } else {
                                  console.log("Cannot find "+container.getGuid())
                            }
                        }
                        if(!shape.isDeleted()) {
                            shape.registerGuid()
                            dest.addAndDraw(shape)
                        }
                    }
                });
                
            },
            
            fireFirstDraw: function () {
                if(this.getFirstUpdate()) {
                    window.onfirstdraw();
                    this.setFirstUpdate(false)
                }
            },
            
            fetchStates: function () {
                return m.SyncDocument.fetchNewData(this)
            },
            
            _saveState: function () {
                var timer = this.getSaveTimeout();
                if(timer) {
                    clearTimeout(timer)
                }
                
                var me = this;
                this.setSaveTimeout(
                    window.setTimeout(
                        function () {
                            m.SyncDocument.addData(me, false)
                        },
                        2000)
                    )
            },
            
            saveState: function () {
                if(document.manager.getDirty()) {
                    this.delayedUpdate() // saving state delays update
                    saveMessage("Saving...")
                    this._saveState()
                    document.manager.setDirty(false)
                }
            },
            
            savePermanent: function () {
                return m.SyncDocument.addData(this, true)
            },
            
            syncedTime: function () {
                return new Date().getTime()
            }
        }
    });
 
    
    Class("SyncDocument", {
        
        classMethods: {
            fetchNewData: function (sync) {
            
                var dataArray  = [];
                var rows       = []
            
                var doc        = sync.getDoc()
                var maxVersion = sync.getMaxVersion() || 0;
            
                this.request("GET", "/fetch",
                    {
                        hash:        doc.getId(),
                        max_version: maxVersion,
                        session:     document.paras.sessionId,
                        no_cache:    Math.random()
                    },
                    function updateData (data) {
                        console.log("Got data "+data + " Length: "+data.data.length + " (Requested from version "+maxVersion+"/"+Math.round(document.manager.syncedTime()/1000)+")")
                        rows = data.data
                        
                        var newMaxVersion = data.max_version;
            
                        for(var i = 0; i < rows.length; i++) {
                            console.log("Row version "+rows[i].version)
                            dataArray.push({
                                data:    JSON.parse(rows[i].data),
                                version: rows[i].version
                            });
                    
                        }
                        sync.updateFromArray(dataArray)
                        if(newMaxVersion > 0) {
                            sync.setMaxVersion(newMaxVersion);
                        }
                    })
                
                
            },
            
            addData: function (sync, isSavePoint) {
                var me   = new m.SyncDocument();
                var doc  = sync.getDoc();
                
                var data = JSON.stringify(sync.getDoc());
                
                //console.log(data)
    
                this.request("POST", "/add",
                    {
                        hash:         doc.getId(),
                        data:         data,
                        is_savepoint: isSavePoint,
                        name:         doc.getHeader().getTitle(),
                        session:      document.paras.sessionId
                    },
                    function saveMessage () {
                        window.saveMessage("Saved")
                        console.log("save successful")
                    });
            },
            
            request: function (method, url, data, callback) {
                try {
                    Joose.Gears.ajaxRequest(method, url, data, function receivedData (data) {
                        // console.log(data)
                        callback(JSON.parse(data))
                    }, function onError (request) {
                        console.log("Error fetching url "+request.url+". Response code: " + request.status + " Response text: "+request.responseText)
                    })
                } catch (e) {
                    console.log(e)
                }
            }
        }
        
    });
    

});