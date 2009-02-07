if (typeof StressTest.Test019 == 'function' && StressTest.Test019.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test019";
}

Class('StressTest.Test019', {
	use : [ 
	       'StressTest.Test027',
	       'StressTest.Test031',
	       'StressTest.Test042',
	       'StressTest.Test052',
	       'StressTest.Test055',
	       'StressTest.Test059',
	       'StressTest.Test078',
	       'StressTest.Test087',
	       'StressTest.Test098'
	],
	
	methods : {
		result : function () { return 19 }
	},
	
	body : function(){
			if (!StressTest.Test027.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test027 is not satisfied for class StressTest.Test019"; }
			if (!StressTest.Test031.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test031 is not satisfied for class StressTest.Test019"; }
			if (!StressTest.Test042.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test042 is not satisfied for class StressTest.Test019"; }
			if (!StressTest.Test052.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test052 is not satisfied for class StressTest.Test019"; }
			if (!StressTest.Test055.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test055 is not satisfied for class StressTest.Test019"; }
			if (!StressTest.Test059.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test059 is not satisfied for class StressTest.Test019"; }
			if (!StressTest.Test078.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test078 is not satisfied for class StressTest.Test019"; }
			if (!StressTest.Test087.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test087 is not satisfied for class StressTest.Test019"; }
			if (!StressTest.Test098.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test098 is not satisfied for class StressTest.Test019"; }
	}
})
