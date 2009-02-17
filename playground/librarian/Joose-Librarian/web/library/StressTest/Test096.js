var declared = false;
try {
    declared = typeof StressTest.Test096 == 'function';
} catch(e) {}
if (declared && StressTest.Test096.meta.meta.isa(Joose.Class)) {
    StressTest.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test096";
}
Class('StressTest.Test096', {
    version: 0.1,
    use: [{
        'Module': 'StressTest.Test098'
    },
    {
        'Module': 'StressTest.Test100'
    },
    {
        'Module': 'StressTest.Test097'
    },
    {
        'Module': 'StressTest.Test099'
    }],
    methods: {
        result: function() {
            return 96
        }
    },
    body: function() {
        if (!StressTest.Test097.meta.meta.isa(Joose.Class)) {
            StressTest.unSatisfiedDeps = true;
            throw "Dependency StressTest.Test097 is not satisfied for class StressTest.Test096";
        }
        if (!StressTest.Test098.meta.meta.isa(Joose.Class)) {
            StressTest.unSatisfiedDeps = true;
            throw "Dependency StressTest.Test098 is not satisfied for class StressTest.Test096";
        }
        if (!StressTest.Test099.meta.meta.isa(Joose.Class)) {
            StressTest.unSatisfiedDeps = true;
            throw "Dependency StressTest.Test099 is not satisfied for class StressTest.Test096";
        }
        if (!StressTest.Test100.meta.meta.isa(Joose.Class)) {
            StressTest.unSatisfiedDeps = true;
            throw "Dependency StressTest.Test100 is not satisfied for class StressTest.Test096";
        }
    }
})