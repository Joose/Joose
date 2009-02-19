var declared = false;
try {
    declared = typeof StressTest.Test097 == 'function';
} catch(e) {}
if (declared && StressTest.Test097.meta.meta.isa(Joose.Class)) {
    StressTest.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test097";
}
Class('StressTest.Test097', {
    version: 0.1,
    use: [{
        'Module': 'StressTest.Test098'
    },
    {
        'Module': 'StressTest.Test100'
    },
    {
        'Module': 'StressTest.Test099'
    }],
    methods: {
        result: function() {
            return 97
        }
    },
    body: function() {
        if (!StressTest.Test098.meta.meta.isa(Joose.Class)) {
            StressTest.unSatisfiedDeps = true;
            throw "Dependency StressTest.Test098 is not satisfied for class StressTest.Test097";
        }
        if (!StressTest.Test099.meta.meta.isa(Joose.Class)) {
            StressTest.unSatisfiedDeps = true;
            throw "Dependency StressTest.Test099 is not satisfied for class StressTest.Test097";
        }
        if (!StressTest.Test100.meta.meta.isa(Joose.Class)) {
            StressTest.unSatisfiedDeps = true;
            throw "Dependency StressTest.Test100 is not satisfied for class StressTest.Test097";
        }
    }
})