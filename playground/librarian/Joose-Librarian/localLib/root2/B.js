if (typeof B == 'function' && B.meta.meta.isa(Joose.Class)) throw "Double declaration B";

Class('B', {
	version : 0.1,
	
	use : [ 
	       { Module : 'F', version : 0.2 }
	],
	
	methods : {
		result : function () { return 'B' }
	},
	
	body : function(){
            if (!F.meta.meta.isa(Joose.Class)) { 
                throw "Dependency F is not satisfied for class B"; 
            }
	}
})
