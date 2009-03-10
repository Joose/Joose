Joose.Managed.RoleStem.Requirements = new Joose.Proto.Class('Joose.Managed.RoleStem.Requirements', null, Joose.Managed.PropertySet.Mutable, {
    
    propertyMetaClass : Joose.Managed.Property.Requirement,
    
    
    alias : function (){
    },
    
    
    exclude : function (){
    },
    
    
    flattenTo : function (target){
        this.each(function(property, name){
            if (!target.getProperty(name)) target.addPropertyObject(property);
        }, this);
        
        return this;
    },
    
    
    composeTo : function(target){
        this.flattenTo(target);
        
        return this;
    }

    
}).c;