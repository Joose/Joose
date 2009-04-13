(function () {
var testobj = new Test.TAP.Class();
testobj.plan(27)

testobj.testSanity = function() {
    //==================================================================================================================================================================================
    this.diag("Role application");
    
    this.ok(Joose.MetaRole, "Joose.MetaRole is here");
    this.ok(Joose.MetaClass, "Joose.MetaClass is here");
    this.ok(Joose.DetachedClass, "Joose.DetachedClass is here");
    
    //==================================================================================================================================================================================
    this.diag("Role creation");
    
    Role('Walk', { 
        have : {
            walking : false
        },
        
        methods : {
            walk : function (where) { this.walking = true },
            stop : function () { this.walking = false }
        }
    });
    

    Role('Eat', { 
        have : {
            eating : false
        },
        
        methods : {
            eat : function (food) { this.eating = true },
            stop : function () { this.eating = false }
        }
    });
    
    
    //==================================================================================================================================================================================
    this.diag("Composing a role to an empty instance");
    
    Class('Creature');
    
    var creature = new Creature();
    creature.own_attr = true;
    
    creature.detach();
    
    this.ok(creature.meta.constructor == Joose.DetachedClass, "Instance was detached");
    this.ok(creature.constructor != Creature, "Instance was detached, indeed");
    this.ok(creature.own_attr == true, "Original attributes havn't changed");
    this.ok(typeof creature.walking == 'undefined', "Attributes were not applied");
    
    creature.meta.extend({
        does : [{
            role : Walk,
            alias : {
                stop : 'stopWalk'
            },
            exclude : [ 'stop' ]
        }, {
            role : Eat,
            alias : {
                stop : 'stopEat'
            },
            exclude : [ 'stop' ]
        }]
    });
    

    this.ok(creature.meta.hasAttribute('walking') && creature.meta.getAttribute('walking').value == false, "creature has correct attribute 'walking'");
    this.ok(creature.meta.hasAttribute('eating') && creature.meta.getAttribute('eating').value == false, "creature has correct attribute 'eating'");
    this.ok(creature.meta.hasMethod('walk'), 'creature has method walk');
    this.ok(creature.meta.hasMethod('eat'), 'creature has method eat');
    this.ok(creature.meta.hasMethod('stopWalk'), 'creature has method stopWalk');
    this.ok(creature.meta.hasMethod('stopEat'), 'creature has method stopEat');
    this.ok(!creature.meta.hasMethod('stop'), 'creature hasnt method stop');
    
    creature.walk('there');
    this.ok(creature.walking, 'Creature is walking');
    creature.stopWalk();
    this.ok(!creature.walking, 'Creature is not walking');
    

    //==================================================================================================================================================================================
    this.diag("Cannibal creature && Role.apply testing");
    
    Role('Cannibalism', {
        requires : [ 'eat' ],
        
        override : {
            eat : function (food) { 
                if (food.constructor == this.constructor) this.SUPER(food); 
            }
        }
    });
    
    Cannibalism.meta.apply(creature);
    
    creature.eat({});
    this.ok(!creature.eating, "Creature becomes cannibal ))");

    Cannibalism.meta.unapply(creature);
    
    creature.eat({});
    this.ok(creature.eating, "Creature now eats usual food again");

    
    //==================================================================================================================================================================================
    this.diag("Attaching instance back");
    
    creature.attach();
    
    this.ok(creature.meta.constructor == Joose.MetaClass, "Instance was attached back");
    this.ok(creature.constructor == Creature, "Instance was attached back, indeed");
    
    this.ok(creature.own_attr == true, "Original attributes still havn't changed");
    this.ok(!creature.meta.hasAttribute('walking'), "creature hasnt 'walking' attribute");
    this.ok(!creature.meta.hasAttribute('eating') , "creature hasnt 'eating' attribute");
    
    this.ok(!creature.meta.hasMethod('walk') && !creature.walk, "creature hasnt 'walk' method");
    this.ok(!creature.meta.hasMethod('eat') && !creature.eat, "creature hasnt 'eat' method");
    this.ok(!creature.meta.hasMethod('stopWalk') && !creature.stopWalk, "creature hasnt 'stopWalk' method");
    this.ok(!creature.meta.hasMethod('stopEat') && !creature.stopEat, "creature hasnt 'stopEat' method");
    
};

return testobj;
})()