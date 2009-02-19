var declared = false;
try {
	declared = typeof StressTest.Test083 == 'function';
} catch (e) {
	
}

if (declared && StressTest.Test083.meta.meta.isa(Joose.Class)) {
    __global__.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test083";
}

Class('StressTest.Test083', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test086',
	       'StressTest.Test087',
	       'StressTest.Test089',
	       'StressTest.Test090',
	       'StressTest.Test091',
	       'StressTest.Test093',
	       'StressTest.Test095',
	       'StressTest.Test097',
	       'StressTest.Test098'
	],
	
	methods : {
		result : function () { return 83 }
	},
	
	body : function(){
			if (!StressTest.Test086.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test086 is not satisfied for class StressTest.Test083"; 
			}
			if (!StressTest.Test087.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test087 is not satisfied for class StressTest.Test083"; 
			}
			if (!StressTest.Test089.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test089 is not satisfied for class StressTest.Test083"; 
			}
			if (!StressTest.Test090.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test090 is not satisfied for class StressTest.Test083"; 
			}
			if (!StressTest.Test091.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test091 is not satisfied for class StressTest.Test083"; 
			}
			if (!StressTest.Test093.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test093 is not satisfied for class StressTest.Test083"; 
			}
			if (!StressTest.Test095.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test095 is not satisfied for class StressTest.Test083"; 
			}
			if (!StressTest.Test097.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test097 is not satisfied for class StressTest.Test083"; 
			}
			if (!StressTest.Test098.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test098 is not satisfied for class StressTest.Test083"; 
			}
	}
})
