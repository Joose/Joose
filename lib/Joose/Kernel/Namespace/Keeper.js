Joose.Kernel.Namespace.Keeper = new Joose.Kernel.Class('Joose.Kernel.Namespace.Keeper', {
    
    isa : Joose.Kernel.Class,
    
    have : {
        externalConstructor: null
    },
    
    methods: {
        
        defaultClassFunctionBody: function (){
            return function(){
                if (this.meta instanceof Joose.Kernel.Namespace.Keeper) throw new Error("Modules may not be instantiated.")
                
                if (typeof this.meta.externalConstructor == 'function') {
                    this.meta.externalConstructor.apply(this, arguments);
                    return
                }
                
                throw new Error("NamespaceKeeper was planted incorrectly.")
            }
        },
        
        
        plant: function (withClass){
            var keeper = this.c;
            
            keeper.meta.copyNamespaceState(withClass.meta);
            
            keeper.meta = withClass.meta;
            
            keeper.prototype = withClass.prototype;
            keeper.prototype.constructor = keeper;
            keeper.meta.c = keeper;
            
            keeper.meta.externalConstructor = withClass;
            
            if (withClass.meta.meta.hasAttribute('myClass')) keeper.my = withClass.my;
            
            return keeper;
        }

        
    }
    
}).c;