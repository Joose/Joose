(function () {
var testobj = new Test.TAP.Class();
testobj.plan(1)

testobj.testSanity = function() {
    //==================================================================================================================================================================================
    this.diag("Advanced attributes");
    
    this.ok(Joose.Attribute, "Joose.Attribute is here");
    
    
    //==================================================================================================================================================================================
    this.diag("Class with advanced attribute");
    
    Class('TestClass', {
        has : {
            res : {
            	is : 'rw',
            	init : 'advanced'
            }
        }
    });
    
    this.ok(TestClass.meta instanceof Joose.MetaClass, "TestClass successfully created");
    this.ok(TestClass.meta.hasAttribute('res'), "'res' attribute was added");
    
    var advAttr = TestClass.meta.getAttribute('res');
    
    this.ok(advAttr instanceof Joose.Attribute, "'res' attribute is a Joose.Attribute instance");
    
    this.ok(advAttr.value.meta.hasMethod('getRes'), "Attribute's role has getter");
    this.ok(advAttr.value.meta.hasMethod('setRes'), "Attribute's role has setter");
    
    this.ok(TestClass.meta.hasMethod('getRes'), "Getter method was added");
    this.ok(TestClass.meta.hasMethod('setRes'), "Setter method was added");
    
    
    var testClass = new TestClass();
    
    
    
//    TestClass.meta.extend({
//    	does : [ advAttr.value ] 
//    });
//    
//    this.ok(TestClass.meta.hasMethod('getRes'), "Getter method was added");
//    this.ok(TestClass.meta.hasMethod('setRes'), "Setter method was added");
    
//    this.ok(Joose.MetaRole.meta.hasAttribute('ns'), "Joose.Kernel.Role's meta has 'ns' attribute");
//    
//    
//    Module('TestModule', {});
//    
//    this.ok(TestModule, 'Something in the module spot appears');
//    this.ok(TestModule.meta instanceof Joose.Namespace.Keeper, '.. and its a Joose.Namespace.Keeper');
//    
//    
//    this.ok(typeof TestClass == 'function', "TestClass was created");
//    this.ok(TestClass.my && TestClass.my.meta, "Class-level symbiont was created");
//    
//    this.ok(TestClass.meta.hasAttribute('res'), "TestClass has 'res' attribute"); 
//    this.ok(TestClass.meta.hasMethod('result'), "TestClass has 'result' method");
//
//    this.ok(TestClass.my.meta.hasAttribute('res'), "TestClass.my has 'res' attribute"); 
//    this.ok(TestClass.my.meta.hasMethod('result'), "TestClass.my has 'result' method");
//    
//    
//    var testClass = new TestClass();
//    
//    this.ok(testClass, "TestClass was instantiated");
//    this.ok(testClass.res == 'instance', "Usual attribute was correctly installed");
//    this.is(testClass.result(), 'TestClass:instance', "Method was correctly installed");
//    
//    this.ok(TestClass.my.res == 'class', "Symbiont's attribute was correctly installed");
//    this.is(TestClass.my.result(), 'TestClass:class', "Symbiont's method was correctly installed");
//    
//
//    //==================================================================================================================================================================================
//    this.diag("Class extension via helper");
//    
//    Class('TestClass', {
//        have : {
//            res1 : 'instance1'
//        },
//        
//        methods : {
//            result1 : function() { return 'TestClass:instance1' }
//        },
//        
//        
//        my : {
//            have : {
//                res1 : 'class1'
//            },
//            
//            methods : {
//                result1 : function() { return 'TestClass:class1' }
//            }
//        }
//        
//    });
//    
//    
//    this.ok(TestClass.meta.hasAttribute('res1'), "TestClass has 'res1' attribute via extension with helper"); 
//    this.ok(TestClass.meta.hasMethod('result1'), "TestClass has 'result1' method via extension with helper");
//
//    this.ok(TestClass.my.meta.hasAttribute('res1'), "TestClass.my has 'res1' attribute via extension with helper"); 
//    this.ok(TestClass.my.meta.hasMethod('result1'), "TestClass.my has 'result1' method via extension with helper");
//    
//    this.ok(testClass.res1 == 'instance1', "re1 attribute was correctly installed");
//    this.is(testClass.result1(), 'TestClass:instance1', "result1 method was correctly installed");
//    
//    this.ok(TestClass.my.res1 == 'class1', "Symbiont's attribute was correctly installed also");
//    this.is(TestClass.my.result1(), 'TestClass:class1', "Symbiont's method was correctly installed also");
//    
//    
//    //==================================================================================================================================================================================
//    this.diag("Role creation");
//    
//    Role('Walk', { 
//        have : {
//            walking : false
//        },
//        
//        methods : {
//            walk : function (where) { this.walking = true },
//            stop : function () { this.walking = false }
//        }
//    });
//    
//    this.ok(Walk.meta.hasAttribute('walking') && Walk.meta.getAttribute('walking').value == false, 'Walk has correct attribute walking');
//    this.ok(Walk.meta.hasMethod('walk'), 'Walk has method walk');
//    this.ok(Walk.meta.hasMethod('stop'), 'Walk has method stop');
//
//
//    Role('Eat', { 
//        have : {
//            eating : false
//        },
//        
//        methods : {
//            eat : function (food) { this.eating = true },
//            stop : function () { this.eating = false }
//        }
//    });
//    
//    
//    //==================================================================================================================================================================================
//    this.diag("Exceptions");
//    
//    this.throws_ok(function(){
//        Class('TestCreature1', {
//            does : [ Walk, Eat ]
//        });
//    }, Joose.is_IE ? "" : "Attempt to apply ConflictMarker [stop] to [TestCreature1]", "Conflicts are detecting");
//    
//    
//    this.throws_ok(function(){
//        Class('TestCreature2', {
//            requires : [ 'walk' ]
//        });
//    }, Joose.is_IE ? "" : "Unknow builder [requires] was used during extending of [TestCreature2]", "'requires' builder can only be used with Roles");
//    
//    
//    //==================================================================================================================================================================================
//    this.diag("Composing a class from roles with aliasing");
//    
//    
//    Class('Creature', {
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
//    });
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
//    Role('Cannibalism', {
//        requires : [ 'eat' ],
//        
//        override : {
//            eat : function (food) { 
//                if (food.constructor == this.constructor) this.SUPER(food); 
//            }
//        }
//    });
//    
//    
//    Class('Cannibal', {
//        isa : Creature,
//        
//        does : [ Cannibalism ]
//    });    
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
//    Class('Plant', {
//        methods : {
//            grow : function () {}
//        }
//    });
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
//    Role('Drive', {
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
//    });    
//    
//    
//    Role('Vegetarian', {
//        requires : [ 'eat' ],
//        
//        override : {
//            eat : function (food) { 
//                if (!food.meta.hasMethod('walk')) this.SUPER(food); 
//            }
//        }
//    });    
//
//    
//    Class('Human', {
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
//    });
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