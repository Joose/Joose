var reptilesMeta = new Joose.Kernel.Species('Joose.Kernel.Reptiles');


reptilesMeta.addSuperClass(Joose.Kernel.Species);

//plus some new genes
reptilesMeta.addGenes({
	
	
});


Joose.Kernel.Reptiles = reptilesMeta.getClassObject();
