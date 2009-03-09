Joose.Managed.Property.MethodModifier = new Joose.Proto.Class('Joose.Managed.Property.MethodModifier', null, Joose.Managed.Property.Method, {


    apply : function(target){
        var original = target.prototype[this.name];
        this.SUPER(target);
        target.prototype[this.name]._original = original;
        target.prototype[this.name]._contain = this.value;
    },
    
    
    unapply : function(from){
        if (!this.isAppliedTo(from)) throw "Unapply of methodModifier [" + this.props.type +  "] of [" + this.name + "] from class [" + from + "] failed";
        
        from.prototype[this.name] = from.prototype[this.name]._original;
    }
    
}).c;