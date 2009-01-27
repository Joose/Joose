var speciesMeta = new Joose.Kernel.Viviparity('Joose.Kernel.Species');


speciesMeta.addSuperClass(Joose.Kernel.Viviparity);

speciesMeta.addAttribute('classMethods', null);
speciesMeta.addAttribute('classMethodConstructor', Joose.Kernel.ProtoClassMethod);


speciesMeta.wrapMethod('initialize', 'after', function() {
    this.classMethods = {};
});

speciesMeta.wrapMethod('addSuperClass', 'after', function(classObject) {
    if (classObject.meta.meta.hasMethod('getClassMethodNames')) {
	    var names = classObject.meta.getClassMethodNames();
	    for(var i = 0; i < names.length; i++) {
            var method = classObject.meta.getClassMethodObject(names[i]).copy(this.classMethodConstructor);
            method.setIsFromSuperClass(true);
            this.addMethodObject(method)
	    } 
    }
});

//plus some new genes
speciesMeta.addGenes({
	
	hasMethod : function (name) { 
		return Boolean(this.methods[name]) || Boolean(this.classMethods[name]);
	},
	
	
	getClassMethodNames : function() {
		var res = [];
		
		for (var name in this.classMethods) res.push(name);
		
		return res;
	},
	
	
    //XXX? refactor protoAttribute to accept init as 2nd param to constructor
    addAttribute:     function (name, props) {
        var at = new this.attributeConstructor(name, props);
        
        this.addAttributeObject(at);
    },
    
    
    addClassMethod:         function (name, func) {
        var m = new this.classMethodConstructor(name, func);
        
        this.addMethodObject(m)
    },
    
    
    getClassMethodObject: function (name) {
        return this.classMethods[name]
    },
    
    
    getInstanceMethods: function () {
        var a = [];
        Joose.O.eachSafe(this.methods, function (m) {
            a.push(m)
        })
        return a
    },

    
    getClassMethods: function () {
        var a = [];
        Joose.O.eachSafe(this.classMethods, function (m) {
            a.push(m)
        })
        return a
    },
    
    
    can: function (methodName) {
        return Boolean(this.methods[methodName])
    },
    
    
    classCan: function (methodName) {
    	return Boolean(this.classMethods[methodName])
    }
    
	
});


Joose.Kernel.Species = speciesMeta.getClassObject();
