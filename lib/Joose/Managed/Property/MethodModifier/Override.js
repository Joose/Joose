Joose.Managed.Property.MethodModifier.Override = new Joose.Proto.Class('Joose.Managed.Property.MethodModifier.Override', null, Joose.Managed.Property.MethodModifier, {

    prepareWrapper : function(target){
        var modifier = this.value;
        
        var modified = function (){
            return modifier.apply(this, arguments);
        }
        
        modified.methodName = this.name;
        modified.SUPER = target.meta.superClass.prototype;
        
        return modified;
    },
    
    
    apply : function(target){
        var original = target.prototype[this.name];
        var isOwn = target.prototype.hasOwnProperty(this.name);
        
        this.SUPER(target);
        
        //modifier was applied to own method
        if (isOwn) target.prototype[this.name]._super_original = original;
        
        target.prototype[this.name]._contain = this.value;
    },
    
    
    unapply : function(from){
        if (!this.isAppliedTo(from)) throw "Unapply of methodModifier [" + this.props.type +  "] of [" + this.name + "] from class [" + from + "] failed";
        
        //if modifier was applied to own method - restore it
        if (from.prototype[this.name]._super_original) 
            from.prototype[this.name] = from.prototype[this.name]._super_original;
        //otherwise - just delete it, to show the inherited method 
        else
            delete from.prototype[this.name];
    }
    
    
}).c;


//Joose.Managed.Property.MethodModifier = new Joose.Proto.Class('Joose.Managed.Property.MethodModifier', null, null, {
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