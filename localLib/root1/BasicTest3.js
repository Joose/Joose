if (typeof BasicTest3 == 'function' && BasicTest3.meta.constructor == Joose.MetaClass) throw "Double declaration of BasicTest3";

Class('BasicTest3', {
    version : 0.1,
    
    methods : {
        result : function () { return 3 }
    }
    
})
