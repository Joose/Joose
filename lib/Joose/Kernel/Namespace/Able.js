Joose.Kernel.Namespace = function(){ throw "Modules may not be instantiated." };

Joose.Kernel.Namespace.Able = new Joose.Kernel.Role('Joose.Kernel.Namespace.Able', {

    have : {
        parent                  : null,
        
        localName               : null,
        
        ns                      : null
    },
    
    
    after: {
        initialize: function () {
            this.localName = (this.name || '').split('.').pop();
            
            this.ns = new Joose.Managed.PropertySet.Namespace(this.name, { targetClass : this.c });
        }
    },
    
    
    methods : {
        copyNamespaceState : function(target) {
            target.parent               = this.parent;
            target.ns                   = this.ns;
        }
    },
    
    
    builder : {
    	methods : {
    		
	        body: function (bodyFunc) {
	            if (bodyFunc) Joose.Kernel.ProtoModule.executeInNamespace(this.c, bodyFunc, this.container, [this.c]);
	        },
	        
	
	        version: function (version) {
	            throw "Probably you need to include Depended Role into your deployment";
	        },
	        
	        
	        use: function (dependenciesInfo, props) {
	            throw "Probably you need to include Depended Role into your deployment";
	        }
    		
    	}
    }
    
}).c;



Joose.Kernel.Class.meta.extend({
    does                        : [ Joose.Kernel.Namespace.Able ]
});


Joose.Kernel.Role.meta.extend({
    does                        : [ Joose.Kernel.Namespace.Able ]
});