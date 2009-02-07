if (typeof StressTest.Test096 == 'function' && StressTest.Test096.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test096";
}

Class('StressTest.Test096', {
	use : [ 
	   
	       'StressTest.Test097',
	   
	       'StressTest.Test098',
	   
	       'StressTest.Test099',
	   
	       'StressTest.Test100'
	   
	],
	
	methods : {
		result : function () { return 96 }
	}
})
