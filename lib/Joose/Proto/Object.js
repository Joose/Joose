Joose.Proto = function(){ throw "Modules may not be instantiated." };


Joose.Proto.Object = function (){
    throw "Joose.Proto.Object can't be instantiated";
}


Joose.Proto.Object.prototype = {
    
    SUPERARG : function SUPERARG(){
        var self = (joose.is_IE ? arguments.callee : SUPERARG).caller;
        
        return self.SUPER[self.methodName].apply(this, arguments[0]);
    },
    
    
    SUPER : function SUPER(){
        var self = (joose.is_IE ? arguments.callee : SUPER).caller;
        return self.SUPER[self.methodName].apply(this, arguments);
    },
    
    
    initialize: function () {
    },
    
    
    toString: function () {
        return "a " + this.meta.name;
    }
    
};


Joose.Proto.Object.meta = {
    methods : Joose.Proto.Object.prototype,
    attributes : {}
}