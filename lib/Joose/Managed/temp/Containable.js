Joose.Managed.PropertySet.Containable = new Joose.Proto.Meta('Joose.Managed.PropertySet.Containable', null, Joose.Managed.PropertySet.Mutable, {

    //points to class
    targetClass             : null,
    
    container               : null,

    
    initialize : function(props) {
        this.SUPER(props);
        
        this.targetClass        = props.targetClass;
    },
    
    
    computeContainer : function(){
        this.container          = this.targetClass;
    },
        

    addProperty : function (name, props) {
        return this.container[name] = this.SUPER(name, props);
    },
    

    addProperty : function (object) {
        return this.container[object.name] = this.SUPER(object);
    },
    

    removeProperty : function (name) {
        var res = this.SUPER(name);
        
        delete this.container[name];
        
        return res;
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
    },
    
    
    reCompose : function(){
//        if (this.lastCompose && this.compositionBroken) {
//            this.composeFrom.apply(this, this.lastCompose);
//            this.compositionBroken = false;
//        }
    },
    
    
    deCompose : function(){
//        if (this.lastCompose) this.compositionBroken = true;
//        
//        this.each(function(property, name){
//            if (property.definedIn != this) this.removeProperty(name);
//        }, this);
    }
    
    
}).c;
