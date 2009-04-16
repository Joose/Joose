var declared = false;
try {
	declared = typeof StressTest.Test062 == 'function';
} catch (e) {
	
}

if (declared && StressTest.Test062.meta.constructor == Joose.Meta.Class) {
    __global__.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test062";
}

Class('StressTest.Test062', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test063',
	       'StressTest.Test069',
	       'StressTest.Test072',
	       'StressTest.Test079',
	       'StressTest.Test080',
	       'StressTest.Test084',
	       'StressTest.Test086',
	       'StressTest.Test087',
	       'StressTest.Test091',
	       'StressTest.Test095',
	       'StressTest.Test098',
	       'StressTest.Test100'
	],
	
	methods : {
		result : function () { return 62 }
	},
	
	body : function(){
			if (StressTest.Test063.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test063 is not satisfied for class StressTest.Test062"; 
			}
			if (StressTest.Test069.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test069 is not satisfied for class StressTest.Test062"; 
			}
			if (StressTest.Test072.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test072 is not satisfied for class StressTest.Test062"; 
			}
			if (StressTest.Test079.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test079 is not satisfied for class StressTest.Test062"; 
			}
			if (StressTest.Test080.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test080 is not satisfied for class StressTest.Test062"; 
			}
			if (StressTest.Test084.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test084 is not satisfied for class StressTest.Test062"; 
			}
			if (StressTest.Test086.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test086 is not satisfied for class StressTest.Test062"; 
			}
			if (StressTest.Test087.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test087 is not satisfied for class StressTest.Test062"; 
			}
			if (StressTest.Test091.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test091 is not satisfied for class StressTest.Test062"; 
			}
			if (StressTest.Test095.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test095 is not satisfied for class StressTest.Test062"; 
			}
			if (StressTest.Test098.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test098 is not satisfied for class StressTest.Test062"; 
			}
			if (StressTest.Test100.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test100 is not satisfied for class StressTest.Test062"; 
			}
	}
})
