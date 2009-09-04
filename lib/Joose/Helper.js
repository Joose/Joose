Joose.Helper = new Joose.Meta.Class('Joose.Helper', {
    
    my : {
        
        methods : {
            
            register : function (helperName) {
                __global__.addProperty(helperName, function () {
                    return Joose.Helper.my[helperName].apply(Joose.Helper.my, arguments)
                })
            },
            
            
            
            Role : function (name, props) {
                if (typeof name != 'string') {
                    props = name
                    name = null
                }
                
                var metaClass = Joose.Meta.Role
                
                if (props && props.meta) {
                    metaClass = props.meta
                    delete props.meta
                }    
                
                return Joose.Namespace.Manager.my.create(name, metaClass, props)
            },
            
            
            Class : function (name, props) {
                if (typeof name != 'string') {
                    props = name
                    name = null
                }
                
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
            },
            
            
            Module : function (name, props) {
                if (typeof props == 'function') props = { body : props }    
                
                return Joose.Namespace.Manager.my.create(name, Joose.Namespace.Keeper, props)
            }
            
            
        }
        
    }

}).c


Joose.A.each([ 'Class', 'Role', 'Module' ], function (helperName) {
    Joose.Helper.my.register(helperName)
})