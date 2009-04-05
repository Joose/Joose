Joose.Object = new Joose.Kernel.Class('Joose.Object', {
	
	isa : Joose.Proto.Object,
	
	methods : {
		
		detach : function() {
			//already detached
			if (this.meta instanceof Joose.DetachedClass) return;
			
        	var detachedClass = new Joose.DetachedClass('', { isa : this.constructor }).c
        	
        	detachedClass.meta.stem.open()
        	
        	detachedClass.prototype = this
        	
        	this.meta = detachedClass.meta
        	this.meta.originalClass = this.constructor
        	this.constructor = detachedClass
        	
        	detachedClass.meta.stem.close()
		},
		
		
		attach : function() {
			//not detached
			if (!this.meta.originalClass) return;
			
			
		}
		
	}

}).c;