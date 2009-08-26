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
            this.name = name == null ? '__ANONYMOUS_CLASS__' + ANONYMOUS_CLASS_ID++ : name
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
            return this.attributes[name] !== undefined
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
        
    }
    //micro bootstraping
    
    Joose.Proto.Class.prototype = Joose.O.getMutableCopy(Joose.Proto.Object.prototype)
    
    Joose.O.extend(Joose.Proto.Class.prototype, bootstrap)
    
    Joose.Proto.Class.prototype.meta = new Joose.Proto.Class('Joose.Proto.Class', bootstrap)
})()