Joose = function () {this.cc              = null;  
this.currentModule   = null
this.top             = window;this.globalObjects   = [];this.anonymouseClassCounter = 0;};Joose.A = {};Joose.A.each = function (array, func) {for(var i = 0; i < array.length; i++) {func(array[i], i)
}
}
Joose.A.exists = function (array, value) {for(var i = 0; i < array.length; i++) {if(array[i] == value) {return true
}
}
return false
}
Joose.A.concat = function (source, array) {source.push.apply(source, array)
return source
}
Joose.A.grep = function (array, func) {var a = [];Joose.A.each(array, function (t) {if(func(t)) {a.push(t)
}
})
return a
}
Joose.A.remove = function (array, removeEle) {var a = [];Joose.A.each(array, function (t) {if(t !== removeEle) {a.push(t)
}
})
return a
}
Joose.S = {};Joose.S.uppercaseFirst = function (string) {
var first = string.substr(0,1);var rest  = string.substr(1,string.length-1);first = first.toUpperCase()
return first + rest;}
Joose.S.isString = function (thing) {
if(typeof thing == "string") {return true
}
return false
}
Joose.O = {};Joose.O.each = function (object, func) {for(var i in object) {func(object[i], i)
}
}
Joose.prototype = {/*
* Differentiates between instances and classes
*/
isInstance: function(obj) {if(!obj.meta) {throw "isInstance only works with Joose objects and classes."
}
if(obj.constructor === obj.meta.c) {return true
}
return false
},
init: function () {this.builder = new Joose.Builder();this.builder.globalize()
},
components: function () {return [
"Joose.Builder",
"Joose.Class",
"Joose.Method",
"Joose.ClassMethod",
"Joose.Method",
"Joose.Attribute",
"Joose.Role",
"Joose.SimpleRequest",
"Joose.Gears",
"Joose.Storage",
"Joose.Storage.Unpacker",
"Joose.Decorator",
"Joose.Module",
"Joose.Prototype",
"Joose.TypeConstraint",
"Joose.TypeCoercion"
]
},
loadComponents: function (basePath) {var html = "";Joose.A.each(this.components(), function (name) {var url    = ""+basePath + "/" + name.split(".").join("/") + ".js";html += '<script type="text/javascript" src="'+url+'"></script>'
})
document.write(html)
}
}
Joose.copyObject = function (source, target) {var keys = "";Joose.O.each(source, function (value, name) {  keys+=", "+name; target[name] = value })
return target
};Joose.emptyFunction = function () {};var joose = new Joose();Joose.bootstrap = function () {var BOOT = new Joose.MetaClassBootstrap();
BOOT.builder    = Joose.MetaClassBootstrap;Joose.MetaClass = BOOT.createClass("Joose.MetaClass");Joose.MetaClass.meta.addNonJooseSuperClass("Joose.MetaClassBootstrap", BOOT)
Joose.MetaClass.meta.addMethod("initialize", function () { this._name = "Joose.MetaClass" })
var META     = new Joose.MetaClass();META.builder = Joose.MetaClass;Joose.Class  = META.createClass("Joose.Class")
Joose.Class.meta.addSuperClass(Joose.MetaClass);Joose.MetaClass.meta.addMethod("initialize", function () { this._name = "Joose.Class" })
}
Joose.bootstrap2 = function () {Joose.Builder.Globals.joosify("Joose.Method", Joose.Method)
Joose.Builder.Globals.joosify("Joose.Attribute", Joose.Attribute)
}
Joose.bootstrap3 = function () {}
/**
* @name Joose.Class
* @constructor
*/
/*
* Joose.MetaClassBootstrap is used to bootstrap the Joose.Class with a regular JS constructor
*/
/** ignore */ 
Joose.MetaClassBootstrap = function () {this._name            = "Joose.MetaClassBootstrap";this.methodNames      =    [];this.attributeNames   =    ["_name", "isAbstract", "isDetached", "methodNames", "attributeNames", "methods", "parentClasses", "roles", "c"];this.attributes       = {},
this.methods          = {};this.parentClasses    = [];this.roles            = [];this.isAbstract       = false;this.isDetached       = false;}
/** @ignore */
Joose.MetaClassBootstrap.prototype = {toString: function () {if(this.meta) {return "a "+this.meta.className();}
return "NoMeta"
},
/**
* Returns the name of the class
* @name className
* @function
* @memberof Joose.Class
*/
/** @ignore */
className: function () {return this._name
},
/**
* Returns the name of the class (alias to className())
* @name getName
* @function
* @memberof Joose.Class
*/
/** @ignore */
getName: function () {return this.className()
},
/**
* Creates a new empty meta class object
* @function
* @name newMetaClass
* @memberof Joose.Class
*/
/** @ignore */
newMetaClass: function () {var me  = this;var metaClassClass = this.builder;var c     = new metaClassClass();c.builder = metaClassClass;c._name   = this._name
c.methodNames    = []
c.attributeNames = []
c.methods        = {}
c.parentClasses  = []
c.roles          = []
c.attributes     = {}
var myMeta = this.meta;if(!myMeta) {myMeta = this;}
c.meta = myMeta
return c
},
/**
* Creates a new class object
* @function
* @name createClass
* @param {function} optionalConstructor If provided will be used as the class constructor (You should not need this)
* @param {Joose.Module} optionalModuleObject If provided the Module's name will be prepended to the class name
* @memberof Joose.Class
*/
/** @ignore */
createClass:    function (name, optionalConstructor, optionalModuleObject) {var meta  = this.newMetaClass();var c;if(optionalConstructor) {c = optionalConstructor
} else {c = this.defaultClassFunctionBody()
if(optionalModuleObject) {optionalModuleObject.addElement(c)
}
}
c.prototype.meta = meta
c.meta    = meta;if(name == null) {meta._name = "__anonymous__"
} else {var className = name;if(optionalModuleObject) {className = optionalModuleObject.getName() + "." + name
}
meta._name = className;}
meta.c = c;if(!optionalModuleObject) {joose.globalObjects.push(c)
}
meta.addInitializer();meta.addToString();meta.addDetacher();meta.validateClass();return c;},
buildComplete: function () {},
/**
* Returns a new instance of the class that this meta class instance is representing
* @function
* @name instantiate
* @memberof Joose.Class
*/
instantiate: function () {var f = function () {};f.prototype = this.c.prototype;f.prototype.constructor = this.c;var obj = new f();this.c.apply(obj, arguments);return obj;},
/**
* Returns the default constructor function for new classes. You might want to override this in derived meta classes
* Default calls initialize on a new object upon construction.
* The class object will stringify to it's name
* @function
* @name defaultClassFunctionBody
* @memberof Joose.Class
*/
/** @ignore */
defaultClassFunctionBody: function () {var f = function () {this.initialize.apply(this, arguments);};f.toString = function () {return this.meta.className()
}
return f;},
/**
* Adds a toString method to a class
* The default toString method will call the method stringify if available.
* This make overriding stringification easier because toString cannot
* be reliably overriden in some JS implementations.
* @function
* @name addToString
* @memberof Joose.Class
*/
/** @ignore */
addToString: function () {this.addMethod("toString", function () {if(this.stringify) {return this.stringify()
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
addInitializer: function () {if(!this.c.prototype.initialize) {this.addMethod("initialize", this.initializer())
}
},
/**
* Adds a toString method to a class
* @function
* @name initializer
* @memberof Joose.Class
*/
/** @ignore */
initializer: function () {return function initialize (paras) {var me = this;if(this.meta.isAbstract) {var name = this.meta.className();throw ""+name+" is an abstract class and may not instantiated."
}
var attributes = this.meta.getAttributes();for(var i in attributes) {var attr = attributes[i];attr.doInitialization(me, paras);}
}
},
dieIfString: function (thing) {if(Joose.S.isString(thing)) {throw new TypeError("Parameter must not be a string.")
}
},
addRole: function (roleClass) {this.dieIfString(roleClass);this.roles.push(roleClass);roleClass.meta.apply(this.getClassObject())
},
getClassObject: function () {return this.c
},
classNameToClassObject: function (className) {var top    = joose.top;var parts  = className.split(".");var object = top;for(var i = 0; i < parts.length; i++) {var part = parts[i];object   = object[part];if(!object) {throw "Unable to find class "+className
}
}
return object
},
addNonJooseSuperClass: function (name, object) {var pseudoMeta     = new Joose.MetaClassBootstrap();pseudoMeta.builder = Joose.MetaClassBootstrap;var pseudoClass    = pseudoMeta.createClass(name)
Joose.O.each(object, function(value, name) {if(typeof(value) == "function") {pseudoClass.meta.addMethod(name, value)
} else {pseudoClass.meta.addAttribute(name, {init: value})
}
})
this.addSuperClass(pseudoClass);},
importMethods: function (classObject) {var me    = this;var names = classObject.meta.getMethodNames();Joose.A.each(names, function (name) {var m = classObject.meta.dispatch(name);me.addMethodObject(m.meta.copy())
})
},
addSuperClass:    function (classObject) {this.dieIfString(classObject);var me    = this;var names = classObject.meta.getMethodNames();Joose.A.each(names, function (name) {var m = classObject.meta.dispatch(name);var o = m.meta.copy();o.setIsFromSuperClass(true)
me.addMethodObject(o)
})
Joose.O.each(classObject.meta.attributes, function (attr, name) {me.addAttribute(name, attr.getProps())
})
this.parentClasses.unshift(classObject)
},
_fixMetaclassIncompatability: function (superClass) {var superMeta     = superClass.meta;var superMetaName = superMeta.meta.className();if(
superMetaName == "Joose.Class"     ||
superMetaName == "Joose.MetaClass" ||
superMetaName == "Joose.MetaClassBootstrap") {return
}
if(this.meta.meta.isa(superMeta)) {return
}
var patched = superMeta.meta.instantiate(this);for(var i in patched) {this[i] = patched[i]
}
},
isa:            function (classObject) {this.dieIfString(classObject);var name = classObject.meta.className()
if(this.className() == name) {return true
}
for(var i = 0; i < this.parentClasses.length; i++) {var parent = this.parentClasses[i].meta
if(parent.className() == name) {return true
}
if(parent.isa(classObject)) {return true
}
}
return false
},
wrapMethod:  function (name, wrappingStyle, func, notPresentCB) {var orig = this.getMethodObject(name);if(orig) {this.addMethodObject( orig[wrappingStyle](func) )
} else {if(notPresentCB) {notPresentCB()
} else {throw new Error("Unable to apply "+wrappingStyle+" method modifier because method "+name+" does not exist");}
}
},
dispatch:        function (name) {return this.getMethodObject(name).asFunction()
},
hasMethod:         function (name) {return this.methods[name] != null
},
addMethod:         function (name, func, props) {var m = new Joose.Method(name, func, props);this.addMethodObject(m)
},
addClassMethod:         function (name, func, props) {var m = new Joose.ClassMethod(name, func, props);this.addMethodObject(m)
},
addMethodObject:         function (method) {var m              = method;var name           = m.getName();if(!this.methods[name]) {this.methodNames.push(name);}
this.methods[name] = m;method.addToClass(this.c)
},
attributeMetaclass: function () {return Joose.Attribute
},
addAttribute:     function (name, props) {var metaclass = this.attributeMetaclass();if(props && props.metaclass) {metaclass = props.metaclass
}
var at = new metaclass(name, props);at.apply(this.c)
},
getAttributes: function () {return this.attributes
},
getAttribute: function (name) {return this.attributes[name]
},
setAttribute: function (name, attributeObject) {return this.attributes[name] = attributeObject
},
getMethodObject: function (name) {return this.methods[name]
},
getAttributeNames: function () {return this.attributeNames;},
getInstanceMethods: function () {var a = [];Joose.O.each(this.methods, function (m) {if(!m.isClassMethod()) {a.push(m)
}
})
return a
},
getClassMethods: function () {var a = [];Joose.O.each(this.methods, function (m) {if(m.isClassMethod()) {a.push(m)
}
})
return a
},
getSuperClasses:    function () {return this.parentClasses;},
getRoles:    function () {return this.roles;},
getMethodNames:    function () {return this.methodNames;},
addDetacher: function () {this.addMethod("detach", function detach () {var meta = this.meta;if(meta.isDetached) {return 
}
var c    = meta.createClass(meta.className()+"__anon__"+joose.anonymouseClassCounter++);c.meta.addSuperClass(meta.getClassObject());c.meta.isDetached = true;this.meta      = c.meta;this.constructor = c;c.prototype = this;return
if(this.__proto__) {this.__proto__ = c.prototype
} else {   
for(var i in c.prototype) {if(this[i] == null) {this[i] = c.prototype[i]
}
}
}
})
},
/**
* Throws an exception if the class does not implement all methods required by it's roles
* @function
* @name validateClass
* @memberof Joose.Class
*/
validateClass: function () {var c  = this.getClassObject();var me = this;var throwException = true;Joose.A.each(this.roles, function(role) {role.meta.isImplementedBy(c, throwException)
})
},
/**
* Returns true if the class implements the method
* @function
* @name can
* @param {string} methodName The method
* @memberof Joose.Class
*/
can: function (methodName) {var method = this.methods[methodName];if(!method || method.isClassMethod()) {return false
}
return true
},
classCan: function (methodName) {var method = this.methods[methodName];if(!method || !method.isClassMethod()) {return false
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
does: function (roleObject) {for(var i = 0; i < this.roles.length; i++) {if(roleObject === this.roles[i]) {return true
}
}
for(var i = 0; i < this.roles.length; i++) {if(this.roles[i].meta.does(roleObject)) {return true
}
}
return false
},
/**
* Returns true if the given class implements all methods of the class
* @function
* @name does
* @param {Joose.Class} methodName The class object
* @memberof Joose.Class
*/
implementsMyMethods: function (classObject) {var complete = true
Joose.A.each(this.getMethodNames(), function (value) {var found = classObject.meta.can(value)
if(!found) {complete = false
}
})
return complete
}
};Joose.Attribute = function (name, props) {this.initialize(name, props)
}
Joose.Attribute.prototype = {_name:  null,
_props: null,
getName:    function () { return this._name },
getProps:    function () { return this._props },
initialize: function (name, props) {this._name  = name;this.setProps(props);},
setProps: function (props) {if(props) {this._props = props
} else {this._props = {};}
},
getIsa: function () {var props = this.getProps();if(props.isa) {if(!props.isa.meta) {return props.isa()
}
return props.isa
}
return
},
addSetter: function (classObject) {var meta  = classObject.meta;var name  = this.getName();var props = this.getProps();var isa   = this.getIsa();var func;if(isa) {func = function setterWithIsaCheck (value) {if(!value || !value.meta) {throw "The attribute "+name+" only accepts values that have a meta object."
}
if(!value.meta.isa(isa)) {throw "The attribute "+name+" only accepts values that are objects of type "+isa.meta.className()+"."
}
this[name] = value
return this;}
} else {func = function setter (value) {this[name] = value
return this;}
}
meta.addMethod(this.setterName(), func);},
addGetter: function (classObject) {var meta  = classObject.meta;var name  = this.getName();var props = this.getProps();var func  = function getter () {return this[name]
}
var init  = props.init;if(props.lazy) {func = function lazyGetter () {var val = this[name];if(typeof val == "function" && val === init) {this[name] = val.apply(this)
}
return this[name]
}
}
meta.addMethod(this.getterName(), func);},
initializerName: function () {return this.toPublicName()
},
getterName: function () {return "get"+Joose.S.uppercaseFirst(this.toPublicName())
},
setterName: function () {return "set"+Joose.S.uppercaseFirst(this.toPublicName())
},
isPrivate: function () {return this.getName().charAt(0) == "_"
},
toPublicName: function () {var name = this.getName();if(this.isPrivate()) {return name.substr(1)
}
return name
},
handleIs: function (classObject) {var meta  = classObject.meta;var name  = this.getName();var props = this.getProps();var is    = props.is;if(is == "rw" || is == "ro") {this.addGetter(classObject);}
if(is == "rw") {this.addSetter(classObject)
}
},
handleInit: function (classObject) {var props = this.getProps();var name  = this.getName();classObject.prototype[name]     = null;if(typeof props.init != "undefined") {var val = props.init;var type = typeof val;classObject.prototype[name] = val;}
},
handleProps: function (classObject) {this.handleIs(classObject);this.handleInit(classObject)
},
apply: function (classObject) {var meta  = classObject.meta;var name  = this.getName();this.handleProps(classObject)
meta.attributeNames.push(name)
meta.setAttribute(name, this)
meta.attributes[name] = this;}
}
Joose.Method = function (name, func, props) {this.initialize(name, func, props)
}
Joose.Method.prototype = {_name: null,
_body: null,
_props: null,
_isFromSuperClass: false,
getName:    function () { return this._name },
getBody:    function () { return this._body },
getProps:   function () { return this._props },
isFromSuperClass: function () {return this._isFromSuperClass
},
setIsFromSuperClass: function (bool) {this._isFromSuperClass = bool
},
copy: function () {return new Joose.Method(this.getName(), this.getBody(), this.getProps())
},
initialize: function (name, func, props) {this._name  = name;this._body  = func;this._props = props;func.name = "test"+name
func.meta   = this
},
isClassMethod: function () { return false },
apply:    function (thisObject, args) {return this._body.apply(thisObject, args)
},
addToClass: function (c) {c.prototype[this.getName()] = this.asFunction()
},
asFunction:    function () {return this._body
}
}
Joose.bootstrap()
/**
* Assorted tools to build a class
*
* The functions Class(), Module() and joosify() are global. All other methods
* may be used inside Class definitons like this:
*
* <pre>
* Module("com.test.me", function () {*   Class("MyClass", {*     isa: SuperClass,
*     methods: {*       hello: function () { alert('world') }
*     }
*   })
* })
* </pre>
* @constructor
*/
Joose.Builder = function () {/** @ignore */
this.globalize = function () {Joose.O.each(Joose.Builder.Globals, function (func, name) {joose.top[name] = func
});}
}
/** @ignore */
Joose.Builder.Globals = {/**
* Global function that creates or extends a module
* @function
* @param name {string} Name of the module
* @param functionThatCreatesClassesAndRoles {function} Pass a function reference that calls Class(...) as often as you want. The created classes will be put into the module
* @name Module
*/
/** @ignore */
Module: function (name, functionThatCreatesClassesAndRoles) {return Joose.Module.setup(name, functionThatCreatesClassesAndRoles)
},
Role: function (name, props) {if(!props.meta) {props.meta = Joose.Role;}
return Class(name, props)
},
Prototype: function (name, props) {if(!props.meta) {props.meta = Joose.Prototype;}
return Class(name, props);},
/**
* Global function that creates a class (If the class already exists it will be extended)
* @function
* @param name {string} Name of the the class
* @param props {object} Declaration if the class. The object keys are used as builder methods. The values are passed as arguments to the builder methods.
* @name Class
*/
/** @ignore */
Class:    function (name, props) {var c = null;if(name) {var className  = name;if(joose.currentModule) {className  = joose.currentModule.getName() + "." + name
}
var root       = joose.top;var parts      = className.split(".")
for(var i = 0; i < parts.length; i++) {root = root[parts[i]]
}
c = root;}
if(c == null) {var metaClass;/* Use the custom meta class if provided */
if(props && props.meta) {metaClass = props.meta
delete props.meta
}
/* Otherwise use the meta class of the parent class (If there is one)
* If the parent class is Joose.Class, we don't change the meta class but use the default
* because that Joose.Class's meta class is only needed for bootstrapping
* purposes. */
else if(props && props.isa && props.isa != Joose.Class) {metaClass = props.isa.meta.builder
}
/* Default meta class is Joose.Class */
else {metaClass   = Joose.Class;}
var aClass      = new metaClass();aClass.builder  = metaClass;var c           = aClass.createClass(name, null, joose.currentModule)
c.meta.builder  = metaClass
var className   = c.meta.className()
if(name && className) {var root = joose.top;var n = new String(className);var parts = n.split(".");for(var i = 0; i < parts.length - 1; i++) {if(root[parts[i]] == null) {root[parts[i]] = {};}
root = root[parts[i]];}
root[parts[parts.length - 1]] = c
}
}
joose.cc = c;if(props) {Joose.O.each(props, function (value, name) {
var builder = Joose.Builder.Builders[name];if(!builder) {throw new Error("Called invalid builder "+name+" while creating class "+c.meta.className())
}
var paras   = value;builder.call(Joose.Builder, paras)
})
c.meta.validateClass()
c.meta.buildComplete()
}
return c
},
Type: function (name, props) {var t = Joose.TypeConstraint.newFromTypeBuilder(name, props);var m = joose.currentModule
if(!m) {Module("TYPE")
m = TYPE.meta;}
m.addElement(t)
m.getContainer()[name] = t;return t
},
/**
* Global function to turn a regular JavaScript constructor into a Joose.Class
* @function
* @param name {string} Name of the class
* @param props {function} The constructor
* @name joosify
*/
/** @ignore */
joosify: function (standardClassName, standardClassObject) {var c         = standardClassObject;var metaClass = new Joose.Class();metaClass.builder = Joose.Class;c.toString = function () { return joose.cc.meta.className() }
c             = metaClass.createClass(standardClassName, c)
var meta = c.meta;for(var name in standardClassObject.prototype) {if(name == "meta") {continue
}
var value = standardClassObject.prototype[name]
if(typeof(value) == "function") {meta.addMethod(name, value)
} else {var props = {};if(typeof(value) != "undefined") {props.init = value
}
meta.addAttribute(name, props)
}
}
return c
},
/** @ignore */
rw: "rw",
/** @ignore */
ro: "ro"
};Joose.Builder.Builders = {isAbstract: function (bool) {joose.cc.meta.isAbstract = bool
},
/**
* Tells a role that the method name must be implemented by all classes that implement joose.cc role
* @function
* @param methodName {string} Name of the required method name
* @name requires
* @memberof Joose.Builder
*/
/** @ignore */
requires:    function (methodName) {if(!joose.cc.meta.meta.isa(Joose.Role)) { 
throw("Keyword 'requires' only available classes with a meta class of type Joose.Role")
}
if(methodName instanceof Array) {Joose.A.each(methodName, function (name) {joose.cc.meta.addRequirement(name)
})
} else {joose.cc.meta.addRequirement(methodName)
}
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
isa:    function (classObject) {joose.cc.meta.addSuperClass(classObject)
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
does:    function (role) {if(role instanceof Array) {Joose.A.each(role, function (aRole) {joose.cc.meta.addRole(aRole)
})
} else {joose.cc.meta.addRole(role)
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
has:    function (map) {if(typeof map == "string") {var name  = arguments[0];var props = arguments[1];joose.cc.meta.addAttribute(name, props)
} else { 
var me = joose.cc;Joose.O.each(map, function (props, name) {me.meta.addAttribute(name, props)
})
}
},
/**
* @ignore
*/
method: function (name, func, props) {joose.cc.meta.addMethod(name, func, props)
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
methods: function (map) {var me = joose.cc
Joose.O.each(map, function (func, name) {me.meta.addMethod(name, func)
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
classMethods: function (map) {var me = joose.cc
Joose.O.each(map, function (func, name2) {me.meta.addMethodObject(new Joose.ClassMethod(name2, func))
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
workers: function (map) {var me = joose.cc
Joose.O.each(map, function (func, name) {me.meta.addWorker(name, func)
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
before: function(map) {var me = joose.cc
Joose.O.each(map, function (func, name) {me.meta.wrapMethod(name, "before", func);})
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
after: function(map) {var me = joose.cc
Joose.O.each(map, function (func, name) {me.meta.wrapMethod(name, "after", func);})
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
around: function(map) {var me = joose.cc
Joose.O.each(map, function (func, name) {me.meta.wrapMethod(name, "around", func);})
},
/**
* Class builder method
* Defines override method modifieres for the class.
* The defined method modifiers will be called instead the method of the super class.
* You can call the method of the super class by calling joose.cc.SUPER(para1, para2)
* @function
* @param classObject {object} Maps method names to function bodies
* @name override
* @memberof Joose.Builder
*/
/** @ignore */
override: function(map) {var me = joose.cc
Joose.O.each(map, function (func, name) {me.meta.wrapMethod(name, "override", func);})
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
augment: function(map) {var me = joose.cc
Joose.O.each(map, function (func, name) {me.meta.wrapMethod(name, "augment", func, function () {me.meta.addMethod(name, func)
});})
},
/**
* @ignore
*/
decorates: function(map) {var me = joose.cc
Joose.O.each(map, function (classObject, attributeName) {me.meta.decorate(classObject, attributeName)
})
}
};joose.init();Joose.bootstrap2();/*
* A class for methods
* Originally defined in Joose.js
*/
Class("Joose.Method", {methods: {_makeWrapped: function (func) {return this.meta.instantiate(this.getName(), func); 
},
around: function (func) {var orig = this.getBody();return this._makeWrapped(function aroundWrapper () {var me = this;var bound = function () { return orig.apply(me, arguments) }
return func.apply(this, Joose.A.concat([bound], arguments))
})
},
before: function (func) {var orig = this.getBody();return this._makeWrapped(function beforeWrapper () {func.apply(this, arguments)
return orig.apply(this, arguments);})
},
after: function (func) {var orig = this.getBody();return this._makeWrapped(function afterWrapper () {var ret = orig.apply(this, arguments);func.apply(this, arguments);return ret
})
},
override: function (func) {var orig = this.getBody();return this._makeWrapped(function overrideWrapper () {var me      = this;var bound   = function () { return orig.apply(me, arguments) }
var before  = this.SUPER;this.SUPER  = bound;var ret     = func.apply(this, arguments);this.SUPER  = before;return ret
})
},
augment: function (func) {var orig = this.getBody();orig.source = orig.toString();return this._makeWrapped(function augmentWrapper () {var exe       = orig;var me        = this;var inner     = func
inner.source  = inner.toString();if(!this.__INNER_STACK__) {this.__INNER_STACK__ = [];};this.__INNER_STACK__.push(inner)
var before    = this.INNER;this.INNER    = function () {return  me.__INNER_STACK__.pop().apply(me, arguments) };var ret       = orig.apply(this, arguments);this.INNER    = before;return ret
})
}
}
})
Class("Joose.ClassMethod", {isa: Joose.Method,
methods: {isClassMethod: function () { return true },
addToClass: function (c) {c[this.getName()] = this.asFunction()
},
copy: function () {return new Joose.ClassMethod(this.getName(), this.getBody(), this.getProps())
}
}
})
/*
* A class for methods
* Originally defined in Joose.js
*/
Class("Joose.Method", {methods: {_makeWrapped: function (func) {return this.meta.instantiate(this.getName(), func); 
},
around: function (func) {var orig = this.getBody();return this._makeWrapped(function aroundWrapper () {var me = this;var bound = function () { return orig.apply(me, arguments) }
return func.apply(this, Joose.A.concat([bound], arguments))
})
},
before: function (func) {var orig = this.getBody();return this._makeWrapped(function beforeWrapper () {func.apply(this, arguments)
return orig.apply(this, arguments);})
},
after: function (func) {var orig = this.getBody();return this._makeWrapped(function afterWrapper () {var ret = orig.apply(this, arguments);func.apply(this, arguments);return ret
})
},
override: function (func) {var orig = this.getBody();return this._makeWrapped(function overrideWrapper () {var me      = this;var bound   = function () { return orig.apply(me, arguments) }
var before  = this.SUPER;this.SUPER  = bound;var ret     = func.apply(this, arguments);this.SUPER  = before;return ret
})
},
augment: function (func) {var orig = this.getBody();orig.source = orig.toString();return this._makeWrapped(function augmentWrapper () {var exe       = orig;var me        = this;var inner     = func
inner.source  = inner.toString();if(!this.__INNER_STACK__) {this.__INNER_STACK__ = [];};this.__INNER_STACK__.push(inner)
var before    = this.INNER;this.INNER    = function () {return  me.__INNER_STACK__.pop().apply(me, arguments) };var ret       = orig.apply(this, arguments);this.INNER    = before;return ret
})
}
}
})
/*
* This handles the following attribute properties
*  * init with function value in non-lazy initialization
*  * required attributes in initializaion
*  * handles for auto-decoration
*  * predicate for attribute availability checks
*/
Class("Joose.Attribute", {after: {handleProps: function (classObject) {this.handleHandles(classObject);this.handlePredicate(classObject);}
},
methods: {isPersistent: function () {var props = this.getProps()
if(props.persistent == false) {return false
}
return true
},
doInitialization: function (object, paras) {var  name  = this.initializerName();var _name  = this.getName();var value;var set    = false;if(typeof paras != "undefined" && typeof paras[name] != "undefined") {value = paras[name];set   = true;} else {var props = this.getProps();if(props.required) {throw "Required initialization parameter missing: "+name + "(While initializing "+object+")"
}
var init  = props.init;if(typeof init == "function" && !props.lazy) {value = init.call(object)
set   = true
}
}
if(set) {var setterName = this.setterName();if(object.meta.can(setterName)) { 
object[setterName](value)
} else { 
object[_name] = value
}
}
},
handleHandles: function (classObject) {var meta  = classObject.meta;var name  = this.getName();var props = this.getProps();var handles = props.handles;var isa     = props.isa
if(handles) {if(handles == "*") {if(!isa) {throw "I need an isa property in order to handle a class"
}
var optionalHandlerMaker = props.handleWith;meta.decorate(isa, name, optionalHandlerMaker)
}
else {throw "Unsupported value for handles: "+handles
}
}
},
handlePredicate: function (classObject) {var meta  = classObject.meta;var name  = this.getName();var props = this.getProps();var predicate = props.predicate;var getter    = this.getterName();if(predicate) {meta.addMethod(predicate, function () {var val = this[getter]();return val ? true : false
})
}
}
}
})
/*
* An Implementation of Traits
* see http:
*
* Current Composition rules:
* - At compile time we override existing (at the time of rule application) methods
* - At runtime we dont
*/
Class("Joose.Role", {isa: Joose.Class,
has: ["requiresMethodNames", "methodModifiers"],
methods: {wrapMethod: function () {this.methodModifiers.push(arguments)
var test = this.methodModifiers
},
requiresMethod: function (methodName) {var bool = false;Joose.A.each(this.requiresMethodNames, function (name) {if(methodName == name) {bool = true
}
})
return bool
},
addInitializer: Joose.emptyFunction,
defaultClassFunctionBody: function () {var f = function () {throw new Error("Roles may not be instantiated.")
};f.toString = function () { return this.meta.className() }
return f
},
addSuperClass: function () {throw new Error("Roles may not inherit from a super class.")
},
initialize: function () {this._name               = "Joose.Role"
this.requiresMethodNames = [];this.methodModifiers     = [];},
addRequirement: function (methodName) {this.requiresMethodNames.push(methodName)
},
apply: function (object) {if(joose.isInstance(object)) {object.detach();object.meta.addRole(this.getClassObject());} else {var me    = this;var names = this.getMethodNames();Joose.A.each(names, function (name) {var m = me.dispatch(name);if(!object.meta.hasMethod(name) || object.meta.getMethodObject(name).isFromSuperClass()) {object.meta.addMethodObject(m.meta)
}
})
Joose.A.each(this.methodModifiers, function (paras) {object.meta.wrapMethod.apply(object.meta, paras)
})
}
},
hasRequiredMethods: function (classObject, throwException) {var me       = this
var complete = true
Joose.A.each(this.requiresMethodNames, function (value) {var found = classObject.meta.can(value)
if(!found) {if(throwException) {throw("Class "+classObject.meta.className()+" does not fully implement the role "+me.meta.className()+". The method is "+value+" missing.")
}
complete = false
return
}
})
return complete
},
isImplementedBy: function (classObject, throwException) {var complete = this.hasRequiredMethods(classObject, throwException);if(complete) {complete = this.implementsMyMethods(classObject);}
return complete
}
}
})
Joose.Role.anonymousClassCounter = 0;/**
* Class to perform simple synchronous AJAX Requests used for component loading.
* @name Joose.SimpleRequest
* @class
*/
Class("Joose.SimpleRequest", {has: {_req: {}},
methods: {initialize: function () {if (window.XMLHttpRequest) {this._req = new XMLHttpRequest();} else {this._req = new ActiveXObject("Microsoft.XMLHTTP");}
},
/**
* Fetches text from an URL
* @name getText
* @param {string} url The URL
* @function
* @memberof Joose.SimpleRequest
*/
getText: function (url) {this._req.open("GET", url, false);try {this._req.send(null);if (this._req.status == 200 || this._req.status == 0)
return this._req.responseText;} catch (e) {throw("File not found: " + url);return null;};throw("File not found: " + url);return null;}
}
})
/**
* Joose.Gears is a meta class for classes that want to delegate work to gears workers
* @name Joose.Gears
* @extends Joose.Class
* @constructor
*/
Class("Joose.Gears", {isa: Joose.Class,
has: {wp: {  },
calls: { init: {} },
callIndex: { init: 0 }
},
methods: {initialize: function () {JooseGearsInitializeGears()
if(this.canGears()) {this.wp = google.gears.factory.create('beta.workerpool');var me = this;this.wp.onmessage = function (a,b,message) {me.handleGearsMessage(message)
}
}
},
handleGearsMessage: function (message) {var paras  = message.body
var cbName = paras.to;var ret    = paras.ret;var object = this.calls[paras.index];if(object.meta.can(cbName)) {object[cbName].call(object, ret)
}
},
canGears: function () {return window.google && window.google.gears && window.google.gears.factory
},
/**
* Adds a worker to the class
* @function
* @name addWorker
* @param {string} Name of the worker
* @param {function} Function body of the worker
* @param {props} Optional properties for the created method (ignored)
* @memberof Joose.Gears
*/
addWorker:         function (name, func, props) {var cbName  = "on"+Joose.S.uppercaseFirst(name)
var ajaxRequestFunc = this.meta.getClassObject().ajaxRequest;if(!this.canGears()) {var wrapped = function () {var me = this;var object = {sendReturn:     function (ret, cbName) { if(me.meta.can(cbName)) me[cbName].call(me, ret) },
clientHasGears: function () { return false },
ajaxRequest:    ajaxRequestFunc
};var ret = func.apply(object, arguments);object.sendReturn(ret, cbName)
}
this.addMethod(name, wrapped, props)
return
}
var jsonUrl = this.can("jsonURL") ? this.c.jsonURL() : "json2.js";var json    = new Joose.SimpleRequest().getText(jsonUrl)
var source  =
"var timer = google.gears.factory.create('beta.timer');\n"+ 
"function aClass () {}; aClass.prototype."+name+" = "+func.toString()+"\n\n"+
"aClass.prototype.clientHasGears = function () { return true }\n"+
"aClass.prototype.ajaxRequest = "+ajaxRequestFunc.toString()+"\n\n"+
"var wp = google.gears.workerPool;\n" +
"wp.onmessage = function (a,b,message) {\n"+
"var paras = message.body;\n"+
"var o = new aClass();\n"+
"o.sendReturn = function (ret, cbName) { wp.sendMessage({ ret: ret, to: cbName, index: paras.index }, message.sender) } \n"+
"var ret = o."+name+".apply(o, paras.args); if(!ret) ret = null; \n"+
"o.sendReturn(ret, paras.cbName);"+
"\n}\n\n";source += json
var wp      = this.wp;var childId = wp.createWorker(source)
var me      = this
var wrapped = function () {var args = [];for(var i = 0; i < arguments.length; i++) {args.push(arguments[i])
}
var message = { args: args, cbName: cbName, index: me.callIndex };wp.sendMessage(message, childId);me.calls[me.callIndex] = this
me.callIndex++
}
this.addMethod(name, wrapped, props)
}
},
classMethods: {setupGearsCompat: function () {window.timer = {setTimeout:    function () { return window.setTimeout.apply(window, arguments) },
setInterval:   function () { return window.setInterval.apply(window, arguments) },
clearTimeout:  function () { return window.clearTimeout.apply(window, arguments) },
clearInterval: function () { return window.clearInterval.apply(window, arguments) }
};},
clientHasGears: function () { 
return window.google && window.google.gears && window.google.gears.factory
},
ajaxRequest: function (method, url, data, callback) {var request
if(this.clientHasGears()) {request = google.gears.factory.create('beta.httprequest');} else {request = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();}
var dataString    = ""
if(data) {for(var i in data) {dataString += encodeURIComponent(i)+"="+encodeURIComponent(data[i])+"&"
}
}
var theUrl = url;if(data && method == "GET") {theUrl += "?"+dataString
}
request.open(method, theUrl, true);request.onreadystatechange = function onreadystatechange () {if (request.readyState == 4) {if(request.status >= 200 && request.status < 400) {var res = request.responseText;callback(res)
} else {throw new Error("Error fetching url "+theUrl+". Response code: " + request.status + " Response text: "+request.responseText)
}
}
};if(data && method == "POST") {request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
request.send(dataString)
} else {dataString = ""
request.send(dataString);}
}
}
})
function JooseGearsInitializeGears() {if (window.google && google.gears) {return;}
var factory = null;if (typeof GearsFactory != 'undefined') {factory = new GearsFactory();} else {try {factory = new ActiveXObject('Gears.Factory');if (factory.getBuildInfo().indexOf('ie_mobile') != -1) {factory.privateSetGlobalObject(this);}
} catch (e) {if (navigator.mimeTypes["application/x-googlegears"]) {factory = document.createElement("object");factory.style.display = "none";factory.width = 0;factory.height = 0;factory.type = "application/x-googlegears";document.documentElement.appendChild(factory);}
}
}
if (!factory) {return;}
if (!window.google) {google = {};}
if (!google.gears) {google.gears = {factory: factory};}
}
Class("Joose.Storage", {meta: Joose.Role,
methods: {toJSON: function () {return this.pack()
},
pack: function () {if(this.meta.can("prepareStorage")) {this.prepareStorage()
}
var o  = {__CLASS__: this.packedClassName()
};var me        = this;var attrs      = this.meta.getAttributes();Joose.O.each(attrs, function packAttr (attr, name) {if(attr.isPersistent()) {o[name]   = me[name];}
})
return o
},
packedClassName: function () {var name   = this.meta.className();var parts  = name.split(".");return parts.join("::");}
},
classMethods: {unpack: function (data) {var meta      = this.meta
var me        = meta.instantiate();var seenClass = false;Joose.O.each(data, function unpack (value,name) {if(name == "__CLASS__") {var className = Joose.Storage.Unpacker.packedClassNameToJSClassName(value)
if(className != me.meta.className()) {throw new Error("Storage data is of wrong type "+className+". I am "+me.meta.className()+".")
}
seenClass = true
return
}
me[name] = value
})
if(!seenClass) {throw new Error("Serialized data needs to include a __CLASS__ attribute.: "+data)
}
if(me.meta.can("finishUnpack")) {me.finishUnpack()
}
return me
}
}
})
Class("Joose.Storage.Unpacker", {classMethods: {unpack: function (data) {var name = data.__CLASS__;if(!name) {throw("Serialized data needs to include a __CLASS__ attribute.")
}
var jsName = this.packedClassNameToJSClassName(name)
var co = this.meta.classNameToClassObject(jsName);return co.unpack(data)
},
packedClassNameToJSClassName: function (packed) {
var parts  = packed.split("-");parts      = parts[0].split("::");return parts.join(".");},
jsonParseFilter: function (key, value) {if(value != null && typeof value == "object" && value.__CLASS__) {return Joose.Storage.Unpacker.unpack(value)
}
return value
},
patchJSON: function () {var orig = JSON.parse;JSON.parse = function JooseJSONParseFilter (s, filter) {return orig(s, function (key, value) {var val = value;if(filter) {val = filter(key, value)
}
return Joose.Storage.Unpacker.jsonParseFilter(key,val)
})
}
}
}
})
Class("Joose.Decorator", {meta: Joose.Role,
methods: {decorate: function (classObject, attributeName, optionalDelegatorFuncMaker) {var me = this;Joose.A.each(classObject.meta.getInstanceMethods(), function (m) {var name    = m.getName();var argName = attributeName;if(!me.can(name)) {var func = function () {var d = this[argName];return d[name].apply(d, arguments)
}
if(optionalDelegatorFuncMaker) {func = optionalDelegatorFuncMaker(name)
}
me.addMethod(name, func);}
})
}
}
})
Joose.Decorator.meta.apply(Joose.Class)
/*
Module("my.namespace", function () {Class("Test", {})
})
*/
Class("Joose.Module", {has: {_name: {is: rw
},
_elements: {is: rw
},
_container: {is: rw
}
},
classMethods: {setup: function (name, functionThatCreatesClassesAndRoles) {var me      = this;var parts   = name.split(".");var object  = joose.top;var soFar   = []
var module;for(var i = 0; i < parts.length; i++) {var part = parts[i];if(part == "meta") {throw "Module names may not include a part called 'meta'."
}
cur = object[part];soFar.push(part)
var name = soFar.join(".")
if(typeof cur == "undefined") {object[part]      = {};module            = new Joose.Module(name)
module.setContainer(object[part])
object[part].meta = module
Joose.Module._allModules.push(object[part])
} else {module = cur.meta;if(!(module && module.meta && (module.meta.isa(Joose.Module)))) {throw "Trying to setup module "+name+" failed. There is already something else: "+module
}
}
object = object[part]
}
var before = joose.currentModule
joose.currentModule = module
if(functionThatCreatesClassesAndRoles) {functionThatCreatesClassesAndRoles(object);}
joose.currentModule = before;return object
},
getAllModules: function () {return this._allModules
}
},
methods: {alias: function (destination) {var me = this;if(arguments.length == 0) {return this
}
Joose.A.each(this.getElements(), function (thing) {var global        = me.globalName(thing.meta.className());if(destination[global] === thing) { 
return
}
if(typeof destination[global] != "undefined") {throw "There is already something else in the spot "+global
}
destination[global] = thing;})
},
globalName: function (name) {var moduleName = this.getName();if(name.indexOf(moduleName) != 0) {throw "All things inside me should have a name that starts with "+moduleName+". Name is "+name
}
var rest = name.substr(moduleName.length + 1); 
if(rest.indexOf(".") != -1) {throw "The things inside me should have no more dots in there name. Name is "+rest
}
return rest
},
removeGlobalSymbols: function () {Joose.A.each(this.getElements(), function () {var global = this.globalName(thing.getName());delete joose.top[global]
})
},
initialize: function (name) {this.setElements([])
this.setName(name);},
isEmpty: function () {return this.getElements().length == 0
},
addElement: function (ele) {if(!(ele || ele.meta)) {throw "You may only add things that are Joose objects"
}
this._elements.push(ele)
},
getNames: function () {var names = [];Joose.A.each(this.getElements(), function (ele) { names.push(ele.meta.getName()) });return names
}
}
})
__global__ = {};__global__.meta = new Joose.Module();__global__.meta.setName("__global__");__global__.meta.setContainer(__global__);Joose.Module._allModules = [__global__];Module("__global__.nomodule", function () {})
__global__.nomodule.meta._elements = joose.globalObjects
Class("Joose.Prototype", {isa: Joose.Class,
override: {initializer: function () {var init = this.SUPER()
return function () {init.apply(this, arguments)
var meta = this.meta;this.meta = new Joose.PrototypeLazyMetaObjectProxy();this.meta.metaObject = meta
this.meta.object     = this;}
}
}
})
Class("Joose.PrototypeLazyMetaObjectProxy", {has: {metaObject: {is: rw,
isa: Joose.Class,
handles: "*",
handleWith: function (name) {return function () {
var o = this.object;o.meta = this.metaObject;o.detach()
o.meta[name].apply(o.meta, arguments)
}
}
},
object: {is: rw
}
}
})
Joose.bootstrap3()
Class("Joose.TypeConstraint", {has: {_constraints: {is: "ro",
init: function () { return [] }
},
_coercions: {is: "ro",
init: function () { return [] }
},
_messages: {is: "ro",
init: function () { return [] }
},
_name: {is: "ro"
}
},
classMethods: {newFromTypeBuilder: function (name, props) {var t
if(props.isa) {t = props.isa.makeSubType(name);} else {t = new Joose.TypeConstraint({ name: name });}
if(props.where) {t.addConstraint(props.where)
}
if(props.coerce) {for(var i = 0; i < props.coerce.length; i++) {var coercionProps = props.coerce[i];t.addCoercion(new Joose.TypeCoercion({from: coercionProps.from,
via:  coercionProps.via
}))
}
}
return t
}
},
methods: {stringify: function () {return this._name
},
makeSubType: function (name) {var t = new Joose.TypeConstraint({ name: name })
Joose.A.each(this._constraints, function (con) {t.addConstraint(con)
})
return t
},
addCoercion: function (coercion) {this._coercions.push(coercion);},
addConstraint: function (func, message) {this._constraints.push(func);this._messages.push(message)
},
validateBool: function (value) {var i = this._validate(value);if(i == -1) {return true
}
return false
},
validate: function (value) {var i = this._validate(value);if(i == -1) {return true
}
var message = this._messages[i];if(message) {throw new ReferenceError(message.apply(this, value))
}
throw new ReferenceError("The passed value ["+value+"] is not a "+this)
},
_validate: function (value) {var con = this._constraints;var i;for(i = 0, len = con.length; i < len; i++) {var func = con[i];var result = false;if(func instanceof RegExp) {result = func.test(value)
} else {result = func.call(this, value)
}
if(!result) {return i
}
}
return -1
},
coerce: function (value) {if(this.validateBool(value)) {return value
}
var coercions = this._coercions;for(var i = 0, len = coercions.length; i < len; i++) {var coercion = coercions[i];var result   = coercion.coerce(value);if(result != null) {return result
}
}
return null
}
}
})
Class("Joose.TypeCoercion", {has: {_from: {isa: Joose.TypeConstraint,
is:  "rw"
},
_via: {is: "rw"
}
},
methods: {coerce: function (value) {if(this._from.validateBool(value)) {return this._via(value)
}
return null
}
}
})