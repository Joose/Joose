Joose.Proto.Property.Set = new Joose.Proto.Meta('Joose.Proto.Property.Set', null, null, {

    container               : null,
    target                  : null,
    
    propertyMetaClass       : Joose.Proto.Property,
    
    
    initialize : function(props) {
        props = props || {};
        
        this.target                 = props.target;
        
        this.computeContainer(props);
    },
    
    
    computeContainer : function(props) {
        throw "called abstract method [computeContainer] of " + this.c;
    },    
    
    
    addProperty : function (name, props) {
        props.target = this.target;
        
        this.container[name] = new this.propertyMetaClass(name, props);
        this.container[name].apply();
        
        return this.container[name];
    },
    
    
    removeProperty : function (name) {
        var prop = this.getProperty(name);
        if (prop) {
            prop.unapply();
            delete this.container[name];
        }
    },
    
    
    hasProperty : function(name) {
        return typeof this.container[name] != 'undefined';
    },
    
    
    hasOwnProperty : function(name) {
        return this.hasProperty(name) && this.container.hasOwnProperty(name);
    },
    
    
    getProperty : function(name) {
        if (!this.hasProperty(name)) return undefined;
        
        var prop = this.container[name];
        
        if (!(prop instanceof this.propertyMetaClass)) return this.addProperty(name, { init : prop });
        
        return prop;
    }
    
    
}).c;
