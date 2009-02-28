Joose.Proto.Property = new Joose.Proto.Meta('Joose.Proto.Property', null, null, {

    name : null,
    
    target : null,
    
    value : null,
    
    
    initialize : function(name, props) {
        props = props || {};
        
        this.name       = name;
        this.target     = props.target;
        
        this.computeTarget(props);
        this.computeValue(props);
    },
    
    
    computeTarget : function(props){
        throw "called abstract method [computeTarget] of " + this.c;
    },    
    

    computeValue : function(props){
        this.value = props.init;
    },    
    
    
    apply : function(){
        this.target[this.name] = this.value;
    },
    
    
    unapply : function(){
        delete this.target[this.name];
    }
    
}).c;