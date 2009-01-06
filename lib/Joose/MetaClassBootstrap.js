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

    
//remain    
    this.methodNames      = [];
    this.attributeNames   = ["_name", "isAbstract", "isDetached", "methodNames", "attributeNames", "methods", "parentClasses", "roles", "c"];
    this.classMethods     = {};
    this.roles            = []; // All roles
    this.myRoles          = []; // Only roles applied to me directly
    this.isAbstract       = false;
    this.isDetached       = false;
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
    
    buildComplete: function () {
        // may be overriden in sublass
    },
    
    // intializes a class from the class definitions
    initializeFromProps: function (props) {
        this._initializeFromProps(props)
    },
    
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
    
    /**
     * Returns a new instance of the class that this meta class instance is representing
     * @function
     * @name instantiate
     * @memberof Joose.Class
     */    
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
    
    /**
     * Adds the method returned by the initializer method to the class
     * @function
     * @name addInitializer
     * @memberof Joose.Class
     */
    /** @ignore */
    addInitializer: function () {
        if(!this.c.prototype.initialize) {
            this.addMethod("initialize", this.initializer())
        }
    },
    
    /**
     * Adds a toString method to a class
     * @function
     * @name initializer
     * @memberof Joose.Class
     */
    /** @ignore */
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
    
    addRole: function (roleClass) {
        this.dieIfString(roleClass);
        var c = this.getClassObject();
        if(roleClass.meta.apply(c)) {
            this.roles.push(roleClass);
            this.myRoles.push(roleClass);
        }
        
    },
    
    getClassObject: function () {
        return this.c
    },
    
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
    
//copied
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
    
