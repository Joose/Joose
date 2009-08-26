Joose.Namespace.Keeper = new Joose.Meta.Class('Joose.Namespace.Keeper', {
    
    isa : Joose.Meta.Class,
    
    have : {
        externalConstructor: null
    },
    
    
    methods: {
        
        defaultConstructor: function (){
            return function(){
                var thisMeta = arguments.callee.meta
                
                if (thisMeta instanceof Joose.Namespace.Keeper) throw "Module [" + thisMeta.c + "] may not be instantiated."
                
                if (typeof thisMeta.externalConstructor == 'function') {
                    thisMeta.externalConstructor.apply(this, arguments)
                    return
                }
                
                throw "NamespaceKeeper was planted incorrectly."
            }
        },
        
        
        //withClass should be not constructed yet on this stage (see Joose.Proto.Class.construct)
        //however it should already have constructor
        plant: function (withClass) {
            var keeper = this.c
            
            //withClass will still meta attached, because constructor may rely on its presence
            //constructors should retrive meta as arguments.callee.meta and assume that constructor is meta.c (not arguments.callee itself) 
            keeper.meta = withClass.meta
            
            keeper.meta.c = keeper
            keeper.meta.externalConstructor = withClass
            
            this.copyNamespaceState(keeper)
        },

        
        copyNamespaceState : function(targetClass) {
            var targetMeta = targetClass.meta
            
            if (!targetMeta.meta.hasAttribute('ns')) throw "No 'ns' attribute in meta of [" + targetClass + ']' 
            
            this.ns.unapply()
            
            targetMeta.parent               = this.parent
            targetMeta.localName            = this.localName
            
            targetMeta.ns                   = this.ns
            targetMeta.ns.targetMeta        = targetMeta
            targetMeta.ns.computeContainer()
            
            targetMeta.ns.apply()
        }
        
    }
    
}).c


