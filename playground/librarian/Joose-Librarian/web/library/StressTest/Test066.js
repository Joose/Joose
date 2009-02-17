var declared = false;
try {
    declared = typeof StressTest.Test066 == 'function';
} catch(e) {}
if (declared && StressTest.Test066.meta.meta.isa(Joose.Class)) {
    StressTest.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test066";
}
Class('StressTest.Test066', {
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
        'Module': 'StressTest.Test078'
    },
    {
        'Module': 'StressTest.Test099'
    },
    {
        'Module': 'StressTest.Test098'
    },
    {
        'Module': 'StressTest.Test093'
    },
    {
        'Module': 'StressTest.Test082'
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
        'Module': 'StressTest.Test074'
    },
    {
        'Module': 'StressTest.Test088'
    },
    {
        'Module': 'StressTest.Test085'
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
            return 66
        }
    },
    body: function() {
        if (!StressTest.Test074.meta.meta.isa(Joose.Class)) {
            StressTest.unSatisfiedDeps = true;
            throw "Dependency StressTest.Test074 is not satisfied for class StressTest.Test066";
        }
        if (!StressTest.Test082.meta.meta.isa(Joose.Class)) {
            StressTest.unSatisfiedDeps = true;
            throw "Dependency StressTest.Test082 is not satisfied for class StressTest.Test066";
        }
        if (!StressTest.Test086.meta.meta.isa(Joose.Class)) {
            StressTest.unSatisfiedDeps = true;
            throw "Dependency StressTest.Test086 is not satisfied for class StressTest.Test066";
        }
        if (!StressTest.Test087.meta.meta.isa(Joose.Class)) {
            StressTest.unSatisfiedDeps = true;
            throw "Dependency StressTest.Test087 is not satisfied for class StressTest.Test066";
        }
        if (!StressTest.Test088.meta.meta.isa(Joose.Class)) {
            StressTest.unSatisfiedDeps = true;
            throw "Dependency StressTest.Test088 is not satisfied for class StressTest.Test066";
        }
        if (!StressTest.Test090.meta.meta.isa(Joose.Class)) {
            StressTest.unSatisfiedDeps = true;
            throw "Dependency StressTest.Test090 is not satisfied for class StressTest.Test066";
        }
        if (!StressTest.Test093.meta.meta.isa(Joose.Class)) {
            StressTest.unSatisfiedDeps = true;
            throw "Dependency StressTest.Test093 is not satisfied for class StressTest.Test066";
        }
        if (!StressTest.Test098.meta.meta.isa(Joose.Class)) {
            StressTest.unSatisfiedDeps = true;
            throw "Dependency StressTest.Test098 is not satisfied for class StressTest.Test066";
        }
        if (!StressTest.Test099.meta.meta.isa(Joose.Class)) {
            StressTest.unSatisfiedDeps = true;
            throw "Dependency StressTest.Test099 is not satisfied for class StressTest.Test066";
        }
    }
})