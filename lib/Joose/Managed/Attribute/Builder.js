Joose.Managed.Attribute.Builder = new Joose.Managed.Role('Joose.Managed.Attribute.Builder', {
    
    
    have : {
    	defaultAttributeClass : Joose.Managed.Attribute
    },
    
    builder : {
    	
    	methods : {
			has : function (targetClassMeta, info) {
		        Joose.O.eachSafe(info, function(props, name) {
		        	props.meta = props.meta || targetClassMeta.defaultAttributeClass;
		        	
		            targetClassMeta.addAttribute(name, props.init, props);
		        }, this);
			},
			
			
		    hasnot : function(targetClassMeta, info) {
		        this.havenot(targetClassMeta, info);
		    },
		    
		    
		    hasnt : function(targetClassMeta, info) {
		        this.hasnot(targetClassMeta, info);
		    }
    	}
    		
    }
    
}).c;


Joose.MetaClass.meta.extend({
    does                        : [ Joose.Managed.Attribute.Builder ]
});


Joose.MetaRole.meta.extend({
    does                        : [ Joose.Managed.Attribute.Builder ]
});
