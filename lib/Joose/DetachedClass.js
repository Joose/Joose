Joose.DetachedClass = new Joose.MetaClass('Joose.DetachedClass', {
    
    isa                         : Joose.MetaClass,
    
    have : {
    	originalClass : null
    },
    
    stem : {
    	
    	override : { 
    		
	        prepareApply : function(target) {
	        	this.each(function(property) {
	        		property.prepareApply(target);
	        	}, this, true);
	        },
	        
	        
	        apply : function(target){
	        	this.each(function(property) {
	        		property.apply(target);
	        	}, this, true);
	        },
	        
	        
	        unapply : function(target){
	        	this.eachR(function(property) {
	        		property.unapply(target);
	        	}, this, true);
	        },
    		
    		
		    each : function (func, scope, skipAttr) {
		        Joose.A.each(this.processOrder, function(name) {
		        	if (name != 'attributes' || !skipAttr) func.call(scope || this, this.getProperty(name), name)
		        }, this);
		    },
		    
		    
		    eachR : function (func, scope, skipAttr) {
		        for(var i = this.processOrder.length - 1; i >= 0; i--) 
		            if (this.processOrder[i] != 'attributes' || !skipAttr) func.call(scope || this, this.getProperty(this.processOrder[i]), this.processOrder[i])
		    }
    	}
    	
    }
    
}).c;