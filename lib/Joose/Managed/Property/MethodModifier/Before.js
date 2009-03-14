Joose.Managed.Property.MethodModifier.Before = new Joose.Proto.Class('Joose.Managed.Property.MethodModifier.Before', {
    
	isa : Joose.Managed.Property.MethodModifier,

    prepareWrapper : function(name, target, modifier, original, isOwn, superProto){
        return function BEFORE(){
            arguments.callee.CALLER = arguments.callee.caller;
            
            modifier.apply(this, arguments);
            return isOwn ? original.apply(this, arguments) : superProto[name].apply(this, arguments);
        }
    }
    
}).c;