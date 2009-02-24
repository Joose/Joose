Joose.Kernel.ProtoRole.create('Joose.Kernel.MetaClass.Depended', {
    
    requires : [ 'initializeFromProps', 'handlePropbody' ],
    
    has: {
        version: {},
        
        url: {},
        
        loading: { init: false },
        loaded: { init: false },
        ready: { init: false },
        
        readyListeners: {},
        
        
        BEGIN: {},
        beginStarted: { init: false },
        
        //object with dependency descriptors
        dependencies: {}
    },
    
    after: {
        initialize: function (name, c) {
            this.dependencies = {};
            this.readyListeners = [];
        }
    },
    
    
    classMethods : {
        
        use: function (dependenciesInfo, callback, scope) {
            var anonymousNamespace = new Joose.Kernel.MetaClass().getClassObject();
            anonymousNamespace.meta.initializeFromProps({
                use: dependenciesInfo,
                body: function (){
                    callback.call(scope || this);
                }
            });
        },
        
        
        prepareVirtualNamespace: function (name) {
            if (__JOOSE_VIRTUAL_NAMESPACES__[name]) return __JOOSE_VIRTUAL_NAMESPACES__[name];
            
            return ( __JOOSE_VIRTUAL_NAMESPACES__[name] = new Joose.Kernel.MetaClass(name).getClassObject() );
        }
        
    },
    
    
    override: {
        
        initializeFromProps: function(props) {
            props = props || {};
            
            var thisNamespace = this.c;
            
            //if we are initializing from props, then we consider that we are loaded
            this.loaded = true;
            this.loading = false;

            this._initializeFromProp('BEGIN', props.BEGIN, props)
            delete props.BEGIN;
            
            var body = props.body;
            delete props.body;

            if (props.use) {
                var depInfo = props.use;
                delete props.use;
                
                //unshift is critical for correct order of readyListerens processing
                //initialization delaying until module will become ready 
                thisNamespace.meta.readyListeners.unshift(function(){
                    thisNamespace.meta.initializeFromProps(props)
                    
                    thisNamespace.meta._initializeFromProp('body', body, props)
                });
                
                thisNamespace.meta._initializeFromProp('use', depInfo, props)
            } else {
                this.SUPER(props);
                
                this._initializeFromProp('body', body, props)
                
                this.finalizeDependencies();
            }
        }
    },
    
    
    methods: {
        
        //BEGIN executes right after the all dependencies are loaded, but before this module becomes ready (before body())
        //this allows to manually control the "ready-ness" of module (custom pre-processing)
        //BEGIN receives the function (callback), which should be called at the end of custom processing 
        handlePropBEGIN: function (begin, props) {
            if (begin) {
                if (this.BEGIN) throw "Double declaration of BEGIN property for module=[" + this.c + "]"
                
                this.BEGIN = begin;
            }
        },
        
        
        handlePropversion: function (version) {
            this.version = version;
        },
        
        
        //this function prepares the dependency descriptor (which can be a raw string also)
        //it turns the descritor.Module string to the "namespace body" with meta, which is Joose.Kernel.MetaClass
        prepareDependencyDescriptor: function (thisNamespace, desc) {
            var descriptor = desc;
            
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
                    
                } else {
                    //descriptor of url dependency
                    descriptor.Module = Joose.Kernel.MetaClass.prepareVirtualNamespace(descriptor.url);
                    descriptor.Module.meta.url = descriptor.url;
                    Joose.Kernel.MetaClass.Depended.Transport.ScriptTag.meta.apply(descriptor.Module.meta);
                }
            }
            
            return descriptor;
        },
        
        
        handlePropuse: function (dependenciesInfo, props) {
            //we are scoping this method call not to usual "this", but to "this namespace"
            //this is related to the fact, that during loading, the Module can be promoted to the Class, and the instance of meta 
            //will change, but the class function itself will remain untouched
            //this is also used in others places in the code
            var thisNamespace = this.c;
            
            thisNamespace.meta.prepareDependencies(dependenciesInfo);
            thisNamespace.meta.processDependencies();
            thisNamespace.meta.finalizeDependencies();
        },
        
        
        prepareDependencies : function (depInfo){
            var thisNamespace = this.c;
            var dependenciesInfo = depInfo;
            
            if (!(dependenciesInfo instanceof Array)) dependenciesInfo = [ dependenciesInfo ];
            
            Joose.A.each(dependenciesInfo, function(descriptor) {
                
                descriptor = thisNamespace.meta.prepareDependencyDescriptor(thisNamespace, descriptor);
                
                var depName = descriptor.depName;
                
                if (!thisNamespace.meta.dependencies[depName]) {
                    
                    var dependedModule = descriptor.Module;
                    
                    //if the descriptor is not ready (even if its already loaded) - we need to monitor it
                    if (!dependedModule.meta.ready) {
                    
                        //pushing listener to the end(!) of the list
                        dependedModule.meta.readyListeners.push(function(){
                            
                            if (descriptor.version) {
                                if (!dependedModule.meta.version) throw "Loaded descriptor " + dependedModule + " has no specified version. Required version is: " + descriptor.version;
                                
                                if (dependedModule.meta.version < descriptor.version) 
                                    throw "Loaded descriptor " + dependedModule + " has lower version [" + dependedModule.meta.version + "] than required [" + descriptor.version + "]";
                            }
                            
                            delete thisNamespace.meta.dependencies[depName];
                            thisNamespace.meta.finalizeDependencies();
                        });
                        
                        //adding dependency
                        thisNamespace.meta.dependencies[depName] = descriptor;
                        
                        //not ready, since there are depedencies to load                
                        thisNamespace.meta.ready = false;

                    }
                }
            })
        },
        
        
        processDependencies : function (){
            throw "You need to include one of the processing Roles in your deployment";
        },
        
        
        finalizeDependencies : function(){
            this.checkDependencies();
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
            if (this.url) return typeof this.url == 'function' ? this.url() : this.url;
            
            var urls = [];
            var className = this._name.split('.');
            
            Joose.A.each(__JOOSE_INC__, function (libroot) {
                urls.push(libroot.concat(className).join('/') + '.js' + (__JOOSE_DISABLE_CACHING__ ? '?disableCaching=true': '') );
            });
            
            
            return urls;
        },
        
        
        onLoad : function(){
            this.finalizeDependencies();
        },
        
        
        handleLoad : function(){
            throw "You need to include one of the processing Roles in your deployment";
        },
        
        load : function(){
            throw "You need to apply one of the Transporting Roles";
        }
        
    }
});


use = function(){
    Joose.Kernel.MetaClass.use.apply(Joose.Kernel.MetaClass, arguments);
}

//XXX should be better place to keep this info (class attributes?)
__JOOSE_INC__ = [ ['../localLib/root1'], ['../localLib/root2'] ];
__JOOSE_DISABLE_CACHING__ = true;
__JOOSE_VIRTUAL_NAMESPACES__ = {};
__JOOSE_LIBRARIAN_ENABLED__ = false;

Joose.Kernel.MetaClass.Depended.meta.applyToClass(Joose.Kernel.MetaClass);
Joose.Kernel.MetaClass.Depended.meta.applyToClass(Joose.Kernel.NamespaceKeeper);
Joose.Kernel.MetaClass.Depended.meta.applyToClass(Joose.Kernel.ProtoRole);