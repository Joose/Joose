(function () {
var testobj = new Test.TAP.Class();
testobj.plan(1)

testobj.testSanity = function() {
    //==================================================================================================================================================================================
    this.diag("Joose.Managed.Stem");
    
    this.ok(Joose.Managed.Stem, "Joose.Managed.Stem is here");
    

    //==================================================================================================================================================================================
    this.diag("Sanity");
    
    var A = new Joose.Managed.Stem();
    
    A.addAttribute('A1', 'A1');
    A.addMethod('A2', 'A2');
    
    A.close();
    
    this.ok(A.hasAttribute('A1') && A.getAttribute('A1').value == 'A1', 'A has correct attribute A1');
    this.ok(A.hasMethod('A2') && A.getMethod('A2').value == 'A2', 'A has correct method A2');


    //==================================================================================================================================================================================
    this.diag("Basic composition");
    
    var B = new Joose.Managed.Stem();
    
    B.addAttribute('B1', 'B1' );
    B.addAttribute('A1', 'B-A1' );
    
    B.addMethod('B2', 'B2' );
    
    B.composeFrom(A);
    
    B.close();
    
    this.ok(B.hasMethod('A2'), 'method A2 was composed from A #1');
    this.ok(B.getMethod('A2') == A.getMethod('A2'), 'method A2 was composed from A #2');
    
    this.is(B.getAttribute('A1').value, 'B-A1', "A1 property of B don't changed");
    
    var C = new Joose.Managed.Stem();
    
    C.addAttribute('C1', 'C1');
    
    C.composeFrom(B);
    
    C.close();
    
    //==================================================================================================================================================================================
    this.diag("Composition with conflicting flattening");
    
    var E = new Joose.Managed.Stem();
    
    E.addAttribute('E1','E1');
    E.addMethod('E2', 'E2');
    
    E.composeFrom(A, B);
    
    E.close();
    
    this.ok(E.hasAttribute('B1') && E.getAttribute('B1') == B.getAttribute('B1'), 'E received B1');
    
    this.ok(E.hasAttribute('A1'), 'E received A1');
    this.ok(E.getAttribute('A1') instanceof Joose.Managed.Property.ConflictMarker, 'A1 is a conflict marker actually');
    
    this.ok(E.hasMethod('A2') && E.getMethod('A2') == A.getMethod('A2'), 'E received A2');
    this.ok(E.hasMethod('B2') && E.getMethod('B2') == B.getMethod('B2'), 'E received B2');
    


    //==================================================================================================================================================================================
    this.diag("Composition with conflicting flattening #2");
    
    var D = new Joose.Managed.Stem();
    
    D.addAttribute('D1', 'D1');

    D.composeFrom(B, E);
    
    D.close();
    
    this.ok(D.hasAttribute('A1') && D.getAttribute('A1') instanceof Joose.Managed.Property.ConflictMarker, 'A1 is still a conflict marker');
    
    this.ok(D.hasMethod('A2') && D.getMethod('A2') == A.getMethod('A2'), 'D received A2');
    this.ok(D.hasMethod('B2') && D.getMethod('B2') == B.getMethod('B2'), 'D received B2');
    this.ok(D.hasMethod('E2') && D.getMethod('E2') == E.getMethod('E2'), 'D received E2');
    
    
    //==================================================================================================================================================================================
    this.diag("Composition with conflict resolution");
    
    var F = new Joose.Managed.Stem();
    
    F.addAttribute('F1', 'F1');
    F.addAttribute('A1', 'F-A1');
    
    F.addMethod('F2', 'F2');
    
    F.composeFrom(C, D, E);
    
    F.close();
    
    this.ok(F.hasMethod('A2') && F.getMethod('A2') == A.getMethod('A2'), 'F received A2');
    this.ok(F.hasAttribute('D1') && F.getAttribute('D1') == D.getAttribute('D1'), 'F received D1');
    this.ok(F.hasMethod('E2') && F.getMethod('E2') == E.getMethod('E2'), 'F received E2');
    
    this.ok(F.hasAttribute('A1'), 'F got A1');
    this.ok(!(F.getAttribute('A1') instanceof Joose.Managed.Property.ConflictMarker), 'A1 is not a conflict marker');
    this.is(F.getAttribute('A1').value, 'F-A1', 'Conflict was resolved');

    
    //==================================================================================================================================================================================
    this.diag("Aliasing & exclusion");
    
    var E1 = new Joose.Managed.Stem();
    
    E1.addAttribute('E11', 'E11');
    
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
    
    this.ok(!E1.hasAttribute('B1'), "F don't received B1");
    
    this.ok(E1.hasMethod('A2') && E1.getMethod('A2') == B.getMethod('A2'), "F still received A2 from B");
    this.ok(E1.hasMethod('B2') && E1.getMethod('B2') == E.getMethod('B2'), 'E1 received B2');
    
    this.ok(E1.hasAttribute('A1'), "F now received A1 from A without conflict");
    this.ok(!(E1.getAttribute('A1') instanceof Joose.Managed.Property.ConflictMarker), 'A1 is not a conflict marker');
    this.ok(E1.getAttribute('A1') == A.getAttribute('A1'), "F now received A1 from A");
    
    this.ok(E1.hasAttribute('A1_from_A'), 'F received A1_from_A #1');
    this.ok(E1.getAttribute('A1_from_A').value == 'A1', 'F received A1_from_A #2');
    
    this.ok(E1.hasAttribute('A1_from_B'), 'F received A1_from_B #1');
    this.ok(E1.getAttribute('A1_from_B').value == 'B-A1', 'F received A1_from_B #2');
    
    
    //==================================================================================================================================================================================
    this.diag("Mutability");
    
    A.open();
    A.addMethod('A3', 'A3');
    A.close();
    
    this.ok(B.hasMethod('A3') && B.getMethod('A3') == A.getMethod('A3'), 'B received A3 property via mutation');    
    this.ok(C.hasMethod('A3') && C.getMethod('A3') == A.getMethod('A3'), 'C received A3 property via mutation');
    this.ok(D.hasMethod('A3') && D.getMethod('A3') == A.getMethod('A3'), 'D received A3 property via mutation');
    this.ok(E.hasMethod('A3') && E.getMethod('A3') == A.getMethod('A3'), 'E received A3 property via mutation');
    this.ok(F.hasMethod('A3') && F.getMethod('A3') == A.getMethod('A3'), 'F received A3 property via mutation');
    this.ok(E1.hasMethod('A3') && E1.getMethod('A3') == A.getMethod('A3'), 'E1 received A3 property via mutation');
    
    A.open();
    A.removeMethod('A3');
    A.close();
    
    this.ok(!B.hasMethod('A3'), 'B lost A3 property via mutation');    
    this.ok(!C.hasMethod('A3'), 'C lost A3 property via mutation');
    this.ok(!D.hasMethod('A3'), 'D lost A3 property via mutation');
    this.ok(!E.hasMethod('A3'), 'E lost A3 property via mutation');
    this.ok(!F.hasMethod('A3'), 'F lost A3 property via mutation');
    this.ok(!E1.hasMethod('A3'), 'E1 lost A3 property via mutation');
    
    F.open();
    F.addAttribute('C1', 'F-C1');
    F.addAttribute('D1', 'F-D1');
    F.removeAttribute('A1');
    F.close();
    
    this.ok(F.hasAttribute('C1') && F.getAttribute('C1').value == 'F-C1', 'F have override C1 property during mutation');
    this.ok(F.hasAttribute('D1') && F.getAttribute('D1').value == 'F-D1', 'F have override D1 property during mutation');
    this.ok(F.getAttribute('A1') instanceof Joose.Managed.Property.ConflictMarker, 'A1 of F is now a conflict marker');
    
    B.open();
    B.removeAttribute('A1');
    B.close();
    
    this.ok(!(F.getAttribute('A1') instanceof Joose.Managed.Property.ConflictMarker), 'A1 of F is now not a conflict marker');
    this.ok(F.getAttribute('A1') == A.getAttribute('A1'), 'A1 of F is now obtained from A');
    
};

return testobj;
})()