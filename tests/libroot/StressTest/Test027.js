if (typeof StressTest.Test027 == 'function' && StressTest.Test027.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test027";
}

Class('StressTest.Test027', {
	use : [ 
	       'StressTest.Test031',
	       'StressTest.Test040',
	       'StressTest.Test046',
	       'StressTest.Test060',
	       'StressTest.Test065',
	       'StressTest.Test070',
	       'StressTest.Test071',
	       'StressTest.Test076',
	       'StressTest.Test089',
	       'StressTest.Test097'
	],
	
	methods : {
		result : function () { return 27 }
	},
	
	body : function(){
			if (!StressTest.Test031.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test031 is not satisfied for class StressTest.Test027"; }
			if (!StressTest.Test040.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test040 is not satisfied for class StressTest.Test027"; }
			if (!StressTest.Test046.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test046 is not satisfied for class StressTest.Test027"; }
			if (!StressTest.Test060.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test060 is not satisfied for class StressTest.Test027"; }
			if (!StressTest.Test065.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test065 is not satisfied for class StressTest.Test027"; }
			if (!StressTest.Test070.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test070 is not satisfied for class StressTest.Test027"; }
			if (!StressTest.Test071.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test071 is not satisfied for class StressTest.Test027"; }
			if (!StressTest.Test076.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test076 is not satisfied for class StressTest.Test027"; }
			if (!StressTest.Test089.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test089 is not satisfied for class StressTest.Test027"; }
			if (!StressTest.Test097.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test097 is not satisfied for class StressTest.Test027"; }
	}
})
