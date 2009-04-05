var declared = false;
try {
	declared = typeof StressTest.Test055 == 'function';
} catch (e) {
	
}

if (declared && StressTest.Test055.meta.constructor == Joose.MetaClass) {
    __global__.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test055";
}

Class('StressTest.Test055', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test057',
	       'StressTest.Test062',
	       'StressTest.Test065',
	       'StressTest.Test068',
	       'StressTest.Test069',
	       'StressTest.Test085',
	       'StressTest.Test087',
	       'StressTest.Test096'
	],
	
	methods : {
		result : function () { return 55 }
	},
	
	body : function(){
			if (StressTest.Test057.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test057 is not satisfied for class StressTest.Test055"; 
			}
			if (StressTest.Test062.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test062 is not satisfied for class StressTest.Test055"; 
			}
			if (StressTest.Test065.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test065 is not satisfied for class StressTest.Test055"; 
			}
			if (StressTest.Test068.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test068 is not satisfied for class StressTest.Test055"; 
			}
			if (StressTest.Test069.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test069 is not satisfied for class StressTest.Test055"; 
			}
			if (StressTest.Test085.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test085 is not satisfied for class StressTest.Test055"; 
			}
			if (StressTest.Test087.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test087 is not satisfied for class StressTest.Test055"; 
			}
			if (StressTest.Test096.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test096 is not satisfied for class StressTest.Test055"; 
			}
	}
})
