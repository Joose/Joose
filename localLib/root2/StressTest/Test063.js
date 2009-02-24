var declared = false;
try {
	declared = typeof StressTest.Test063 == 'function';
} catch (e) {
	
}

if (declared && StressTest.Test063.meta.meta.isa(Joose.Class)) {
    __global__.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test063";
}

Class('StressTest.Test063', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test064',
	       'StressTest.Test065',
	       'StressTest.Test067',
	       'StressTest.Test069',
	       'StressTest.Test081',
	       'StressTest.Test088',
	       'StressTest.Test092',
	       'StressTest.Test094',
	       'StressTest.Test098',
	       'StressTest.Test100'
	],
	
	methods : {
		result : function () { return 63 }
	},
	
	body : function(){
			if (!StressTest.Test064.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test064 is not satisfied for class StressTest.Test063"; 
			}
			if (!StressTest.Test065.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test065 is not satisfied for class StressTest.Test063"; 
			}
			if (!StressTest.Test067.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test067 is not satisfied for class StressTest.Test063"; 
			}
			if (!StressTest.Test069.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test069 is not satisfied for class StressTest.Test063"; 
			}
			if (!StressTest.Test081.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test081 is not satisfied for class StressTest.Test063"; 
			}
			if (!StressTest.Test088.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test088 is not satisfied for class StressTest.Test063"; 
			}
			if (!StressTest.Test092.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test092 is not satisfied for class StressTest.Test063"; 
			}
			if (!StressTest.Test094.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test094 is not satisfied for class StressTest.Test063"; 
			}
			if (!StressTest.Test098.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test098 is not satisfied for class StressTest.Test063"; 
			}
			if (!StressTest.Test100.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test100 is not satisfied for class StressTest.Test063"; 
			}
	}
})
