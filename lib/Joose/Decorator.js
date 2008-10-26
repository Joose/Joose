
Class("Joose.Decorator", {
    meta: Joose.Role,
    methods: {
        decorate: function (classObject, attributeName, optionalDelegatorFuncMaker) {
            var me = this;
            var methods = classObject.meta.getInstanceMethods();
            Joose.A.each(methods, function (m) {
                var name    = m.getName();
                var argName = attributeName;
                // only override non existing methods
                if(!me.can(name)) {
                    
                    var func = function () {
                        var d = this[argName];
                        return d[name].apply(d, arguments)
                    }
                    
                    if(optionalDelegatorFuncMaker) {
                        func = optionalDelegatorFuncMaker(name)
                    }
                    
                    me.addMethod(name, func);
                }
            })
        }
    }
})

Joose.Decorator.meta.apply(Joose.Class)