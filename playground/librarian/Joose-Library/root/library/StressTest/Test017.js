var declared = false;
try {
    declared = typeof StressTest.Test017 == 'function';
} catch(e) {}
if (declared && StressTest.Test017.meta.meta.isa(Joose.Class)) {
    StressTest.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test017";
}
Class('StressTest.Test017', {
    version: 0.1,
    use: [{
        'Module': 'StressTest.Test066'
    },
    {
        'Module': 'StressTest.Test052'
    },
    {
        'Module': 'StressTest.Test061'
    },
    {
        'Module': 'StressTest.Test094'
    },
    {
        'Module': 'StressTest.Test084'
    },
    {
        'Module': 'StressTest.Test069'
    },
    {
        'Module': 'StressTest.Test090'
    },
    {
        'Module': 'StressTest.Test028'
    },
    {
        'Module': 'StressTest.Test062'
    },
    {
        'Module': 'StressTest.Test080'
    },
    {
        'Module': 'StressTest.Test099'
    },
    {
        'Module': 'StressTest.Test072'
    },
    {
        'Module': 'StressTest.Test082'
    },
    {
        'Module': 'StressTest.Test091'
    },
    {
        'Module': 'StressTest.Test058'
    },
    {
        'Module': 'StressTest.Test055'
    },
    {
        'Module': 'StressTest.Test087'
    },
    {
        'Module': 'StressTest.Test056'
    },
    {
        'Module': 'StressTest.Test081'
    },
    {
        'Module': 'StressTest.Test065'
    },
    {
        'Module': 'StressTest.Test060'
    },
    {
        'Module': 'StressTest.Test085'
    },
    {
        'Module': 'StressTest.Test088'
    },
    {
        'Module': 'StressTest.Test057'
    },
    {
        'Module': 'StressTest.Test051'
    },
    {
        'Module': 'StressTest.Test053'
    },
    {
        'Module': 'StressTest.Test076'
    },
    {
        'Module': 'StressTest.Test068'
    },
    {
        'Module': 'StressTest.Test059'
    },
    {
        'Module': 'StressTest.Test070'
    },
    {
        'Module': 'StressTest.Test042'
    },
    {
        'Module': 'StressTest.Test089'
    },
    {
        'Module': 'StressTest.Test092'
    },
    {
        'Module': 'StressTest.Test097'
    },
    {
        'Module': 'StressTest.Test064'
    },
    {
        'Module': 'StressTest.Test073'
    },
    {
        'Module': 'StressTest.Test079'
    },
    {
        'Module': 'StressTest.Test083'
    },
    {
        'Module': 'StressTest.Test077'
    },
    {
        'Module': 'StressTest.Test054'
    },
    {
        'Module': 'StressTest.Test048'
    },
    {
        'Module': 'StressTest.Test078'
    },
    {
        'Module': 'StressTest.Test063'
    },
    {
        'Module': 'StressTest.Test093'
    },
    {
        'Module': 'StressTest.Test098'
    },
    {
        'Module': 'StressTest.Test075'
    },
    {
        'Module': 'StressTest.Test049'
    },
    {
        'Module': 'StressTest.Test071'
    },
    {
        'Module': 'StressTest.Test074'
    },
    {
        'Module': 'StressTest.Test046'
    },
    {
        'Module': 'StressTest.Test029'
    },
    {
        'Module': 'StressTest.Test033'
    },
    {
        'Module': 'StressTest.Test045'
    },
    {
        'Module': 'StressTest.Test100'
    },
    {
        'Module': 'StressTest.Test095'
    },
    {
        'Module': 'StressTest.Test067'
    },
    {
        'Module': 'StressTest.Test096'
    },
    {
        'Module': 'StressTest.Test023'
    },
    {
        'Module': 'StressTest.Test086'
    },
    {
        'Module': 'StressTest.Test050'
    },
    {
        'Module': 'StressTest.Test039'
    }],
    methods: {
        result: function() {
            return 17
        }
    },
    body: function() {
        if (!StressTest.Test023.meta.meta.isa(Joose.Class)) {
            StressTest.unSatisfiedDeps = true;
            throw "Dependency StressTest.Test023 is not satisfied for class StressTest.Test017";
        }
        if (!StressTest.Test039.meta.meta.isa(Joose.Class)) {
            StressTest.unSatisfiedDeps = true;
            throw "Dependency StressTest.Test039 is not satisfied for class StressTest.Test017";
        }
        if (!StressTest.Test042.meta.meta.isa(Joose.Class)) {
            StressTest.unSatisfiedDeps = true;
            throw "Dependency StressTest.Test042 is not satisfied for class StressTest.Test017";
        }
        if (!StressTest.Test045.meta.meta.isa(Joose.Class)) {
            StressTest.unSatisfiedDeps = true;
            throw "Dependency StressTest.Test045 is not satisfied for class StressTest.Test017";
        }
        if (!StressTest.Test078.meta.meta.isa(Joose.Class)) {
            StressTest.unSatisfiedDeps = true;
            throw "Dependency StressTest.Test078 is not satisfied for class StressTest.Test017";
        }
        if (!StressTest.Test084.meta.meta.isa(Joose.Class)) {
            StressTest.unSatisfiedDeps = true;
            throw "Dependency StressTest.Test084 is not satisfied for class StressTest.Test017";
        }
    }
})