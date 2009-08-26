Joose.Managed.Property.MethodModifier.Around = new Joose.Proto.Class('Joose.Managed.Property.MethodModifier.Around', {
    
    isa : Joose.Managed.Property.MethodModifier,

    prepareWrapper : function (name, modifier, originalCall, originalArgCall, superProto) {
        
        var me
        
        var bound = function () {
            return originalCall.apply(me, arguments)
        }
            
        var AROUND = function () {
            me = this
            
            var boundArr = [ bound ]
            boundArr.push.apply(boundArr, arguments)
            
            return modifier.apply(this, boundArr)
        }
        
        //XXX can't be yet removed, while INNER calls are not switched to closures 
        AROUND.AROUND = true
        
        return AROUND
    }
    
}).c