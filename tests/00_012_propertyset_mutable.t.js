(function () {
var testobj = new Test.TAP.Class();
testobj.plan(1)

testobj.testSanity = function() {
    //==================================================================================================================================================================================
    this.diag("Joose.Managed.PropertySet.Mutable");
    
    this.ok(Joose.Managed.Property.Mutable, "Joose.Managed.Property.Mutable is here");
    this.ok(Joose.Managed.PropertySet.Mutable, "Joose.Managed.PropertySet.Mutable is here");
    

    //==================================================================================================================================================================================
    this.diag("Sanity");
    
    var A = new Joose.Managed.PropertySet.Mutable();
    A.addProperty('A1', { init : 'A1'} );
    A.addProperty('A2', { init : 'A2'} );
    
    A.close();
    
    this.ok(A.haveProperty('A1') && A.getProperty('A1').value == 'A1', 'A has correct property A1');
    this.ok(A.haveProperty('A2') && A.getProperty('A2').value == 'A2', 'A has correct property A2');


    //==================================================================================================================================================================================
    this.diag("Basic composition");
    
    var B = new Joose.Managed.PropertySet.Mutable();
    B.addProperty('B1', { init : 'B1'} );
    B.addProperty('B2', { init : 'B2'} );
    B.addProperty('A1', { init : 'B-A1'} );
    
    B.composeFrom(A);
    
    B.close();
    
    this.ok(B.haveProperty('A2'), 'A2 property was composed from A #1');
    this.ok(B.getProperty('A2') == A.getProperty('A2'), 'A2 property was composed from A #2');
    
    this.is(B.getProperty('A1').value, 'B-A1', "A1 property of B don't changed");
    
    var C = new Joose.Managed.PropertySet.Mutable();
    C.addProperty('C1', { init : 'C1'} );
    
    C.composeFrom(B);
    
    C.close();
    
    //==================================================================================================================================================================================
    this.diag("Composition with conflicting flattening");
    
    var E = new Joose.Managed.PropertySet.Mutable();
    E.addProperty('E1', { init : 'E1'} );
    E.addProperty('E2', { init : 'E2'} );
    
    E.composeFrom(A, B);
    
    E.close();
    
    this.ok(E.haveProperty('A1'), 'E received A1');
    this.ok(E.haveProperty('A2'), 'E received A2');
    this.ok(E.haveProperty('B1'), 'E received B1');
    this.ok(E.haveProperty('B2'), 'E received B2');
    
    this.ok(E.getProperty('A2') == A.getProperty('A2'), 'A2 property was composed from A #2');
    
    this.ok(E.getProperty('A1') instanceof Joose.Managed.Property.ConflictMarker, 'A1 is a conflict marker actually');


    //==================================================================================================================================================================================
    this.diag("Composition with conflicting flattening #2");
    
    var D = new Joose.Managed.PropertySet.Mutable();
    D.addProperty('D1', { init : 'D1'} );

    D.composeFrom(B, E);
    
    D.close();
    
    this.ok(D.haveProperty('A2'), 'D received A2 #1');
    this.ok(D.getProperty('A2') == A.getProperty('A2'), 'D received A2 #2');
    
    this.ok(D.haveProperty('A1'), 'D received A1');
    this.ok(D.getProperty('A1') instanceof Joose.Managed.Property.ConflictMarker, 'A1 is still a conflict marker');
    

    //==================================================================================================================================================================================
    this.diag("Composition with conflict resolution");
    
    var F = new Joose.Managed.PropertySet.Mutable();
    F.addProperty('F1', { init : 'F1'} );
    F.addProperty('A1', { init : 'F-A1'} );
    
    F.composeFrom(C, D, E);
    
    F.close();
    
    this.ok(F.haveProperty('A2'), 'F received A2 #1');
    this.ok(F.getProperty('A2') == A.getProperty('A2'), 'F received A2 #2');
    
    this.ok(F.haveProperty('B1'), 'F received B1 #1');
    this.ok(F.getProperty('B1') == B.getProperty('B1'), 'F received B1 #2');
    
    this.ok(F.haveProperty('B2'), 'F received B2 #1');
    this.ok(F.getProperty('B2') == B.getProperty('B2'), 'F received B2 #2');
    
    this.ok(F.haveProperty('A1'), 'F got A1');
    this.ok(!(F.getProperty('A1') instanceof Joose.Managed.Property.ConflictMarker), 'A1 is not a conflict marker');
    this.is(F.getProperty('A1').value, 'F-A1', 'Conflict was resolved');

    
    //==================================================================================================================================================================================
    this.diag("Aliasing & exclusion");
    
    var E1 = new Joose.Managed.PropertySet.Mutable();
    E1.addProperty('E11', { init : 'E11'} );
    
    E1.composeFrom({
        properties : A,
        alias : {
            A1 : 'A1_from_A'
        },
        exclude : [ 'A2' ]
    },{
        properties : B,
        alias : {
            A1 : 'A1_from_B'
        },
        exclude : [ 'A1', 'B1' ]
    });
    
    E1.close();
    
    this.ok(!E1.haveProperty('B1'), "F don't received B1");
    
    this.ok(E1.haveProperty('B2'), 'F received B2 #1');
    this.ok(E1.getProperty('B2') == B.getProperty('B2'), 'F received B2 #2');
    
    this.ok(E1.haveProperty('A1'), "F now received A1 from A without conflict");
    this.ok(E1.getProperty('A1') == A.getProperty('A1'), "F now received A1 from A");
    
    this.ok(E1.haveProperty('A1_from_A'), 'F received A1_from_A #1');
    this.ok(E1.getProperty('A1_from_A').value == 'A1', 'F received A1_from_A #2');
    
    this.ok(E1.haveProperty('A1_from_B'), 'F received A1_from_B #1');
    this.ok(E1.getProperty('A1_from_B').value == 'B-A1', 'F received A1_from_B #2');
    
    this.ok(E1.haveProperty('A2'), "F still received A2 from B");
    this.ok(E1.getProperty('A2') == B.getProperty('A2'), "F still received A2 from B");

    
    //==================================================================================================================================================================================
    this.diag("Mutability");
    
    A.open();
    A.addProperty('A3', { init : 'A3'} );
    A.close();
    
    this.ok(B.haveProperty('A3') && B.getProperty('A3') == A.getProperty('A3'), 'B received A3 property via mutation');    
    this.ok(C.haveProperty('A3') && C.getProperty('A3') == A.getProperty('A3'), 'C received A3 property via mutation');
    this.ok(D.haveProperty('A3') && D.getProperty('A3') == A.getProperty('A3'), 'D received A3 property via mutation');
    this.ok(E.haveProperty('A3') && E.getProperty('A3') == A.getProperty('A3'), 'E received A3 property via mutation');
    this.ok(F.haveProperty('A3') && F.getProperty('A3') == A.getProperty('A3'), 'F received A3 property via mutation');
    this.ok(E1.haveProperty('A3') && E1.getProperty('A3') == A.getProperty('A3'), 'E1 received A3 property via mutation');
    
    A.open();
    A.removeProperty('A3', { init : 'A3'} );
    A.close();
    
    this.ok(!B.haveProperty('A3') && B.getProperty('A3') == A.getProperty('A3'), 'B lost A3 property via mutation');    
    this.ok(!C.haveProperty('A3') && C.getProperty('A3') == A.getProperty('A3'), 'C lost A3 property via mutation');
    this.ok(!D.haveProperty('A3') && D.getProperty('A3') == A.getProperty('A3'), 'D lost A3 property via mutation');
    this.ok(!E.haveProperty('A3') && E.getProperty('A3') == A.getProperty('A3'), 'E lost A3 property via mutation');
    this.ok(!F.haveProperty('A3') && F.getProperty('A3') == A.getProperty('A3'), 'F lost A3 property via mutation');
    this.ok(!E1.haveProperty('A3') && E1.getProperty('A3') == A.getProperty('A3'), 'E1 lost A3 property via mutation');
    
    F.open();
    F.addProperty('C1', { init : 'F-C1' });
    F.addProperty('D1', { init : 'F-D1' });
    F.removeProperty('A1');
    F.close();
    
    this.ok(F.haveProperty('C1') && F.getProperty('C1').value == 'F-C1', 'F have override C1 property during mutation');
    this.ok(F.haveProperty('D1') && F.getProperty('D1').value == 'F-D1', 'F have override D1 property during mutation');
    this.ok(F.getProperty('A1') instanceof Joose.Managed.Property.ConflictMarker, 'A1 of F is now a conflict marker');
    
    B.open();
    B.removeProperty('A1');
    B.close();
    
    this.ok(!(F.getProperty('A1') instanceof Joose.Managed.Property.ConflictMarker), 'A1 of F is now not a conflict marker');
    this.ok(F.getProperty('A1') == A.getProperty('A1'), 'A1 of F is now from A');
    
};

return testobj;
})()