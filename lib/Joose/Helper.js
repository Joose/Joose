Joose.Helper = new Joose.Meta.Class('Joose.Helper', {
	
	my : {
		
		methods : {
			
			registerHelper : function (name, helperMeta, func) {
				
				if (!func) func = function (name, props) {
				    var metaClass
				    
				    if (props && props.meta) {
				        metaClass = props.meta
				        delete props.meta
				    }	
					
					Joose.Namespace.Manager.my.create(name, metaClass || helperMeta, props, Joose.Namespace.Manager.my.getCurrent())
				}
				
				__global__.addProperty(name, func)
			}
			
		}
		
	}

}).c



Joose.Helper.my.registerHelper('Class', Joose.Meta.Class, function (name, props) {
    var metaClass
    
    if (props && props.meta) {
        metaClass = props.meta
        delete props.meta
    } else if (props && props.isa)
        metaClass = props.isa.meta.constructor
    else
        metaClass   = Joose.Meta.Class
    
    return Joose.Namespace.Manager.my.create(name, metaClass, props, Joose.Namespace.Manager.my.getCurrent()); 
})


Joose.Helper.my.registerHelper('Role', Joose.Meta.Role)


Joose.Helper.my.registerHelper('Module', Joose.Namespace.Keeper, function (name, props) {
	if (typeof props == 'function') props = { body : props }
	
    return Joose.Namespace.Manager.my.create(name, Joose.Namespace.Keeper, props, Joose.Namespace.Manager.my.getCurrent()); 
})
