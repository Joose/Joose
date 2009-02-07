if (typeof StressTest.Test047 == 'function' && StressTest.Test047.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test047";
}

Class('StressTest.Test047', {
	use : [ 
	       'StressTest.Test061',
	       'StressTest.Test072',
	       'StressTest.Test080',
	       'StressTest.Test085',
	       'StressTest.Test087',
	       'StressTest.Test089',
	       'StressTest.Test098'
	],
	
	methods : {
		result : function () { return 47 }
	},
	
	body : function(){
			if (!StressTest.Test061.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test061 is not satisfied for class StressTest.Test047"; }
			if (!StressTest.Test072.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test072 is not satisfied for class StressTest.Test047"; }
			if (!StressTest.Test080.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test080 is not satisfied for class StressTest.Test047"; }
			if (!StressTest.Test085.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test085 is not satisfied for class StressTest.Test047"; }
			if (!StressTest.Test087.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test087 is not satisfied for class StressTest.Test047"; }
			if (!StressTest.Test089.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test089 is not satisfied for class StressTest.Test047"; }
			if (!StressTest.Test098.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test098 is not satisfied for class StressTest.Test047"; }
	}
})
