Module("block.ui", function () {
    
    var focusTimeout;
    
    
    Class("Manager", {
        has: {
            _focusElement: {
                is: "ro"
            },
            _zIndex: {
                is:   "rw",
                init: 10
            },
            _tempStore: {
                is: "rw"
            },
            currentKeyCode: {
                is: "rw"
            },
            dirty: {
                is: "rw",
                init: false
            },
            shapeByGuidMap: {
                is: "rw",
                init: function () { return {} }
            }
        },
        after: {
            initialize: function () {
                var me  = this;
                var win = $(window);
                win.keydown(function keydown (event) {
                    me.setCurrentKeyCode(event.keyCode)
                })
                win.keyup(function keyup () {
                    me.setCurrentKeyCode(null)
                })
            },
            
            setDirty: function () {
                saveMessage("Unsaved")
            }
        },
        methods: {
            clearFocus: function () {
                
                if(focusTimeout) { // If focus was set asynchronously, clear the timeout
                    clearTimeout(focusTimeout)
                }
                
                if(this._focusElement) {
                    this._focusElement.blur()
                }
                this._focusElement = null
                
                document.propPanel.hide()
            },
            
            // Use when switching focus multiple times to avoid actually doing it every time
            asyncSwitchFocus: function () {
                if(focusTimeout) {
                    clearTimeout(focusTimeout)
                }
                var me   = this;
                var args = arguments
                focusTimeout = setTimeout(function () {
                    me.switchFocus.apply(me, args)
                }, 0)
            },
            
            switchFocus: function (newEle, shiftDown) {
                if(this._focusElement === newEle) {
                    if(shiftDown) {
                        this.clearFocus()
                    }
                    return
                }
                if(this._focusElement) {
                    if(shiftDown) {
                        if(!this._focusElement.meta.isa(block.ui.shape.SelectionGroup)) {
                            var before = this._focusElement;
                            before.blur()
                            this._focusElement = new block.ui.shape.SelectionGroup();
                            this._focusElement.add(before)
                        }
                        this._focusElement.add(newEle)
                        
                        this._focusElement.draw()
                        this._focusElement.redraw();
                        this._focusElement.focus()
                        document.propPanel.setShape(this._focusElement);
                        return
                    } else {
                        this._focusElement.blur()
                    }
                }
                this._focusElement = newEle
                newEle.focus()
                document.propPanel.setShape(newEle);
            },
            
            selectAll: function () {
                var group = new block.ui.shape.SelectionGroup();
                var eles  = document.shapes.getElements();
                Joose.A.each(eles, function (shape) {
                    group.add(shape);
                })
                group.draw()
                group.redraw()
                this.switchFocus(group)
            },
            
            setupShortcuts: function () {
                var me = this;
                var options = {
                    disableInInput: true
                };
                
                var copy = function() {
                    var f = me.getFocusElement();
                    if(f) {
                        me.copy(f)
                    }
                };
                var cut = function() {
                    var f = me.getFocusElement();
                    if(f) {
                        me.copy(f)
                        f.destroy()
                    }
                };
                var paste = function() {
                    me.paste()
                };
                var selectAll = function () {
                    me.selectAll()
                };
                var clearSelection = function () {
                    me.clearFocus()
                }
                var destroy = function () {
                    var cur = me.getFocusElement();
                    if(cur) {
                        cur.destroy()
                    }
                };
                
                var save = function () {
                    saveDocument()
                };
                
                var openDocs = function () {
                    loadDocuments()
                }
                
                
                var undo = function () {
                    document.undo.undo()
                }
                
                $.hotkeys.add("Ctrl+c", options, copy);
                $.hotkeys.add("Meta+c", options, copy);
                $.hotkeys.add("Ctrl+v", options, paste);
                $.hotkeys.add("Meta+v", options, paste);
                $.hotkeys.add("Ctrl+x", options, cut);
                $.hotkeys.add("Meta+x", options, cut);
                $.hotkeys.add("Ctrl+a", options, selectAll);
                $.hotkeys.add("Meta+a", options, selectAll);
                $.hotkeys.add("Ctrl+d", options, clearSelection);
                $.hotkeys.add("Meta+d", options, clearSelection);
                $.hotkeys.add("backspace", options, destroy);
                $.hotkeys.add("del",       options, destroy);
                $.hotkeys.add("Ctrl+z", options, undo);
                $.hotkeys.add("Meta+z", options, undo);
                
                $.hotkeys.add("Ctrl+s", options, save);
                $.hotkeys.add("Meta+s", options, save);
                $.hotkeys.add("Ctrl+o", options, openDocs);
                $.hotkeys.add("Meta+o", options, openDocs);
            },
            
            shiftKeyDown: function () {
                return this.getCurrentKeyCode() == 16
            },
            
            getViewPort: function () {
                return $('#shapeArea')
            },
            
            setMaxZIndex: function (max) {
                if(max > this.getZIndex()) {
                    this.setZIndex(max)
                    $("#leftMenu").css("zIndex", max + 1)
                }
            },
            
            nextZIndex: function () {
                var next = this.getZIndex() + 1;
                this.setZIndex(next);
                return next;
            },
            
            makeGuid: function () {
                return block.ui.Guid.create()
            },
            
            shapeFromGuid: function (guid) {
                return this.shapeByGuidMap[guid]
            },
            
            copy: function (shape) {
                this.setTempStore(JSON.stringify(shape))
            },
            
            copyFocused: function () {
                var shape = this.getFocusElement()
                if(shape) {
                    this.copy(shape)
                }
            },
            
            syncedTime: function () {
                return new Date().getTime() + document.paras.timeOffset
            },
            
            paste: function () {
                var content = this.getTempStore()
                if(content) {
                    
                    block.ui.Guid.startReplaceSession();
                    
                    var shape = JSON.parse(content)
                    
                    shape.paste(document.shapes);
                }
            }
        }
    })
})