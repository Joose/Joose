Joose.Managed.Bootstrap = new Joose.Managed.Role('Joose.Managed.Bootstrap', {
    
    does   : [ Joose.Namespace.Able, Joose.Managed.My, Joose.Managed.Attribute.Builder ],
    
    before : {
        
        initialize : function () {
            Joose.Meta.Object.prototype.initialize.call(this, {})    
        }
    }

}).c
