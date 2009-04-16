var declared = false;
try {
	declared = typeof StressTest.Test005 == 'function';
} catch (e) {
	
}

if (declared && StressTest.Test005.meta.constructor == Joose.Meta.Class) {
    __global__.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test005";
}

Class('StressTest.Test005', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test022',
	       'StressTest.Test025',
	       'StressTest.Test026',
	       'StressTest.Test038',
	       'StressTest.Test066',
	       'StressTest.Test074',
	       'StressTest.Test078',
	       'StressTest.Test079',
	       'StressTest.Test089'
	],
	
	methods : {
		result : function () { return 5 }
	},
	
	body : function(){
			if (StressTest.Test022.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test022 is not satisfied for class StressTest.Test005"; 
			}
			if (StressTest.Test025.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test025 is not satisfied for class StressTest.Test005"; 
			}
			if (StressTest.Test026.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test026 is not satisfied for class StressTest.Test005"; 
			}
			if (StressTest.Test038.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test038 is not satisfied for class StressTest.Test005"; 
			}
			if (StressTest.Test066.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test066 is not satisfied for class StressTest.Test005"; 
			}
			if (StressTest.Test074.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test074 is not satisfied for class StressTest.Test005"; 
			}
			if (StressTest.Test078.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test078 is not satisfied for class StressTest.Test005"; 
			}
			if (StressTest.Test079.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test079 is not satisfied for class StressTest.Test005"; 
			}
			if (StressTest.Test089.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test089 is not satisfied for class StressTest.Test005"; 
			}
	}
})
