if (typeof StressTest.Test065 == 'function' && StressTest.Test065.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test065";
}

Class('StressTest.Test065', {
	use : [ 
	       'StressTest.Test069',
	       'StressTest.Test070',
	       'StressTest.Test074',
	       'StressTest.Test079',
	       'StressTest.Test082',
	       'StressTest.Test083',
	       'StressTest.Test089',
	       'StressTest.Test091',
	       'StressTest.Test093',
	       'StressTest.Test094',
	       'StressTest.Test097',
	       'StressTest.Test100'
	],
	
	methods : {
		result : function () { return 65 }
	},
	
	body : function(){
			if (!StressTest.Test069.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test069 is not satisfied for class StressTest.Test065"; }
			if (!StressTest.Test070.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test070 is not satisfied for class StressTest.Test065"; }
			if (!StressTest.Test074.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test074 is not satisfied for class StressTest.Test065"; }
			if (!StressTest.Test079.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test079 is not satisfied for class StressTest.Test065"; }
			if (!StressTest.Test082.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test082 is not satisfied for class StressTest.Test065"; }
			if (!StressTest.Test083.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test083 is not satisfied for class StressTest.Test065"; }
			if (!StressTest.Test089.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test089 is not satisfied for class StressTest.Test065"; }
			if (!StressTest.Test091.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test091 is not satisfied for class StressTest.Test065"; }
			if (!StressTest.Test093.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test093 is not satisfied for class StressTest.Test065"; }
			if (!StressTest.Test094.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test094 is not satisfied for class StressTest.Test065"; }
			if (!StressTest.Test097.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test097 is not satisfied for class StressTest.Test065"; }
			if (!StressTest.Test100.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test100 is not satisfied for class StressTest.Test065"; }
	}
})
