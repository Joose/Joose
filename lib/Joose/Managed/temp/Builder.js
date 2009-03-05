Joose.Managed.Builder = new Joose.Proto.Meta('Joose.Managed.Builder', null, null, {

    //points to class
    targetClass : null,
    
    initialize : function(props) {
        this.targetClass = props.targetClass;
    },
    
    
    buildStart : function(targetClassMeta, props){
        targetClassMeta.deCompose();
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
        targetClassMeta.compose();
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
    }
    
}).c;