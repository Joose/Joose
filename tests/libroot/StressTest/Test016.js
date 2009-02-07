if (typeof StressTest.Test016 == 'function' && StressTest.Test016.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test016";
}

Class('StressTest.Test016', {
	use : [ 
	       'StressTest.Test032',
	       'StressTest.Test050',
	       'StressTest.Test056',
	       'StressTest.Test065',
	       'StressTest.Test077',
	       'StressTest.Test081',
	       'StressTest.Test090'
	],
	
	methods : {
		result : function () { return 16 }
	},
	
	body : function(){
			if (!StressTest.Test032.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test032 is not satisfied for class StressTest.Test016"; 
			}
			if (!StressTest.Test050.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test050 is not satisfied for class StressTest.Test016"; 
			}
			if (!StressTest.Test056.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test056 is not satisfied for class StressTest.Test016"; 
			}
			if (!StressTest.Test065.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test065 is not satisfied for class StressTest.Test016"; 
			}
			if (!StressTest.Test077.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test077 is not satisfied for class StressTest.Test016"; 
			}
			if (!StressTest.Test081.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test081 is not satisfied for class StressTest.Test016"; 
			}
			if (!StressTest.Test090.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test090 is not satisfied for class StressTest.Test016"; 
			}
	}
})
