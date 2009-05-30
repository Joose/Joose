Joose = function(){ throw "Modules may not be instantiated." }

Joose.top = this

// Static helpers for Arrays
Joose.A = {

    each : function (array, func, scope) {
        for (var i = 0, len = array.length; i < len; i++) func.call(scope || this, array[i], i)
    },
    
    exists : function (array, value) {
        for (var i = 0, len = array.length; i < len; i++) if (array[i] == value) return true
        	
        return false
    },
    
    concat : function (source, array) {
        source.push.apply(source, array)
        return source
    },
    
    grep : function (array, func) {
        var a = []
        Joose.A.each(array, function (t) {
            if (func(t)) a.push(t)
        })
        return a
    },
    
    remove : function (array, removeEle) {
        var a = []
        Joose.A.each(array, function (t) {
            if (t !== removeEle) a.push(t)
        })
        return a
    }
    
}

// Static helpers for Strings
Joose.S = {
	
	saneSplit : function(str, delimeter) {
        var res = (str || '').split(delimeter)
        if (res.length == 1 && !res[0]) res.shift()
        
        return res
	},
	

    uppercaseFirst : function (string) { 
        return string.substr(0, 1).toUpperCase() + string.substr(1, string.length - 1)
    }
    
}


// Static helpers for objects
Joose.O = {

    each : function (object, func, scope) {
        for(var i in object) func.call(scope || this, object[i], i)
        
        if (Joose.is_IE) {
            Joose.A.each([ 'toString', 'constructor', 'hasOwnProperty' ], function(el){
                if (object.hasOwnProperty(el)) func.call(scope || this, object[el], el); 
            })
        } 
    },
    
    
    eachSafe : function (object, func, scope) {
        Joose.O.each(object, function(value, name){
            if (object.hasOwnProperty(name)) func.call(scope || this, value, name)
        }, scope)
    },
    
    
    copy : function (source, target) {
        Joose.O.each(source, function (value, name) { target[name] = value })
        return target
    },
    
    
    copySafe : function (source, target) {
        Joose.O.eachSafe(source, function (value, name) { target[name] = value })
        return target
    },
    
    
    getMutableCopy : function (object) {
        var f = function(){}
        f.prototype = object
        return new f()
    },
    
    
    extend : function (target, source) {
        return Joose.O.copy(source, target)
    },
    
    
    isEmpty : function (object) {
		for (var i in object) if (object.hasOwnProperty(i)) return false
		
		return true
    },
    
    
    isInstance: function(obj) {
        return obj && obj.meta && obj.constructor == obj.meta.c
    },
    
    
    wantArray : function (obj) {
        if (obj instanceof Array) return obj
        
        return [ obj ]
    },
    
    
    eachU : function (obj, func, scope) {
        if (obj instanceof Array) 
            Joose.A.each(obj, func, scope)
        else if (typeof obj == 'object')
            Joose.O.each(obj, func, scope)
        else
            func.call(scope || this, obj)
    }    
    
}


//// Static helpers for functions?
//Joose.F = {
//    emptyFunction   : function () { return function(){} },
//    newArray        : function () { return [] },
//    newObject       : function () { return {} }
//}


//idea copied from Ext, source rewritten
//returns a function, tied to specifiec scope and arguments
//Joose.F.createDelegate = function (func, scope, argsArray, appendArgs) {
//    return function () {
//        var thisArgs
//        if (appendArgs) {
//            thisArgs = Array.prototype.slice(arguments).concat(argsArray)
//        } else {
//            thisArgs = argsArray
//        }
//        func.apply(scope || joose.top, thisArgs)
//    }
//}


// Rhino is the only popular JS engine that does not traverse objects in insertion order
// Check for Rhino (which uses the global Packages function) and set CHAOTIC_TRAVERSION_ORDER to true
//(function () {
//    
//    if(
//         typeof this["load"] == "function" &&
//         (
//            typeof this["Packages"] == "function" ||
//            typeof this["Packages"] == "object"
//         )
//   ) {
//        joose.CHAOTIC_TRAVERSION_ORDER = true
//   }
//})()


//XXX needs to be checked for IE8
try {
    Joose.is_IE = /msie/i.test(navigator.userAgent) && !/opera/i.test(navigator.userAgent)
} catch (e) {
    Joose.is_IE = false
};
(function(){

    Joose.Proto = function(){ throw "Modules may not be instantiated." }
    
    
    Joose.Proto.Object = function (){
        throw "Joose.Proto.Object can't be instantiated"
    }
    
    
        
    var findSuperCall = function(startFrom){
        //sufficient for Joose.Proto.Class
        var self = startFrom.caller
        
        if (!self.SUPER) throw "Invalid call to SUPER"
        
        //self._original is always undefined for Joose.Proto.Class
        return self._original || self.SUPER[self.methodName]
    }
    
    var SUPER = function (){
        return findSuperCall(SUPER).apply(this, arguments)
    }
    
    var SUPERARG = function (){
        return findSuperCall(SUPERARG).apply(this, arguments[0])
    }
    
    //XXX switch to closures    
    var INNER = function (){
        //sufficient for augment modifiers and original methods from Joose.Proto.Class
        var self = INNER.caller.caller
        
        //required for original methods from Joose.Managed.Class which can be also 'around' modifiers
        if (self.SUPER || self.AROUND) self = self.caller
        
        var callstack = self.__INNER_STACK__
        if (!callstack) throw "Invalid call to INNER"
        
        var augmentWrapper = function(){
            var innerCall = callstack.pop()
            
            return innerCall ? innerCall.apply(this, arguments) : undefined
        }
        
        augmentWrapper.__INNER_STACK__ = callstack
        
        return augmentWrapper.apply(this, arguments)
    }        
    
    
    Joose.Proto.Object.prototype = {
        
        SUPERARG : SUPERARG,
        SUPER : SUPER,
        INNER : INNER,        
        
        
        initialize: function () {
        },
        
        
        toString: function () {
            return "a " + this.meta.name
        },
        
        
		detach : function() {
			if (this.isDetached()) return
			
        	var detachedClass = new Joose.Meta.Class.Detached(null, { isa : this.constructor }).c
        	
        	detachedClass.meta.stem.open()
        	
        	detachedClass.prototype = this
        	
        	this.meta = detachedClass.meta
        	this.meta.originalClass = this.constructor
        	this.constructor = detachedClass
        	
        	detachedClass.meta.stem.close()
		},
		
		
		attach : function() {
			if (!this.isDetached()) return
			
			this.meta.stem.open()
			
			this.constructor.prototype = {}
			
			delete this.constructor
			delete this.meta
            
            //XXX hack for metaroles with custom builders
            if (this.builder && this.builder.isDetached()) this.builder.attach()
            if (this.stem && this.stem.isDetached()) this.stem.attach()
		},
        
        
        isDetached : function () {
            return this.meta instanceof Joose.Meta.Class.Detached 
        }
        
    }
        
    
    Joose.Proto.Object.meta = {
    	constructor : Joose.Proto.Object,
    	
        methods : Joose.Proto.Object.prototype,
        attributes : {}
    }
    
    Joose.Proto.Object.prototype.meta = Joose.Proto.Object.meta
    
    
    Joose.Proto.Empty = function(){ throw "Joose.Proto.Empty can't be instantiated" }
    
    Joose.Proto.Empty.meta = {
        methods : {},
        attributes : {}
    }
    

})();
(function(){

    Joose.Proto.Class = function () {
        this.initialize.apply(this, arguments)
    }
    
    var ANONYMOUS_CLASS_ID = 0
    
    var bootstrap = {
        
        constructor: Joose.Proto.Class,
        superClass : null,
        
        name: null,
        
        attributes: null,
        
        methods: null,
        
        meta: null,
        
        c: null,
        
        defaultSuperClass : Joose.Proto.Object,
        
        
        initialize: function (name, extend) {
            this.name = name || '__ANONYMOUS_CLASS__' + ANONYMOUS_CLASS_ID++
            extend = extend || {}
    
            this.extractConstructor(extend)
            
            this.adaptConstructor()
            
            if (extend.constructorOnly) return
            
            this.construct(extend)
        },
        
        
        construct : function (extend) {
            this.extractSuperClass(extend)
            this.processSuperClass()
            
            this.adaptPrototype()
            
            this.processStem(extend)
            
            this.extend(extend)
        },
        
        
        extractConstructor : function (extend) {
            this.c = extend.hasOwnProperty('constructor') ? extend.constructor : this.defaultConstructor()
            delete extend.constructor
        },
        
        
        extractSuperClass : function (extend) {
            this.superClass = extend.isa || this.defaultSuperClass
            delete extend.isa
        },
        
        
        processStem : function () {
            var superMeta = this.superClass.meta
            
            this.methods        = Joose.O.getMutableCopy(superMeta.methods)
            this.attributes     = Joose.O.getMutableCopy(superMeta.attributes)
        },
        
        
        
        defaultConstructor: function () {
            return function defaultConstructor() {
                this.initialize.apply(this, arguments)
            }
        },
        
        
        processSuperClass: function () {
            this.c.prototype    = Joose.O.getMutableCopy(this.superClass.prototype)
            this.c.superClass   = this.superClass.prototype
        },
        
        
        adaptConstructor: function () {
            var c = this.c
        
            c.meta = this
            
            if (!c.hasOwnProperty('toString')) c.toString = function () { return this.meta.name }
        },
    
        
        adaptPrototype: function () {
            var proto = this.c.prototype
        
            //this will fix weird semantic of native "constructor" property to more intuitive (idea borrowed from Ext)
            proto.constructor = this.c
            proto.meta = this
        },
        
        
        addMethod: function (name, func) {
            func.SUPER = this.superClass.prototype
            
            //chrome don't allow to redefine the "name" property
            func.methodName = name
            
            this.methods[name] = func
            this.c.prototype[name] = func
        },
        
        
        addAttribute: function (name, init) {
            this.attributes[name] = init
            this.c.prototype[name] = init
        },
        
        
        removeMethod : function (name){
            delete this.methods[name]
            delete this.c.prototype[name]
        },
    
        
        removeAttribute: function (name) {
            delete this.attributes[name]
            delete this.c.prototype[name]
        },
        
        
        hasMethod: function (name) { 
            return Boolean(this.methods[name])
        },
        
        
        hasAttribute: function (name) { 
            return typeof this.attributes[name] != 'undefined'
        },
        
    
        hasOwnMethod: function (name) { 
            return this.hasMethod(name) && this.methods.hasOwnProperty(name)
        },
        
        
        hasOwnAttribute: function (name) { 
            return this.hasAttribute(name) && this.attributes.hasOwnProperty(name)
        },
        
        
        extend : function (props) {
            Joose.O.eachSafe(props, function (value, name) {
                if (name != 'meta' && name != 'constructor') 
                    if (typeof value == 'function' && !value.meta) this.addMethod(name, value); else this.addAttribute(name, value)
            }, this)
        },
    
    
        subClassOf : function(classObject, extend) {
            extend = extend || {}
            extend.isa = classObject || this.c
            return new this.constructor(null, extend).c
        }
        
    }; 
    
    //micro bootstraping
    
    Joose.Proto.Class.prototype = Joose.O.getMutableCopy(Joose.Proto.Object.prototype)
    
    Joose.O.extend(Joose.Proto.Class.prototype, bootstrap)
    
    Joose.Proto.Class.prototype.meta = new Joose.Proto.Class('Joose.Proto.Class', bootstrap);    
    
})();
Joose.Managed = function(){ throw "Modules may not be instantiated." }

