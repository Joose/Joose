Joose.Managed.ClassStem.Methods = new Joose.Proto.Class('Joose.Managed.ClassStem.Methods', null, Joose.Managed.PropertySet.Containable, {
    
    propertyMetaClass : Joose.Managed.Property.Method,
    
    
    computeContainer : function(props){
        this.container = this.targetClass.meta.stem.properties.methods;
    }
    
}).c;