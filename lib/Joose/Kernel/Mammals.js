var mammalsMeta = new Joose.Kernel.Reptiles('Joose.Kernel.Mammals');

mammalsMeta.addSuperClass(Joose.Kernel.Reptiles);

//mammalsMeta.wrapMethod('initialize', 'after', function(name, props) {
//        var c = null;
//        
//        if(name) {
//            var className  = name;
//            if(joose.currentModule) {
//                className  = joose.currentModule.getName() + "." + name
//            }
//            var root       = joose.top;
//            var parts      = className.split(".")
//        
//            for(var i = 0; i < parts.length; i++) {
//                root = root[parts[i]]
//            }
//            c = root;
//        }
//
//        if(c == null) {
//            
//            var metaClass;
//            
//            /* Use the custom meta class if provided */
//            if(props && props.meta) {
//                metaClass = props.meta
//                delete props.meta
//            }
////            /* Otherwise use the meta class of the parent class (If there is one)
////             * If the parent class is Joose.Class, we don't change the meta class but use the default
////             * because that Joose.Class's meta class is only needed for bootstrapping
////             * purposes. */
////            else if(props && props.isa && props.isa != Joose.Class) {
////                metaClass = props.isa.meta.builder
////                //alert(name + metaClass + props.isa.meta)
////            }
//            /* Default meta class is this class itself */
//            else {
//                metaClass   = this.constructor;//or this.meta.nextGeneration
//            }    
//            
//            var aClass      = new metaClass();
//            
//            aClass.builder  = metaClass;
//
//            var c           = aClass.createClass(name, null, joose.currentModule)
//            
//            c.meta.builder  = metaClass
//            
//            var className   = c.meta.className()
//            
//            if(name && className) {
//                var root = joose.top;
//                var n = new String(className);
//                var parts = n.split(".");
//                for(var i = 0; i < parts.length - 1; i++) {
//                    if(root[parts[i]] == null) {
//                        root[parts[i]] = {};
//                    }
//                    root = root[parts[i]];
//                }
//                root[parts[parts.length - 1]] = c
//            }
//            
//        }
//        
//        c.meta.initializeFromProps(props)
//	
//});



//plus some new genes
mammalsMeta.addGenes({
	
	
	isAbstract : false,

	
    buildComplete: function () {
        // may be overriden in sublass
    },
    
    // intializes a class from the class definitions
    initializeFromProps: function (props) {
        this._initializeFromProps(props)
    },
    
    _initializeFromProps: function (props) {
        var me = this;
        if(props) {
            
            if(joose.top.CHAOTIC_TRAVERSION_ORDER) {
                Joose.A.each(["isa", "does", "has", "method", "methods"], function (name) {
                    if(name in props) {
                        var value = props[name];
                        me._initializeFromProp(name, value, props)
                        delete props[name]
                    }
                })
            }
            
            // For each property of the class constructor call the builder
            Joose.O.eachSafe(props, function (value, name) {
                me._initializeFromProp(name, value, props)
            })
            
            for(var i = 0; i < this.roles.length; i++) {
                var role = this.roles[i];
                role.meta.applyMethodModifiers(this.c)
            }
            
            me.buildComplete();     
            me.validateClass();
        }
    },
    
    _initializeFromProp: function (propName, value, props) {
        var paras             = value;
        var customBuilderName = "handleProp"+propName;
        // if the meta class of the current class implements handleProp+nameOfBuilder we use that
        if(this.meta.can(customBuilderName)) {
            this[customBuilderName](paras, props)
        } else { // Otherwise use a builder from this file
            throw new Error("Called invalid builder "+propName+" while creating class "+this.className())
        }
    },
	
	
//    addToString: function () {
//        this.addMethod("toString", function () {
//            if(this.stringify) {
//                return this.stringify()
//            }
//            return "a "+ this.meta.className()
//        })
//    },
//
//    
//    addInitializer: function () {
//        if(!this.c.prototype.initialize) {
//            this.addMethod("initialize", this.initializer())
//        }
//    },
//    
//    
//    initializer: function () {
//        return function initialize (paras) {
//            var me = this;
//            if(this.meta.isAbstract) {
//                var name = this.meta.className();
//                throw ""+name+" is an abstract class and may not instantiated."
//            }
//            var attributes = this.meta.getAttributes();
//            for(var i in attributes) {
//                if(attributes.hasOwnProperty(i)) {
//                    var attr = attributes[i];
//                    attr.doInitialization(me, paras);
//                }
//            }
//        }
//    },
    
	
	
    handlePropisAbstract: function (bool) {
        this.isAbstract = bool
    },
    
    
    handlePropisa:    function (classObject) {
        if(classObject == null) {
            throw new Error("Super class is null")
        }
        this.addSuperClass(classObject)
    },
    
    
    handlePropdoes:    function (role) {
        var me = this;
        if(role instanceof Array) {
            Joose.A.each(role, function (aRole) {
                me.addRole(aRole)
            })
        } else {
            me.addRole(role)
        }
        
    },
    
    
    handleProphas:    function (map) {
        var me = this;
        if(typeof map == "string") {
            var name  = arguments[0];
            var props = arguments[1];
            me.addAttribute(name, props)
        } else { // name is a map
            Joose.O.eachSafe(map, function (props, name) {
                me.addAttribute(name, props)
            })
        }
    },

    
    handlePropmethod: function (name, func, props) {
        this.addMethod(name, func, props)
    },
    
    
    handlePropmethods: function (map) {
        var me = this
        Joose.O.eachSafe(map, function (func, name) {
            me.addMethod(name, func)
        })
    },
    
    
    handlePropclassMethods: function (map) {
        var me = this;
        Joose.O.eachSafe(map, function (func, name2) {
            me.addMethodObject(new Joose.ClassMethod(name2, func))
        })
    },
    
    
    handlePropbefore: function(map) {
        var me = this
        Joose.O.eachSafe(map, function (func, name) {
            me.wrapMethod(name, "before", func);
        }) 
    },
    
    
    handlePropafter: function(map) {
        var me = this
        Joose.O.eachSafe(map, function (func, name) {
            me.wrapMethod(name, "after", func);
        }) 
    },
    

    handleProparound: function(map) {
        var me = this
        Joose.O.eachSafe(map, function (func, name) {
            me.wrapMethod(name, "around", func);
        }) 
    },
    

    handlePropoverride: function(map) {
        var me = this
        Joose.O.eachSafe(map, function (func, name) {
            me.wrapMethod(name, "override", func);
        }) 
    },
    
    
    handlePropaugment: function(map) {
        var me = this
        Joose.O.eachSafe(map, function (func, name) {
            me.wrapMethod(name, "augment", func, function () {
                me.addMethod(name, func)
            });
        })
    }
    
    
});


Joose.Kernel.Mammals = mammalsMeta.getClassObject();
