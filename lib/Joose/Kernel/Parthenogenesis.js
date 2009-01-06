//Parthenogenesis is intermediate propagation model, like reptiles propagation via eggs, before mammals viviparity
//Parthenogenesis have a goal to separate meta and parent classes
//Parthenogenesis have genes of Fissiparity and still accept nextGeneration as 1st parameter for constructor
 
Joose.Kernel.Parthenogenesis = Joose.Kernel.Fissiparity.parturiate(function(nextGeneration) {
    //this is the actual separation - see below for overriden initialize method
    this.initialize.apply(this, arguments);
    
    //Parthenogenesis needs to introspect itself so it uses an ancient "initialize" method from previuos propagation model
    //this is a "proto" analog for calling parent's constructor
    this.meta.initialize.apply(this, arguments);
});



//plus some new genes
Joose.Kernel.Parthenogenesis.meta.addAttribute('parentClasses', null);
Joose.Kernel.Parthenogenesis.meta.addMethod('initialize', function(){
	this.parentClasses 	= [];
    this.attributes     = {},
    this.methods        = {};
});


Joose.Kernel.Parthenogenesis.meta.addMethod('dieIfString', function (thing) {
    if(Joose.S.isString(thing)) {
        throw new TypeError("Parameter must not be a string.")
    }
});


Joose.Kernel.Parthenogenesis.meta.addMethod('addSuperClass', function (classObject) {
    this.dieIfString(classObject);
    var me    = this;
    
    // Methods
    var names = classObject.meta.getMethodNames();
    for(var i = 0; i < names.length; i++) {
        var name = names[i]
        
        var m = classObject.meta.getMethodObject(name)
        if(m) {
            var method = m.copy();
            method.setIsFromSuperClass(true);
            me.addMethodObject(method)
        }
        m = classObject.meta.getClassMethodObject(name)
        if(m) {
            var method = m.copy();
            method.setIsFromSuperClass(true);
            me.addMethodObject(method)
        }
    } 
    
    // Attributes
    Joose.O.eachSafe(classObject.meta.attributes, function (attr, name) {
        me.addAttribute(name, attr.getProps())
    })
    
//    // Roles
//    var roles = classObject.meta.roles
//    for(var i = 0; i < roles.length; i++) {
//        var role = roles[i]
//        me.roles.push(role)
//    }
    
    this.parentClasses.unshift(classObject)
});




//finally, meta and parent class are separated