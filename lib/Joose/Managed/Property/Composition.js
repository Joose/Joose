Joose.Managed.Property.Composition = new Joose.Proto.Meta('Joose.Managed.Property.Composition', null, Joose.Managed.Property.Set, {

//    container               : null,
//    target                  : null,
    
//    propertyMetaClass       : Joose.Managed.Property,

    sets                : null,
    
    
    initialize : function(props) {
        this.SUPER(props);
        
        this.sets = [];
    },
    
    
    addSet : function(){
        
    },
    
    
    removeSet : function(){
    },
    
    
    compose : function(){
    },
    

    deCompose : function(){
    }
    
    
//    addProperty : function (name, props) {
//        props.target = this.target;
//        
//        this.container[name] = new this.propertyMetaClass(name, props);
//        this.container[name].apply();
//        
//        return this.container[name];
//    },
    
    
//    removeProperty : function (name) {
//        if (!this.haveOwnProperty(name)) return undefined;
//        
//        this.container[name].unapply();
//        delete this.container[name];
//    },
    
    
//    haveProperty : function(name) {
//        return typeof this.container[name] != 'undefined';
//    },
    
    
//    haveOwnProperty : function(name) {
//        return this.haveProperty(name) && this.container.hasOwnProperty(name);
//    },
    
    
//    getProperty : function(name) {
//        if (!this.haveProperty(name)) return undefined;
//        
//        var prop = this.container[name];
//        
//        if (!(prop instanceof this.propertyMetaClass)) return this.addProperty(name, { init : prop });
//        
//        return prop;
//    }
    
    
}).c;