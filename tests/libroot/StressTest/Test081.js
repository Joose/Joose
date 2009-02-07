if (typeof StressTest.Test081 == 'function' && StressTest.Test081.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test081";
}

Class('StressTest.Test081', {
	use : [ 
	       'StressTest.Test082',
	       'StressTest.Test084',
	       'StressTest.Test085',
	       'StressTest.Test087',
	       'StressTest.Test088',
	       'StressTest.Test092',
	       'StressTest.Test093',
	       'StressTest.Test094',
	       'StressTest.Test096',
	       'StressTest.Test098',
	       'StressTest.Test099'
	],
	
	methods : {
		result : function () { return 81 }
	},
	
	body : function(){
			if (!StressTest.Test082.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test082 is not satisfied for class StressTest.Test081"; 
			}
			if (!StressTest.Test084.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test084 is not satisfied for class StressTest.Test081"; 
			}
			if (!StressTest.Test085.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test085 is not satisfied for class StressTest.Test081"; 
			}
			if (!StressTest.Test087.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test087 is not satisfied for class StressTest.Test081"; 
			}
			if (!StressTest.Test088.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test088 is not satisfied for class StressTest.Test081"; 
			}
			if (!StressTest.Test092.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test092 is not satisfied for class StressTest.Test081"; 
			}
			if (!StressTest.Test093.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test093 is not satisfied for class StressTest.Test081"; 
			}
			if (!StressTest.Test094.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test094 is not satisfied for class StressTest.Test081"; 
			}
			if (!StressTest.Test096.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test096 is not satisfied for class StressTest.Test081"; 
			}
			if (!StressTest.Test098.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test098 is not satisfied for class StressTest.Test081"; 
			}
			if (!StressTest.Test099.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test099 is not satisfied for class StressTest.Test081"; 
			}
	}
})
