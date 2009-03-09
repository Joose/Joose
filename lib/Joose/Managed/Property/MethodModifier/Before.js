Joose.Managed.Property.MethodModifier.Before = new Joose.Proto.Class('Joose.Managed.Property.MethodModifier.Before', null, Joose.Managed.Property.MethodModifier, {

    prepareWrapper : function(target){
        var modifier = this.value;
        var original = target.prototype[this.name];
        
        return function (){
            modifier.apply(this, arguments);
            return original.apply(this, arguments);
        }
    }
    
}).c;