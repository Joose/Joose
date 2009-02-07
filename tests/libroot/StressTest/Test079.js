if (typeof StressTest.Test079 == 'function' && StressTest.Test079.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test079";
}

Class('StressTest.Test079', {
	use : [ 
	       'StressTest.Test081',
	       'StressTest.Test082',
	       'StressTest.Test083',
	       'StressTest.Test085',
	       'StressTest.Test090',
	       'StressTest.Test091',
	       'StressTest.Test093',
	       'StressTest.Test096',
	       'StressTest.Test098',
	       'StressTest.Test100'
	],
	
	methods : {
		result : function () { return 79 }
	},
	
	body : function(){
			if (!StressTest.Test081.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test081 is not satisfied for class StressTest.Test079"; }
			if (!StressTest.Test082.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test082 is not satisfied for class StressTest.Test079"; }
			if (!StressTest.Test083.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test083 is not satisfied for class StressTest.Test079"; }
			if (!StressTest.Test085.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test085 is not satisfied for class StressTest.Test079"; }
			if (!StressTest.Test090.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test090 is not satisfied for class StressTest.Test079"; }
			if (!StressTest.Test091.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test091 is not satisfied for class StressTest.Test079"; }
			if (!StressTest.Test093.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test093 is not satisfied for class StressTest.Test079"; }
			if (!StressTest.Test096.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test096 is not satisfied for class StressTest.Test079"; }
			if (!StressTest.Test098.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test098 is not satisfied for class StressTest.Test079"; }
			if (!StressTest.Test100.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test100 is not satisfied for class StressTest.Test079"; }
	}
})
