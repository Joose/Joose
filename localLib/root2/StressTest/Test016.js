var declared = false;
try {
	declared = typeof StressTest.Test016 == 'function';
} catch (e) {
	
}

if (declared && StressTest.Test016.meta.constructor == Joose.Meta.Class) {
    __global__.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test016";
}

Class('StressTest.Test016', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test051',
	       'StressTest.Test056',
	       'StressTest.Test063',
	       'StressTest.Test070',
	       'StressTest.Test082',
	       'StressTest.Test091'
	],
	
	methods : {
		result : function () { return 16 }
	},
	
	body : function(){
			if (StressTest.Test051.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test051 is not satisfied for class StressTest.Test016"; 
			}
			if (StressTest.Test056.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test056 is not satisfied for class StressTest.Test016"; 
			}
			if (StressTest.Test063.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test063 is not satisfied for class StressTest.Test016"; 
			}
			if (StressTest.Test070.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test070 is not satisfied for class StressTest.Test016"; 
			}
			if (StressTest.Test082.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test082 is not satisfied for class StressTest.Test016"; 
			}
			if (StressTest.Test091.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test091 is not satisfied for class StressTest.Test016"; 
			}
	}
})
