Joose.Managed.Property.MethodModifier.Augment = new Joose.Proto.Class('Joose.Managed.Property.MethodModifier.Augment', {
    
	isa : Joose.Managed.Property.MethodModifier,

    prepareWrapper : function(name, target, modifier, original, isOwn, superProto){
        var methodWrapper = function AUGMENT_WRAPPER(){
            arguments.callee.CALLER = arguments.callee.caller;
            
            var callstack = [];
            
            var self = Joose.is_IE ? arguments.callee : AUGMENT_WRAPPER;
            
            do {
                callstack.push(self.OUTER ? self._contain : self);
                
                self = self.OUTER && (self._original || self.OUTER[self.methodName]);
            } while (self);
            
            
            var augmentWrapper = function(){
                return callstack.pop().apply(this, arguments);
            }
            
            augmentWrapper.__INNER_STACK__ = callstack;
            
            return augmentWrapper.apply(this, arguments);
        }
        
        methodWrapper.methodName = name;
        methodWrapper.OUTER = superProto;
        
        return methodWrapper;
    }
    
}).c;