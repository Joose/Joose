var declared = false;
try {
	declared = typeof StressTest.Test069 == 'function';
} catch (e) {
	
}

if (declared && StressTest.Test069.meta.constructor == Joose.MetaClass) {
    __global__.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test069";
}

Class('StressTest.Test069', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test070',
	       'StressTest.Test075',
	       'StressTest.Test077',
	       'StressTest.Test078',
	       'StressTest.Test079',
	       'StressTest.Test083',
	       'StressTest.Test087',
	       'StressTest.Test088',
	       'StressTest.Test090',
	       'StressTest.Test091',
	       'StressTest.Test092',
	       'StressTest.Test093'
	],
	
	methods : {
		result : function () { return 69 }
	},
	
	body : function(){
			if (StressTest.Test070.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test070 is not satisfied for class StressTest.Test069"; 
			}
			if (StressTest.Test075.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test075 is not satisfied for class StressTest.Test069"; 
			}
			if (StressTest.Test077.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test077 is not satisfied for class StressTest.Test069"; 
			}
			if (StressTest.Test078.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test078 is not satisfied for class StressTest.Test069"; 
			}
			if (StressTest.Test079.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test079 is not satisfied for class StressTest.Test069"; 
			}
			if (StressTest.Test083.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test083 is not satisfied for class StressTest.Test069"; 
			}
			if (StressTest.Test087.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test087 is not satisfied for class StressTest.Test069"; 
			}
			if (StressTest.Test088.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test088 is not satisfied for class StressTest.Test069"; 
			}
			if (StressTest.Test090.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test090 is not satisfied for class StressTest.Test069"; 
			}
			if (StressTest.Test091.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test091 is not satisfied for class StressTest.Test069"; 
			}
			if (StressTest.Test092.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test092 is not satisfied for class StressTest.Test069"; 
			}
			if (StressTest.Test093.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test093 is not satisfied for class StressTest.Test069"; 
			}
	}
})
