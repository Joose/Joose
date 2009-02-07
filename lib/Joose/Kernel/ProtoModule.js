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
            
    		if (element.meta.constructor == Joose.Kernel.NamespaceKeeper) {
    		
        		var aClass = new this(globalName).getClassObject();
                
                aClass.meta.parent = element.meta.parent;
                aClass.meta.namespaceElements = element.meta.namespaceElements;
                aClass.meta.container = element.meta.container;
                
                aClass.meta.loading = element.meta.loading;
                aClass.meta.loaded = element.meta.loaded;
                aClass.meta.ready = element.meta.ready;
                aClass.meta.readyListeners = element.meta.readyListeners;
                aClass.meta.dependencies = element.meta.dependencies;
                
                element.meta = aClass.meta;
                
                element.prototype = aClass.prototype;
                element.prototype.constructor = element;
                element.meta.nextGeneration = element;
                element.meta.externalConstructor = aClass;
                
                Joose.A.each(aClass.meta.getClassMethods(), function(method){
                    method.addToClass(element);
                })
                
    		}
        	
            if (props && props.use) {
                //satisfy dependencies 1st
                var depInfo = props.use;
                delete props.use;
                
                //unshift is critical for correct order of readyListerens processing, this listener should be processed 1st(!)
                element.meta.readyListeners.unshift(function(){
                    var body = props.body;
                    delete props.body;
                    
                    element.meta.initializeFromProps(props)
                    
                    element.meta._initializeFromProp('body', body, props)
                });
                
                element.meta._initializeFromProp('use', depInfo, props)
            } else {
                element.meta.initializeFromProps(props)
            }
        	
        	return element;
        }
        
    }
    
});

    
Joose.Kernel.ProtoModule = protoModuleMeta.getClassObject();