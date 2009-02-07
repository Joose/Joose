if (typeof StressTest.Test073 == 'function' && StressTest.Test073.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test073";
}

Class('StressTest.Test073', {
	use : [ 
	       'StressTest.Test074',
	       'StressTest.Test076',
	       'StressTest.Test078',
	       'StressTest.Test079',
	       'StressTest.Test080',
	       'StressTest.Test081',
	       'StressTest.Test085',
	       'StressTest.Test086',
	       'StressTest.Test087',
	       'StressTest.Test096',
	       'StressTest.Test100'
	],
	
	methods : {
		result : function () { return 73 }
	},
	
	body : function(){
			if (!StressTest.Test074.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test074 is not satisfied for class StressTest.Test073"; 
			}
			if (!StressTest.Test076.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test076 is not satisfied for class StressTest.Test073"; 
			}
			if (!StressTest.Test078.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test078 is not satisfied for class StressTest.Test073"; 
			}
			if (!StressTest.Test079.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test079 is not satisfied for class StressTest.Test073"; 
			}
			if (!StressTest.Test080.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test080 is not satisfied for class StressTest.Test073"; 
			}
			if (!StressTest.Test081.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test081 is not satisfied for class StressTest.Test073"; 
			}
			if (!StressTest.Test085.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test085 is not satisfied for class StressTest.Test073"; 
			}
			if (!StressTest.Test086.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test086 is not satisfied for class StressTest.Test073"; 
			}
			if (!StressTest.Test087.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test087 is not satisfied for class StressTest.Test073"; 
			}
			if (!StressTest.Test096.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test096 is not satisfied for class StressTest.Test073"; 
			}
			if (!StressTest.Test100.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test100 is not satisfied for class StressTest.Test073"; 
			}
	}
})
