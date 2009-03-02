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
        
        this.processCompose();
        
        //"each" on "elements" is eq to: eachSafe on "container"
        //but we use eachSafe anyway to deal with possible Object.prototype changes
        //XXX probably we should determine if Object.prototype was changed, and use raw "each" here if not, for optimization
        Joose.O.eachSafe(this.elements, function(property, name) {
            if (name != 'meta') property.apply();
        });
        
        this.composed = true;
    },
    
    
    processCompose : function(){
        var compositionResult = {};
        
        for (var i = 0; i < this.sets.length; i++) {
        }
    },
    

    deCompose : function(){
        if (!this.composed) return;
        
        //XXX see above
        Joose.O.eachSafe(this.elements, function(property, name) {
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