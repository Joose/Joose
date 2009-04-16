var declared = false;
try {
	declared = typeof StressTest.Test057 == 'function';
} catch (e) {
	
}

if (declared && StressTest.Test057.meta.constructor == Joose.Meta.Class) {
    __global__.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test057";
}

Class('StressTest.Test057', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test061',
	       'StressTest.Test074',
	       'StressTest.Test078',
	       'StressTest.Test079',
	       'StressTest.Test084',
	       'StressTest.Test085',
	       'StressTest.Test092',
	       'StressTest.Test096',
	       'StressTest.Test100'
	],
	
	methods : {
		result : function () { return 57 }
	},
	
	body : function(){
			if (StressTest.Test061.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test061 is not satisfied for class StressTest.Test057"; 
			}
			if (StressTest.Test074.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test074 is not satisfied for class StressTest.Test057"; 
			}
			if (StressTest.Test078.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test078 is not satisfied for class StressTest.Test057"; 
			}
			if (StressTest.Test079.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test079 is not satisfied for class StressTest.Test057"; 
			}
			if (StressTest.Test084.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test084 is not satisfied for class StressTest.Test057"; 
			}
			if (StressTest.Test085.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test085 is not satisfied for class StressTest.Test057"; 
			}
			if (StressTest.Test092.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test092 is not satisfied for class StressTest.Test057"; 
			}
			if (StressTest.Test096.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test096 is not satisfied for class StressTest.Test057"; 
			}
			if (StressTest.Test100.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test100 is not satisfied for class StressTest.Test057"; 
			}
	}
})
