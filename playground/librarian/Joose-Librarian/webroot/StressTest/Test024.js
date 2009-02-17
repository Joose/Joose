
try {
	if (typeof StressTest.Test024 == 'function' && StressTest.Test024.meta.meta.isa(Joose.Class)) {
		StressTest.doubleDeclarations = true;
		throw "Double declaration of StressTest.Test024";
	}
} catch (e) {
	
}

Class('StressTest.Test024', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test025',
	       'StressTest.Test036',
	       'StressTest.Test056',
	       'StressTest.Test066',
	       'StressTest.Test069',
	       'StressTest.Test091'
	],
	
	methods : {
		result : function () { return 24 }
	},
	
	body : function(){
			if (!StressTest.Test025.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test025 is not satisfied for class StressTest.Test024"; 
			}
			if (!StressTest.Test036.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test036 is not satisfied for class StressTest.Test024"; 
			}
			if (!StressTest.Test056.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test056 is not satisfied for class StressTest.Test024"; 
			}
			if (!StressTest.Test066.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test066 is not satisfied for class StressTest.Test024"; 
			}
			if (!StressTest.Test069.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test069 is not satisfied for class StressTest.Test024"; 
			}
			if (!StressTest.Test091.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test091 is not satisfied for class StressTest.Test024"; 
			}
	}
})
