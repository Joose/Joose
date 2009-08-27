StartTest(function (t) {
    t.plan(15)
    
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
    
    Class('TestClass1', {
        has : {
            attribute1 : null,
            attribute2 : null
        },
        
        methods : {
            method1 : function () {},
            
            method2 : function () {}
        }
    
    })
    
    Class('TestClass2', {
        isa : TestClass1,
        
        has : {
            attribute3 : null,
            attribute4 : null
        },
        
        methods : {
            method3 : function () {},
            
            method4 : function () {}
        }
    
    })
    
    
    var methods = TestClass2.meta.getMethods()
    
    t.ok(methods.haveProperty('method1'), "TestClass2 have 'method1' method")
    t.ok(!methods.haveOwnProperty('method1'), "its not 'own' method though")
    
    var count = 0
    methods.eachAll(function () { count++ })
    
    t.ok(count == Joose.is_IE ? 11 : 12, "TestClass2 has 12 methods (included inherited from Joose.Proto.Object) or 11 for fancy IE")

    var count = 0
    methods.eachOwn(function () { count++ })
    
    t.ok(count == 2, "TestClass2 has 2 own methods")

    
    //==================================================================================================================================================================================
    t.diag("Reflection - getAttributes")

    var attributes = TestClass2.meta.getAttributes()
    
    t.ok(attributes.haveProperty('attribute1'), "TestClass2 have 'attribute1' attribute")
    t.ok(!attributes.haveOwnProperty('attribute1'), "its not 'own' attribute though")
    
    var count = 0
    attributes.eachAll(function () { count++ })
    
    t.ok(count == 4, "TestClass2 has 4 attributes (included inherited from Joose.Proto.Object)")

    var count = 0
    attributes.eachOwn(function () { count++ })
    
    t.ok(count == 2, "TestClass2 has 2 own attributes")
    
})