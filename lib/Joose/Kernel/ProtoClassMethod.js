var protoClassMethodMeta = new Joose.Kernel.Viviparity('Joose.Kernel.ProtoClassMethod');


protoClassMethodMeta.addSuperClass(Joose.Kernel.ProtoMethod);

//plus some new genes
protoClassMethodMeta.addGenes({
	
    isClassMethod: function () { return true },
    
    
    addToClass: function (c) {
        c[this.getName()] = this.asFunction()
    }
    
});

Joose.Kernel.ProtoClassMethod = protoClassMethodMeta.getClassObject();
