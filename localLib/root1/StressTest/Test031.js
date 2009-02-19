var declared = false;
try {
	declared = typeof StressTest.Test031 == 'function';
} catch (e) {
	
}

if (declared && StressTest.Test031.meta.meta.isa(Joose.Class)) {
    __global__.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test031";
}

Class('StressTest.Test031', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test046',
	       'StressTest.Test053',
	       'StressTest.Test064',
	       'StressTest.Test081',
	       'StressTest.Test083',
	       'StressTest.Test084',
	       'StressTest.Test087',
	       'StressTest.Test100'
	],
	
	methods : {
		result : function () { return 31 }
	},
	
	body : function(){
			if (!StressTest.Test046.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test046 is not satisfied for class StressTest.Test031"; 
			}
			if (!StressTest.Test053.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test053 is not satisfied for class StressTest.Test031"; 
			}
			if (!StressTest.Test064.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test064 is not satisfied for class StressTest.Test031"; 
			}
			if (!StressTest.Test081.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test081 is not satisfied for class StressTest.Test031"; 
			}
			if (!StressTest.Test083.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test083 is not satisfied for class StressTest.Test031"; 
			}
			if (!StressTest.Test084.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test084 is not satisfied for class StressTest.Test031"; 
			}
			if (!StressTest.Test087.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test087 is not satisfied for class StressTest.Test031"; 
			}
			if (!StressTest.Test100.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test100 is not satisfied for class StressTest.Test031"; 
			}
	}
})
