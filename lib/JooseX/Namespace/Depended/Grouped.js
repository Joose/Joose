Role('JooseX.Namespace.Depended.Grouped', {
    
    requires : [ 'processDependencies', 'addDescriptor' ],

    have : {
        groupedDeps: null
    },
    
    
    
    builder : {
    
	    before : {
	        use : function (targetClassMeta, depInfo) {
	            //each "use" property starts a new group of dependencies (if there isnt any already)
	            //note that "url" dependencies will no have groups (because they cant depend from smth)
	        	//dependencies group contain 2 queues - 'pending' and 'processing'
	        	//'pending' queue contain descriptors which only will be loaded
	        	//'processing' - desriptors which are already loaded and currently are processing
	            targetClassMeta.groupedDeps = targetClassMeta.groupedDeps || {
	            	processing : {},
	            	pending : {}
	            };
	        }
	    }
	    
    },
    
    
    after : {
        processDependencies : function () {
            if (this.groupedDeps) {
                var processing = this.groupedDeps.processing;
            	
                //at this point this dependency have delegate all its dependencies to the group
                //it is already loaded, so need to remove itself from grouped dependecies
                delete processing[this.name];
                if (Joose.O.isEmpty(processing)) this.handleGroupLoad();
            }
        },
        
        
        copyNamespaceState : function (targetClass) {
        	var targetMeta = targetClass.meta;
        	
            targetMeta.groupedDeps    = this.groupedDeps;
        }
        
    },    
    
    
    override : {
        
        handleLoad: function() {
            //if the dependency doesnt have group - then proceed with original code, otherwise - do nothing 
            if (!this.groupedDeps) this.SUPER();
        },
        
        
        getUrls: function () {
            if (!this.groupedDeps) return this.SUPER();
            
            return Joose.Namespace.Manager.my.librarianRoot.concat( Digest.MD5.my.md5_hex(this.stringifyDependencies()) + '.js' ).join('/');
        },
        
        
        addDescriptor: function (descriptor) {
            this.SUPER(descriptor);
            
            var dependedMeta = descriptor.Module.meta;
            var depName = descriptor.depName;
            
            //if the module have no deps group and have no "url" - then adding it to group
            if (!dependedMeta.groupedDeps && !descriptor.url) {
                dependedMeta.groupedDeps = this.groupedDeps;
                
                if (dependedMeta.loaded || dependedMeta.loading) return;
                
                dependedMeta.loading = true;
                
                var pending = this.groupedDeps.pending;
                
                //if there is already this dependencies then
                if (pending[depName]) {
                    //if in the new specification there is no version - exit 
                    if (!descriptor.version) return
                    
                    //or if the version we have - bigger than in the new specification - exit
                    if (pending[depName].version > descriptor.version) return;
                }
                
                //otherwise - adding/overwriting dependency
                pending[depName] = descriptor;
            }
        }
        
    },
    
    
    methods: {

        handleGroupLoad: function() {
            var groupedDeps = this.groupedDeps;
            
            if (Joose.O.isEmpty(groupedDeps.pending)) return;
        	
        	groupedDeps.processing = groupedDeps.pending;
            groupedDeps.pending = {};
            
            var req = new JooseX.SimpleRequest();
            
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
                        
                        Joose.O.eachSafe(me.groupedDeps.processing, function(descriptor) {
                            var dependedMeta = descriptor.Module.meta;
                            
                            //Joose deps have this code in the "initializeFromProps" method
                            if (descriptor.presence) {
                                dependedMeta.loaded = true;
                                dependedMeta.loading = false;
                                
                                dependedMeta.finalizeDependencies();
                            }
                        })
                    }
                });
            } catch (e) {
                throw "Failed to load groupedDeps bundle: " + me.stringifyDependencies()
            }

        },
        
        
        //will stringify 'processing' queue, coz the 'pending' queue becomes 'processing' right before loading
        stringifyDependencies: function(){
            var dependenciesNames = [];
            
            Joose.O.eachSafe(this.groupedDeps.processing, function(descriptor, depName) {
                dependenciesNames.push((descriptor.presence ? 'ext://': '') + depName + (descriptor.version ? '-' + descriptor.version: ''));
            })
            
            dependenciesNames.sort();
            
            return dependenciesNames.join(',');
        }
        
    }
});
    

Joose.Namespace.Manager.my.meta.extend({
	have : {
		librarianRoot : [ '/librarian' ]		
	} 
});



Joose.Meta.Class.meta.extend({
    does                        : [ JooseX.Namespace.Depended.Grouped ]
});


Joose.Meta.Role.meta.extend({
    does                        : [ JooseX.Namespace.Depended.Grouped ]
});
