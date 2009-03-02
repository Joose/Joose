Joose.Proto.Attribute = new Joose.Proto.Meta('Joose.Proto.Attribute', null, Joose.Proto.Property, {
    
//    initialize : function(name, props) {
//        this.SUPER(arguments);
//        
//        
//    },
    

    computeTarget : function(props){
        this.target = props.target.prototype;
    }
    
    
}).c;



//var protoAttributeMeta = new Joose.Proto.Inheritable('Joose.Proto.Attribute', function (name, props) {
//    this.initialize(name, props)
//});
//
//
//protoAttributeMeta.extend({
//    
//    _name:  null,
//    _props: null,
//    
//    
//    getName:    function () { return this._name },
//    getProps:    function () { return this._props },
//
//    
//    initialize: function (name, props) {
//        this._name  = name;
//        this._props = props || {};
//    },
//    
//    
//    copy: function (to) {
//        return new to(this.getName(), this.getProps());
//    },
//    
//    
//    handleInit: function (classObject) {
//        var props = this.getProps();
//        var name  = this.getName();
//        
//        classObject.prototype[name]     = null;
//        if(typeof props.init != "undefined") {
//            classObject.prototype[name] = props.init;
//        }
//    },
//    
//    
//    handleProps: function (classObject) {
//        this.handleInit(classObject)
//    },
//    
//
//    addToClass: function (classObject) {
//        classObject.meta.attributes[this.getName()] = this;
//        this.handleProps(classObject)
//    },
//    
//    
//    doInitialization: function (object, paras) {
//        
//    },
//    
//    
//    isPersistent: function () {
//        return this.getProps().persistent != false;
//    }
//    
//});
//
//
//Joose.Proto.Attribute = protoAttributeMeta.getClassObject();