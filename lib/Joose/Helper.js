Joose.Helper = new Joose.Meta.Class('Joose.Helper', {
    
    my : {
        
        methods : {
            
            register : function (name, helperMeta, func) {
                
                if (!func) func = function (name, props) {
                    var metaClass
                    
                    if (props && props.meta) {
                        metaClass = props.meta
                        delete props.meta
                    }    
                    
                    Joose.Namespace.Manager.my.create(name, metaClass || helperMeta, props)
                }
                
                __global__.addProperty(name, func)
            }
            
        }
        
    }

}).c



Joose.Helper.my.register('Class', Joose.Meta.Class, function (name, props) {
    var metaClass = Joose.Meta.Class
    
    if (props && props.meta) {
        metaClass = props.meta
        delete props.meta
    } else 
        if (props && typeof props.isa == 'function')
            if (props.isa.meta.isDetached())
                metaClass = props.isa.meta.meta.originalClass
            else
                metaClass = props.isa.meta.constructor
    
    return Joose.Namespace.Manager.my.create(name, metaClass, props)
})


Joose.Helper.my.register('Role', Joose.Meta.Role)


Joose.Helper.my.register('Module', Joose.Namespace.Keeper, function (name, props) {
    if (typeof props == 'function') props = { body : props }
    
    return Joose.Namespace.Manager.my.create(name, Joose.Namespace.Keeper, props)
})
