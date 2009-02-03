var protoModuleMeta = new Joose.Kernel.Handlers('Joose.Kernel.ProtoModule');

protoModuleMeta.initializeFromProps({
	
	isa : Joose.Kernel.Namespace,
	
    has: {
    	attributeConstructor : { init : Joose.Kernel.AdvancedProtoAttribute, lazy : true }
    },
    
    
    classMethods: {
    	
        create : function (name, props){
        	
        	var element = Joose.Kernel.Namespace.prepareNamespace(name)
        	var globalName = element.meta._name;
        	
        	var parent  = element.meta.parent;
        	
    		if (element.meta.constructor == Joose.Kernel.Namespace) {
    		
        		var aClass = (new this(globalName)).getClassObject();
        		element.meta.alias(aClass);
        		
        		parent.meta.removeElement(element);
        		parent.meta.addElement(aClass);
        		
        		element = aClass;
    		}
        	
        	element.meta.initializeFromProps(props)
        	
        	return element;
        }
        
    }
    
});

    
Joose.Kernel.ProtoModule = protoModuleMeta.getClassObject();