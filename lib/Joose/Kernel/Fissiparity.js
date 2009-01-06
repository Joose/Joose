//fissiparity - meta, parent and the class itself are the same things, manipulations via any of them are equal
//the only difference is that Joose.Kernel.Fissiparity.meta != Joose.Kernel.Fissiparity.constructor.meta  
Joose.Kernel.Fissiparity = new Joose.Kernel.Gene(Joose.Kernel.Gene);
Joose.Kernel.Fissiparity.meta = Joose.Kernel.Fissiparity;


Joose.Kernel.Fissiparity.meta.addAttribute('_name', 'Joose.Kernel.Fissiparity');
Joose.Kernel.Fissiparity.meta.addMethod('className', function () { return this._name } );
Joose.Kernel.Fissiparity.meta.addMethod('getName', function () { return this.className() } );
Joose.Kernel.Fissiparity.meta.addMethod('toString', function () {
    if(this.meta) {
        return "a "+this.meta.className();
    }
    return "NoMeta"
});
Joose.Kernel.Fissiparity.meta.addMethod('hasMethod', function (name) { return Boolean(this.methods[name]) } );
Joose.Kernel.Fissiparity.meta.addMethod('hasAttribute', function (name) { return Boolean(this.attributes[name]) } );


Joose.Kernel.Fissiparity.meta.addMethod('defaultClassFunctionBody', function () {
    var f = function () {
        this.initialize.apply(this, arguments);
    };
    joose.addToString(f, function () {
        return this.meta.className()
    })
    return f;
});



Joose.Kernel.Fissiparity.meta.addMethod('addToString', function () {
    this.addMethod("toString", function () {
        if(this.stringify) {
            return this.stringify()
        }
        return "a "+ this.meta.className()
    })
});


//Joose.Kernel.Fissiparity learned how to parturiate a separate species - but its parent and meta classes still will be the same thing
//
//createClass:    function (name, optionalConstructor, optionalModuleObject) {
Joose.Kernel.Fissiparity.meta.addMethod('parturiate', function (name, baby, optionalModuleObject) { 
    
    baby = baby || this.defaultClassFunctionBody();
    joose.addToString(baby, function () {
        return this.meta.className()
    });
    
        
    //XXX namespace-module
//    if(optionalModuleObject) {
//        optionalModuleObject.addElement(baby)
//    }
    
    baby.prototype.constructor = baby;
    
    //baby receives all genes (attrs and methods) of "mother" (mother is "this", and mother's genes are "this.constructor") via Gene's "initialize" method
    //here this.constructor == Joose.Kernel.Gene
    baby.prototype.meta = new this.constructor(baby);
    baby.meta = baby.prototype.meta;
    
    
    //XXX namespace-module
    if(name == null) {
        baby.meta._name = "__anonymous__" 
    } else {
        var className = name;
        if(optionalModuleObject) {
            className = optionalModuleObject.getName() + "." + name
        }
        baby.meta._name = className;
    }
    
    //XXX namespace-module
    // store them in the global object if they have no namespace
    // They will end up in the Module __JOOSE_GLOBAL__
//    if(!optionalModuleObject) {
//        // Because the class Joose.Module might not exist yet, we use this temp store
//        // that will later be in the global module
//        joose.globalObjects.push(c)
//    }
    
//    meta.addInitializer();
	baby.meta.addToString();
//    meta.addDetacher();
    
    return baby;
});

