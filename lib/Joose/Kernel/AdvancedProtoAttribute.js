var advancedProtoAttributeMeta = new Joose.Kernel.Reptiles('Joose.Kernel.AdvancedProtoAttribute');

advancedProtoAttributeMeta.addSuperClass(Joose.Kernel.ProtoAttribute);

advancedProtoAttributeMeta.wrapMethod('handleProps', 'before', function(classObject){
	this.handleIs(classObject);
});

advancedProtoAttributeMeta.wrapMethod('handleProps', 'after', function(classObject){
    this.handleHandles(classObject);
    this.handlePredicate(classObject);
});



advancedProtoAttributeMeta.addGenes({
    
    getIsa: function () {
        var props = this.getProps();
        if("isa" in props && props.isa == null) {
            throw new Error("You declared an isa property but the property is null.")
        }
        if(props.isa) {
            if(!props.isa.meta) {
                return props.isa()
            }
            return props.isa
        }
        return
    },
    
    
    makeTypeChecker : function (isa, props, thing, name) {
        var name  = this.getName();
        
        return function setter (value) {
            this[name] = value
            return this;
        }
    },
    
    
    addSetter: function (classObject) {
        var meta  = classObject.meta;
        var name  = this.getName();
        var props = this.getProps();
        
        var setterName = this.setterName();
        
        if(meta.can(setterName)) { // do not override methods
            return
        }
        
        var isa   = this.getIsa();

        var func = this.makeTypeChecker(isa, props, "attribute", name);
        
        meta.addMethod(setterName, func);
    },
    
    
    addGetter: function (classObject) {
        var meta  = classObject.meta;
        var name  = this.getName();
        var props = this.getProps()
        
        var getterName = this.getterName();
        
        if(meta.can(getterName)) { // never override a method
            return 
        }
        
        var func  = function getter () {
            return this[name]
        }
        
        var init  = props.init;
        
        if(props.lazy) {
            func = function lazyGetter () {
                var val = this[name];
                if(typeof val == "function" && val === init) {
                    this[name] = val.apply(this)
                }
                return this[name]
            }
        }
        
        meta.addMethod(getterName, func);
    },
    
    
    initializerName: function () {
        return this.toPublicName()
    },
    
    
    getterName: function () {
        if(this.__getterNameCache) { // Cache the getterName (very busy function)
            return this.__getterNameCache
        }
        this.__getterNameCache = "get"+Joose.S.uppercaseFirst(this.toPublicName())
        return this.__getterNameCache;
    },
    
    
    setterName: function () {
        if(this.__setterNameCache) { // Cache the setterName (very busy function)
            return this.__setterNameCache
        }
        this.__setterNameCache = "set"+Joose.S.uppercaseFirst(this.toPublicName())
        return this.__setterNameCache;
    },
    
    
    handleIs: function (classObject) {
        var name  = this.getName();
        var props = this.getProps();
        
        var is    = props.is;

        if(is == "rw" || is == "ro") {
            this.addGetter(classObject);
        }
        if(is == "rw") {
            this.addSetter(classObject)
        }
    },
    
    
    isPersistent: function () {
        var props = this.getProps()
        if(props.persistent == false) {
            return false
        }
        return true
    },
    
    
    doInitialization: function (object, paras) {
        var  name  = this.initializerName();
        var _name  = this.getName();
        var value;
        var isSet  = false;
        if(typeof paras != "undefined" && typeof paras[name] != "undefined") {
            value  = paras[name];
            isSet  = true;
        } else {
            var props = this.getProps();
            
            var init  = props.init;
            
            if(typeof init == "function" && !props.lazy) {
                // if init is not a function, we have put it in the prototype, so it is already here
                value = init.call(object)
                isSet = true
            } else {
                // only enforce required property if init is not run
                if(props.required) {
                    throw "Required initialization parameter missing: "+name + "(While initializing "+object+")"
                }
            }
        }
        if(isSet) {
            var setterName = this.setterName();
            if(object.meta.can(setterName)) { // use setter if available
                object[setterName](value)
            } else { // direct attribute access
                object[_name] = value
            }
        }
    },
    
    
    handleHandles: function (classObject) {
        var meta  = classObject.meta;
        var name  = this.getName();
        var props = this.getProps();
        
        var handles = props.handles;
        var isa     = props.isa
        
        if(handles) {
            if(handles == "*") {
                if(!isa) {
                    throw "I need an isa property in order to handle a class"
                }
                
                // receives the name and should return a closure
                var optionalHandlerMaker = props.handleWith;
                
                meta.decorate(isa, name, optionalHandlerMaker)
            } 
            else {
                throw "Unsupported value for handles: "+handles
            }
            
        }
    },
    
    
    handlePredicate: function (classObject) {
        var meta  = classObject.meta;
        var name  = this.getName();
        var props = this.getProps();
        
        var predicate = props.predicate;
        
        var getter    = this.getterName();
        
        if(predicate) {
            meta.addMethod(predicate, function () {
                var val = this[getter]();
                return val ? true : false
            })
        }
    }
    
});


Joose.Kernel.AdvancedProtoAttribute = advancedProtoAttributeMeta.getClassObject();