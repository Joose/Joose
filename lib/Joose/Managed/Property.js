Joose.Managed = function(){ throw "Modules may not be instantiated." };

Joose.Managed.Property = new Joose.Proto.Meta('Joose.Managed.Property', null, null, {

    name            : null,
    
    //points to class
    target          : null,
    container       : null,
    
    value           : null,
    
    
    initialize : function(name, props) {
        props = props || {};
        
        this.name       = name;
        this.target     = props.target;
        
        this.computeContainer(props);
        this.computeValue(props);
    },
    
    
    computeContainer : function(props){
        this.container     = props.target;
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