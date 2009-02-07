if (typeof StressTest.Test007 == 'function' && StressTest.Test007.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test007";
}

Class('StressTest.Test007', {
	use : [ 
	       'StressTest.Test013',
	       'StressTest.Test016',
	       'StressTest.Test047',
	       'StressTest.Test050',
	       'StressTest.Test071',
	       'StressTest.Test077',
	       'StressTest.Test091'
	],
	
	methods : {
		result : function () { return 7 }
	},
	
	body : function(){
			if (!StressTest.Test013.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test013 is not satisfied for class StressTest.Test007"; }
			if (!StressTest.Test016.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test016 is not satisfied for class StressTest.Test007"; }
			if (!StressTest.Test047.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test047 is not satisfied for class StressTest.Test007"; }
			if (!StressTest.Test050.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test050 is not satisfied for class StressTest.Test007"; }
			if (!StressTest.Test071.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test071 is not satisfied for class StressTest.Test007"; }
			if (!StressTest.Test077.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test077 is not satisfied for class StressTest.Test007"; }
			if (!StressTest.Test091.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test091 is not satisfied for class StressTest.Test007"; }
	}
})
