Joose.Managed.PropertySet = new Joose.Proto.Meta('Joose.Managed.PropertySet', null, Joose.Managed.Property, {

    properties                : null,
    
    propertyMetaClass         : Joose.Managed.Property,
    
    
    initialize : function(name, props) {
        props = props || {};
        
        this.SUPER(name, props);
        
        this.properties = props.properties || {};
    },
    
    
    addProperty : function (name, props) {
        props.definedIn = this;
        return this.properties[name] = new (props.meta || this.propertyMetaClass)(name, props);
    },
    
    
    addPropertyObject : function (object) {
        return this.properties[object.name] = object;
    },
    
    
    removeProperty : function (name) {
        var prop = this.properties[name];
        
        delete this.properties[name];
        
        return prop;
    },
    
    
    haveProperty : function(name) {
        return typeof this.properties[name] != 'undefined';
    },
    
    
    getProperty : function(name) {
        return this.properties[name];
    },
    
    
    each : function (func, scope){
        Joose.O.each(this.properties, function(property, name){
            if (typeof property != 'undefined') func.call(scope || this, property, name)
        });
    },
    
    
    clone : function (){
        return new this.constructor(this.name, { 
            properties : Joose.O.getMutableCopy(this.properties) 
        }); 
    },
    
    
    alias : function (what){
        Joose.O.each(what, function(aliasName, originalName){
            var original = this.getProperty(originalName);
            
            if (original) {
                var alias = new Joose.Managed.Property.Alias(aliasName, { 
                    source : original
                });
                
                this.addPropertyObject(alias);
            }
            
        }, this);
        
        return this;
    },
    
    
    exclude : function (what){
        Joose.A.each(what, function(name){
            if (this.properties[name]) this.properties[name] = undefined;
        }, this);
        
        return this;
    },
    
    
    flattenTo : function (target){
        this.each(function(property, name){
            var targetProperty = target.getProperty(name);
            
            if (targetProperty instanceof Joose.Managed.Property.ConflictMarker) return;
            
            if (typeof targetProperty == 'undefined') {
                target.addPropertyObject(property);
                return;
            }
            
            if (targetProperty == property) return;
            
            target.removeProperty(name);
            target.addProperty(name, {
                meta : Joose.Managed.Property.ConflictMarker
            });
        }, this);
        
        return this;
    },
    
    
    composeTo : function(target){
        this.each(function(property, name){
            var targetProperty = target.getProperty(name);
            
            if (typeof targetProperty == 'undefined') target.addPropertyObject(property);
            
        });
        
        return this;
    },
    
    
    composeFrom : function(){
        if (!arguments.length) throw "Compose operation requires at least one argument";
        
        var flattening = new this.constructor();
        
        Joose.A.each(arguments, function(arg) {
            if (arg instanceof Joose.Managed.PropertySet) {
                arg.flattenTo(flattening);
            } else {
                var properties = arg.properties;
                
                if (arg.alias || arg.exclude) properties = properties.clone(); 
                
                if (arg.alias) properties.alias(arg.alias);
                if (arg.exclude) properties.exclude(arg.exclude);
                
                properties.flattenTo(flattening);
            }
        });
        
        flattening.composeTo(this);
    },
    
    
    prepareApply : function(target){
        this.each(function(property){
            property.prepareApply(target);
        })
    },
    
    
    apply : function(target){
        this.each(function(property){
            property.apply(target);
        })
    },
    
    
    unapply : function(from){
        this.each(function(property){
            property.unapply(from);
        })
    }
    
    
}).c;
