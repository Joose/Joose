var metaClassMeta = new Joose.Kernel.Namespace('Joose.Kernel.MetaClass');

metaClassMeta.initializeFromProps({
    
    isa: Joose.Kernel.Namespace,
    
    classMethods: {
        
        create: function (name, props){
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
                aClass.meta.delegatedToGroup = element.meta.delegatedToGroup;
                aClass.meta.dependenciesGroup = element.meta.dependenciesGroup;
                aClass.meta.BEGIN = element.meta.BEGIN;
                
                element.meta = aClass.meta;
                
                element.prototype = aClass.prototype;
                element.prototype.constructor = element;
                element.meta.c = element;
                element.meta.externalConstructor = aClass;
                
                Joose.A.each(aClass.meta.getClassMethods(), function(method){
                    method.addToClass(element);
                })
                
            }
            
            element.meta.initializeFromProps(props)
            
            return element;
        }
    }    
    
});


Joose.Kernel.MetaClass = metaClassMeta.getClassObject();