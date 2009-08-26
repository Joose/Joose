Joose.Managed.StemElement.MethodModifiers = new Joose.Proto.Class('Joose.Managed.StemElement.MethodModifiers', {

    isa : Joose.Managed.PropertySet.Mutable,
    
    targetMeta             : null,
    
    propertyMetaClass : null,
    
    
    initialize : function (name, props) {
        Joose.Managed.StemElement.MethodModifiers.superClass.initialize.call(this, name, props)
        
        this.targetMeta        = props.targetMeta
    },
    
    
    addProperty : function (name, props) {
        props.definedIn         = this
        var modifier = new props.meta(name, props)
        
        if (!this.properties[name]) this.properties[name] = []
        this.properties[name].push(modifier)
        
        return modifier
    },
    

    addPropertyObject : function (object) {
        var name = object.name
        
        if (!this.properties[name]) this.properties[name] = []
        
        this.properties[name].push(object)
        
        return object
    },
    
    
    //remove only the last modifier
    removeProperty : function (name) {
        if (!this.haveProperty(name)) return undefined
        
        var modifier = this.properties[name].pop()
        
        //if all modifiers were removed - clearing the properties
        if (!this.properties[name].length) Joose.Managed.StemElement.MethodModifiers.superClass.removeProperty.call(this, name)
        
        return modifier
    },
    
    
    alias : function () {
    },
    
    
    exclude : function () {
    },
    
    
    flattenTo : function (target) {
        var targetProps = target.properties
        
        this.each(function (modifiersArr, name) {
            var targetModifiersArr = targetProps[name]
            
            if (targetModifiersArr == null) targetModifiersArr = targetProps[name] = []
            
            Joose.A.each(modifiersArr, function (modifier) {
                if (!Joose.A.exists(targetModifiersArr, modifier)) targetModifiersArr.push(modifier)
            })
            
        }, this)
        
        return this
    },
    
    
    composeTo : function (target) {
        this.flattenTo(target)
        
        return this
    },

    
    deCompose : function () {
        this.each(function (modifiersArr, name) {
            var i = 0
            while (i < modifiersArr.length) if (modifiersArr[i].definedIn != this) modifiersArr.splice(i,1); else i++
            
        }, this)
    },
    
    
    prepareApply : function (target) {
//        this.each(function (modifiersArr, name) {
//            Joose.A.each(modifiersArr, function (modifier) {
//                modifier.prepareApply(target)
//            })
//        }, this)
    },

    
    apply : function (target) {
        this.each(function (modifiersArr, name) {
            Joose.A.each(modifiersArr, function (modifier) {
                modifier.apply(target)
            })
        }, this)
    },
    
    
    unapply : function (from) {
        this.each(function (modifiersArr, name) {
            for (var i = modifiersArr.length - 1; i >=0; i--) {
                modifiersArr[i].unapply(from)
            }
        }, this)
    }
    
    
    
}).c