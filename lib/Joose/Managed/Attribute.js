Joose.Managed.Attribute = new Joose.Managed.Class('Joose.Managed.Attribute', {
	
	isa : Joose.Managed.Property.Attribute,
	
	have : {
		role : null,
		
		publicName : null,
		setterName : null,
		getterName : null,
        
        required : false
	},
    
    
	override : {
		
		computeValue : function (props) {
            if (props.required) this.required = true
            
			if (typeof props.init != 'function') this.SUPER(props)
			
			this.publicName = this.name.replace(/^_+/, '')
			this.setterName = 'set' + Joose.S.uppercaseFirst(this.publicName)
			this.getterName = 'get' + Joose.S.uppercaseFirst(this.publicName)
			
			if (props.is) {
				var methods = {}
				
				if (props.is == 'rw') methods[this.setterName] = this.getSetter()
				if (props.is == 'rw' || props.is == 'ro') methods[this.getterName] = this.getGetter()
				
				this.role = new Joose.Managed.Role('attribute:' + this.name, { methods : methods }).c
			}
		},

		
	    prepareApply : function(targetClass) {
	    	if (this.role) targetClass.meta.extend({
	    		does : [ this.role ]
	    	})
	    },
		
	    
	    apply : function(target) {
	    	this.SUPER(target)
	    },
	    
	    
	    unapply : function(from) {
	    	if (this.role) from.meta.extend({
	    		doesnt : [ this.role ]
	    	})
	    	this.SUPER(from)
	    }
		
	},
	
	
	methods : {
		
		isPrivate : function() {
			return /^_/.test(this.name)
		},
		
		
		getSetter : function() {
			var name = this.name
			
			return function(value) {
				this[name] = value
				return this
			}
		},
		
		
		getGetter : function() {
			var name = this.name
			
			return function() {
				return this[name]
			}
			
		}
		
	}

}).c











