(function (Class, Type) {

Class("Joose.TypeChecker", {
    
    classMethods: {
        makeTypeChecker: function (isa, props, thing, name) {
            if(!isa.meta) {
                throw new Error("Isa declarations in attribute declarations must be Joose classes, roles or type constraints")
            }
        
            var isRole  = false;
            var isType  = false;
            // We need to check whether Joose.Role and Joose.TypeContraint 
            // are there yet, because they might not have been compiled yet
            if(Joose.Role && isa.meta.meta.isa(Joose.Role)) {
                isRole  = true;
            } 
            else if(Joose.TypeConstraint && isa.meta.isa(Joose.TypeConstraint)) {
                isType  = true;
            }
            
            // TODO possible Optimization: Create distinct closures based on the type
        
            // If the isa refers to a class, then the new value must be an instance of that class.
            // If the isa refers to a role,  then the new value must implement that role.
            // If the isa refers to a type constraint, then the value must match that type contraint
            // ...and if the coerce property is set, we try to coerce the new value into the type
            // Throws an exception if the new value does not match the isa property.
            // If errorHandler is given, it will be executed in case of an error with parameters (Exception, isa-Contraint)
            func = function doTypeCheck (value, errorHandler) {
                try {
                    if ( props.nullable === true && value == undefined) {
                        // Don't do anything here:)
                    } else if ( isType ) {
                        var newvalue = null;
                        if( props.coerce ) {
                            newvalue = isa.coerce(value);
                        }
                        if ( newvalue == null && props.nullable !== true) {
                            isa.validate(value);
                        } else {
                            value = newvalue;
                        }
                    } else {
                        if(!value || !value.meta) {
                            throw new ReferenceError("The "+thing+" "+name+" only accepts values that have a meta object.")
                        }
                        var typeCheck = isRole ? value.meta.does(isa): value.meta.isa(isa);
                        if( ! typeCheck ) {
                            throw new ReferenceError("The "+thing+" "+name+" only accepts values that are objects of type "+isa.meta.className()+".")
                        }
                    }
                } catch (e) {
                    if(errorHandler) {
                        errorHandler.call(this, e, isa)
                    } else {
                        throw e
                    }
                };
                return value
            }
            
            return func
        }
    }
})

})(JooseClass, JooseType);
