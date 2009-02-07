if (typeof StressTest.Test015 == 'function' && StressTest.Test015.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test015";
}

Class('StressTest.Test015', {
	use : [ 
	   
	       'StressTest.Test024',
	   
	       'StressTest.Test040',
	   
	       'StressTest.Test050',
	   
	       'StressTest.Test064',
	   
	       'StressTest.Test080',
	   
	       'StressTest.Test082',
	   
	       'StressTest.Test094'
	   
	],
	
	methods : {
		result : function () { return 15 }
	}
})
