Joose.Managed.ClassStem.MethodModifiers = new Joose.Proto.Meta('Joose.Managed.ClassStem.MethodModifiers', null, Joose.Managed.PropertySet.Containable, {
    
    propertyMetaClass : Joose.Managed.Property.MethodModifier,
    
    
    computeContainer : function(props){
        this.container = {};
    },
    
    
    addProperty : function (name, props) {
        props.definedIn         = this;
        
        if (!this.properties[name]) {
            this.container[name] = this.properties[name] = [];
        }
        
        var modifier = new this.propertyMetaClass(name, props);
        
        this.properties[name].push(modifier);
        
        return modifier;
    },
    

    addPropertyObject : function (object) {
        var name = object.name;
        
        if (!this.properties[name]) {
            this.container[name] = this.properties[name] = [];
        }
        
        this.properties[name].push(object);
        
        return object;
    },
    
    
    //remove only the last modifier
    removeProperty : function (name) {
        if (!this.haveProperty(name)) return undefined;
        
        //removes both from container and properties
        var modifier = this.container[name].shift();
        
        //if all modifiers were removed - clearing the container and properties
        if (!this.container[name].length) this.SUPER(name);
        
        return modifier;
    }
    
    
}).c;