Joose.Managed.Property = new Joose.Proto.Class('Joose.Managed.Property', {
	
    name            : null,
    
    props           : null,
    value           : null,
    
    definedIn       : null,
    
    
    initialize : function(name, props) {
        this.name           = name
        this.props          = props
        
        this.definedIn      = props.definedIn
        
        this.computeValue(props)
    },
    
    
    computeValue : function(props){
        this.value = props.init
    },    
    
    
    //targetClass is still open at this stage ;)
    prepareApply : function(targetClass){
    },
    
    
    apply : function(target){
        target[this.name] = this.value
    },
    
    
    isAppliedTo : function(target) {
        return target[this.name] == this.value
    },
    
    
    unapply : function(from){
        if (!this.isAppliedTo(from)) throw "Unapply of property [" + this.name + "] from [" + from + "] failed"
        
        delete from[this.name]
    },
    
    
    clone : function (name){
        return new this.constructor(name || this.name, this.props)
    }
    
    
}).c;
Joose.Managed.Property.ConflictMarker = new Joose.Proto.Class('Joose.Managed.Property.ConflictMarker', {
    
	isa : Joose.Managed.Property,

    apply : function(target){
        throw "Attempt to apply ConflictMarker [" + this.name + "] to [" + target + "]"
    },
    
    
    unapply : function(from){
        throw "Attempt to unapply ConflictMarker [" + this.name + "] from [" + from + "]"
    }
    
}).c;
Joose.Managed.Property.Requirement = new Joose.Proto.Class('Joose.Managed.Property.Requirement', {
    
	isa : Joose.Managed.Property,

    apply : function(target){
        if (!target.meta.hasMethod(this.name)) throw "Requirement [" + this.name + "], defined in [" + this.definedIn.definedIn.name + "] is not satisfied for class [" + target + "]"
    },
    
    
    unapply : function(from){
    }
    
}).c;
Joose.Managed.Property.Attribute = new Joose.Proto.Class('Joose.Managed.Property.Attribute', {
    
	isa : Joose.Managed.Property,
    
    apply : function (target) {
        Joose.Managed.Property.Attribute.superClass.apply.call(this, target.prototype)
    },
    
    
    unapply : function (from) {
    	Joose.Managed.Property.Attribute.superClass.unapply.call(this, from.prototype)
    }
    
}).c;
Joose.Managed.Property.MethodModifier = new Joose.Proto.Class('Joose.Managed.Property.MethodModifier', {
    
	isa : Joose.Managed.Property,

    
    prepareWrapper : function(name, target, modifier, original, isOwn, superProto){
        throw "Abstract method [prepareWrapper] of " + this + " was called"
    },
    

    apply : function(target){
        var name = this.name
        var targetProto = target.prototype
        var isOwn = targetProto.hasOwnProperty(name)
        var original = targetProto[name]
        var superProto = target.meta.superClass.prototype
        var isCallToProto = superProto.meta.constructor == Joose.Proto.Class || superProto.meta.constructor == Joose.Proto.Object
        
        //original call (usual and array-variant)
        var originalCall, originalArgCall
        
        if (isOwn) { 
        	originalCall = function() {  return original.apply(this, arguments); }
        	originalArgCall = function() { return original.apply(this, arguments[0]); }
        } else if (isCallToProto) {
        	originalCall = function() {
        		var beforeSUPER = this.SUPER
        		var beforeSUPERARG = this.SUPERARG
        		
        		this.SUPER = superProto.SUPER
        		this.SUPERARG = superProto.SUPERARG
        		
	        	var res = superProto[name].apply(this, arguments)
	        	
	        	this.SUPER = beforeSUPER
	        	this.SUPERARG = beforeSUPERARG
	        	
	        	return res
	        }
	        
        	originalArgCall = function() {
        		var beforeSUPER = this.SUPER
        		var beforeSUPERARG = this.SUPERARG
        		
        		this.SUPER = superProto.SUPER
        		this.SUPERARG = superProto.SUPERARG
        		
	        	var res = superProto[name].apply(this, arguments[0])
	        	
	        	this.SUPER = beforeSUPER
	        	this.SUPERARG = beforeSUPERARG
	        	
	        	return res
	        }
        } else {
        	originalCall = function() { return superProto[name].apply(this, arguments); }
        	originalArgCall = function() { return superProto[name].apply(this, arguments[0]); }
        }
        
        var methodWrapper = this.prepareWrapper(name, this.value, originalCall, originalArgCall, superProto)
        
        if (isOwn) methodWrapper._original = original
        methodWrapper._contain = this.value
        
        targetProto[name] = methodWrapper
    },
    
    
    isAppliedTo : function(target) {
    	var targetCont = target.prototype[this.name]
    	
        return targetCont && targetCont._contain == this.value
    },
    
    
    unapply : function(from){
        var name = this.name
        var fromProto = from.prototype
        var original = fromProto[name]._original
        
        if (!this.isAppliedTo(from)) throw "Unapply of method [" + name + "] from class [" + from + "] failed"
        
        //if modifier was applied to own method - restore it
        if (original) 
        	fromProto[name] = original
        //otherwise - just delete it, to reveal the inherited method 
        else
            delete fromProto[name]
    }
    
}).c;
Joose.Managed.Property.MethodModifier.Override = new Joose.Proto.Class('Joose.Managed.Property.MethodModifier.Override', {
    
	isa : Joose.Managed.Property.MethodModifier,

    
    prepareWrapper : function(name, modifier, originalCall, originalArgCall, superProto) {
        
        var OVERRIDE = function (){
    		var beforeSUPER = this.SUPER
    		var beforeSUPERARG = this.SUPERARG
            
            this.SUPER  = originalCall
            this.SUPERARG = originalArgCall
            
            var res = modifier.apply(this, arguments)
            
        	this.SUPER = beforeSUPER
        	this.SUPERARG = beforeSUPERARG
            
            return res
        }
        
        OVERRIDE.methodName = name
        OVERRIDE.SUPER = superProto
        
        return OVERRIDE
    }
    
    
}).c;
Joose.Managed.Property.MethodModifier.Put = new Joose.Proto.Class('Joose.Managed.Property.MethodModifier.Put', {
    
	isa : Joose.Managed.Property.MethodModifier.Override,


    prepareWrapper : function(name, modifier, originalCall, originalArgCall, superProto) {
    	
//        if (isOwn) throw "Method [" + name + "] is applying over something [" + original + "] in class [" + target + "]"; 
        
        return Joose.Managed.Property.MethodModifier.Put.superClass.prepareWrapper.apply(this, arguments)
    }
    
    
}).c;
Joose.Managed.Property.MethodModifier.After = new Joose.Proto.Class('Joose.Managed.Property.MethodModifier.After', {
    
	isa : Joose.Managed.Property.MethodModifier,

    
    prepareWrapper : function(name, modifier, originalCall, originalArgCall, superProto) {
        
        var AFTER = function () {
            var res = originalCall.apply(this, arguments)
            modifier.apply(this, arguments)
            return res
        }
        
        return AFTER
    }    

    
}).c;
Joose.Managed.Property.MethodModifier.Before = new Joose.Proto.Class('Joose.Managed.Property.MethodModifier.Before', {
    
	isa : Joose.Managed.Property.MethodModifier,

    prepareWrapper : function(name, modifier, originalCall, originalArgCall, superProto) {
    	
        var BEFORE = function () {
            modifier.apply(this, arguments)
            return originalCall.apply(this, arguments)
        }
        
        return BEFORE
    }
    
}).c;
Joose.Managed.Property.MethodModifier.Around = new Joose.Proto.Class('Joose.Managed.Property.MethodModifier.Around', {
    
	isa : Joose.Managed.Property.MethodModifier,

    prepareWrapper : function(name, modifier, originalCall, originalArgCall, superProto) {
        
        var AROUND = function (){
            var me = this
            var bound = function () {
                return originalCall.apply(me, arguments)
            }
            
            return modifier.apply(this, Joose.A.concat([bound], arguments))
        }
        
        AROUND.AROUND = true
        
        return AROUND
    }
    
}).c;
Joose.Managed.Property.MethodModifier.Augment = new Joose.Proto.Class('Joose.Managed.Property.MethodModifier.Augment', {
    
	isa : Joose.Managed.Property.MethodModifier,

    prepareWrapper : function(name, modifier, originalCall, originalArgCall, superProto) {
    	
        var AUGMENT = function () {
            var callstack = []
            
            var self = AUGMENT
            
            do {
                callstack.push(self.OUTER ? self._contain : self)
                
                self = self.OUTER && (self._original || self.OUTER[self.methodName])
            } while (self)
            
            
            var augmentWrapper = function(){
                return callstack.pop().apply(this, arguments)
            }
            
            augmentWrapper.__INNER_STACK__ = callstack
            
            return augmentWrapper.apply(this, arguments)
        }
        
        AUGMENT.methodName = name
        AUGMENT.OUTER = superProto
        
        return AUGMENT
    }
    
}).c;
Joose.Managed.PropertySet = new Joose.Proto.Class('Joose.Managed.PropertySet', {
    
	isa                       : Joose.Managed.Property,

    properties                : null,
    
    propertyMetaClass         : Joose.Managed.Property,
    
    
    initialize : function(name, props) {
        props = props || {}
        
        Joose.Managed.PropertySet.superClass.initialize.call(this, name, props)
        
        this.properties = props.properties || {}
    },
    
    
    addProperty : function (name, props) {
        props.definedIn = this
        return this.properties[name] = new (props.meta || this.propertyMetaClass)(name, props)
    },
    
    
    addPropertyObject : function (object) {
        return this.properties[object.name] = object
    },
    
    
    removeProperty : function (name) {
        var prop = this.properties[name]
        
        //probably should be 
        //this.properties[name] = undefined
        delete this.properties[name]
        
        return prop
    },
    
    
    haveProperty : function(name) {
        return typeof this.properties[name] != 'undefined'
    },
    

    haveOwnProperty : function(name) {
        return this.haveProperty(name)
    },
    
    
    getProperty : function(name) {
        return this.properties[name]
    },
    
    
    each : function (func, scope){
        Joose.O.each(this.properties, function(property, name){
            if (typeof property != 'undefined') func.call(scope || this, property, name)
        })
    },
    
    
    clone : function (name){
        var propsCopy = Joose.O.copy(this.props, {})
        propsCopy.properties = Joose.O.getMutableCopy(this.properties)
        
        return new this.constructor(name || this.name, propsCopy); 
    },
    
    
    cleanClone : function (name){
    	//XXX benchmark both variants
        var propsCopy = Joose.O.copy(this.props, {})
//        var propsCopy = Joose.O.getMutableCopy(this.props)
        propsCopy.properties = {}
        
        return new this.constructor(name || this.name, propsCopy); 
    },
    
    
    alias : function (what){
    	var props = this.properties
    	
        Joose.O.each(what, function(aliasName, originalName){
            var original = props[originalName]
            
            if (original) this.addPropertyObject(original.clone(aliasName))
        }, this)
    },
    
    
    exclude : function (what){
        Joose.A.each(what, function(name){
            //not just "delete" to implicitly override possible inherited via getMutableCopy property
            if (this.properties[name]) this.properties[name] = undefined
        }, this)
    },
    
    
    flattenTo : function (target){
    	var targetProps = target.properties
    	
        this.each(function(property, name){
            var targetProperty = targetProps[name]
            
            if (targetProperty instanceof Joose.Managed.Property.ConflictMarker) return
            
            if (typeof targetProperty == 'undefined') {
                target.addPropertyObject(property)
                return
            }
            
            if (targetProperty == property) return
            
            target.removeProperty(name)
            target.addProperty(name, {
                meta : Joose.Managed.Property.ConflictMarker
            })
        }, this)
    },
    
    
    composeTo : function(target){
        this.each(function(property, name){
        	if (!target.haveOwnProperty(name)) target.addPropertyObject(property)
        })
    },
    
    
    composeFrom : function() {
    	if (!arguments.length) return
    	
        var flattening = this.cleanClone()
        
        Joose.A.each(arguments, function(arg) {
            var propSet = arg
            
            if (!(arg instanceof Joose.Managed.PropertySet)) {
                propSet = arg.propertySet
                
                if (arg.alias || arg.exclude) propSet = propSet.clone(); 
                
                if (arg.alias) propSet.alias(arg.alias)
                if (arg.exclude) propSet.exclude(arg.exclude)
            }
            
            propSet.flattenTo(flattening)
        })
        
        flattening.composeTo(this)
    },
    
    
    prepareApply : function(target){
        this.each(function(property){
            property.prepareApply(target)
        })
    },
    
    
    apply : function(target){
        this.each(function(property){
            property.apply(target)
        })
    },
    
    
    unapply : function(from){
        this.each(function(property){
            property.unapply(from)
        })
    }
    
    
}).c
;
(function(){
    
    var __ID__ = 1
    

    Joose.Managed.PropertySet.Mutable = new Joose.Proto.Class('Joose.Managed.PropertySet.Mutable', {
        
        isa                 : Joose.Managed.PropertySet,
    
        ID                  : null,
        
        derivatives         : null,
        
        //initially opened
        opened              : 1,
        
        composedFrom        : null,
        
        
        initialize : function(name, props) {
            Joose.Managed.PropertySet.Mutable.superClass.initialize.call(this, name, props)
            
            this.derivatives  = {}
            this.ID           = __ID__++
            this.composedFrom = []
        },
        
        
        setComposeInfo : function(){
            this.ensureOpen()
            
            Joose.A.each(this.composedFrom, function(arg) {
                var propSet = arg instanceof Joose.Managed.PropertySet ? arg : arg.propertySet
                    
                delete propSet.derivatives[this.ID]
            }, this)
            
            this.composedFrom = []
            
            this.addComposeInfo.apply(this, arguments)
        },
        
        
        addComposeInfo : function(){
            this.ensureOpen()
            
            Joose.A.each(arguments, function(arg) {
                this.composedFrom.push(arg)
                
                var propSet = arg instanceof Joose.Managed.PropertySet ? arg : arg.propertySet
                    
                propSet.derivatives[this.ID] = this
            }, this)
        },
        
        
        removeComposeInfo : function(){
            this.ensureOpen()
            
            Joose.A.each(arguments, function(arg) {
                
                var i = 0
                
                while (i < this.composedFrom.length) {
                    var propSet = this.composedFrom[i]
                    propSet = propSet instanceof Joose.Managed.PropertySet ? propSet : propSet.propertySet
                    
                    if (arg == propSet) {
                        delete propSet.derivatives[this.ID]
                        this.composedFrom.splice(i, 1)
                    } else i++
                }
                
            }, this)
        },
        
        
        ensureOpen : function(){
            if (!this.opened) throw "Mutation of closed property set: [" + this.name + "]"
        },
        
        
        addProperty : function (name, props) {
            this.ensureOpen()
            
            return Joose.Managed.PropertySet.Mutable.superClass.addProperty.call(this, name, props)
        },
        
    
        addPropertyObject : function (object) {
            this.ensureOpen()
            
            return Joose.Managed.PropertySet.Mutable.superClass.addPropertyObject.call(this, object)
        },
        
        
        removeProperty : function (name) {
            this.ensureOpen()
            
            return Joose.Managed.PropertySet.Mutable.superClass.removeProperty.call(this, name)
        },
        
        
        composeFrom : function() {
            this.ensureOpen()
            
            return Joose.Managed.PropertySet.Mutable.superClass.composeFrom.apply(this, this.composedFrom)
        },
        
        
        open : function(){
            this.opened++
            
            if (this.opened == 1) {
            
                Joose.O.each(this.derivatives, function(propSet){
                    propSet.open()
                })
                
                this.deCompose()
            }
        },
        
        
        close : function(){
            if (!this.opened) throw "Unmatched 'close' operation on property set: [" + this.name + "]"
            
            if (this.opened == 1) {
                this.reCompose()
                
                Joose.O.each(this.derivatives, function(propSet){
                    propSet.close()
                })
            }
            this.opened--
        },
        
        
        reCompose : function(){
            this.composeFrom()
        },
        
        
        deCompose : function(){
            this.each(function(property, name){
                if (property.definedIn != this) this.removeProperty(name)
            }, this)
        }
        
    }).c
    
    
})()

