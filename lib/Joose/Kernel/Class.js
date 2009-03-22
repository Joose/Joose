Joose.Kernel = function(){ throw "Modules may not be instantiated." };

Joose.Kernel.Class = new Joose.Managed.Class('Joose.Kernel.Class', {
    
    isa                         : Joose.Managed.Class,
    
    before : {
    	
        addRole : function() {
            Joose.A.each(arguments, function(arg){
                var role = (arg.meta instanceof Joose.Managed.Role) ? arg : arg.role;
                
                if (role.meta.builderRole) this.getBuilderTarget().meta.extend({
	        		does : [ role.meta.builderRole ]
	        	});
                
                if (role.meta.stemRole) this.getStemTarget().meta.extend({
	        		does : [ role.meta.stemRole ]
	        	});
                
            }, this)
        },
        
        
        removeRole : function(){
            Joose.A.each(arguments, function(role){
                if (role.meta.builderRole) this.getBuilderTarget().meta.extend({
	        		doesnt : [ role.meta.builderRole ]
	        	});
                
                if (role.meta.stemRole) this.getStemTarget().meta.extend({
	        		doesnt : [ role.meta.stemRole ]
	        	});
            }, this)
        }
        
    }
    
    
}).c;