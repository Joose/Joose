if (typeof StressTest.Test024 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test024";
}
//if (typeof StressTest.Test024 == 'function') throw "Double declaration of StressTest.Test024";

Class('StressTest.Test024', {
	use : [ 
	   
	       'StressTest.Test027',
	   
	       'StressTest.Test034',
	   
	       'StressTest.Test043',
	   
	       'StressTest.Test047',
	   
	       'StressTest.Test048',
	   
	       'StressTest.Test064',
	   
	       'StressTest.Test080',
	   
	       'StressTest.Test088',
	   
	       'StressTest.Test098'
	   
	],
	
	methods : {
		result : function () { return 24 }
	}
})
