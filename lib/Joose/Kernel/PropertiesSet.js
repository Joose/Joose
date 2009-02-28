Joose.Kernel.PropertiesSet = new Joose.Kernel.ProtoMeta('Joose.Kernel.PropertiesSet', null, null, {

    container               : null,
    target                  : null,
    
    propertyMetaClass       : null,
    
    
    initialize : function(props) {
        props = props || {};
        
        this.target                 = props.target;
        
        this.computeContainer(props);
    },
    
    
    computeContainer : function(props) {
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




Joose.Kernel.Property = new Joose.Kernel.ProtoMeta('Joose.Kernel.Property', null, null, {

    name : null,
    
    target : null,
    
    value : null,
    
    
    initialize : function(name, props) {
        props = props || {};
        
        this.name       = name;
        this.target     = props.target;
        
        this.computeTarget(props);
        this.computeValue(props);
    },
    
    
    computeTarget : function(props){
    },    
    

    computeValue : function(props){
        this.value = props.init;
    },    
    
    
    apply : function(){
        this.target[this.name] = this.value;
    },
    
    
    unapply : function(){
        delete this.target[this.name];
    }
    
}).c;