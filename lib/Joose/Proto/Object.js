(function () {

    Joose.Proto.Object = function () {
        throw "Joose.Proto.Object can't be instantiated"
    }
    
    
    var SUPER = function () {
        var self = SUPER.caller
        
        if (self == SUPERARG) self= self.caller
        
        if (!self.SUPER) throw "Invalid call to SUPER, from : " + self
        
        return self.SUPER[self.methodName].apply(this, arguments)
    }
    
    var SUPERARG = function () {
        return this.SUPER.apply(this, arguments[0])
    }
    
    //XXX switch to closures    
    var INNER = function () {
        //sufficient for augment modifiers and original methods from Joose.Proto.Class
        var self = INNER.caller.caller
        
        //required for original methods from Joose.Managed.Class which can be also 'around' modifiers
        if (self.SUPER || self.AROUND) self = self.caller
        
        var callstack = self.__INNER_STACK__
        if (!callstack) throw "Invalid call to INNER"
        
        var augmentWrapper = function () {
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
        
        
        detach : function () {
            if (this.isDetached()) return this
            
            var detachedClass = new Joose.Meta.Class.Detached(null, { isa : this.constructor }).c
            
            detachedClass.meta.stem.open()
            
            detachedClass.prototype = this
            
            this.meta = detachedClass.meta
            
            var original = this.meta.originalClass = this.constructor
            detachedClass.my = original.my
            
            this.constructor = detachedClass
            
            detachedClass.meta.stem.close()
            
            return this
        },
        
        
        attach : function () {
            if (!this.isDetached()) return this
            
            this.meta.stem.open()
            
            this.constructor.prototype = {}
            
            delete this.constructor
            delete this.meta
            
            //XXX hack for metaroles with custom builders
            if (this.builder && this.builder.isDetached()) this.builder.attach()
            if (this.stem && this.stem.isDetached()) this.stem.attach()
            
            return this
        },
        
        
        isDetached : function () {
            return this.meta instanceof Joose.Meta.Class.Detached 
        }
        
    }
        
    Joose.Proto.Object.meta = {
        constructor : Joose.Proto.Object,
        
        methods : Joose.O.copy(Joose.Proto.Object.prototype),
        attributes : {}
    }
    
    Joose.Proto.Object.prototype.meta = Joose.Proto.Object.meta
    
    
    Joose.Proto.Empty = function () { throw "Joose.Proto.Empty can't be instantiated" }
    
    Joose.Proto.Empty.meta = {
        methods : {},
        attributes : {}
    }
    

})()