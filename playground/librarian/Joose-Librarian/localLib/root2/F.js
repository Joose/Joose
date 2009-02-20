if (typeof F == 'function'&& F.meta.meta.isa(Joose.Class)) throw "Double declaration F";

Class('F', {
	version : 0.1,
	
	use : [ 
	       'ext://I',
	       'J'
	],
	
	methods : {
		result : function () { return 'F' }
	},
	
	body : function(){
			if (!typeof I == 'function') { 
				throw "Dependency I is not satisfied for class F"; 
			}
            if (!J.meta.meta.isa(Joose.Class)) { 
                throw "Dependency J is not satisfied for class F"; 
            }
	}
})
