Joose.Kernel.Namespace = new Joose.Kernel.Class('Joose.Kernel.Namespace', {
    
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
        if (value && value.meta && value.meta.meta.hasAttribute('nameSpace')) {
            value.meta.parent = this.targetClass.meta.nameSpace;
        }
        
        return this.container[name] = this.properties[name] = value;
    },
    

    addPropertyObject : function (object) {
    }
    
    
}).c;
