(function () {
var testobj = new Test.TAP.Class();
testobj.plan(1)

testobj.testSanity = function() {
    //==================================================================================================================================================================================
    this.diag("Role application");
    
    this.ok(Joose.Managed.Role, "Joose.Managed.Role is here");
    this.ok(Joose.Managed.Class, "Joose.Managed.Class is here");
    
    //==================================================================================================================================================================================
    this.diag("Sanity");
    
    var Walk = new Joose.Managed.Role('Walk', { 
        have : {
            walking : false
        },
        
        methods : {
            walk : function (where) { return this.walking = true },
            stop : function () { return this.walking = false }
        }
    }).c;
    
    this.ok(Walk.meta.hasAttribute('walking') && Walk.meta.getAttribute('walking').value == false, 'Walk has correct attribute walking');
    this.ok(Walk.meta.hasMethod('walk'), 'Walk has method walk');
    this.ok(Walk.meta.hasMethod('stop'), 'Walk has method stop');


    var Eat = new Joose.Managed.Role('Eat', { 
        have : {
            eating : false
        },
        
        methods : {
            eat : function (food) { return this.eating = true },
            stop : function () { return this.eating = false }
        }
    }).c;
    
    
    var Dog = new Joose.Managed.Class('Dog', {
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
            exclude : [ 'stop']
        }]
    }).c;
    

    this.ok(Dog.meta.hasAttribute('walking') && Dog.meta.getAttribute('walking').value == false, "Dog has correct attribute 'walking'");
    this.ok(Dog.meta.hasAttribute('eating') && Dog.meta.getAttribute('eating').value == false, "Dog has correct attribute 'eating'");
    this.ok(Dog.meta.hasMethod('walk'), 'Dog has method walk');
    this.ok(Dog.meta.hasMethod('eat'), 'Dog has method eat');
    this.ok(Dog.meta.hasMethod('stopWalk'), 'Dog has method stopWalk');
    this.ok(Dog.meta.hasMethod('stopEat'), 'Dog has method stopEat');
    this.ok(!Dog.meta.hasMethod('stop'), 'Dog hasnt method stop');
    
    
//    var Human = new Joose.Managed.Class('Human', {
//        does : [ Walk, Eat ],
//        
//        override : {
//            
//        }
//    }).c;
    
    
    
//    //==================================================================================================================================================================================
//    this.diag("Basic composition");
//    
//    var B = new Joose.Managed.Role('B', { 
//        have : {
//            B1 : 'B1',
//            A1 : 'B-A1'
//        },
//        
//        methods : {
//            B2 : function () { return 'B2' }
//        },
//        
//        does : [ A ]
//    }).c;
//    
//    this.ok(B.meta.hasMethod('A2') && B.meta.getMethod('A2') == A.meta.getMethod('A2'), 'method A2 was composed from A #1');
//    this.is(B.meta.getAttribute('A1').value, 'B-A1', "A1 property of B don't changed");
//    
//    
//    var C = new Joose.Managed.Role('C', {
//        have : {
//            C1 : 'C1'
//        },
//        
//        does : [ B ]
//    }).c;
//    
//    //==================================================================================================================================================================================
//    this.diag("Composition with conflicting flattening");
//    
//    var E = new Joose.Managed.Role('E', {
//        have : {
//            E1 : 'E1'
//        },
//        
//        methods : {
//            E2 : function () { return 'E2' }
//        },
//        
//        does : [ A, B ]
//    }).c;
//    
//    this.ok(E.meta.hasAttribute('B1') && E.meta.getAttribute('B1') == B.meta.getAttribute('B1'), 'E received B1');
//    
//    this.ok(E.meta.hasAttribute('A1'), 'E received A1');
//    this.ok(E.meta.getAttribute('A1') instanceof Joose.Managed.Property.ConflictMarker, 'A1 is a conflict marker actually');
//    
//    this.ok(E.meta.hasMethod('A2') && E.meta.getMethod('A2') == A.meta.getMethod('A2'), 'E received A2');
//    this.ok(E.meta.hasMethod('B2') && E.meta.getMethod('B2') == B.meta.getMethod('B2'), 'E received B2');
//    
//
//
//    //==================================================================================================================================================================================
//    this.diag("Composition with conflicting flattening #2");
//    
//    var D = new Joose.Managed.Role('D', {
//        have : {
//            D1 : 'D1'
//        },
//        
//        does : [ B, E ]
//    }).c;
//    
//    
//    this.ok(D.meta.hasAttribute('A1') && D.meta.getAttribute('A1') instanceof Joose.Managed.Property.ConflictMarker, 'A1 is still a conflict marker');
//    
//    this.ok(D.meta.hasMethod('A2') && D.meta.getMethod('A2') == A.meta.getMethod('A2'), 'D received A2');
//    this.ok(D.meta.hasMethod('B2') && D.meta.getMethod('B2') == B.meta.getMethod('B2'), 'D received B2');
//    this.ok(D.meta.hasMethod('E2') && D.meta.getMethod('E2') == E.meta.getMethod('E2'), 'D received E2');
//    
//    
//    //==================================================================================================================================================================================
//    this.diag("Composition with conflict resolution");
//    
//    var F = new Joose.Managed.Role('F', {
//        have : {
//            F1 : 'F1',
//            A1 : 'F-A1'
//        },
//        
//        methods : {
//            F2 : function () { return 'F2' }
//        },
//        
//        does : [ C, D, E ]
//    }).c;
//    
//    
//    this.ok(F.meta.hasMethod('A2') && F.meta.getMethod('A2') == A.meta.getMethod('A2'), 'F received A2');
//    this.ok(F.meta.hasAttribute('D1') && F.meta.getAttribute('D1') == D.meta.getAttribute('D1'), 'F received D1');
//    this.ok(F.meta.hasMethod('E2') && F.meta.getMethod('E2') == E.meta.getMethod('E2'), 'F received E2');
//    
//    this.ok(F.meta.hasAttribute('A1'), 'F got A1');
//    this.ok(!(F.meta.getAttribute('A1') instanceof Joose.Managed.Property.ConflictMarker), 'A1 is not a conflict marker');
//    this.is(F.meta.getAttribute('A1').value, 'F-A1', 'Conflict was resolved');
//
//    
//    //==================================================================================================================================================================================
//    this.diag("Aliasing & exclusion");
//    
//    var E1 = new Joose.Managed.Role('E1', {
//        have : {
//            E11 : 'E11'
//        },
//        
//        does : [{
//            role : A,
//            alias : {
//                A1 : 'A1_from_A'
//            },
//            exclude : [ 'A2' ]
//        },{
//            role : B,
//            alias : {
//                A1 : 'A1_from_B'
//            },
//            exclude : [ 'A1', 'B1' ]
//        }]
//    }).c;
//    
//    this.ok(!E1.meta.hasAttribute('B1'), "F don't received B1");
//    
//    this.ok(E1.meta.hasMethod('A2') && E1.meta.getMethod('A2') == B.meta.getMethod('A2'), "F still received A2 from B");
//    this.ok(E1.meta.hasMethod('B2') && E1.meta.getMethod('B2') == E.meta.getMethod('B2'), 'E1 received B2');
//    
//    this.ok(E1.meta.hasAttribute('A1'), "F now received A1 from A without conflict");
//    this.ok(!(E1.meta.getAttribute('A1') instanceof Joose.Managed.Property.ConflictMarker), 'A1 is not a conflict marker');
//    this.ok(E1.meta.getAttribute('A1') == A.meta.getAttribute('A1'), "F now received A1 from A");
//    
//    this.ok(E1.meta.hasAttribute('A1_from_A'), 'F received A1_from_A #1');
//    this.ok(E1.meta.getAttribute('A1_from_A').value == 'A1', 'F received A1_from_A #2');
//    
//    this.ok(E1.meta.hasAttribute('A1_from_B'), 'F received A1_from_B #1');
//    this.ok(E1.meta.getAttribute('A1_from_B').value == 'B-A1', 'F received A1_from_B #2');
//    
//    
//    //==================================================================================================================================================================================
//    this.diag("Mutability");
//    
//    A.meta.extend({
//        methods : {
//            A3 : function () { return 'A3' }
//        }        
//    });
//    
//    this.ok(B.meta.hasMethod('A3') && B.meta.getMethod('A3') == A.meta.getMethod('A3'), 'B received A3 property via mutation');    
//    this.ok(C.meta.hasMethod('A3') && C.meta.getMethod('A3') == A.meta.getMethod('A3'), 'C received A3 property via mutation');
//    this.ok(D.meta.hasMethod('A3') && D.meta.getMethod('A3') == A.meta.getMethod('A3'), 'D received A3 property via mutation');
//    this.ok(E.meta.hasMethod('A3') && E.meta.getMethod('A3') == A.meta.getMethod('A3'), 'E received A3 property via mutation');
//    this.ok(F.meta.hasMethod('A3') && F.meta.getMethod('A3') == A.meta.getMethod('A3'), 'F received A3 property via mutation');
//    this.ok(E1.meta.hasMethod('A3') && E1.meta.getMethod('A3') == A.meta.getMethod('A3'), 'E1 received A3 property via mutation');
//    
//    
//    A.meta.extend({
//        removeMethods : [ 'A3' ]
//    });    
//    
//    this.ok(!B.meta.hasMethod('A3'), 'B lost A3 property via mutation');    
//    this.ok(!C.meta.hasMethod('A3'), 'C lost A3 property via mutation');
//    this.ok(!D.meta.hasMethod('A3'), 'D lost A3 property via mutation');
//    this.ok(!E.meta.hasMethod('A3'), 'E lost A3 property via mutation');
//    this.ok(!F.meta.hasMethod('A3'), 'F lost A3 property via mutation');
//    this.ok(!E1.meta.hasMethod('A3'), 'E1 lost A3 property via mutation');
//    
//    
//    F.meta.extend({
//        have : {
//            C1 : 'F-C1',
//            D1 : 'F-D1'
//        },
//        
//        havenot : [ 'A1' ]
//    });
//
//    this.ok(F.meta.hasAttribute('C1') && F.meta.getAttribute('C1').value == 'F-C1', 'F have override C1 property during mutation');
//    this.ok(F.meta.hasAttribute('D1') && F.meta.getAttribute('D1').value == 'F-D1', 'F have override D1 property during mutation');
//    this.ok(F.meta.getAttribute('A1') instanceof Joose.Managed.Property.ConflictMarker, 'A1 of F is now a conflict marker');
//    
//    B.meta.extend({
//        havenot : [ 'A1' ]
//    });
//    
//    this.ok(!(F.meta.getAttribute('A1') instanceof Joose.Managed.Property.ConflictMarker), 'A1 of F is now not a conflict marker');
//    this.ok(F.meta.getAttribute('A1') == A.meta.getAttribute('A1'), 'A1 of F is now obtained from A');
    
};

return testobj;
})()