Joose.Managed.Property.MethodModifier.Around = new Joose.Proto.Class('Joose.Managed.Property.MethodModifier.Around', {
    
	isa : Joose.Managed.Property.MethodModifier,

    prepareWrapper : function(name, modifier, originalCall, originalArgCall, superProto) {
        
        var me
        
        var bound = function () {
            return originalCall.apply(me, arguments)
        }
            
        var AROUND = function (){
            me = this
            
            return modifier.apply(this, Joose.A.concat([bound], arguments))
        }
        
        //XXX proabaly can be removed already, remains since the times, when SUPER calls were implemented as function properties. 
        AROUND.AROUND = true
        
        return AROUND
    }
    
}).c