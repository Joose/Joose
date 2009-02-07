if (typeof StressTest.Test017 == 'function' && StressTest.Test017.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test017";
}

Class('StressTest.Test017', {
	use : [ 
	   
	       'StressTest.Test018',
	   
	       'StressTest.Test032',
	   
	       'StressTest.Test036',
	   
	       'StressTest.Test039',
	   
	       'StressTest.Test061',
	   
	       'StressTest.Test064',
	   
	       'StressTest.Test067',
	   
	       'StressTest.Test069',
	   
	       'StressTest.Test070',
	   
	       'StressTest.Test083'
	   
	],
	
	methods : {
		result : function () { return 17 }
	}
})
