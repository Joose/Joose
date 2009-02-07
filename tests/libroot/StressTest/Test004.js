if (typeof StressTest.Test004 == 'function' && StressTest.Test004.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test004";
}

Class('StressTest.Test004', {
	use : [ 
	       'StressTest.Test015',
	       'StressTest.Test032',
	       'StressTest.Test043',
	       'StressTest.Test047',
	       'StressTest.Test049',
	       'StressTest.Test063',
	       'StressTest.Test071',
	       'StressTest.Test074',
	       'StressTest.Test081'
	],
	
	methods : {
		result : function () { return 4 }
	},
	
	body : function(){
			if (!StressTest.Test015.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test015 is not satisfied for class StressTest.Test004"; }
			if (!StressTest.Test032.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test032 is not satisfied for class StressTest.Test004"; }
			if (!StressTest.Test043.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test043 is not satisfied for class StressTest.Test004"; }
			if (!StressTest.Test047.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test047 is not satisfied for class StressTest.Test004"; }
			if (!StressTest.Test049.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test049 is not satisfied for class StressTest.Test004"; }
			if (!StressTest.Test063.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test063 is not satisfied for class StressTest.Test004"; }
			if (!StressTest.Test071.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test071 is not satisfied for class StressTest.Test004"; }
			if (!StressTest.Test074.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test074 is not satisfied for class StressTest.Test004"; }
			if (!StressTest.Test081.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test081 is not satisfied for class StressTest.Test004"; }
	}
})