;
Joose.Managed.PropertySet.Containable = new Joose.Proto.Class('Joose.Managed.PropertySet.Containable', {
    
	isa                     : Joose.Managed.PropertySet.Mutable,

    //points to class
    targetMeta             : null,
    
    container               : null,

    
    initialize : function(name, props) {
        Joose.Managed.PropertySet.Containable.superClass.initialize.call(this, name, props)
        
        this.targetMeta        = props.targetMeta
        
        this.computeContainer()
    },
    
    
    computeContainer : function(){
        throw "Abstract method [computeContainer] of " + this + " was called"
    },
    
    
    addProperty : function (name, props) {
        return this.container[name] = Joose.Managed.PropertySet.Containable.superClass.addProperty.call(this, name, props)
    },
    

    addPropertyObject : function (object) {
        return this.container[object.name] = Joose.Managed.PropertySet.Containable.superClass.addPropertyObject.call(this, object)
    },
    

    removeProperty : function (name) {
        try {
            delete this.container[name]
        } catch(e) {
            this.container[name] = undefined
        }
        
        return Joose.Managed.PropertySet.Containable.superClass.removeProperty.call(this, name)
    },
    
    
    haveProperty : function(name) {
        return typeof this.container[name] != 'undefined'
    },
    
    
    haveOwnProperty : function(name) {
        return this.haveProperty(name) && this.container.hasOwnProperty(name)
    },
    
    
    getProperty : function(name) {
        return this.container[name]
    },
    
    
    cleanClone : function (name){
        var clon = Joose.Managed.PropertySet.Containable.superClass.cleanClone.call(this, name)
        clon.container = {}
        
        return clon; 
    }
    
    
}).c
;
Joose.Managed.StemElement = function(){ throw "Modules may not be instantiated." }

