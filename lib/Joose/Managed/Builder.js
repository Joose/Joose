Joose.Managed.Builder = new Joose.Proto.Class('Joose.Managed.Builder', {
    
    //points to meta
    targetMeta : null,
    
    
    initialize : function (props) {
        Joose.Managed.Builder.superClass.initialize.call(this, props)
    },
    
    
    _buildStart : function (targetMeta, props) {
        targetMeta.stem.open()
        
        targetMeta.isDetached = props.isDetached
        
        delete props.isDetached
        
        Joose.A.each([ 'trait', 'traits', 'removeTrait', 'removeTraits', 'does', 'doesnot', 'doesnt' ], function (builder) {
            if (props[builder]) {
                this[builder](targetMeta, props[builder])
                delete props[builder]
            }
        }, this)
    },
    
    
    _extend : function (props) {
        if (Joose.O.isEmpty(props)) return
        
        var targetMeta = this.targetMeta
        
        this._buildStart(targetMeta, props)
        
        Joose.O.eachSafe(props, function (value, name) {
            var handler = this[name]
            
            if (!handler) throw "Unknow builder [" + name + "] was used during extending of [" + targetMeta.c + "]"
            
            handler.call(this, targetMeta, value)
        }, this)
        
        this._buildComplete(targetMeta, props)
    },
    

    _buildComplete : function (targetMeta, props) {
        targetMeta.stem.close()
        
        targetMeta.firstPass = false
    },
    
    
    methods : function (targetMeta, info) {
        Joose.O.eachSafe(info, function (value, name) {
            targetMeta.addMethod(name, value)
        }, this)
    },
    

    removeMethods : function (targetMeta, info) {
        Joose.A.each(info, function (name) {
            targetMeta.removeMethod(name)
        }, this)
    },
    
    
    have : function (targetMeta, info) {
        Joose.O.eachSafe(info, function (value, name) {
            targetMeta.addAttribute(name, value)
        }, this)
    },
    
    
    havenot : function (targetMeta, info) {
        Joose.A.each(info, function (name) {
            targetMeta.removeAttribute(name)
        }, this)
    },
    

    havent : function (targetMeta, info) {
        this.havenot(targetMeta, info)
    },
    
    
    after : function (targetMeta, info) {
        Joose.O.each(info, function (value, name) {
            targetMeta.addMethodModifier(name, value, Joose.Managed.Property.MethodModifier.After)
        }, this)
    },
    
    
    before : function (targetMeta, info) {
        Joose.O.each(info, function (value, name) {
            targetMeta.addMethodModifier(name, value, Joose.Managed.Property.MethodModifier.Before)
        }, this)
    },
    
    
    override : function (targetMeta, info) {
        Joose.O.each(info, function (value, name) {
            targetMeta.addMethodModifier(name, value, Joose.Managed.Property.MethodModifier.Override)
        }, this)
    },
    
    
    around : function (targetMeta, info) {
        Joose.O.each(info, function (value, name) {
            targetMeta.addMethodModifier(name, value, Joose.Managed.Property.MethodModifier.Around)
        }, this)
    },
    
    
    augment : function (targetMeta, info) {
        Joose.O.each(info, function (value, name) {
            targetMeta.addMethodModifier(name, value, Joose.Managed.Property.MethodModifier.Augment)
        }, this)
    },
    
    
    removeModifier : function (targetMeta, info) {
        Joose.A.each(info, function (name) {
            targetMeta.removeMethodModifier(name)
        }, this)
    },
    
    
    does : function (targetMeta, info) {
        Joose.A.each(Joose.O.wantArray(info), function (desc) {
            targetMeta.addRole(desc)
        }, this)
    },
    

    doesnot : function (targetMeta, info) {
        Joose.A.each(Joose.O.wantArray(info), function (desc) {
            targetMeta.removeRole(desc)
        }, this)
    },
    
    
    doesnt : function (targetMeta, info) {
        this.doesnot(targetMeta, info)
    },
    
    
    trait : function () {
        this.traits.apply(this, arguments)
    },
    
    
    traits : function () {
        if (this.firstPass) return
        
        if (!this.isDetached) throw "Can't apply trait to not detached class"
        
        Joose.A.each(Joose.O.wantArray(info), function (metaRole) {
            
//                    targetClassMeta.metaRoles.addProperty(metaRole.meta.name, { init : metaRole })
        })
    },
    
    
    removeTrait : function () {
        this.removeTraits.apply(this, arguments)
    },
     
    
    removeTraits : function () {
        if (!this.isDetached) throw "Can't remove trait from not detached class"
        
        Joose.A.each(Joose.O.wantArray(info), function (metaRole) {
            
//                    targetClassMeta.metaRoles.removeProperty(metaRole.meta.name)
        })
    }
    
    
    
}).c