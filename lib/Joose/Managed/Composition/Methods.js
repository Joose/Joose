Joose.Managed.Composition.Methods = new Joose.Proto.Meta('Joose.Managed.Composition.Methods', null, Joose.Managed.Composition, {
    
    propertyMetaClass : Joose.Managed.Property.Method,
    
    
    computeContainer : function(props){
        this.container = this.targetClass.meta.methods;
    }
    
    
    
}).c;