var dependenciesGroupMeta = new Joose.Kernel.Namespace('Joose.Kernel.DependenciesGroup');

dependenciesGroupMeta.initializeFromProps({
    
    isa : Joose.Kernel.Namespace,
    
//    has : {
//        namespaces : {}
//    },
//    
//    after : {
//        initialize : function() {
//            this.namespaces = {};
//        }
//    },
    
    methods : {
        
        
        addDescriptor : function (descriptor) {
            var dependedModule = descriptor.Module;
            var depName = descriptor.depName;
            
            if (dependedModule.meta.loaded || dependedModule.meta.loading) return;
            
            dependedModule.meta.loading = true;
            
            if (this.dependencies[depName] && this.dependencies[depName].version > descriptor.version) return;
            
            this.dependencies[depName] = descriptor;
        },
        
        
        handleLoad : function() {
            var me = this;
            var haveLoadedButNotDelegated = false;
            
            Joose.O.eachSafe(this.dependencies, function(descriptor) {
                var depName = descriptor.depName;
                
                if (me.dependencies[depName].Module.meta.delegatedToGroup) {
                    delete me.dependencies[depName];
                    return
                }
                
                if (me.dependencies[depName].Module.meta.loaded) haveLoadedButNotDelegated = true;
            })
            
            if (haveLoadedButNotDelegated) return;
            
            
//            var thisNamespace = this.nextGeneration;
//            
//            try {
//                if (this.loaded || typeof this.presence == 'function' && this.presence()) {
//                    this.checkDependencies();
//                    return;
//                }
//            } catch (e) { }
//            
//            
//            if (this.loading) return;
//            this.loading = true;
//            
//            var urls = this.getUrls();
//            if (!(urls instanceof Array)) urls = [ urls ];
//            
//            var onready = function() {
//                thisNamespace.meta.loaded = true;
//                thisNamespace.meta.loading = false;
//                thisNamespace.meta.checkDependencies();
//            }
//            
//            var onerror = function(){
//                //if no more urls
//                if (!urls.length) throw "Module=[" + thisNamespace + "] not found";
//                
//                Joose.Kernel.Namespace.transports[thisNamespace.meta.transport].call(thisNamespace.meta, urls.shift(), onready, onerror);
//            }
//            
//            //to avoid cycled recursion in getNamespace()
//            onerror.__JOOSE_MODULE__ = __global__;
//            
//            Joose.Kernel.Namespace.transports[this.transport].call(this, urls.shift(), onready, onerror);
        }
        
    
    }
    
});

Joose.Kernel.DependenciesGroup = dependenciesGroupMeta.getClassObject();