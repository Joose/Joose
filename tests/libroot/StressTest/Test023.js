if (typeof StressTest.Test023 == 'function' && StressTest.Test023.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test023";
}

Class('StressTest.Test023', {
	use : [ 
	       'StressTest.Test034',
	       'StressTest.Test038',
	       'StressTest.Test039',
	       'StressTest.Test046',
	       'StressTest.Test048',
	       'StressTest.Test051',
	       'StressTest.Test060',
	       'StressTest.Test079',
	       'StressTest.Test080',
	       'StressTest.Test090',
	       'StressTest.Test093',
	       'StressTest.Test094'
	],
	
	methods : {
		result : function () { return 23 }
	},
	
	body : function(){
			if (!StressTest.Test034.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test034 is not satisfied for class StressTest.Test023"; }
			if (!StressTest.Test038.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test038 is not satisfied for class StressTest.Test023"; }
			if (!StressTest.Test039.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test039 is not satisfied for class StressTest.Test023"; }
			if (!StressTest.Test046.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test046 is not satisfied for class StressTest.Test023"; }
			if (!StressTest.Test048.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test048 is not satisfied for class StressTest.Test023"; }
			if (!StressTest.Test051.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test051 is not satisfied for class StressTest.Test023"; }
			if (!StressTest.Test060.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test060 is not satisfied for class StressTest.Test023"; }
			if (!StressTest.Test079.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test079 is not satisfied for class StressTest.Test023"; }
			if (!StressTest.Test080.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test080 is not satisfied for class StressTest.Test023"; }
			if (!StressTest.Test090.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test090 is not satisfied for class StressTest.Test023"; }
			if (!StressTest.Test093.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test093 is not satisfied for class StressTest.Test023"; }
			if (!StressTest.Test094.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test094 is not satisfied for class StressTest.Test023"; }
	}
})
