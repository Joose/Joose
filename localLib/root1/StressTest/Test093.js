var declared = false;
try {
	declared = typeof StressTest.Test093 == 'function';
} catch (e) {
	
}

if (declared && StressTest.Test093.meta.meta.isa(Joose.Class)) {
    __global__.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test093";
}

Class('StressTest.Test093', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test094',
	       'StressTest.Test095',
	       'StressTest.Test096',
	       'StressTest.Test097',
	       'StressTest.Test098',
	       'StressTest.Test099',
	       'StressTest.Test100'
	],
	
	methods : {
		result : function () { return 93 }
	},
	
	body : function(){
			if (!StressTest.Test094.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test094 is not satisfied for class StressTest.Test093"; 
			}
			if (!StressTest.Test095.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test095 is not satisfied for class StressTest.Test093"; 
			}
			if (!StressTest.Test096.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test096 is not satisfied for class StressTest.Test093"; 
			}
			if (!StressTest.Test097.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test097 is not satisfied for class StressTest.Test093"; 
			}
			if (!StressTest.Test098.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test098 is not satisfied for class StressTest.Test093"; 
			}
			if (!StressTest.Test099.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test099 is not satisfied for class StressTest.Test093"; 
			}
			if (!StressTest.Test100.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test100 is not satisfied for class StressTest.Test093"; 
			}
	}
})
