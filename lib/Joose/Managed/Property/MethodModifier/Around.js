Joose.Managed.Property.MethodModifier.Around = new Joose.Proto.Class('Joose.Managed.Property.MethodModifier.Around', null, Joose.Managed.Property.MethodModifier, {

    prepareWrapper : function(target){
        var modifier = this.value;
        var original = target.prototype[this.name];
        
        return function (){
            var me = this;
            var bound = function () { return original.apply(me, arguments) }
            return modifier.apply(this, [bound].concat(arguments))
        }
    }
    
}).c;