//viviparityMeta is filled with introspection information from Parthenogenesis instanse
var viviparityMeta = new Joose.Kernel.Parthenogenesis();


////plus some new genes
//viviparityMeta.addGenes({
//	
//	
//});


//Joose.Kernel.Viviparity have no introspection capabilities, but it have inheritance mechanism instead of it
//Meta and Parent class are finally separated in Joose.Kernel.Viviparity
Joose.Kernel.Viviparity = viviparityMeta.parturiate('Joose.Kernel.Viviparity');