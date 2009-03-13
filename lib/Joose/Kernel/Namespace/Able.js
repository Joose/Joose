Joose.Kernel.Namespace = function(){ throw "Modules may not be instantiated." };

Joose.Kernel.Namespace.Able = new Joose.Managed.Role('Joose.Kernel.Namespace.Able', {

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
        
    }

    
}).c;
