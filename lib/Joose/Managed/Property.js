Joose.Managed = function(){ throw "Modules may not be instantiated." };

Joose.Managed.Property = new Joose.Proto.Meta('Joose.Managed.Property', null, null, {

    name            : null,
    
    value           : null,
    
    
    initialize : function(name, props) {
        this.name           = name;
        
        this.computeValue(props);
    },
    
    
    computeValue : function(props){
        this.value = props.init;
    },    
    
    
    apply : function(target){
        target[this.name] = this.value;
    },
    
    
    unapply : function(from){
        var value = from[this.name];
        
        if (value != this.value) throw "Unapply failed";
        
        delete from[this.name];
    }
    
}).c;