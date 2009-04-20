if (typeof BasicTest4 == 'function' && BasicTest4.meta.constructor == Joose.Meta.Class) throw "Double declaration of BasicTest4";

Class('BasicTest4', {
    version : 0.1,
    
    methods : {
        result : function () { return 4 }
    }
    
})
