Joose.Kernel.ProtoRole.create('Joose.Kernel.MetaClass.Depended.NonCycled', {
    
    requires : [ 'addDescriptor' ],

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
    
    before : {
        addDescriptor: function (descriptor) {
            //if there is no such dependency already
            if (!this.dependencies[descriptor.depName]) {
   
                //hung out browsers with slow js-engines on big dependency graphs (chrome and safari 3 are ok)  
                if (descriptor.Module.meta.dependsFrom(this.c)) throw "Cyclic reference detected between: [" + this.c + "] and [" + descriptor.Module + "]";
            }
        }
    }
});