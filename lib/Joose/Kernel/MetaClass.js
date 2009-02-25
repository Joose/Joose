var metaClassMeta = new Joose.Kernel.ProtoModule('Joose.Kernel.MetaClass');

metaClassMeta.initializeFromProps({
    
    isa: Joose.Kernel.ProtoModule,
    
    classMethods: {
        
        create: function (name, props){
            var element = Joose.Kernel.ProtoModule.prepareNamespace(name)
            var globalName = element.meta._name;
            
            if (element.meta.constructor == Joose.Kernel.NamespaceKeeper) {
            
                var aClass = new this(globalName).getClassObject();
                
                element.meta.copyInternalState(aClass.meta);
                
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