Joose.Managed.Property.MethodModifier = new Joose.Proto.Class('Joose.Managed.Property.MethodModifier', {
    
    isa : Joose.Managed.Property,

    
    prepareWrapper : function (name, target, modifier, original, isOwn, superProto) {
        throw "Abstract method [prepareWrapper] of " + this + " was called"
    },
    

    apply : function (target) {
        var name = this.name
        var targetProto = target.prototype
        var isOwn = targetProto.hasOwnProperty(name)
        var original = targetProto[name]
        var superProto = target.meta.superClass.prototype
        
        //call to Joose.Proto level, require some additional processing
        var isCallToProto = superProto.meta.constructor == Joose.Proto.Class || superProto.meta.constructor == Joose.Proto.Object
        
        //original call (usual and array-variant)
        var originalCall, originalArgCall
        
        if (isOwn) { 
            originalCall = original
            originalArgCall = function () { return original.apply(this, arguments[0]) }
        } else if (isCallToProto) {
            originalCall = function () {
                var beforeSUPER = this.SUPER
                var beforeSUPERARG = this.SUPERARG
                
                this.SUPER = superProto.SUPER
                this.SUPERARG = superProto.SUPERARG
                
                var res = superProto[name].apply(this, arguments)
                
                this.SUPER = beforeSUPER
                this.SUPERARG = beforeSUPERARG
                
                return res
            }
            
            originalArgCall = function () {
                var beforeSUPER = this.SUPER
                var beforeSUPERARG = this.SUPERARG
                
                this.SUPER = superProto.SUPER
                this.SUPERARG = superProto.SUPERARG
                
                var res = superProto[name].apply(this, arguments[0])
                
                this.SUPER = beforeSUPER
                this.SUPERARG = beforeSUPERARG
                
                return res
            }
        } else {
            originalCall = function () { return superProto[name].apply(this, arguments) }
            originalArgCall = function () { return superProto[name].apply(this, arguments[0]) }
        }
        
        var methodWrapper = this.prepareWrapper(name, this.value, originalCall, originalArgCall, superProto)
        
        if (isOwn) methodWrapper._original = original
        methodWrapper._contain = this.value
        
        targetProto[name] = methodWrapper
    },
    
    
    isAppliedTo : function (target) {
        var targetCont = target.prototype[this.name]
        
        return targetCont && targetCont._contain == this.value
    },
    
    
    unapply : function (from) {
        var name = this.name
        var fromProto = from.prototype
        var original = fromProto[name]._original
        
        if (!this.isAppliedTo(from)) throw "Unapply of method [" + name + "] from class [" + from + "] failed"
        
        //if modifier was applied to own method - restore it
        if (original) 
            fromProto[name] = original
        //otherwise - just delete it, to reveal the inherited method 
        else
            delete fromProto[name]
    }
    
}).c