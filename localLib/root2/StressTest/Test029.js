var declared = false;
try {
	declared = typeof StressTest.Test029 == 'function';
} catch (e) {
	
}

if (declared && StressTest.Test029.meta.constructor == Joose.Meta.Class) {
    __global__.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test029";
}

Class('StressTest.Test029', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test030',
	       'StressTest.Test042',
	       'StressTest.Test043',
	       'StressTest.Test049',
	       'StressTest.Test057',
	       'StressTest.Test061',
	       'StressTest.Test062',
	       'StressTest.Test071',
	       'StressTest.Test081',
	       'StressTest.Test085',
	       'StressTest.Test091',
	       'StressTest.Test095'
	],
	
	methods : {
		result : function () { return 29 }
	},
	
	body : function(){
			if (StressTest.Test030.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test030 is not satisfied for class StressTest.Test029"; 
			}
			if (StressTest.Test042.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test042 is not satisfied for class StressTest.Test029"; 
			}
			if (StressTest.Test043.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test043 is not satisfied for class StressTest.Test029"; 
			}
			if (StressTest.Test049.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test049 is not satisfied for class StressTest.Test029"; 
			}
			if (StressTest.Test057.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test057 is not satisfied for class StressTest.Test029"; 
			}
			if (StressTest.Test061.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test061 is not satisfied for class StressTest.Test029"; 
			}
			if (StressTest.Test062.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test062 is not satisfied for class StressTest.Test029"; 
			}
			if (StressTest.Test071.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test071 is not satisfied for class StressTest.Test029"; 
			}
			if (StressTest.Test081.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test081 is not satisfied for class StressTest.Test029"; 
			}
			if (StressTest.Test085.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test085 is not satisfied for class StressTest.Test029"; 
			}
			if (StressTest.Test091.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test091 is not satisfied for class StressTest.Test029"; 
			}
			if (StressTest.Test095.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test095 is not satisfied for class StressTest.Test029"; 
			}
	}
})
