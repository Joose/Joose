StartTest(function (t) {
    
    t.plan(4)
    
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
    
})    

