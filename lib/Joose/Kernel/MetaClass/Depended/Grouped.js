Joose.Kernel.ProtoRole.create('Joose.Kernel.MetaClass.Depended.Grouped', {
    
    requires : [ 'prepareDependencyDescriptor' ],

    has: {
        dependenciesGroup: {},
        delegatedToGroup: { init: false },
    
        //object with dependency descriptors
        dependencies: {}
    },
    
    
    methods: {

        handlePropuse: function (dependenciesInfo, props) {
//            this.dependenciesGroup = this.dependenciesGroup || new Joose.Kernel.DependenciesGroup('');
            
//            //we are scoping this method call not to usual "this", but to "this namespace"
//            //this is related to the fact, that during loading, the Module can be promoted to the Class, and the instance of meta 
//            //will change, but the class function itself will remain untouched
//            //this is also used in others places in the code
//            var thisNamespace = this.c;
//            
//            thisNamespace.meta.prepareDependencies(dependenciesInfo);
//            thisNamespace.meta.processDependencies();
//            thisNamespace.meta.finalizeDependencies();
        },

        
        finalizeDependencies : function(){
            this.checkDependencies();
            
//                this.ready = true;
//                if (this.dependenciesGroup && __JOOSE_LIBRARIAN_ENABLED__) {
//                    this.delegatedToGroup = true;
//                    this.dependenciesGroup.handleLoad();
//                }
            
        },
        
        
        //this function prepares the dependency descriptor (which can be a raw string also)
        //it turns the descritor.Module string to the "namespace body" with meta, which is Joose.Kernel.MetaClass
        prepareDependencyDescriptor: function (thisNamespace, descriptor) {
            //turning into object if necessary
            
            if (!descriptor.Module.dependenciesGroup) descriptor.Module.dependenciesGroup = thisNamespace.meta.dependenciesGroup;
            
            return descriptor;
        },
        
        
        handleLoad: function() {
            var me = this;
            var haveLoadedButNotDelegated = false;
            var haveAny = false;
            
            Joose.O.eachSafe(this.dependencies, function(descriptor) {
                var depName = descriptor.depName;
                
                if (me.dependencies[depName].Module.meta.delegatedToGroup) delete me.dependencies[depName];
            })
            
            Joose.O.eachSafe(this.dependencies, function(descriptor) {
                haveAny = true;
                
                var depName = descriptor.depName;
                
                if (me.dependencies[depName].Module.meta.loaded) haveLoadedButNotDelegated = true;
            })
            
            if (haveLoadedButNotDelegated || !haveAny) return;
            
            var req = new Joose.SimpleRequest();
            
            var me = this;
            
            var onerror = function(){
                throw "Failed to load dependencies bundle: " + me.stringifyDependencies()
            }
        
            try {
                req.getText({
                    url: this.getUrls(),
                    headers: {
                        'X-Joose-Bundle': this.stringifyDependencies()
                    },
                    async: true,
                    callback: function(success, text) {
                        if (!success) { onerror(); return }
                        
                        eval(text);
                        
                        Joose.O.eachSafe(me.dependencies, function(descriptor) {
                            var virtualMeta = descriptor.Module.meta;
                            
                            if (descriptor.presence) {
                                virtualMeta.loaded = true;
                                virtualMeta.loading = false;
                            }
                            
                            virtualMeta.checkDependencies();
                        })
                    }
                });
            } catch (e) {
                onerror();
            }

        },
        
        addDescriptor: function (descriptor) {
            var dependedModule = descriptor.Module;
            var depName = descriptor.depName;
            
            if (dependedModule.meta.loaded || dependedModule.meta.loading) return;
            
            dependedModule.meta.loading = true;
            
            if (this.dependencies[depName] && this.dependencies[depName].version > descriptor.version) return;
            
            this.dependencies[depName] = descriptor;
        },
        
        
        stringifyDependencies: function(){
            var dependenciesNames = [];
            
            Joose.O.eachSafe(this.dependencies, function(descriptor, depName) {
                dependenciesNames.push((descriptor.presence ? 'ext://': '') + depName + (descriptor.version ? '-' + descriptor.version: ''));
            })
            
            dependenciesNames.sort();
            
            return dependenciesNames.join(',');
        },
        
        
        getUrls: function () {
            return __JOOSE_LIBRARIAN_ROOT__.concat( Digest.MD5.md5_hex(this.stringifyDependencies()) + '.js' ).join('/');
        }
        
    }
});
    
__JOOSE_LIBRARIAN_ENABLED__ = true;
__JOOSE_LIBRARIAN_ROOT__ = [ '/librarian' ];