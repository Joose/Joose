Joose.Managed.Method = new Joose.Proto.Meta('Joose.Managed.Method', null, Joose.Managed.Property, {

    modifiers : null,
    
    
    initialize : function(name, props) {
        this.SUPER(name, props);
        
        
    },
    

    computeContainer : function(props){
        this.container = props.target.prototype;
    }
    
    
    
    
}).c;


//Joose.Managed.Method = new Joose.Proto.Meta('Joose.Managed.Method', null, null, {
//
//    name:   null,
//    body:   null,
//    props:  null,
//    
//    
//    copy: function (to) {
//        return new (to || this.constructor)(this.getName(), this.getBody(), this.getProps())
//    },
//    
//    
//    initialize: function (name, func, props) {
//        this.name  = name;
//        this.body  = func;
//        this.props = props;
//        
//        func.name   = name
//    
////        func.meta   = this
//    },
//    
////    isClassMethod: function () { return false },
//    
//    apply:    function (thisObject, args) {
//        return this.body.apply(thisObject, args)
//    },
//    
//    
//    addToClass: function (c) {
//        c.meta.methods[this.getName()] = this;
//        c.prototype[this.getName()] = this.asFunction()
//    },
//    
//    // creates a new method object with the same name
//    _makeWrapped: function (func) {
//        return new this.constructor(this.getName(), func); // Should there be , this.getProps() ???
//    },
//    
//    
//    around: function (func) {
//        var orig = this.getBody();
//        return this._makeWrapped(function aroundWrapper () {
//            var me = this;
//            var bound = function () { return orig.apply(me, arguments) }
//            return func.apply(this, Joose.A.concat([bound], arguments))
//        })            
//    },
//    
//    
//    before: function (func) {
//        var orig = this.getBody();
//        return this._makeWrapped(function beforeWrapper () {
//            func.apply(this, arguments)
//            return orig.apply(this, arguments);
//        })        
//    },
//    
//    
//    after: function (func) {
//        var orig = this.getBody();
//        return this._makeWrapped(function afterWrapper () {
//            var ret = orig.apply(this, arguments);
//            func.apply(this, arguments);
//            return ret
//        })
//    },
//    
//    
//    override: function (func) {
//        var orig = this.getBody();
//        return this._makeWrapped(function overrideWrapper () {
//            var me      = this;
//            var bound   = function () { return orig.apply(me, arguments) }
//            var before  = this.SUPER;
//            this.SUPER  = bound;
//            var ret     = func.apply(this, arguments);
//            this.SUPER  = before;
//            return ret
//        })            
//    },
//    
//    
//    augment: function (func) {
//        var orig = this.getBody();
////?        orig.source = orig.toString();
//        return this._makeWrapped(function augmentWrapper () {
//            var exe       = orig;
//            var me        = this;
//            var inner     = func
////?            inner.source  = inner.toString();
//            if(!this.__INNER_STACK__) {
//                this.__INNER_STACK__ = [];
//            };
//            this.__INNER_STACK__.push(inner)
//            var before    = this.INNER;
//            this.INNER    = function () {return  me.__INNER_STACK__.pop().apply(me, arguments) };
//            var ret       = orig.apply(this, arguments);
//            this.INNER    = before;
//            return ret
//        })
//    }
//    
//}).c;