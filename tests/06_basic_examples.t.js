(function (Class, Module, Role, Type, Prototype) {
return (function () {
var t = new Test.TAP.Class();
t.plan(21)

t.testBasic = function() {
    var self = this;
    self.diag("Some nice examples")
    
    Class("Animal", {
        methods: {
            multiply: function () { return this.meta.instantiate() }
        }
    });
    
    
    
    Class("Cat", {
        isa: Animal,
        methods: {
            likes: function () { return "fish" }
        }
    });
        
    Class("Dog", {
        isa: Animal,
        has: {
            owner: {is: rw}
        },
        methods: {
            initialize: function () { this.owner = "DogOwner" },
            barksAt: function () { return this.owner },
            hates: function () { Cat }
        }
    });
    
    
    
    self.ok(Cat.meta.isa(Cat), "Cats are cats");
    self.ok(Cat.meta.isa(Animal), "Cats are animals");
    self.ok(Dog.meta.isa(Animal), "Dogs are animals too");
    self.ok(!Animal.meta.isa(Cat), "Not all animals are cats")
    self.ok(new Cat().likes() == "fish", "Cats like fish");
    self.ok(new Cat().multiply().likes() == "fish", "Cat babies like fish")
    self.ok(new Cat().meta.isa(Animal), "Cat objects are animals too")
    self.ok(new Cat().meta.isa(Cat), "Cat objects are cats too")
    self.ok(!new Cat().meta.isa(Dog), "Cat objects are no Dogs")
    self.ok(new Cat().multiply().meta.isa(Cat), "Cat babies are Cats")
    
    Class("GoldenRetriever", {
        isa: Dog
    })
    self.ok(new GoldenRetriever().multiply().meta.isa(GoldenRetriever), "GoldenRetrievers are GoldenRetrievers")
    self.ok(new GoldenRetriever().multiply().meta.isa(Dog), "GoldenRetrievers are Dogs")
    self.ok(new GoldenRetriever().multiply().meta.isa(Animal), "GoldenRetrievers are Animals")
    
    var g = new GoldenRetriever();
    
    self.ok(g.owner == "DogOwner", "Initialization works")
    
    self.diag("Getter and Setter")
    
    self.ok(g.setOwner, "g has setOwner method");
    self.ok(g.getOwner, "g has getOwner method");
    
    g.setOwner("Malte");
    self.ok(g.getOwner() == "Malte", "Getter returns what was set before")
    
    self.diag("can")
    
    self.ok(g.meta.can("multiply"), "Gs can multiply")
    self.ok(!g.meta.can("likes"), "Gs cannot likes")
    self.ok(!g.meta.can("fasdgfasdfasfasdfg"), "Gs cannot unknown methods")
    self.ok(g.meta.can("barksAt"), "Gs can bark")
}
return t;
})()
}).call(window, JooseClass, JooseModule, JooseRole, JooseType, JoosePrototype);
