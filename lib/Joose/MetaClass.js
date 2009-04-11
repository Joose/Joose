Joose.MetaClass = new Joose.Kernel.Class('Joose.MetaClass', {
    
    isa                         : Joose.Kernel.Class,
    
    
    have : {
    	defaultSuperClass : Joose.Object,
    	defaultAttributeClass : Joose.Attribute
    },
    
    
    //XXX share with MetaRole
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