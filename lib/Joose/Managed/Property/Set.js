Joose.Managed.Property.Set = new Joose.Proto.Meta('Joose.Managed.Property.Set', null, null, {

    container               : null,
    
    //points to class
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
        
        return this.container[name] = new this.propertyMetaClass(name, props);
    },
    
    
    removeProperty : function (name) {
        if (!this.haveOwnProperty(name)) return undefined;
        
        var prop = this.container[name];
        
        delete this.container[name];
        
        return prop;
    },
    
    
    haveProperty : function(name) {
        return typeof this.container[name] != 'undefined';
    },
    
    
    //have instead of has to avoid collision with native hasOwnProperty
    haveOwnProperty : function(name) {
        return this.haveProperty(name) && this.container.hasOwnProperty(name);
    },
    
    
    getProperty : function(name) {
        if (!this.haveProperty(name)) return undefined;
        
        var prop = this.container[name];
        
        if (!(prop instanceof Joose.Managed.Property)) return this.addProperty(name, { init : prop });
        
        return prop;
    }
    
    
}).c;
