if (typeof StressTest.Test009 == 'function' && StressTest.Test009.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test009";
}

Class('StressTest.Test009', {
	use : [ 
	       'StressTest.Test017',
	       'StressTest.Test041',
	       'StressTest.Test045',
	       'StressTest.Test067'
	],
	
	methods : {
		result : function () { return 9 }
	},
	
	body : function(){
			if (!StressTest.Test017.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test017 is not satisfied for class StressTest.Test009"; }
			if (!StressTest.Test041.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test041 is not satisfied for class StressTest.Test009"; }
			if (!StressTest.Test045.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test045 is not satisfied for class StressTest.Test009"; }
			if (!StressTest.Test067.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test067 is not satisfied for class StressTest.Test009"; }
	}
})
