Joose.Proto.Builder = new Joose.Proto.Meta('Joose.Proto.Builder', null, null, {

    //points to class
    target : null,
    
    initialize : function(props) {
        this.target = props.target;
    },
    
    
    extend : function(props) {
        Joose.O.eachSafe(props, function(value, name) {
            var handler = this[name];
            
            if (!handler) throw "Unknow builder [" + name + "] was used during extending of [" + this.target + "]";
            
            handler.call(this, this.target.meta, value);
        }, this);
    },
    
    
    methods : function(targetMeta, info) {
        Joose.O.eachSafe(info, function(value, name) {
            targetMeta.addMethod(name, value);
        }, this);
    },
    

    have : function(targetMeta, info) {
        Joose.O.eachSafe(info, function(value, name) {
            targetMeta.addAttribute(name, value);
        }, this);
    }
    
    
}).c;