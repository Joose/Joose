Module("block.ui", function (m) {
    Class("Shape", {
        isa: block.ui.Container,
        has: {
            _left:   { 
                is: "rw",
                init: 200
            },
            _top:    { 
                is: "rw",
                init: 100
            },
            _width:  { is: "rw" },
            _height: { is: "rw" },
            _zIndex: { 
                is: "rw",
                init: -1
            },
            _minWidth: {
                is: "rw",
                init: 20
            },
            _minHeight: {
                is: "rw",
                init: 20
            },
            _guid: {
                is: "rw",
                init: function () { return this.initGuid() }
            },
            _lastUpdate: {
                is: "rw",
                init: 0
            },
            // general ViewPort Offset
            _offsetLeft: {
                is: "rw",
                init: function () { return 150; return this.getViewPort().offset().left },
                lazy: true
            },
            _offsetTop: {
                is: "rw",
                init: function () { return 0; return this.getViewPort().offset().top },
                lazy: true
            },
            _style : {
                is: "rw",
                init: function () { return {} }
            }
        },
        methods: {
            
            
            
            create: function () {
                throw "Abstract"
            },
            
            initGuid: function () {
                return document.manager.makeGuid(this)
            },
            
            addDragPoints: function () {},
            makeDraggable: function () {},
            
            place: function () {
                this.$ = this.create()
                this.getViewPort().append(this.$)
                
                var zIndex = this.getZIndex();
                if(zIndex == -1) {
                    zIndex = document.manager.nextZIndex();
                }
                this.zIndex(zIndex)
                
                this.x(this.getLeft());
                this.y(this.getTop())
                //this.width(""+ this.getWidth()+"px");
                //this.height(""+this.getHeight()+"px");
                this.width(this.getWidth());
                this.height(this.getHeight());
                
                this.addDragPoints();
                this.makeDraggable();
            },
            
            prepareStorage: function () {
                //this._updateStateCore()
            },
            
            _updateStateCore: function () {
                var offset = this.offset()
                this.setLeft(offset.left);
                this.setTop(offset.top);
                this.setWidth(this.width());
                this.setHeight(this.height())
            },
            
            updateState: function () {
                if(!this.isDeleted()) {
                    document.undo.addUpdateStep(this)
                    this._updateStateCore();
                    this.touch();
                }
            },
            
            touch: function () {
                document.propPanel.refresh(this);
                this.setLastUpdate(this.syncedTime())
                console.log("Touch: "+this.getLastUpdate())
                document.manager.setDirty(true)
                
                 // notify listeners
                this.updated()
                
                document.sync.saveState()
            },
            
            // augment in sub class or role to update extra state
            _updateFromCore: function (shape) {
                
                if(shape.isDeleted() && !this.isDeleted()) {
                    this.destroy()
                } 
                else if(!this.isDeleted()) {
                    if(shape.getLeft() != this.getLeft())                
                        this.x(shape.getLeft());
                    if(shape.getTop() != this.getTop())       
                        this.y(shape.getTop());
                    if(shape.getWidth() != this.getWidth())   
                        this.width(shape.getWidth());
                    if(shape.getHeight() != this.getHeight())       
                        this.height(shape.getHeight());
                    this.setLastUpdate(shape.getLastUpdate())
                }
            },
            
            updateFrom: function (shape) {
                console.log(shape.getLastUpdate() +">"+ this.getLastUpdate())
                if(shape.getLastUpdate() > this.getLastUpdate()) {
                    console.log("Change shape")
                    this._updateFromCore(shape)
                    this._updateStateCore()
                    document.propPanel.refresh(this);
                    
                    // notify listeners
                    this.updated()
                }
            },
            
            syncedTime: function () {
                return document.manager.syncedTime();
            },
            offset: function () {
                var offset = this.dim$().offset();
                offset.left -= this.getOffsetLeft();
                offset.top  -= this.getOffsetTop();
                return offset;
            },
            left: function (left) {
                var ele = this.dim$();
                if(arguments.length > 0) {
                    var before = this.left()
                    ele.css("left", ""+left+"px")
                    ele.width(this.width() - (left - before))
                } else {
                    return ele.offset().left - this.getOffsetLeft()
                }
            },
            top: function (top) {
                var ele = this.dim$();
                if(arguments.length > 0) {
                    var before = this.top()
                    ele.css("top", ""+top+"px")
                    ele.height(this.height() - (top - before))
                } else {
                    var base = ele.offset().top;
                    var offset = this.getOffsetTop()
                    
                    return base - offset
                }
            },
            
            dim$: function () {
                return this.$
            },
            
            height: function () {
                var ele = this.dim$()
                return ele.height.apply(ele, arguments)
            },
            width: function () {
                var ele = this.dim$()
                return ele.width.apply(ele, arguments)
            },
            right: function (right) {
                if(arguments.length > 0) {
                    this.width(right - this.left())
                } else {
                    return this.left() + this.width()
                }
            },
            bottom: function (bottom) {
                if(arguments.length > 0) {
                    var top = this.top()
                    this.height(bottom - top)
                } else {
                    return this.top()  + this.height()
                }
            },
            zIndex: function (index) {
                if(arguments.length > 0) {
                    this.setZIndex(index);
                    document.manager.setMaxZIndex(index);
                    this.$.css("zIndex", index)
                } else {
                    throw "Only settable"
                }
            },
            x: function (x) {
                if(arguments.length > 0) {
                    this.$.css("left", ""+x+"px")
                } else {
                    return this.left()
                }
            },
            y: function (y) {
                if(arguments.length > 0) {
                    this.$.css("top", ""+y+"px")
                } else {
                    return this.top()
                }
            },
            center: function (left, top) {
                if(arguments.length > 0) {
                    this.x(Math.round(left - this.width() / 2))
                    this.y(Math.round(top - this.height() / 2))
                } else {
                    return {
                        left: Math.round(this.left() + this.width() / 2),
                        top:  Math.round(this.top()  + this.height() / 2)
                    }
                }
            },
            
            show: function () {
                this.$.show()
            },
            hide: function () {
                this.$.hide()
            },
            
            resetGuid: function () {
                this.setGuid(this.initGuid())
                this.registerGuid();
                this.touch()
            },
            
            paste: function (target) {
                
                this.resetGuid()
                
                this.traverse(function (shape) {
                    shape.resetGuid()
                })
                
                target.addAndDraw(this);
                document.manager.switchFocus(this)
            },
            
            registerGuid: function () {
                document.manager.shapeByGuidMap[this.getGuid()] = this
            },
            optionalRegisterGuid: function () {
                if(!document.manager.shapeByGuidMap[this.getGuid()]) {
                    this.registerGuid()
                }
            },
            
            /*finishUnpack: function () {
                this.optionalRegisterGuid()
            },*/
            
            destroy: function () {
                this.setDeleted(true);
                this.$.hide()
                this.$.remove()
                this.touch()
                
                document.undo.addDestroyStep(this)
            },
            
            type: function () {
                var name = this.meta.className();
                return name.split('.').pop()
            },
            
           drawOnDoc: function () {
            	var me = this;
            	
            	document.shapes.addAndDraw(me);
                me.touch()
                
                document.undo.addCreateStep(me)
                
                return me
            }
        },
        after: {
            initialize: function () {
                this.optionalRegisterGuid();
            }
        },
        classMethods: {
            addToDoc: function (paras) { // use to add new shapes to the document
                var me = this.meta.instantiate(paras);
               	return me.drawOnDoc()
            }
        }
    })
})