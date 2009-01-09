var reptilesMeta = new Joose.Kernel.Species();


reptilesMeta.addSuperClass(Joose.Kernel.Species);

//plus some new genes
reptilesMeta.addGenes({
	
	
});


Joose.Kernel.Reptiles = reptilesMeta.parturiate('Joose.Kernel.Reptiles');
