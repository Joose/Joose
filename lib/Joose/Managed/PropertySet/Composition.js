Joose.Managed.PropertySet.Composition = new Joose.Proto.Meta('Joose.Managed.PropertySet.Composition', null, Joose.Managed.PropertySet.Mutable, {
    
    
//    initialize : function(props) {
//        this.SUPER(props);
//    },
    
    
    clone : function (){
        var clone = new this.constructor(this.name);
        
        this.each(function(property){
            clone.addPropertyObject(property.clone());
        });
        
        return clone;
    },
    
    
    alias : function (what){
        this.each(function(property){
            property.alias(what);
        });
        
        return this;
    },
    
    
    exclude : function (what){
        this.each(function(property){
            property.exclude(what);
        });
        
        return this;
    },
    
    
    flattenTo : function (target){
        this.each(function(property, name){
            var subTarget = target.getProperty(name) || target.addProperty(name, {
                meta : property.constructor
            });
            
            property.flattenTo(subTarget);
        });
        
        return this;
    },
    
    
    composeTo : function(target){
        this.each(function(property, name){
            var subTarget = target.getProperty(name) || target.addProperty(name, {
                meta : property.constructor
            });
            
            property.composeTo(subTarget);
        });
        
        return this;
    },
    
    
    
    deCompose : function(){
        this.each(function(property){
            property.open();
        });
        
        this.SUPER();
    },
    
    
    reCompose : function(){
        this.SUPER();
        
        this.each(function(property){
            property.close();
        });
    }
    
    
}).c;
