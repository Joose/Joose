Joose.Managed.Property.ConflictMarker = new Joose.Proto.Meta('Joose.Managed.Property.ConflictMarker', null, Joose.Managed.Property, {

    computeContainer : function(props){
    },    
    

    computeValue : function(props){
        this.value = undefined;
    },    
    
    
    apply : function(){
        throw "Attempt to apply ConflictMarker to [" + this.targetClass + "]";
    },
    
    
    unapply : function(){
        throw "Attempt to unapply ConflictMarker from [" + this.targetClass + "]";
    }
    
}).c;