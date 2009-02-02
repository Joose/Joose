var metaClassMeta = new Joose.Kernel.Roles('Joose.Kernel.MetaClass');

metaClassMeta.initializeFromProps({
	
	isa : Joose.Kernel.Roles,
	
    has : {
    	namespaceFilled : { init : true }
    },
	
    classMethods: {
    	
    	getNamespaceFiller : function () {
    		return Joose.Kernel.ProtoModule
    	},
    	
    	
        //namespace conflict resolution function (filling the namespace which is already filled by smth)
        fillOwnNamespace : function (parent, element, globalName) {
        	//class redefinition
        	if (element.meta.namespaceFilled && this.meta.namespaceFilled) return;
        	
        	if (this.meta.namespaceFilled) {
        		
        		var aClass = (new this(globalName)).getClassObject();
        		element.meta.alias(aClass);
        		
        		parent.meta.container[aClass.meta.localName] = aClass;
        	}
        }
    	
    }
    
});


Joose.Kernel.MetaClass = metaClassMeta.getClassObject();