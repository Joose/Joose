var declared = false;
try {
	declared = typeof StressTest.Test006 == 'function';
} catch (e) {
	
}

if (declared && StressTest.Test006.meta.meta.isa(Joose.Class)) {
    StressTest.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test006";
}

Class('StressTest.Test006', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test013',
	       'StressTest.Test028',
	       'StressTest.Test044',
	       'StressTest.Test051',
	       'StressTest.Test054',
	       'StressTest.Test055',
	       'StressTest.Test059',
	       'StressTest.Test074',
	       'StressTest.Test087',
	       'StressTest.Test096'
	],
	
	methods : {
		result : function () { return 6 }
	},
	
	body : function(){
			if (!StressTest.Test013.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test013 is not satisfied for class StressTest.Test006"; 
			}
			if (!StressTest.Test028.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test028 is not satisfied for class StressTest.Test006"; 
			}
			if (!StressTest.Test044.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test044 is not satisfied for class StressTest.Test006"; 
			}
			if (!StressTest.Test051.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test051 is not satisfied for class StressTest.Test006"; 
			}
			if (!StressTest.Test054.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test054 is not satisfied for class StressTest.Test006"; 
			}
			if (!StressTest.Test055.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test055 is not satisfied for class StressTest.Test006"; 
			}
			if (!StressTest.Test059.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test059 is not satisfied for class StressTest.Test006"; 
			}
			if (!StressTest.Test074.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test074 is not satisfied for class StressTest.Test006"; 
			}
			if (!StressTest.Test087.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test087 is not satisfied for class StressTest.Test006"; 
			}
			if (!StressTest.Test096.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test096 is not satisfied for class StressTest.Test006"; 
			}
	}
})
