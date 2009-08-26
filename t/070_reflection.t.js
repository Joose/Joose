StartTest(function(t) {
    t.plan(5)
    
    //==================================================================================================================================================================================
    t.diag("Reflection - getRoles")
    
    var metaClassRoles = Joose.Meta.Class.meta.getRoles()
    
    t.ok(metaClassRoles.length == 4, 'Joose.Meta.Class has 4 roles applied')
    
    t.ok(Joose.A.exists(metaClassRoles, Joose.Namespace.Able), 'Joose.Namespace.Able is applied to Joose.Meta.Class')
    t.ok(Joose.A.exists(metaClassRoles, Joose.Managed.My), 'Joose.Managed.My is applied to Joose.Meta.Class')
    t.ok(Joose.A.exists(metaClassRoles, Joose.Managed.Attribute.Builder), 'Joose.Managed.Attribute.Builder is applied to Joose.Meta.Class')
    t.ok(Joose.A.exists(metaClassRoles, Joose.Meta.MetaRole), 'Joose.Meta.MetaRole is applied to Joose.Meta.Class')

    
    
    //==================================================================================================================================================================================
    t.diag("Reflection - does")
    
    t.ok(Joose.Meta.Class.meta.does(Joose.Namespace.Able), 'Joose.Meta.Class does Joose.Namespace.Able')
    t.ok(Joose.Meta.Class.meta.does(Joose.Managed.My), 'Joose.Meta.Class does Joose.Managed.My')
    
    
    
    //==================================================================================================================================================================================
    t.diag("Reflection - getMethods")
    
    var methods = Joose.Meta.Class.meta.getMethods()
    
    t.ok(methods.haveProperty('getMethods'), "Joose.Meta.Class have 'getMethods' method")
    t.ok(!methods.haveOwnProperty('getMethods'), "its not 'own' method though")
    
    
})