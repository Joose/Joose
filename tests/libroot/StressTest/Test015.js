if (typeof StressTest.Test015 == 'function' && StressTest.Test015.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test015";
}

Class('StressTest.Test015', {
	use : [ 
	       'StressTest.Test022',
	       'StressTest.Test043',
	       'StressTest.Test049',
	       'StressTest.Test061',
	       'StressTest.Test063',
	       'StressTest.Test064',
	       'StressTest.Test069',
	       'StressTest.Test074',
	       'StressTest.Test080',
	       'StressTest.Test086'
	],
	
	methods : {
		result : function () { return 15 }
	},
	
	body : function(){
			if (!StressTest.Test022.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test022 is not satisfied for class StressTest.Test015"; }
			if (!StressTest.Test043.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test043 is not satisfied for class StressTest.Test015"; }
			if (!StressTest.Test049.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test049 is not satisfied for class StressTest.Test015"; }
			if (!StressTest.Test061.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test061 is not satisfied for class StressTest.Test015"; }
			if (!StressTest.Test063.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test063 is not satisfied for class StressTest.Test015"; }
			if (!StressTest.Test064.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test064 is not satisfied for class StressTest.Test015"; }
			if (!StressTest.Test069.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test069 is not satisfied for class StressTest.Test015"; }
			if (!StressTest.Test074.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test074 is not satisfied for class StressTest.Test015"; }
			if (!StressTest.Test080.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test080 is not satisfied for class StressTest.Test015"; }
			if (!StressTest.Test086.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test086 is not satisfied for class StressTest.Test015"; }
	}
})
