Joose.Kernel.Role = new Joose.Kernel.Class('Joose.Kernel.Role', {
    
    isa                         : Joose.Managed.Role,
    
    have : {
	    builderRole					: null,
	    stemRole					: null
    },

    
    
    methods : {
        
	    getBuilderTarget : function(){
	    	if (!this.builderRole) this.builderRole = new this.meta.superClass().c;
	    	
	    	return this.builderRole;
	    },
	    
	
	    getStemTarget : function(){
	    	if (!this.stemRole) this.stemRole = new this.meta.superClass().c;
	    	
	    	return this.stemRole;
	    }
        
    }
    
}).c;