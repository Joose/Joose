Joose.Managed.Property.MethodModifier.Around = new Joose.Proto.Class('Joose.Managed.Property.MethodModifier.Around', null, Joose.Managed.Property.MethodModifier, {

    prepareWrapper : function(name, target, modifier, original, isOwn, superProto){
        var methodWrapper = function (){
            var me = this;
            var bound = function () {
                return isOwn ? original.apply(me, arguments) : superProto[name].apply(me, arguments)
            }
            
            return modifier.apply(this, Joose.A.concat([bound], arguments));
        }
        
        methodWrapper.AROUND = true;
        
        return methodWrapper;
    }
    
}).c;