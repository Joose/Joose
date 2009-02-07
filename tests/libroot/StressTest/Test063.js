if (typeof StressTest.Test063 == 'function' && StressTest.Test063.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test063";
}

Class('StressTest.Test063', {
	use : [ 
	       'StressTest.Test064',
	       'StressTest.Test066',
	       'StressTest.Test071',
	       'StressTest.Test077',
	       'StressTest.Test089',
	       'StressTest.Test090'
	],
	
	methods : {
		result : function () { return 63 }
	},
	
	body : function(){
			if (!StressTest.Test064.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test064 is not satisfied for class StressTest.Test063"; }
			if (!StressTest.Test066.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test066 is not satisfied for class StressTest.Test063"; }
			if (!StressTest.Test071.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test071 is not satisfied for class StressTest.Test063"; }
			if (!StressTest.Test077.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test077 is not satisfied for class StressTest.Test063"; }
			if (!StressTest.Test089.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test089 is not satisfied for class StressTest.Test063"; }
			if (!StressTest.Test090.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test090 is not satisfied for class StressTest.Test063"; }
	}
})
