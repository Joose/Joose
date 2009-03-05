Joose.Managed.Property.Alias = new Joose.Proto.Meta('Joose.Managed.Property.Alias', null, Joose.Managed.Property, {

    source : null,
    
    
    computeValue : function(props){
        this.source         = props.source;
    },
    
    
    apply : function(target){
        this.source.apply(target);
    },
    
    
    unapply : function(from){
        this.source.unapply(from);
    }
    
}).c;