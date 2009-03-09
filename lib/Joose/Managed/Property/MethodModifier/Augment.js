Joose.Managed.Property.MethodModifier.Augment = new Joose.Proto.Class('Joose.Managed.Property.MethodModifier.Augment', null, Joose.Managed.Property.MethodModifier, {

    apply : function(target){
//        var modifier = this.value;
//        var original = target.prototype[this.name];
//        
//        var modified = function (){
//            return modifier.apply(this, arguments);
//        }
//        
//        modified.methodName = this.name;
//        modified.SUPER = {};
//        modified.SUPER[this.name] = original;
//        modified._contain = modifier;
//        modified._original = original;
//        
//        target.prototype[this.name] = modified;
    }
    
}).c;

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