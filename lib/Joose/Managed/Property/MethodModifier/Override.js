Joose.Managed.Property.MethodModifier.Override = new Joose.Proto.Class('Joose.Managed.Property.MethodModifier.Override', {
    
	isa : Joose.Managed.Property.MethodModifier,

    
    prepareWrapper : function(name, modifier, originalCall, originalArgCall, superProto) {
        
        var OVERRIDE = function (){
    		var beforeSUPER = this.SUPER;
    		var beforeSUPERARG = this.SUPERARG;
            
            this.SUPER  = originalCall;
            this.SUPERARG = originalArgCall;
            
            var res = modifier.apply(this, arguments);
            
        	this.SUPER = beforeSUPER;
        	this.SUPERARG = beforeSUPERARG;
            
            return res
        }
        
        OVERRIDE.methodName = name;
        OVERRIDE.SUPER = superProto;
        
        return OVERRIDE;
    }
    
    
}).c;