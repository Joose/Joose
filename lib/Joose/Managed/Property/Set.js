Joose.Managed.Property.Set = new Joose.Proto.Meta('Joose.Managed.Property.Set', null, null, {

    container               : null,
    target                  : null,
    
    propertyMetaClass       : Joose.Managed.Property,
    
    
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
        if (!this.haveOwnProperty(name)) return undefined;
        
        this.container[name].unapply();
        delete this.container[name];
    },
    
    
    haveProperty : function(name) {
        return typeof this.container[name] != 'undefined';
    },
    
    
    haveOwnProperty : function(name) {
        return this.haveProperty(name) && this.container.hasOwnProperty(name);
    },
    
    
    getProperty : function(name) {
        if (!this.haveProperty(name)) return undefined;
        
        var prop = this.container[name];
        
        if (!(prop instanceof this.propertyMetaClass)) return this.addProperty(name, { init : prop });
        
        return prop;
    }
    
    
}).c;
