if (typeof StressTest.Test001 == 'function' && StressTest.Test001.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test001";
}

Class('StressTest.Test001', {
	use : [ 
	       'StressTest.Test003',
	       'StressTest.Test010',
	       'StressTest.Test019',
	       'StressTest.Test020',
	       'StressTest.Test036',
	       'StressTest.Test055',
	       'StressTest.Test058',
	       'StressTest.Test075',
	       'StressTest.Test078',
	       'StressTest.Test089'
	],
	
	methods : {
		result : function () { return 1 }
	},
	
	body : function(){
			if (!StressTest.Test003.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test003 is not satisfied for class StressTest.Test001"; }
			if (!StressTest.Test010.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test010 is not satisfied for class StressTest.Test001"; }
			if (!StressTest.Test019.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test019 is not satisfied for class StressTest.Test001"; }
			if (!StressTest.Test020.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test020 is not satisfied for class StressTest.Test001"; }
			if (!StressTest.Test036.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test036 is not satisfied for class StressTest.Test001"; }
			if (!StressTest.Test055.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test055 is not satisfied for class StressTest.Test001"; }
			if (!StressTest.Test058.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test058 is not satisfied for class StressTest.Test001"; }
			if (!StressTest.Test075.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test075 is not satisfied for class StressTest.Test001"; }
			if (!StressTest.Test078.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test078 is not satisfied for class StressTest.Test001"; }
			if (!StressTest.Test089.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test089 is not satisfied for class StressTest.Test001"; }
	}
})
