Joose.Namespace = function () { throw "Modules may not be instantiated." }

Joose.Namespace.Able = new Joose.Managed.Role('Joose.Namespace.Able', {

    have : {
        parentNs                : null,
        
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
        adaptConstructor: function (extend) {
            this.localName = (this.name || '').split('.').pop()
            
            //XXX check that 'ns' is overwritten after planting
            this.ns = new Joose.Managed.PropertySet.Namespace({ name : this.name, targetMeta : this })
        },

        
        extend : function () {
            this.processBody()
        },
        
        
        finalize : function () {
            this.processBody()
        }
        
    },
    
    
    methods : {
        
        processBody : function () {
            if (!this.stem.opened) {
                var bodyFunc = this.bodyFunc
                delete this.bodyFunc
                
                if (bodyFunc) Joose.Namespace.Manager.my.executeIn(this.c, bodyFunc)
            }
        }
        
    }
    
}).c