Joose.Managed.StemElement.Attributes = new Joose.Proto.Class('Joose.Managed.StemElement.Attributes', {
    
	isa : Joose.Managed.PropertySet.Containable,
    
    propertyMetaClass : Joose.Managed.Property.Attribute,
    
    
    computeContainer : function(props){
        this.container = this.targetMeta.attributes
    }
    
}).c
;
Joose.Managed.StemElement.Methods = new Joose.Proto.Class('Joose.Managed.StemElement.Methods', {
    
	isa : Joose.Managed.PropertySet.Containable,
    
    propertyMetaClass : Joose.Managed.Property.MethodModifier.Put,
    
    
    computeContainer : function(props){
        this.container = this.targetMeta.methods
    },
    
    
    prepareApply : function(){
    }
    
}).c;
Joose.Managed.StemElement.Requirements = new Joose.Proto.Class('Joose.Managed.StemElement.Requirements', {

	isa : Joose.Managed.PropertySet.Mutable,
    
    targetMeta             : null,
    
    propertyMetaClass : Joose.Managed.Property.Requirement,
    
    
    initialize : function(name, props) {
        Joose.Managed.StemElement.Requirements.superClass.initialize.call(this, name, props)
        
        this.targetMeta        = props.targetMeta
    },
    
    
    alias : function (){
    },
    
    
    exclude : function (){
    },
    
    
    flattenTo : function (target){
        this.each(function(property, name){
            if (!target.haveProperty(name)) target.addPropertyObject(property)
        }, this)
    },
    
    
    composeTo : function(target){
        this.flattenTo(target)
    },
    
    
    prepareApply : function(target){
    }
    
}).c;
Joose.Managed.StemElement.MethodModifiers = new Joose.Proto.Class('Joose.Managed.StemElement.MethodModifiers', {

	isa : Joose.Managed.PropertySet.Mutable,
	
	targetMeta             : null,
    
    propertyMetaClass : null,
    
    
    initialize : function(name, props) {
        Joose.Managed.StemElement.MethodModifiers.superClass.initialize.call(this, name, props)
        
        this.targetMeta        = props.targetMeta
    },
    
    
    addProperty : function (name, props) {
        props.definedIn         = this
        var modifier = new props.meta(name, props)
        
        if (!this.properties[name]) this.properties[name] = []
        this.properties[name].push(modifier)
        
        return modifier
    },
    

    addPropertyObject : function (object) {
        var name = object.name
        
        if (!this.properties[name]) this.properties[name] = []
        
        this.properties[name].push(object)
        
        return object
    },
    
    
    //remove only the last modifier
    removeProperty : function (name) {
        if (!this.haveProperty(name)) return undefined
        
        var modifier = this.properties[name].pop()
        
        //if all modifiers were removed - clearing the properties
        if (!this.properties[name].length) Joose.Managed.StemElement.MethodModifiers.superClass.removeProperty.call(this, name)
        
        return modifier
    },
    
    
    alias : function (){
    },
    
    
    exclude : function (){
    },
    
    
    flattenTo : function (target){
    	var targetProps = target.properties
    	
        this.each(function(modifiersArr, name){
            var targetModifiersArr = targetProps[name]
            
            if (typeof targetModifiersArr == 'undefined') targetModifiersArr = targetProps[name] = []
            
            Joose.A.each(modifiersArr, function(modifier) {
                if (!Joose.A.exists(targetModifiersArr, modifier)) targetModifiersArr.push(modifier)
            })
            
        }, this)
        
        return this
    },
    
    
    composeTo : function(target){
        this.flattenTo(target)
        
        return this
    },

    
    deCompose : function(){
        this.each(function(modifiersArr, name){
            var i = 0; 
            
            while (i < modifiersArr.length) if (modifiersArr[i].definedIn != this) modifiersArr.splice(i,1); else i++
            
        }, this)
    },
	
    
    prepareApply : function(target){
//        this.each(function(modifiersArr, name){
//            Joose.A.each(modifiersArr, function(modifier) {
//                modifier.prepareApply(target)
//            })
//        }, this)
    },

    
    apply : function(target){
        this.each(function(modifiersArr, name){
            Joose.A.each(modifiersArr, function(modifier) {
                modifier.apply(target)
            })
        }, this)
    },
    
    
    unapply : function(from){
        this.each(function(modifiersArr, name){
            for (var i = modifiersArr.length - 1; i >=0; i--) {
                modifiersArr[i].unapply(from)
            }
        }, this)
    }
    
    
    
}).c;
Joose.Managed.PropertySet.Composition = new Joose.Proto.Class('Joose.Managed.PropertySet.Composition', {
    
    isa                         : Joose.Managed.PropertySet.Mutable,
    
    propertyMetaClass           : Joose.Managed.PropertySet.Mutable,
    
    processOrder                : null,

    
    each : function (func, scope) {
    	var props = this.properties
    	
        Joose.A.each(this.processOrder, function(name){
            func.call(scope || this, props[name], name)
        }, this)
    },
    
    
    eachR : function (func, scope) {
    	var props = this.properties
    	
        for(var i = this.processOrder.length - 1; i >= 0; i--) 
            func.call(scope || this, props[this.processOrder[i]], this.processOrder[i])
    },
    
    
    clone : function (){
        var clone = this.cleanClone()
        
        this.each(function(property){
            clone.addPropertyObject(property.clone())
        })
        
        return clone
    },
    
    
    alias : function (what){
        this.each(function(property){
            property.alias(what)
        })
    },
    
    
    exclude : function (what){
        this.each(function(property){
            property.exclude(what)
        })
    },
    
    
    flattenTo : function (target){
    	var targetProps = target.properties
    	
        this.each(function(property, name){
            var subTarget = targetProps[name] || target.addProperty(name, {
                meta : property.constructor
            })
            
            property.flattenTo(subTarget)
        })
    },
    
    
    composeTo : function(target) {
    	var targetProps = target.properties
    	
        this.each(function(property, name){
            var subTarget = targetProps[name] || target.addProperty(name, {
                meta : property.constructor
            })
            
            property.composeTo(subTarget)
        })
    },
    
    
    
    deCompose : function() {
        this.eachR(function(property) {
            property.open()
        })
        
        Joose.Managed.PropertySet.Composition.superClass.deCompose.call(this)
    },
    
    
    reCompose : function() {
        Joose.Managed.PropertySet.Composition.superClass.reCompose.call(this)
        
        this.each(function(property) {
            property.close()
        })
    },
    
    
    unapply : function(from){
        this.eachR(function(property){
            property.unapply(from)
        })
    }
    
    
    
}).c
;
Joose.Managed.Stem = new Joose.Proto.Class('Joose.Managed.Stem', {
    
	isa                  : Joose.Managed.PropertySet.Composition,
    
    targetMeta          : null,
    
    attributesMC         : Joose.Managed.StemElement.Attributes,
    methodsMC            : Joose.Managed.StemElement.Methods,
    requirementsMC       : Joose.Managed.StemElement.Requirements,
    methodsModifiersMC   : Joose.Managed.StemElement.MethodModifiers,
    
    processOrder         : [ 'attributes', 'methods', 'requirements', 'methodsModifiers'],
    
    
    initialize : function(name, props) {
        var targetMeta = this.targetMeta = props.targetMeta
        
        Joose.Managed.Stem.superClass.initialize.call(this, name, props)
        
        this.addProperty('attributes', {
            meta : this.attributesMC,
            targetMeta : targetMeta
        })
        
        this.addProperty('methods', {
            meta : this.methodsMC,
            targetMeta : targetMeta
        })
        
        this.addProperty('requirements', {
            meta : this.requirementsMC,
            targetMeta : targetMeta
        })
        
        this.addProperty('methodsModifiers', {
            meta : this.methodsModifiersMC,
            targetMeta : targetMeta
        })
    },
    
    
    cleanClone : function (name){
        var emptyClass = new this.meta.constructor(null, {
            isa : Joose.Proto.Empty
        }).c
        
        return new this.constructor(name || this.name, {
            targetMeta : emptyClass.meta
        }); 
    },
    
    
    reCompose : function(){
        this.prepareApply(this.targetMeta.c)
        
        Joose.Managed.Stem.superClass.reCompose.call(this)
        
        this.apply(this.targetMeta.c)
    },
    
    
    deCompose : function(){
        this.unapply(this.targetMeta.c)
        
        Joose.Managed.Stem.superClass.deCompose.call(this)
    }
    
    
}).c
;
Joose.Managed.Builder = new Joose.Proto.Class('Joose.Managed.Builder', {
	
    //points to class
    targetMeta : null,
    
    initialize : function(props) {
        this.targetMeta = props.targetMeta
    },
    
    
    _buildStart : function(targetClassMeta, props){
        targetClassMeta.stem.open()
    },
    
    
    _extend : function(props) {
        var targetMeta = this.targetMeta
        
        this._buildStart(targetMeta, props)
        
        Joose.O.eachSafe(props, function(value, name) {
            var handler = this[name]
            
            if (!handler) throw "Unknow builder [" + name + "] was used during extending of [" + targetMeta.c + "]"
            
            handler.call(this, targetMeta, value)
        }, this)
        
        this._buildComplete(targetMeta, props)
    },
    

    _buildComplete : function(targetClassMeta, props){
        targetClassMeta.stem.close()
    },
    
    
    methods : function(targetClassMeta, info) {
        Joose.O.eachSafe(info, function(value, name) {
            targetClassMeta.addMethod(name, value)
        }, this)
    },
    

    removeMethods : function(targetClassMeta, info) {
        Joose.A.each(info, function(name) {
            targetClassMeta.removeMethod(name)
        }, this)
    },
    
    
    have : function(targetClassMeta, info) {
        Joose.O.eachSafe(info, function(value, name) {
            targetClassMeta.addAttribute(name, value)
        }, this)
    },
    
    
    havenot : function(targetClassMeta, info) {
        Joose.A.each(info, function(name) {
            targetClassMeta.removeAttribute(name)
        }, this)
    },
    

    havent : function(targetClassMeta, info) {
        this.havenot(targetClassMeta, info)
    },
    
    
    after : function(targetClassMeta, info) {
        Joose.O.each(info, function(value, name) {
            targetClassMeta.addMethodModifier(name, value, Joose.Managed.Property.MethodModifier.After)
        }, this)
    },
    
    
    before : function(targetClassMeta, info) {
        Joose.O.each(info, function(value, name) {
            targetClassMeta.addMethodModifier(name, value, Joose.Managed.Property.MethodModifier.Before)
        }, this)
    },
    
    
    override : function(targetClassMeta, info) {
        Joose.O.each(info, function(value, name) {
            targetClassMeta.addMethodModifier(name, value, Joose.Managed.Property.MethodModifier.Override)
        }, this)
    },
    
    
    around : function(targetClassMeta, info) {
        Joose.O.each(info, function(value, name) {
            targetClassMeta.addMethodModifier(name, value, Joose.Managed.Property.MethodModifier.Around)
        }, this)
    },
    
    
    augment : function(targetClassMeta, info) {
        Joose.O.each(info, function(value, name) {
            targetClassMeta.addMethodModifier(name, value, Joose.Managed.Property.MethodModifier.Augment)
        }, this)
    },
    
    
    removeModifier : function(targetClassMeta, info) {
        Joose.A.each(info, function(name) {
            targetClassMeta.removeMethodModifier(name)
        }, this)
    },
    
    
    does : function(targetClassMeta, info) {
        Joose.A.each(Joose.O.wantArray(info), function(desc) {
            targetClassMeta.addRole(desc)
        }, this)
    },
    

    doesnot : function(targetClassMeta, info) {
        Joose.A.each(Joose.O.wantArray(info), function(desc) {
            targetClassMeta.removeRole(desc)
        }, this)
    },
    
    
    doesnt : function(targetClassMeta, info) {
        this.doesnot(targetClassMeta, info)
    }
    
    
}).c;
Joose.Managed.Class = new Joose.Proto.Class('Joose.Managed.Class', {
    
    isa                         : Joose.Proto.Class,
    
    stem                        : null,
    stemClass                   : Joose.Managed.Stem,
    
    builder                     : null,
    builderClass                : Joose.Managed.Builder,
    
    
    construct: function (extend) {
        Joose.Managed.Class.superClass.construct.call(this, extend)
        
        this.stem.close()
    },
    
    
    processStem : function(){
        Joose.Managed.Class.superClass.processStem.call(this)
        
        this.builder    = new this.builderClass({ targetMeta : this })
        this.stem       = new this.stemClass(this.name, { targetMeta : this })
        
        var builderClass = this.getAttributedClass('builderClass')
        if (builderClass) this.addAttribute('builderClass', this.subClassOf(builderClass))
        
        var stemClass = this.getAttributedClass('stemClass')
        if (stemClass) this.addAttribute('stemClass', this.subClassOf(stemClass))
    },
    
    
    extend : function (props) {
        if (props.builder) {
        	this.getBuilderTarget().meta.extend(props.builder)
            delete props.builder
        }
        
        if (props.stem) {
        	this.getStemTarget().meta.extend(props.stem)
            delete props.stem
        }
        
        this.builder._extend(props)
    },
    
    
    getBuilderTarget : function(){
    	var builderClass = this.getAttributedClass('builderClass')
    	if (!builderClass) throw "Attempt to extend a builder on non-meta class"
    	
    	return builderClass
    },
    

    getStemTarget : function(){
    	var stemClass = this.getAttributedClass('stemClass')
    	if (!stemClass) throw "Attempt to extend a stem on non-meta class"
    	
    	return stemClass
    },
    
    
    getAttributedClass : function(attributeName) {
    	var attrClass = this.getAttribute(attributeName)
    	if (attrClass instanceof Joose.Managed.Property.Attribute) attrClass = attrClass.value
    	
    	return attrClass
    },
    
    
    addMethodModifier: function (name, func, type) {
        var props = {}
        props.init = func
        props.meta = type
        
        return this.stem.properties.methodsModifiers.addProperty(name, props)
    },
    
    
    removeMethodModifier: function (name) {
        return this.stem.properties.methodsModifiers.removeProperty(name)
    },
    
    
    addMethod: function (name, func, props) {
        props = props || {}
        props.init = func
        
        return this.stem.properties.methods.addProperty(name, props)
    },
    
    
    addAttribute: function (name, init, props) {
        props = props || {}
        props.init = init
        
        return this.stem.properties.attributes.addProperty(name, props)
    },
    
    
    removeMethod : function (name){
        return this.stem.properties.methods.removeProperty(name)
    },

    
    removeAttribute: function (name) {
        return this.stem.properties.attributes.removeProperty(name)
    },
    
    
    hasMethod: function (name) {
        return this.stem.properties.methods.haveProperty(name)
    },
    
    
    hasAttribute: function (name) { 
        return this.stem.properties.attributes.haveProperty(name)
    },
    
    
    hasOwnMethod: function (name) {
        return this.stem.properties.methods.haveOwnProperty(name)
    },
    
    
    hasOwnAttribute: function (name) { 
        return this.stem.properties.attributes.haveOwnProperty(name)
    },
    

    getMethod : function(name) {
        return this.stem.properties.methods.getProperty(name)
    },
    
    
    getAttribute : function(name) {
        return this.stem.properties.attributes.getProperty(name)
    },
    
    
    //XXX method need sanitizing
    addRole : function(){
        Joose.A.each(arguments, function(arg) {
            //instanceof Class to allow treat classes as roles
            var role = (arg.meta instanceof Joose.Managed.Class) ? arg : arg.role
            
            if (role.meta.builderRole) this.getBuilderTarget().meta.extend({
        		does : [ role.meta.builderRole ]
        	})
            
            if (role.meta.stemRole) this.getStemTarget().meta.extend({
        		does : [ role.meta.stemRole ]
        	})
            
            var desc = arg
            
            //instanceof Class to allow treat classes as roles
            if (!(desc.meta instanceof Joose.Managed.Class)) {
                desc.propertySet = desc.role.meta.stem
                delete desc.role
            } else
                desc = desc.meta.stem
            
            this.stem.addComposeInfo(desc)
        }, this)
    },
    
    
    removeRole : function(){
        Joose.A.each(arguments, function(role) {
        	
            if (role.meta.builderRole) this.getBuilderTarget().meta.extend({
        		doesnt : [ role.meta.builderRole ]
        	})
            
            if (role.meta.stemRole) this.getStemTarget().meta.extend({
        		doesnt : [ role.meta.stemRole ]
        	})
        	
        	
            this.stem.removeComposeInfo(role.meta.stem)
        }, this)
    }
    
}).c;
Joose.Managed.Role = new Joose.Managed.Class('Joose.Managed.Role', {
    
    isa                         : Joose.Managed.Class,
    
    have : {
        defaultSuperClass       : Joose.Proto.Empty,
        
	    builderRole				: null,
	    stemRole				: null
    },
    
    
    methods : {
        
        defaultConstructor: function () {
            return function () {
                throw "Roles cant be instantiated"
            }
        },
        

        processSuperClass : function() {
            if (this.superClass != this.defaultSuperClass) throw "Roles cant inherit from anything"
        },
        
        
	    getBuilderTarget : function(){
	    	if (!this.builderRole) this.builderRole = new this.constructor().c
	    	
	    	return this.builderRole
	    },
	    
	
	    getStemTarget : function(){
	    	if (!this.stemRole) this.stemRole = new this.constructor().c
	    	
	    	return this.stemRole
	    },
        
    
        hasOwnMethod: function (name) { 
            return this.hasMethod(name)
        },
        
        
        hasOwnAttribute: function (name) { 
            return this.hasAttribute(name)
        },
        
    
        addRequirement : function(methodName){
            this.stem.properties.requirements.addProperty(methodName, {})
        }
        
    },
    

    stem : {
    	methods : {
	        prepareApply : function() {
	        },
	        
	        
	        apply : function(){
	        },
	        
	        
	        unapply : function(){
	        }
    	}
    },
    
    
    builder : {
    	methods : {
	        requires : function(targetClassMeta, info) {
	            Joose.A.each(info, function(methodName) {
	                targetClassMeta.addRequirement(methodName)
	            }, this)
	        }
    	}
    }
    
}).c;
Joose.Meta = function(){ throw "Modules may not be instantiated." }

