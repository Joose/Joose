if (typeof StressTest.Test022 == 'function' && StressTest.Test022.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test022";
}

Class('StressTest.Test022', {
	use : [ 
	   
	       'StressTest.Test025',
	   
	       'StressTest.Test040',
	   
	       'StressTest.Test044',
	   
	       'StressTest.Test045',
	   
	       'StressTest.Test046',
	   
	       'StressTest.Test052',
	   
	       'StressTest.Test056',
	   
	       'StressTest.Test064',
	   
	       'StressTest.Test065',
	   
	       'StressTest.Test066',
	   
	       'StressTest.Test073',
	   
	       'StressTest.Test083',
	   
	       'StressTest.Test086',
	   
	       'StressTest.Test091',
	   
	       'StressTest.Test100'
	   
	],
	
	methods : {
		result : function () { return 22 }
	}
})
