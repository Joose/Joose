var declared = false;
try {
	declared = typeof StressTest.Test068 == 'function';
} catch (e) {
	
}

if (declared && StressTest.Test068.meta.meta.isa(Joose.Class)) {
    __global__.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test068";
}

Class('StressTest.Test068', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test077',
	       'StressTest.Test079',
	       'StressTest.Test080',
	       'StressTest.Test081',
	       'StressTest.Test082',
	       'StressTest.Test087',
	       'StressTest.Test091',
	       'StressTest.Test097',
	       'StressTest.Test098'
	],
	
	methods : {
		result : function () { return 68 }
	},
	
	body : function(){
			if (!StressTest.Test077.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test077 is not satisfied for class StressTest.Test068"; 
			}
			if (!StressTest.Test079.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test079 is not satisfied for class StressTest.Test068"; 
			}
			if (!StressTest.Test080.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test080 is not satisfied for class StressTest.Test068"; 
			}
			if (!StressTest.Test081.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test081 is not satisfied for class StressTest.Test068"; 
			}
			if (!StressTest.Test082.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test082 is not satisfied for class StressTest.Test068"; 
			}
			if (!StressTest.Test087.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test087 is not satisfied for class StressTest.Test068"; 
			}
			if (!StressTest.Test091.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test091 is not satisfied for class StressTest.Test068"; 
			}
			if (!StressTest.Test097.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test097 is not satisfied for class StressTest.Test068"; 
			}
			if (!StressTest.Test098.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test098 is not satisfied for class StressTest.Test068"; 
			}
	}
})
