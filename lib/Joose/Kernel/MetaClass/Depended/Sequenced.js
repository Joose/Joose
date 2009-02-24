Joose.Kernel.ProtoRole.create('Joose.Kernel.MetaClass.Depended.Sequenced', {
    
    requires : [ 'prepareDependencies', 'finalizeDependencies' ],

    methods: {
        
        processDependencies : function (){
            Joose.O.eachSafe(this.dependencies, function(descriptor) {
                descriptor.Module.meta.handleLoad();
            });
        },
        
        
        handleLoad: function() {
            var thisNamespace = this.c;
            
            try {
                if (this.loaded || typeof this.presence == 'function' && this.presence()) {
                    this.finalizeDependencies();
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
                thisNamespace.meta.onLoad();
            }
            
            var onerror = function(){
                //if no more urls
                if (!urls.length) throw "Module=[" + thisNamespace + "] not found";
                
                thisNamespace.meta.load(urls.shift(), onready, onerror);
            }
            
            //to avoid cycled recursion in getNamespace()
//            onready.__JOOSE_MODULE__ = __global__;
            onerror.__JOOSE_MODULE__ = __global__;
            
            this.load(urls.shift(), onready, onerror);
        }
        
    }
});

Joose.Kernel.MetaClass.Depended.Sequenced.meta.applyToClass(Joose.Kernel.MetaClass);
Joose.Kernel.MetaClass.Depended.Sequenced.meta.applyToClass(Joose.Kernel.NamespaceKeeper);
Joose.Kernel.MetaClass.Depended.Sequenced.meta.applyToClass(Joose.Kernel.ProtoRole);