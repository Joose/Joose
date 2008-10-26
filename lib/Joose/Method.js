/*
 * A class for methods
 * Originally defined in Joose.js
 * 
 * See http://code.google.com/p/joose-js/wiki/JooseMethod
 */

(function (Class) {

Class("Joose.Method", {
    methods: {
        
        copy: function () {
            return this.meta.instantiate(this.getName(), this.getBody(), this.getProps())
        },
        
        // creates a new method object with the same name
        _makeWrapped: function (func) {
            return this.meta.instantiate(this.getName(), func); // Should there be , this.getProps() ???
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
            orig.source = orig.toString();
            return this._makeWrapped(function augmentWrapper () {
                var exe       = orig;
                var me        = this;
                var inner     = func
                inner.source  = inner.toString();
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
    }
})

})(JooseClass)