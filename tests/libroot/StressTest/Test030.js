if (typeof StressTest.Test030 == 'function' && StressTest.Test030.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test030";
}

Class('StressTest.Test030', {
	use : [ 
	       'StressTest.Test032',
	       'StressTest.Test036',
	       'StressTest.Test044',
	       'StressTest.Test046',
	       'StressTest.Test063',
	       'StressTest.Test066',
	       'StressTest.Test068',
	       'StressTest.Test079',
	       'StressTest.Test087',
	       'StressTest.Test088'
	],
	
	methods : {
		result : function () { return 30 }
	},
	
	body : function(){
			if (!StressTest.Test032.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test032 is not satisfied for class StressTest.Test030"; }
			if (!StressTest.Test036.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test036 is not satisfied for class StressTest.Test030"; }
			if (!StressTest.Test044.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test044 is not satisfied for class StressTest.Test030"; }
			if (!StressTest.Test046.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test046 is not satisfied for class StressTest.Test030"; }
			if (!StressTest.Test063.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test063 is not satisfied for class StressTest.Test030"; }
			if (!StressTest.Test066.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test066 is not satisfied for class StressTest.Test030"; }
			if (!StressTest.Test068.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test068 is not satisfied for class StressTest.Test030"; }
			if (!StressTest.Test079.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test079 is not satisfied for class StressTest.Test030"; }
			if (!StressTest.Test087.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test087 is not satisfied for class StressTest.Test030"; }
			if (!StressTest.Test088.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test088 is not satisfied for class StressTest.Test030"; }
	}
})
