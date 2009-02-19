var declared = false;
try {
	declared = typeof StressTest.Test021 == 'function';
} catch (e) {
	
}

if (declared && StressTest.Test021.meta.meta.isa(Joose.Class)) {
    __global__.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test021";
}

Class('StressTest.Test021', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test035',
	       'StressTest.Test037',
	       'StressTest.Test038',
	       'StressTest.Test044',
	       'StressTest.Test045',
	       'StressTest.Test059',
	       'StressTest.Test062',
	       'StressTest.Test063',
	       'StressTest.Test091',
	       'StressTest.Test092',
	       'StressTest.Test098'
	],
	
	methods : {
		result : function () { return 21 }
	},
	
	body : function(){
			if (!StressTest.Test035.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test035 is not satisfied for class StressTest.Test021"; 
			}
			if (!StressTest.Test037.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test037 is not satisfied for class StressTest.Test021"; 
			}
			if (!StressTest.Test038.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test038 is not satisfied for class StressTest.Test021"; 
			}
			if (!StressTest.Test044.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test044 is not satisfied for class StressTest.Test021"; 
			}
			if (!StressTest.Test045.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test045 is not satisfied for class StressTest.Test021"; 
			}
			if (!StressTest.Test059.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test059 is not satisfied for class StressTest.Test021"; 
			}
			if (!StressTest.Test062.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test062 is not satisfied for class StressTest.Test021"; 
			}
			if (!StressTest.Test063.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test063 is not satisfied for class StressTest.Test021"; 
			}
			if (!StressTest.Test091.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test091 is not satisfied for class StressTest.Test021"; 
			}
			if (!StressTest.Test092.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test092 is not satisfied for class StressTest.Test021"; 
			}
			if (!StressTest.Test098.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test098 is not satisfied for class StressTest.Test021"; 
			}
	}
})
