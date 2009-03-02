Joose.Managed.Property.Composition = new Joose.Proto.Meta('Joose.Managed.Property.Composition', null, Joose.Managed.Property.Set, {

//    container               : null,
//    targetClass                  : null,
    
//    propertyMetaClass       : Joose.Managed.Property,

    sets                     : null,
    
    composed                 : false,
    
    
    initialize : function(props) {
        this.SUPER(props);
        
        this.sets = [];
    },
    
    
    addSet : function(){
        if (this.composed) throw "Can't modify composed property set (composition) of [" + this.targetClass + "]";
    },
    
    
    removeSet : function(){
        if (this.composed) throw "Can't modify composed property set (composition) of [" + this.targetClass + "]";
    },
    
    
    compose : function(){
        if (this.composed) return;
        
        Joose.O.eachSafe(this.container, function(property, name) {
            if (name != 'meta') property.apply();
        });
        
        this.composed = true;
    },
    

    deCompose : function(){
        if (!this.composed) return;
        
        Joose.O.eachSafe(this.container, function(property, name) {
            if (name != 'meta') property.unapply();
        });
        
        this.composed = false;
    },
    
    
    addProperty : function (name, props) {
        if (this.composed) throw "Can't modify composed property set (composition) of [" + this.targetClass + "]";
        
        return this.SUPER(name, props);
    },
    
    
    removeProperty : function (name) {
        if (this.composed) throw "Can't modify composed property set (composition) of [" + this.targetClass + "]";
        
        return this.SUPER(name);
    }
    
    
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