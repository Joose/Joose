Joose.Managed.PropertySet.Containable = new Joose.Proto.Class('Joose.Managed.PropertySet.Containable', null, Joose.Managed.PropertySet.Mutable, {

    //points to class
    targetClass             : null,
    
    container               : null,

    
    initialize : function(name, props) {
        this.SUPER(name, props);
        
        this.targetClass        = props.targetClass;
        
        this.computeContainer();
    },
    
    
    computeContainer : function(){
        throw "Abstract method [computeContainer] of " + this.targetClass + " was called";
    },
    
    
    addProperty : function (name, props) {
        return this.container[name] = this.SUPER(name, props);
    },
    

    addPropertyObject : function (object) {
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
    
    
    haveOwnProperty : function(name) {
        return this.haveProperty(name) && this.container.hasOwnProperty(name);
    },
    
    
//    getProperty : function(name) {
//        if (!this.haveProperty(name)) return undefined;
//        
//        var prop = this.container[name];
//        
//        if (!(prop instanceof Joose.Managed.Property)) return this.addProperty(name, { init : prop });
//        
//        return prop;
//    },

    
    each : function (func, scope){
        Joose.O.each(this.container, function(property, name){
            if (property instanceof Joose.Managed.Property) func.call(scope || this, property, name)
        });
    },
    
    
    reCompose : function(){
        this.SUPER();
        
        this.apply(this.targetClass);
    },
    
    
    deCompose : function(){
        this.unapply(this.targetClass);
        
        this.SUPER();
    }
    
    
}).c;
