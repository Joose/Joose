__global__.addProperty('Class', function(name, props){
    var metaClass;
    
    if (props && props.meta) {
        metaClass = props.meta
        delete props.meta
    } else if (props && props.isa)
        metaClass = props.isa.meta.constructor
    else
        metaClass   = Joose.Meta.Class;
    
    return Joose.Namespace.Manager.my.create(name, metaClass, props, Joose.Namespace.Manager.my.getCurrent()); 
});


__global__.addProperty('Role', function(name, props){
    var metaClass;
    
    if (props && props.meta) {
        metaClass = props.meta
        delete props.meta
    }	
	
    return Joose.Namespace.Manager.my.create(name, metaClass || Joose.Meta.Role, props, Joose.Namespace.Manager.my.getCurrent()); 
});


__global__.addProperty('Module', function(name, props){
	if (typeof props == 'function') props = { body : props };
	
    return Joose.Namespace.Manager.my.create(name, Joose.Namespace.Keeper, props, Joose.Namespace.Manager.my.getCurrent()); 
});


//Joose.Builder = function () {
//    /** @ignore */
//    this.globalize = function () {
//        Joose.O.each(Joose.Builder.Globals, function (func, name) {
//            var globalName = "Joose"+name
//            if(typeof joose.top[name] == "undefined") {
//                joose.top[name] = func
//            }
//            
//            joose.top[globalName] = func
//        });
//    }
//}
//
///** @ignore */
//Joose.Builder.Globals = {
//    /**
//     * Global function that creates or extends a module
//     * @function
//     * @param name {string} Name of the module
//     * @param functionThatCreatesClassesAndRoles {function} Pass a function reference that calls Class(...) as often as you want. The created classes will be put into the module
//     * @name Module
//     */    
//    /** @ignore */
//    Module: function (name, props) {
//        if (typeof props == 'function') props = { body: props }
//        
//        return Joose.Kernel.ProtoModule.create(name, props)
//    },
//    
//    Role: function (name, props) {
//        if(!props.meta) {
//            props.meta = Joose.Role;
//        }
//        return JooseClass(name, props)
//    },
//    
//    Prototype: function (name, props) {
//        if(!props.meta) {
//            props.meta = Joose.Prototype;
//        }
//        return JooseClass(name, props);
//    },
//    
//    /**
//     * Global function that creates a class (If the class already exists it will be extended)
//     * @function
//     * @param name {string} Name of the the class
//     * @param props {object} Declaration if the class. The object keys are used as builder methods. The values are passed as arguments to the builder methods.
//     * @name Class
//     */    
//    /** @ignore */
//    Class:    function (name, props) {
//        var metaClass;
//        
//        /* Use the custom meta class if provided */
//        if(props && props.meta) {
//            metaClass = props.meta
//            delete props.meta
//        } 
//        
//        /* Otherwise use the meta class of the parent class (If there is one)
//         * If the parent class is Joose.Class, we don't change the meta class but use the default
//         * because that Joose.Class's meta class is only needed for bootstrapping
//         * purposes. */
//        else if(props && props.isa && props.isa != Joose.Class) {
//            metaClass = props.isa.meta.constructor
//        } else {
//            /* Default meta class is Joose.Class */
//            metaClass   = Joose.Class;
//        }    
//            
//        if (!metaClass.meta.classCan('create')) throw "MetaClass [" + metaClass + "] can't be used with Class builder (have no class method 'create')";
//        
//        return metaClass.create(name, props);
//    },
//    
//    Type: function (name, props) {
//        if (typeof Joose.Type == 'undefined') {
//            JooseModule("Joose.Type");
//        }
//        if(typeof joose.top.TYPE == "undefined") {
//            joose.top.TYPE = Joose.Type;
//        }
//
//        var isAnon = false
//        if(arguments.length == 1 && name instanceof Object) {
//            props  = name;
//            isAnon = true;
//        }
//        
//        if(props instanceof RegExp || props instanceof Function) {
//            props = {
//                where: props
//            }
//        }
//        
//        if(isAnon) {
//            name   = "AnonType: "+(props.where ? props.where.toString(): "");
//        }
//        
//        var ns = Joose.Kernel.ProtoModule.getCurrentNamespace();
//        if ( ns == __global__) ns = Joose.Type;
//
//        return Joose.Kernel.ProtoModule.executeInNamespace(ns, Joose.TypeConstraint.create, Joose.TypeConstraint, [name, props]);
//    },
//    
//    /**
//     * Global function to turn a regular JavaScript constructor into a Joose.Class
//     * @function
//     * @param name {string} Name of the class
//     * @param props {function} The constructor
//     * @name joosify
//     */    
//    /** @ignore */
//    joosify: function (standardClassName, standardClassObject) {
//        var meta = new Joose.Class(standardClassName, standardClassObject);
//        
//        Joose.O.eachSafe(standardClassObject.prototype, function (value, name) {
//            if (name == "meta" || name == "constructor") {
//                return
//            }
//            if(typeof(value) == "function") {
//                meta.addMethod(name, value)
//            } else {
//                var props = {};
//                if(typeof(value) != "undefined") {
//                    props.init = value
//                }
//                meta.addAttribute(name, props)
//            }
//        })
//        
//        return meta.getClassObject();
//    },
//    
//    /** @ignore */
//    rw: "rw",
//    /** @ignore */
//    ro: "ro"
//};
//
//joose.init();
