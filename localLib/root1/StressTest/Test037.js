var declared = false;
try {
	declared = typeof StressTest.Test037 == 'function';
} catch (e) {
	
}

if (declared && StressTest.Test037.meta.constructor == Joose.Meta.Class) {
    __global__.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test037";
}

Class('StressTest.Test037', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test042',
	       'StressTest.Test043',
	       'StressTest.Test055',
	       'StressTest.Test063',
	       'StressTest.Test067',
	       'StressTest.Test072',
	       'StressTest.Test077',
	       'StressTest.Test081',
	       'StressTest.Test085',
	       'StressTest.Test086',
	       'StressTest.Test092'
	],
	
	methods : {
		result : function () { return 37 }
	},
	
	body : function(){
			if (StressTest.Test042.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test042 is not satisfied for class StressTest.Test037"; 
			}
			if (StressTest.Test043.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test043 is not satisfied for class StressTest.Test037"; 
			}
			if (StressTest.Test055.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test055 is not satisfied for class StressTest.Test037"; 
			}
			if (StressTest.Test063.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test063 is not satisfied for class StressTest.Test037"; 
			}
			if (StressTest.Test067.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test067 is not satisfied for class StressTest.Test037"; 
			}
			if (StressTest.Test072.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test072 is not satisfied for class StressTest.Test037"; 
			}
			if (StressTest.Test077.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test077 is not satisfied for class StressTest.Test037"; 
			}
			if (StressTest.Test081.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test081 is not satisfied for class StressTest.Test037"; 
			}
			if (StressTest.Test085.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test085 is not satisfied for class StressTest.Test037"; 
			}
			if (StressTest.Test086.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test086 is not satisfied for class StressTest.Test037"; 
			}
			if (StressTest.Test092.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test092 is not satisfied for class StressTest.Test037"; 
			}
	}
})
