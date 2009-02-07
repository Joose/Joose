if (typeof StressTest.Test060 == 'function' && StressTest.Test060.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test060";
}

Class('StressTest.Test060', {
	use : [ 
	       'StressTest.Test062',
	       'StressTest.Test071',
	       'StressTest.Test080',
	       'StressTest.Test081',
	       'StressTest.Test083',
	       'StressTest.Test085',
	       'StressTest.Test091',
	       'StressTest.Test095'
	],
	
	methods : {
		result : function () { return 60 }
	},
	
	body : function(){
			if (!StressTest.Test062.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test062 is not satisfied for class StressTest.Test060"; }
			if (!StressTest.Test071.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test071 is not satisfied for class StressTest.Test060"; }
			if (!StressTest.Test080.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test080 is not satisfied for class StressTest.Test060"; }
			if (!StressTest.Test081.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test081 is not satisfied for class StressTest.Test060"; }
			if (!StressTest.Test083.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test083 is not satisfied for class StressTest.Test060"; }
			if (!StressTest.Test085.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test085 is not satisfied for class StressTest.Test060"; }
			if (!StressTest.Test091.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test091 is not satisfied for class StressTest.Test060"; }
			if (!StressTest.Test095.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test095 is not satisfied for class StressTest.Test060"; }
	}
})