Joose.Meta.Object = new Joose.Proto.Class('Joose.Meta.Object', {
	
	isa : Joose.Proto.Object,

	
    initialize: function (config) {
    	config = config || {}
    	
    	Joose.O.each(this.meta.attributes, function(attribute, name) {
    		
    		if (attribute instanceof Joose.Managed.Attribute) {
    			var setValue, isSet = false
    			
    			if (config.hasOwnProperty(name)) {
    				setValue = config[name]
    				isSet = true
    			} else if (typeof attribute.props.init == 'function') {
    				setValue = attribute.props.init.call(this, name, config)
    				isSet = true
    			}
    			
    			
    			if (isSet)
    				if (this.meta.hasMethod(attribute.setterName)) 
    					this[attribute.setterName].call(this, setValue)
    				else
    					this[name] = setValue
				else if (attribute.required) 
					throw "Required attribute [" + name + "] is missed during initialization of " + this
    			
    		} else if (config.hasOwnProperty(name)) this[name] = config[name]
    		
    		
    	}, this)
    }

}).c;
Joose.Managed.Property.MetaRole = new Joose.Proto.Class('Joose.Managed.Property.MetaRole', {
    
	isa : Joose.Managed.Property
    
}).c;
Joose.Managed.StemElement.MetaRoles = new Joose.Proto.Class('Joose.Managed.StemElement.MetaRoles', {

	isa : Joose.Managed.StemElement.Requirements,
    
    //initially closed
    opened : 0,
    
    propertyMetaClass : Joose.Managed.Property.MetaRole,
    
    
    cleanClone : function (name) {
        var clone = Joose.Managed.StemElement.MetaRoles.superClass.cleanClone.call(this, name)
        
        clone.opened = 1
        
        return clone
    },
    
    
    apply : function (targetClass) {
        if (Joose.O.isEmpty(this.properties)) return
        
        var metaRoles = []
        
        this.each(function (property) {
            metaRoles.push(property.value)
        })
        
        var metaInstance = targetClass.meta
        
        metaInstance.detach()
        
        metaInstance.meta.extend({
            does : metaRoles
        })
    },
    
    
    unapply : function (from) {
        if (Joose.O.isEmpty(this.properties)) return
        
        from.meta.attach()
    },
    
    
    reCompose : function(){
        //commenting this, not needed stage
        //this.prepareApply(this.targetMeta.c)
        
        Joose.Managed.StemElement.MetaRoles.superClass.reCompose.call(this)
        
        this.apply(this.targetMeta.c)
    },
    
    
    deCompose : function(){
        this.unapply(this.targetMeta.c)
        
        Joose.Managed.StemElement.MetaRoles.superClass.deCompose.call(this)
    }
    
    
}).c;
Joose.Meta.MetaRole = new Joose.Managed.Role('Joose.Meta.MetaRole', {
    
    have : {
        metaRoles : null
    },
    
    
    builder : {
        
        override : {
            
            _extend : function(props) {
                var targetMeta = this.targetMeta
                
                this._buildStart(targetMeta, props)
                
                props = props || {}
                
                
                targetMeta.metaRoles.open()
                
                Joose.A.each([ 'metaRoles', 'removeMetaRoles', 'does', 'doesnot', 'doesnt' ], function (builder) {
                    if (props[builder]) {
                        var temp = props[builder]
                        delete props[builder]
                        
                        this[builder](targetMeta, temp)
                    }
                }, this)
                
                targetMeta.metaRoles.close()
                
                this.SUPER(props)
                
                this._buildComplete(targetMeta, props)
            }
        },
        
    	
    	methods : {
            
		    metaRoles : function(targetClassMeta, info) {
                
                Joose.A.each(Joose.O.wantArray(info), function (metaRole) {
                    
                    targetClassMeta.metaRoles.addProperty(metaRole.meta.name, { init : metaRole })
                })
		    },
            
            
            removeMetaRoles : function(targetClassMeta, info) {
                
                Joose.A.each(Joose.O.wantArray(info), function (metaRole) {
                    
                    targetClassMeta.metaRoles.removeProperty(metaRole.meta.name)
                })
            } 
    	}
    		
    },
    
    
    before : {
        
        //NOTE - not 'after initialize'
        construct : function () {
            
            this.metaRoles = new Joose.Managed.StemElement.MetaRoles(name, {
                targetMeta : this
            })
        },
        
        
        addRole : function() {
            
            Joose.A.each(arguments, function(arg){
                var role = (arg.meta instanceof Joose.Managed.Class) ? arg : arg.role
                
                if (role.meta.meta.hasAttribute('metaRoles') && role.meta.metaRoles) this.metaRoles.addComposeInfo(role.meta.metaRoles)
            }, this)
            
        },
        
        
        removeRole : function(){
            
            Joose.A.each(arguments, function(role){
                if (role.meta.meta.hasAttribute('metaRoles') && role.meta.metaRoles) this.metaRoles.removeComposeInfo(role.meta.metaRoles)
            }, this)
            
        }
        
    }
    
    
}).c



