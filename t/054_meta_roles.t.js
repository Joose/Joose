StartTest(function(t) {
	t.plan(21)
	
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
                customAttr : function (targetMeta, info) {
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
        
        customAttr : {
            name : 'custom',
            value : 'attribute'
        }
        
    })
    t.ok(CustomBuilderWrapper, 'CustomBuilderWrapper role was created')
    t.ok(CustomBuilderWrapper.meta.isDetached(), "CustomBuilderWrapper's meta is detached (Role consume metaroles also)")
    
    t.ok(CustomBuilderWrapper.meta.hasAttribute('custom') && CustomBuilderWrapper.meta.getAttribute('custom').value == 'attribute', "CustomBuilderWrapper has correct attribute 'custom'")
    
    
    Class('TestClass2', {
        
        does : CustomBuilderWrapper,
        
        customAttr : {
            name : 'custom',
            value : 'attribute'
        }
        
    })
    t.ok(TestClass2, 'TestClass2 class was created')
    
    t.ok(TestClass2.meta.isDetached(), "TestClass2's meta is detached")
    t.ok(TestClass2.meta.builder.isDetached(), "TestClass2's builder is detached")
    t.ok(TestClass2.meta.stem.isDetached(), "TestClass2's stem is detached")
    
    t.ok(TestClass2.meta.builder.meta.hasMethod('customAttr'), "TestClass2's builder received new method")
    
    t.ok(TestClass2.meta.hasAttribute('custom') && TestClass2.meta.getAttribute('custom').value == 'attribute', "TestClass2 has correct attribute 'custom'")
    
    //==================================================================================================================================================================================
    t.diag("Mutability #2")
    
    TestClass2.meta.extend({
        doesnt : CustomBuilderWrapper
    })
    
    t.ok(!TestClass2.meta.isDetached(), "TestClass2's meta is attached back")
    t.ok(!TestClass2.meta.builder.isDetached(), "TestClass2's builder is attached back")
    t.ok(!TestClass2.meta.stem.isDetached(), "TestClass2's stem is attached back")
    
    t.ok(!TestClass2.meta.builder.meta.hasMethod('customAttr'), "TestClass2's builder have no roles applied")
})