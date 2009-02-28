Joose.Proto.MethodsSet = new Joose.Proto.Meta('Joose.Proto.MethodsSet', null, Joose.Proto.Property.Set, {
    
    propertyMetaClass : Joose.Proto.Method,
    
    computeContainer : function(props){
        this.container = this.target.meta.methods;
    }    
    
}).c;