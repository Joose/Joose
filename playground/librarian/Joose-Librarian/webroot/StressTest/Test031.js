var declared = false;
try {
	declared = typeof StressTest.Test031 == 'function';
} catch (e) {
	
}

if (declared && StressTest.Test031.meta.meta.isa(Joose.Class)) {
    StressTest.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test031";
}

Class('StressTest.Test031', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test034',
	       'StressTest.Test048',
	       'StressTest.Test056',
	       'StressTest.Test076',
	       'StressTest.Test083',
	       'StressTest.Test094'
	],
	
	methods : {
		result : function () { return 31 }
	},
	
	body : function(){
			if (!StressTest.Test034.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test034 is not satisfied for class StressTest.Test031"; 
			}
			if (!StressTest.Test048.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test048 is not satisfied for class StressTest.Test031"; 
			}
			if (!StressTest.Test056.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test056 is not satisfied for class StressTest.Test031"; 
			}
			if (!StressTest.Test076.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test076 is not satisfied for class StressTest.Test031"; 
			}
			if (!StressTest.Test083.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test083 is not satisfied for class StressTest.Test031"; 
			}
			if (!StressTest.Test094.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test094 is not satisfied for class StressTest.Test031"; 
			}
	}
})
