var declared = false;
try {
	declared = typeof StressTest.Test018 == 'function';
} catch (e) {
	
}

if (declared && StressTest.Test018.meta.constructor == Joose.Meta.Class) {
    __global__.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test018";
}

Class('StressTest.Test018', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test020',
	       'StressTest.Test028',
	       'StressTest.Test039',
	       'StressTest.Test041',
	       'StressTest.Test045',
	       'StressTest.Test052',
	       'StressTest.Test053',
	       'StressTest.Test054',
	       'StressTest.Test055',
	       'StressTest.Test056',
	       'StressTest.Test057',
	       'StressTest.Test059',
	       'StressTest.Test066',
	       'StressTest.Test071'
	],
	
	methods : {
		result : function () { return 18 }
	},
	
	body : function(){
			if (StressTest.Test020.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test020 is not satisfied for class StressTest.Test018"; 
			}
			if (StressTest.Test028.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test028 is not satisfied for class StressTest.Test018"; 
			}
			if (StressTest.Test039.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test039 is not satisfied for class StressTest.Test018"; 
			}
			if (StressTest.Test041.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test041 is not satisfied for class StressTest.Test018"; 
			}
			if (StressTest.Test045.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test045 is not satisfied for class StressTest.Test018"; 
			}
			if (StressTest.Test052.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test052 is not satisfied for class StressTest.Test018"; 
			}
			if (StressTest.Test053.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test053 is not satisfied for class StressTest.Test018"; 
			}
			if (StressTest.Test054.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test054 is not satisfied for class StressTest.Test018"; 
			}
			if (StressTest.Test055.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test055 is not satisfied for class StressTest.Test018"; 
			}
			if (StressTest.Test056.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test056 is not satisfied for class StressTest.Test018"; 
			}
			if (StressTest.Test057.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test057 is not satisfied for class StressTest.Test018"; 
			}
			if (StressTest.Test059.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test059 is not satisfied for class StressTest.Test018"; 
			}
			if (StressTest.Test066.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test066 is not satisfied for class StressTest.Test018"; 
			}
			if (StressTest.Test071.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test071 is not satisfied for class StressTest.Test018"; 
			}
	}
})
