Joose.Managed.Property.MethodModifier.Put = new Joose.Proto.Class('Joose.Managed.Property.MethodModifier.Put', null, Joose.Managed.Property.MethodModifier.Override, {


    prepareWrapper : function(name, target, modifier, original, isOwn, superProto){
        if (isOwn) throw "Method [" + name + "] is applying over something [" + original + "] in class [" + target + "]"; 
        
        return this.SUPERARG(arguments);
    }
    
    
}).c;