if (typeof StressTest.Test020 == 'function' && StressTest.Test020.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test020";
}

Class('StressTest.Test020', {
	use : [ 
	       'StressTest.Test038',
	       'StressTest.Test042',
	       'StressTest.Test051',
	       'StressTest.Test072',
	       'StressTest.Test082',
	       'StressTest.Test091',
	       'StressTest.Test096',
	       'StressTest.Test097'
	],
	
	methods : {
		result : function () { return 20 }
	},
	
	body : function(){
			if (!StressTest.Test038.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test038 is not satisfied for class StressTest.Test020"; }
			if (!StressTest.Test042.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test042 is not satisfied for class StressTest.Test020"; }
			if (!StressTest.Test051.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test051 is not satisfied for class StressTest.Test020"; }
			if (!StressTest.Test072.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test072 is not satisfied for class StressTest.Test020"; }
			if (!StressTest.Test082.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test082 is not satisfied for class StressTest.Test020"; }
			if (!StressTest.Test091.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test091 is not satisfied for class StressTest.Test020"; }
			if (!StressTest.Test096.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test096 is not satisfied for class StressTest.Test020"; }
			if (!StressTest.Test097.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test097 is not satisfied for class StressTest.Test020"; }
	}
})
