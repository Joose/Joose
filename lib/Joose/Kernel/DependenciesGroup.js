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
    
    
    override : {
        
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
            
            this.loaded = false;
            this.loading = false;
            
            this.SUPER();
        }
        
    },
    
    methods : {
        
        
        addDescriptor : function (descriptor) {
            var dependedModule = descriptor.Module;
            var depName = descriptor.depName;
            
            if (dependedModule.meta.loaded || dependedModule.meta.loading) return;
            
            dependedModule.meta.loading = true;
            
            if (this.dependencies[depName] && this.dependencies[depName].version > descriptor.version) return;
            
            this.dependencies[depName] = descriptor;
        },
        
        
        getUrls : function () {
            var dependenciesNames = [];
            
            Joose.O.eachSafe(this.dependencies, function(descriptor) {
                dependenciesNames.push(descriptor.depName + (descriptor.version ? '-' + descriptor.version : ''));
            })
            
            dependenciesNames.sort();
            
            return __JOOSE_LIBRARIAN_ROOT__.concat( Digest.MD5.md5_hex(dependenciesNames.join(',')) + '.js' ).join('/');
        },
        
        
        checkDependencies : function (){
        }
    
    }
    
});

Joose.Kernel.DependenciesGroup = dependenciesGroupMeta.getClassObject();