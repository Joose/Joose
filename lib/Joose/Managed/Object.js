Joose.Managed.Object = new Joose.Proto.Class('Joose.Managed.Object', function (){ throw "Joose.Managed.Object can't be instantiated" }, null, {
    
    INNER : function INNER(){
        var self = (joose.is_IE ? arguments.callee : INNER).caller.caller;
        if (self.SUPER || self.AROUND) self = self.caller;
        
        var callstack = self.__INNER_STACK__;
        
        var augmentWrapper = function(){
            var innerCall = callstack.pop();
            
            return innerCall ? innerCall.apply(this, arguments) : undefined;
        }
        
        augmentWrapper.__INNER_STACK__ = callstack;
        
        return augmentWrapper.apply(this, arguments);
    }
    
}).c;


Joose.Managed.Object.meta.builder = {
    constructor : Joose.Managed.Builder
};
    
Joose.Managed.Object.meta.stem = {
    constructor : Joose.Managed.Stem.ClassStem
}
