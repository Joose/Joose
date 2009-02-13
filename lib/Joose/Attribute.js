/*
 * This handles the following attribute properties
 *  * init with function value in non-lazy initialization
 *  * required attributes in initializaion
 *  * handles for auto-decoration
 *  * predicate for attribute availability checks
 * 
 * 
 * See http://code.google.com/p/joose-js/wiki/JooseAttribute
 */
Joose.Kernel.MetaClass.create('Joose.Attribute', {	
	isa : Joose.Kernel.AdvancedProtoAttribute,
	
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
	                
	                //XXX decorate appears before Joose.Decorator
	                meta.decorate(isa, name, optionalHandlerMaker)
	            } 
	            else {
	                throw "Unsupported value for handles: "+handles
	            }
	            
	        }
	    }
	},
	
	after : {
		handleProps : function(classObject){
		    this.handleHandles(classObject);
		}
	}
});


Joose.Kernel.MetaClass.meta.addAttribute('attributeConstructor', { init : Joose.Attribute, lazy : true });