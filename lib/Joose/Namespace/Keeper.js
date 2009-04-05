Joose.Namespace.Keeper = new Joose.MetaClass('Joose.Namespace.Keeper', {
    
    isa : Joose.MetaClass,
    
    have : {
        externalConstructor: null,
        
        //true if this keeper was created only as a namespace stub before loading the actual module
        isLoadingStub : false
    },
    
    
    before : {
    	extend : function(props) {
    		if (props && props.isLoadingStub) {
    			this.isLoadingStub = props.isLoadingStub
    			delete props.isLoadingStub
    		}
    	}
    },
    
    
    methods: {
        
        defaultClassFunctionBody: function (){
            return function(){
                if (this.meta instanceof Joose.Namespace.Keeper) throw new Error("Module [" + this.constructor + "] may not be instantiated.")
                
                if (typeof this.meta.externalConstructor == 'function') {
                    this.meta.externalConstructor.apply(this, arguments);
                    return
                }
                
                throw new Error("NamespaceKeeper was planted incorrectly.")
            }
        },
        
        
        plant: function (withClass){
            var keeper = this.c
            
            withClass.meta.stem.open()
            
            keeper.meta = withClass.meta
            
            keeper.prototype = withClass.prototype
            withClass.prototype = {}
            
            keeper.prototype.constructor = keeper
            keeper.meta.c = keeper;
            
            this.copyNamespaceState(keeper);
            
            keeper.meta.externalConstructor = withClass;
            
            if (withClass.meta.meta.hasAttribute('myClass')) {
            	keeper.my = withClass.my;
            	delete withClass.my;
            }
            
            delete withClass.meta;
            
            keeper.meta.stem.close();
            
            return keeper;
        }
        
    }
    
}).c;


