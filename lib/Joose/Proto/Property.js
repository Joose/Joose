Joose.Proto.Property = new Joose.Proto.Meta('Joose.Proto.Property', null, null, {

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