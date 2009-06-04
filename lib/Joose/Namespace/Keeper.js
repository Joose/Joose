Joose.Namespace.Keeper = new Joose.Meta.Class('Joose.Namespace.Keeper', {
    
    isa : Joose.Meta.Class,
    
    have : {
        externalConstructor: null
    },
    
    
    methods: {
        
        defaultConstructor: function (){
            return function(){
                var thisMeta = arguments.callee.meta
                
                if (thisMeta instanceof Joose.Namespace.Keeper) throw new Error("Module [" + thisMeta.c + "] may not be instantiated.")
                
                if (typeof thisMeta.externalConstructor == 'function') {
                    thisMeta.externalConstructor.apply(this, arguments)
                    return
                }
                
                throw new Error("NamespaceKeeper was planted incorrectly.")
            }
        },
        
        
        //withClass should be not constructed yet on this stage (see Joose.Proto.Class.construct)
        plant: function (withClass) {
            var keeper = this.c
            
            //withClass will still meta attached, because constructor may rely on its presence
            //constructors should retrive meta as arguments.callee.meta and assume that constructor is meta.c (not arguments.callee itself) 
            keeper.meta = withClass.meta
            
            keeper.meta.c = keeper
            keeper.meta.externalConstructor = withClass
            
            this.copyNamespaceState(keeper)
        }
        
    }
    
}).c


