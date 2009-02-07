if (typeof StressTest.Test038 == 'function' && StressTest.Test038.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test038";
}

Class('StressTest.Test038', {
	use : [ 
	       'StressTest.Test040',
	       'StressTest.Test043',
	       'StressTest.Test045',
	       'StressTest.Test048',
	       'StressTest.Test049',
	       'StressTest.Test057',
	       'StressTest.Test062',
	       'StressTest.Test085',
	       'StressTest.Test089',
	       'StressTest.Test099'
	],
	
	methods : {
		result : function () { return 38 }
	},
	
	body : function(){
			if (!StressTest.Test040.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test040 is not satisfied for class StressTest.Test038"; }
			if (!StressTest.Test043.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test043 is not satisfied for class StressTest.Test038"; }
			if (!StressTest.Test045.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test045 is not satisfied for class StressTest.Test038"; }
			if (!StressTest.Test048.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test048 is not satisfied for class StressTest.Test038"; }
			if (!StressTest.Test049.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test049 is not satisfied for class StressTest.Test038"; }
			if (!StressTest.Test057.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test057 is not satisfied for class StressTest.Test038"; }
			if (!StressTest.Test062.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test062 is not satisfied for class StressTest.Test038"; }
			if (!StressTest.Test085.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test085 is not satisfied for class StressTest.Test038"; }
			if (!StressTest.Test089.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test089 is not satisfied for class StressTest.Test038"; }
			if (!StressTest.Test099.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test099 is not satisfied for class StressTest.Test038"; }
	}
})
