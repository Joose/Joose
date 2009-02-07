if (typeof StressTest.Test072 == 'function' && StressTest.Test072.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test072";
}

Class('StressTest.Test072', {
	use : [ 
	       'StressTest.Test073',
	       'StressTest.Test074',
	       'StressTest.Test075',
	       'StressTest.Test080',
	       'StressTest.Test082',
	       'StressTest.Test084',
	       'StressTest.Test086',
	       'StressTest.Test087',
	       'StressTest.Test089',
	       'StressTest.Test090',
	       'StressTest.Test091',
	       'StressTest.Test093',
	       'StressTest.Test095',
	       'StressTest.Test096',
	       'StressTest.Test097',
	       'StressTest.Test100'
	],
	
	methods : {
		result : function () { return 72 }
	},
	
	body : function(){
			if (!StressTest.Test073.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test073 is not satisfied for class StressTest.Test072"; }
			if (!StressTest.Test074.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test074 is not satisfied for class StressTest.Test072"; }
			if (!StressTest.Test075.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test075 is not satisfied for class StressTest.Test072"; }
			if (!StressTest.Test080.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test080 is not satisfied for class StressTest.Test072"; }
			if (!StressTest.Test082.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test082 is not satisfied for class StressTest.Test072"; }
			if (!StressTest.Test084.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test084 is not satisfied for class StressTest.Test072"; }
			if (!StressTest.Test086.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test086 is not satisfied for class StressTest.Test072"; }
			if (!StressTest.Test087.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test087 is not satisfied for class StressTest.Test072"; }
			if (!StressTest.Test089.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test089 is not satisfied for class StressTest.Test072"; }
			if (!StressTest.Test090.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test090 is not satisfied for class StressTest.Test072"; }
			if (!StressTest.Test091.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test091 is not satisfied for class StressTest.Test072"; }
			if (!StressTest.Test093.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test093 is not satisfied for class StressTest.Test072"; }
			if (!StressTest.Test095.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test095 is not satisfied for class StressTest.Test072"; }
			if (!StressTest.Test096.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test096 is not satisfied for class StressTest.Test072"; }
			if (!StressTest.Test097.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test097 is not satisfied for class StressTest.Test072"; }
			if (!StressTest.Test100.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test100 is not satisfied for class StressTest.Test072"; }
	}
})
