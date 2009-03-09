Joose.Managed.Property.MethodModifier.Override = new Joose.Proto.Class('Joose.Managed.Property.MethodModifier.Override', null, Joose.Managed.Property.MethodModifier, {

    
    prepareWrapper : function(name, target, modifier, original, isOwn, superProto){
        var methodWrapper = function (){
            return modifier.apply(this, arguments);
        }
        
        methodWrapper.methodName = name;
        methodWrapper.SUPER = superProto;
        
        return methodWrapper;
    }
    
    
}).c;