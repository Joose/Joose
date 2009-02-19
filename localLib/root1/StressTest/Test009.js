var declared = false;
try {
	declared = typeof StressTest.Test009 == 'function';
} catch (e) {
	
}

if (declared && StressTest.Test009.meta.meta.isa(Joose.Class)) {
    StressTest.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test009";
}

Class('StressTest.Test009', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test012',
	       'StressTest.Test066'
	],
	
	methods : {
		result : function () { return 9 }
	},
	
	body : function(){
			if (!StressTest.Test012.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test012 is not satisfied for class StressTest.Test009"; 
			}
			if (!StressTest.Test066.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test066 is not satisfied for class StressTest.Test009"; 
			}
	}
})
