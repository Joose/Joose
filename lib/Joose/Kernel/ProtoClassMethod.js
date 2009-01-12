var protoClassMethodMeta = new Joose.Kernel.Viviparity('Joose.Kernel.ProtoClassMethod');


protoClassMethodMeta.addSuperClass(Joose.Kernel.ProtoMethod);

//plus some new genes
protoClassMethodMeta.addGenes({
	
    addToClass: function (c) {
        c.meta.methods[this.getName()] = this;
        c[this.getName()] = this.asFunction()
    }
    
});

Joose.Kernel.ProtoClassMethod = protoClassMethodMeta.getClassObject();
