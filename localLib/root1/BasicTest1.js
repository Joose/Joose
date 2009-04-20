if (typeof BasicTest1 == 'function' && BasicTest1.meta.constructor == Joose.Meta.Class) throw "Double declaration of BasicTest1";

Class('BasicTest1', {
	version : 0.1,
	
	use : [ 
	       'BasicTest2'
	],
	
	methods : {
		result : function () { return 1 }
	}
	
})
