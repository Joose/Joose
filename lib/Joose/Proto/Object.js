(function(){

    Joose.Proto = function(){ throw "Modules may not be instantiated." };
    
    
    Joose.Proto.Object = function (){
        throw "Joose.Proto.Object can't be instantiated";
    }
    
    
        
    var findSuperCall = function(startFrom){
        //sufficient for Joose.Proto.Class
        var self = startFrom.caller;
        
        //required for Joose.Managed.Class
        if (!self.SUPER) self = self.caller;
        
        if (!self.SUPER) throw "Invalid call to SUPER";
        
        //self._original is always undefined for Joose.Proto.Class
        return self._original || self.SUPER[self.methodName];
    }
    
    
    Joose.Proto.Object.prototype = {
        
        SUPERARG : function SUPERARG(){
            return findSuperCall(joose.is_IE ? arguments.callee : SUPERARG).apply(this, arguments[0]);
        },
        
        
        SUPER : function SUPER(){
            return findSuperCall(joose.is_IE ? arguments.callee : SUPER).apply(this, arguments);
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

})();