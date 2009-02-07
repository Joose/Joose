if (typeof StressTest.Test036 == 'function' && StressTest.Test036.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test036";
}

Class('StressTest.Test036', {
	use : [ 
	       'StressTest.Test037',
	       'StressTest.Test055',
	       'StressTest.Test070',
	       'StressTest.Test073',
	       'StressTest.Test074',
	       'StressTest.Test078',
	       'StressTest.Test084',
	       'StressTest.Test090',
	       'StressTest.Test091',
	       'StressTest.Test094'
	],
	
	methods : {
		result : function () { return 36 }
	},
	
	body : function(){
			if (!StressTest.Test037.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test037 is not satisfied for class StressTest.Test036"; }
			if (!StressTest.Test055.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test055 is not satisfied for class StressTest.Test036"; }
			if (!StressTest.Test070.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test070 is not satisfied for class StressTest.Test036"; }
			if (!StressTest.Test073.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test073 is not satisfied for class StressTest.Test036"; }
			if (!StressTest.Test074.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test074 is not satisfied for class StressTest.Test036"; }
			if (!StressTest.Test078.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test078 is not satisfied for class StressTest.Test036"; }
			if (!StressTest.Test084.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test084 is not satisfied for class StressTest.Test036"; }
			if (!StressTest.Test090.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test090 is not satisfied for class StressTest.Test036"; }
			if (!StressTest.Test091.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test091 is not satisfied for class StressTest.Test036"; }
			if (!StressTest.Test094.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test094 is not satisfied for class StressTest.Test036"; }
	}
})
