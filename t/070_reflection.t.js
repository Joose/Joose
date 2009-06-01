StartTest(function(t) {
	t.plan(5)
	
    //==================================================================================================================================================================================
    t.diag("Reflection")
    
    var metaClassRoles = Joose.Meta.Class.meta.getRoles()
    
    t.ok(metaClassRoles.length == 4, 'Joose.Meta.Class has 4 roles applied')
    
    t.ok(Joose.A.exists(metaClassRoles, Joose.Namespace.Able), 'Joose.Namespace.Able is applied to Joose.Meta.Class')
    t.ok(Joose.A.exists(metaClassRoles, Joose.Managed.My), 'Joose.Managed.My is applied to Joose.Meta.Class')
    t.ok(Joose.A.exists(metaClassRoles, Joose.Managed.Attribute.Builder), 'Joose.Managed.Attribute.Builder is applied to Joose.Meta.Class')
    t.ok(Joose.A.exists(metaClassRoles, Joose.Meta.MetaRole), 'Joose.Meta.MetaRole is applied to Joose.Meta.Class')
    
})