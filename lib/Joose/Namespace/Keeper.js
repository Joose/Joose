Joose.Namespace.Keeper = new Joose.Meta.Class('Joose.Namespace.Keeper', {
    
    isa : Joose.Meta.Class,
    
    have : {
        externalConstructor: null
    },
    
    
    methods: {
        
        defaultConstructor: function (){
            return function(){
                if (this.meta instanceof Joose.Namespace.Keeper) throw new Error("Module [" + this.constructor + "] may not be instantiated.")
                
                if (typeof this.meta.externalConstructor == 'function') {
                    this.meta.externalConstructor.apply(this, arguments)
                    return
                }
                
                throw new Error("NamespaceKeeper was planted incorrectly.")
            }
        },
        
        
        //withClass should be not constructed yet on this stage (see Joose.Proto.Class.construct)
        plant: function (withClass) {
            var keeper = this.c
            
            keeper.meta = withClass.meta
            delete withClass.meta
            
            keeper.meta.c = keeper
            keeper.meta.externalConstructor = withClass
            
            this.copyNamespaceState(keeper)
        }
        
    }
    
}).c


