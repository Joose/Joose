Role('Joose.Attribute.Trigger', {
	
	
	before : {
		computeValue : function(props) {
			if (props.trigger) props.is = 'rw'
		}
	},
	
	
	after : {
		
		computeValue : function(props) {
			if (props.trigger) {
				var after = {};
				
				after[this.setterName] = props.trigger;
				
				this.role.meta.extend({ after : after })
			}
		}
		
	}
	
});

Joose.Kernel.Attribute.meta.extend({
	does : [ Joose.Attribute.Trigger ]
})