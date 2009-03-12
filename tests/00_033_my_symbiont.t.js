(function () {
var testobj = new Test.TAP.Class();
testobj.plan(1)

testobj.testSanity = function() {
    //==================================================================================================================================================================================
    this.diag("Symbiont - separate, built-in class, (analog of class-methods + class-attributes + class-roles + ...)");
    
    this.ok(Joose.Kernel.Class, "Joose.Kernel.Class is here");
    this.ok(Joose.Kernel.Role, "Joose.Kernel.Role is here");
    
    this.ok(Joose.Kernel.Class.meta.hasAttribute('my'), "Joose.Kernel.Class's meta has 'my' attribute");
    this.ok(Joose.Kernel.Role.meta.hasAttribute('my'), "Joose.Kernel.Role's meta has 'my' attribute");
    
    var TestClass = new Joose.Kernel.Class('TestClass', {
        have : {
            res : 'instance'
        },
        
        methods : {
            result : function() { return 'TestClass:instance' }
        },
        
        
        my : {
            have : {
                res : 'class'
            },
            
            methods : {
                result : function() { return 'TestClass:class' }
            }
        }
        
    }).c;
    
    this.ok(typeof TestClass == 'function', "TestClass was created");
    this.ok(TestClass.my && TestClass.my.meta, "Class-level symbiont was created");
    
    this.ok(TestClass.meta.hasAttribute('res'), "TestClass has 'res' attribute"); 
    this.ok(TestClass.meta.hasMethod('result'), "TestClass has 'result' method");

    this.ok(TestClass.my.meta.hasAttribute('res'), "TestClass.my has 'res' attribute"); 
    this.ok(TestClass.my.meta.hasMethod('result'), "TestClass.my has 'result' method");
    
    
    var testClass = new TestClass();
    
    this.ok(testClass, "TestClass was instantiated");
    this.ok(testClass.res == 'instance', "Usual attribute was correctly installed");
    this.is(testClass.result(), 'TestClass:instance', "Method was correctly installed");
    
    this.ok(TestClass.my.res == 'class', "Symbiont's attribute was correctly installed");
    this.is(TestClass.my.result(), 'TestClass:class', "Symbiont's method was correctly installed");
    
    
    //==================================================================================================================================================================================
    this.diag("Role with symbiont creation");
    
    var Walk = new Joose.Kernel.Role('Walk', { 
        my : {
            have : {
                walking : false
            },
            
            methods : {
                walk : function (where) { this.walking = true },
                stop : function () { this.walking = false }
            }
        }
    }).c;
    
    this.ok(Walk.meta.myMeta.hasAttribute('walking') && Walk.meta.myMeta.getAttribute('walking').value == false, 'Walk has correct attribute walking');
    this.ok(Walk.meta.myMeta.hasMethod('walk'), 'Walk has method walk');
    this.ok(Walk.meta.myMeta.hasMethod('stop'), 'Walk has method stop');


    //==================================================================================================================================================================================
    this.diag("Role with symbiont applying");
    
    TestClass.meta.extend({ 
        does : [ Walk ]
    });
    
    this.ok(TestClass.my.meta.hasAttribute('walking'), "TestClass.my has 'walking' attribute"); 
    this.ok(TestClass.my.meta.hasMethod('walk'), "TestClass.my has 'walk' method");
    
    
    TestClass.my.walk('there');
    this.ok(TestClass.my.walking, 'TestClass is walking');
    TestClass.my.stop();
    this.ok(!TestClass.my.walking, 'TestClass is not walking');
    

//    //==================================================================================================================================================================================
//    this.diag("Cannibal creature");
//    
//    var Cannibalism = new Joose.Kernel.Role('Cannibalism', {
//        require : [ 'eat' ],
//        
//        override : {
//            eat : function (food) { 
//                if (food.constructor == this.constructor) this.SUPER(food); 
//            }
//        }
//    }).c;
//    
//    
//    var Cannibal = new Joose.Kernel.Class('Cannibal', {
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
//    var Plant = new Joose.Kernel.Class('Plant', {
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
//    var Drive = new Joose.Kernel.Role('Drive', {
//        require : [ 'walk' ],
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
//    var Vegetarian = new Joose.Kernel.Role('Vegetarian', {
//        require : [ 'eat' ],
//        
//        override : {
//            eat : function (food) { 
//                if (!food.meta.hasMethod('walk')) this.SUPER(food); 
//            }
//        }
//    }).c;    
//
//    
//    var Human = new Joose.Kernel.Class('Human', {
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