var metaClassMeta = new Joose.Kernel.Roles('Joose.Kernel.MetaClass');

metaClassMeta.addSuperClass(Joose.Kernel.Roles);


metaClassMeta.addClassMethod('create', function(name, props) {
    var c = null;
    var className;
    
    if(name) {
        className  = name;
        if(joose.currentModule) {
            className  = joose.currentModule.getName() + "." + name
        }
        var root       = joose.top;
        var parts      = className.split(".")
    
        for(var i = 0; i < parts.length; i++) {
            root = root[parts[i]]
        }
        c = root;
    }

    var metaClass;
    
    if (c == null) {
	    /* Use the custom meta class if provided */
	    if(props && props.meta) {
	        metaClass = props.meta
	        delete props.meta
	    } 
	    
        /* Otherwise use the meta class of the parent class (If there is one)
         * If the parent class is Joose.Class, we don't change the meta class but use the default
         * because that Joose.Class's meta class is only needed for bootstrapping
         * purposes. */
        else if(props && props.isa && props.isa != Joose.Class) {
            metaClass = props.isa.meta.constructor
        } else {
	    	/* Default meta class is this class itself */
	        metaClass   = this;
	    }    
	    
	    c = (new metaClass(className)).getClassObject();
	    
	    if (joose.currentModule) {
	    	joose.currentModule.addElement(c)
	    } else {
	    	__global__.nomodule.meta.addElement(c)
	    }
	    
	    if(name && className) {
	        var root = joose.top;
	        var n = new String(className);
	        var parts = n.split(".");
	        for(var i = 0; i < parts.length - 1; i++) {
	            if(root[parts[i]] == null) {
	                root[parts[i]] = {};
	            }
	            root = root[parts[i]];
	        }
	        root[parts[parts.length - 1]] = c
	    }
    }
        
    c.meta.initializeFromProps(props)
	
});



////plus some new genes
//metaClassMeta.addGenes({
//	
//    
//});


Joose.Kernel.MetaClass = metaClassMeta.getClassObject();
