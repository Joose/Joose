// Could be refactored to a Joose.Class (by manually building the class)

/**
 * Assorted tools to build a class
 * 
 * The functions Class(), Module() and joosify() are global. All other methods
 * may be used inside Class definitons like this:
 * 
 * <pre>
 * Module("com.test.me", function () {
 *   Class("MyClass", {
 *     isa: SuperClass,
 *     methods: {
 *       hello: function () { alert('world') }
 *     }
 *   })
 * })
 * </pre>
 * @constructor
 */



Joose.Builder = function () {
    /** @ignore */
    this.globalize = function () {
        Joose.O.each(Joose.Builder.Globals, function (func, name) {
            var globalName = "Joose"+name
            if(typeof joose.top[name] == "undefined") {
                joose.top[name] = func
            }
            
            joose.top[globalName] = func
        });
    }
}

/** @ignore */
Joose.Builder.Globals = {
    /**
     * Global function that creates or extends a module
     * @function
     * @param name {string} Name of the module
     * @param functionThatCreatesClassesAndRoles {function} Pass a function reference that calls Class(...) as often as you want. The created classes will be put into the module
     * @name Module
     */    
    /** @ignore */
    Module: function (name, functionThatCreatesClassesAndRoles) {
        return Joose.Module.setup(name, functionThatCreatesClassesAndRoles)
    },
    
    Role: function (name, props) {
        if(!props.meta) {
            props.meta = Joose.Role;
        }
        return JooseClass(name, props)
    },
    
    Prototype: function (name, props) {
        if(!props.meta) {
            props.meta = Joose.Prototype;
        }
        return JooseClass(name, props);
    },
    
    /**
     * Global function that creates a class (If the class already exists it will be extended)
     * @function
     * @param name {string} Name of the the class
     * @param props {object} Declaration if the class. The object keys are used as builder methods. The values are passed as arguments to the builder methods.
     * @name Class
     */    
    /** @ignore */
    Class:    function (name, props) {
        return Joose.Class.create(name, props);
    },
    
    Type: function (name, props) {
        var isAnon = false
        if(arguments.length == 1 && name instanceof Object) {
            props  = name;
            isAnon = true;
        }
        
        if(props instanceof RegExp || props instanceof Function) {
            props = {
                where: props
            }
        }
        
        if(isAnon) {
            name   = "AnonType: "+(props.where ? props.where.toString() : "");
        }
        
        var t = Joose.TypeConstraint.newFromTypeBuilder(name, props);
        
        if(!isAnon) {
            var m = joose.currentModule
        
            if(!m) {
                JooseModule("Joose.Type");
                if(typeof joose.top.TYPE == "undefined") {
                    joose.top.TYPE = Joose.Type;
                }
                m = Joose.Type.meta;
            }
        
            m.addElement(t)
            m.getContainer()[name] = t;
        }
        return t
    },
    
    /**
     * Global function to turn a regular JavaScript constructor into a Joose.Class
     * @function
     * @param name {string} Name of the class
     * @param props {function} The constructor
     * @name joosify
     */    
    /** @ignore */
    joosify: function (standardClassName, standardClassObject) {
        var meta = new Joose.Class(standardClassName, standardClassObject);
        
        Joose.O.eachSafe(standardClassObject.prototype, function (value, name) {
            if (name == "meta" || name == "constructor") {
                return
            }
            if(typeof(value) == "function") {
                meta.addMethod(name, value)
            } else {
                var props = {};
                if(typeof(value) != "undefined") {
                    props.init = value
                }
                meta.addAttribute(name, props)
            }
        })
        
        return meta.getClassObject();
    },
    
    /** @ignore */
    rw: "rw",
    /** @ignore */
    ro: "ro"
};

joose.init();
