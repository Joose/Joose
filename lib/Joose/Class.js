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
    
});
