Joose.Managed = function(){ throw "Modules may not be instantiated." };

Joose.Managed.Property = new Joose.Proto.Meta('Joose.Managed.Property', null, null, {

    name            : null,
    
    value           : null,
    
    definedIn       : null,
    
    initialize : function(name, props) {
        this.name           = name;
        
        this.definedIn = props.definedIn;
        
        this.computeValue(props);
    },
    
    
    computeValue : function(props){
        this.value = props.init;
    },    
    
    
    //target is still open at this stage
    prepareApply : function(target){
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