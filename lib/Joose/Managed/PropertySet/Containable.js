Joose.Managed.PropertySet.Containable = new Joose.Proto.Class('Joose.Managed.PropertySet.Containable', {
    
	isa                     : Joose.Managed.PropertySet.Mutable,

    //points to class
    targetClass             : null,
    
    container               : null,

    
    initialize : function(name, props) {
        this.SUPER(name, props);
        
        this.targetClass        = props.targetClass;
        
        this.computeContainer();
    },
    
    
    computeContainer : function(){
        throw "Abstract method [computeContainer] of " + this + " was called";
    },
    
    
    addProperty : function (name, props) {
        return this.container[name] = this.SUPER(name, props);
    },
    

    addPropertyObject : function (object) {
        return this.container[object.name] = this.SUPER(object);
    },
    

    removeProperty : function (name) {
        delete this.container[name];
        
        return this.SUPER(name);
    },
    
    
    haveProperty : function(name) {
        return typeof this.container[name] != 'undefined';
    },
    
    
    haveOwnProperty : function(name) {
        return this.haveProperty(name) && this.container.hasOwnProperty(name);
    },
    
    
    getProperty : function(name) {
        return this.container[name];
    },
    
    
    cleanClone : function (name){
        var clon = this.SUPER(name);
        clon.container = {};
        
        return clon; 
    },
    
    
//    each : function (func, scope){
//        Joose.O.each(this.container, function(property, name){
//            if (property instanceof Joose.Managed.Property) func.call(scope || this, property, name)
//        });
//    },
    
    
    reCompose : function(){
        this.prepareApply(this.targetClass);
        
        this.SUPER();
        
        this.apply(this.targetClass);
    },
    
    
    deCompose : function(){
        this.unapply(this.targetClass);
        
        this.SUPER();
    }
    
    
}).c;
