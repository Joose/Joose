var speciesMeta = new Joose.Kernel.Viviparity('Joose.Kernel.Species');


speciesMeta.addSuperClass(Joose.Kernel.Viviparity);

//plus some new genes
speciesMeta.addGenes({
	
	
});


Joose.Kernel.Species = speciesMeta.getClassObject();
