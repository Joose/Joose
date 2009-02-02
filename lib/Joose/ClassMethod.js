Joose.Kernel.MetaClass.create('Joose.ClassMethod', {	
	isa : Joose.Kernel.ProtoClassMethod
});

Joose.Kernel.MetaClass.meta.addAttribute('classMethodConstructor', { init : Joose.ClassMethod, lazy : true });


//Class('Joose.ClassMethod', {
//	isa : Joose.Kernel.ProtoClassMethod,
//	meta : Joose.Class
//})
//(function (Class) {
//    
//Class("Joose.ClassMethod", {
//    isa: Joose.Method,
//    methods: {
//        isClassMethod: function () { return true },
//        addToClass: function (c) {
//            c[this.getName()] = this.asFunction()
//        },
//        
//        copy: function () {
//            return new Joose.ClassMethod(this.getName(), this.getBody(), this.getProps())
//        }
//    }
//})
//
//})(JooseClass);
