if (typeof I == 'function'&& I.meta.meta.isa(Joose.Class)) throw "Double declaration I";

Class('I', {
	version : 0.1,
	
	methods : {
		result : function () { return 'I' }
	},
	
	body : function(){
	}
})
