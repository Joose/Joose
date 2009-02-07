if (typeof StressTest.Test021 == 'function' && StressTest.Test021.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test021";
}

Class('StressTest.Test021', {
	use : [ 
	       'StressTest.Test023',
	       'StressTest.Test051',
	       'StressTest.Test063',
	       'StressTest.Test066',
	       'StressTest.Test084',
	       'StressTest.Test094'
	],
	
	methods : {
		result : function () { return 21 }
	},
	
	body : function(){
			if (!StressTest.Test023.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test023 is not satisfied for class StressTest.Test021"; }
			if (!StressTest.Test051.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test051 is not satisfied for class StressTest.Test021"; }
			if (!StressTest.Test063.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test063 is not satisfied for class StressTest.Test021"; }
			if (!StressTest.Test066.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test066 is not satisfied for class StressTest.Test021"; }
			if (!StressTest.Test084.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test084 is not satisfied for class StressTest.Test021"; }
			if (!StressTest.Test094.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test094 is not satisfied for class StressTest.Test021"; }
	}
})
