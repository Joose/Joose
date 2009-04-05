var declared = false;
try {
	declared = typeof StressTest.Test070 == 'function';
} catch (e) {
	
}

if (declared && StressTest.Test070.meta.constructor == Joose.MetaClass) {
    __global__.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test070";
}

Class('StressTest.Test070', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test071',
	       'StressTest.Test072',
	       'StressTest.Test076',
	       'StressTest.Test080',
	       'StressTest.Test087',
	       'StressTest.Test088',
	       'StressTest.Test091',
	       'StressTest.Test093',
	       'StressTest.Test094',
	       'StressTest.Test096',
	       'StressTest.Test097',
	       'StressTest.Test100'
	],
	
	methods : {
		result : function () { return 70 }
	},
	
	body : function(){
			if (StressTest.Test071.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test071 is not satisfied for class StressTest.Test070"; 
			}
			if (StressTest.Test072.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test072 is not satisfied for class StressTest.Test070"; 
			}
			if (StressTest.Test076.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test076 is not satisfied for class StressTest.Test070"; 
			}
			if (StressTest.Test080.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test080 is not satisfied for class StressTest.Test070"; 
			}
			if (StressTest.Test087.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test087 is not satisfied for class StressTest.Test070"; 
			}
			if (StressTest.Test088.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test088 is not satisfied for class StressTest.Test070"; 
			}
			if (StressTest.Test091.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test091 is not satisfied for class StressTest.Test070"; 
			}
			if (StressTest.Test093.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test093 is not satisfied for class StressTest.Test070"; 
			}
			if (StressTest.Test094.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test094 is not satisfied for class StressTest.Test070"; 
			}
			if (StressTest.Test096.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test096 is not satisfied for class StressTest.Test070"; 
			}
			if (StressTest.Test097.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test097 is not satisfied for class StressTest.Test070"; 
			}
			if (StressTest.Test100.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test100 is not satisfied for class StressTest.Test070"; 
			}
	}
})
