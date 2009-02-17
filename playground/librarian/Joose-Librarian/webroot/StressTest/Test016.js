
try {
	if (typeof StressTest.Test016 == 'function' && StressTest.Test016.meta.meta.isa(Joose.Class)) {
		StressTest.doubleDeclarations = true;
		throw "Double declaration of StressTest.Test016";
	}
} catch (e) {
	
}

Class('StressTest.Test016', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test017',
	       'StressTest.Test025',
	       'StressTest.Test026',
	       'StressTest.Test027',
	       'StressTest.Test066',
	       'StressTest.Test071',
	       'StressTest.Test078',
	       'StressTest.Test085',
	       'StressTest.Test097'
	],
	
	methods : {
		result : function () { return 16 }
	},
	
	body : function(){
			if (!StressTest.Test017.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test017 is not satisfied for class StressTest.Test016"; 
			}
			if (!StressTest.Test025.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test025 is not satisfied for class StressTest.Test016"; 
			}
			if (!StressTest.Test026.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test026 is not satisfied for class StressTest.Test016"; 
			}
			if (!StressTest.Test027.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test027 is not satisfied for class StressTest.Test016"; 
			}
			if (!StressTest.Test066.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test066 is not satisfied for class StressTest.Test016"; 
			}
			if (!StressTest.Test071.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test071 is not satisfied for class StressTest.Test016"; 
			}
			if (!StressTest.Test078.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test078 is not satisfied for class StressTest.Test016"; 
			}
			if (!StressTest.Test085.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test085 is not satisfied for class StressTest.Test016"; 
			}
			if (!StressTest.Test097.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test097 is not satisfied for class StressTest.Test016"; 
			}
	}
})
