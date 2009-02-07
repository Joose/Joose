if (typeof StressTest.Test033 == 'function' && StressTest.Test033.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test033";
}

Class('StressTest.Test033', {
	use : [ 
	       'StressTest.Test041',
	       'StressTest.Test046',
	       'StressTest.Test048',
	       'StressTest.Test053',
	       'StressTest.Test059',
	       'StressTest.Test063',
	       'StressTest.Test074',
	       'StressTest.Test078',
	       'StressTest.Test079',
	       'StressTest.Test082',
	       'StressTest.Test083',
	       'StressTest.Test092',
	       'StressTest.Test093',
	       'StressTest.Test095'
	],
	
	methods : {
		result : function () { return 33 }
	},
	
	body : function(){
			if (!StressTest.Test041.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test041 is not satisfied for class StressTest.Test033"; }
			if (!StressTest.Test046.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test046 is not satisfied for class StressTest.Test033"; }
			if (!StressTest.Test048.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test048 is not satisfied for class StressTest.Test033"; }
			if (!StressTest.Test053.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test053 is not satisfied for class StressTest.Test033"; }
			if (!StressTest.Test059.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test059 is not satisfied for class StressTest.Test033"; }
			if (!StressTest.Test063.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test063 is not satisfied for class StressTest.Test033"; }
			if (!StressTest.Test074.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test074 is not satisfied for class StressTest.Test033"; }
			if (!StressTest.Test078.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test078 is not satisfied for class StressTest.Test033"; }
			if (!StressTest.Test079.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test079 is not satisfied for class StressTest.Test033"; }
			if (!StressTest.Test082.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test082 is not satisfied for class StressTest.Test033"; }
			if (!StressTest.Test083.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test083 is not satisfied for class StressTest.Test033"; }
			if (!StressTest.Test092.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test092 is not satisfied for class StressTest.Test033"; }
			if (!StressTest.Test093.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test093 is not satisfied for class StressTest.Test033"; }
			if (!StressTest.Test095.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test095 is not satisfied for class StressTest.Test033"; }
	}
})
