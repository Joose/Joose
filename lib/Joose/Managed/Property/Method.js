Joose.Managed.Property.Method = new Joose.Proto.Class('Joose.Managed.Property.Method', null, Joose.Managed.Property, {


    prepareWrapper : function(target){
        var body = this.value;
        
        var methodWrapper = function (){
            return body.apply(this, arguments);
        }
        
        methodWrapper.methodName = this.name;
        methodWrapper.SUPER = target.meta.superClass.prototype;
        
        return methodWrapper;
    },
    
    
    apply : function(target){
        var methodWrapper = this.prepareWrapper(target);
        
        methodWrapper._contain = this.value;
        
        target.prototype[this.name] = methodWrapper;
    },
    
    
    isAppliedTo : function(target) {
        return target.prototype[this.name] && target.prototype[this.name]._contain == this.value;
    },
    
    
    unapply : function(from){
        if (!this.isAppliedTo(from)) throw "Unapply of method [" + this.name + "] from class [" + from + "] failed";
        
        delete from.prototype[this.name];
    }
    
}).c;