var reptilesMeta = new Joose.Kernel.Species('Joose.Kernel.Reptiles');


reptilesMeta.addSuperClass(Joose.Kernel.Species);

reptilesMeta.addClassMethod('isa', function (classObject) { return this.meta.classIsa(classObject) } );

//plus some new genes
reptilesMeta.addGenes({
	
	
});


Joose.Kernel.Reptiles = reptilesMeta.getClassObject();
