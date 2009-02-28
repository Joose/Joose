Joose.Kernel = function(){ throw "Modules may not be instantiated." };


Joose.Kernel.ProtoMeta = function (){
    this.initialize.apply(this, arguments);
}


Joose.Kernel.ProtoClass = function (){
    throw "Joose.Kernel.ProtoClass can't be instantiated";
}


Joose.Kernel.ProtoClass.prototype = {
    
    SUPER : function(){
        var self = arguments.callee.caller;
        return self.meta.superClass.prototype[self.methodName].apply(this, arguments);
    },
    
    
    initialize: function () {
    },
    
    
    toString: function () {
        return "a " + this.meta.name;
    }
    
};


Joose.Kernel.ProtoClass.meta = {
    methods : Joose.Kernel.ProtoClass.prototype,
    attributes : {}
}


Joose.Kernel.ProtoMeta.prototype = Joose.O.getMutableCopy(Joose.Kernel.ProtoClass.prototype);
    
Joose.O.extend(Joose.Kernel.ProtoMeta.prototype, {
    
    name: null,
    
    attributes: null,
    
    methods: null,
    
    superClass : null,
    
    constructor: Joose.Kernel.ProtoMeta,
    
    meta: null,
    
    c: null,
    
    
    initialize: function (name, constructor, superClass, extend) {
        this.name = name;
        
        this.c = constructor || this.defaultClassFunctionBody();
        
        this.addSuperClass(superClass || Joose.Kernel.ProtoClass);
        
        this.adoptConstructor();
        
        if (extend) this.extend(extend);
    },
    
    
    defaultClassFunctionBody: function () {
        return function () {
            this.initialize.apply(this, arguments);
        };
    },
    
    
    addSuperClass: function (classObject) {
        Joose.S.dieIfString(classObject);
        
        this.c.prototype    = Joose.O.getMutableCopy(classObject.prototype);
        this.methods        = Joose.O.getMutableCopy(classObject.meta.methods);
        this.attributes     = Joose.O.getMutableCopy(classObject.meta.attributes);
        
        this.superClass = classObject;
    },
    
    
    removeSuperClass: function (classObject) {
        //no-op at this level
    },
    
    
    addMethod: function (name, func) {
        func.meta = this;
        
        //chrome doesn't allow to redefine the "name" property
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
                if (typeof props[name] == 'function') this.addMethod(name, value); else this.addAttribute(name, value);
        }, this);
    }    
    
})


//micro bootstraping
Joose.Kernel.ProtoMeta.prototype.meta = new Joose.Kernel.ProtoMeta('Joose.Kernel.ProtoMeta', Joose.Kernel.ProtoMeta, Joose.Kernel.ProtoClass, Joose.Kernel.ProtoMeta.prototype);