var mammalsMeta = new Joose.Kernel.Reptiles('Joose.Kernel.Mammals');


mammalsMeta.addSuperClass(Joose.Kernel.Reptiles);


//plus some new genes
mammalsMeta.addGenes({
	
	
});


Joose.Kernel.Mammals = mammalsMeta.getClassObject();
