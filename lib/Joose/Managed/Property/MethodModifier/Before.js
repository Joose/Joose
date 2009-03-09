Joose.Managed.Property.MethodModifier.Before = new Joose.Proto.Class('Joose.Managed.Property.MethodModifier.Before', null, Joose.Managed.Property.MethodModifier, {

    prepareWrapper : function(target){
        var name = this.name;
        var modifier = this.value;
        var original = target.prototype[name];
        var isOwn = target.prototype.hasOwnProperty(name);
        
        return function (){
            modifier.apply(this, arguments);
            return isOwn ? original.apply(this, arguments) : target.meta.superClass.prototype[name].apply(this, arguments);
        }
    }
    
}).c;