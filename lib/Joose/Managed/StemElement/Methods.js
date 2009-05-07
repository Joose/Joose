Joose.Managed.StemElement.Methods = new Joose.Proto.Class('Joose.Managed.StemElement.Methods', {
    
	isa : Joose.Managed.PropertySet.Containable,
    
    propertyMetaClass : Joose.Managed.Property.MethodModifier.Put,
    
    
    computeContainer : function(props){
        this.container = this.targetMeta.methods
    },
    
    
    prepareApply : function(){
    }
    
}).c