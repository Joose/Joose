plan(21)

diag("Some nice examples")

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



ok(Cat.meta.isa(Cat), "Cats are cats");
ok(Cat.meta.isa(Animal), "Cats are animals");
ok(Dog.meta.isa(Animal), "Dogs are animals too");
ok(!Animal.meta.isa(Cat), "Not all animals are cats")
ok(new Cat().likes() == "fish", "Cats like fish");
ok(new Cat().multiply().likes() == "fish", "Cat babies like fish")
ok(new Cat().meta.isa(Animal), "Cat objects are animals too")
ok(new Cat().meta.isa(Cat), "Cat objects are cats too")
ok(!new Cat().meta.isa(Dog), "Cat objects are no Dogs")
ok(new Cat().multiply().meta.isa(Cat), "Cat babies are Cats")

Class("GoldenRetriever", {
    isa: Dog
})
ok(new GoldenRetriever().multiply().meta.isa(GoldenRetriever), "GoldenRetrievers are GoldenRetrievers")
ok(new GoldenRetriever().multiply().meta.isa(Dog), "GoldenRetrievers are Dogs")
ok(new GoldenRetriever().multiply().meta.isa(Animal), "GoldenRetrievers are Animals")

var g = new GoldenRetriever();

ok(g.owner == "DogOwner", "Initialization works")

diag("Getter and Setter")

ok(g.setOwner, "g has setOwner method");
ok(g.getOwner, "g has getOwner method");

g.setOwner("Malte");
ok(g.getOwner() == "Malte", "Getter returns what was set before")

diag("can")

ok(g.meta.can("multiply"), "Gs can multiply")
ok(!g.meta.can("likes"), "Gs cannot likes")
ok(!g.meta.can("fasdgfasdfasfasdfg"), "Gs cannot unknown methods")
ok(g.meta.can("barksAt"), "Gs can bark")


endTests()