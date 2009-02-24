if (typeof BasicTest3 == 'function' && BasicTest3.meta.meta.isa(Joose.Class)) throw "Double declaration of BasicTest3";

debugger;
Class('BasicTest3', {
    version : 0.1,
    
    methods : {
        result : function () { return 3 }
    }
    
})
