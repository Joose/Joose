Joose.Proto = function(){ throw "Modules may not be instantiated." };


Joose.Proto.Class = function (){
    throw "Joose.Proto.Class can't be instantiated";
}


Joose.Proto.Class.prototype = {
    
    SUPERARG : function(){
        var self = arguments.callee.caller;
        return self.SUPER[self.methodName].apply(this, arguments[0]);
    },
    
    
    SUPER : function(){
        var self = arguments.callee.caller;
        return self.SUPER[self.methodName].apply(this, arguments);
    },
    
    
    initialize: function () {
    },
    
    
    toString: function () {
        return "a " + this.meta.name;
    }
    
};


Joose.Proto.Class.meta = {
    methods : Joose.Proto.Class.prototype,
    attributes : {}
}