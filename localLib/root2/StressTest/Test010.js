var declared = false;
try {
	declared = typeof StressTest.Test010 == 'function';
} catch (e) {
	
}

if (declared && StressTest.Test010.meta.constructor == Joose.MetaClass) {
    __global__.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test010";
}

Class('StressTest.Test010', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test016',
	       'StressTest.Test022',
	       'StressTest.Test025',
	       'StressTest.Test028',
	       'StressTest.Test031',
	       'StressTest.Test043',
	       'StressTest.Test044',
	       'StressTest.Test052',
	       'StressTest.Test055',
	       'StressTest.Test064',
	       'StressTest.Test073',
	       'StressTest.Test077'
	],
	
	methods : {
		result : function () { return 10 }
	},
	
	body : function(){
			if (StressTest.Test016.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test016 is not satisfied for class StressTest.Test010"; 
			}
			if (StressTest.Test022.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test022 is not satisfied for class StressTest.Test010"; 
			}
			if (StressTest.Test025.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test025 is not satisfied for class StressTest.Test010"; 
			}
			if (StressTest.Test028.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test028 is not satisfied for class StressTest.Test010"; 
			}
			if (StressTest.Test031.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test031 is not satisfied for class StressTest.Test010"; 
			}
			if (StressTest.Test043.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test043 is not satisfied for class StressTest.Test010"; 
			}
			if (StressTest.Test044.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test044 is not satisfied for class StressTest.Test010"; 
			}
			if (StressTest.Test052.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test052 is not satisfied for class StressTest.Test010"; 
			}
			if (StressTest.Test055.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test055 is not satisfied for class StressTest.Test010"; 
			}
			if (StressTest.Test064.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test064 is not satisfied for class StressTest.Test010"; 
			}
			if (StressTest.Test073.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test073 is not satisfied for class StressTest.Test010"; 
			}
			if (StressTest.Test077.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test077 is not satisfied for class StressTest.Test010"; 
			}
	}
})
