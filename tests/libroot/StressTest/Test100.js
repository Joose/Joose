if (typeof StressTest.Test100 == 'function' && StressTest.Test100.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test100";
}

Class('StressTest.Test100', {
	version : 0.1,
	
	use : [ 
	],
	
	methods : {
		result : function () { return 100 }
	},
	
	body : function(){
	}
})
