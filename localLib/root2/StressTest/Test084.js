var declared = false;
try {
	declared = typeof StressTest.Test084 == 'function';
} catch (e) {
	
}

if (declared && StressTest.Test084.meta.meta.isa(Joose.Class)) {
    __global__.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test084";
}

Class('StressTest.Test084', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test086',
	       'StressTest.Test087',
	       'StressTest.Test089',
	       'StressTest.Test091',
	       'StressTest.Test092',
	       'StressTest.Test093',
	       'StressTest.Test094',
	       'StressTest.Test095',
	       'StressTest.Test096',
	       'StressTest.Test097',
	       'StressTest.Test098',
	       'StressTest.Test100'
	],
	
	methods : {
		result : function () { return 84 }
	},
	
	body : function(){
			if (!StressTest.Test086.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test086 is not satisfied for class StressTest.Test084"; 
			}
			if (!StressTest.Test087.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test087 is not satisfied for class StressTest.Test084"; 
			}
			if (!StressTest.Test089.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test089 is not satisfied for class StressTest.Test084"; 
			}
			if (!StressTest.Test091.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test091 is not satisfied for class StressTest.Test084"; 
			}
			if (!StressTest.Test092.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test092 is not satisfied for class StressTest.Test084"; 
			}
			if (!StressTest.Test093.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test093 is not satisfied for class StressTest.Test084"; 
			}
			if (!StressTest.Test094.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test094 is not satisfied for class StressTest.Test084"; 
			}
			if (!StressTest.Test095.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test095 is not satisfied for class StressTest.Test084"; 
			}
			if (!StressTest.Test096.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test096 is not satisfied for class StressTest.Test084"; 
			}
			if (!StressTest.Test097.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test097 is not satisfied for class StressTest.Test084"; 
			}
			if (!StressTest.Test098.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test098 is not satisfied for class StressTest.Test084"; 
			}
			if (!StressTest.Test100.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test100 is not satisfied for class StressTest.Test084"; 
			}
	}
})
