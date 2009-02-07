if (typeof StressTest.Test013 == 'function' && StressTest.Test013.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test013";
}

Class('StressTest.Test013', {
	use : [ 
	       'StressTest.Test017',
	       'StressTest.Test043',
	       'StressTest.Test051',
	       'StressTest.Test058',
	       'StressTest.Test074',
	       'StressTest.Test077',
	       'StressTest.Test080',
	       'StressTest.Test081',
	       'StressTest.Test096',
	       'StressTest.Test098'
	],
	
	methods : {
		result : function () { return 13 }
	},
	
	body : function(){
			if (!StressTest.Test017.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test017 is not satisfied for class StressTest.Test013"; }
			if (!StressTest.Test043.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test043 is not satisfied for class StressTest.Test013"; }
			if (!StressTest.Test051.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test051 is not satisfied for class StressTest.Test013"; }
			if (!StressTest.Test058.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test058 is not satisfied for class StressTest.Test013"; }
			if (!StressTest.Test074.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test074 is not satisfied for class StressTest.Test013"; }
			if (!StressTest.Test077.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test077 is not satisfied for class StressTest.Test013"; }
			if (!StressTest.Test080.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test080 is not satisfied for class StressTest.Test013"; }
			if (!StressTest.Test081.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test081 is not satisfied for class StressTest.Test013"; }
			if (!StressTest.Test096.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test096 is not satisfied for class StressTest.Test013"; }
			if (!StressTest.Test098.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test098 is not satisfied for class StressTest.Test013"; }
	}
})
