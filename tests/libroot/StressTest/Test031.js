if (typeof StressTest.Test031 == 'function' && StressTest.Test031.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test031";
}

Class('StressTest.Test031', {
	use : [ 
	       'StressTest.Test040',
	       'StressTest.Test041',
	       'StressTest.Test044',
	       'StressTest.Test047',
	       'StressTest.Test059',
	       'StressTest.Test060',
	       'StressTest.Test063',
	       'StressTest.Test069',
	       'StressTest.Test074',
	       'StressTest.Test085',
	       'StressTest.Test088'
	],
	
	methods : {
		result : function () { return 31 }
	},
	
	body : function(){
			if (!StressTest.Test040.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test040 is not satisfied for class StressTest.Test031"; 
			}
			if (!StressTest.Test041.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test041 is not satisfied for class StressTest.Test031"; 
			}
			if (!StressTest.Test044.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test044 is not satisfied for class StressTest.Test031"; 
			}
			if (!StressTest.Test047.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test047 is not satisfied for class StressTest.Test031"; 
			}
			if (!StressTest.Test059.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test059 is not satisfied for class StressTest.Test031"; 
			}
			if (!StressTest.Test060.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test060 is not satisfied for class StressTest.Test031"; 
			}
			if (!StressTest.Test063.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test063 is not satisfied for class StressTest.Test031"; 
			}
			if (!StressTest.Test069.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test069 is not satisfied for class StressTest.Test031"; 
			}
			if (!StressTest.Test074.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test074 is not satisfied for class StressTest.Test031"; 
			}
			if (!StressTest.Test085.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test085 is not satisfied for class StressTest.Test031"; 
			}
			if (!StressTest.Test088.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test088 is not satisfied for class StressTest.Test031"; 
			}
	}
})
