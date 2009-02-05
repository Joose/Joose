var protoAttributeMeta = new Joose.Kernel.ClassSeparation('Joose.Kernel.ProtoAttribute', function (name, props) {
    this.initialize(name, props)
});


protoAttributeMeta.addGenes({
    
    _name:  null,
    _props: null,
    
    
    getName:    function () { return this._name },
    getProps:    function () { return this._props },

    
    initialize: function (name, props) {
        this._name  = name;
        this._props = props || {};
    },
    
    
    isPrivate: function () {
        return this.getName().charAt(0) == "_"
    },
    
    
    copy: function (to) {
        return new to(this.getName(), this.getProps());
    },
    
    
    toPublicName: function () {
        
        if(this.__publicNameCache) { // Cache the publicName (very busy function)
            return this.__publicNameCache
        }
        
        var name = this.getName();
        if(this.isPrivate()) {
            this.__publicNameCache = name.substr(1)
            return this.__publicNameCache;
        }
        this.__publicNameCache = name
        return this.__publicNameCache
    },
    
    
    handleInit: function (classObject) {
        var props = this.getProps();
        var name  = this.getName();
        
        classObject.prototype[name]     = null;
        if(typeof props.init != "undefined") {
            classObject.prototype[name] = props.init;
        }
    },
    
    
    handleProps: function (classObject) {
        this.handleInit(classObject)
    },
    

    addToClass: function (classObject) {
        classObject.meta.attributes[this.getName()] = this;
        this.handleProps(classObject)
    },
    
    
    doInitialization: function (object, paras) {
    	
    }
    
});


Joose.Kernel.ProtoAttribute = protoAttributeMeta.getClassObject();