if (typeof StressTest.Test043 == 'function' && StressTest.Test043.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test043";
}

Class('StressTest.Test043', {
	use : [ 
	   
	       'StressTest.Test049',
	   
	       'StressTest.Test065',
	   
	       'StressTest.Test070',
	   
	       'StressTest.Test080',
	   
	       'StressTest.Test082',
	   
	       'StressTest.Test096',
	   
	       'StressTest.Test098'
	   
	],
	
	methods : {
		result : function () { return 43 }
	}
})
