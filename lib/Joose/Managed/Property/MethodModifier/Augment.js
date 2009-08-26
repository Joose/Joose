Joose.Managed.Property.MethodModifier.Augment = new Joose.Proto.Class('Joose.Managed.Property.MethodModifier.Augment', {
    
    isa : Joose.Managed.Property.MethodModifier,

    prepareWrapper : function (name, modifier, originalCall, originalArgCall, superProto) {
        
        var AUGMENT = function () {
            var callstack = []
            
            var self = AUGMENT
            
            do {
                callstack.push(self.OUTER ? self._contain : self)
                
                self = self.OUTER && (self._original || self.OUTER[self.methodName])
            } while (self)
            
            
            var augmentWrapper = function () {
                return callstack.pop().apply(this, arguments)
            }
            
            augmentWrapper.__INNER_STACK__ = callstack
            
            return augmentWrapper.apply(this, arguments)
        }
        
        AUGMENT.methodName = name
        AUGMENT.OUTER = superProto
        
        return AUGMENT
    }
    
}).c