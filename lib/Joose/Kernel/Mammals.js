var mammalsMeta = new Joose.Kernel.Reptiles('Joose.Kernel.Mammals');

mammalsMeta.addSuperClass(Joose.Kernel.Reptiles);

mammalsMeta.addAttribute('attributeConstructor', { init : Joose.Kernel.AdvancedProtoAttribute, lazy : true });

mammalsMeta.wrapMethod('initialize', 'after', function() {
    this.roles = [];
    this.myRoles = [];
});

mammalsMeta.wrapMethod('adoptNextGeneration', 'after', function() {
    this.addDetacher();
});

mammalsMeta.wrapMethod('addSuperClass', 'after', function(classObject) {
    // Roles
    if (classObject.meta.meta.hasAttribute('roles')) {
	    var roles = classObject.meta.roles
	    for(var i = 0; i < roles.length; i++) this.roles.push(roles[i])
    }
});

mammalsMeta.wrapMethod('buildComplete', 'before', function() {
    // Roles
    for(var i = 0; i < this.roles.length; i++) {
        this.roles[i].meta.applyMethodModifiers(this.c)
    }
});

mammalsMeta.wrapMethod('buildComplete', 'after', function() {
	this.validateClass();
});


//plus some new genes
mammalsMeta.addGenes({
	
    roles : null,// All roles
    
    myRoles : null,  // Only roles applied to me directly
    
    isDetached : false,
    
    
    addRole: function (roleClass) {
        this.dieIfString(roleClass);
        
        if(roleClass.meta.apply(this.getClassObject())) {
            this.roles.push(roleClass);
            this.myRoles.push(roleClass);
        }
    },

    
    getRoles:    function () {
        return this.roles;
    },
    
    
    addDetacher: function () {
        this.addMethod("detach", function detach () {
            var meta = this.meta;
            
            if(meta.isDetached) {
                return // no reason to do it again
            } 
            
            var c = meta.makeAnonSubclass()
            
            c.meta.isDetached = true;
            
            // appy the role to the anonymous class
            // swap meta class of object with new instance
            this.meta      = c.meta;
            // swap __proto__ chain of object to its new class
            // unfortunately this is not available in IE :(
            // object.__proto__ = c.prototype
 
            this.constructor = c;
            
            var proto;
            
            // Workaround for IE and opera to enable prototype extention via the meta class (by making them identical :)
            // This however makes Role.unapply impossible
            if(!this.__proto__) {
                proto = this
            } else {
                proto   = {};
                Joose.copyObject(this, proto)
            }
            
            
            c.prototype    = proto;
            this.__proto__ = c.prototype
            return
        })
    },
    
    
    validateClass: function () {
        var c  = this.getClassObject();
        var me = this;
        
        // Test whether all rows are fully implemented.
        var throwException = true;
        Joose.A.each(this.roles, function(role) {
        	role.meta.isImplementedBy(c, throwException)
        })
    },

    
    does: function (roleObject) {
        
        for(var i = 0; i < this.roles.length; i++) {
            if(roleObject === this.roles[i]) {
                return true
            }
        }
        
        // dive into roles to find roles implemented by my roles
        for(var i = 0; i < this.roles.length; i++) {
            if(this.roles[i].meta.does(roleObject)) {
                return true
            }
        }
        
        return false
    },
    
    
    handlePropdoes:    function (role) {
        var me = this;
        if(role instanceof Array) {
            Joose.A.each(role, function (aRole) {
                me.addRole(aRole)
            })
        } else {
            me.addRole(role)
        }
        
    }
    
});


Joose.Kernel.Mammals = mammalsMeta.getClassObject();
