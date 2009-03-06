Joose.Managed.ClassStem = function(){ throw "Modules may not be instantiated." };

Joose.Managed.ClassStem.Attributes = new Joose.Proto.Class('Joose.Managed.ClassStem.Attributes', null, Joose.Managed.PropertySet.Containable, {
    
    propertyMetaClass : Joose.Managed.Property.Attribute,
    
    
    computeContainer : function(props){
        this.container = this.targetClass.meta.stem.properties.attributes;
    }
    
}).c;
