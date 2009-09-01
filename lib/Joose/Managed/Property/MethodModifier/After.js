Joose.Managed.Property.MethodModifier.After = new Joose.Proto.Class('Joose.Managed.Property.MethodModifier.After', {
    
    isa : Joose.Managed.Property.MethodModifier,

    
    prepareWrapper : function (name, modifier, originalCall, superProto) {
        
        return function () {
            var res = originalCall.apply(this, arguments)
            modifier.apply(this, arguments)
            return res
        }
    }    

    
}).c