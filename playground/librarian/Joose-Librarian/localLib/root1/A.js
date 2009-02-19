if (typeof A == 'function'&& A.meta.meta.isa(Joose.Class)) throw "Double declaration A";

Class('A', {
	version : 0.1,
	
	use : [ 
	       'D',
	       'E'
	],
	
	methods : {
		result : function () { return 'A' }
	},
	
	body : function(){
			if (!D.meta.meta.isa(Joose.Class)) { 
				throw "Dependency D is not satisfied for class A"; 
			}
            if (!E.meta.meta.isa(Joose.Class)) { 
                throw "Dependency E is not satisfied for class A"; 
            }
	}
})
