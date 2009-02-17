var declared = false;
try {
    declared = typeof StressTest.Test075 == 'function';
} catch(e) {}
if (declared && StressTest.Test075.meta.meta.isa(Joose.Class)) {
    StressTest.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test075";
}
Class('StressTest.Test075', {
    version: 0.1,
    use: [{
        'Module': 'StressTest.Test089'
    },
    {
        'Module': 'StressTest.Test092'
    },
    {
        'Module': 'StressTest.Test094'
    },
    {
        'Module': 'StressTest.Test084'
    },
    {
        'Module': 'StressTest.Test097'
    },
    {
        'Module': 'StressTest.Test090'
    },
    {
        'Module': 'StressTest.Test079'
    },
    {
        'Module': 'StressTest.Test080'
    },
    {
        'Module': 'StressTest.Test083'
    },
    {
        'Module': 'StressTest.Test077'
    },
    {
        'Module': 'StressTest.Test078'
    },
    {
        'Module': 'StressTest.Test099'
    },
    {
        'Module': 'StressTest.Test082'
    },
    {
        'Module': 'StressTest.Test093'
    },
    {
        'Module': 'StressTest.Test098'
    },
    {
        'Module': 'StressTest.Test091'
    },
    {
        'Module': 'StressTest.Test087'
    },
    {
        'Module': 'StressTest.Test081'
    },
    {
        'Module': 'StressTest.Test085'
    },
    {
        'Module': 'StressTest.Test088'
    },
    {
        'Module': 'StressTest.Test076'
    },
    {
        'Module': 'StressTest.Test100'
    },
    {
        'Module': 'StressTest.Test095'
    },
    {
        'Module': 'StressTest.Test096'
    },
    {
        'Module': 'StressTest.Test086'
    }],
    methods: {
        result: function() {
            return 75
        }
    },
    body: function() {
        if (!StressTest.Test076.meta.meta.isa(Joose.Class)) {
            StressTest.unSatisfiedDeps = true;
            throw "Dependency StressTest.Test076 is not satisfied for class StressTest.Test075";
        }
        if (!StressTest.Test077.meta.meta.isa(Joose.Class)) {
            StressTest.unSatisfiedDeps = true;
            throw "Dependency StressTest.Test077 is not satisfied for class StressTest.Test075";
        }
        if (!StressTest.Test080.meta.meta.isa(Joose.Class)) {
            StressTest.unSatisfiedDeps = true;
            throw "Dependency StressTest.Test080 is not satisfied for class StressTest.Test075";
        }
        if (!StressTest.Test083.meta.meta.isa(Joose.Class)) {
            StressTest.unSatisfiedDeps = true;
            throw "Dependency StressTest.Test083 is not satisfied for class StressTest.Test075";
        }
        if (!StressTest.Test090.meta.meta.isa(Joose.Class)) {
            StressTest.unSatisfiedDeps = true;
            throw "Dependency StressTest.Test090 is not satisfied for class StressTest.Test075";
        }
        if (!StressTest.Test091.meta.meta.isa(Joose.Class)) {
            StressTest.unSatisfiedDeps = true;
            throw "Dependency StressTest.Test091 is not satisfied for class StressTest.Test075";
        }
        if (!StressTest.Test092.meta.meta.isa(Joose.Class)) {
            StressTest.unSatisfiedDeps = true;
            throw "Dependency StressTest.Test092 is not satisfied for class StressTest.Test075";
        }
        if (!StressTest.Test097.meta.meta.isa(Joose.Class)) {
            StressTest.unSatisfiedDeps = true;
            throw "Dependency StressTest.Test097 is not satisfied for class StressTest.Test075";
        }
    }
})