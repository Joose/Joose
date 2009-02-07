if (typeof StressTest.Test018 == 'function' && StressTest.Test018.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test018";
}

Class('StressTest.Test018', {
	use : [ 
	       'StressTest.Test030',
	       'StressTest.Test032',
	       'StressTest.Test040',
	       'StressTest.Test060',
	       'StressTest.Test067',
	       'StressTest.Test076'
	],
	
	methods : {
		result : function () { return 18 }
	},
	
	body : function(){
			if (!StressTest.Test030.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test030 is not satisfied for class StressTest.Test018"; }
			if (!StressTest.Test032.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test032 is not satisfied for class StressTest.Test018"; }
			if (!StressTest.Test040.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test040 is not satisfied for class StressTest.Test018"; }
			if (!StressTest.Test060.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test060 is not satisfied for class StressTest.Test018"; }
			if (!StressTest.Test067.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test067 is not satisfied for class StressTest.Test018"; }
			if (!StressTest.Test076.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test076 is not satisfied for class StressTest.Test018"; }
	}
})
