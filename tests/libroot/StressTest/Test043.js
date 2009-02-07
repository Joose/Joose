if (typeof StressTest.Test043 == 'function' && StressTest.Test043.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test043";
}

Class('StressTest.Test043', {
	use : [ 
	       'StressTest.Test044',
	       'StressTest.Test051',
	       'StressTest.Test057',
	       'StressTest.Test063',
	       'StressTest.Test074',
	       'StressTest.Test075',
	       'StressTest.Test089',
	       'StressTest.Test092',
	       'StressTest.Test094',
	       'StressTest.Test098',
	       'StressTest.Test099'
	],
	
	methods : {
		result : function () { return 43 }
	},
	
	body : function(){
			if (!StressTest.Test044.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test044 is not satisfied for class StressTest.Test043"; }
			if (!StressTest.Test051.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test051 is not satisfied for class StressTest.Test043"; }
			if (!StressTest.Test057.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test057 is not satisfied for class StressTest.Test043"; }
			if (!StressTest.Test063.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test063 is not satisfied for class StressTest.Test043"; }
			if (!StressTest.Test074.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test074 is not satisfied for class StressTest.Test043"; }
			if (!StressTest.Test075.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test075 is not satisfied for class StressTest.Test043"; }
			if (!StressTest.Test089.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test089 is not satisfied for class StressTest.Test043"; }
			if (!StressTest.Test092.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test092 is not satisfied for class StressTest.Test043"; }
			if (!StressTest.Test094.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test094 is not satisfied for class StressTest.Test043"; }
			if (!StressTest.Test098.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test098 is not satisfied for class StressTest.Test043"; }
			if (!StressTest.Test099.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test099 is not satisfied for class StressTest.Test043"; }
	}
})
