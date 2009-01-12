var speciesMeta = new Joose.Kernel.Viviparity('Joose.Kernel.Species');


speciesMeta.addSuperClass(Joose.Kernel.Viviparity);
speciesMeta.addAttribute('classMethods', {});
speciesMeta.addAttribute('classMethodConstructor', Joose.Kernel.ProtoClassMethod);


//speciesMeta.wrapMethod('initialize', 'after', function() {
//    this.classMethods = {};
//});


//plus some new genes
speciesMeta.addGenes({
	
    //XXX refactor protoAttribute to accept init as 2nd param to constructor
    addAttribute:     function (name, props) {
        var at = new this.attributeConstructor(name, props);
        
        this.addAttributeObject(at);
    },
    
    
    addClassMethod:         function (name, func) {
        var m = new this.classMethodConstructor(name, func);
        
        this.addMethodObject(m)
    },
    
    
    getClassMethodObject: function (name) {
        return this.getMethodObject(name).isa(this.classMethodConstructor) ? this.getMethodObject(name) : undefined;
    },
    
    
    getInstanceMethods: function () {
        var a = [];
        Joose.O.eachSafe(this.methods, function (m) {
            if (m.isa(this.methodConstructor)) a.push(m)
        })
        return a
    },

    
    getClassMethods: function () {
        var a = [];
        Joose.O.eachSafe(this.methods, function (m) {
            if (m.isa(this.classMethodConstructor)) a.push(m)
        })
        return a
    },
    
    
    can: function (methodName) {
        return this.methods[methodName] && this.methods[methodName].isa(this.methodConstructor) && !this.methods[methodName].isa(this.classMethodConstructor);
    },
    
    
    classCan: function (methodName) {
    	return this.methods[methodName] && this.methods[methodName].isa(this.classMethodConstructor);
    }
    
	
});


Joose.Kernel.Species = speciesMeta.getClassObject();
