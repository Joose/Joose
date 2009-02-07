if (typeof StressTest.Test057 == 'function' && StressTest.Test057.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test057";
}

Class('StressTest.Test057', {
	use : [ 
	       'StressTest.Test066',
	       'StressTest.Test067',
	       'StressTest.Test071',
	       'StressTest.Test075',
	       'StressTest.Test078',
	       'StressTest.Test081',
	       'StressTest.Test084',
	       'StressTest.Test087',
	       'StressTest.Test091',
	       'StressTest.Test095'
	],
	
	methods : {
		result : function () { return 57 }
	},
	
	body : function(){
			if (!StressTest.Test066.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test066 is not satisfied for class StressTest.Test057"; }
			if (!StressTest.Test067.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test067 is not satisfied for class StressTest.Test057"; }
			if (!StressTest.Test071.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test071 is not satisfied for class StressTest.Test057"; }
			if (!StressTest.Test075.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test075 is not satisfied for class StressTest.Test057"; }
			if (!StressTest.Test078.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test078 is not satisfied for class StressTest.Test057"; }
			if (!StressTest.Test081.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test081 is not satisfied for class StressTest.Test057"; }
			if (!StressTest.Test084.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test084 is not satisfied for class StressTest.Test057"; }
			if (!StressTest.Test087.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test087 is not satisfied for class StressTest.Test057"; }
			if (!StressTest.Test091.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test091 is not satisfied for class StressTest.Test057"; }
			if (!StressTest.Test095.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test095 is not satisfied for class StressTest.Test057"; }
	}
})