//Joose.Meta.Class.meta.extend({
//    does                        : [ Joose.Meta.MetaRole ]
//})
//
//
//Joose.Meta.Role.meta.extend({
//    does                        : [ Joose.Meta.MetaRole ]
//})
;
Joose.Meta.Class = new Joose.Managed.Class('Joose.Meta.Class', {
    
    isa                         : Joose.Managed.Class,
    
    does                        : Joose.Meta.MetaRole,
    
    have : {
    	defaultSuperClass : Joose.Meta.Object
    }
    
}).c;
Joose.Meta.Role = new Joose.Meta.Class('Joose.Meta.Role', {
    
    isa                         : Joose.Managed.Role,
    
    does                        : Joose.Meta.MetaRole,
    
    methods : {

	    //'to' must be instance 
        apply : function(to) {
        	if (!Joose.O.isInstance(to)) throw "Role can be applied only to Joose instance"
        	
        	if (!to.meta.hasMethod('detach')) throw "Apply failed: Instance [" + to + "] has no 'detach' method"
        	
        	to.detach()
        	
        	to.meta.extend({ does : [ this.c ] })
        },
        
        
        //instance remains detached
        unapply : function(from) {
        	if (!Joose.O.isInstance(from)) throw "Role can be unapplied only from Joose instance"
        	
        	if (!(from.meta instanceof Joose.Meta.Class.Detached)) throw "Instance [" + from + "] is not detached"
        	
        	from.meta.extend({ doesnt : [ this.c ] })
        }
        
    	
    }
    
}).c;
Joose.Meta.Class.Detached = new Joose.Meta.Class('Joose.Meta.Class.Detached', {
    
    isa                         : Joose.Meta.Class,
    
    have : {
    	originalClass : null
    },
    
    stem : {
    	
    	have : {
    		woAttributes         : [ 'methods', 'requirements', 'methodsModifiers']
    	},
    	
    	override : { 
    		
	        prepareApply : function(target) {
	        	this.processOrder = this.woAttributes
	        	
	        	this.SUPER(target)
	        	
	        	delete this.processOrder
	        },
	        
	        
	        apply : function(target){
	        	this.processOrder = this.woAttributes
	        	
	        	this.SUPER(target)
	        	
	        	delete this.processOrder
	        },
	        
	        
	        unapply : function(target){
	        	this.processOrder = this.woAttributes
	        	
	        	this.SUPER(target)
	        	
	        	delete this.processOrder
	        }
    	}
    	
    },
    
    
    methods : {
        
        getBuilderTarget : function () {
            var builder = this.c.prototype.builder
            
            if (!builder.isDetached()) builder.detach()
            
            return builder
        },
        
    
        getStemTarget : function () {
            var stem = this.c.prototype.stem
            
            if (!stem.isDetached()) stem.detach()
            
            return stem
        }
        
    }
    
    
}).c;
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
//});
Joose.Managed.PropertySet.Namespace = new Joose.Proto.Class('Joose.Managed.PropertySet.Namespace', {
    
	isa : Joose.Managed.PropertySet.Containable,
    
    propertyMetaClass : null,
    
    
    computeContainer : function(props){
        this.container = this.targetMeta.c
    },
    
    
    apply : function(target){
        this.each(function(property, name){
        	this.container[name] = property
        }, this)
    },
    
    
    unapply : function(){
        this.each(function(property, name){
	        try {
	            delete this.container[name]
	        } catch(e) {
	            this.container[name] = undefined
	        }
        }, this)
    },
    
    
    
    prepareApply : function(){
    },
    
    
    addProperty : function (name, value) {
        if (value && value.meta && value.meta.meta.hasAttribute('ns')) value.meta.parent = this.targetMeta.ns
        
        return this.container[name] = this.properties[name] = value
    },
    

    haveOwnProperty : function(name) {
        return this.haveProperty(name);// && this.container.hasOwnProperty(name)
    },
    
    
    addPropertyObject : function (object) {
    }
    
    
}).c
;
Joose.Managed.Attribute.Builder = new Joose.Managed.Role('Joose.Managed.Attribute.Builder', {
    
    
    have : {
    	defaultAttributeClass : Joose.Managed.Attribute
    },
    
    builder : {
    	
    	methods : {
			has : function (targetClassMeta, info) {
		        Joose.O.eachSafe(info, function(props, name) {
		        	if (typeof props != 'object' || props == null) props = { init : props }
		        	
		        	props.meta = props.meta || targetClassMeta.defaultAttributeClass
		        	
		            targetClassMeta.addAttribute(name, props.init, props)
		        }, this)
			},
			
			
		    hasnot : function(targetClassMeta, info) {
		        this.havenot(targetClassMeta, info)
		    },
		    
		    
		    hasnt : function(targetClassMeta, info) {
		        this.hasnot(targetClassMeta, info)
		    }
    	}
    		
    }
    
}).c



