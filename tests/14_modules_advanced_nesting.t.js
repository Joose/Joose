(function (Class, Module, Role, Type, Prototype) {
return (function () {
var t = new Test.TAP.Class();
t.plan(8)

var thistop = Test.prototype.top()

t.testModuleClass = function() {
    var self = this;

    //==================================================================================================================================================================================
    self.diag("Advanced nesting modules");
    
    Module("StressTest.Nested", {
        use : 'StressTest.Test035',
        body : function () {
            
            self.ok(StressTest.Nested, "Something in the nested module spot");
            self.ok(StressTest.Nested.meta.meta.isa(Joose.Kernel.Namespace), "And its a Joose.Kernel.Namespace");
            
            Module("Level1_1", {
                use : 'StressTest.Test050',
                
                body : function () {
                    Class("Level2_1", {
                        methods : {
                            three : function () { return 3 }
                        },
                        body : function (){
                            self.ok(new StressTest.Nested.Level1_1.Level2_1().three() == 3, "StressTest.Nested.Level1_1.Level2_1 works correctly #1");
                        }
                    })
                    self.ok(StressTest.Nested.Level1_1.Level2_1, "Something in the nested module spot, at level 2, #1");
                }
            });
            self.ok(StressTest.Nested.Level1_1, "Something in the nested module spot, at level 1, #1");
            
            Module("Level1_2", {
                use : 'StressTest.Test075',
                
                body : function () {
                    Class("Level2_2", {
                        methods : {
                            four : function () { return 4 }
                        },
                        body : function (){
                            self.ok(new StressTest.Nested.Level1_2.Level2_2().four() == 4, "StressTest.Nested.Level1_2.Level2_2 works correctly #2");
                        }
                    })
                    self.ok(StressTest.Nested.Level1_2.Level2_2, "Something in the nested module spot, at level 2, #2");
                }
            });
            self.ok(StressTest.Nested.Level1_2, "Something in the nested module spot, at level 1, #2");
        }
    })
    
}

return t;
})()
}).call(window, JooseClass, JooseModule, JooseRole, JooseType, JoosePrototype)
