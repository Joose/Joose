if (typeof StressTest.Test008 == 'function' && StressTest.Test008.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test008";
}

Class('StressTest.Test008', {
	use : [ 
	       'StressTest.Test023',
	       'StressTest.Test048',
	       'StressTest.Test059',
	       'StressTest.Test078',
	       'StressTest.Test079',
	       'StressTest.Test081',
	       'StressTest.Test088',
	       'StressTest.Test089'
	],
	
	methods : {
		result : function () { return 8 }
	},
	
	body : function(){
			if (!StressTest.Test023.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test023 is not satisfied for class StressTest.Test008"; }
			if (!StressTest.Test048.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test048 is not satisfied for class StressTest.Test008"; }
			if (!StressTest.Test059.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test059 is not satisfied for class StressTest.Test008"; }
			if (!StressTest.Test078.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test078 is not satisfied for class StressTest.Test008"; }
			if (!StressTest.Test079.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test079 is not satisfied for class StressTest.Test008"; }
			if (!StressTest.Test081.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test081 is not satisfied for class StressTest.Test008"; }
			if (!StressTest.Test088.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test088 is not satisfied for class StressTest.Test008"; }
			if (!StressTest.Test089.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test089 is not satisfied for class StressTest.Test008"; }
	}
})
