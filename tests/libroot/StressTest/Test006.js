if (typeof StressTest.Test006 == 'function' && StressTest.Test006.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test006";
}

Class('StressTest.Test006', {
	use : [ 
	       'StressTest.Test007',
	       'StressTest.Test017',
	       'StressTest.Test024',
	       'StressTest.Test028',
	       'StressTest.Test064',
	       'StressTest.Test065',
	       'StressTest.Test066',
	       'StressTest.Test074',
	       'StressTest.Test085',
	       'StressTest.Test097',
	       'StressTest.Test098'
	],
	
	methods : {
		result : function () { return 6 }
	},
	
	body : function(){
			if (!StressTest.Test007.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test007 is not satisfied for class StressTest.Test006"; 
			}
			if (!StressTest.Test017.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test017 is not satisfied for class StressTest.Test006"; 
			}
			if (!StressTest.Test024.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test024 is not satisfied for class StressTest.Test006"; 
			}
			if (!StressTest.Test028.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test028 is not satisfied for class StressTest.Test006"; 
			}
			if (!StressTest.Test064.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test064 is not satisfied for class StressTest.Test006"; 
			}
			if (!StressTest.Test065.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test065 is not satisfied for class StressTest.Test006"; 
			}
			if (!StressTest.Test066.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test066 is not satisfied for class StressTest.Test006"; 
			}
			if (!StressTest.Test074.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test074 is not satisfied for class StressTest.Test006"; 
			}
			if (!StressTest.Test085.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test085 is not satisfied for class StressTest.Test006"; 
			}
			if (!StressTest.Test097.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test097 is not satisfied for class StressTest.Test006"; 
			}
			if (!StressTest.Test098.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test098 is not satisfied for class StressTest.Test006"; 
			}
	}
})
