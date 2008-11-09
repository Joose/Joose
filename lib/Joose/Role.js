
/*
 * An Implementation of Traits
 * see http://www.iam.unibe.ch/~scg/cgi-bin/scgbib.cgi?query=nathanael+traits+composable+units+ecoop
 * 
 * Current Composition rules:
 * - At compile time we override existing (at the time of rule application) methods
 * - At runtime we dont
 */

(function (Class) {

Class("Joose.Role", {
    isa: Joose.Class,
    has: ["requiresMethodNames", "methodModifiers", "metaRoles"],
    methods: {
        
        // Add a method modifier that will be applied to classes implementing this role.
        wrapMethod: function (name, wrappingStyle, func, notPresentCB) {
            // queue arguments given to this function for later application to actual class
            this.methodModifiers.push(arguments)
            var test = this.methodModifiers
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
        
        addInitializer: Joose.emptyFunction,
        
        // Roles can not be instantiated
        defaultClassFunctionBody: function () {
            var f = function () {
                throw new Error("Roles may not be instantiated.")
            };
            joose.addToString(f, function () { return this.meta.className() })
            return f
        },
        
        // Roles can not be instantiated
        addSuperClass: function () {
            throw new Error("Roles may not inherit from a super class.")
        },
        
        initialize: function () {
            this._name               = "Joose.Role"
            this.requiresMethodNames = [];
            this.methodModifiers     = [];
        },
        
        // Class implementing this role must implement a method named methodName
        addRequirement: function (methodName) {
            this.requiresMethodNames.push(methodName)
        },
        
        // Experimental method to unapply classes from roles.
        // Only works on roles that were applied at runtime
        // Currently does not work in IE (depends on __proto__)
        unapply: function (object) {
            if(!joose.isInstance(object)) {
                throw new Error("You way only remove roles from instances.")
            }
            if(!object.meta.isDetached) {
                throw new Error("You may only remove roles that were applied at runtime")
            }
            
            var role  = this.getClassObject()
            
            var roles = object.meta.myRoles; // myRoles!!!
            var found = false;
            var otherRoles = [];
            for(var i = 0; i < roles.length; i++) {
                if(roles[i] === role) {
                    found = true;
                } else {
                    otherRoles.push(roles[i])
                }
            }
            if(!found) {
                throw new Error("The role "+this.className()+" was not applied to the object at runtime")
            }
            
            var superClass     = object.meta.getSuperClass();
            var c              = superClass.meta.makeAnonSubclass();
            
            
            // rebless object
            /*if(typeof(object.__proto__) != "undefined") {
                object.__proto__ = c.prototype                    
            } else {   // Workaround for IE: 
            */
            
            var test = new c()
            
            // add all roles except the one that we are removing
            for(var i = 0; i < otherRoles.length; i++) {
                var role = otherRoles[i]
                c.meta.addRole(role)
            }
            
            c.prototype        = test
            
            object.meta        = c.meta;
            object.constructor = c;
            object.__proto__   = test
        },
        
        addMethodToClass: function (method, classObject) {
            var name = method.getName()
            var cur;
            if(method.isClassMethod()) {
                cur = classObject.meta.getClassMethodObject(name)
            } else {
                cur = classObject.meta. getMethodObject(name)
            }
            // Methods from roles take precedence over methods from a super class
            if(!cur || cur.isFromSuperClass()) {
                classObject.meta.addMethodObject(method)
            }
        },
    
        apply: function (object) {
            
            // XXX ask in #moose whether this is correct
            // A Role should not be applied twice
            if(object.meta.does(this.getClassObject())) {
                return false
            }
            
            if(joose.isInstance(object)) {
                // Create an anonymous subclass ob object's class
                
                object.detach();
                object.meta.addRole(this.getClassObject());
                var throwException = true;
                this.isImplementedBy(object, throwException)
            } else {
                // object is actually a class
                var me    = this;
                var names = this.getMethodNames();
        
                //alert("Super"+me.name + " -> "+classObject.meta.name +"->" + names)
        
                Joose.A.each(names, function applyMethod (name) {
                    
                    var m = me.getMethodObject(name)
                    if(m) {
                        me.addMethodToClass(m, object)
                    }
                    
                    m = me.getClassMethodObject(name)
                    if(m) {
                        me.addMethodToClass(m, object)
                    }
                })
                
                // Apply method modifiers
                Joose.A.each(this.methodModifiers, function applyMethodModifier (paras) {
                    object.meta.wrapMethod.apply(object.meta, paras)
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
        
        // the metaRoles prop allows a role to apply roles to the meta class of the class using the role
        handlePropmetaRoles: function (arrayOfRoles) {
            this.metaRoles = arrayOfRoles;
        }
    }
})

Joose.Role.anonymousClassCounter = 0;

})(JooseClass);
