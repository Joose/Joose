var declared = false;
try {
	declared = typeof StressTest.Test060 == 'function';
} catch (e) {
	
}

if (declared && StressTest.Test060.meta.constructor == Joose.MetaClass) {
    __global__.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test060";
}

Class('StressTest.Test060', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test064',
	       'StressTest.Test066',
	       'StressTest.Test068',
	       'StressTest.Test072',
	       'StressTest.Test077',
	       'StressTest.Test079',
	       'StressTest.Test080',
	       'StressTest.Test086',
	       'StressTest.Test094'
	],
	
	methods : {
		result : function () { return 60 }
	},
	
	body : function(){
			if (StressTest.Test064.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test064 is not satisfied for class StressTest.Test060"; 
			}
			if (StressTest.Test066.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test066 is not satisfied for class StressTest.Test060"; 
			}
			if (StressTest.Test068.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test068 is not satisfied for class StressTest.Test060"; 
			}
			if (StressTest.Test072.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test072 is not satisfied for class StressTest.Test060"; 
			}
			if (StressTest.Test077.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test077 is not satisfied for class StressTest.Test060"; 
			}
			if (StressTest.Test079.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test079 is not satisfied for class StressTest.Test060"; 
			}
			if (StressTest.Test080.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test080 is not satisfied for class StressTest.Test060"; 
			}
			if (StressTest.Test086.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test086 is not satisfied for class StressTest.Test060"; 
			}
			if (StressTest.Test094.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test094 is not satisfied for class StressTest.Test060"; 
			}
	}
})
