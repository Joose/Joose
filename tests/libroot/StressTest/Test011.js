if (typeof StressTest.Test011 == 'function' && StressTest.Test011.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test011";
}

Class('StressTest.Test011', {
	use : [ 
	       'StressTest.Test024',
	       'StressTest.Test030',
	       'StressTest.Test037',
	       'StressTest.Test052',
	       'StressTest.Test072',
	       'StressTest.Test077',
	       'StressTest.Test078'
	],
	
	methods : {
		result : function () { return 11 }
	},
	
	body : function(){
			if (!StressTest.Test024.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test024 is not satisfied for class StressTest.Test011"; }
			if (!StressTest.Test030.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test030 is not satisfied for class StressTest.Test011"; }
			if (!StressTest.Test037.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test037 is not satisfied for class StressTest.Test011"; }
			if (!StressTest.Test052.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test052 is not satisfied for class StressTest.Test011"; }
			if (!StressTest.Test072.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test072 is not satisfied for class StressTest.Test011"; }
			if (!StressTest.Test077.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test077 is not satisfied for class StressTest.Test011"; }
			if (!StressTest.Test078.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test078 is not satisfied for class StressTest.Test011"; }
	}
})
