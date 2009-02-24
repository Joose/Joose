Joose.Kernel.ProtoRole.create('Joose.Kernel.MetaClass.Depended.NonCycled', {
    
    requires : [ 'prepareDependencyDescriptor' ],

    
    has: {
        
        dependenciesGroup: {},
        delegatedToGroup: { init: false },
    
        //object with dependency descriptors
        dependencies: {}
    },
    
    
    methods: {
        
        //this function prepares the dependency descriptor (which can be a raw string also)
        //it turns the descritor.Module string to the "namespace body" with meta, which is Joose.Kernel.MetaClass
        prepareDependencyDescriptor: function (thisNamespace, descriptor) {
            //turning into object if necessary
            if (typeof descriptor == 'string') descriptor = { Module: descriptor };
            
            if (descriptor.Module && descriptor.url) throw "Dependency of [" + thisNamespace + "] from external url=[" + descriptor.url + "], can't have Module defined [" + descriptor.Module + "]";
            
            // ext:// to presence transformation, existing presence attribute will be overwritten!
            if (/^ext:\/\//.test(descriptor.Module)) {
                descriptor.Module = descriptor.Module.replace(/^ext:\/\//, '');
                var moduleName = descriptor.Module;
                
                descriptor.presence = function () {
                    return eval(moduleName);
                }
            } 

            var depName = descriptor.Module || descriptor.url;
            if (!depName) throw "Empty dependency name for Module=[" + thisNamespace + "]";
            
            descriptor.depName = depName;
            
            if (thisNamespace.meta.dependencies[depName] && thisNamespace.meta.dependencies[depName].version != descriptor.version) {
                throw "Repeated usage of " + depName + " with different version number for Module=[" + thisNamespace + "]";
            }
            
            //if there is no such dependency already
            if (!thisNamespace.meta.dependencies[depName]) {
                
                //descriptor of Module dependency
                if (descriptor.Module) {
                    
                    //non-Joose
                    if (descriptor.presence) {
                        descriptor.Module = Joose.Kernel.MetaClass.prepareVirtualNamespace(descriptor.Module);
                        if (!descriptor.Module.meta.presence) descriptor.Module.meta.presence = descriptor.presence;
                    } else {
                        //Joose
                        
                        //dependencies are always calculating from global namespace
                        descriptor.Module = Joose.Kernel.MetaClass.executeInNamespace(__global__, function(){
                            //turning string into Namespace instance, possible creating new namespace
                            return Joose.Kernel.MetaClass.prepareNamespace(descriptor.Module);
                        });
                    } 
                    
                    if (descriptor.transport) {
                        if (descriptor.Module.meta.hasOwnProperty('transport') && descriptor.Module.meta.transport != descriptor.transport) 
                            throw "Error: redeclaration of transport property for dependency " + descriptor.Module + " in Module=[" + thisNamespace + "]";
                            
                        descriptor.Module.meta.transport = descriptor.transport;
                    }
                } else {
                    //descriptor of url dependency
                    descriptor.Module = Joose.Kernel.MetaClass.prepareVirtualNamespace(descriptor.url);
                    descriptor.Module.meta.url = descriptor.url;
                    descriptor.Module.meta.transport = 'script';
                }

                //hung out browsers with slow js-engines on big dependency graphs (chrome and safari 3 are ok)  
                if (__JOOSE_DETECT_DEADLOCKS__ && descriptor.Module.meta.dependsFrom(thisNamespace)) throw "Cyclic reference detected between: [" + thisNamespace + "] and [" + descriptor.Module + "]";
            }
            
            if (!descriptor.Module.dependenciesGroup) descriptor.Module.dependenciesGroup = thisNamespace.meta.dependenciesGroup;
            
            return descriptor;
        },
        
        
        
        
        checkDependencies: function (){
            for (var i in this.dependencies) if (this.dependencies.hasOwnProperty(i)) return;
            
            if (this.BEGIN) {
                if (!this.beginStarted) {
                    this.beginStarted = true;
                    
                    var me = this;
                    
                    this.BEGIN.call(this.c, function(){
                        me.beginStarted = false;
                        delete me.BEGIN;
                        
                        me.fireReady();
                    });
                    
                }
            } else 
                this.fireReady();
        },
        
        
        fireReady: function(){
            this.ready = true;
            
            var listeners = this.readyListeners;
            this.readyListeners = [];
            
            Joose.A.each(listeners, function(listener){
                listener();
            });
        },
        
        
        getUrls: function () {
            if (this.url) return typeof this.url == 'function' ? this.url(): this.url;
            
            var urls = [];
            var className = this._name.split('.');
            
            Joose.A.each(__JOOSE_INC__, function (libroot) {
                urls.push(libroot.concat(className).join('/') + '.js' + (__JOOSE_DISABLE_CACHING__ ? '?disableCaching=true': '') );
            });
            
            
            return urls;
        },
      
        
        handleLoad: function() {
            var thisNamespace = this.c;
            
            try {
                if (this.loaded || typeof this.presence == 'function' && this.presence()) {
                    this.checkDependencies();
                    return;
                }
            } catch (e) { }
            
            
            if (this.loading) return;
            this.loading = true;
            
            var urls = this.getUrls();
            if (!(urls instanceof Array)) urls = [ urls ];
            
            var onready = function() {
                thisNamespace.meta.loaded = true;
                thisNamespace.meta.loading = false;
                thisNamespace.meta.checkDependencies();
            }
            
            var onerror = function(){
                //if no more urls
                if (!urls.length) throw "Module=[" + thisNamespace + "] not found";
                
                Joose.Kernel.MetaClass.transports[thisNamespace.meta.transport].call(thisNamespace.meta, urls.shift(), onready, onerror);
            }
            
            //to avoid cycled recursion in getNamespace()
            onerror.__JOOSE_MODULE__ = __global__;
            
            Joose.Kernel.MetaClass.transports[this.transport].call(this, urls.shift(), onready, onerror);
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