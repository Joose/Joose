Joose.Proto.Builder = new Joose.Proto.Meta('Joose.Proto.Builder', null, null, {

    name : null,
    
    target : null,
    
    value : null,
    
    
    initialize : function(name, props) {
        props = props || {};
        
        this.name       = name;
        
        this.computeTarget(props);
        this.computeValue(props);
    },
    
    
    computeTarget : function(props){
        this.target     = props.target;
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