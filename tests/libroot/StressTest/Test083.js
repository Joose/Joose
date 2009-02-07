if (typeof StressTest.Test083 == 'function' && StressTest.Test083.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test083";
}

Class('StressTest.Test083', {
	use : [ 
	       'StressTest.Test087',
	       'StressTest.Test088',
	       'StressTest.Test089',
	       'StressTest.Test090',
	       'StressTest.Test092',
	       'StressTest.Test093',
	       'StressTest.Test095',
	       'StressTest.Test098',
	       'StressTest.Test099',
	       'StressTest.Test100'
	],
	
	methods : {
		result : function () { return 83 }
	},
	
	body : function(){
			if (!StressTest.Test087.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test087 is not satisfied for class StressTest.Test083"; 
			}
			if (!StressTest.Test088.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test088 is not satisfied for class StressTest.Test083"; 
			}
			if (!StressTest.Test089.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test089 is not satisfied for class StressTest.Test083"; 
			}
			if (!StressTest.Test090.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test090 is not satisfied for class StressTest.Test083"; 
			}
			if (!StressTest.Test092.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test092 is not satisfied for class StressTest.Test083"; 
			}
			if (!StressTest.Test093.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test093 is not satisfied for class StressTest.Test083"; 
			}
			if (!StressTest.Test095.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test095 is not satisfied for class StressTest.Test083"; 
			}
			if (!StressTest.Test098.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test098 is not satisfied for class StressTest.Test083"; 
			}
			if (!StressTest.Test099.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test099 is not satisfied for class StressTest.Test083"; 
			}
			if (!StressTest.Test100.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test100 is not satisfied for class StressTest.Test083"; 
			}
	}
})
