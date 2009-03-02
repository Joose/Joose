Joose.Managed.Method.Set = new Joose.Proto.Meta('Joose.Managed.Method.Set', null, Joose.Managed.Property.Set, {
    
    propertyMetaClass : Joose.Managed.Method,
    
    
    computeContainer : function(props){
        this.container = this.target.meta.methods;
    }
    
    
    
}).c;