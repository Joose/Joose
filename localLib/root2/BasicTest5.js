if (typeof BasicTest5 == 'function' && BasicTest5.meta.constructor == Joose.MetaClass) throw "Double declaration of BasicTest5";

Class('BasicTest5', {
    version : 0.1,
    
    methods : {
        result : function () { return 5 }
    }
    
})
