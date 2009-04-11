Joose.Kernel.MetaClass.create('Joose.Class', {
    isa: Joose.Kernel.MetaClass,
    
    has: {
        attributeMetaClass: { init: Joose.Attribute },
        methodMetaClass: { init: Joose.Method },
        classMethodMetaClass: { init: Joose.ClassMethod }
    }
    
    
//    isa: function (classObject) {
//        Joose.S.dieIfString(classObject);
//        
//        return this.c instanceof classObject;
//    }
//    /**
//     * Returns the name of the class
//     * @name className
//     * @function
//     * @memberof Joose.Class
//     */
//    /** @ignore */
//    className: function () { 
//        return this._name;
//    },
//    
//    
//    /**
//     * Returns the name of the class (alias to className())
//     * @name getName
//     * @function
//     * @memberof Joose.Class
//     */
//    /** @ignore */
//    getName: function () { 
//        return this.className();
//    },
//    getClassObject: function () {
//        return this.c;
//    },
    
//    getAttributes: function () {
//        return this.attributes
//    },
//    
//    
//    getAttribute: function (name) {
//        //native toString filtering
//        return this.attributes.hasOwnProperty(name) ? this.attributes[name]: undefined;
//    },
//    
//    
//    getMethodObject: function (name) {
//        //native toString filtering
//        return this.methods.hasOwnProperty(name) ? this.methods[name]: undefined;
//    },
//    
//    
//    getMethodNames: function() {
//        var res = [];
//        
//        Joose.O.eachSafe(this.methods, function (value, name){
//            res.push(name)
//        });
//        
//        return res;
//    },
//    
//    
//    getAttributeNames: function () {
//        var res = [];
//        
//        Joose.O.eachSafe(this.attributes, function (value, name){
//            res.push(name)
//        });
//        
//        return res;
//    },
//    
//    
//    
//    getSuperClasses:    function () {
//        return this.parentClasses;
//    },
//    
//
//    getSuperClass:    function () {
//        return this.parentClasses[0];
//    },
//    
//    
//    classNameToClassObject: function (className) {
//        var top    = joose.top;
//        var parts  = className.split(".");
//        var object = top;
//        for(var i = 0; i < parts.length; i++) {
//            var part = parts[i];
//            object   = object[part];
//            if(!object) {
//                throw "Unable to find class "+className
//            }
//        }
//        return object
//    }
    

//    classIsa: function (classObject) {
//        this.dieIfString(classObject);
//        
//        if (this.c == classObject) return true;
//        
//        for (var i = 0; i < this.parentClasses.length; i++) {
//            if (this.parentClasses[i].meta.classIsa(classObject)) return true;
//        }
//        
//        return false;
//    }, 
//    
//    
//    isa: function (classObject) {
//        this.dieIfString(classObject);
//        
//        return this.classIsa(classObject);
//    },
//    
//    
//    /**
//     * Returns a new instance of the class that this meta class instance is representing
//     * @function
//     * @name instantiate
//     * @memberof Joose.Class
//     */    
//    instantiate: function () {
//        // Ough! Calling a constructor with arbitrary arguments hack
//        var f = function () {};
//        f.prototype = this.c.prototype;
//        var obj = new f();
//        this.c.apply(obj, arguments);
//        return obj;
//    },

//    dispatch:        function (name) {
//        return this.getMethodObject(name).asFunction()
//    }



});
