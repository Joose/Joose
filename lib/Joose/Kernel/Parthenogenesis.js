//Parthenogenesis have a goal to separate meta and parent classes, so Gene produces such class..
//Parthenogenesis have genes of Fissiparity
//Parthenogenesis will be intermediate class in evolution, like reptiles before mammals 
Joose.Kernel.Parthenogenesis = Joose.Kernel.Fissiparity.parturiate(function(nextGeneration) {
    //Parthenogenesis needs to introspect itself but instead nextGeneration manipulation in BlastoGenesis way it will use Viviparity 
    this.meta.initialize.apply(this, arguments);
    
    this.initialize.apply(this, arguments);
});

//plus some new genes
Joose.Kernel.Parthenogenesis.meta.addAttribute('parentClasses', null);
Joose.Kernel.Parthenogenesis.meta.addMethod('initialize', function(){
	this.parentClasses 	= [];
    this.attributes     = {},
    this.methods        = {};
});





//finally, meta and parent class are separated