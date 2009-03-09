Joose.Managed.Property.MethodModifier.After = new Joose.Proto.Class('Joose.Managed.Property.MethodModifier.After', null, Joose.Managed.Property.MethodModifier, {

    
    prepareWrapper : function(target){
        var name = this.name;
        var modifier = this.value;
        var original = target.prototype[name];
        var isOwn = target.prototype.hasOwnProperty(name);
        
        return function (){
            var res = isOwn ? original.apply(this, arguments) : target.meta.superClass.prototype[name].apply(this, arguments);
            modifier.apply(this, arguments);
            return res;
        }
    }    

    
}).c;