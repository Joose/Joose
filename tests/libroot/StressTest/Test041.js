if (typeof StressTest.Test041 == 'function' && StressTest.Test041.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test041";
}

Class('StressTest.Test041', {
	use : [ 
	       'StressTest.Test043',
	       'StressTest.Test044',
	       'StressTest.Test048',
	       'StressTest.Test050',
	       'StressTest.Test057',
	       'StressTest.Test064',
	       'StressTest.Test066',
	       'StressTest.Test075',
	       'StressTest.Test079',
	       'StressTest.Test083',
	       'StressTest.Test088',
	       'StressTest.Test090',
	       'StressTest.Test097',
	       'StressTest.Test098',
	       'StressTest.Test099'
	],
	
	methods : {
		result : function () { return 41 }
	},
	
	body : function(){
			if (!StressTest.Test043.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test043 is not satisfied for class StressTest.Test041"; }
			if (!StressTest.Test044.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test044 is not satisfied for class StressTest.Test041"; }
			if (!StressTest.Test048.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test048 is not satisfied for class StressTest.Test041"; }
			if (!StressTest.Test050.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test050 is not satisfied for class StressTest.Test041"; }
			if (!StressTest.Test057.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test057 is not satisfied for class StressTest.Test041"; }
			if (!StressTest.Test064.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test064 is not satisfied for class StressTest.Test041"; }
			if (!StressTest.Test066.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test066 is not satisfied for class StressTest.Test041"; }
			if (!StressTest.Test075.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test075 is not satisfied for class StressTest.Test041"; }
			if (!StressTest.Test079.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test079 is not satisfied for class StressTest.Test041"; }
			if (!StressTest.Test083.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test083 is not satisfied for class StressTest.Test041"; }
			if (!StressTest.Test088.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test088 is not satisfied for class StressTest.Test041"; }
			if (!StressTest.Test090.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test090 is not satisfied for class StressTest.Test041"; }
			if (!StressTest.Test097.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test097 is not satisfied for class StressTest.Test041"; }
			if (!StressTest.Test098.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test098 is not satisfied for class StressTest.Test041"; }
			if (!StressTest.Test099.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test099 is not satisfied for class StressTest.Test041"; }
	}
})
