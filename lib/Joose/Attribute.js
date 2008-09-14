/*
 * This handles the following attribute properties
 *  * init with function value in non-lazy initialization
 *  * required attributes in initializaion
 *  * handles for auto-decoration
 *  * predicate for attribute availability checks
 * 
 * 
 * See http://code.google.com/p/joose-js/wiki/JooseAttribute
 */


Class("Joose.Attribute", {
    after: {
        handleProps: function (classObject) {
            this.handleHandles(classObject);
            this.handlePredicate(classObject);
        }
    },
    methods: {
        
        isPersistent: function () {
            var props = this.getProps()
            if(props.persistent == false) {
                return false
            }
            return true
        },
        
        doInitialization: function (object, paras) {
            var  name  = this.initializerName();
            var _name  = this.getName();
            var value;
            var isSet  = false;
            if(typeof paras != "undefined" && typeof paras[name] != "undefined") {
                value  = paras[name];
                isSet  = true;
            } else {
                var props = this.getProps();
                
                if(props.required) {
                    throw "Required initialization parameter missing: "+name + "(While initializing "+object+")"
                }
                
                var init  = props.init;
                if(typeof init == "function" && !props.lazy) {
                    // if init is not a function, we have put it in the prototype, so it is already here
                    value = init.call(object)
                    isSet = true
                }
            }
            if(isSet) {
                var setterName = this.setterName();
                if(object.meta.can(setterName)) { // use setter if available
                    object[setterName](value)
                } else { // direct attribute access
                    object[_name] = value
                }
            }
        },
        
        handleHandles: function (classObject) {
            var meta  = classObject.meta;
            var name  = this.getName();
            var props = this.getProps();
            
            var handles = props.handles;
            var isa     = props.isa
            
            if(handles) {
                if(handles == "*") {
                    if(!isa) {
                        throw "I need an isa property in order to handle a class"
                    }
                    
                    // receives the name and should return a closure
                    var optionalHandlerMaker = props.handleWith;
                    
                    meta.decorate(isa, name, optionalHandlerMaker)
                } 
                else {
                    throw "Unsupported value for handles: "+handles
                }
                
            }
        },
        
        handlePredicate: function (classObject) {
            var meta  = classObject.meta;
            var name  = this.getName();
            var props = this.getProps();
            
            var predicate = props.predicate;
            
            var getter    = this.getterName();
            
            if(predicate) {
                meta.addMethod(predicate, function () {
                    var val = this[getter]();
                    return val ? true : false
                })
            }
        }
    }
})