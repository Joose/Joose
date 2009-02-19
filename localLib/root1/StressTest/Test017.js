var declared = false;
try {
	declared = typeof StressTest.Test017 == 'function';
} catch (e) {
	
}

if (declared && StressTest.Test017.meta.meta.isa(Joose.Class)) {
    StressTest.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test017";
}

Class('StressTest.Test017', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test023',
	       'StressTest.Test039',
	       'StressTest.Test042',
	       'StressTest.Test045',
	       'StressTest.Test078',
	       'StressTest.Test084'
	],
	
	methods : {
		result : function () { return 17 }
	},
	
	body : function(){
			if (!StressTest.Test023.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test023 is not satisfied for class StressTest.Test017"; 
			}
			if (!StressTest.Test039.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test039 is not satisfied for class StressTest.Test017"; 
			}
			if (!StressTest.Test042.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test042 is not satisfied for class StressTest.Test017"; 
			}
			if (!StressTest.Test045.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test045 is not satisfied for class StressTest.Test017"; 
			}
			if (!StressTest.Test078.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test078 is not satisfied for class StressTest.Test017"; 
			}
			if (!StressTest.Test084.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test084 is not satisfied for class StressTest.Test017"; 
			}
	}
})
