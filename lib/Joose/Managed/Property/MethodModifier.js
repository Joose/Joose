Joose.Managed.Property.MethodModifier = new Joose.Proto.Class('Joose.Managed.Property.MethodModifier', null, Joose.Managed.Property, {

    
    prepareWrapper : function(name, target, modifier, original, isOwn, superProto){
        throw "Abstract method [prepareWrapper] of " + this + " was called";
    },
    

    apply : function(target){
        var name = this.name;
        var isOwn = target.prototype.hasOwnProperty(name);
        var original = target.prototype[name];
        
        var methodWrapper = this.prepareWrapper(name, target, this.value, original, isOwn, target.meta.superClass.prototype);
        
        if (isOwn) methodWrapper._original = original;
        methodWrapper._contain = this.value;
        
        target.prototype[name] = methodWrapper;
    },
    
    
    isAppliedTo : function(target) {
        return target.prototype[this.name] && target.prototype[this.name]._contain == this.value;
    },
    
    
    unapply : function(from){
        if (!this.isAppliedTo(from)) throw "Unapply of method [" + this.name + "] from class [" + from + "] failed";
        
        //if modifier was applied to own method - restore it
        if (from.prototype[this.name]._original) 
            from.prototype[this.name] = from.prototype[this.name]._original;
        //otherwise - just delete it, to reveal the inherited method 
        else
            delete from.prototype[this.name];
    }
    
}).c;