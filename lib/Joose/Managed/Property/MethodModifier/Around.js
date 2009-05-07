Joose.Managed.Property.MethodModifier.Around = new Joose.Proto.Class('Joose.Managed.Property.MethodModifier.Around', {
    
	isa : Joose.Managed.Property.MethodModifier,

    prepareWrapper : function(name, modifier, originalCall, originalArgCall, superProto) {
        
        var AROUND = function (){
            var me = this
            var bound = function () {
                return originalCall.apply(me, arguments)
            }
            
            return modifier.apply(this, Joose.A.concat([bound], arguments))
        }
        
        AROUND.AROUND = true
        
        return AROUND
    }
    
}).c