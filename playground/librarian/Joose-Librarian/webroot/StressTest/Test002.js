var declared = false;
try {
	declared = typeof StressTest.Test002 == 'function';
} catch (e) {
	
}

if (declared && StressTest.Test002.meta.meta.isa(Joose.Class)) {
    StressTest.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test002";
}

Class('StressTest.Test002', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test015',
	       'StressTest.Test022',
	       'StressTest.Test041',
	       'StressTest.Test045',
	       'StressTest.Test059',
	       'StressTest.Test083',
	       'StressTest.Test086'
	],
	
	methods : {
		result : function () { return 2 }
	},
	
	body : function(){
			if (!StressTest.Test015.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test015 is not satisfied for class StressTest.Test002"; 
			}
			if (!StressTest.Test022.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test022 is not satisfied for class StressTest.Test002"; 
			}
			if (!StressTest.Test041.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test041 is not satisfied for class StressTest.Test002"; 
			}
			if (!StressTest.Test045.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test045 is not satisfied for class StressTest.Test002"; 
			}
			if (!StressTest.Test059.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test059 is not satisfied for class StressTest.Test002"; 
			}
			if (!StressTest.Test083.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test083 is not satisfied for class StressTest.Test002"; 
			}
			if (!StressTest.Test086.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test086 is not satisfied for class StressTest.Test002"; 
			}
	}
})
