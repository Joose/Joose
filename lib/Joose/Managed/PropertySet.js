Joose.Managed.PropertySet = new Joose.Proto.Meta('Joose.Managed.PropertySet', null, null, {

    properties                : null,
    
    propertyMetaClass       : Joose.Managed.Property,
    
    
    initialize : function(props) {
        props = props || {};
        
        this.properties = props.properties || {};
        
        if (props.compose) this.composeFrom(props.compose);
    },
    
    
    addProperty : function (name, props) {
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
        return new this.constructor({ 
            properties : Joose.O.getMutableCopy(this.properties) 
        }); 
    },
    
    
    alias : function (what){
        Joose.O.each(what, function(aliasName, originalName){
            var alias = new Joose.Managed.Property.Alias(aliasName, { 
                source : this.getProperty(originalName)
            });
            
            this.addPropertyObject(alias);
        }, this);
        
        return this;
    },
    
    
    exclude : function (what){
        Joose.A.each(what, function(name){
            this.properties[name] = undefined;
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
    }
    
    
    
}).c;
