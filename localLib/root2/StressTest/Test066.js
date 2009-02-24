var declared = false;
try {
	declared = typeof StressTest.Test066 == 'function';
} catch (e) {
	
}

if (declared && StressTest.Test066.meta.meta.isa(Joose.Class)) {
    __global__.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test066";
}

Class('StressTest.Test066', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test069',
	       'StressTest.Test071',
	       'StressTest.Test080',
	       'StressTest.Test086',
	       'StressTest.Test093',
	       'StressTest.Test094',
	       'StressTest.Test096'
	],
	
	methods : {
		result : function () { return 66 }
	},
	
	body : function(){
			if (!StressTest.Test069.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test069 is not satisfied for class StressTest.Test066"; 
			}
			if (!StressTest.Test071.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test071 is not satisfied for class StressTest.Test066"; 
			}
			if (!StressTest.Test080.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test080 is not satisfied for class StressTest.Test066"; 
			}
			if (!StressTest.Test086.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test086 is not satisfied for class StressTest.Test066"; 
			}
			if (!StressTest.Test093.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test093 is not satisfied for class StressTest.Test066"; 
			}
			if (!StressTest.Test094.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test094 is not satisfied for class StressTest.Test066"; 
			}
			if (!StressTest.Test096.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test096 is not satisfied for class StressTest.Test066"; 
			}
	}
})
