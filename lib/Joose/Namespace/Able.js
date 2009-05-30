Joose.Namespace = function(){ throw "Modules may not be instantiated." }

Joose.Namespace.Able = new Joose.Meta.Role('Joose.Namespace.Able', {

    have : {
        parent                  : null,
        
        localName               : null,
        
        ns                      : null
    },
    
    
    after: {
        //at this point targetMeta will contain 'c' which is a container for namespace
        extractConstructor: function (extend) {
            this.localName = (this.name || '').split('.').pop()
            
            this.ns = new Joose.Managed.PropertySet.Namespace(this.name, { targetMeta : this })
        }
    },
    
    
    methods : {
        copyNamespaceState : function(targetClass) {
        	var targetMeta = targetClass.meta
        	
        	if (!targetMeta.meta.hasAttribute('ns')) throw "No 'ns' attribute in meta of [" + targetClass + ']' 
        	
        	this.ns.unapply()
        	
            targetMeta.parent               = this.parent
            targetMeta.localName            = this.localName
            
            targetMeta.ns                   = this.ns
            targetMeta.ns.targetMeta		= targetMeta
            targetMeta.ns.computeContainer()
            
            targetMeta.ns.apply()
        }
    },
    
    
    builder : {
    	
    	override : {
    		//executing body last
    		_extend : function(props) {
		        var targetMeta = this.targetMeta
		        
		        this._buildStart(targetMeta, props)
		        
		        props = props || {}
	            var body = props.body
	            delete props.body
	            
	            this.SUPER(props)
	            
	            this.body(targetMeta, body)
		        
		        
		        this._buildComplete(targetMeta, props)
    		}
    	},
    	
    	
    	methods : {
    		
	        body: function (meta, bodyFunc) {
	            if (bodyFunc) Joose.Namespace.Manager.my.executeIn(meta.c, bodyFunc, meta.ns.container, [meta.c])
	        }
	        
    	}
    }
    
}).c


Joose.Meta.Class.meta.extend({
    does                        : [ Joose.Managed.My, Joose.Managed.Attribute.Builder, Joose.Namespace.Able ]
})


Joose.Meta.Role.meta.extend({
    does                        : [ Joose.Managed.My, Joose.Managed.Attribute.Builder, Joose.Namespace.Able ]
})