///*
// * This handles the following attribute properties
// *  * init with function value in non-lazy initialization
// *  * required attributes in initializaion
// *  * handles for auto-decoration
// *  * predicate for attribute availability checks
// * 
// * 
// * See http://code.google.com/p/joose-js/wiki/JooseAttribute
// */
//Joose.Kernel.MetaClass.create('Joose.Managed.Attribute', {    
//    isa: Joose.Kernel.ProtoAttribute,
//    
//    before: {
//        handleProps: function(classObject){
//            this.handleIs(classObject)
//        }
//    },
//    
//    after: {
//        handleProps: function(classObject){
//            this.handlePredicate(classObject)
//            this.handleHandles(classObject)
//        }
//    },
//    
//    
//    methods: {
//        
////        isPrivate: function () {
////            return this.getName().charAt(0) == "_"
////        },
////        
////        
////        toPublicName: function () {
////            
////            if(this.__publicNameCache) { // Cache the publicName (very busy function)
////                return this.__publicNameCache
////            }
////            
////            var name = this.getName()
////            if(this.isPrivate()) {
////                this.__publicNameCache = name.substr(1)
////                return this.__publicNameCache
////            }
////            this.__publicNameCache = name
////            return this.__publicNameCache
////        },
//        
//        
//        getIsa: function () {
//            var props = this.getProps()
//            if("isa" in props && props.isa == null) {
//                throw new Error("You declared an isa property but the property is null.")
//            }
//            if(props.isa) {
//                if(!props.isa.meta) {
//                    return props.isa()
//                }
//                return props.isa
//            }
//            return
//        },
//        
//        
//        addSetter: function (classObject) {
//            var meta  = classObject.meta
//            var name  = this.getName()
//            var props = this.getProps()
//            
//            var setterName = this.setterName()
//            
//            if(meta.can(setterName)) { // do not override methods
//                return
//            }
//            
//            var isa   = this.getIsa()
//    
//            var func = this.makeTypeChecker(isa, props, "attribute", name)
//            
//            meta.addMethod(setterName, func)
//        },
//        
//        
//        addGetter: function (classObject) {
//            var meta  = classObject.meta
//            var name  = this.getName()
//            var props = this.getProps()
//            
//            var getterName = this.getterName()
//            
//            if(meta.can(getterName)) { // never override a method
//                return 
//            }
//            
//            var func  = function getter () {
//                return this[name]
//            }
//            
//            var init  = props.init
//            
//            if(props.lazy) {
//                func = function lazyGetter () {
//                    var val = this[name]
//                    if(typeof val == "function" && val === init) {
//                        this[name] = val.apply(this)
//                    }
//                    return this[name]
//                }
//            }
//            
//            meta.addMethod(getterName, func)
//        },
//        
//        
//        initializerName: function () {
//            return this.toPublicName()
//        },
//        
//        
////        getterName: function () {
////            if(this.__getterNameCache) { // Cache the getterName (very busy function)
////                return this.__getterNameCache
////            }
////            this.__getterNameCache = "get"+Joose.S.uppercaseFirst(this.toPublicName())
////            return this.__getterNameCache
////        },
////        
////        
////        setterName: function () {
////            if(this.__setterNameCache) { // Cache the setterName (very busy function)
////                return this.__setterNameCache
////            }
////            this.__setterNameCache = "set"+Joose.S.uppercaseFirst(this.toPublicName())
////            return this.__setterNameCache
////        },
//        
//        
////        handleIs: function (classObject) {
////    //        var name  = this.getName()
////            var props = this.getProps()
////            
////            var is    = props.is
////    
////            if(is == "rw" || is == "ro") {
////                this.addGetter(classObject)
////            }
////            if(is == "rw") {
////                this.addSetter(classObject)
////            }
////        },
//        
//        
//        doInitialization: function (object, paras) {
//            var  name  = this.initializerName()
//            var _name  = this.getName()
//            var value
//            var isSet  = false
//            if(typeof paras != "undefined" && typeof paras[name] != "undefined") {
//                value  = paras[name]
//                isSet  = true
//            } else {
//                var props = this.getProps()
//                
//                var init  = props.init
//                
//                if(typeof init == "function" && !props.lazy) {
//                    // if init is not a function, we have put it in the prototype, so it is already here
//                    value = init.call(object)
//                    isSet = true
//                } else {
//                    // only enforce required property if init is not run
//                    if(props.required) {
//                        throw "Required initialization parameter missing: "+name + "(While initializing "+object+")"
//                    }
//                }
//            }
//            if(isSet) {
//                var setterName = this.setterName()
//                if(object.meta.can(setterName)) { // use setter if available
//                    object[setterName](value)
//                } else { // direct attribute access
//                    object[_name] = value
//                }
//            }
//        },
//        
//        
//        handlePredicate: function (classObject) {
//            var meta  = classObject.meta
//            var name  = this.getName()
//            var props = this.getProps()
//            
//            var predicate = props.predicate
//            
//            var getter    = this.getterName()
//            
//            if(predicate) {
//                meta.addMethod(predicate, function () {
//                    var val = this[getter]()
//                    return val ? true: false
//                })
//            }
//        },
//        
//        
////XXX TypeChecker as Role (from Joose.TypeChecker)        
////        makeTypeChecker: function (isa, props, thing, name) {
////            var name  = this.getName()
////            
////            return function setter (value) {
////                this[name] = value
////                return this
////            }
////        },
//        
//        makeTypeChecker: function (isa, props, thing, name) {
//            var func
//            
//            if(isa) {
//                if(!isa.meta) {
//                    throw new Error("Isa declarations in attribute declarations must be Joose classes, roles or type constraints")
//                }
//                
//                var isRole  = false
//                var isType  = false
//                // We need to check whether Joose.Role and Joose.TypeContraint 
//                // are there yet, because they might not have been compiled yet
//                if(Joose.Role && isa.meta.meta.isa(Joose.Role)) {
//                    isRole  = true
//                } 
//                else if(Joose.TypeConstraint && isa.meta.isa(Joose.TypeConstraint)) {
//                    isType  = true
//                }
//                
//                // This setter is used if the attribute is constrained with an isa property in the attribute initializer
//                // If the isa refers to a class, then the new value must be an instance of that class.
//                // If the isa refers to a role,  then the new value must implement that role.
//                // If the isa refers to a type constraint, then the value must match that type contraint
//                // ...and if the coerce property is set, we try to coerce the new value into the type
//                // Throws an exception if the new value does not match the isa property.
//                // If errorHandler is given, it will be executed in case of an error with parameters (Exception, isa-Contraint)
//                func = function setterWithIsaCheck (val, errorHandler) {
//                    var value = val
//                    try {
//                        if ( props.nullable === true && value == undefined) {
//                            // Don't do anything here:)
//                        } else if ( isType ) {
//                            var newvalue = null
//                            if( props.coerce ) {
//                                newvalue = isa.coerce(value)
//                            }
//                            if ( newvalue == null && props.nullable !== true) {
//                                isa.validate(value)
//                            } else {
//                                value = newvalue
//                            }
//                        } else {
//                            if(!value || !value.meta) {
//                                throw new ReferenceError("The attribute "+name+" only accepts values that have a meta object.")
//                            }
//                            var typeCheck = isRole ? value.meta.does(isa): value.meta.isa(isa)
//                            if( ! typeCheck ) {
//                                throw new ReferenceError("The attribute "+name+" only accepts values that are objects of type "+isa.meta.className()+".")
//                            }
//                        }
//                    } catch (e) {
//                        if(errorHandler) {
//                            errorHandler.call(this, e, isa)
//                        } else {
//                            throw e
//                        }
//                    }
//                    this[name] = value
//                    return this
//                }
//            } else {
//                func = function setter (value) {
//                    this[name] = value
//                    return this
//                }
//            }
//            
//            return func
//        },
//        
//
//        handleHandles: function (classObject) {
//            var meta  = classObject.meta
//            var name  = this.getName()
//            var props = this.getProps()
//            
//            var handles = props.handles
//            var isa     = props.isa
//            
//            if(handles) {
//                if(handles == "*") {
//                    if(!isa) {
//                        throw "I need an isa property in order to handle a class"
//                    }
//                    
//                    // receives the name and should return a closure
//                    var optionalHandlerMaker = props.handleWith
//                    
//                    //XXX decorate appears before Joose.Decorator
//                    meta.decorate(isa, name, optionalHandlerMaker)
//                } 
//                else {
//                    throw "Unsupported value for handles: "+handles
//                }
//                
//            }
//        }
//        
//    }
//    
//})