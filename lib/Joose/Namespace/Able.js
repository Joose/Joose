Joose.Namespace = function(){ throw "Modules may not be instantiated." }

Joose.Namespace.Able = new Joose.Meta.Role('Joose.Namespace.Able', {

    have : {
        parent                  : null,
        
        localName               : null,
        
        ns                      : null,
        
        bodyFunc                : null
    },
    
    
    before : {
        extend : function (extend) {
            this.bodyFunc = extend.body
            delete extend.body
        }
    },
    
    
    after: {
        //at this point targetMeta will contain 'c' which is a container for namespace
        extractConstructor: function (extend) {
            this.localName = (this.name || '').split('.').pop()
            
            this.ns = new Joose.Managed.PropertySet.Namespace(this.name, { targetMeta : this })
        },

        
        extend : function () {
            this.processBody()
        },
        
        
        construct : function () {
            this.processBody()
        }
        
    },
    
    
    methods : {
        
        processBody : function () {
            if (!this.stem.opened) {
                var bodyFunc = this.bodyFunc
                delete this.bodyFunc
                
                if (bodyFunc) Joose.Namespace.Manager.my.executeIn(this.c, bodyFunc, this.ns.container, [this.c])
            }
        },
        
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
    }
    
}).c


Joose.Meta.Class.meta.extend({
    does                        : [ Joose.Managed.My, Joose.Managed.Attribute.Builder, Joose.Namespace.Able ]
})


Joose.Meta.Role.meta.extend({
    does                        : [ Joose.Managed.My, Joose.Managed.Attribute.Builder, Joose.Namespace.Able ]
})
