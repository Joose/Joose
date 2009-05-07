Joose.Meta.Class.Detached = new Joose.Meta.Class('Joose.Meta.Class.Detached', {
    
    isa                         : Joose.Meta.Class,
    
    have : {
    	originalClass : null
    },
    
    stem : {
    	
    	have : {
    		woAttributes         : [ 'methods', 'requirements', 'methodsModifiers']
    	},
    	
    	override : { 
    		
	        prepareApply : function(target) {
	        	this.processOrder = this.woAttributes
	        	
	        	this.SUPER(target)
	        	
	        	delete this.processOrder
	        },
	        
	        
	        apply : function(target){
	        	this.processOrder = this.woAttributes
	        	
	        	this.SUPER(target)
	        	
	        	delete this.processOrder
	        },
	        
	        
	        unapply : function(target){
	        	this.processOrder = this.woAttributes
	        	
	        	this.SUPER(target)
	        	
	        	delete this.processOrder
	        }
    	}
    	
    }
    
}).c