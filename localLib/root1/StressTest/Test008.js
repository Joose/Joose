var declared = false;
try {
	declared = typeof StressTest.Test008 == 'function';
} catch (e) {
	
}

if (declared && StressTest.Test008.meta.constructor == Joose.MetaClass) {
    __global__.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test008";
}

Class('StressTest.Test008', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test013',
	       'StressTest.Test018',
	       'StressTest.Test023',
	       'StressTest.Test028',
	       'StressTest.Test052',
	       'StressTest.Test057',
	       'StressTest.Test058',
	       'StressTest.Test065',
	       'StressTest.Test068',
	       'StressTest.Test069',
	       'StressTest.Test078',
	       'StressTest.Test081',
	       'StressTest.Test083',
	       'StressTest.Test086',
	       'StressTest.Test089',
	       'StressTest.Test091',
	       'StressTest.Test096'
	],
	
	methods : {
		result : function () { return 8 }
	},
	
	body : function(){
			if (StressTest.Test013.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test013 is not satisfied for class StressTest.Test008"; 
			}
			if (StressTest.Test018.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test018 is not satisfied for class StressTest.Test008"; 
			}
			if (StressTest.Test023.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test023 is not satisfied for class StressTest.Test008"; 
			}
			if (StressTest.Test028.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test028 is not satisfied for class StressTest.Test008"; 
			}
			if (StressTest.Test052.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test052 is not satisfied for class StressTest.Test008"; 
			}
			if (StressTest.Test057.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test057 is not satisfied for class StressTest.Test008"; 
			}
			if (StressTest.Test058.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test058 is not satisfied for class StressTest.Test008"; 
			}
			if (StressTest.Test065.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test065 is not satisfied for class StressTest.Test008"; 
			}
			if (StressTest.Test068.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test068 is not satisfied for class StressTest.Test008"; 
			}
			if (StressTest.Test069.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test069 is not satisfied for class StressTest.Test008"; 
			}
			if (StressTest.Test078.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test078 is not satisfied for class StressTest.Test008"; 
			}
			if (StressTest.Test081.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test081 is not satisfied for class StressTest.Test008"; 
			}
			if (StressTest.Test083.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test083 is not satisfied for class StressTest.Test008"; 
			}
			if (StressTest.Test086.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test086 is not satisfied for class StressTest.Test008"; 
			}
			if (StressTest.Test089.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test089 is not satisfied for class StressTest.Test008"; 
			}
			if (StressTest.Test091.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test091 is not satisfied for class StressTest.Test008"; 
			}
			if (StressTest.Test096.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test096 is not satisfied for class StressTest.Test008"; 
			}
	}
})
