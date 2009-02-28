Joose.Proto.Property.Set = new Joose.Proto.Meta('Joose.Proto.Property.Set', null, null, {

    container               : null,
    target                  : null,
    
    propertyMetaClass       : null,
    
    
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
    },
    
    
    removeProperty : function (name) {
        this.container[name].unapply();
        delete this.container[name];
    },
    
    
    hasProperty : function(name) {
        return Boolean(this.container[name]);
    },
    
    
    hasOwnProperty : function(name) {
        return this.hasProperty(name) && this.container.hasOwnProperty(name);
    }
    
    
}).c;
