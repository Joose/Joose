var declared = false;
try {
	declared = typeof StressTest.Test051 == 'function';
} catch (e) {
	
}

if (declared && StressTest.Test051.meta.constructor == Joose.MetaClass) {
    __global__.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test051";
}

Class('StressTest.Test051', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test053',
	       'StressTest.Test061',
	       'StressTest.Test066',
	       'StressTest.Test073',
	       'StressTest.Test075',
	       'StressTest.Test080',
	       'StressTest.Test081',
	       'StressTest.Test083',
	       'StressTest.Test088',
	       'StressTest.Test092',
	       'StressTest.Test097',
	       'StressTest.Test100'
	],
	
	methods : {
		result : function () { return 51 }
	},
	
	body : function(){
			if (StressTest.Test053.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test053 is not satisfied for class StressTest.Test051"; 
			}
			if (StressTest.Test061.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test061 is not satisfied for class StressTest.Test051"; 
			}
			if (StressTest.Test066.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test066 is not satisfied for class StressTest.Test051"; 
			}
			if (StressTest.Test073.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test073 is not satisfied for class StressTest.Test051"; 
			}
			if (StressTest.Test075.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test075 is not satisfied for class StressTest.Test051"; 
			}
			if (StressTest.Test080.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test080 is not satisfied for class StressTest.Test051"; 
			}
			if (StressTest.Test081.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test081 is not satisfied for class StressTest.Test051"; 
			}
			if (StressTest.Test083.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test083 is not satisfied for class StressTest.Test051"; 
			}
			if (StressTest.Test088.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test088 is not satisfied for class StressTest.Test051"; 
			}
			if (StressTest.Test092.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test092 is not satisfied for class StressTest.Test051"; 
			}
			if (StressTest.Test097.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test097 is not satisfied for class StressTest.Test051"; 
			}
			if (StressTest.Test100.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test100 is not satisfied for class StressTest.Test051"; 
			}
	}
})
