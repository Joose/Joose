var protoRoleMeta = new Joose.Kernel.Species('Joose.Kernel.Species');


protoRoleMeta.addSuperClass(Joose.Kernel.Species);

protoRoleMeta.wrapMethod('initialize', 'after', function() {
    this.requiresMethodNames = [];
    this.methodModifiers     = [];
});


//plus some new genes
protoRoleMeta.addGenes({
	
    requiresMethodNames : null,
    
    methodModifiers : null,
    
    metaRoles	: null,
    
        
    // Add a method modifier that will be applied to classes implementing this role.
    wrapMethod: function (name, wrappingStyle, func, notPresentCB) {
        // queue arguments given to this function for later application to actual class
        this.methodModifiers.push(arguments)
    },
    
    
    requiresMethod: function (methodName) {
        var bool = false;
        Joose.A.each(this.requiresMethodNames, function (name) {
            if(methodName == name) {
                bool = true
            }
        })
        
        return bool
    },
    
    
    // Roles can not be instantiated
    defaultClassFunctionBody: function () {
        return function () {
            throw new Error("Roles may not be instantiated.")
        };
    },
    
    
    // Roles can not be instantiated
    addSuperClass: function () {
        throw new Error("Roles may not inherit from a super class.")
    },
    
    
    // Class implementing this role must implement a method named methodName
    addRequirement: function (methodName) {
        this.requiresMethodNames.push(methodName)
    },
    
    
    handleProprequires:    function (methodName) {
        var me = this;
        if(!this.meta.isa(Joose.Kernel.ProtoRole)) {
            throw("Keyword 'requires' only available classes with a meta class of type Joose.Role")
        }
        if(methodName instanceof Array) {
            Joose.A.each(methodName, function (name) {
                me.addRequirement(name)
            })
        } else {
            me.addRequirement(methodName)
        }
    },
    
    
    // Experimental method to unapply classes from roles.
    // Only works on roles that were applied at runtime
    // Currently does not work in IE (depends on __proto__)
    unapply: function (object) {
//        if(!joose.isInstance(object)) {
//            throw new Error("You way only remove roles from instances.")
//        }
//        if(!object.meta.isDetached) {
//            throw new Error("You may only remove roles that were applied at runtime")
//        }
//        
//        var role  = this.getClassObject()
//        
//        var roles = object.meta.myRoles; // myRoles!!!
//        var found = false;
//        var otherRoles = [];
//        for(var i = 0; i < roles.length; i++) {
//            if(roles[i] === role) {
//                found = true;
//            } else {
//                otherRoles.push(roles[i])
//            }
//        }
//        if(!found) {
//            throw new Error("The role "+this.className()+" was not applied to the object at runtime")
//        }
//        
//        var superClass     = object.meta.getSuperClass();
//        var c              = superClass.meta.makeAnonSubclass();
//        
//        
//        // rebless object
//        /*if(typeof(object.__proto__) != "undefined") {
//            object.__proto__ = c.prototype                    
//        } else {   // Workaround for IE: 
//        */
//        
//        var test = new c()
//        
//        // add all roles except the one that we are removing
//        for(var i = 0; i < otherRoles.length; i++) {
//            var role = otherRoles[i]
//            c.meta.addRole(role)
//        }
//        
//        c.prototype        = test
//        
//        object.meta        = c.meta;
//        object.constructor = c;
//        object.__proto__   = test
    },
    
    
    addMethodToClass: function (method, classObject) {
        var name = method.getName()
        var cur;
//        if(method.isClassMethod()) {
        if(method.meta.isa(this.classMethodConstructor)) {
            cur = classObject.meta.getClassMethodObject(name)
        } else {
            cur = classObject.meta.getMethodObject(name)
        }
        // Methods from roles take precedence over methods from a super class
        if(!cur || cur.isFromSuperClass()) {
            classObject.meta.addMethodObject(method)
        }
    },
    
    
    addAttributeToClass: function(attr, classObject) {
        var name = attr.getName();
        //don't add the attribute if it already exists in the class
        if (!classObject.meta.hasAttribute(name)) {
            this.getAttribute(name).apply(classObject);
        }
    },

    
    apply: function (object) {
        
    	if (!object.meta.meta.can('addRole')) return false; 
    	
        // XXX ask in #moose whether this is correct
        // A Role should not be applied twice
        if(object.meta.does(this.getClassObject())) {
            return false
        }
        
        if(joose.isInstanceMCB(object)) {
            // Create an anonymous subclass ob object's class
            
            object.detach();
            object.meta.addRole(this.getClassObject());
            this.applyMethodModifiers(object);
            var throwException = true;
            this.isImplementedBy(object, throwException)
        } else {
            // object is actually a class
            var me    = this;
            
            var attrs = me.getAttributes(); 
            Joose.O.each(attrs, function applyAttrs (attr) {
                me.addAttributeToClass(attr, object);
            });

            var names = me.getMethodNames();
            Joose.A.each(names, function applyMethod (name) {
                me.addMethodToClass(me.getMethodObject(name), object)
            })
            
            names = me.getClassMethodNames();
            Joose.A.each(names, function applyMethod (name) {
                me.addMethodToClass(me.getClassMethodObject(name), object)
            })

            // Meta roles are applied to the meta class of the class that implements us
            if(this.metaRoles) {
                Joose.A.each(this.metaRoles, function applyMetaRole (role) {
                    role.meta.apply(object.meta)
                })
            }
        }
        return true
    },
    
    // should be called by class builder after class has been initialized from props
    applyMethodModifiers: function (object) {
        
        // Apply method modifiers
        Joose.A.each(this.methodModifiers, function applyMethodModifier (paras) {
            object.meta.wrapMethod.apply(object.meta, paras)
        })
    },
    
    // Checks whether classObject (can also be any Joose object) implements this role. 
    // If second para is true, throws an exception when a method is missing.
    hasRequiredMethods: function (classObject, throwException) {
        var me       = this
        var complete = true
        Joose.A.each(this.requiresMethodNames, function (value) {
            var found = classObject.meta.can(value)
            if(!found) {
                if(throwException) {
                     throw("Class "+classObject.meta.className()+" does not fully implement the role "+me.className()+". The method is "+value+" missing.")
                }
                complete = false
                return
            }
        })
        return complete
    },
    
    // This is called by validateClass in Joose.Class.
    // This is not part of apply because apply might be called way before class construction is complete.
    isImplementedBy: function (classObject, throwException) {
    
        var complete = this.hasRequiredMethods(classObject, throwException);
        if(complete) {
            complete = this.implementsMyMethods(classObject);
        }
        return complete
    },
    
    
    implementsMyMethods: function (classObject) {
        var complete = true
        // FIXME buggy if class methods are involved. Should roles have class methods?
        // FIXED?
        Joose.A.each(this.getMethodNames(), function (value) {
            var found = classObject.meta.can(value)
            if(!found) {
                complete = false
            }
        })
        Joose.A.each(this.getClassMethodNames(), function (value) {
            var found = classObject.meta.classCan(value)
            if(!found) {
                complete = false
            }
        })
        return complete
    },
    
    
    // the metaRoles prop allows a role to apply roles to the meta class of the class using the role
    // XXX should be moved to Role later
    handlePropmetaRoles: function (arrayOfRoles) {
        this.metaRoles = arrayOfRoles;
    }
});


Joose.Kernel.ProtoRole = protoRoleMeta.getClassObject();

Joose.Kernel.ProtoRole.anonymousClassCounter = 0;


