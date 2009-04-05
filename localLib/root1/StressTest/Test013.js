var declared = false;
try {
	declared = typeof StressTest.Test013 == 'function';
} catch (e) {
	
}

if (declared && StressTest.Test013.meta.constructor == Joose.MetaClass) {
    __global__.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test013";
}

Class('StressTest.Test013', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test022',
	       'StressTest.Test026',
	       'StressTest.Test028',
	       'StressTest.Test030',
	       'StressTest.Test039',
	       'StressTest.Test045',
	       'StressTest.Test049',
	       'StressTest.Test053',
	       'StressTest.Test058',
	       'StressTest.Test059',
	       'StressTest.Test065',
	       'StressTest.Test071',
	       'StressTest.Test085',
	       'StressTest.Test089'
	],
	
	methods : {
		result : function () { return 13 }
	},
	
	body : function(){
			if (StressTest.Test022.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test022 is not satisfied for class StressTest.Test013"; 
			}
			if (StressTest.Test026.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test026 is not satisfied for class StressTest.Test013"; 
			}
			if (StressTest.Test028.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test028 is not satisfied for class StressTest.Test013"; 
			}
			if (StressTest.Test030.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test030 is not satisfied for class StressTest.Test013"; 
			}
			if (StressTest.Test039.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test039 is not satisfied for class StressTest.Test013"; 
			}
			if (StressTest.Test045.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test045 is not satisfied for class StressTest.Test013"; 
			}
			if (StressTest.Test049.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test049 is not satisfied for class StressTest.Test013"; 
			}
			if (StressTest.Test053.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test053 is not satisfied for class StressTest.Test013"; 
			}
			if (StressTest.Test058.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test058 is not satisfied for class StressTest.Test013"; 
			}
			if (StressTest.Test059.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test059 is not satisfied for class StressTest.Test013"; 
			}
			if (StressTest.Test065.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test065 is not satisfied for class StressTest.Test013"; 
			}
			if (StressTest.Test071.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test071 is not satisfied for class StressTest.Test013"; 
			}
			if (StressTest.Test085.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test085 is not satisfied for class StressTest.Test013"; 
			}
			if (StressTest.Test089.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test089 is not satisfied for class StressTest.Test013"; 
			}
	}
})
