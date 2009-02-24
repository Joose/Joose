var classMethodsMeta = new Joose.Kernel.Inheritance('Joose.Kernel.ClassMethods');


classMethodsMeta.addSuperClass(Joose.Kernel.Inheritance);

classMethodsMeta.addAttribute('classMethods', null);
classMethodsMeta.addAttribute('classMethodMetaClass', Joose.Kernel.ProtoClassMethod);


classMethodsMeta.wrapMethod('initialize', 'after', function() {
    this.classMethods = {};
});

classMethodsMeta.wrapMethod('addSuperClass', 'after', function(classObject) {
    if (classObject.meta.meta.hasMethod('getClassMethodNames')) {
        var names = classObject.meta.getClassMethodNames();
        for(var i = 0; i < names.length; i++) {
            var method = classObject.meta.getClassMethodObject(names[i]).copy(this.classMethodMetaClass);
            method.setIsFromSuperClass(true);
            this.addMethodObject(method)
        } 
    }
});

//plus some new genes
classMethodsMeta.extend({
    
    hasMethod: function (name) {
        return this.methods.hasOwnProperty(name) || this.classMethods.hasOwnProperty(name);
        //return Boolean(this.methods[name]) || Boolean(this.classMethods[name]);
    },
    
    
    getClassMethodNames: function() {
        var res = [];
        
        Joose.O.eachSafe(this.classMethods, function (value, name){
            res.push(name)
        });
        
        return res;
    },
    
    
    //XXX? refactor protoAttribute to accept init as 2nd param to constructor
    addAttribute:     function (name, props) {
        var at = new ((props && props.metaclass) || this.attributeMetaClass)(name, props);
        
        this.addAttributeObject(at);
    },
    
    
    addClassMethod:         function (name, func) {
        var m = new this.classMethodMetaClass(name, func);
        
        this.addMethodObject(m)
    },
    
    
    getClassMethodObject: function (name) {
        return this.classMethods.hasOwnProperty(name) ? this.classMethods[name]: undefined;
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
    
    
    /**
     * Returns true if the class implements the method 
     * @function
     * @name can
     * @param {string} methodName The method
     * @memberof Joose.Class
     */    
    can: function (methodName) {
        return this.methods.hasOwnProperty(methodName)
    },
    
    
    classCan: function (methodName) {
        return this.classMethods.hasOwnProperty(methodName)
    }
    
    
});


Joose.Kernel.ClassMethods = classMethodsMeta.getClassObject();
