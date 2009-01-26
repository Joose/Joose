var metaClassMeta = new Joose.Kernel.Mammals('Joose.Kernel.MetaClass');

metaClassMeta.addSuperClass(Joose.Kernel.Mammals);

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
    
    /* Use the custom meta class if provided */
    if(props && props.meta) {
        metaClass = props.meta
        delete props.meta
    } else {
    	/* Default meta class is this class itself */
        metaClass   = this;
    }    
    
    var aClass      = (new metaClass(className, c)).getClassObject();
    
    if (joose.currentModule) {
    	joose.currentModule.addElement(aClass)
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
        root[parts[parts.length - 1]] = aClass
    }
        
    aClass.meta.initializeFromProps(props)
	
});



////plus some new genes
//metaClassMeta.addGenes({
//	
//    
//});


Joose.Kernel.MetaClass = metaClassMeta.getClassObject();
