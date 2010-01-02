Joose.Managed.Property.ConflictMarker = new Joose.Proto.Class('Joose.Managed.Property.ConflictMarker', {
    
    isa : Joose.Managed.Property,

    apply : function (target) {
        throw "Attempt to apply ConflictMarker [" + this.name + "] to [" + target + "]"
    }
    
}).c