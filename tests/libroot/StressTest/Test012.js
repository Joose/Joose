if (typeof StressTest.Test012 == 'function' && StressTest.Test012.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test012";
}

Class('StressTest.Test012', {
	use : [ 
	       'StressTest.Test014',
	       'StressTest.Test016',
	       'StressTest.Test022',
	       'StressTest.Test023',
	       'StressTest.Test024',
	       'StressTest.Test034',
	       'StressTest.Test047',
	       'StressTest.Test052',
	       'StressTest.Test062',
	       'StressTest.Test064',
	       'StressTest.Test067',
	       'StressTest.Test072',
	       'StressTest.Test079',
	       'StressTest.Test083',
	       'StressTest.Test087',
	       'StressTest.Test094'
	],
	
	methods : {
		result : function () { return 12 }
	},
	
	body : function(){
			if (!StressTest.Test014.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test014 is not satisfied for class StressTest.Test012"; }
			if (!StressTest.Test016.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test016 is not satisfied for class StressTest.Test012"; }
			if (!StressTest.Test022.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test022 is not satisfied for class StressTest.Test012"; }
			if (!StressTest.Test023.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test023 is not satisfied for class StressTest.Test012"; }
			if (!StressTest.Test024.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test024 is not satisfied for class StressTest.Test012"; }
			if (!StressTest.Test034.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test034 is not satisfied for class StressTest.Test012"; }
			if (!StressTest.Test047.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test047 is not satisfied for class StressTest.Test012"; }
			if (!StressTest.Test052.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test052 is not satisfied for class StressTest.Test012"; }
			if (!StressTest.Test062.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test062 is not satisfied for class StressTest.Test012"; }
			if (!StressTest.Test064.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test064 is not satisfied for class StressTest.Test012"; }
			if (!StressTest.Test067.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test067 is not satisfied for class StressTest.Test012"; }
			if (!StressTest.Test072.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test072 is not satisfied for class StressTest.Test012"; }
			if (!StressTest.Test079.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test079 is not satisfied for class StressTest.Test012"; }
			if (!StressTest.Test083.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test083 is not satisfied for class StressTest.Test012"; }
			if (!StressTest.Test087.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test087 is not satisfied for class StressTest.Test012"; }
			if (!StressTest.Test094.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test094 is not satisfied for class StressTest.Test012"; }
	}
})
