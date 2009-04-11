Role('JooseX.Attribute.Lazy', {
	
	
	before : {
		computeValue : function(props) {
			if (typeof props.init == 'function' && props.lazy) {
				props.lazy = props.init;
				delete props.init;
			}
			
			if (props.lazy && !props.is) props.is = 'ro'
		}
	},
	
	
	override : {
		
		getGetter : function() {
			var me = this;
			var name = this.name;
			var isFirstCall = Boolean(this.props.lazy);
			var original = this.SUPER();
			
			return function(value) {
				if (isFirstCall) {
					isFirstCall = false;
					this[name] = me.props.lazy.call(this);
				}
				
				return original.call(this);
			}
			
		}
		
	}
	
});

Joose.Kernel.Attribute.meta.extend({
	does : [ JooseX.Attribute.Lazy ]
})