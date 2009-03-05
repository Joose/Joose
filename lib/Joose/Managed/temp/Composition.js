Joose.Managed.PropertySet.Operator.Composition = new Joose.Proto.Meta('Joose.Managed.PropertySet.Operator.Composition', null, Joose.Managed.PropertySet, {

    composition              : null,
    
    sets                     : null,
    
    composed                 : false,
    
    
    initialize : function(props) {
        this.SUPER(props);
        
        this.sets = [];
    },
    
    
    addSet : function(setDefinition){
        if (this.composed) throw "Can't modify composed property set (composition) of [" + this.targetClass + "]";
        
        //effective no-op, coz the same object obtained via different Roles just flattens
//        if (setDefinition.setObject == this) return;
    },
    
    
    removeSet : function(index){
        if (this.composed) throw "Can't modify composed property set (composition) of [" + this.targetClass + "]";
    },
    
    
    compose : function(){
        if (this.composed) return;
        
        this.processCompose();
        this.finalizeCompose();
        
        this.composed = true;
    },
    
    
    processCompose : function(){
        var compositionResult = {};
        
        for (var i = 0; i < this.sets.length; i++) {
            var currentSet = this.sets[i];
            if (!currentSet.composed) throw "Uncomposed Set participating in the 'compose' operation";
            
            Joose.O.eachSafe(currentSet.composition, function(property, name){
                this.composeSingleProperty(compositionResult, currentSet, property);
            }, this);
        }
        
        this.composition = compositionResult;
    },
    
    
    composeSingleProperty : function(compositionResult, currentSet, property){
        
    },
    
    
    finalizeCompose : function(){
        //"each" on "elements" is eq to: eachSafe on "container"
        //but we use eachSafe anyway to deal with possible Object.prototype changes
        //XXX probably we should determine if Object.prototype was changed, and use raw "each" here if not, for optimization
        Joose.O.eachSafe(this.elements, function(property, name) {
            property.apply();
        });
    },
    

    deCompose : function(){
        if (!this.composed) return;
        
        //XXX see above
        Joose.O.eachSafe(this.elements, function(property, name) {
            property.unapply();
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