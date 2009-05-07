Joose.Managed.Property.Attribute = new Joose.Proto.Class('Joose.Managed.Property.Attribute', {
    
	isa : Joose.Managed.Property,
    
    apply : function(target){
        Joose.Managed.Property.Attribute.superClass.apply.call(this, target.prototype)
    },
    
    
    unapply : function(from){
    	Joose.Managed.Property.Attribute.superClass.unapply.call(this, from.prototype)
    }
    
}).c