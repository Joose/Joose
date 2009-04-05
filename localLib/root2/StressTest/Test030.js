var declared = false;
try {
	declared = typeof StressTest.Test030 == 'function';
} catch (e) {
	
}

if (declared && StressTest.Test030.meta.constructor == Joose.MetaClass) {
    __global__.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test030";
}

Class('StressTest.Test030', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test032',
	       'StressTest.Test034',
	       'StressTest.Test052',
	       'StressTest.Test053',
	       'StressTest.Test058',
	       'StressTest.Test074',
	       'StressTest.Test088',
	       'StressTest.Test096'
	],
	
	methods : {
		result : function () { return 30 }
	},
	
	body : function(){
			if (StressTest.Test032.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test032 is not satisfied for class StressTest.Test030"; 
			}
			if (StressTest.Test034.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test034 is not satisfied for class StressTest.Test030"; 
			}
			if (StressTest.Test052.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test052 is not satisfied for class StressTest.Test030"; 
			}
			if (StressTest.Test053.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test053 is not satisfied for class StressTest.Test030"; 
			}
			if (StressTest.Test058.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test058 is not satisfied for class StressTest.Test030"; 
			}
			if (StressTest.Test074.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test074 is not satisfied for class StressTest.Test030"; 
			}
			if (StressTest.Test088.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test088 is not satisfied for class StressTest.Test030"; 
			}
			if (StressTest.Test096.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test096 is not satisfied for class StressTest.Test030"; 
			}
	}
})
