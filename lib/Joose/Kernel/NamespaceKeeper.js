Joose.Kernel.NamespaceKeeper = new Joose.Kernel.Class('Joose.Kernel.NamespaceKeeper', {
    
    isa : Joose.Kernel.Class,
    
    does : [ Joose.Kernel.Namespaceable],
    
    have : {
        externalConstructor: null
    },
    
    methods: {
        
        defaultClassFunctionBody: function (){
            return function(){
                if (this.meta instanceof Joose.Kernel.NamespaceKeeper) throw new Error("Modules may not be instantiated.")
                
                if (typeof this.meta.externalConstructor == 'function') {
                    this.meta.externalConstructor.apply(this, arguments);
                    return
                }
                
                throw new Error("NamespaceKeeper was planted incorrectly.")
            }
        },
        
        
        plant: function (name, props){
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
    
}).c;


__global__ = new Joose.Kernel.NamespaceKeeper(null, {
    constructor : function(){
        throw "Global namespace cant be instantiated"
    }
}).c;


__global__.meta.nameSpace.container = this;
__global__.meta.parent = __global__;


new Joose.Kernel.NamespaceKeeper("Joose", {
    constructor : Joose
});


new Joose.Kernel.NamespaceKeeper("Joose.Kernel", {
    constructor : Joose.Kernel
});


__global__.meta.nameSpace.addProperty('Joose', Joose)

Joose.meta.nameSpace.addProperty('Kernel', Joose.Kernel);