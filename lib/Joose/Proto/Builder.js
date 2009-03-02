Joose.Proto.Builder = new Joose.Proto.Meta('Joose.Proto.Builder', null, null, {

    //points to class
    target : null,
    
    initialize : function(target) {
        this.target = target;
    },
    
    
    extend : function(props) {
        Joose.O.eachSafe(props, function(value, name) {
            var handler = this[name];
            
            if (!handler) throw "Unknow builder [" + name + "] was used during extending of [" + this.target + "]";
            
            handler(value);
        }, this);
    },
    
    
    methods : function(info) {
        var meta = this.target.meta;
        
        Joose.O.eachSafe(info, function(value, name) {
            meta.addMethod(name, value);
        }, this);
    },
    

    have : function(info) {
        var meta = this.target.meta;
        
        Joose.O.eachSafe(info, function(value, name) {
            meta.addAttribute(name, value);
        }, this);
    }
    
    
}).c;