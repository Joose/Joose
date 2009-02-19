if (typeof E == 'function'&& E.meta.meta.isa(Joose.Class)) throw "Double declaration E";

Class('E', {
	version : 0.1,
	
	use : [ 
	       { Module : 'H', version : 0.2 }
	],
	
	methods : {
		result : function () { return 'E' }
	},
	
	body : function(){
            if (!H.meta.meta.isa(Joose.Class)) { 
                throw "Dependency H is not satisfied for class E"; 
            }
	}
})
