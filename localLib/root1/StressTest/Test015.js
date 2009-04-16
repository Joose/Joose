var declared = false;
try {
	declared = typeof StressTest.Test015 == 'function';
} catch (e) {
	
}

if (declared && StressTest.Test015.meta.constructor == Joose.Meta.Class) {
    __global__.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test015";
}

Class('StressTest.Test015', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test027',
	       'StressTest.Test028',
	       'StressTest.Test033',
	       'StressTest.Test065',
	       'StressTest.Test066',
	       'StressTest.Test070',
	       'StressTest.Test087',
	       'StressTest.Test095',
	       'StressTest.Test096',
	       'StressTest.Test097'
	],
	
	methods : {
		result : function () { return 15 }
	},
	
	body : function(){
			if (StressTest.Test027.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test027 is not satisfied for class StressTest.Test015"; 
			}
			if (StressTest.Test028.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test028 is not satisfied for class StressTest.Test015"; 
			}
			if (StressTest.Test033.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test033 is not satisfied for class StressTest.Test015"; 
			}
			if (StressTest.Test065.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test065 is not satisfied for class StressTest.Test015"; 
			}
			if (StressTest.Test066.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test066 is not satisfied for class StressTest.Test015"; 
			}
			if (StressTest.Test070.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test070 is not satisfied for class StressTest.Test015"; 
			}
			if (StressTest.Test087.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test087 is not satisfied for class StressTest.Test015"; 
			}
			if (StressTest.Test095.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test095 is not satisfied for class StressTest.Test015"; 
			}
			if (StressTest.Test096.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test096 is not satisfied for class StressTest.Test015"; 
			}
			if (StressTest.Test097.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test097 is not satisfied for class StressTest.Test015"; 
			}
	}
})
