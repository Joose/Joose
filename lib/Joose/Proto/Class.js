Joose.Proto.Class = function (){
    this.initialize.apply(this, arguments);
}


Joose.Proto.Class.prototype = Joose.O.getMutableCopy(Joose.Proto.Object.prototype);
    

Joose.O.extend(Joose.Proto.Class.prototype, {
    
    name: null,
    
    attributes: null,
    
    methods: null,
    
    superClass : null,
    
    constructor: Joose.Proto.Class,
    
    meta: null,
    
    c: null,
    
    defaultSuperClass : Joose.Proto.Object,
    
    
    initialize: function (name, constructor, superClass, extend) {
        this.name = name;
        
        this.c = constructor || this.defaultClassFunctionBody();
        
        this.addSuperClass(superClass || this.defaultSuperClass);
        
        if (extend) this.extend(extend);
    },
    
    
    defaultClassFunctionBody: function () {
        return function () {
            this.initialize.apply(this, arguments);
        };
    },
    
    
    addSuperClass: function (classObject) {
        Joose.S.dieIfString(classObject);
        
        this.superClass = classObject;
        
        this.c.prototype    = Joose.O.getMutableCopy(classObject.prototype);
        
        this.adoptConstructor();
        
        this.methods        = Joose.O.getMutableCopy(classObject.meta.methods);
        this.attributes     = Joose.O.getMutableCopy(classObject.meta.attributes);
    },
    
    
    addMethod: function (name, func) {
        func.SUPER = this.superClass.prototype;
        
        //chrome don't allow to redefine the "name" property
        func.methodName = name;
        
        this.methods[name] = func;
        this.c.prototype[name] = func;
    },
    
    
    addAttribute: function (name, init) {
        this.attributes[name] = init;
        this.c.prototype[name] = init;
    },
    
    
    removeMethod : function (name){
        delete this.methods[name];
        delete this.c.prototype[name];
    },

    
    removeAttribute: function (name) {
        delete this.attributes[name];
        delete this.c.prototype[name];
    },
    
    
    hasMethod: function (name) { 
        return Boolean(this.methods[name]);
    },
    
    
    hasAttribute: function (name) { 
        return typeof this.attributes[name] != 'undefined';
    },
    

    hasOwnMethod: function (name) { 
        return this.hasMethod(name) && this.methods.hasOwnProperty(name);
    },
    
    
    hasOwnAttribute: function (name) { 
        return this.hasAttribute(name) && this.attributes.hasOwnProperty(name);
    },
    
    
    adoptConstructor: function(){
        var c = this.c;
    
        //this will fix weird semantic of native "constructor" property to more intuitive (idea borrowed from Ext)
        c.prototype.constructor = c;
        c.prototype.meta = this;
        c.meta = this;
        
        if (!c.hasOwnProperty('toString')) c.toString = function () { return this.meta.name }
    },

    
    extend : function (props) {
        Joose.O.eachSafe(props, function (value, name) {
            if (name != 'meta' && name != 'constructor') 
                if (typeof props[name] == 'function' && !props[name].meta) this.addMethod(name, value); else this.addAttribute(name, value);
        }, this);
    }    
    
})


//micro bootstraping
Joose.Proto.Class.prototype.meta = new Joose.Proto.Class('Joose.Proto.Class', Joose.Proto.Class, Joose.Proto.Object, Joose.Proto.Class.prototype);