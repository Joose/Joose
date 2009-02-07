if (typeof StressTest.Test016 == 'function' && StressTest.Test016.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test016";
}

Class('StressTest.Test016', {
	use : [ 
	       'StressTest.Test018',
	       'StressTest.Test019',
	       'StressTest.Test023',
	       'StressTest.Test027',
	       'StressTest.Test034',
	       'StressTest.Test044',
	       'StressTest.Test058',
	       'StressTest.Test066',
	       'StressTest.Test080'
	],
	
	methods : {
		result : function () { return 16 }
	},
	
	body : function(){
			if (!StressTest.Test018.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test018 is not satisfied for class StressTest.Test016"; }
			if (!StressTest.Test019.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test019 is not satisfied for class StressTest.Test016"; }
			if (!StressTest.Test023.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test023 is not satisfied for class StressTest.Test016"; }
			if (!StressTest.Test027.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test027 is not satisfied for class StressTest.Test016"; }
			if (!StressTest.Test034.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test034 is not satisfied for class StressTest.Test016"; }
			if (!StressTest.Test044.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test044 is not satisfied for class StressTest.Test016"; }
			if (!StressTest.Test058.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test058 is not satisfied for class StressTest.Test016"; }
			if (!StressTest.Test066.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test066 is not satisfied for class StressTest.Test016"; }
			if (!StressTest.Test080.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test080 is not satisfied for class StressTest.Test016"; }
	}
})
