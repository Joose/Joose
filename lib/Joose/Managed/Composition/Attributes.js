Joose.Managed.Composition.Attributes = new Joose.Proto.Meta('Joose.Managed.Composition.Attributes', null, Joose.Managed.Composition, {
    
    propertyMetaClass : Joose.Managed.Property.Attribute,
    
    
    computeContainer : function(props){
        this.container = this.targetClass.meta.attributes;
    }
    
    
    
    
}).c;
