var declared = false;
try {
	declared = typeof StressTest.Test004 == 'function';
} catch (e) {
	
}

if (declared && StressTest.Test004.meta.constructor == Joose.MetaClass) {
    __global__.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test004";
}

Class('StressTest.Test004', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test019',
	       'StressTest.Test033',
	       'StressTest.Test059',
	       'StressTest.Test061',
	       'StressTest.Test079',
	       'StressTest.Test080',
	       'StressTest.Test081',
	       'StressTest.Test086',
	       'StressTest.Test091',
	       'StressTest.Test097',
	       'StressTest.Test100'
	],
	
	methods : {
		result : function () { return 4 }
	},
	
	body : function(){
			if (StressTest.Test019.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test019 is not satisfied for class StressTest.Test004"; 
			}
			if (StressTest.Test033.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test033 is not satisfied for class StressTest.Test004"; 
			}
			if (StressTest.Test059.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test059 is not satisfied for class StressTest.Test004"; 
			}
			if (StressTest.Test061.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test061 is not satisfied for class StressTest.Test004"; 
			}
			if (StressTest.Test079.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test079 is not satisfied for class StressTest.Test004"; 
			}
			if (StressTest.Test080.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test080 is not satisfied for class StressTest.Test004"; 
			}
			if (StressTest.Test081.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test081 is not satisfied for class StressTest.Test004"; 
			}
			if (StressTest.Test086.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test086 is not satisfied for class StressTest.Test004"; 
			}
			if (StressTest.Test091.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test091 is not satisfied for class StressTest.Test004"; 
			}
			if (StressTest.Test097.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test097 is not satisfied for class StressTest.Test004"; 
			}
			if (StressTest.Test100.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test100 is not satisfied for class StressTest.Test004"; 
			}
	}
})
