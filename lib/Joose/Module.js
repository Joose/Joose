//
///*
//Module("my.namespace", function () {
//    Class("Test", {
//        
//    })
//})
//*/
//(function (Class) {
//
//Class("Joose.Module", {
//    has: {
//        _name: {
//            is: "rw"
//        },
//        _elements: {
//            is: "rw"
//        },
//        _container: {
//            is: "rw"
//        }
//    },
//    classMethods: {
//        setup: function (name, functionThatCreatesClassesAndRoles) {
//            var me      = this;
//            var parts   = name.split(".");
//            var object  = joose.top;
//            var soFar   = []
//            var module;
//            for(var i = 0; i < parts.length; i++) {
//                var part = parts[i];
//                if(part == "meta") {
//                    throw "Module names may not include a part called 'meta'."
//                }
//                var cur = object[part];
//                soFar.push(part)
//                var name = soFar.join(".")
//                if(typeof cur == "undefined") {
//                    object[part]      = {};
//                    module            = new Joose.Module(name)
//                    module.setContainer(object[part])
//                    object[part].meta = module
//                    Joose.Module._allModules.push(object[part])
//                    
//                } else {
//                    module = cur.meta;
//                    if(!(module && module.meta && (module.meta.isa(Joose.Module)))) {
//                        throw "Trying to setup module "+name+" failed. There is already something else: "+module
//                    }
//                }
//                object = object[part]
//            }
//            var before = joose.currentModule
//            joose.currentModule = module
//            if(functionThatCreatesClassesAndRoles) {
//                functionThatCreatesClassesAndRoles(object);
//            }
//            joose.currentModule = before;
//            return object
//        },
//        
//        getAllModules: function () {
//            return this._allModules
//        }
//    },
//    methods: {
//        alias: function (destination) {
//            var me = this;
//            
//            if(arguments.length == 0) {
//                return this
//            }
//
//            Joose.A.each(this.getElements(), function (thing) {
//                var global        = me.globalName(thing.meta.className());
//                
//                if(destination[global] === thing) { // already there
//                    return
//                }
//                if(typeof destination[global] != "undefined") {
//                    throw "There is already something else in the spot "+global
//                }
//                
//                destination[global] = thing;
//            })
//        },
//        
//        globalName: function (name) {
//            var moduleName = this.getName();
//            if(name.indexOf(moduleName) != 0) {
//                throw "All things inside me should have a name that starts with "+moduleName+". Name is "+name
//            }
//            var rest = name.substr(moduleName.length + 1); // + 1 to remove the trailing dot
//            if(rest.indexOf(".") != -1) {
//                throw "The things inside me should have no more dots in there name. Name is "+rest
//            }
//            return rest
//        },
//        
//        removeGlobalSymbols: function () {
//            Joose.A.each(this.getElements(), function (thing) {
//                var global = this.globalName(thing.getName());
//                delete joose.top[global]
//            })
//        },
//        
//        initialize: function (name) {
//            this.setElements([])
//            this.setName(name);
//        },
//        
//        isEmpty: function () {
//            return this.getElements().length == 0
//        },
//        
//        addElement: function (ele) {
//            if(!(ele || ele.meta)) {
//                throw "You may only add things that are Joose objects"
//            }
//            this._elements.push(ele)
//        },
//        
//        getNames: function () {
//            var names = [];
//            Joose.A.each(this.getElements(), function (ele) { names.push(ele.meta.getName()) });
//            return names
//        }
//    }
//})
//})(JooseClass);
//
//__global__ = {};
//__global__.meta = new Joose.Module();
//__global__.meta.setName("__global__");
//__global__.meta.setContainer(__global__);
//
//Joose.Module._allModules = [__global__];
//
//JooseModule("__global__.nomodule", function () {})
//__global__.nomodule.meta._elements = joose.globalObjects;
