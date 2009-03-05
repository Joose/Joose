(function () {
var testobj = new Test.TAP.Class();
testobj.plan(1)

testobj.testSanity = function() {
    //==================================================================================================================================================================================
    this.diag("Joose.Managed.PropertySet");
    
    this.ok(Joose.Managed.Property, "Joose.Managed.Property is here");
    this.ok(Joose.Managed.Property.Alias, "Joose.Managed.Property.Alias is here");
    this.ok(Joose.Managed.Property.ConflictMarker, "Joose.Managed.Property.ConflictMarker is here");
    this.ok(Joose.Managed.PropertySet, "Joose.Managed.PropertySet is here");
    

    //==================================================================================================================================================================================
    this.diag("Sanity");
    
    var A = new Joose.Managed.PropertySet();
    A.addProperty('A1', { init : 'A1'} );
    A.addProperty('A2', { init : 'A2'} );
    
    this.ok(A.haveProperty('A1') && A.getProperty('A1').value == 'A1', 'A has correct property A1');
    this.ok(A.haveProperty('A2') && A.getProperty('A2').value == 'A2', 'A has correct property A2');


    //==================================================================================================================================================================================
    this.diag("Basic composition");
    
    var B = new Joose.Managed.PropertySet();
    B.addProperty('B1', { init : 'B1'} );
    B.addProperty('B2', { init : 'B2'} );
    B.addProperty('A1', { init : 'B-A1'} );
    
    B.composeFrom(A);
    
    this.ok(B.haveProperty('A2'), 'A2 property was composed from A #1');
    this.ok(B.getProperty('A2') == A.getProperty('A2'), 'A2 property was composed from A #2');
    
    this.is(B.getProperty('A1').value, 'B-A1', "A1 property of B don't changed");
    
    var C = new Joose.Managed.PropertySet();
    C.addProperty('C1', { init : 'C1'} );
    
    C.composeFrom(B);
    
    //==================================================================================================================================================================================
    this.diag("Composition with conflicting flattening");
    
    var E = new Joose.Managed.PropertySet();
    E.addProperty('E1', { init : 'E1'} );
    E.addProperty('E2', { init : 'E2'} );
    
    E.composeFrom(A, B);
    
    this.ok(E.haveProperty('A1'), 'E received A1');
    this.ok(E.haveProperty('A2'), 'E received A2');
    this.ok(E.haveProperty('B1'), 'E received B1');
    this.ok(E.haveProperty('B2'), 'E received B2');
    
    this.ok(E.getProperty('A2') == A.getProperty('A2'), 'A2 property was composed from A #2');
    
    this.ok(E.getProperty('A1') instanceof Joose.Managed.Property.ConflictMarker, 'A1 is a conflict marker actually');


    //==================================================================================================================================================================================
    this.diag("Composition with conflicting flattening #2");
    
    var D = new Joose.Managed.PropertySet();
    D.addProperty('D1', { init : 'D1'} );
    
    D.composeFrom(B, E);
    
    this.ok(D.haveProperty('A2'), 'D received A2 #1');
    this.ok(D.getProperty('A2') == A.getProperty('A2'), 'D received A2 #2');
    
    this.ok(D.haveProperty('A1'), 'D received A1');
    this.ok(D.getProperty('A1') instanceof Joose.Managed.Property.ConflictMarker, 'A1 is still a conflict marker');
    

    //==================================================================================================================================================================================
    this.diag("Composition with conflict resolution");
    
    var F = new Joose.Managed.PropertySet();
    F.addProperty('F1', { init : 'F1'} );
    F.addProperty('A1', { init : 'F-A1'} );
    
    F.composeFrom(C, D, E);
    
    this.ok(F.haveProperty('A2'), 'F received A2 #1');
    this.ok(F.getProperty('A2') == A.getProperty('A2'), 'F received A2 #2');
    
    this.ok(F.haveProperty('B1'), 'F received B1 #1');
    this.ok(F.getProperty('B1') == B.getProperty('B1'), 'F received B1 #2');
    
    this.ok(F.haveProperty('B2'), 'F received B2 #1');
    this.ok(F.getProperty('B2') == B.getProperty('B2'), 'F received B2 #2');
    
    this.ok(F.haveProperty('A1'), 'F got A1');
    this.ok(!(F.getProperty('A1') instanceof Joose.Managed.Property.ConflictMarker), 'A1 is not a conflict marker');
    this.is(F.getProperty('A1').value, 'F-A1', 'Conflict was resolved');
};

return testobj;
})()