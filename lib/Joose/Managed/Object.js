Joose.Managed.Object = new Joose.Proto.Meta('Joose.Managed.Object', function (){ throw "Joose.Managed.Object can't be instantiated" }, null, {
    
    SUPERARG : function(){
//        var self = arguments.callee.caller;
//        return self.SUPER[self.methodName].apply(this, arguments[0]);
    },
    
    
    SUPER : function(){
        var self = arguments.callee.caller.caller;
        return self.SUPER[self.methodName].apply(this, arguments);
    },
    
    
    initialize: function () {
    },
    
    
    toString: function () {
        return "a " + this.meta.name;
    }
    
}).c;