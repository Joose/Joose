if (typeof C == 'function'&& C.meta.meta.isa(Joose.Class)) throw "Double declaration C";

Class('C', {
	version : 0.1,
	
	methods : {
		result : function () { return 'C' }
	},
	
	body : function(){
	}
})
