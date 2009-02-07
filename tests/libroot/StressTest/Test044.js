if (typeof StressTest.Test044 == 'function' && StressTest.Test044.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test044";
}

Class('StressTest.Test044', {
	use : [ 
	       'StressTest.Test054',
	       'StressTest.Test061',
	       'StressTest.Test066',
	       'StressTest.Test067',
	       'StressTest.Test074',
	       'StressTest.Test075',
	       'StressTest.Test078',
	       'StressTest.Test079',
	       'StressTest.Test086',
	       'StressTest.Test087'
	],
	
	methods : {
		result : function () { return 44 }
	},
	
	body : function(){
			if (!StressTest.Test054.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test054 is not satisfied for class StressTest.Test044"; 
			}
			if (!StressTest.Test061.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test061 is not satisfied for class StressTest.Test044"; 
			}
			if (!StressTest.Test066.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test066 is not satisfied for class StressTest.Test044"; 
			}
			if (!StressTest.Test067.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test067 is not satisfied for class StressTest.Test044"; 
			}
			if (!StressTest.Test074.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test074 is not satisfied for class StressTest.Test044"; 
			}
			if (!StressTest.Test075.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test075 is not satisfied for class StressTest.Test044"; 
			}
			if (!StressTest.Test078.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test078 is not satisfied for class StressTest.Test044"; 
			}
			if (!StressTest.Test079.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test079 is not satisfied for class StressTest.Test044"; 
			}
			if (!StressTest.Test086.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test086 is not satisfied for class StressTest.Test044"; 
			}
			if (!StressTest.Test087.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test087 is not satisfied for class StressTest.Test044"; 
			}
	}
})
