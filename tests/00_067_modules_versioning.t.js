(function () {
var t = new Test.TAP.Class();
t.plan(6)

var thistop = Test.prototype.top()

t.testModuleClass = function() {
    var self = this;

    //==================================================================================================================================================================================
    self.diag("Versioning");
    
    self.skip(typeof Joose.Namespace.Depended != 'function', "Depended Role not included", 2, function(){
    
        Module("StressTest.Versioning", {
            use : { Module : 'StressTest.Test035', version : 0.05 },
//            use : [ 'StressTest.Test035' ],
            body : function () {
                
                self.ok(StressTest.Versioning, "Something in the Versioning module spot");
                
                self.ok(StressTest.Test035, "StressTest.Test035 module created");
                self.ok(StressTest.Test035.meta.constructor == Joose.MetaClass, "StressTest.Test035 class created");
                self.ok(StressTest.Test035.meta.hasMethod('result'), "StressTest.Test035 has method 'result'");
                self.ok(new (StressTest.Test035)().result() == 35, "StressTest.Test035 can be instantiated");
                
                self.ok(true, "StressTest.Test035 has higher version than required");
                
                //TODO Global exceptions intercepting
                //self.throws_ok(function(){
    //                Module("Level1_1", {
    //                    use : { Module : 'StressTest.Test050', version : 1.01 },
    //                    
    //                    body : function () {
    //                        Class("Level2_1", {
    //                            methods : {
    //                                three : function () { return 3 }
    //                            },
    //                            body : function (){
    //                                self.ok(new StressTest.Nested.Level1_1.Level2_1().three() == 3, "StressTest.Nested.Level1_1.Level2_1 works correctly #1");
    //                            }
    //                        })
    //                        self.ok(StressTest.Nested.Level1_1.Level2_1, "Something in the nested module spot, at level 2, #1");
    //                    }
    //                });
                //TODO Global exceptions intercepting
                //}, 'Loaded dependency StressTest.Test050 has lower version [0.1] than required [1.01]', 'StressTest.Test050 has lower version than required');
    //            self.ok(!StressTest.Versioning.Level1_1.meta.meta.isa(Joose.Class), "There is no class in the StressTest.Versioning.Level1_1 module spot");
            }
        })
    });
    
}

return t;
})()