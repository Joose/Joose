if (typeof BasicTest2 == 'function' && BasicTest2.meta.meta.isa(Joose.Class)) throw "Double declaration of BasicTest2";

Class('BasicTest2', {
    version : 0.1,
    
    methods : {
        result : function () { return 2 }
    }
    
})
