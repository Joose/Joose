StartTest(function (t) {
    
    t.plan(8)
    
    //==================================================================================================================================================================================
    t.diag("Joose.A.*")
    
    
    var counter = 0
    
    Joose.A.each([ 1, 2, 3, 4, 5 ], function (value) {
        
        t.ok(value == ++counter, 'Joose.A.each works as expected')
    })
    

    
    counter = 0
    
    Joose.A.each([ 1, 2, 3, 4, 5 ], function (value) {
        
        counter++
        
        if (value == 3) return false
    })
    
    t.ok(counter == 3, "Joose.A.each can be stopped by returning a 'false' value")
    
    
    
    var res = Joose.A.map([ 1, 2 ], function (value) {
        
        return value + 1
    })
    
    
    t.ok(res[0] == 2, "Joose.A.map works as expected #1")
    t.ok(res[1] == 3, "Joose.A.map works as expected #2")
    
    
})