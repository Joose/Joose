Joose.Managed.Property.MethodModifier.After = new Joose.Proto.Class('Joose.Managed.Property.MethodModifier.After', {
    
	isa : Joose.Managed.Property.MethodModifier,

    
    prepareWrapper : function(name, target, modifier, original, isOwn, superProto){
        return function AFTER(){
            arguments.callee.CALLER = arguments.callee.caller;
            
            var res = isOwn ? original.apply(this, arguments) : superProto[name].apply(this, arguments);
            modifier.apply(this, arguments);
            return res;
        }
    }    

    
}).c;