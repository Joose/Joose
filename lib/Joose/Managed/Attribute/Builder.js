Joose.Managed.Attribute.Builder = new Joose.Managed.Role('Joose.Managed.Attribute.Builder', {
    
    
    have : {
    	defaultAttributeClass : Joose.Managed.Attribute
    },
    
    builder : {
    	
    	methods : {
			has : function (targetClassMeta, info) {
		        Joose.O.eachSafe(info, function(props, name) {
		        	if (typeof props != 'object' || props == null) props = { init : props }
		        	
		        	props.meta = props.meta || targetClassMeta.defaultAttributeClass
		        	
		            targetClassMeta.addAttribute(name, props.init, props)
		        }, this)
			},
			
			
		    hasnot : function(targetClassMeta, info) {
		        this.havenot(targetClassMeta, info)
		    },
		    
		    
		    hasnt : function(targetClassMeta, info) {
		        this.hasnot(targetClassMeta, info)
		    }
    	}
    		
    }
    
}).c



//Joose.Meta.Class.meta.extend({
//    does                        : [ Joose.Managed.Attribute.Builder ]
//})
//
//
//Joose.Meta.Role.meta.extend({
//    does                        : [ Joose.Managed.Attribute.Builder ]
//})
