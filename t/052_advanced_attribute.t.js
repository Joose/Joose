StartTest(function (t) {
    
    t.plan(10)
    
    //==================================================================================================================================================================================
    t.diag("Advanced attributes and class's body")
    
    
    var bodyCalled = false
    
    Class('Test', {
        
        has : {
            attr         : { is : 'rw', init : 'value' }
        },
        
        body : function () {
            bodyCalled = true
        }
    
    })
    
    t.ok(Test, "'Test' class was created")
    
    t.ok(Test.meta.getAttribute('attr').value == 'value', "'Test' class has correct 'attr' attribute")
    
    t.ok(!Test.meta.stem.opened, "'Test' class has closed stem")
    
    t.ok(bodyCalled, 'Body of class was called')

    
    //==================================================================================================================================================================================
    t.diag("Consumin of advanced attribute from Role")    
    
    Role('TestRole', {
        has : {
            res : {
                is : 'rw',
                init : 'advanced'
            }
        }
    })    
    
    t.ok(TestRole.meta.hasAttribute('res'), "'res' attribute was added")    
    
    
    var advAttr = TestRole.meta.getAttribute('res')    
    
    t.ok(advAttr instanceof Joose.Managed.Attribute, "'res' attribute is a Joose.Managed.Attribute instance")    
    
    t.ok(advAttr.value == 'advanced', "Attribute has a correct initial value")    
    

    
    Class('TestClass', {
        
        does : TestRole
    })
    
    t.ok(TestClass.meta.hasAttribute('res'), "Attribute 'res' was consumed from Role")
    
    var advAttr1 = TestClass.meta.getAttribute('res')    
    
    t.ok(advAttr1 instanceof Joose.Managed.Attribute, "'res' attribute is advanced")    
    
    t.ok(advAttr1.value == 'advanced', "Attribute has a correct initial value")
    
    
    t.ok(TestClass.meta.hasMethod('getRes'), "Getter method was created")
    t.ok(TestClass.meta.hasMethod('setRes'), "Setter method was created")
    
})    

