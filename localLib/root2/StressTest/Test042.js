var declared = false;
try {
	declared = typeof StressTest.Test042 == 'function';
} catch (e) {
	
}

if (declared && StressTest.Test042.meta.constructor == Joose.MetaClass) {
    __global__.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test042";
}

Class('StressTest.Test042', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test044',
	       'StressTest.Test049',
	       'StressTest.Test052',
	       'StressTest.Test053',
	       'StressTest.Test059',
	       'StressTest.Test062',
	       'StressTest.Test063',
	       'StressTest.Test076',
	       'StressTest.Test078',
	       'StressTest.Test082',
	       'StressTest.Test084'
	],
	
	methods : {
		result : function () { return 42 }
	},
	
	body : function(){
			if (StressTest.Test044.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test044 is not satisfied for class StressTest.Test042"; 
			}
			if (StressTest.Test049.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test049 is not satisfied for class StressTest.Test042"; 
			}
			if (StressTest.Test052.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test052 is not satisfied for class StressTest.Test042"; 
			}
			if (StressTest.Test053.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test053 is not satisfied for class StressTest.Test042"; 
			}
			if (StressTest.Test059.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test059 is not satisfied for class StressTest.Test042"; 
			}
			if (StressTest.Test062.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test062 is not satisfied for class StressTest.Test042"; 
			}
			if (StressTest.Test063.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test063 is not satisfied for class StressTest.Test042"; 
			}
			if (StressTest.Test076.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test076 is not satisfied for class StressTest.Test042"; 
			}
			if (StressTest.Test078.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test078 is not satisfied for class StressTest.Test042"; 
			}
			if (StressTest.Test082.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test082 is not satisfied for class StressTest.Test042"; 
			}
			if (StressTest.Test084.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test084 is not satisfied for class StressTest.Test042"; 
			}
	}
})
