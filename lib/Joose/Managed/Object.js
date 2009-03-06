Joose.Managed.Object = new Joose.Proto.Class('Joose.Managed.Object', function (){ throw "Joose.Managed.Object can't be instantiated" }, null, {
    
    SUPERARG : function(){
//        var self = arguments.callee.caller;
//        return self.SUPER[self.methodName].apply(this, arguments[0]);
    },
    
    
    SUPER : function(){
        var self = arguments.callee.caller.caller;
        return self.SUPER[self.methodName].apply(this, arguments);
    }
    
}).c;


Joose.Managed.Object.meta = {
    builder : {
        constructor : Joose.Managed.Builder
    },
    
    stem : {
        constructor : Joose.Managed.Stem.ClassStem
    }
}