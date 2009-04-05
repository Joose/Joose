var declared = false;
try {
	declared = typeof StressTest.Test052 == 'function';
} catch (e) {
	
}

if (declared && StressTest.Test052.meta.constructor == Joose.MetaClass) {
    __global__.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test052";
}

Class('StressTest.Test052', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test063',
	       'StressTest.Test070',
	       'StressTest.Test074',
	       'StressTest.Test077',
	       'StressTest.Test081',
	       'StressTest.Test084',
	       'StressTest.Test086',
	       'StressTest.Test088',
	       'StressTest.Test090',
	       'StressTest.Test092',
	       'StressTest.Test094',
	       'StressTest.Test098',
	       'StressTest.Test099'
	],
	
	methods : {
		result : function () { return 52 }
	},
	
	body : function(){
			if (StressTest.Test063.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test063 is not satisfied for class StressTest.Test052"; 
			}
			if (StressTest.Test070.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test070 is not satisfied for class StressTest.Test052"; 
			}
			if (StressTest.Test074.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test074 is not satisfied for class StressTest.Test052"; 
			}
			if (StressTest.Test077.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test077 is not satisfied for class StressTest.Test052"; 
			}
			if (StressTest.Test081.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test081 is not satisfied for class StressTest.Test052"; 
			}
			if (StressTest.Test084.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test084 is not satisfied for class StressTest.Test052"; 
			}
			if (StressTest.Test086.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test086 is not satisfied for class StressTest.Test052"; 
			}
			if (StressTest.Test088.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test088 is not satisfied for class StressTest.Test052"; 
			}
			if (StressTest.Test090.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test090 is not satisfied for class StressTest.Test052"; 
			}
			if (StressTest.Test092.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test092 is not satisfied for class StressTest.Test052"; 
			}
			if (StressTest.Test094.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test094 is not satisfied for class StressTest.Test052"; 
			}
			if (StressTest.Test098.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test098 is not satisfied for class StressTest.Test052"; 
			}
			if (StressTest.Test099.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test099 is not satisfied for class StressTest.Test052"; 
			}
	}
})
