if (typeof G == 'function'&& G.meta.meta.isa(Joose.Class)) throw "Double declaration G";

Class('G', {
	version : 0.1,
	
	methods : {
		result : function () { return 'G' }
	},
	
	body : function(){
	}
})
