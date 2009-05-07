Joose.Managed.Property.MethodModifier.Put = new Joose.Proto.Class('Joose.Managed.Property.MethodModifier.Put', {
    
	isa : Joose.Managed.Property.MethodModifier.Override,


    prepareWrapper : function(name, modifier, originalCall, originalArgCall, superProto) {
    	
//        if (isOwn) throw "Method [" + name + "] is applying over something [" + original + "] in class [" + target + "]"; 
        
        return Joose.Managed.Property.MethodModifier.Put.superClass.prepareWrapper.apply(this, arguments)
    }
    
    
}).c