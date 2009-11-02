StartTest(function (t) {
    
    t.plan(3)
    
    //==================================================================================================================================================================================
    t.diag("Initialization of advanced attributes in subclasses of Joose.Meta.Class")
    
    
    //==================================================================================================================================================================================
    t.diag("Creation")
    
    
    Class('TestMeta', {
        
        meta : Joose.Meta.Class,
        
        isa : Joose.Meta.Class,
        
        has : {
            attr         : { 
                is : 'rw', 
                init : function () {
                    return '123'
                } 
            }
        }
    })
    
    t.ok(TestMeta, "'TestMeta' class was created")
    
    t.ok(TestMeta.meta.hasAttribute('attr'), "'Test' class has 'attr' attribute")
    
    
    //==================================================================================================================================================================================
    t.diag("Instantiation")
    
    var testMeta = new TestMeta('NewClass', {})
    
    t.ok(testMeta.attr == '123', "Attribute 'attr' was correctly initialized")
    
})    

