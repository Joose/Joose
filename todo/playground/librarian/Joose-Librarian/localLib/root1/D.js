if (typeof D == 'function'&& D.meta.meta.isa(Joose.Class)) throw "Double declaration D";

Class('D', {
	version : 0.1,
	
	use : [ 
	       'G',
	       { Module : 'H', version : 0.1 }
	],
	
	methods : {
		result : function () { return 'D' }
	},
	
	body : function(){
			if (!G.meta.meta.isa(Joose.Class)) { 
				throw "Dependency G is not satisfied for class D"; 
			}
            if (!H.meta.meta.isa(Joose.Class)) { 
                throw "Dependency H is not satisfied for class D"; 
            }
	}
})
