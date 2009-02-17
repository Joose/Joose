var declared = false;
try {
	declared = typeof StressTest.Test010 == 'function';
} catch (e) {
	
}

if (declared && StressTest.Test010.meta.meta.isa(Joose.Class)) {
    StressTest.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test010";
}

Class('StressTest.Test010', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test016',
	       'StressTest.Test025',
	       'StressTest.Test031',
	       'StressTest.Test034',
	       'StressTest.Test037',
	       'StressTest.Test040',
	       'StressTest.Test052',
	       'StressTest.Test053',
	       'StressTest.Test061',
	       'StressTest.Test064',
	       'StressTest.Test073',
	       'StressTest.Test082',
	       'StressTest.Test086'
	],
	
	methods : {
		result : function () { return 10 }
	},
	
	body : function(){
			if (!StressTest.Test016.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test016 is not satisfied for class StressTest.Test010"; 
			}
			if (!StressTest.Test025.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test025 is not satisfied for class StressTest.Test010"; 
			}
			if (!StressTest.Test031.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test031 is not satisfied for class StressTest.Test010"; 
			}
			if (!StressTest.Test034.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test034 is not satisfied for class StressTest.Test010"; 
			}
			if (!StressTest.Test037.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test037 is not satisfied for class StressTest.Test010"; 
			}
			if (!StressTest.Test040.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test040 is not satisfied for class StressTest.Test010"; 
			}
			if (!StressTest.Test052.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test052 is not satisfied for class StressTest.Test010"; 
			}
			if (!StressTest.Test053.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test053 is not satisfied for class StressTest.Test010"; 
			}
			if (!StressTest.Test061.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test061 is not satisfied for class StressTest.Test010"; 
			}
			if (!StressTest.Test064.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test064 is not satisfied for class StressTest.Test010"; 
			}
			if (!StressTest.Test073.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test073 is not satisfied for class StressTest.Test010"; 
			}
			if (!StressTest.Test082.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test082 is not satisfied for class StressTest.Test010"; 
			}
			if (!StressTest.Test086.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test086 is not satisfied for class StressTest.Test010"; 
			}
	}
})
