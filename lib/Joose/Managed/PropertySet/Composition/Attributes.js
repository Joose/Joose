Joose.Managed.Attribute.Set = new Joose.Proto.Meta('Joose.Managed.Attribute.Set', null, Joose.Managed.Property.Composition, {
    
    propertyMetaClass : Joose.Managed.Attribute,
    
    
    computeContainer : function(props){
        this.container = this.targetClass.meta.attributes;
    }
    
    
    
    
}).c;
