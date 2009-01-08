//proto Attribute


// See http://code.google.com/p/joose-js/wiki/JooseAttribute
Joose.Kernel.ProtoAttribute = function (name, props) {
    this.initialize(name, props)
}

Joose.Kernel.ProtoAttribute.prototype = {
    
    _name:  null,
    _props: null,
    
    
    getName:    function () { return this._name },
    getProps:    function () { return this._props },

    
    initialize: function (name, props) {
        this._name  = name;
        this.props = props || {};
    },
    
    
//    getIsa: function () {
//        var props = this.getProps();
//        if("isa" in props && props.isa == null) {
//            throw new Error("You declared an isa property but the property is null.")
//        }
//        if(props.isa) {
//            if(!props.isa.meta) {
//                return props.isa()
//            }
//            return props.isa
//        }
//        return
//    },
//    
//    addSetter: function (classObject) {
//        var meta  = classObject.meta;
//        var name  = this.getName();
//        var props = this.getProps();
//        
//        var setterName = this.setterName();
//        
//        if(meta.can(setterName)) { // do not override methods
//            return
//        }
//        
//        var isa   = this.getIsa();
//
//        var func;
//        if(isa) {
//        	if(!isa.meta) {
//        		throw new Error("Isa declarations in attribute declarations must be Joose classes, roles or type constraints")
//        	}
//        	
//        	var isRole  = false;
//        	var isType  = false;
//        	// We need to check whether Joose.Role and Joose.TypeContraint 
//        	// are there yet, because they might not have been compiled yet
//        	if(Joose.Role && isa.meta.meta.isa(Joose.Role)) {
//        		isRole  = true;
//        	} 
//        	else if(Joose.TypeConstraint && isa.meta.isa(Joose.TypeConstraint)) {
//        		isType  = true;
//        	}
//        	
//        	// This setter is used if the attribute is constrained with an isa property in the attribute initializer
//        	// If the isa refers to a class, then the new value must be an instance of that class.
//        	// If the isa refers to a role,  then the new value must implement that role.
//        	// If the isa refers to a type constraint, then the value must match that type contraint
//        	// ...and if the coerce property is set, we try to coerce the new value into the type
//        	// Throws an exception if the new value does not match the isa property.
//        	// If errorHandler is given, it will be executed in case of an error with parameters (Exception, isa-Contraint)
//            func = function setterWithIsaCheck (val, errorHandler) {
//            	var value = val
//            	try {
//                	if ( props.nullable === true && value == undefined) {
//                	    // Don't do anything here :)
//                	} else if ( isType ) {
//                	    var newvalue = null;
//                	    if( props.coerce ) {
//                	        newvalue = isa.coerce(value);
//                	    }
//                	    if ( newvalue == null && props.nullable !== true) {
//                	        isa.validate(value);
//                	    } else {
//                	    	value = newvalue;
//                	    }
//                	} else {
//                	    if(!value || !value.meta) {
//                	        throw new ReferenceError("The attribute "+name+" only accepts values that have a meta object.")
//                	    }
//                	    var typeCheck = isRole ? value.meta.does(isa) : value.meta.isa(isa);
//                	    if( ! typeCheck ) {
//                	        throw new ReferenceError("The attribute "+name+" only accepts values that are objects of type "+isa.meta.className()+".")
//                	    }
//                	}
//            	} catch (e) {
//            		if(errorHandler) {
//            			errorHandler.call(this, e, isa)
//            		} else {
//            			throw e
//            		}
//            	};
//                this[name] = value
//                return this;
//            }
//        } else {
//            func = function setter (value) {
//                this[name] = value
//                return this;
//            }
//        }
//        meta.addMethod(setterName, func);
//    },
//    
//    
//    addGetter: function (classObject) {
//        var meta  = classObject.meta;
//        var name  = this.getName();
//        var props = this.getProps()
//        
//        var getterName = this.getterName();
//        
//        if(meta.can(getterName)) { // never override a method
//            return 
//        }
//        
//        var func  = function getter () {
//            return this[name]
//        }
//        
//        var init  = props.init;
//        
//        if(props.lazy) {
//            func = function lazyGetter () {
//                var val = this[name];
//                if(typeof val == "function" && val === init) {
//                    this[name] = val.apply(this)
//                }
//                return this[name]
//            }
//        }
//        
//        meta.addMethod(getterName, func);
//    },
//    
//    initializerName: function () {
//        return this.toPublicName()
//    },
//    
//    getterName: function () {
//        if(this.__getterNameCache) { // Cache the getterName (very busy function)
//            return this.__getterNameCache
//        }
//        this.__getterNameCache = "get"+Joose.S.uppercaseFirst(this.toPublicName())
//        return this.__getterNameCache;
//    },
//    
//    setterName: function () {
//        if(this.__setterNameCache) { // Cache the setterName (very busy function)
//            return this.__setterNameCache
//        }
//        this.__setterNameCache = "set"+Joose.S.uppercaseFirst(this.toPublicName())
//        return this.__setterNameCache;
//    },
    
    isPrivate: function () {
        return this.getName().charAt(0) == "_"
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
    
    
    handleIs: function (classObject) {
//        var meta  = classObject.meta;
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
    
    handleInit: function (classObject) {
        var props = this.getProps();
        var name  = this.getName();
        
        classObject.prototype[name]     = null;
        if(typeof props.init != "undefined") {
            var val = props.init;
            var type = typeof val;

            classObject.prototype[name] = val;
        }
    },
    
    handleProps: function (classObject) {
        this.handleIs(classObject);
        this.handleInit(classObject)
    },
    
    apply: function (classObject) {
        
        var meta  = classObject.meta;
        var name  = this.getName();
        
        this.handleProps(classObject)
        
        meta.attributeNames.push(name)
        
        meta.setAttribute(name, this)
        meta.attributes[name] = this;
    }
    
    
}
