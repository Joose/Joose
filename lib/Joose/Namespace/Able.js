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
        //at this point targetMeta will contain 'c' which is a container for Joose.Managed.PropertySet.Namespace
        extractConstructor: function (extend) {
            this.localName = (this.name || '').split('.').pop()
            
            //XXX check that 'ns' is overwritten after planting
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
                
                if (bodyFunc) Joose.Namespace.Manager.my.executeIn(this.c, bodyFunc, this.ns.container, [ this.c ])
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
