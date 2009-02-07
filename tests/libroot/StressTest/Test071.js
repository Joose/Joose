if (typeof StressTest.Test071 == 'function' && StressTest.Test071.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test071";
}

Class('StressTest.Test071', {
	use : [ 
	       'StressTest.Test074',
	       'StressTest.Test076',
	       'StressTest.Test081',
	       'StressTest.Test083',
	       'StressTest.Test085',
	       'StressTest.Test086',
	       'StressTest.Test088',
	       'StressTest.Test090',
	       'StressTest.Test097',
	       'StressTest.Test098'
	],
	
	methods : {
		result : function () { return 71 }
	},
	
	body : function(){
			if (!StressTest.Test074.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test074 is not satisfied for class StressTest.Test071"; 
			}
			if (!StressTest.Test076.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test076 is not satisfied for class StressTest.Test071"; 
			}
			if (!StressTest.Test081.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test081 is not satisfied for class StressTest.Test071"; 
			}
			if (!StressTest.Test083.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test083 is not satisfied for class StressTest.Test071"; 
			}
			if (!StressTest.Test085.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test085 is not satisfied for class StressTest.Test071"; 
			}
			if (!StressTest.Test086.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test086 is not satisfied for class StressTest.Test071"; 
			}
			if (!StressTest.Test088.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test088 is not satisfied for class StressTest.Test071"; 
			}
			if (!StressTest.Test090.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test090 is not satisfied for class StressTest.Test071"; 
			}
			if (!StressTest.Test097.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test097 is not satisfied for class StressTest.Test071"; 
			}
			if (!StressTest.Test098.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test098 is not satisfied for class StressTest.Test071"; 
			}
	}
})
