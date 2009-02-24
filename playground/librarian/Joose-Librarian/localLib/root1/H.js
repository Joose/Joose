if (typeof H == 'function'&& H.meta.meta.isa(Joose.Class)) throw "Double declaration H";

Class('H', {
	version : 0.2,
	
	methods : {
		result : function () { return 'H' }
	},
	
	body : function(){
	}
})
