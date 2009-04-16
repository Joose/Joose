var declared = false;
try {
	declared = typeof StressTest.Test022 == 'function';
} catch (e) {
	
}

if (declared && StressTest.Test022.meta.constructor == Joose.Meta.Class) {
    __global__.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test022";
}

Class('StressTest.Test022', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test023',
	       'StressTest.Test026',
	       'StressTest.Test043',
	       'StressTest.Test049',
	       'StressTest.Test060',
	       'StressTest.Test064',
	       'StressTest.Test074',
	       'StressTest.Test077',
	       'StressTest.Test084'
	],
	
	methods : {
		result : function () { return 22 }
	},
	
	body : function(){
			if (StressTest.Test023.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test023 is not satisfied for class StressTest.Test022"; 
			}
			if (StressTest.Test026.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test026 is not satisfied for class StressTest.Test022"; 
			}
			if (StressTest.Test043.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test043 is not satisfied for class StressTest.Test022"; 
			}
			if (StressTest.Test049.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test049 is not satisfied for class StressTest.Test022"; 
			}
			if (StressTest.Test060.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test060 is not satisfied for class StressTest.Test022"; 
			}
			if (StressTest.Test064.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test064 is not satisfied for class StressTest.Test022"; 
			}
			if (StressTest.Test074.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test074 is not satisfied for class StressTest.Test022"; 
			}
			if (StressTest.Test077.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test077 is not satisfied for class StressTest.Test022"; 
			}
			if (StressTest.Test084.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test084 is not satisfied for class StressTest.Test022"; 
			}
	}
})
