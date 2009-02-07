if (typeof StressTest.Test092 == 'function' && StressTest.Test092.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test092";
}

Class('StressTest.Test092', {
	use : [ 
	       'StressTest.Test093',
	       'StressTest.Test094',
	       'StressTest.Test095',
	       'StressTest.Test096',
	       'StressTest.Test097',
	       'StressTest.Test098',
	       'StressTest.Test099',
	       'StressTest.Test100'
	],
	
	methods : {
		result : function () { return 92 }
	},
	
	body : function(){
			if (!StressTest.Test093.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test093 is not satisfied for class StressTest.Test092"; }
			if (!StressTest.Test094.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test094 is not satisfied for class StressTest.Test092"; }
			if (!StressTest.Test095.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test095 is not satisfied for class StressTest.Test092"; }
			if (!StressTest.Test096.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test096 is not satisfied for class StressTest.Test092"; }
			if (!StressTest.Test097.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test097 is not satisfied for class StressTest.Test092"; }
			if (!StressTest.Test098.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test098 is not satisfied for class StressTest.Test092"; }
			if (!StressTest.Test099.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test099 is not satisfied for class StressTest.Test092"; }
			if (!StressTest.Test100.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test100 is not satisfied for class StressTest.Test092"; }
	}
})
