JooseGearsInitializeGears()

Module("block.ui", function (m) {
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
            }
        },
        
        methods: {
            
            delayedUpdate: function () {
                var me = this;
                
                window.setTimeout(function syncUpdate () {
                    me.update()
                }, 2000) 
            },
            
            startListening: function ()  {
                var me = this;
                
                window.setInterval(function recoverTimer () {
                    var last = me.setSyncTime();
                    var now  = new Date().getTime();
                    
                    if(now - last > 35000) { // restart syncing if there was not update in 35 seconds
                        me.update()
                    }  
                    
                }, 5000)
            },
            
            update: function () {
                this.getSyncTime(new Date().getTime())
                this.fetchStates();
            },
            
            updateFromArray: function (updates) {
                var me = this;
                for(var i = 0; i < updates.length; i++) {
                    var update = updates[i];
                    console.log("Update from version "+update.version)
                    me.setMaxVersion(update.version);
                    var doc = update.data
                    
                    me.updateDocument(doc)
                }    
                
                
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
                                dest.add(cur)
                            }
                        }
                    } else {
                        console.log("Insert")
                        var dest
                        if(container === state) { // root
                            dest = document.shapes
                        } else {
                            dest = map[container.getGuid()]
                        }
                        if(!shape.isDeleted()) {
                            shape.registerGuid()
                            dest.addAndDraw(shape)
                        }
                    }
                });
                
                if(this.getFirstUpdate()) {
                    window.onfirstdraw();
                    this.setFirstUpdate(false)
                }
                
            },
            
            fetchStates: function () {
                return m.SyncDocument.fetchNewData(this)
            },
            
            _saveState: function () {
                return m.SyncDocument.addData(this, false)
            },
            
            saveState: function () {
                if(document.manager.getDirty()) {
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
            
                var dataArray = [];
                var rows      = []
            
                var doc = sync.getDoc()
            
                this.request("GET", "/fetch",
                    {
                        hash:        doc.getId(),
                        max_version: (sync.getMaxVersion() || 0),
                        session:     document.paras.sessionId,
                        no_cache:    Math.random()
                    },
                    function updateData (data) {
                        console.log("Got data "+data + data.data.length)
                        rows = data.data
            
                        for(var i = 0; i < rows.length; i++) {
                            console.log("Row version "+rows[i].version)
                            dataArray.push({
                                data:    JSON.parse(rows[i].data),
                                version: rows[i].version
                            });
                    
                        }
                        sync.updateFromArray(dataArray)
                    })
                
                
            },
            
            addData: function (sync, isSavePoint) {
                var me   = new m.SyncDocument();
                var doc  = sync.getDoc();
                
                var data = JSON.stringify(sync.getDoc());
    
                this.request("POST", "/add",
                    {
                        hash:         doc.getId(),
                        data:         data,
                        is_savepoint: isSavePoint,
                        name:         doc.getHeader().getTitle(),
                        session:      document.paras.sessionId
                    },
                    function saveMessage () {
                        console.log("save successful")
                    });
            },
            
            request: function (method, url, data, callback) {
                Joose.Gears.ajaxRequest(method, url, data, function receivedData (data) {
                    callback(JSON.parse(data))
                })
            }
        }
        
    });
    

});