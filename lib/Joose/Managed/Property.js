Joose.Managed = function(){ throw "Modules may not be instantiated." };

Joose.Managed.Property = new Joose.Proto.Meta('Joose.Managed.Property', null, null, {

    name            : null,
    
//    //points to class
//    targetClass     : null,
    
//    container       : null,
    
    //definedIn
    definedIn       : null,
    
    value           : null,
    
    
    initialize : function(name, props) {
        props = props || {};
        
        this.name           = name;
//        this.targetClass    = props.targetClass;
        this.definedIn      = props.definedIn;
        
        this.computeContainer(props);
        this.computeValue(props);
    },
    
    
    computeContainer : function(props){
        this.container     = props.targetClass;
    },    
    

    computeValue : function(props){
        this.value = props.init;
    },    
    
    
    apply : function(){
        this.container[this.name] = this.value;
    },
    
    
    unapply : function(){
        delete this.container[this.name];
    }
    
}).c;