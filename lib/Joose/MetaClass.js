Joose.MetaClass = new Joose.Kernel.Class('Joose.MetaClass', {
    
//    isa                         : Joose.Managed.Class,
//    
//    before : {
//    	
//        addRole : function() {
//            Joose.A.each(arguments, function(arg){
//                var role = (arg.meta instanceof Joose.Managed.Role) ? arg : arg.role;
//                
//                if (role.meta.builderRole) this.getBuilderTarget().meta.extend({
//	        		does : [ role.meta.builderRole ]
//	        	});
//                
//                if (role.meta.stemRole) this.getStemTarget().meta.extend({
//	        		does : [ role.meta.stemRole ]
//	        	});
//                
//            }, this)
//        },
//        
//        
//        removeRole : function(){
//            Joose.A.each(arguments, function(role){
//                if (role.meta.builderRole) this.getBuilderTarget().meta.extend({
//	        		doesnt : [ role.meta.builderRole ]
//	        	});
//                
//                if (role.meta.stemRole) this.getStemTarget().meta.extend({
//	        		doesnt : [ role.meta.stemRole ]
//	        	});
//            }, this)
//        }
//        
//    }

	
	isa                         : Joose.Kernel.Class,
    
    
    have : {
    	defaultSuperClass : Joose.Object,
    	defaultAttributeClass : Joose.Managed.Attribute
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