Joose.Managed.Property.MethodModifier.After = new Joose.Proto.Class('Joose.Managed.Property.MethodModifier.After', null, Joose.Managed.Property.MethodModifier, {

    
    prepareWrapper : function(target){
        var modifier = this.value;
        var original = target.prototype[this.name];
        
        return function (){
            var res = original.apply(this, arguments);
            modifier.apply(this, arguments);
            return res;
        }
    }    

    
}).c;