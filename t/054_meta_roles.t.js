StartTest(function(t) {
    t.plan(34)
    
    //==================================================================================================================================================================================
    t.diag("MetaRoles (roles which applies to metaclass of applicant")
    
    t.ok(Joose.Managed.Property.MetaRole, "Joose.Managed.Property.MetaRole is here")
    t.ok(Joose.Managed.StemElement.MetaRoles, "Joose.Managed.StemElement.MetaRoles is here")
    t.ok(Joose.Meta.MetaRole, "Joose.Meta.MetaRole is here")

    
    Role('MetaRole', {
        
        methods : {
            customProcess : function () {
                return 'custom'
            }
        }
    
    })

    
    Class('TestClass', {
        
        metaRoles : MetaRole
        
    })
    t.ok(TestClass, 'TestClass class was created')
    
    t.ok(TestClass.meta.isDetached(), "TestClass's meta is detached")
    t.ok(TestClass.meta.customProcess() == 'custom', "Meta role were applied")

    
    //==================================================================================================================================================================================
    t.diag("Mutability")
    
    TestClass.meta.extend({
        removeMetaRoles : MetaRole
    })
    
    t.ok(!TestClass.meta.isDetached(), "TestClass's meta is attached back")

    
    //==================================================================================================================================================================================
    t.diag("Indirect builder's composing")
    
    Role('CustomBuilder', {
        
        builder : {
            methods : {
                sugar : function (targetMeta, info) {
                    targetMeta.stem.properties.attributes.addProperty(info.name, { init : info.value })
                }
            }
        },
        
        stem : {
            have : {
                attr : 'value'
            }
        }
    
    })
    t.ok(CustomBuilder, 'CustomBuilder role was created')
    
    Role('CustomBuilderWrapper', {
        metaRoles : CustomBuilder,
        
        sugar : {
            name : 'custom',
            value : 'attribute'
        }
        
    })
    t.ok(CustomBuilderWrapper, 'CustomBuilderWrapper role was created')
    t.ok(CustomBuilderWrapper.meta.isDetached(), "CustomBuilderWrapper's meta is detached (Role consume metaroles also)")
    
    t.ok(CustomBuilderWrapper.meta.hasAttribute('custom') && CustomBuilderWrapper.meta.getAttribute('custom').value == 'attribute', "CustomBuilderWrapper has correct attribute 'custom'")
    
    
    Class('TestClass2', {
        
        does : CustomBuilderWrapper,
        
        sugar : {
            name : 'custom',
            value : 'attribute'
        }
        
    })
    t.ok(TestClass2, 'TestClass2 class was created')
    
    t.ok(TestClass2.meta.isDetached(), "TestClass2's meta is detached")
    t.ok(TestClass2.meta.builder.isDetached(), "TestClass2's builder is detached")
    t.ok(TestClass2.meta.stem.isDetached(), "TestClass2's stem is detached")
    
    t.ok(TestClass2.meta.builder.meta.hasMethod('sugar'), "TestClass2's builder received new method")
    
    t.ok(TestClass2.meta.hasAttribute('custom') && TestClass2.meta.getAttribute('custom').value == 'attribute', "TestClass2 has correct attribute 'custom'")
    
    //==================================================================================================================================================================================
    t.diag("Mutability #2")
    
    TestClass2.meta.extend({
        doesnt : CustomBuilderWrapper
    })
    
    t.ok(!TestClass2.meta.isDetached(), "TestClass2's meta is attached back")
    t.ok(!TestClass2.meta.builder.isDetached(), "TestClass2's builder is attached back")
    t.ok(!TestClass2.meta.stem.isDetached(), "TestClass2's stem is attached back")
    
    t.ok(!TestClass2.meta.builder.meta.hasMethod('sugar'), "TestClass2's builder have no roles applied")
    
    
    //==================================================================================================================================================================================
    t.diag("MetaRoles inheritance")
    
    Class('TestClass3', {
        
        does : CustomBuilderWrapper,
        
        sugar : {
            name : 'custom3',
            value : 'attribute3'
        }
        
    })
    t.ok(TestClass3, 'TestClass3 class was created')

    
    Class('TestClass4', {
        isa : TestClass3,
        
        sugar : {
            name : 'custom4',
            value : 'attribute4'
        }
        
    })
    t.ok(TestClass4, 'TestClass4 class was created')
    
    t.ok(TestClass4.meta.isDetached(), "TestClass4's meta is detached")
    t.ok(TestClass4.meta.builder.meta.hasMethod('sugar'), "TestClass4's builder received new method")
    
    t.ok(TestClass4.meta.hasAttribute('custom4') && TestClass4.meta.getAttribute('custom4').value == 'attribute4', "TestClass4 has correct attribute 'custom4'")

    
    //==================================================================================================================================================================================
    t.diag("Mutability #3")
    
    TestClass3.meta.extend({
        doesnt : CustomBuilderWrapper
    })
    
    t.ok(!TestClass4.meta.isDetached(), "TestClass4's meta is attached back")
    t.ok(!TestClass4.meta.builder.meta.hasMethod('sugar'), "TestClass4's builder have no roles applied")
    
    
    //==================================================================================================================================================================================
    t.diag("'traits' alias")
    
    Class('TestClass5', {
        
        traits : CustomBuilder,
        
        sugar : {
            name : 'custom',
            value : 'attribute'
        }
        
    })
    t.ok(TestClass5, 'TestClass5 class was created')
    
    t.ok(TestClass5.meta.isDetached(), "TestClass5's meta is detached")
    t.ok(TestClass5.meta.builder.isDetached(), "TestClass5's builder is detached")
    t.ok(TestClass5.meta.stem.isDetached(), "TestClass5's stem is detached")
    
    t.ok(TestClass5.meta.builder.meta.hasMethod('sugar'), "TestClass5's builder received new method")
    
    t.ok(TestClass5.meta.hasAttribute('custom') && TestClass5.meta.getAttribute('custom').value == 'attribute', "TestClass5 has correct attribute 'custom'")
    
})