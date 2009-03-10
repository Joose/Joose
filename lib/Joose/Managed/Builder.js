Joose.Managed.Builder = new Joose.Proto.Class('Joose.Managed.Builder', null, null, {

//    processOrder : null,
    
    //points to class
    targetClass : null,
    
    initialize : function(props) {
        this.targetClass = props.targetClass;
        
//        this.processOrder = [ 'methods', 'have', 'removeMethods', 'havenot', 'after', 'before', 'does', 'doesnt' ];
    },
    
    
    buildStart : function(targetClassMeta, props){
        targetClassMeta.stem.open();
    },
    
    
    extend : function(props) {
        this.buildStart(this.targetClass.meta, props);
        
        Joose.O.eachSafe(props, function(value, name) {
            var handler = this[name];
            
            if (!handler) throw "Unknow builder [" + name + "] was used during extending of [" + this.targetClass + "]";
            
            handler.call(this, this.targetClass.meta, value);
        }, this);
        
        this.buildComplete(this.targetClass.meta, props);
    },
    

    buildComplete : function(targetClassMeta, props){
        targetClassMeta.stem.close();
    },
    
    
    methods : function(targetClassMeta, info) {
        Joose.O.eachSafe(info, function(value, name) {
            targetClassMeta.addMethod(name, value);
        }, this);
    },
    

    removeMethods : function(targetClassMeta, info) {
        Joose.A.each(info, function(name) {
            targetClassMeta.removeMethod(name);
        }, this);
    },
    
    
    have : function(targetClassMeta, info) {
        Joose.O.eachSafe(info, function(value, name) {
            targetClassMeta.addAttribute(name, value);
        }, this);
    },
    
    
    havenot : function(targetClassMeta, info) {
        Joose.A.each(info, function(name) {
            targetClassMeta.removeAttribute(name);
        }, this);
    },
    
    
    after : function(targetClassMeta, info) {
        Joose.O.each(info, function(value, name) {
            targetClassMeta.addMethodModifier(name, value, Joose.Managed.Property.MethodModifier.After);
        }, this);
    },
    
    
    before : function(targetClassMeta, info) {
        Joose.O.each(info, function(value, name) {
            targetClassMeta.addMethodModifier(name, value, Joose.Managed.Property.MethodModifier.Before);
        }, this);
    },
    
    
    override : function(targetClassMeta, info) {
        Joose.O.each(info, function(value, name) {
            targetClassMeta.addMethodModifier(name, value, Joose.Managed.Property.MethodModifier.Override);
        }, this);
    },
    
    
    around : function(targetClassMeta, info) {
        Joose.O.each(info, function(value, name) {
            targetClassMeta.addMethodModifier(name, value, Joose.Managed.Property.MethodModifier.Around);
        }, this);
    },
    
    
    augment : function(targetClassMeta, info) {
        Joose.O.each(info, function(value, name) {
            targetClassMeta.addMethodModifier(name, value, Joose.Managed.Property.MethodModifier.Augment);
        }, this);
    },
    
    
    removeModifier : function(targetClassMeta, info) {
        Joose.A.each(info, function(name) {
            targetClassMeta.removeMethodModifier(name);
        }, this);
    },
    
    
    does : function(targetClassMeta, info) {
        Joose.A.each(info, function(desc) {
            targetClassMeta.addRole(desc);
        }, this);
    },
    
    
    doesnt : function(targetClassMeta, info) {
        Joose.A.each(info, function(desc) {
            targetClassMeta.removeRole(desc);
        }, this);
    },
    
    
    require : function(targetClassMeta, info) {
        Joose.A.each(info, function(methodName) {
            targetClassMeta.addRequirement(methodName);
        }, this);
    }
    
    
}).c;