Joose.Proto.Method.Set = new Joose.Proto.Meta('Joose.Proto.Method.Set', null, Joose.Proto.Property.Set, {
    
    propertyMetaClass : Joose.Proto.Method,
    
    
    computeContainer : function(props){
        this.container = this.target.meta.methods;
    }
    
    
    
}).c;