var metaClassMeta = new Joose.Kernel.ProtoModule('Joose.Kernel.MetaClass');

metaClassMeta.namespaceFilled = true;

metaClassMeta.initializeFromProps({
	
	isa : Joose.Kernel.ProtoModule,
	
    has : {
    	namespaceFilled : { init : true }
    },
	
    classMethods: {
    	
    	getNamespaceFiller : function () {
    		return Joose.Kernel.ProtoModule
    	},
    	
    	
        //namespace conflict resolution function (filling the namespace which is already filled by smth)
        fillOwnNamespace : function (parent, element, globalName) {
        	if (element.meta.namespaceFilled && this.meta.namespaceFilled) throw "Trying to setup Class " + res.globalName + " failed. There is already Class: "+element
        	
        	if (this.meta.namespaceFilled) {
        		
        		var aClass = (new this(globalName)).getClassObject();
        		element.meta.alias(aClass);
        		
        		parent.meta.container[aClass.meta.localName] = aClass;
        	}
        }
    	
    }
    
});


Joose.Kernel.MetaClass = metaClassMeta.getClassObject();