StartTest(function(t) {
	t.plan(29)
	
    //==================================================================================================================================================================================
    t.diag("Role application")
    
    t.ok(Joose.Meta.Role, "Joose.Meta.Role is here")
    t.ok(Joose.Meta.Class, "Joose.Meta.Class is here")
    t.ok(Joose.Meta.Class.Detached, "Joose.Meta.Class.Detached is here")
    
    //==================================================================================================================================================================================
    t.diag("Role creation")
    
    Role('Walk', { 
        have : {
            walking : false
        },
        
        methods : {
            walk : function (where) { this.walking = true },
            stop : function () { this.walking = false }
        }
    })
    

    Role('Eat', { 
        have : {
            eating : false
        },
        
        methods : {
            eat : function (food) { this.eating = true },
            stop : function () { this.eating = false }
        }
    })
    
    
    //==================================================================================================================================================================================
    t.diag("Composing a role to an empty instance")
    
    Class('Creature')
    
    var creature = new Creature()
    creature.own_attr = true
    
    creature.detach()
    
    t.ok(creature.meta.constructor == Joose.Meta.Class.Detached, "Instance was detached")
    t.ok(creature.constructor != Creature, "Instance was detached, indeed")
    t.ok(creature.isDetached(), "Instance was detached, indeed #2")
    
    t.ok(creature.own_attr == true, "Original attributes havn't changed")
    t.ok(typeof creature.walking == 'undefined', "Attributes were not applied")
    
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
    })
    

    t.ok(creature.meta.hasAttribute('walking') && creature.meta.getAttribute('walking').value == false, "creature has correct attribute 'walking'")
    t.ok(creature.meta.hasAttribute('eating') && creature.meta.getAttribute('eating').value == false, "creature has correct attribute 'eating'")
    t.ok(creature.meta.hasMethod('walk'), 'creature has method walk')
    t.ok(creature.meta.hasMethod('eat'), 'creature has method eat')
    t.ok(creature.meta.hasMethod('stopWalk'), 'creature has method stopWalk')
    t.ok(creature.meta.hasMethod('stopEat'), 'creature has method stopEat')
    t.ok(!creature.meta.hasMethod('stop'), 'creature hasnt method stop')
    
    creature.walk('there')
    t.ok(creature.walking, 'Creature is walking')
    creature.stopWalk()
    t.ok(!creature.walking, 'Creature is not walking')
    

    //==================================================================================================================================================================================
    t.diag("Cannibal creature && Role.apply testing")
    
    Role('Cannibalism', {
        requires : [ 'eat' ],
        
        override : {
            eat : function (food) { 
                if (food.constructor == this.constructor) this.SUPER(food); 
            }
        }
    })
    
    Cannibalism.meta.apply(creature)
    
    creature.eat({})
    t.ok(!creature.eating, "Creature becomes cannibal ))")

    Cannibalism.meta.unapply(creature)
    
    creature.eat({})
    t.ok(creature.eating, "Creature now eats usual food again")

    
    //==================================================================================================================================================================================
    t.diag("Attaching instance back")
    
    creature.attach()
    
    t.ok(creature.meta.constructor == Joose.Meta.Class, "Instance was attached back")
    t.ok(creature.constructor == Creature, "Instance was attached back, indeed")
    t.ok(!creature.isDetached(), "Instance was attached back, indeed #2")
    
    t.ok(creature.own_attr == true, "Original attributes still havn't changed")
    t.ok(!creature.meta.hasAttribute('walking'), "creature hasnt 'walking' attribute")
    t.ok(!creature.meta.hasAttribute('eating') , "creature hasnt 'eating' attribute")
    
    t.ok(!creature.meta.hasMethod('walk') && !creature.walk, "creature hasnt 'walk' method")
    t.ok(!creature.meta.hasMethod('eat') && !creature.eat, "creature hasnt 'eat' method")
    t.ok(!creature.meta.hasMethod('stopWalk') && !creature.stopWalk, "creature hasnt 'stopWalk' method")
    t.ok(!creature.meta.hasMethod('stopEat') && !creature.stopEat, "creature hasnt 'stopEat' method")
    
})