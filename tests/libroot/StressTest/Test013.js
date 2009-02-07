if (typeof StressTest.Test013 == 'function' && StressTest.Test013.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test013";
}

Class('StressTest.Test013', {
	use : [ 
	       'StressTest.Test015',
	       'StressTest.Test023',
	       'StressTest.Test055',
	       'StressTest.Test060',
	       'StressTest.Test063',
	       'StressTest.Test066',
	       'StressTest.Test067'
	],
	
	methods : {
		result : function () { return 13 }
	},
	
	body : function(){
			if (!StressTest.Test015.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test015 is not satisfied for class StressTest.Test013"; 
			}
			if (!StressTest.Test023.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test023 is not satisfied for class StressTest.Test013"; 
			}
			if (!StressTest.Test055.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test055 is not satisfied for class StressTest.Test013"; 
			}
			if (!StressTest.Test060.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test060 is not satisfied for class StressTest.Test013"; 
			}
			if (!StressTest.Test063.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test063 is not satisfied for class StressTest.Test013"; 
			}
			if (!StressTest.Test066.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test066 is not satisfied for class StressTest.Test013"; 
			}
			if (!StressTest.Test067.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test067 is not satisfied for class StressTest.Test013"; 
			}
	}
})
