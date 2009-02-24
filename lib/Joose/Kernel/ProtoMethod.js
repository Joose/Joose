//proto Method

// See http://code.google.com/p/joose-js/wiki/JooseMethod
var protoMethodMeta = new Joose.Kernel.Inheritable('Joose.Kernel.ProtoMethod', function (name, func) {
    this.initialize(name, func)
});


protoMethodMeta.extend({
    
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
    
    copy: function (to) {
        return new (to || this.constructor)(this.getName(), this.getBody(), this.getProps())
    },
    
    
    initialize: function (name, func, props) {
        this._name  = name;
        this._body  = func;
        this._props = props;
        
        func.name   = name
    
//        func.meta   = this
    },
    
//    isClassMethod: function () { return false },
    
    apply:    function (thisObject, args) {
        return this._body.apply(thisObject, args)
    },
    
    
    addToClass: function (c) {
        c.meta.methods[this.getName()] = this;
        c.prototype[this.getName()] = this.asFunction()
    },
    
    // direct call
    asFunction:    function () {
        return this._body
    },
    
    
    // creates a new method object with the same name
    _makeWrapped: function (func) {
        return new this.constructor(this.getName(), func); // Should there be , this.getProps() ???
    },
    
    
    around: function (func) {
        var orig = this.getBody();
        return this._makeWrapped(function aroundWrapper () {
            var me = this;
            var bound = function () { return orig.apply(me, arguments) }
            return func.apply(this, Joose.A.concat([bound], arguments))
        })            
    },
    
    
    before: function (func) {
        var orig = this.getBody();
        return this._makeWrapped(function beforeWrapper () {
            func.apply(this, arguments)
            return orig.apply(this, arguments);
        })        
    },
    
    
    after: function (func) {
        var orig = this.getBody();
        return this._makeWrapped(function afterWrapper () {
            var ret = orig.apply(this, arguments);
            func.apply(this, arguments);
            return ret
        })
    },
    
    
    override: function (func) {
        var orig = this.getBody();
        return this._makeWrapped(function overrideWrapper () {
            var me      = this;
            var bound   = function () { return orig.apply(me, arguments) }
            var before  = this.SUPER;
            this.SUPER  = bound;
            var ret     = func.apply(this, arguments);
            this.SUPER  = before;
            return ret
        })            
    },
    
    
    augment: function (func) {
        var orig = this.getBody();
//?        orig.source = orig.toString();
        return this._makeWrapped(function augmentWrapper () {
            var exe       = orig;
            var me        = this;
            var inner     = func
//?            inner.source  = inner.toString();
            if(!this.__INNER_STACK__) {
                this.__INNER_STACK__ = [];
            };
            this.__INNER_STACK__.push(inner)
            var before    = this.INNER;
            this.INNER    = function () {return  me.__INNER_STACK__.pop().apply(me, arguments) };
            var ret       = orig.apply(this, arguments);
            this.INNER    = before;
            return ret
        })
    }
    
});


Joose.Kernel.ProtoMethod = protoMethodMeta.getClassObject();