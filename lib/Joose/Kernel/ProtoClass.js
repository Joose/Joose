Joose.Kernel = function(){ throw "Modules may not be instantiated." };


Joose.Kernel.ProtoClass = function (){
    throw "Joose.Kernel.ProtoClass can't be instantiated";
}


Joose.Kernel.ProtoClass.prototype = {
    
    SUPER : function(){
        var self = arguments.callee.caller;
        return self.meta.superClass.prototype[self.methodName].apply(this, arguments);
    },
    
    
    initialize: function () {
    },
    
    
    toString: function () {
        return "a " + this.meta.name;
    }
    
};


Joose.Kernel.ProtoClass.meta = {
    methods : Joose.Kernel.ProtoClass.prototype,
    attributes : {}
}