//Joose.Meta.Class.meta.extend({
//    does                        : [ Joose.Managed.Attribute.Builder ]
//})
//
//
//Joose.Meta.Role.meta.extend({
//    does                        : [ Joose.Managed.Attribute.Builder ]
//})
;
//XXX
//currently symbiont's metaclass is the same as metaclass of hoster, thus metaclasses cant have symbionts for now due to infinite recursion
//this can be fixed by reducing the metaclass on 1 level down (to this.meta.superClass) if this.constructor == this.superClass

Joose.Managed.My = new Joose.Managed.Role('Joose.Managed.My', {
    
    have : {
        myClass                         : null
    },
    
    
    methods : {
	    createMy : function (extend) {
	        var thisMeta = this.meta
	        var isRole = this instanceof Joose.Managed.Role
	        
	        var myExtend = extend.my || {}; 
	        delete extend.my
	        
	        var myClass = this.myClass = isRole ? new this.constructor(null, myExtend).c : this.subClassOf(this.superClass.meta.myClass || thisMeta.defaultSuperClass.meta.myClass || thisMeta.defaultSuperClass, myExtend)
	        
	        this.c.my = isRole ? myClass : new myClass({ targetMeta : this })
	    }
    },
    
    
    before : {
        
        extend : function(props) {
            if (!this.myClass && this.superClass.meta.myClass) this.createMy(props)
            
            if (props.my)
                if (!this.myClass) 
                    this.createMy(props)
                else {
                    this.myClass.meta.extend(props.my)
                    delete props.my
                }
        },
        
        
        addRole : function() {
        	if (!this.myClass) return
        	
            var myStem = this.myClass.meta.stem
            myStem.open()
            
            Joose.A.each(arguments, function(arg) {
                //instanceof Class to allow treat classes as roles
                var role = (arg.meta instanceof Joose.Managed.Class) ? arg : arg.role
                
                if (role.meta.meta.hasAttribute('myClass') && role.meta.myClass) myStem.addComposeInfo(role.my.meta.stem)
            }, this)
            
            myStem.close()
        },
        
        
        removeRole : function(){
        	if (!this.myClass) return
        	
            var myStem = this.myClass.meta.stem
            myStem.open()
            
            Joose.A.each(arguments, function(role){
                if (role.meta.meta.hasAttribute('myClass') && role.meta.myClass) myStem.removeComposeInfo(role.my.meta.stem)
            }, this)
            
            myStem.close()
        }
        
    }
    
}).c


//Joose.Meta.Class.meta.extend({
//    does                        : [ Joose.Managed.My ]
//})
//
//
//Joose.Meta.Role.meta.extend({
//    does                        : [ Joose.Managed.My ]
//});
Joose.Namespace = function(){ throw "Modules may not be instantiated." }

