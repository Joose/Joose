if (typeof StressTest.Test014 == 'function' && StressTest.Test014.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test014";
}

Class('StressTest.Test014', {
	use : [ 
	       'StressTest.Test016',
	       'StressTest.Test021',
	       'StressTest.Test028',
	       'StressTest.Test034',
	       'StressTest.Test035',
	       'StressTest.Test041',
	       'StressTest.Test050',
	       'StressTest.Test055',
	       'StressTest.Test064',
	       'StressTest.Test066',
	       'StressTest.Test067',
	       'StressTest.Test070',
	       'StressTest.Test079',
	       'StressTest.Test094'
	],
	
	methods : {
		result : function () { return 14 }
	},
	
	body : function(){
			if (!StressTest.Test016.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test016 is not satisfied for class StressTest.Test014"; }
			if (!StressTest.Test021.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test021 is not satisfied for class StressTest.Test014"; }
			if (!StressTest.Test028.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test028 is not satisfied for class StressTest.Test014"; }
			if (!StressTest.Test034.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test034 is not satisfied for class StressTest.Test014"; }
			if (!StressTest.Test035.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test035 is not satisfied for class StressTest.Test014"; }
			if (!StressTest.Test041.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test041 is not satisfied for class StressTest.Test014"; }
			if (!StressTest.Test050.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test050 is not satisfied for class StressTest.Test014"; }
			if (!StressTest.Test055.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test055 is not satisfied for class StressTest.Test014"; }
			if (!StressTest.Test064.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test064 is not satisfied for class StressTest.Test014"; }
			if (!StressTest.Test066.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test066 is not satisfied for class StressTest.Test014"; }
			if (!StressTest.Test067.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test067 is not satisfied for class StressTest.Test014"; }
			if (!StressTest.Test070.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test070 is not satisfied for class StressTest.Test014"; }
			if (!StressTest.Test079.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test079 is not satisfied for class StressTest.Test014"; }
			if (!StressTest.Test094.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test094 is not satisfied for class StressTest.Test014"; }
	}
})
