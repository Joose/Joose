Joose.Managed.PropertySet.Namespace = new Joose.Proto.Class('Joose.Managed.PropertySet.Namespace', {
    
	isa : Joose.Managed.PropertySet.Containable,
    
    propertyMetaClass : null,
    
    
    computeContainer : function(props){
        this.container = this.targetClass;
    },
    
    
    apply : function(){
    },
    
    
    unapply : function(){
    },
    
    
    prepareApply : function(){
    },
    
    
    addProperty : function (name, value) {
        if (value && value.meta && value.meta.meta.hasAttribute('ns')) {
            value.meta.parent = this.targetClass.meta.ns;
        }
        
        return this.container[name] = this.properties[name] = value;
    },
    

    addPropertyObject : function (object) {
    }
    
    
}).c;
