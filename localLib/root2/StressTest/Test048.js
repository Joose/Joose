var declared = false;
try {
	declared = typeof StressTest.Test048 == 'function';
} catch (e) {
	
}

if (declared && StressTest.Test048.meta.constructor == Joose.MetaClass) {
    __global__.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test048";
}

Class('StressTest.Test048', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test049',
	       'StressTest.Test057',
	       'StressTest.Test063',
	       'StressTest.Test076',
	       'StressTest.Test080',
	       'StressTest.Test082',
	       'StressTest.Test091',
	       'StressTest.Test095',
	       'StressTest.Test096'
	],
	
	methods : {
		result : function () { return 48 }
	},
	
	body : function(){
			if (StressTest.Test049.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test049 is not satisfied for class StressTest.Test048"; 
			}
			if (StressTest.Test057.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test057 is not satisfied for class StressTest.Test048"; 
			}
			if (StressTest.Test063.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test063 is not satisfied for class StressTest.Test048"; 
			}
			if (StressTest.Test076.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test076 is not satisfied for class StressTest.Test048"; 
			}
			if (StressTest.Test080.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test080 is not satisfied for class StressTest.Test048"; 
			}
			if (StressTest.Test082.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test082 is not satisfied for class StressTest.Test048"; 
			}
			if (StressTest.Test091.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test091 is not satisfied for class StressTest.Test048"; 
			}
			if (StressTest.Test095.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test095 is not satisfied for class StressTest.Test048"; 
			}
			if (StressTest.Test096.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test096 is not satisfied for class StressTest.Test048"; 
			}
	}
})
