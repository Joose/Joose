Joose.Kernel.ProtoRole.create('Joose.Kernel.MetaClass.Depended.NonCycled', {
    
    requires : [ 'prepareDependencyDescriptor' ],

    methods: {
        dependsFrom: function (module) {
            //quick scan
            for (var name in this.dependencies)
                if (this.dependencies.hasOwnProperty(name)) {
                    if (this.dependencies[name].Module == module) return true    
                }
                
            //in-depth scan                
            for (name in this.dependencies)
                if (this.dependencies.hasOwnProperty(name)) {
                    if (this.dependencies[name].Module.meta.dependsFrom(module)) return true    
                }
            
            return false;
        }
    },
    
    after : {
        prepareDependencyDescriptor: function (thisNamespace, descriptor) {
            //if there is no such dependency already
            if (!thisNamespace.meta.dependencies[depName]) {
   
                //hung out browsers with slow js-engines on big dependency graphs (chrome and safari 3 are ok)  
                if (descriptor.Module.meta.dependsFrom(thisNamespace)) throw "Cyclic reference detected between: [" + thisNamespace + "] and [" + descriptor.Module + "]";
            }
        }
    }
});