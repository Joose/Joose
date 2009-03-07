Joose.Managed.Object = new Joose.Proto.Class('Joose.Managed.Object', function (){ throw "Joose.Managed.Object can't be instantiated" }, null, {
    
    SUPERARG : function SUPERARG(){
        var self = joose.is_IE ? arguments.callee.caller.caller : SUPERARG.caller.caller;
        
        return self.SUPER[self.methodName].apply(this, arguments[0]);
    },
    
    
    SUPER : function SUPER(){
        var self = joose.is_IE ? arguments.callee.caller.caller : SUPER.caller.caller;
        
        return self.SUPER[self.methodName].apply(this, arguments);
    }
    
}).c;


Joose.Managed.Object.meta.builder = {
    constructor : Joose.Managed.Builder
};
    
Joose.Managed.Object.meta.stem = {
    constructor : Joose.Managed.Stem.ClassStem
}
