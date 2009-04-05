var declared = false;
try {
	declared = typeof StressTest.Test009 == 'function';
} catch (e) {
	
}

if (declared && StressTest.Test009.meta.constructor == Joose.MetaClass) {
    __global__.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test009";
}

Class('StressTest.Test009', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test058',
	       'StressTest.Test098'
	],
	
	methods : {
		result : function () { return 9 }
	},
	
	body : function(){
			if (StressTest.Test058.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test058 is not satisfied for class StressTest.Test009"; 
			}
			if (StressTest.Test098.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test098 is not satisfied for class StressTest.Test009"; 
			}
	}
})
