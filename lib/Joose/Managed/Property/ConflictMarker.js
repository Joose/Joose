Joose.Managed.Property.ConflictMarker = new Joose.Proto.Meta('Joose.Managed.Property.ConflictMarker', null, Joose.Managed.Property, {

    computeValue : function(props){
        this.value = undefined;
    },    
    
    
    apply : function(target){
        throw "Attempt to apply ConflictMarker to [" + target + "]";
    },
    
    
    unapply : function(from){
        throw "Attempt to unapply ConflictMarker from [" + target + "]";
    }
    
}).c;