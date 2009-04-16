var declared = false;
try {
	declared = typeof StressTest.Test011 == 'function';
} catch (e) {
	
}

if (declared && StressTest.Test011.meta.constructor == Joose.Meta.Class) {
    __global__.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test011";
}

Class('StressTest.Test011', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test016',
	       'StressTest.Test019',
	       'StressTest.Test021',
	       'StressTest.Test024',
	       'StressTest.Test026',
	       'StressTest.Test059',
	       'StressTest.Test072',
	       'StressTest.Test073',
	       'StressTest.Test094'
	],
	
	methods : {
		result : function () { return 11 }
	},
	
	body : function(){
			if (StressTest.Test016.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test016 is not satisfied for class StressTest.Test011"; 
			}
			if (StressTest.Test019.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test019 is not satisfied for class StressTest.Test011"; 
			}
			if (StressTest.Test021.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test021 is not satisfied for class StressTest.Test011"; 
			}
			if (StressTest.Test024.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test024 is not satisfied for class StressTest.Test011"; 
			}
			if (StressTest.Test026.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test026 is not satisfied for class StressTest.Test011"; 
			}
			if (StressTest.Test059.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test059 is not satisfied for class StressTest.Test011"; 
			}
			if (StressTest.Test072.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test072 is not satisfied for class StressTest.Test011"; 
			}
			if (StressTest.Test073.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test073 is not satisfied for class StressTest.Test011"; 
			}
			if (StressTest.Test094.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test094 is not satisfied for class StressTest.Test011"; 
			}
	}
})
