if (typeof StressTest.Test056 == 'function' && StressTest.Test056.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test056";
}

Class('StressTest.Test056', {
	use : [ 
	       'StressTest.Test060',
	       'StressTest.Test062',
	       'StressTest.Test071',
	       'StressTest.Test080',
	       'StressTest.Test086',
	       'StressTest.Test087',
	       'StressTest.Test088',
	       'StressTest.Test094'
	],
	
	methods : {
		result : function () { return 56 }
	},
	
	body : function(){
			if (!StressTest.Test060.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test060 is not satisfied for class StressTest.Test056"; }
			if (!StressTest.Test062.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test062 is not satisfied for class StressTest.Test056"; }
			if (!StressTest.Test071.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test071 is not satisfied for class StressTest.Test056"; }
			if (!StressTest.Test080.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test080 is not satisfied for class StressTest.Test056"; }
			if (!StressTest.Test086.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test086 is not satisfied for class StressTest.Test056"; }
			if (!StressTest.Test087.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test087 is not satisfied for class StressTest.Test056"; }
			if (!StressTest.Test088.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test088 is not satisfied for class StressTest.Test056"; }
			if (!StressTest.Test094.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test094 is not satisfied for class StressTest.Test056"; }
	}
})
