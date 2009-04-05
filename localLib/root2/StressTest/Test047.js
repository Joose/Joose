var declared = false;
try {
	declared = typeof StressTest.Test047 == 'function';
} catch (e) {
	
}

if (declared && StressTest.Test047.meta.constructor == Joose.MetaClass) {
    __global__.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test047";
}

Class('StressTest.Test047', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test055',
	       'StressTest.Test066',
	       'StressTest.Test067',
	       'StressTest.Test068',
	       'StressTest.Test069',
	       'StressTest.Test070',
	       'StressTest.Test080',
	       'StressTest.Test085',
	       'StressTest.Test089',
	       'StressTest.Test091',
	       'StressTest.Test097'
	],
	
	methods : {
		result : function () { return 47 }
	},
	
	body : function(){
			if (StressTest.Test055.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test055 is not satisfied for class StressTest.Test047"; 
			}
			if (StressTest.Test066.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test066 is not satisfied for class StressTest.Test047"; 
			}
			if (StressTest.Test067.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test067 is not satisfied for class StressTest.Test047"; 
			}
			if (StressTest.Test068.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test068 is not satisfied for class StressTest.Test047"; 
			}
			if (StressTest.Test069.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test069 is not satisfied for class StressTest.Test047"; 
			}
			if (StressTest.Test070.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test070 is not satisfied for class StressTest.Test047"; 
			}
			if (StressTest.Test080.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test080 is not satisfied for class StressTest.Test047"; 
			}
			if (StressTest.Test085.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test085 is not satisfied for class StressTest.Test047"; 
			}
			if (StressTest.Test089.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test089 is not satisfied for class StressTest.Test047"; 
			}
			if (StressTest.Test091.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test091 is not satisfied for class StressTest.Test047"; 
			}
			if (StressTest.Test097.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test097 is not satisfied for class StressTest.Test047"; 
			}
	}
})
