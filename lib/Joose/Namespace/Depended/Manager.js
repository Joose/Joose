Joose.Namespace.Depended.Manager = new Joose.MetaRole('Joose.Namespace.Depended.Manager', {
    
    my : {
    	
    	have : {
			INC : [ ['../localLib/root1'], ['../localLib/root2'] ],
			
			disableCaching : true
    	},

    	
        methods : {
            
	        prepareVirtual: function (name) {
	            if (this.virtual[name]) return this.virtual[name];
	            
	            return this.virtual[name] = new Joose.Namespace.Keeper(name).c;
	        },
	        
	        
	        use: function (dependenciesInfo, callback, scope) {
	            var anonymousMeta = new Joose.Namespace.Keeper();
	            anonymousMeta.extend({
	                use: dependenciesInfo,
	                body: function (){
	                    callback.call(scope || this);
	                }
	            });
	        }
            
        }
    }
    
}).c;


Joose.Namespace.Manager.meta.extend({
	does : [ Joose.Namespace.Depended.Manager ]
});


use = function(){
    Joose.Namespace.Manager.my.use.apply(Joose.Namespace.Manager.my, arguments);
}

