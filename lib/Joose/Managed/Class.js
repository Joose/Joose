Joose.Managed.Class = new Joose.Proto.Class('Joose.Managed.Class', {
    
    isa                         : Joose.Proto.Class,
    
    stem                        : null,
    stemClass                   : Joose.Managed.Stem,
    
    builder                     : null,
    builderClass                : Joose.Managed.Builder,
    
    
    construct: function (extend) {
        Joose.Managed.Class.superClass.construct.call(this, extend)
        
        this.stem.close()
    },
    
    
    processStem : function () {
        Joose.Managed.Class.superClass.processStem.call(this)
        
        this.builder    = new this.builderClass({ targetMeta : this })
        this.stem       = new this.stemClass(this.name, { targetMeta : this })
        
        var builderClass = this.getAttributedClass('builderClass')
        if (builderClass) this.addAttribute('builderClass', this.subClassOf(builderClass))
        
        var stemClass = this.getAttributedClass('stemClass')
        if (stemClass) this.addAttribute('stemClass', this.subClassOf(stemClass))
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
    },
    
    
    getBuilderTarget : function () {
        var builderClass = this.getAttributedClass('builderClass')
        if (!builderClass) throw "Attempt to extend a builder on non-meta class"
        
        return builderClass
    },
    

    getStemTarget : function () {
        var stemClass = this.getAttributedClass('stemClass')
        if (!stemClass) throw "Attempt to extend a stem on non-meta class"
        
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
    
    
    //XXX method need sanitizing
    addRole : function () {
        Joose.A.each(arguments, function (arg) {
            //instanceof Class to allow treat classes as roles
            var role = (arg.meta instanceof Joose.Managed.Class) ? arg : arg.role
            
            if (role.meta.builderRole) this.getBuilderTarget().meta.extend({
                does : [ role.meta.builderRole ]
            })
            
            if (role.meta.stemRole) this.getStemTarget().meta.extend({
                does : [ role.meta.stemRole ]
            })
            
            var desc = arg
            
            //instanceof Class to allow treat classes as roles
            if (!(desc.meta instanceof Joose.Managed.Class)) {
                desc.propertySet = desc.role.meta.stem
                delete desc.role
            } else
                desc = desc.meta.stem
            
            this.stem.addComposeInfo(desc)
        }, this)
    },
    
    
    removeRole : function () {
        Joose.A.each(arguments, function (role) {
            
            if (role.meta.builderRole) this.getBuilderTarget().meta.extend({
                doesnt : [ role.meta.builderRole ]
            })
            
            if (role.meta.stemRole) this.getStemTarget().meta.extend({
                doesnt : [ role.meta.stemRole ]
            })
            
            
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
    },
    
    
    getMethods : function () {
        return this.stem.properties.methods
    },
    
    
    getAttributes : function () {
        return this.stem.properties.attributes
    }
    
    
}).c