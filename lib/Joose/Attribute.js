Joose.Kernel.MetaClass.create('Joose.Attribute', {	
	isa : Joose.Kernel.AdvancedProtoAttribute,
	meta : Joose.Kernel.MetaClass,
	
	methods : {
		makeTypeChecker : function (isa, props, thing, name) {
			var func;
			
	        if(isa) {
	        	if(!isa.meta) {
	        		throw new Error("Isa declarations in attribute declarations must be Joose classes, roles or type constraints")
	        	}
	        	
	        	var isRole  = false;
	        	var isType  = false;
	        	// We need to check whether Joose.Role and Joose.TypeContraint 
	        	// are there yet, because they might not have been compiled yet
	        	if(Joose.Role && isa.meta.meta.isa(Joose.Role)) {
	        		isRole  = true;
	        	} 
	        	else if(Joose.TypeConstraint && isa.meta.isa(Joose.TypeConstraint)) {
	        		isType  = true;
	        	}
	        	
	        	// This setter is used if the attribute is constrained with an isa property in the attribute initializer
	        	// If the isa refers to a class, then the new value must be an instance of that class.
	        	// If the isa refers to a role,  then the new value must implement that role.
	        	// If the isa refers to a type constraint, then the value must match that type contraint
	        	// ...and if the coerce property is set, we try to coerce the new value into the type
	        	// Throws an exception if the new value does not match the isa property.
	        	// If errorHandler is given, it will be executed in case of an error with parameters (Exception, isa-Contraint)
	            func = function setterWithIsaCheck (val, errorHandler) {
	            	var value = val
	            	try {
	                	if ( props.nullable === true && value == undefined) {
	                	    // Don't do anything here :)
	                	} else if ( isType ) {
	                	    var newvalue = null;
	                	    if( props.coerce ) {
	                	        newvalue = isa.coerce(value);
	                	    }
	                	    if ( newvalue == null && props.nullable !== true) {
	                	        isa.validate(value);
	                	    } else {
	                	    	value = newvalue;
	                	    }
	                	} else {
	                	    if(!value || !value.meta) {
	                	        throw new ReferenceError("The attribute "+name+" only accepts values that have a meta object.")
	                	    }
	                	    var typeCheck = isRole ? value.meta.does(isa) : value.meta.isa(isa);
	                	    if( ! typeCheck ) {
	                	        throw new ReferenceError("The attribute "+name+" only accepts values that are objects of type "+isa.meta.className()+".")
	                	    }
	                	}
	            	} catch (e) {
	            		if(errorHandler) {
	            			errorHandler.call(this, e, isa)
	            		} else {
	            			throw e
	            		}
	            	};
	                this[name] = value
	                return this;
	            }
	        } else {
	            func = function setter (value) {
	                this[name] = value
	                return this;
	            }
	        }
			
	        return func;
		}		
	}
})

Joose.Kernel.MetaClass.meta.addAttribute('attributeConstructor', { init : Joose.Attribute, lazy : true });
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
//
//
////copied
////copied
////copied
//
//(function (Class) {
//Class("Joose.Attribute", {
//    after: {
//        handleProps: function (classObject) {
//            this.handleHandles(classObject);
//            this.handlePredicate(classObject);
//        }
//    },
//    methods: {
//        
//        isPersistent: function () {
//            var props = this.getProps()
//            if(props.persistent == false) {
//                return false
//            }
//            return true
//        },
//        
//        doInitialization: function (object, paras) {
//            var  name  = this.initializerName();
//            var _name  = this.getName();
//            var value;
//            var isSet  = false;
//            if(typeof paras != "undefined" && typeof paras[name] != "undefined") {
//                value  = paras[name];
//                isSet  = true;
//            } else {
//                var props = this.getProps();
//                
//                var init  = props.init;
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
//                var setterName = this.setterName();
//                if(object.meta.can(setterName)) { // use setter if available
//                    object[setterName](value)
//                } else { // direct attribute access
//                    object[_name] = value
//                }
//            }
//        },
//        
//        handleHandles: function (classObject) {
//            var meta  = classObject.meta;
//            var name  = this.getName();
//            var props = this.getProps();
//            
//            var handles = props.handles;
//            var isa     = props.isa
//            
//            if(handles) {
//                if(handles == "*") {
//                    if(!isa) {
//                        throw "I need an isa property in order to handle a class"
//                    }
//                    
//                    // receives the name and should return a closure
//                    var optionalHandlerMaker = props.handleWith;
//                    
//                    meta.decorate(isa, name, optionalHandlerMaker)
//                } 
//                else {
//                    throw "Unsupported value for handles: "+handles
//                }
//                
//            }
//        },
//        
//        handlePredicate: function (classObject) {
//            var meta  = classObject.meta;
//            var name  = this.getName();
//            var props = this.getProps();
//            
//            var predicate = props.predicate;
//            
//            var getter    = this.getterName();
//            
//            if(predicate) {
//                meta.addMethod(predicate, function () {
//                    var val = this[getter]();
//                    return val ? true : false
//                })
//            }
//        }
//    }
//})
//})(JooseClass);
