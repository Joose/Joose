if (typeof StressTest.Test008 == 'function' && StressTest.Test008.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test008";
}

Class('StressTest.Test008', {
	use : [ 
	       'StressTest.Test021',
	       'StressTest.Test026',
	       'StressTest.Test030',
	       'StressTest.Test034',
	       'StressTest.Test066',
	       'StressTest.Test067',
	       'StressTest.Test068',
	       'StressTest.Test071',
	       'StressTest.Test087',
	       'StressTest.Test088'
	],
	
	methods : {
		result : function () { return 8 }
	},
	
	body : function(){
			if (!StressTest.Test021.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test021 is not satisfied for class StressTest.Test008"; 
			}
			if (!StressTest.Test026.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test026 is not satisfied for class StressTest.Test008"; 
			}
			if (!StressTest.Test030.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test030 is not satisfied for class StressTest.Test008"; 
			}
			if (!StressTest.Test034.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test034 is not satisfied for class StressTest.Test008"; 
			}
			if (!StressTest.Test066.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test066 is not satisfied for class StressTest.Test008"; 
			}
			if (!StressTest.Test067.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test067 is not satisfied for class StressTest.Test008"; 
			}
			if (!StressTest.Test068.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test068 is not satisfied for class StressTest.Test008"; 
			}
			if (!StressTest.Test071.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test071 is not satisfied for class StressTest.Test008"; 
			}
			if (!StressTest.Test087.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test087 is not satisfied for class StressTest.Test008"; 
			}
			if (!StressTest.Test088.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test088 is not satisfied for class StressTest.Test008"; 
			}
	}
})
