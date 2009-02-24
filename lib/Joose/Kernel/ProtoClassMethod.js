var protoClassMethodMeta = new Joose.Kernel.Inheritance('Joose.Kernel.ProtoClassMethod');


protoClassMethodMeta.addSuperClass(Joose.Kernel.ProtoMethod);

//plus some new genes
protoClassMethodMeta.extend({
	
    addToClass: function (c) {
        c.meta.classMethods[this.getName()] = this;
        c[this.getName()] = this.asFunction()
    }
    
});

Joose.Kernel.ProtoClassMethod = protoClassMethodMeta.getClassObject();
