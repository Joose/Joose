if (typeof StressTest.Test098 == 'function' && StressTest.Test098.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test098";
}

Class('StressTest.Test098', {
	use : [ 
	   
	       'StressTest.Test099',
	   
	       'StressTest.Test100'
	   
	],
	
	methods : {
		result : function () { return 98 }
	}
})
