if (typeof StressTest.Test061 == 'function' && StressTest.Test061.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test061";
}

Class('StressTest.Test061', {
	use : [ 
	       'StressTest.Test068',
	       'StressTest.Test075',
	       'StressTest.Test078',
	       'StressTest.Test079',
	       'StressTest.Test080',
	       'StressTest.Test084',
	       'StressTest.Test089',
	       'StressTest.Test091',
	       'StressTest.Test092',
	       'StressTest.Test095',
	       'StressTest.Test097',
	       'StressTest.Test098',
	       'StressTest.Test100'
	],
	
	methods : {
		result : function () { return 61 }
	},
	
	body : function(){
			if (!StressTest.Test068.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test068 is not satisfied for class StressTest.Test061"; }
			if (!StressTest.Test075.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test075 is not satisfied for class StressTest.Test061"; }
			if (!StressTest.Test078.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test078 is not satisfied for class StressTest.Test061"; }
			if (!StressTest.Test079.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test079 is not satisfied for class StressTest.Test061"; }
			if (!StressTest.Test080.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test080 is not satisfied for class StressTest.Test061"; }
			if (!StressTest.Test084.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test084 is not satisfied for class StressTest.Test061"; }
			if (!StressTest.Test089.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test089 is not satisfied for class StressTest.Test061"; }
			if (!StressTest.Test091.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test091 is not satisfied for class StressTest.Test061"; }
			if (!StressTest.Test092.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test092 is not satisfied for class StressTest.Test061"; }
			if (!StressTest.Test095.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test095 is not satisfied for class StressTest.Test061"; }
			if (!StressTest.Test097.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test097 is not satisfied for class StressTest.Test061"; }
			if (!StressTest.Test098.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test098 is not satisfied for class StressTest.Test061"; }
			if (!StressTest.Test100.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test100 is not satisfied for class StressTest.Test061"; }
	}
})
