Joose.Managed.Method.Set = new Joose.Proto.Meta('Joose.Managed.Method.Set', null, Joose.Managed.Property.Composition, {
    
    propertyMetaClass : Joose.Managed.Method,
    
    
    computeContainer : function(props){
        this.container = this.targetClass.meta.methods;
    }
    
    
    
}).c;