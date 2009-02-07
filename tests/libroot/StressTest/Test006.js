if (typeof StressTest.Test006 == 'function' && StressTest.Test006.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test006";
}

Class('StressTest.Test006', {
	use : [ 
	       'StressTest.Test010',
	       'StressTest.Test015',
	       'StressTest.Test030',
	       'StressTest.Test035',
	       'StressTest.Test041',
	       'StressTest.Test056',
	       'StressTest.Test059',
	       'StressTest.Test062',
	       'StressTest.Test072',
	       'StressTest.Test073',
	       'StressTest.Test084',
	       'StressTest.Test087',
	       'StressTest.Test095'
	],
	
	methods : {
		result : function () { return 6 }
	},
	
	body : function(){
			if (!StressTest.Test010.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test010 is not satisfied for class StressTest.Test006"; }
			if (!StressTest.Test015.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test015 is not satisfied for class StressTest.Test006"; }
			if (!StressTest.Test030.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test030 is not satisfied for class StressTest.Test006"; }
			if (!StressTest.Test035.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test035 is not satisfied for class StressTest.Test006"; }
			if (!StressTest.Test041.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test041 is not satisfied for class StressTest.Test006"; }
			if (!StressTest.Test056.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test056 is not satisfied for class StressTest.Test006"; }
			if (!StressTest.Test059.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test059 is not satisfied for class StressTest.Test006"; }
			if (!StressTest.Test062.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test062 is not satisfied for class StressTest.Test006"; }
			if (!StressTest.Test072.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test072 is not satisfied for class StressTest.Test006"; }
			if (!StressTest.Test073.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test073 is not satisfied for class StressTest.Test006"; }
			if (!StressTest.Test084.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test084 is not satisfied for class StressTest.Test006"; }
			if (!StressTest.Test087.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test087 is not satisfied for class StressTest.Test006"; }
			if (!StressTest.Test095.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test095 is not satisfied for class StressTest.Test006"; }
	}
})
