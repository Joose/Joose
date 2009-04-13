Class('Joose.DetachedClass', {
    
    meta                        : Joose.MetaClass,
    isa                         : Joose.MetaClass,
    
    have : {
    	originalClass : null
    },
    
    stem : {
    	
    	have : {
    		woAttributes         : [ 'methods', 'requirements', 'methodsModifiers']
    	},
    	
    	override : { 
    		
	        prepareApply : function(target) {
	        	this.processOrder = this.woAttributes;
	        	
	        	this.SUPER(target);
	        	
	        	delete this.processOrder;
	        },
	        
	        
	        apply : function(target){
	        	this.processOrder = this.woAttributes;
	        	
	        	this.SUPER(target);
	        	
	        	delete this.processOrder;
	        },
	        
	        
	        unapply : function(target){
	        	this.processOrder = this.woAttributes;
	        	
	        	this.SUPER(target);
	        	
	        	delete this.processOrder;
	        }
    	}
    	
    }
    
});