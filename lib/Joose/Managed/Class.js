Joose.Managed.Class = new Joose.Proto.Class('Joose.Managed.Class', {
    
    isa                         : Joose.Proto.Class,
    
    stem                        : null,
    stemClass                   : Joose.Managed.Stem,
    stemClassMutated            : false,
    
    builder                     : null,
    builderClass                : Joose.Managed.Builder,
    builderClassMutated         : false,
    
    isDetached                  : false,
    firstPass                   : true,
    
    
    BUILD : function () {
        var props = Joose.Managed.Class.superClass.BUILD.apply(this, arguments)
        
        if (this.meta.isDetached) return props
        
        var traits = Joose.O.wantArray(props.trait || props.traits || [])
        delete props.trait
        delete props.traits
        
        Joose.A.each(Joose.O.wantArray(props.does || []), function (arg) {
            var role = (arg.meta instanceof Joose.Managed.Class) ? arg : arg.role
            
            if (role.meta.meta.isDetached) traits.push(role.meta.constructor)
        }, this)
        
        if (traits.length) props.traits = traits 
        
        return props
    },
    
    
    defaultConstructor: function () {
        return function () {
            var props = this.BUILD.apply(this, arguments)
            
            var traits = props.trait || props.traits
            delete props.trait
            delete props.traits
            
            if (traits || props.detached) {
                delete props.detached
                
                var classWithTrait = this.meta.subClassOf(this.constructor, { does : traits || [] })
                var meta = classWithTrait.meta
                meta.isDetached = true
                
                return meta.instantiate.apply(meta, arguments)
            }
            
            this.initialize(props)
        }
    },
    
    
    finalize: function (extend) {
        Joose.Managed.Class.superClass.finalize.call(this, extend)
        
        this.stem.close()
    },
    
    
    processStem : function () {
        Joose.Managed.Class.superClass.processStem.call(this)
        
        this.builder    = new this.builderClass({ targetMeta : this })
        this.stem       = new this.stemClass({ name : this.name, targetMeta : this })
    },
    
    
    extend : function (props) {
        if (props.builder) {
            this.getBuilderTarget().meta.extend(props.builder)
            delete props.builder
        }
        
        if (props.stem) {
            this.getStemTarget().meta.extend(props.stem)
            delete props.stem
        }
        
        this.builder._extend(props)
        
        this.firstPass = false
    },
    
    
    getBuilderTarget : function () {
        var builderClass = this.getAttributedClass('builderClass')
        
        if (this.builderClassMutated) return builderClass
        
        if (!builderClass) throw "Attempt to extend a builder on non-meta class"
        
        this.builderClassMutated = true
        
        builderClass = this.subClassOf(builderClass)
        
        this.addAttribute('builderClass', builderClass)
        
        return builderClass
    },
    

    getStemTarget : function () {
        var stemClass = this.getAttributedClass('stemClass')
        
        if (this.stemClassMutated) return stemClass
        
        if (!stemClass) throw "Attempt to extend a stem on non-meta class"
        
        this.stemClassMutated = true
        
        stemClass = this.subClassOf(stemClass)
        
        this.addAttribute('stemClass', stemClass)
        
        return stemClass
    },
    
    
    getAttributedClass : function (attributeName) {
        var attrClass = this.getAttribute(attributeName)
        if (attrClass instanceof Joose.Managed.Property.Attribute) attrClass = attrClass.value
        
        return attrClass
    },
    
    
    addMethodModifier: function (name, func, type) {
        var props = {}
        props.init = func
        props.meta = type
        
        return this.stem.properties.methodsModifiers.addProperty(name, props)
    },
    
    
    removeMethodModifier: function (name) {
        return this.stem.properties.methodsModifiers.removeProperty(name)
    },
    
    
    addMethod: function (name, func, props) {
        props = props || {}
        props.init = func
        
        return this.stem.properties.methods.addProperty(name, props)
    },
    
    
    addAttribute: function (name, init, props) {
        props = props || {}
        props.init = init
        
        return this.stem.properties.attributes.addProperty(name, props)
    },
    
    
    removeMethod : function (name) {
        return this.stem.properties.methods.removeProperty(name)
    },

    
    removeAttribute: function (name) {
        return this.stem.properties.attributes.removeProperty(name)
    },
    
    
    hasMethod: function (name) {
        return this.stem.properties.methods.haveProperty(name)
    },
    
    
    hasAttribute: function (name) { 
        return this.stem.properties.attributes.haveProperty(name)
    },
    
    
    hasOwnMethod: function (name) {
        return this.stem.properties.methods.haveOwnProperty(name)
    },
    
    
    hasOwnAttribute: function (name) { 
        return this.stem.properties.attributes.haveOwnProperty(name)
    },
    

    getMethod : function (name) {
        return this.stem.properties.methods.getProperty(name)
    },
    
    
    getAttribute : function (name) {
        return this.stem.properties.attributes.getProperty(name)
    },
    
    
    eachRole : function (roles, func, scope) {
        Joose.A.each(roles, function (arg, index) {
            var role = (arg.meta instanceof Joose.Managed.Class) ? arg : arg.role
            
            func.call(scope || this, arg, role, index)
        }, this)
    },
    
    
    addRole : function () {
        
        this.eachRole(arguments, function (arg, role) {
            
            this.beforeRoleAdd(role)
            
            var desc = arg
            
            if (role != arg) {
                desc.propertySet = role.meta.stem
                delete desc.role
            } else
                desc = desc.meta.stem
            
            this.stem.addComposeInfo(desc)
            
        }, this)
    },
    
    
    beforeRoleAdd : function (role) {
        if (role.meta.builderClassMutated) this.getBuilderTarget().meta.extend({
            does : [ role.meta.getBuilderTarget() ]
        })
        
        if (role.meta.stemClassMutated) this.getStemTarget().meta.extend({
            does : [ role.meta.getStemTarget() ]
        })
        
        if (role.meta.meta.isDetached && !this.firstPass) this.builder.traits(this, role.meta.constructor)
    },
    
    
    beforeRoleRemove : function (role) {
        if (role.meta.builderClassMutated) this.getBuilderTarget().meta.extend({
            doesnt : [ role.meta.getBuilderTarget() ]
        })
        
        if (role.meta.stemClassMutated) this.getStemTarget().meta.extend({
            doesnt : [ role.meta.getStemTarget() ]
        })
        
        if (role.meta.meta.isDetached && !this.firstPass) this.builder.removeTraits(this, role.meta.constructor)
    },
    
    
    removeRole : function () {
        this.eachRole(arguments, function (arg, role) {
            this.beforeRoleRemove(role)
            
            this.stem.removeComposeInfo(role.meta.stem)
        }, this)
    },
    
    
    getRoles : function () {
        var roles = []
        
        Joose.A.each(this.stem.composedFrom, function (composeDesc) {
            //compose descriptor can contain 'alias' and 'exclude' fields, in this case actual reference is stored
            //into 'propertySet' field
            if (!(composeDesc instanceof Joose.Managed.PropertySet)) composeDesc = composeDesc.propertySet
            
            roles.push(composeDesc.targetMeta.c)
        })
        
        return roles
    },
    
    
    does : function (role) {
        var myRoles = this.getRoles()
        for (var i = 0; i < myRoles.length; i++) if (role == myRoles[i]) return true
        
        for (var i = 0; i < myRoles.length; i++) if (myRoles[i].meta.does(role)) return true
        
        var superMeta = this.superClass.meta
        
        if (this.superClass != Joose.Proto.Empty && superMeta.meta.hasMethod('does')) return superMeta.does(role)
        
        return false
    },
    
    
    getMethods : function () {
        return this.stem.properties.methods
    },
    
    
    getAttributes : function () {
        return this.stem.properties.attributes
    }
    
    
}).c