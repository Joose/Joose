Joose.Managed.Attribute.Set = new Joose.Proto.Meta('Joose.Managed.Attribute.Set', null, Joose.Managed.Property.Set, {
    
    propertyMetaClass : Joose.Managed.Attribute,
    
    
    computeContainer : function(props){
        this.container = this.target.meta.attributes;
    }
    
    
    
    
}).c;
