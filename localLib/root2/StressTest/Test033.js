var declared = false;
try {
	declared = typeof StressTest.Test033 == 'function';
} catch (e) {
	
}

if (declared && StressTest.Test033.meta.constructor == Joose.MetaClass) {
    __global__.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test033";
}

Class('StressTest.Test033', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test034',
	       'StressTest.Test036',
	       'StressTest.Test045',
	       'StressTest.Test057',
	       'StressTest.Test059',
	       'StressTest.Test068',
	       'StressTest.Test073',
	       'StressTest.Test077',
	       'StressTest.Test081',
	       'StressTest.Test084',
	       'StressTest.Test094'
	],
	
	methods : {
		result : function () { return 33 }
	},
	
	body : function(){
			if (StressTest.Test034.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test034 is not satisfied for class StressTest.Test033"; 
			}
			if (StressTest.Test036.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test036 is not satisfied for class StressTest.Test033"; 
			}
			if (StressTest.Test045.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test045 is not satisfied for class StressTest.Test033"; 
			}
			if (StressTest.Test057.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test057 is not satisfied for class StressTest.Test033"; 
			}
			if (StressTest.Test059.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test059 is not satisfied for class StressTest.Test033"; 
			}
			if (StressTest.Test068.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test068 is not satisfied for class StressTest.Test033"; 
			}
			if (StressTest.Test073.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test073 is not satisfied for class StressTest.Test033"; 
			}
			if (StressTest.Test077.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test077 is not satisfied for class StressTest.Test033"; 
			}
			if (StressTest.Test081.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test081 is not satisfied for class StressTest.Test033"; 
			}
			if (StressTest.Test084.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test084 is not satisfied for class StressTest.Test033"; 
			}
			if (StressTest.Test094.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test094 is not satisfied for class StressTest.Test033"; 
			}
	}
})
