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
                
                Joose.Kernel.MetaClass.executeInNamespace(__global__, function (){
                    this.load(urls.shift(), onready, onerror);
                }, thisNamespace.meta);
            }
            
            //inside load function will be declared new module/class
            //new classes are always declaring in the global namespace
            Joose.Kernel.MetaClass.executeInNamespace(__global__, function (){
                this.load(urls.shift(), onready, onerror);
            }, this);
            
        }
        
    }
});

Joose.Kernel.MetaClass.Depended.Sequenced.meta.applyToClass(Joose.Kernel.MetaClass);
Joose.Kernel.MetaClass.Depended.Sequenced.meta.applyToClass(Joose.Kernel.NamespaceKeeper);
Joose.Kernel.MetaClass.Depended.Sequenced.meta.applyToClass(Joose.Kernel.ProtoRole);