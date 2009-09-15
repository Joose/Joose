Joose.Helper = new Joose.Meta.Class('Joose.Helper', {
    
    methods : {
        
        prepareArguments : function (name, props) {
            if (typeof name != 'string') {
                props = name
                name = null
            }
            
            var meta
            
            if (props && props.meta) {
                meta = props.meta
                delete props.meta
            }
            
            return {
                name : name,
                meta : meta,
                props : props
            }
        },
        
        
        getDefaultHelperFor : function (metaClass) {
            return function (name, props) {
                var args = Joose.Helper.my.prepareArguments(name, props)
                
                args.meta = args.meta || metaClass
                
                return Joose.Namespace.Manager.my.create(args.name, args.meta, args.props)
            }
        },
        
        
        register : function (helperName, metaClass, func) {
            
            if (this.meta.hasMethod(helperName))
                __global__.addProperty(helperName, function () {
                    return Joose.Helper.my[helperName].apply(Joose.Helper.my, arguments)
                })
            else {
                var methods = {}
                
                methods[helperName] = func || this.getDefaultHelperFor(metaClass)
                
                this.meta.extend({
                    methods : methods
                })
                
                this.register(helperName)
            }
        },
        
        
        Class : function (name, props) {
            var args = this.prepareArguments(name, props)
            
            if (!args.meta)
                if (props && typeof props.isa == 'function')
                    if (props.isa.meta.isDetached())
                        args.meta = props.isa.meta.meta.originalClass
                    else
                        args.meta = props.isa.meta.constructor
                else
                    args.meta = Joose.Meta.Class
                    
            //to allow delayed meta declaration in nested classes
            //if not a class
            if (!args.meta.meta) args.meta = args.meta()
            
            return Joose.Namespace.Manager.my.create(args.name, args.meta, args.props)
        },
        
        
        Module : function (name, props) {
            if (typeof props == 'function') props = { body : props }    
            
            return Joose.Namespace.Manager.my.create(name, Joose.Namespace.Keeper, props)
        }
        
        
    }
        
}).c

Joose.Helper.my = new Joose.Helper()

Joose.Helper.my.register('Class')
Joose.Helper.my.register('Role', Joose.Meta.Role)
Joose.Helper.my.register('Module')