//copied
//copied
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

    
//copied
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
    
    dispatch:        function (name) {
        return this.getMethodObject(name).asFunction()
    },
    
    hasMethod:         function (name) {
        return this.methods[name] != null || this.classMethods[name] != null
    },
    
    addMethod:         function (name, func, props) {
        var m = new Joose.Method(name, func, props);
        
        this.addMethodObject(m)
    },
    
    addClassMethod:         function (name, func, props) {
        var m = new Joose.ClassMethod(name, func, props);
        
        this.addMethodObject(m)
    },
    
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
    
    attributeMetaclass: function () {
        return Joose.Attribute
    },
    
    addAttribute:     function (name, props) {
        
        var metaclass = this.attributeMetaclass();
        
        if(props && props.metaclass) {
            metaclass = props.metaclass
        }
        
        var at = new metaclass(name, props);
        
        at.apply(this.c)
    },
    
    getAttributes: function () {
        return this.attributes
    },
    
    getAttribute: function (name) {
        return this.attributes[name]
    },
    
    setAttribute: function (name, attributeObject) {
        return this.attributes[name] = attributeObject
    },
    
    getMethodObject: function (name) {
        return this.methods[name]
    },
    
    getClassMethodObject: function (name) {
        return this.classMethods[name]
    },
    
    getAttributeNames: function () {
        return this.attributeNames;
    },
    
    getInstanceMethods: function () {
        var a = [];
        Joose.O.eachSafe(this.methods, function (m) {
            a.push(m)
        })
        return a
    },
    
    getClassMethods: function () {
        var a = [];
        Joose.O.eachSafe(this.classMethods, function (m) {
            a.push(m)
        })
        return a
    },

    getSuperClasses:    function () {
        return this.parentClasses;
    },
    
    getSuperClass:    function () {
        return this.parentClasses[0];
    },
    
    getRoles:    function () {
        return this.roles;
    },
    
    getMethodNames:    function () {
        return this.methodNames;
    },
    
    makeAnonSubclass: function () {
        var c    = this.createClass(this.className()+"__anon__"+joose.anonymouseClassCounter++);
        c.meta.addSuperClass(this.getClassObject());
        
        return c;
    },
    
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
    
    /**
     * Throws an exception if the class does not implement all methods required by it's roles
     * @function
     * @name validateClass
     * @memberof Joose.Class
     */
    validateClass: function () {
        var c  = this.getClassObject();
        var me = this;
        
        // Test whether all rows are fully implemented.
        var throwException = true;
        Joose.A.each(this.roles, function(role) {
              role.meta.isImplementedBy(c, throwException)
        })
    },
    
            /**
     * Returns true if the class implements the method 
     * @function
     * @name can
     * @param {string} methodName The method
     * @memberof Joose.Class
     */    
    can: function (methodName) {
        var method = this.methods[methodName];
        if(!method) {
            return false
        }
        return true
    },
    
    classCan: function (methodName) {
        var method = this.classMethods[methodName];
        if(!method) {
            return false
        }
        return true
    },
    
    
    /**
     * Returns true if the class implements a Role
     * @function
     * @name does
     * @param {Joose.Class} methodName The class object
     * @memberof Joose.Class
     */    
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
    
    /**
     * Returns true if the given class implements all methods of the class 
     * @function
     * @name does
     * @param {Joose.Class} methodName The class object
     * @memberof Joose.Class
     */    
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

    /**
     * Tells a role that the method name must be implemented by all classes that implement the role
     * @function
     * @param methodName {string} Name of the required method name
     * @name requires
     * @memberof Joose.Builder
     */    
    /** @ignore */
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
    
    handlePropisAbstract: function (bool) {
        this.isAbstract = bool
    },
    
    
    /**
     * Class builder method
     * Defines the super class of the class
     * @function
     * @param classObject {Joose.Class} The super class
     * @name isa
     * @memberof Joose.Builder
     */    
    /** @ignore */
    handlePropisa:    function (classObject) {
        if(classObject == null) {
            throw new Error("Super class is null")
        }
        this.addSuperClass(classObject)
    },
    /**
     * Class builder method
     * Defines a role for the class
     * @function
     * @param classObject {Joose.Role} The role
     * @name does
     * @memberof Joose.Builder
     */    
    /** @ignore */
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
    
    /**
     * Class builder method
     * Defines attributes for the class
     * @function
     * @param classObject {object} Maps attribute names to properties (See Joose.Attribute)
     * @name has
     * @memberof Joose.Builder
     */    
    /** @ignore */
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
    
    /**
     * @ignore
     */    
    handlePropmethod: function (name, func, props) {
        this.addMethod(name, func, props)
    },
    
    /**
     * Class builder method
     * Defines methods for the class
     * @function
     * @param classObject {object} Maps method names to function bodies
     * @name methods
     * @memberof Joose.Builder
     */    
    /** @ignore */
    handlePropmethods: function (map) {
        var me = this
        Joose.O.eachSafe(map, function (func, name) {
            me.addMethod(name, func)
        })
    },
    
    /**
     * Class builder method
     * Defines class methods for the class
     * @function
     * @param classObject {object} Maps class method names to function bodies
     * @name classMethods
     * @memberof Joose.Builder
     */    
    /** @ignore */
    handlePropclassMethods: function (map) {
        var me = this;
        Joose.O.eachSafe(map, function (func, name2) {
            me.addMethodObject(new Joose.ClassMethod(name2, func))
        })
    },
    
    /**
     * Class builder method
     * Defines workers for the class (The class must have the meta class Joose.Gears)
     * @function
     * @param classObject {object} Maps method names to function bodies
     * @name workers
     * @memberof Joose.Builder
     */    
    /** @ignore */
    handlePropworkers: function (map) {
        var me = this;
        Joose.O.eachSafe(map, function (func, name) {
            me.addWorker(name, func)
        })
    },
    
    /**
     * Class builder method
     * Defines before method modifieres for the class.
     * The defined method modifiers will be called before the method of the super class.
     * The return value of the method modifier will be ignored
     * @function
     * @param classObject {object} Maps method names to function bodies
     * @name before
     * @memberof Joose.Builder
     */    
    /** @ignore */
    handlePropbefore: function(map) {
        var me = this
        Joose.O.eachSafe(map, function (func, name) {
            me.wrapMethod(name, "before", func);
        }) 
    },
    
    /**
     * Class builder method
     * Defines after method modifieres for the class.
     * The defined method modifiers will be called after the method of the super class.
     * The return value of the method modifier will be ignored
     * @function
     * @param classObject {object} Maps method names to function bodies
     * @name after
     * @memberof Joose.Builder
     */    
    /** @ignore */
    handlePropafter: function(map) {
        var me = this
        Joose.O.eachSafe(map, function (func, name) {
            me.wrapMethod(name, "after", func);
        }) 
    },
    
    /**
     * Class builder method
     * Defines around method modifieres for the class.
     * The defined method modifiers will be called instead of the method of the super class.
     * The orginial function is passed as an initial parameter to the new function
     * @function
     * @param classObject {object} Maps method names to function bodies
     * @name around
     * @memberof Joose.Builder
     */    
    /** @ignore */
    handleProparound: function(map) {
        var me = this
        Joose.O.eachSafe(map, function (func, name) {
            me.wrapMethod(name, "around", func);
        }) 
    },
    
    /**
     * Class builder method
     * Defines override method modifieres for the class.
     * The defined method modifiers will be called instead the method of the super class.
     * You can call the method of the super class by calling this.SUPER(para1, para2)
     * @function
     * @param classObject {object} Maps method names to function bodies
     * @name override
     * @memberof Joose.Builder
     */    
    /** @ignore */
    handlePropoverride: function(map) {
        var me = this
        Joose.O.eachSafe(map, function (func, name) {
            me.wrapMethod(name, "override", func);
        }) 
    },
    
    /**
     * Class builder method
     * Defines augment method modifieres for the class.
     * These method modifiers will be called in "most super first" order
     * The methods may call this.INNER() to call the augement method in it's sup class.
     * @function
     * @param classObject {object} Maps method names to function bodies
     * @name augment
     * @memberof Joose.Builder
     */    
    /** @ignore */
    handlePropaugment: function(map) {
        var me = this
        Joose.O.eachSafe(map, function (func, name) {
            me.wrapMethod(name, "augment", func, function () {
                me.addMethod(name, func)
            });
        }) 
    },
    
    /**
     * @ignore
     */    
    handlePropdecorates: function(map) {
        var me = this
        Joose.O.eachSafe(map, function (classObject, attributeName) {
            me.decorate(classObject, attributeName)
        }) 
    }
};

Joose.bootstrap()

