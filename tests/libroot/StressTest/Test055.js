if (typeof StressTest.Test055 == 'function' && StressTest.Test055.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test055";
}

Class('StressTest.Test055', {
	use : [ 
	       'StressTest.Test072',
	       'StressTest.Test077',
	       'StressTest.Test080',
	       'StressTest.Test083',
	       'StressTest.Test090',
	       'StressTest.Test094'
	],
	
	methods : {
		result : function () { return 55 }
	},
	
	body : function(){
			if (!StressTest.Test072.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test072 is not satisfied for class StressTest.Test055"; 
			}
			if (!StressTest.Test077.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test077 is not satisfied for class StressTest.Test055"; 
			}
			if (!StressTest.Test080.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test080 is not satisfied for class StressTest.Test055"; 
			}
			if (!StressTest.Test083.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test083 is not satisfied for class StressTest.Test055"; 
			}
			if (!StressTest.Test090.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test090 is not satisfied for class StressTest.Test055"; 
			}
			if (!StressTest.Test094.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test094 is not satisfied for class StressTest.Test055"; 
			}
	}
})
