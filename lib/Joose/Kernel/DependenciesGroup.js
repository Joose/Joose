var dependenciesGroupMeta = new Joose.Kernel.Namespace('Joose.Kernel.DependenciesGroup');

dependenciesGroupMeta.initializeFromProps({
    
    isa : Joose.Kernel.Namespace,
    
    methods : {
        
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
            
            var req = new Joose.SimpleRequest();
            
            var me = this;
            
            var onerror = function(){
                throw "Failed to load dependencies bundle: " + me.stringifyDependencies()
            }
        
            try {
                req.postText(this.stringifyDependencies(), this.getUrls(), true, function(success, text){
                    if (!success) { onerror(); return }
                    
                    eval(text);
                });
            } catch (e) {
                onerror();
            }

        },
        
        addDescriptor : function (descriptor) {
            var dependedModule = descriptor.Module;
            var depName = descriptor.depName;
            
            if (dependedModule.meta.loaded || dependedModule.meta.loading) return;
            
            dependedModule.meta.loading = true;
            
            if (this.dependencies[depName] && this.dependencies[depName].version > descriptor.version) return;
            
            this.dependencies[depName] = descriptor;
        },
        
        
        stringifyDependencies : function(){
            var dependenciesNames = [];
            
            Joose.O.eachSafe(this.dependencies, function(descriptor, depName) {
                dependenciesNames.push(depName + (descriptor.version ? '-' + descriptor.version : ''));
            })
            
            dependenciesNames.sort();
            
            return dependenciesNames.join(',');
        },
        
        
        getUrls : function () {
            return __JOOSE_LIBRARIAN_ROOT__.concat( Digest.MD5.md5_hex(this.stringifyDependencies()) + '.js' ).join('/');
        }
    
    }
    
});

Joose.Kernel.DependenciesGroup = dependenciesGroupMeta.getClassObject();