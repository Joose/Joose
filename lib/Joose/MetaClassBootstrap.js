/**
 * @name Joose.Class
 * @constructor
 */
/*
 * Joose.MetaClassBootstrap is used to bootstrap the Joose.Class with a regular JS constructor
 */
/** ignore */ // Do not display the Bootstrap classes in the docs
Joose.MetaClassBootstrap = function () {

//copied
//copied
//copied
	this._name            = "Joose.MetaClassBootstrap";
    this.attributes       = {},
    this.methods          = {};
    this.parentClasses    = [];
	this.classMethods     = {};
    this.roles            = []; // All roles
    this.myRoles          = []; // Only roles applied to me directly
    this.isDetached       = false;
	this.isAbstract       = false;
    
//remain
        
    
//refactored out
    this.methodNames      = [];
    this.attributeNames   = ["_name", "isAbstract", "isDetached", "methodNames", "attributeNames", "methods", "parentClasses", "roles", "c"];
}
/** @ignore */
Joose.MetaClassBootstrap.prototype = {
    
//copied
//copied
//copied
    toString: function () {
        if(this.meta) {
            return "a "+this.meta.className();
        }
        return "NoMeta"
    },
    
//    /**
//     * Returns the name of the class
//     * @name className
//     * @function
//     * @memberof Joose.Class
//     */
//    /** @ignore */
    className: function () {
        return this._name
    },
    
//    /**
//     * Returns the name of the class (alias to className())
//     * @name getName
//     * @function
//     * @memberof Joose.Class
//     */
//    /** @ignore */
    getName: function () {
        return this.className()
    },
    
//    /**
//     * Creates a new empty meta class object
//     * @function
//     * @name newMetaClass
//     * @memberof Joose.Class
//     */
//    /** @ignore */
    newMetaClass: function () {
        
        var me  = this;
        
        var metaClassClass = this.builder;
        
        var c     = new metaClassClass();
        c.builder = metaClassClass;
        c._name   = this._name
        
        c.methodNames    = [];
        c.attributeNames = [];
        c.methods        = {};
        c.classMethods   = {};
        c.parentClasses  = [];
        c.roles          = [];
        c.myRoles        = [];
        c.attributes     = {};
        
        var myMeta = this.meta;
        if(!myMeta) {
            myMeta = this;
        }
        
        c.meta = myMeta
        
        return c
    },
    
//    /**
//     * Creates a new class object
//     * @function
//     * @name createClass
//     * @param {function} optionalConstructor If provided will be used as the class constructor (You should not need this)
//     * @param {Joose.Module} optionalModuleObject If provided the Module's name will be prepended to the class name 
//     * @memberof Joose.Class
//     */
//    /** @ignore */
    createClass:    function (name, optionalConstructor, optionalModuleObject) {
        var meta  = this.newMetaClass();
        
        var c;
        
        if(optionalConstructor) {
            c = optionalConstructor
        } else {
            c = this.defaultClassFunctionBody()
            
            if(optionalModuleObject) {
                optionalModuleObject.addElement(c)
                // meta.setModule(optionalModuleObject)
            }
        }
        
        c.prototype.meta = meta
        c.meta    = meta;
        if(name == null) {
            meta._name = "__anonymous__" 
        } else {
            var className = name;
            if(optionalModuleObject) {
                className = optionalModuleObject.getName() + "." + name
            }
            meta._name = className;
        }
        meta.c = c;
        
        // store them in the global object if they have no namespace
        // They will end up in the Module __JOOSE_GLOBAL__
        if(!optionalModuleObject) {
            // Because the class Joose.Module might not exist yet, we use this temp store
            // that will later be in the global module
            joose.globalObjects.push(c)
        }
        
        meta.addInitializer();
        meta.addToString();
        meta.addDetacher();
        
        return c;
    },
    
//copied
//copied
//copied
    buildComplete: function () {
        // may be overriden in sublass
    },
    
//copied
//copied
//copied
    // intializes a class from the class definitions
    initializeFromProps: function (props) {
        this._initializeFromProps(props)
    },
    
//copied
//copied
//copied
    _initializeFromProps: function (props) {
        var me = this;
        if(props) {
            
            if(joose.top.CHAOTIC_TRAVERSION_ORDER) {
                Joose.A.each(["isa", "does", "has", "method", "methods"], function (name) {
                    if(name in props) {
                        var value = props[name];
                        me._initializeFromProp(name, value, props)
                        delete props[name]
                    }
                })
            }
            
            // For each property of the class constructor call the builder
            Joose.O.eachSafe(props, function (value, name) {
                me._initializeFromProp(name, value, props)
            })
            
            for(var i = 0; i < this.roles.length; i++) {
                var role = this.roles[i];
                role.meta.applyMethodModifiers(this.c)
            }
            
            me.buildComplete();     
            me.validateClass();
        }
    },
    
//copied
//copied
//copied
    _initializeFromProp: function (propName, value, props) {
        var paras             = value;
        var customBuilderName = "handleProp"+propName;
        // if the meta class of the current class implements handleProp+nameOfBuilder we use that
        if(this.meta.can(customBuilderName)) {
            this[customBuilderName](paras, props)
        } else { // Otherwise use a builder from this file
            throw new Error("Called invalid builder "+propName+" while creating class "+this.className())
        }
    },
    
//    /**
//     * Returns a new instance of the class that this meta class instance is representing
//     * @function
//     * @name instantiate
//     * @memberof Joose.Class
//     */    
    instantiate: function () {
        //var o = new this.c.apply(this, arguments);
    
        // Ough! Calling a constructor with arbitrary arguments hack
        var f = function () {};
        f.prototype = this.c.prototype;
        f.prototype.constructor = this.c;
        var obj = new f();
        this.c.apply(obj, arguments);
        return obj;
    },
    
//    /**
//     * Returns the default constructor function for new classes. You might want to override this in derived meta classes
//     * Default calls initialize on a new object upon construction.
//     * The class object will stringify to it's name
//     * @function
//     * @name defaultClassFunctionBody
//     * @memberof Joose.Class
//     */
//    /** @ignore */
    defaultClassFunctionBody: function () {
        var f = function () {
            this.initialize.apply(this, arguments);
        };
        joose.addToString(f, function () {
            return this.meta.className()
        })
        return f;
    },
    
//    /**
//     * Adds a toString method to a class
//     * The default toString method will call the method stringify if available.
//     * This make overriding stringification easier because toString cannot
//     * be reliably overriden in some JS implementations.
//     * @function
//     * @name addToString
//     * @memberof Joose.Class
//     */
//    /** @ignore */
    addToString: function () {
        this.addMethod("toString", function () {
            if(this.stringify) {
                return this.stringify()
            }
            return "a "+ this.meta.className()
        })
    },
    
//    /**
//     * Adds the method returned by the initializer method to the class
//     * @function
//     * @name addInitializer
//     * @memberof Joose.Class
//     */
//    /** @ignore */
    addInitializer: function () {
        if(!this.c.prototype.initialize) {
            this.addMethod("initialize", this.initializer())
        }
    },
    
//    /**
//     * Adds a toString method to a class
//     * @function
//     * @name initializer
//     * @memberof Joose.Class
//     */
//    /** @ignore */
    initializer: function () {
        return function initialize (paras) {
            var me = this;
            if(this.meta.isAbstract) {
                var name = this.meta.className();
                throw ""+name+" is an abstract class and may not instantiated."
            }
            var attributes = this.meta.getAttributes();
            for(var i in attributes) {
                if(attributes.hasOwnProperty(i)) {
                    var attr = attributes[i];
                    attr.doInitialization(me, paras);
                }
            }
        }
    },
    
//copied
//copied
//copied
    dieIfString: function (thing) {
        if(Joose.S.isString(thing)) {
            throw new TypeError("Parameter must not be a string.")
        }
    },
    
//copied
//copied
//copied
    addRole: function (roleClass) {
        this.dieIfString(roleClass);
        var c = this.getClassObject();
        if(roleClass.meta.apply(c)) {
            this.roles.push(roleClass);
            this.myRoles.push(roleClass);
        }
        
    },
    
//copied
//copied
//copied
    getClassObject: function () {
        return this.c
    },
    
//copied
//copied
//copied
    classNameToClassObject: function (className) {
        var top    = joose.top;
        var parts  = className.split(".");
        var object = top;
        for(var i = 0; i < parts.length; i++) {
            var part = parts[i];
            object   = object[part];
            if(!object) {
                throw "Unable to find class "+className
            }
        }
        return object
    },
    
//required?
//copied
//copied
    addNonJooseSuperClass: function (name, object) {
        
        var pseudoMeta     = new Joose.MetaClassBootstrap();
        pseudoMeta.builder = Joose.MetaClassBootstrap;
        var pseudoClass    = pseudoMeta.createClass(name)
        
        Joose.O.each(object, function(value, name) {
            if(typeof(value) == "function") {
                pseudoClass.meta.addMethod(name, value)
            } else {
                pseudoClass.meta.addAttribute(name, {init: value})
            }
        })
        
        this.addSuperClass(pseudoClass);
    },
    

//partially copied to parthenogenesisMeta, overriding required for handling Class methods and Roles
//possible combine with addNonJooseSuperClass for automatical joosfiying
//copied
    addSuperClass:    function (classObject) {
        this.dieIfString(classObject);
        var me    = this;
        
        //this._fixMetaclassIncompatability(classObject)
        
        // Methods
        var names = classObject.meta.getMethodNames();
        for(var i = 0; i < names.length; i++) {
            var name = names[i]
            
            var m = classObject.meta.getMethodObject(name)
            if(m) {
                var method = m.copy();
                method.setIsFromSuperClass(true);
                me.addMethodObject(method)
            }
            m = classObject.meta.getClassMethodObject(name)
            if(m) {
                var method = m.copy();
                method.setIsFromSuperClass(true);
                me.addMethodObject(method)
            }
        } 
        
        // Attributes
        Joose.O.eachSafe(classObject.meta.attributes, function (attr, name) {
            me.addAttribute(name, attr.getProps())
        })
        
        // Roles
        var roles = classObject.meta.roles
        for(var i = 0; i < roles.length; i++) {
            var role = roles[i]
            me.roles.push(role)
        }
        
        this.parentClasses.unshift(classObject)
    },

    
//?
//copied
//copied
    _fixMetaclassIncompatability: function (superClass) {
        
        var superMeta     = superClass.meta;
        var superMetaName = superMeta.meta.className();
        
        if(
          superMetaName == "Joose.Class"     ||
          superMetaName == "Joose.MetaClass" || 
          superMetaName == "Joose.MetaClassBootstrap") {
            return
        }
        
        // we are compatible
        if(this.meta.meta.isa(superMeta)) {
            return
        }
        
        // fix this into becoming a superMeta
        var patched = superMeta.meta.instantiate(this);
        
        for(var i in patched) {
            this[i] = patched[i]
        }
    },
    

//copied
//copied
//copied
    isa:            function (classObject) {
        this.dieIfString(classObject);
        var name = classObject.meta.className()
        // Same type
        if(this.className() == name) {
            return true
        }
        // Look up into parent classes
        for(var i = 0; i < this.parentClasses.length; i++) {
            var parent = this.parentClasses[i].meta
            if(parent.className() == name) {
                return true
            }
            if(parent.isa(classObject)) {
                return true
            }
        }
        return false
    },
    
//copied
//copied
//copied
    wrapMethod:  function (name, wrappingStyle, func, notPresentCB) {
        
        var orig = this.getMethodObject(name);
        if(orig) {
            this.addMethodObject( orig[wrappingStyle](func) )
        } else {
            if(notPresentCB) {
                notPresentCB()
            } else {
                throw new Error("Unable to apply "+wrappingStyle+" method modifier because method "+name+" does not exist");
            }
        }
    },
    
//copied
//copied
//copied
    dispatch:        function (name) {
        return this.getMethodObject(name).asFunction()
    },
    
//copied
//copied
//copied
    hasMethod:         function (name) {
        return this.methods[name] != null || this.classMethods[name] != null
    },
    
//copied
//copied
//copied
    addMethod:         function (name, func, props) {
        var m = new Joose.Method(name, func, props);
        
        this.addMethodObject(m)
    },
    
//copied
//copied
//copied
    addClassMethod:         function (name, func, props) {
        var m = new Joose.ClassMethod(name, func, props);
        
        this.addMethodObject(m)
    },

    
//partially copied to parthenogenesisMeta, overriding required? for handling Class 
//copied
//copied
    addMethodObject:         function (method) {
        var m              = method;
        var name           = m.getName();
        
        if(!this.methods[name] && !this.classMethods[name]) {
            this.methodNames.push(name);
        }
        if(m.isClassMethod()) {
            this.classMethods[name] = m;
        } else {
            this.methods[name] = m;
        }
        
        method.addToClass(this.c)
    },

    
//copied
//copied
//copied    
    attributeMetaclass: function () {
        return Joose.Attribute
    },
    
    
//partially copied to parthenogenesisMeta, overriding required for handling all properties
//copied
//copied  
    addAttribute:     function (name, props) {
        
        var metaclass = this.attributeMetaclass();
        
        if(props && props.metaclass) {
            metaclass = props.metaclass
        }
        
        var at = new metaclass(name, props);
        
        at.apply(this.c)
    },
    
//copied
//copied
//copied       
    getAttributes: function () {
        return this.attributes
    },
    
//copied
//copied
//copied       
    getAttribute: function (name) {
        return this.attributes[name]
    },
    
//copied
//copied
//copied       
    setAttribute: function (name, attributeObject) {
        return this.attributes[name] = attributeObject
    },
    
    
//copied
//copied
//copied       
    getMethodObject: function (name) {
        return this.methods[name]
    },
    
    
    
//copied
//copied
//copied
    getClassMethodObject: function (name) {
        return this.classMethods[name]
    },
    
//copied
//copied
//copied       
    getAttributeNames: function () {
        return this.attributeNames;
    },
    
//copied
//copied
//copied       
    getInstanceMethods: function () {
        var a = [];
        Joose.O.eachSafe(this.methods, function (m) {
            a.push(m)
        })
        return a
    },
    
//copied
//copied
//copied       
    getClassMethods: function () {
        var a = [];
        Joose.O.eachSafe(this.classMethods, function (m) {
            a.push(m)
        })
        return a
    },

//copied
//copied
//copied  
    getSuperClasses:    function () {
        return this.parentClasses;
    },
    
//copied
//copied
//copied  
    getSuperClass:    function () {
        return this.parentClasses[0];
    },
    
//copied
//copied
//copied  
    getRoles:    function () {
        return this.roles;
    },
    
//copied
//copied
//copied  
    getMethodNames:    function () {
        return this.methodNames;
    },
    
//copied
//copied
//copied  
    makeAnonSubclass: function () {
        var c    = this.createClass(this.className()+"__anon__"+joose.anonymouseClassCounter++);
        c.meta.addSuperClass(this.getClassObject());
        
        return c;
    },
    
//copied
//copied
//copied  
    addDetacher: function () {
        this.addMethod("detach", function detach () {
            var meta = this.meta;
            
            if(meta.isDetached) {
                return // no reason to do it again
            } 
            
            var c    = meta.makeAnonSubclass()
            
            c.meta.isDetached = true;
            
            // appy the role to the anonymous class
            // swap meta class of object with new instance
            this.meta      = c.meta;
            // swap __proto__ chain of object to its new class
            // unfortunately this is not available in IE :(
            // object.__proto__ = c.prototype
 
            this.constructor = c;
            
            var proto;
            
            // Workaround for IE and opera to enable prototype extention via the meta class (by making them identical :)
            // This however makes Role.unapply impossible
            if(!this.__proto__) {
                proto = this
            } else {
                proto   = {};
                Joose.copyObject(this, proto)
            }
            
            
            c.prototype    = proto;
            this.__proto__ = c.prototype
            return
        })
    },
    
//    /**
//     * Throws an exception if the class does not implement all methods required by it's roles
//     * @function
//     * @name validateClass
//     * @memberof Joose.Class
//     */
    validateClass: function () {
        var c  = this.getClassObject();
        var me = this;
        
        // Test whether all rows are fully implemented.
        var throwException = true;
        Joose.A.each(this.roles, function(role) {
              role.meta.isImplementedBy(c, throwException)
        })
    },
    
//            /**
//     * Returns true if the class implements the method 
//     * @function
//     * @name can
//     * @param {string} methodName The method
//     * @memberof Joose.Class
//     */    
    can: function (methodName) {
        var method = this.methods[methodName];
        if(!method) {
            return false
        }
        return true
    },
    
//copied
//copied
//copied  
    classCan: function (methodName) {
        var method = this.classMethods[methodName];
        if(!method) {
            return false
        }
        return true
    },
    
    
//    /**
//     * Returns true if the class implements a Role
//     * @function
//     * @name does
//     * @param {Joose.Class} methodName The class object
//     * @memberof Joose.Class
//     */    
    does: function (roleObject) {
        
        for(var i = 0; i < this.roles.length; i++) {
            if(roleObject === this.roles[i]) {
                return true
            }
        }
        
        // dive into roles to find roles implemented by my roles
        for(var i = 0; i < this.roles.length; i++) {
            if(this.roles[i].meta.does(roleObject)) {
                return true
            }
        }
        
        return false
        // return classObject.meta.implementsMyMethods(this.getClassObject())
    },
    
//    /**
//     * Returns true if the given class implements all methods of the class 
//     * @function
//     * @name does
//     * @param {Joose.Class} methodName The class object
//     * @memberof Joose.Class
//     */    
    implementsMyMethods: function (classObject) {
        var complete = true
        // FIXME buggy if class methods are involved. Should roles have class methods?
        Joose.A.each(this.getMethodNames(), function (value) {
            var found = classObject.meta.can(value)
            if(!found) {
                complete = false
            }
        })
        return complete
    },
    
    // Class builders:

//    /**
//     * Tells a role that the method name must be implemented by all classes that implement the role
//     * @function
//     * @param methodName {string} Name of the required method name
//     * @name requires
//     * @memberof Joose.Builder
//     */    
//    /** @ignore */
    handleProprequires:    function (methodName) {
        var me = this;
        if(!this.meta.isa(Joose.Role)) {
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
    
//copied
//copied
//copied  
    handlePropisAbstract: function (bool) {
        this.isAbstract = bool
    },
    
    
//    /**
//     * Class builder method
//     * Defines the super class of the class
//     * @function
//     * @param classObject {Joose.Class} The super class
//     * @name isa
//     * @memberof Joose.Builder
//     */    
//    /** @ignore */
    handlePropisa:    function (classObject) {
        if(classObject == null) {
            throw new Error("Super class is null")
        }
        this.addSuperClass(classObject)
    },
//    /**
//     * Class builder method
//     * Defines a role for the class
//     * @function
//     * @param classObject {Joose.Role} The role
//     * @name does
//     * @memberof Joose.Builder
//     */    
//    /** @ignore */
    handlePropdoes:    function (role) {
        var me = this;
        if(role instanceof Array) {
            Joose.A.each(role, function (aRole) {
                me.addRole(aRole)
            })
        } else {
            me.addRole(role)
        }
        
    },
    
//    /**
//     * Class builder method
//     * Defines attributes for the class
//     * @function
//     * @param classObject {object} Maps attribute names to properties (See Joose.Attribute)
//     * @name has
//     * @memberof Joose.Builder
//     */    
//    /** @ignore */
    handleProphas:    function (map) {
        var me = this;
        if(typeof map == "string") {
            var name  = arguments[0];
            var props = arguments[1];
            me.addAttribute(name, props)
        } else { // name is a map
            Joose.O.eachSafe(map, function (props, name) {
                me.addAttribute(name, props)
            })
        }
    },
    
//    /**
//     * @ignore
//     */    
    handlePropmethod: function (name, func, props) {
        this.addMethod(name, func, props)
    },
    
//    /**
//     * Class builder method
//     * Defines methods for the class
//     * @function
//     * @param classObject {object} Maps method names to function bodies
//     * @name methods
//     * @memberof Joose.Builder
//     */    
//    /** @ignore */
    handlePropmethods: function (map) {
        var me = this
        Joose.O.eachSafe(map, function (func, name) {
            me.addMethod(name, func)
        })
    },
    
//    /**
//     * Class builder method
//     * Defines class methods for the class
//     * @function
//     * @param classObject {object} Maps class method names to function bodies
//     * @name classMethods
//     * @memberof Joose.Builder
//     */    
//    /** @ignore */
    handlePropclassMethods: function (map) {
        var me = this;
        Joose.O.eachSafe(map, function (func, name2) {
            me.addMethodObject(new Joose.ClassMethod(name2, func))
        })
    },
    
//    /**
//     * Class builder method
//     * Defines workers for the class (The class must have the meta class Joose.Gears)
//     * @function
//     * @param classObject {object} Maps method names to function bodies
//     * @name workers
//     * @memberof Joose.Builder
//     */    
//    /** @ignore */
//moved to Joose.Gears
    handlePropworkers: function (map) {
        var me = this;
        Joose.O.eachSafe(map, function (func, name) {
            me.addWorker(name, func)
        })
    },
    
//    /**
//     * Class builder method
//     * Defines before method modifieres for the class.
//     * The defined method modifiers will be called before the method of the super class.
//     * The return value of the method modifier will be ignored
//     * @function
//     * @param classObject {object} Maps method names to function bodies
//     * @name before
//     * @memberof Joose.Builder
//     */    
//    /** @ignore */
    handlePropbefore: function(map) {
        var me = this
        Joose.O.eachSafe(map, function (func, name) {
            me.wrapMethod(name, "before", func);
        }) 
    },
    
//    /**
//     * Class builder method
//     * Defines after method modifieres for the class.
//     * The defined method modifiers will be called after the method of the super class.
//     * The return value of the method modifier will be ignored
//     * @function
//     * @param classObject {object} Maps method names to function bodies
//     * @name after
//     * @memberof Joose.Builder
//     */    
//    /** @ignore */
    handlePropafter: function(map) {
        var me = this
        Joose.O.eachSafe(map, function (func, name) {
            me.wrapMethod(name, "after", func);
        }) 
    },
    
//    /**
//     * Class builder method
//     * Defines around method modifieres for the class.
//     * The defined method modifiers will be called instead of the method of the super class.
//     * The orginial function is passed as an initial parameter to the new function
//     * @function
//     * @param classObject {object} Maps method names to function bodies
//     * @name around
//     * @memberof Joose.Builder
//     */    
//    /** @ignore */
    handleProparound: function(map) {
        var me = this
        Joose.O.eachSafe(map, function (func, name) {
            me.wrapMethod(name, "around", func);
        }) 
    },
    
//    /**
//     * Class builder method
//     * Defines override method modifieres for the class.
//     * The defined method modifiers will be called instead the method of the super class.
//     * You can call the method of the super class by calling this.SUPER(para1, para2)
//     * @function
//     * @param classObject {object} Maps method names to function bodies
//     * @name override
//     * @memberof Joose.Builder
//     */    
//    /** @ignore */
    handlePropoverride: function(map) {
        var me = this
        Joose.O.eachSafe(map, function (func, name) {
            me.wrapMethod(name, "override", func);
        }) 
    },
    
//    /**
//     * Class builder method
//     * Defines augment method modifieres for the class.
//     * These method modifiers will be called in "most super first" order
//     * The methods may call this.INNER() to call the augement method in it's sup class.
//     * @function
//     * @param classObject {object} Maps method names to function bodies
//     * @name augment
//     * @memberof Joose.Builder
//     */    
//    /** @ignore */
    handlePropaugment: function(map) {
        var me = this
        Joose.O.eachSafe(map, function (func, name) {
            me.wrapMethod(name, "augment", func, function () {
                me.addMethod(name, func)
            });
        }) 
    },
    
//    /**
//     * @ignore
//     */    
//moved to Decorator
    handlePropdecorates: function(map) {
        var me = this
        Joose.O.eachSafe(map, function (classObject, attributeName) {
            me.decorate(classObject, attributeName)
        }) 
    }
};

//proto Method

// See http://code.google.com/p/joose-js/wiki/JooseMethod
Joose.Method = function (name, func, props) {
    this.initialize(name, func, props)
}

Joose.Method.prototype = {
    
    _name: null,
    _body: null,
    _props: null,
    _isFromSuperClass: false,
    
    getName:    function () { return this._name },
    getBody:    function () { return this._body },
    getProps:   function () { return this._props },
    
    isFromSuperClass: function () {
        return this._isFromSuperClass
    },
    
    setIsFromSuperClass: function (bool) {
        this._isFromSuperClass = bool
    },
    
    copy: function () {
        // Hardcode class name because at this point this.meta.instantiate might not work yet
        // this is later overridden in the file Joose/Method.js
        return new Joose.Method(this.getName(), this.getBody(), this.getProps())
    },
    
    initialize: function (name, func, props) {
        this._name  = name;
        this._body  = func;
        this._props = props;
        
        func.name   = name
    
        func.meta   = this
    },
    
    isClassMethod: function () { return false },
    
    apply:    function (thisObject, args) {
        return this._body.apply(thisObject, args)
    },
    
    addToClass: function (c) {
        c.prototype[this.getName()] = this.asFunction()
    },
    
    // direct call
    asFunction:    function () {
        return this._body
    }
}


//proto Attribute


// See http://code.google.com/p/joose-js/wiki/JooseAttribute
Joose.Attribute = function (name, props) {
    this.initialize(name, props)
}

Joose.Attribute.prototype = {
    
    _name:  null,
    _props: null,
    
    getName:    function () { return this._name },
    getProps:    function () { return this._props },
    
    initialize: function (name, props) {
        this._name  = name;
        this.setProps(props);
    },
    
    setProps: function (props) {
        if(props) {
            this._props = props
        } else {
            this._props = {};
        }
    },
    
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
    
    addSetter: function (classObject) {
        var meta  = classObject.meta;
        var name  = this.getName();
        var props = this.getProps();
        
        var setterName = this.setterName();
        
        if(meta.can(setterName)) { // do not override methods
            return
        }
        
        var isa   = this.getIsa();

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
        var meta  = classObject.meta;
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


Joose.bootstrap()

