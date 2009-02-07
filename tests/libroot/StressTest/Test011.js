if (typeof StressTest.Test011 == 'function' && StressTest.Test011.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test011";
}

Class('StressTest.Test011', {
	use : [ 
	       'StressTest.Test022',
	       'StressTest.Test029',
	       'StressTest.Test052',
	       'StressTest.Test053',
	       'StressTest.Test070',
	       'StressTest.Test078',
	       'StressTest.Test085',
	       'StressTest.Test090',
	       'StressTest.Test100'
	],
	
	methods : {
		result : function () { return 11 }
	},
	
	body : function(){
			if (!StressTest.Test022.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test022 is not satisfied for class StressTest.Test011"; 
			}
			if (!StressTest.Test029.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test029 is not satisfied for class StressTest.Test011"; 
			}
			if (!StressTest.Test052.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test052 is not satisfied for class StressTest.Test011"; 
			}
			if (!StressTest.Test053.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test053 is not satisfied for class StressTest.Test011"; 
			}
			if (!StressTest.Test070.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test070 is not satisfied for class StressTest.Test011"; 
			}
			if (!StressTest.Test078.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test078 is not satisfied for class StressTest.Test011"; 
			}
			if (!StressTest.Test085.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test085 is not satisfied for class StressTest.Test011"; 
			}
			if (!StressTest.Test090.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test090 is not satisfied for class StressTest.Test011"; 
			}
			if (!StressTest.Test100.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test100 is not satisfied for class StressTest.Test011"; 
			}
	}
})
