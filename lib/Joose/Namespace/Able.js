Joose.Namespace = function(){ throw "Modules may not be instantiated." };

Joose.Namespace.Able = new Joose.MetaRole('Joose.Namespace.Able', {

    have : {
        parent                  : null,
        
        localName               : null,
        
        ns                      : null
    },
    
    
    after: {
        processStem: function () {
            this.localName = (this.name || '').split('.').pop();
            
            this.ns = new Joose.Managed.PropertySet.Namespace(this.name, { targetMeta : this });
        }
    },
    
    
    methods : {
        copyNamespaceState : function(targetClass) {
        	var targetMeta = targetClass.meta;
        	
        	if (!targetMeta.meta.hasAttribute('ns')) throw "No ns";
        	
        	this.ns.unapply();
        	
            targetMeta.parent               = this.parent;
            targetMeta.localName            = this.localName;
            
            targetMeta.ns                   = this.ns;
            targetMeta.ns.targetMeta		= targetMeta;
            targetMeta.ns.computeContainer();
            
            targetMeta.ns.apply();
        }
    },
    
    
    builder : {
    	methods : {
    		
	        body: function (meta, bodyFunc) {
	            if (bodyFunc) Joose.Namespace.Manager.my.executeIn(meta.c, bodyFunc, meta.ns.container, [meta.c]);
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


Joose.MetaClass.meta.extend({
    does                        : [ Joose.Namespace.Able ]
});


Joose.MetaRole.meta.extend({
    does                        : [ Joose.Namespace.Able ]
});
