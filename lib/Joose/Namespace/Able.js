Joose.Namespace = function(){ throw "Modules may not be instantiated." };

Joose.Namespace.Able = new Joose.Kernel.Role('Joose.Namespace.Able', {

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
    		
	        body: function (targetClassMeta, bodyFunc) {
	            if (bodyFunc) Joose.Namespace.Manager.my.executeIn(this.c, bodyFunc, this.ns.container, [this.c]);
	        },
	        
	
	        version: function () {
	            throw "Probably you need to include Depended Role into your deployment";
	        },
	        
	        
	        use: function () {
	            throw "Probably you need to include Depended Role into your deployment";
	        }
    		
    	}
    }
    
}).c;