var namespaceKeeperMeta = new Joose.Kernel.Namespace('Joose.Kernel.NamespaceKeeper');

namespaceKeeperMeta.initializeFromProps({
    isa : Joose.Kernel.Namespace,
    
    methods : {
        defaultClassFunctionBody : function (){
            return function(){
                if (this.meta.constructor == Joose.Kernel.NamespaceKeeper) throw new Error("Modules may not be instantiated.")
                
                if (typeof this.meta.externalConstructor == 'function') {
                    this.meta.externalConstructor.apply(this, arguments);
                    return
                }
                
                throw new Error("NamespaceKeeper was planted incorrectly.")
            }
        }
    }
})

Joose.Kernel.NamespaceKeeper = namespaceKeeperMeta.getClassObject();

__global__ = new Joose.Kernel.NamespaceKeeper("", function(){ throw "Global NamespaceKeeper can't be instantiated" }).getClassObject();
__global__.meta._name = '';
__global__.meta.container = joose.top;
__global__.meta.parent = __global__;

new Joose.Kernel.NamespaceKeeper("Joose", Joose);
new Joose.Kernel.NamespaceKeeper("Joose.Kernel", Joose.Kernel);

__global__.meta.addElement('Joose', Joose)
Joose.meta.addElement('Kernel', Joose.Kernel);