Joose.Managed.ClassStem.Methods = new Joose.Proto.Class('Joose.Managed.ClassStem.Methods', {
    
	isa : Joose.Managed.PropertySet.Containable,
    
    propertyMetaClass : Joose.Managed.Property.MethodModifier.Put,
    
    
    computeContainer : function(props){
        this.container = this.targetClass.meta.methods;
    }
    
}).c;