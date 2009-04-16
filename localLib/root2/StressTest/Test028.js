var declared = false;
try {
	declared = typeof StressTest.Test028 == 'function';
} catch (e) {
	
}

if (declared && StressTest.Test028.meta.constructor == Joose.Meta.Class) {
    __global__.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test028";
}

Class('StressTest.Test028', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test033',
	       'StressTest.Test036',
	       'StressTest.Test037',
	       'StressTest.Test038',
	       'StressTest.Test039',
	       'StressTest.Test044',
	       'StressTest.Test046',
	       'StressTest.Test048',
	       'StressTest.Test055',
	       'StressTest.Test067',
	       'StressTest.Test070',
	       'StressTest.Test072',
	       'StressTest.Test077',
	       'StressTest.Test086'
	],
	
	methods : {
		result : function () { return 28 }
	},
	
	body : function(){
			if (StressTest.Test033.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test033 is not satisfied for class StressTest.Test028"; 
			}
			if (StressTest.Test036.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test036 is not satisfied for class StressTest.Test028"; 
			}
			if (StressTest.Test037.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test037 is not satisfied for class StressTest.Test028"; 
			}
			if (StressTest.Test038.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test038 is not satisfied for class StressTest.Test028"; 
			}
			if (StressTest.Test039.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test039 is not satisfied for class StressTest.Test028"; 
			}
			if (StressTest.Test044.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test044 is not satisfied for class StressTest.Test028"; 
			}
			if (StressTest.Test046.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test046 is not satisfied for class StressTest.Test028"; 
			}
			if (StressTest.Test048.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test048 is not satisfied for class StressTest.Test028"; 
			}
			if (StressTest.Test055.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test055 is not satisfied for class StressTest.Test028"; 
			}
			if (StressTest.Test067.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test067 is not satisfied for class StressTest.Test028"; 
			}
			if (StressTest.Test070.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test070 is not satisfied for class StressTest.Test028"; 
			}
			if (StressTest.Test072.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test072 is not satisfied for class StressTest.Test028"; 
			}
			if (StressTest.Test077.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test077 is not satisfied for class StressTest.Test028"; 
			}
			if (StressTest.Test086.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test086 is not satisfied for class StressTest.Test028"; 
			}
	}
})
