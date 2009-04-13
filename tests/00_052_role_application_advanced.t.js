(function () {
var testobj = new Test.TAP.Class();
testobj.plan(1)

testobj.testSanity = function() {
    //==================================================================================================================================================================================
    this.diag("Advanced Role application");
    
    //==================================================================================================================================================================================
    this.diag("Methods/attributes from Role overrides those from superclass");
    
    Class('SuperClass', {
    	have : {
    		res : 'sup:res'
    	},
    	
    	methods : {
    		process : function () { return 'sup:process' }
    	}
    });
    this.ok(SuperClass, 'SuperClass class was created');

    
    Class('SubClass', {
    	isa : SuperClass
    });
    this.ok(SubClass, 'SuperClass class was created');
    
    this.ok(SubClass.meta.hasAttribute('res') && SubClass.meta.getAttribute('res').value == 'sup:res', "SubClass has correct attribute 'res'");
    this.ok(SubClass.meta.hasMethod('process') && new SubClass().process() == 'sup:process', "SubClass has method 'process'");
    
    
    Role('Resource', {
    	have : {
    		res : 'role:res'
    	},
    	
    	methods : {
    		process : function () { return 'role:process' }
    	}
    });
    this.ok(Resource, 'Resource role was created');
    
    SubClass.meta.extend({
    	does : [ Resource ]
    })
    
    this.ok(SubClass.meta.hasAttribute('res') && SubClass.meta.getAttribute('res').value == 'role:res', "SubClass has correct attribute 'res'");
    this.ok(SubClass.meta.hasMethod('process') && new SubClass().process() == 'role:process', "SubClass has method 'process'");

    
    
//    var Walk = new Joose.Managed.Role('Walk', { 
//        have : {
//            walking : false
//        },
//        
//        methods : {
//            walk : function (where) { this.walking = true },
//            stop : function () { this.walking = false }
//        }
//    }).c;
//    
//    this.ok(Walk.meta.hasAttribute('walking') && Walk.meta.getAttribute('walking').value == false, 'Walk has correct attribute walking');
//    this.ok(Walk.meta.hasMethod('walk'), 'Walk has method walk');
//    this.ok(Walk.meta.hasMethod('stop'), 'Walk has method stop');
//
//
//    var Eat = new Joose.Managed.Role('Eat', { 
//        have : {
//            eating : false
//        },
//        
//        methods : {
//            eat : function (food) { this.eating = true },
//            stop : function () { this.eating = false }
//        }
//    }).c;
//    
//    
//    //==================================================================================================================================================================================
//    this.diag("Exceptions");
//    
//    this.throws_ok(function(){
//        var Creature = new Joose.Managed.Class('Creature', {
//            does : [ Walk, Eat ]
//        }).c;
//    }, "Attempt to apply ConflictMarker [stop] to [Creature]", "Conflicts are detecting");
//    
//    
//    this.throws_ok(function(){
//        var Creature = new Joose.Managed.Class('Creature', {
//            requires : [ 'walk' ]
//        }).c;
//    }, "Unknow builder [requires] was used during extending of [Creature]", "'requires' builder can only be used with Roles");
//    
//    
//    //==================================================================================================================================================================================
//    this.diag("Composing a class from roles with aliasing");
//    
//    
//    var Creature = new Joose.Managed.Class('Creature', {
//        does : [{
//            role : Walk,
//            alias : {
//                stop : 'stopWalk'
//            },
//            exclude : [ 'stop' ]
//        }, {
//            role : Eat,
//            alias : {
//                stop : 'stopEat'
//            },
//            exclude : [ 'stop' ]
//        }]
//    }).c;
//    
//
//    this.ok(Creature.meta.hasAttribute('walking') && Creature.meta.getAttribute('walking').value == false, "Creature has correct attribute 'walking'");
//    this.ok(Creature.meta.hasAttribute('eating') && Creature.meta.getAttribute('eating').value == false, "Creature has correct attribute 'eating'");
//    this.ok(Creature.meta.hasMethod('walk'), 'Creature has method walk');
//    this.ok(Creature.meta.hasMethod('eat'), 'Creature has method eat');
//    this.ok(Creature.meta.hasMethod('stopWalk'), 'Creature has method stopWalk');
//    this.ok(Creature.meta.hasMethod('stopEat'), 'Creature has method stopEat');
//    this.ok(!Creature.meta.hasMethod('stop'), 'Creature hasnt method stop');
//    
//    var creature = new Creature();
//    
//    creature.walk('there');
//    this.ok(creature.walking, 'Creature is walking');
//    creature.stopWalk();
//    this.ok(!creature.walking, 'Creature is not walking');
//    
//
//    //==================================================================================================================================================================================
//    this.diag("Cannibal creature");
//    
//    var Cannibalism = new Joose.Managed.Role('Cannibalism', {
//        requires : [ 'eat' ],
//        
//        override : {
//            eat : function (food) { 
//                if (food.constructor == this.constructor) this.SUPER(food); 
//            }
//        }
//    }).c;
//    
//    
//    var Cannibal = new Joose.Managed.Class('Cannibal', {
//        isa : Creature,
//        
//        does : [ Cannibalism ]
//    }).c;    
//    
//    
//    var cannibal1 = new Cannibal();
//    var cannibal2 = new Cannibal();
//    var creature = new Creature();
//    
//    cannibal1.eat(creature);
//    this.ok(!cannibal1.eating, "Cannibal eats only creatures from his species #1 + method modifier from Role works");
//
//    cannibal1.eat(cannibal2);
//    this.ok(cannibal1.eating, "Cannibal eats only creatures from his species #2");
//    cannibal1.stopEat();
//    this.ok(!cannibal1.eating, "Cannibal1 ate cannibal2 )");
//    
//    
//    //==================================================================================================================================================================================
//    this.diag("Plant & required methods");
//    
//    var Plant = new Joose.Managed.Class('Plant', {
//        methods : {
//            grow : function () {}
//        }
//    }).c;
//    
//    
//    this.throws_ok(function(){
//        Plant.meta.extend({
//            does : [ Cannibalism ]
//        });
//    }, "Requirement [eat], defined in [Cannibalism] is not satisfied for class [Plant]", "Missing of required method detected");
//    
//    
//    var plant = new Plant();
//
//    //==================================================================================================================================================================================
//    this.diag("Human");
//    
//    var Drive = new Joose.Managed.Role('Drive', {
//        requires : [ 'walk' ],
//        
//        have : {
//            driving : false
//        },
//        
//        methods : {
//            drive : function (where) { this.driving = true },
//            stop : function () { this.driving = false }
//        },
//        
//        override : {
//            walk : function (where) { 
//                this.drive(where); 
//            }
//        }
//    }).c;    
//    
//    
//    var Vegetarian = new Joose.Managed.Role('Vegetarian', {
//        requires : [ 'eat' ],
//        
//        override : {
//            eat : function (food) { 
//                if (!food.meta.hasMethod('walk')) this.SUPER(food); 
//            }
//        }
//    }).c;    
//
//    
//    var Human = new Joose.Managed.Class('Human', {
//        
//        isa : Creature,
//        
//        does : [ Drive, Vegetarian ],
//        
//        have : {
//            cleanHands : false
//        },
//        
//        methods : {
//            washHands : function(){
//                this.cleanHands = true;
//            }
//        },
//        
//        before : {
//            eat : function () { this.washHands() }
//        },
//        
//        after : {
//            stopEat : function () { this.cleanHands = false; }
//        }
//        
//    }).c;
//    
//    
//    var human = new Human();
//    
//    human.eat(cannibal1);
//    this.ok(!human.eating, "Human doesn't eat thing which can 'walk' #1");
//    this.ok(!human.cleanHands, "Human have not washed hands yet");
//    
//    human.eat(creature);
//    this.ok(!human.eating, "Human doesn't eat thing which can 'walk' #2");
//    
//    human.eat(plant);
//    this.ok(human.eating, "Human is vegetarian");
//    this.ok(human.cleanHands, "Human washed hands before eating");
//    
//    human.stopEat();
//    this.ok(!human.cleanHands, "Human has dirty hands after he ate");
//    
//    human.walk('supermarket');
//    this.ok(!human.walking, "Humans mostly drives #1");
//    this.ok(human.driving, "Humans mostly drives #2");
//    
//    human.eat(plant);
//    this.ok(human.eating, "Human can eat during driving");
//    human.stopEat();
//    
//    human.stop();
//    this.ok(!human.driving, "Humans stopped");
//    
//    
//    //==================================================================================================================================================================================
//    this.diag("Mutability");
//    
//    Drive.meta.extend({ 
//        override : {
//            eat : function (food) { 
//                if (!this.driving) this.SUPER(food); 
//            }
//        }
//    });      
//    
//    human.drive('supermarket');
//    this.ok(human.driving, "Humans is driving");
//    
//    human.eat(plant);
//    this.ok(!human.eating, "Human now cant eat during driving");
//    
//    human.stop();
//    
//    human.eat(plant);
//    this.ok(human.eating, "Human now can eat again");
//    human.stopEat();
//    
//
//    
//    Cannibalism.meta.extend({ 
//        does : [ Vegetarian ]
//    });
//    
//    cannibal1.eat(creature);
//    this.ok(!cannibal1.eating, "Cannibal eats only creatures from his species which cant walk now");
//
//    cannibal1.eat(cannibal2);
//    this.ok(!cannibal1.eating, "Cannibal eats only creatures from his species which cant walk now");
//    
//    cannibal1.eat(plant);
//    this.ok(!cannibal1.eating, "Cannibal eats only creatures from his species which cant walk now");
//    
//
//    Cannibalism.meta.extend({ 
//        doesnt : [ Vegetarian ]
//    });
//    
//    cannibal1.eat(cannibal2);
//    this.ok(cannibal1.eating, "Cannibal now can eat again");
//    cannibal1.stopEat();
//    
//    
//    
//    Human.meta.extend({ 
//        doesnt : [ Drive ]
//    });
//    
//    human.walk('supermarket');
//    this.ok(human.walking, "Humans now walks instead driving again");
    
};

return testobj;
})()