Joose.Namespace.Keeper = new Joose.Meta.Class('Joose.Namespace.Keeper', {
    
    isa : Joose.Meta.Class,
    
    have : {
        externalConstructor             : null
    },
    
    
    methods: {
        
        defaultConstructor: function () {
            return function () {
                var thisMeta = this.meta
                
                if (thisMeta instanceof Joose.Namespace.Keeper) throw "Module [" + thisMeta.c + "] may not be instantiated."
                
                var externalConstructor = thisMeta.externalConstructor
                
                if (typeof externalConstructor == 'function') {
                    
                    externalConstructor.meta = thisMeta
                    
                    return externalConstructor.apply(this, arguments)
                }
                
                throw "NamespaceKeeper was planted incorrectly."
            }
        },
        
        
        //withClass should be not constructed yet on this stage (see Joose.Proto.Class.construct)
        //however it should already have constructor
        plant: function (withClass) {
            var keeper = this.c
            
            //constructors should assume that constructor is meta.c (not arguments.callee itself) 
            keeper.meta = withClass.meta
            
            keeper.meta.c = keeper
            keeper.meta.externalConstructor = withClass
            
            this.copyNamespaceState(keeper)
        },

        
        copyNamespaceState : function (targetClass) {
            var targetMeta = targetClass.meta
            
            targetMeta.parentNs             = this.parentNs
            targetMeta.localName            = this.localName
            
            targetMeta.ns                   = this.ns
        }
        
    }
    
}).c


