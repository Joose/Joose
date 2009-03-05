//Joose.Managed.PropertySet.Mutable = new Joose.Proto.Meta('Joose.Managed.PropertySet.Mutable', null, null, {
//
//    container               : null,
//    
//    //copy of own objects (will allow perform just "each", instead of "eachSafe" on container (if Object.prototype is unchanged))
//    elements                : null,
//    
//    propertyMetaClass       : Joose.Managed.Property,
//    
//    
//    initialize : function(props) {
//        props = props || {};
//        
//        this.elements                       = {};
//        this.container                      = props.container;
//    },
//    
//    
//    computeTarget : function(targetClass) {
//        throw "called abstract method [computeContainer] of " + this.c;
//    },    
//    
//    
//    addProperty : function (name, props) {
//        props.definedIn         = this;
//        
//        this.elements[name] = new this.propertyMetaClass(name, props);
//        
//        return this.container[name] = this.elements[name];
//    },
//    
//    
//    removeProperty : function (name) {
//        if (!this.haveOwnProperty(name)) return undefined;
//        
//        var prop = this.container[name];
//        
//        delete this.container[name];
//        delete this.elements[name];
//        
//        return prop;
//    },
//    
//    
//    haveProperty : function(name) {
//        return typeof this.container[name] != 'undefined';
//    },
//    
//    
//    //have instead of has to avoid collision with native hasOwnProperty
//    haveOwnProperty : function(name) {
//        return this.haveProperty(name) && this.container.hasOwnProperty(name);
//    },
//    
//    
//    getProperty : function(name) {
//        if (!this.haveProperty(name)) return undefined;
//        
//        var prop = this.container[name];
//        
//        if (!(prop instanceof Joose.Managed.Property)) return this.addProperty(name, { init : prop });
//        
//        return prop;
//    },
//    
//    
//    apply : function(targetClass){
//        var target = this.computeTarget(targetClass);
//        
//        Joose.O.eachSafe(this.elements, function(property){
//            property.apply(target);
//        });
//    },
//    
//    
//    unapply : function(from){
//        var from = this.computeTarget(targetClass);
//        
//        Joose.O.eachSafe(this.elements, function(property){
//            property.unapply(from);
//        });
//    }
//    
//    
//    
//}).c;
