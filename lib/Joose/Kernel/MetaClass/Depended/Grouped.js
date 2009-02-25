Joose.Kernel.ProtoRole.create('Joose.Kernel.MetaClass.Depended.Grouped', {
    
    requires : [ 'handlePropuse', 'processDependencies', 'addDescriptor' ],

    has: {
        groupedDependencies: {},
        delegatedToGroup: { init: false }
    },
    
    
    before : {
        handlePropuse: function (dependenciesInfo, props) {
            //each "use" property starts a new group of dependencies (if there isnt any already)
            //note that "url" dependencies will no have groups (because they cant depend from smth)
            this.groupedDependencies = this.groupedDependencies || {};
        }
    },
    
    
    after : {
        processDependencies : function () {
            if (this.groupedDependencies) {
                this.delegatedToGroup = true;
                this.handleGroupLoad();
            }
        },
        
        
        copyInternalState : function (target) {
            target.delegatedToGroup     = this.delegatedToGroup;
            target.dependenciesGroup    = this.dependenciesGroup;
        }
        
    },    
    
    
    override : {
        
        handleLoad: function() {
            //if the dependency doesnt have group - then proceed with original code, otherwise - do nothing 
            if (!this.groupedDependencies) this.SUPER();
        },
        
        
        getUrls: function () {
            if (!this.groupedDependencies) return this.SUPER();
            
            return __JOOSE_LIBRARIAN_ROOT__.concat( Digest.MD5.md5_hex(this.stringifyDependencies()) + '.js' ).join('/');
        },
        
        
        addDescriptor: function (descriptor) {
            this.SUPER(descriptor);
            
            var dependedMeta = descriptor.Module.meta;
            var depName = descriptor.depName;
            
            //if the module have no deps group and have no "url" - then adding it to group
            if (!dependedMeta.groupedDependencies && !descriptor.url) {
                dependedMeta.groupedDependencies = this.groupedDependencies;
                
                if (dependedMeta.loaded || dependedMeta.loading) return;
                
                dependedMeta.loading = true;
                
                //if there is already this dependencies then
                if (this.groupedDependencies[depName]) {
                    //if in the new specification there is no version - exit 
                    if (!descriptor.version) return
                    
                    //or if the version we have - bigger than in the new specification - exit
                    if (this.groupedDependencies[depName].version > descriptor.version) return;
                }
                
                //otherwise - adding/overwriting dependency
                this.groupedDependencies[depName] = descriptor;
            }
        }
        
    },
    
    
    methods: {

        handleGroupLoad: function() {
            var me = this;
            var haveLoadedButNotDelegated = false;
            var haveAny = false;
            
            var groupedDependencies = this.groupedDependencies;
            
            Joose.O.eachSafe(groupedDependencies, function(descriptor) {
                var depName = descriptor.depName;
                
                if (groupedDependencies[depName].Module.meta.delegatedToGroup) delete groupedDependencies[depName];
            })
            
            Joose.O.eachSafe(groupedDependencies, function(descriptor) {
                haveAny = true;
                
                var depName = descriptor.depName;
                
                if (groupedDependencies[depName].Module.meta.loaded) haveLoadedButNotDelegated = true;
            })
            
            if (haveLoadedButNotDelegated || !haveAny) return;
            
            var req = new Joose.SimpleRequest();
            
            var me = this;
            
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
                        
                        Joose.O.eachSafe(me.groupedDependencies, function(descriptor) {
                            var dependedMeta = descriptor.Module.meta;
                            
                            //Joose deps have this code in the "initializeFromProps" method
                            if (descriptor.presence) {
                                dependedMeta.loaded = true;
                                dependedMeta.loading = false;
                            }
                            
                            dependedMeta.finalizeDependencies();
                        })
                    }
                });
            } catch (e) {
                throw "Failed to load groupedDependencies bundle: " + me.stringifyDependencies()
            }

        },
        
        stringifyDependencies: function(){
            var dependenciesNames = [];
            
            Joose.O.eachSafe(this.groupedDependencies, function(descriptor, depName) {
                dependenciesNames.push((descriptor.presence ? 'ext://': '') + depName + (descriptor.version ? '-' + descriptor.version: ''));
            })
            
            dependenciesNames.sort();
            
            return dependenciesNames.join(',');
        }
        
    }
});
    
__JOOSE_LIBRARIAN_ENABLED__ = true;
__JOOSE_LIBRARIAN_ROOT__ = [ '/librarian' ];

Joose.Kernel.MetaClass.Depended.Grouped.meta.applyToClass(Joose.Kernel.MetaClass);
Joose.Kernel.MetaClass.Depended.Grouped.meta.applyToClass(Joose.Kernel.NamespaceKeeper);
Joose.Kernel.MetaClass.Depended.Grouped.meta.applyToClass(Joose.Kernel.ProtoRole);