Joose.Namespace.Able = new Joose.Meta.Role('Joose.Namespace.Able', {

    have : {
        parent                  : null,
        
        localName               : null,
        
        ns                      : null
    },
    
    
    after: {
        //at this point targetMeta will contain 'c' which is a container for namespace
        extractConstructor: function (extend) {
            this.localName = (this.name || '').split('.').pop()
            
            this.ns = new Joose.Managed.PropertySet.Namespace(this.name, { targetMeta : this })
        }
    },
    
    
    methods : {
        copyNamespaceState : function(targetClass) {
        	var targetMeta = targetClass.meta
        	
        	if (!targetMeta.meta.hasAttribute('ns')) throw "No 'ns' attribute in meta of [" + targetClass + ']' 
        	
        	this.ns.unapply()
        	
            targetMeta.parent               = this.parent
            targetMeta.localName            = this.localName
            
            targetMeta.ns                   = this.ns
            targetMeta.ns.targetMeta		= targetMeta
            targetMeta.ns.computeContainer()
            
            targetMeta.ns.apply()
        }
    },
    
    
    builder : {
    	
    	override : {
    		//executing body last
    		_extend : function(props) {
		        var targetMeta = this.targetMeta
		        
		        this._buildStart(targetMeta, props)
		        
		        props = props || {}
	            var body = props.body
	            delete props.body
	            
	            this.SUPER(props)
	            
	            this.body(targetMeta, body)
		        
		        
		        this._buildComplete(targetMeta, props)
    		}
    	},
    	
    	
    	methods : {
    		
	        body: function (meta, bodyFunc) {
	            if (bodyFunc) Joose.Namespace.Manager.my.executeIn(meta.c, bodyFunc, meta.ns.container, [meta.c])
	        }
	        
    	}
    }
    
}).c


Joose.Meta.Class.meta.extend({
    does                        : [ Joose.Managed.My, Joose.Managed.Attribute.Builder, Joose.Namespace.Able ]
})


Joose.Meta.Role.meta.extend({
    does                        : [ Joose.Managed.My, Joose.Managed.Attribute.Builder, Joose.Namespace.Able ]
})
;
Joose.Namespace.Keeper = new Joose.Meta.Class('Joose.Namespace.Keeper', {
    
    isa : Joose.Meta.Class,
    
    have : {
        externalConstructor: null
    },
    
    
    methods: {
        
        defaultConstructor: function (){
            return function(){
                var thisMeta = arguments.callee.meta
                
                if (thisMeta instanceof Joose.Namespace.Keeper) throw new Error("Module [" + thisMeta.c + "] may not be instantiated.")
                
                if (typeof thisMeta.externalConstructor == 'function') {
                    thisMeta.externalConstructor.apply(this, arguments)
                    return
                }
                
                throw new Error("NamespaceKeeper was planted incorrectly.")
            }
        },
        
        
        //withClass should be not constructed yet on this stage (see Joose.Proto.Class.construct)
        plant: function (withClass) {
            var keeper = this.c
            
            //withClass will still meta attached, because constructor may rely on its presence
            //constructors should retrive meta as arguements.callee.meta and assume that constructor is meta.c (not arguments.callee itself) 
            keeper.meta = withClass.meta
            
            keeper.meta.c = keeper
            keeper.meta.externalConstructor = withClass
            
            this.copyNamespaceState(keeper)
        }
        
    }
    
}).c


;
Joose.Namespace.Manager = new Joose.Meta.Class('Joose.Namespace.Manager', {
    
    my : {
        
        have : {
            global : null
        },
        
        
        methods : {
            
            initialize : function(){
                var global = this.global = new Joose.Namespace.Keeper().c
                
                global.meta.ns.container = Joose.top
                global.meta.parent = global
                
                global.meta.ns.addProperty('__global__', global.meta.ns)
                __global__.addProperty('Joose', new Joose.Namespace.Keeper("Joose", { constructor : Joose }).c)
                Joose.meta.ns.addProperty('Namespace', new Joose.Namespace.Keeper("Joose.Namespace", { constructor : Joose.Namespace }).c)
            },
            
            
            getCurrent: function (){
                var limit = 50
                var msg = "getCurrent() failed with limit=" + limit
                var cur = arguments.callee.caller
                
                while (cur && limit) {
                    if (cur.__JOOSE_MODULE__) return cur.__JOOSE_MODULE__
                    
                    //sometimes throws an exception (seems when called from DOM event callback)
                    try {
                        cur = cur.caller
                    } catch (e) {
                        cur = null
                    }
                    limit--
                }
                
                //cur == null - we have reached the outer space )
                if (limit) return this.global
                
                throw msg
            },
            
            
            executeIn : function (ns, func, scope, argsArray) {
                var namespaceKeeper = function (func, ns) {
                    namespaceKeeper.__JOOSE_MODULE__ = ns
                    return func.apply(scope || this, argsArray || [])
                }
                
                return namespaceKeeper(func, ns)
            },
            
            
            earlyCreate : function (name, metaClass, props) {
            	var earlyProps = {
                    constructorOnly : true
                }
            	
            	if (props && props.hasOwnProperty('constructor')) {
                    earlyProps.constructor = props.constructor
                    delete props.constructor
                }
            	
            	return new metaClass(name, earlyProps).c
            },
            
            
            //this function establishing the full "namespace chain" (including the last element)
            create : function (nsName, metaClass, extend, currentNs) {
            	props = extend || {}
            	
                var parts   = Joose.S.saneSplit(nsName, '.')
                if (!parts.length) throw "Cant prepare namespace with empty name = [" + nsName + "]"; 
                
                var object  = currentNs || this.getCurrent()
                var soFar   = Joose.S.saneSplit(object.meta.name, '.')
                
                for(var i = 0; i < parts.length; i++) {
                    var part = parts[i]
                    var isLast = i == parts.length - 1
                    
                    if (part == "meta" || part == "my" || !part) throw "Module name [" + nsName + "] may not include a part called 'meta' or 'my' or empty part."
                    
                    var cur = (object == this.global ? this.global.meta.ns.container : object)[part]//object.meta.ns.getProperty(part)
                    
                    soFar.push(part)
                    var soFarName = soFar.join(".")
                    var needFinalize = false
                    var nsKeeper
                    
                    if (typeof cur == "undefined") {
                    	if (isLast) {
                    		nsKeeper = this.earlyCreate(soFarName, metaClass, props)
                    		needFinalize = true
                    	} else
                    		nsKeeper = new Joose.Namespace.Keeper(soFarName).c
                    	
                        if (object.meta) 
                        	object.meta.ns.addProperty(nsKeeper.meta.localName, nsKeeper)
                    	else
                    		object[nsKeeper.meta.localName] = nsKeeper
                        
                        cur = nsKeeper
                    } else if (isLast && cur && cur.meta) {
                    	//XXX needs cleanup and sanitizing
                    	if (cur.meta.constructor == metaClass && extend)
                    		cur.meta.extend(props)
                    	else if (cur.meta instanceof Joose.Namespace.Keeper && metaClass != Joose.Namespace.Keeper) { 
                    		cur.meta.plant(this.earlyCreate(soFarName, metaClass, props))
                    		needFinalize = true
                    	} 
                    	else if (metaClass != Joose.Namespace.Keeper)
                    		throw "Re-declaration of class " + soFarName + "with different meta is not allowed";                    		
                    	
                    } else 
                    	if (isLast && !(cur && cur.meta && cur.meta.meta && cur.meta.meta.hasAttribute('ns'))) throw "Trying to setup module " + soFarName + " failed. There is already something: " + cur
                    
                    if (needFinalize) cur.meta.construct(props)
                        
                    object = cur
                }
                
                return object
            }
            
        }
    }
    
}).c;
Joose.Helper = new Joose.Meta.Class('Joose.Helper', {
	
	my : {
		
		methods : {
			
			registerHelper : function (name, helperMeta, func) {
				
				if (!func) func = function (name, props) {
				    var metaClass
				    
				    if (props && props.meta) {
				        metaClass = props.meta
				        delete props.meta
				    }	
					
					Joose.Namespace.Manager.my.create(name, metaClass || helperMeta, props, Joose.Namespace.Manager.my.getCurrent())
				}
				
				__global__.addProperty(name, func)
			}
			
		}
		
	}

}).c



Joose.Helper.my.registerHelper('Class', Joose.Meta.Class, function (name, props) {
    var metaClass
    
    if (props && props.meta) {
        metaClass = props.meta
        delete props.meta
    } else if (props && typeof props.isa == 'function')
        metaClass = props.isa.meta.constructor
    else
        metaClass   = Joose.Meta.Class
    
    return Joose.Namespace.Manager.my.create(name, metaClass, props, Joose.Namespace.Manager.my.getCurrent()); 
})


Joose.Helper.my.registerHelper('Role', Joose.Meta.Role)


Joose.Helper.my.registerHelper('Module', Joose.Namespace.Keeper, function (name, props) {
	if (typeof props == 'function') props = { body : props }
	
    return Joose.Namespace.Manager.my.create(name, Joose.Namespace.Keeper, props, Joose.Namespace.Manager.my.getCurrent()); 
})
;
