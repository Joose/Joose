Joose.Managed.PropertySet.Namespace = new Joose.Proto.Class('Joose.Managed.PropertySet.Namespace', {
    
	isa : Joose.Managed.PropertySet.Containable,
    
    propertyMetaClass : null,
    
    
    computeContainer : function(props){
        this.container = this.targetMeta.c;
    },
    
    
    apply : function(target){
        this.each(function(property, name){
        	this.container[name] = property;
        }, this)
    },
    
    
    unapply : function(){
        this.each(function(property, name){
	        try {
	            delete this.container[name];
	        } catch(e) {
	            this.container[name] = undefined;
	        }
        }, this)
    },
    
    
    
    prepareApply : function(){
    },
    
    
    addProperty : function (name, value) {
        if (value && value.meta && value.meta.meta.hasAttribute('ns')) {
            value.meta.parent = this.targetMeta.ns;
        }
        
        return this.container[name] = this.properties[name] = value;
    },
    

    haveOwnProperty : function(name) {
        return this.haveProperty(name);// && this.container.hasOwnProperty(name);
    },
    
    
    addPropertyObject : function (object) {
    }
    
    
}).c;
