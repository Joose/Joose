if (typeof StressTest.Test051 == 'function' && StressTest.Test051.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test051";
}

Class('StressTest.Test051', {
	use : [ 
	       'StressTest.Test057',
	       'StressTest.Test076',
	       'StressTest.Test077',
	       'StressTest.Test094',
	       'StressTest.Test098',
	       'StressTest.Test099'
	],
	
	methods : {
		result : function () { return 51 }
	},
	
	body : function(){
			if (!StressTest.Test057.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test057 is not satisfied for class StressTest.Test051"; }
			if (!StressTest.Test076.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test076 is not satisfied for class StressTest.Test051"; }
			if (!StressTest.Test077.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test077 is not satisfied for class StressTest.Test051"; }
			if (!StressTest.Test094.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test094 is not satisfied for class StressTest.Test051"; }
			if (!StressTest.Test098.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test098 is not satisfied for class StressTest.Test051"; }
			if (!StressTest.Test099.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test099 is not satisfied for class StressTest.Test051"; }
	}
})
