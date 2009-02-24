Joose.Kernel = Joose.Kernel || function(){ throw new Error("Modules may not be instantiated.") };


//Self-sufficient meta, built as minimal as possible, totally self-referenced
//behavior - during initialization introspect own prototype and add methods and attributes to itself. Also - apply this information to c - further on evolution chain
//This class is a parent and a meta for itself
Joose.Kernel.ProtoMeta = function () {
    this.initialize.apply(this, arguments);
}


Joose.Kernel.ProtoMeta.prototype = {
    
    _name: 'Joose.Kernel.ProtoMeta',
    
    //note, that these attributes are actually stored in prototype, not in the instance, so they are shared among all instances without any initialization
    attributes: {},
    methods: {},
    
    constructor: Joose.Kernel.ProtoMeta,
    meta: Joose.Kernel.ProtoMeta,
    
    c: null,
    
    initialize: function (c) {
        if (!c) throw ("MetaClass cant be instantiated without c");
        
        this.c = c;
        
        var proto = this.constructor.prototype;
        
        Joose.O.eachSafe(proto, function (value, i) {
            if (i != 'constructor' && i != 'meta') {
                if (typeof proto[i] == 'function') 
                    this.addMethod(i, proto[i])
                else
                    this.addAttribute(i, proto[i])
            }
        }, this)
        
    },
    
    
    addMethod: function (name, func) {
        if (typeof func != 'function') throw "Trying to add something else but not method";
        
        this.methods[name] = func;
        this.c.prototype[name] = func;
    },
    
    
    addAttribute: function (name, init) {
        this.attributes[name] = init;
        this.c.prototype[name] = init;
    },
    
    
    hasMethod: function (name) { 
        //native toString etc filtering
        return this.methods.hasOwnProperty(name);// Boolean(this.methods[name]);
    },
    
    
    hasAttribute: function (name) { 
        //native toString etc filtering
        return this.attributes.hasOwnProperty(name);//typeof this.attributes[name] != 'undefined';
    },
    

    /**
     * Returns the name of the class
     * @name className
     * @function
     * @memberof Joose.Class
     */
    /** @ignore */
    className: function () { 
        return this._name;
    },
    
    
    /**
     * Returns the name of the class (alias to className())
     * @name getName
     * @function
     * @memberof Joose.Class
     */
    /** @ignore */
    getName: function () { 
        return this.className();
    },

    
    toString: function () {
        if(this.meta) { 
            return "a "+this.meta.className();
        }
        return "NoMeta"
    }
    
}



//micro bootstraping
Joose.Kernel.ProtoMeta = new Joose.Kernel.ProtoMeta(Joose.Kernel.ProtoMeta);

Joose.Kernel.ProtoMeta.meta                         = Joose.Kernel.ProtoMeta;
Joose.Kernel.ProtoMeta.constructor.meta                = Joose.Kernel.ProtoMeta;
Joose.Kernel.ProtoMeta.constructor.prototype.meta    = Joose.Kernel.ProtoMeta;

//turning back into class
Joose.Kernel.ProtoMeta = Joose.Kernel.ProtoMeta.constructor;



//adding new methods to Gene - note, that they will instantly appear, coz Gene is a parent for itself
Joose.Kernel.ProtoMeta.meta.addMethod('extend', function (genes) {
    Joose.O.eachSafe(genes, function (value, prop) {
        if (prop != 'meta' && prop != 'constructor') {
            typeof genes[prop] == 'function' ? this.addMethod(prop, genes[prop]): this.addAttribute(prop, genes[prop]);
        }
    }, this);
});



Joose.Kernel.ProtoMeta.meta.extend({
    
//this method will allow separate the class from its meta and parent classes
    adoptNextGeneration: function(){
        var c = this.c;
    
        c.prototype.constructor = c;
        c.prototype.meta = this;
        c.meta = this;
        
        if (!c.hasOwnProperty('toString')) {
            c.toString = function () { return this.meta.className() }
        }
        
        return c;
    },

    
    getClassObject: function () {
        return this.c;
    },
    
    
    dieIfString: function (thing) {
        if(Joose.S.isString(thing)) {
            throw new TypeError("Parameter must not be a string.")
        }
    },
    
    
    classIsa: function (classObject) {
        this.dieIfString(classObject);
        
        return this.c == classObject;
    }
    
});

