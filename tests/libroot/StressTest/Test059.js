if (typeof StressTest.Test059 == 'function' && StressTest.Test059.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test059";
}

Class('StressTest.Test059', {
	use : [ 
	       'StressTest.Test060',
	       'StressTest.Test061',
	       'StressTest.Test063',
	       'StressTest.Test066',
	       'StressTest.Test068',
	       'StressTest.Test069',
	       'StressTest.Test075',
	       'StressTest.Test077',
	       'StressTest.Test084',
	       'StressTest.Test098',
	       'StressTest.Test100'
	],
	
	methods : {
		result : function () { return 59 }
	},
	
	body : function(){
			if (!StressTest.Test060.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test060 is not satisfied for class StressTest.Test059"; }
			if (!StressTest.Test061.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test061 is not satisfied for class StressTest.Test059"; }
			if (!StressTest.Test063.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test063 is not satisfied for class StressTest.Test059"; }
			if (!StressTest.Test066.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test066 is not satisfied for class StressTest.Test059"; }
			if (!StressTest.Test068.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test068 is not satisfied for class StressTest.Test059"; }
			if (!StressTest.Test069.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test069 is not satisfied for class StressTest.Test059"; }
			if (!StressTest.Test075.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test075 is not satisfied for class StressTest.Test059"; }
			if (!StressTest.Test077.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test077 is not satisfied for class StressTest.Test059"; }
			if (!StressTest.Test084.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test084 is not satisfied for class StressTest.Test059"; }
			if (!StressTest.Test098.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test098 is not satisfied for class StressTest.Test059"; }
			if (!StressTest.Test100.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test100 is not satisfied for class StressTest.Test059"; }
	}
})
