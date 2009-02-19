if (typeof J == 'function'&& J.meta.meta.isa(Joose.Class)) throw "Double declaration J";

Class('J', {
	version : 0.1,
	
	methods : {
		result : function () { return 'J' }
	},
	
	body : function(){
	}
})
