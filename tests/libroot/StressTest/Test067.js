if (typeof StressTest.Test067 == 'function' && StressTest.Test067.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test067";
}

Class('StressTest.Test067', {
	use : [ 
	       'StressTest.Test069',
	       'StressTest.Test071',
	       'StressTest.Test076',
	       'StressTest.Test078',
	       'StressTest.Test079',
	       'StressTest.Test081',
	       'StressTest.Test088',
	       'StressTest.Test089',
	       'StressTest.Test091',
	       'StressTest.Test094'
	],
	
	methods : {
		result : function () { return 67 }
	},
	
	body : function(){
			if (!StressTest.Test069.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test069 is not satisfied for class StressTest.Test067"; }
			if (!StressTest.Test071.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test071 is not satisfied for class StressTest.Test067"; }
			if (!StressTest.Test076.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test076 is not satisfied for class StressTest.Test067"; }
			if (!StressTest.Test078.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test078 is not satisfied for class StressTest.Test067"; }
			if (!StressTest.Test079.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test079 is not satisfied for class StressTest.Test067"; }
			if (!StressTest.Test081.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test081 is not satisfied for class StressTest.Test067"; }
			if (!StressTest.Test088.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test088 is not satisfied for class StressTest.Test067"; }
			if (!StressTest.Test089.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test089 is not satisfied for class StressTest.Test067"; }
			if (!StressTest.Test091.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test091 is not satisfied for class StressTest.Test067"; }
			if (!StressTest.Test094.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test094 is not satisfied for class StressTest.Test067"; }
	}
})
