Joose.Kernel.ProtoRole.create('Joose.Kernel.MetaClass.Depended.Sequenced', {
    
    requires : [ 'prepareDependencies', 'finalizeDependencies' ],

    methods: {
        
        processDependencies : function (){
            Joose.O.eachSafe(this.dependencies, function(descriptor) {
                descriptor.Module.meta.handleLoad();
            });
        }
        
    }
});

Joose.Kernel.MetaClass.Depended.Sequenced.apply(Joose.Kernel.MetaClass);
Joose.Kernel.MetaClass.Depended.Sequenced.apply(Joose.Kernel.NamespaceKeeper);
Joose.Kernel.MetaClass.Depended.Sequenced.apply(Joose.Kernel.ProtoRole);