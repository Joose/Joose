Joose.Managed.Method.Modifier.Set = new Joose.Proto.Meta('Joose.Managed.Method.Modifier.Set', null, Joose.Managed.Property.Composition, {
    
    propertyMetaClass : Joose.Managed.Method.Modifier,
    
    
    computeContainer : function(props){
        this.container = this.targetClass.meta.methodsModifiers;
    },
    
    
    addProperty : function (name, props) {
        props.targetClass       = this.targetClass;
        props.belongsTo         = this;
        
        if (!this.elements[name]) {
            this.elements[name] = [];
            this.container[name] = this.elements[name]
        }
        
        var modifier = new this.propertyMetaClass(name, props);
        
        this.elements[name].push(modifier);
        
        return modifier;
    },
    
    
    //remove only the last modifier
    removeProperty : function (name) {
        if (!this.haveOwnProperty(name)) return undefined;
        
        //removes both from container and elements
        var modifier = this.container[name].shift();
        
        //if all modifiers were removed - clearing the container and elements
        if (!this.container[name].length) {
            delete this.container;
            delete this.elements;
        }
        
        return modifier;
    },
    
    
    //return array of Joose.Managed.Method.Modifier
    getProperty : function(name) {
        if (!this.haveProperty(name)) return undefined;
        
        return this.container[name];
    }
    
    
}).c;