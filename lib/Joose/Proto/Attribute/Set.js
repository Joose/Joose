Joose.Proto.Attribute.Set = new Joose.Proto.Meta('Joose.Proto.Attribute.Set', null, Joose.Proto.Property.Set, {
    
    propertyMetaClass : Joose.Proto.Attribute,
    
    
    computeContainer : function(props){
        this.container = this.target.meta.attributes;
    }
    
    
    
    
}).c;
