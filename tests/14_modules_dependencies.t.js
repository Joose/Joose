(function (Class, Module, Role, Type, Prototype) {
return (function () {
var t = new Test.TAP.Class();
t.plan(3)

var thistop = Test.prototype.top()

t.testModuleClass = function() {
    var self = this;

    
    
    Module("StressTest");
    self.ok(StressTest, "Root module created");
    StressTest.doubleDeclarations = false;
    
    var copyOfStressTest = StressTest;
    Module("StressTest", {
	    use : 'StressTest.Test001',
        
        //body is executing after the all dependencies are satisfied
        body : function(){
            self.ok(!copyOfStressTest000.doubleDeclarations, "Stress testing passed without redeclarations");
            
            
            self.ok(copyOfStressTest000.Test001, "StressTest.Test001 class created");
            self.ok(new copyOfStressTest000.Test001().result() == 1, 'StressTest.Test001 can be instantiated');
        }
    });
}

return t;
})()
}).call(window, JooseClass, JooseModule, JooseRole, JooseType, JoosePrototype)
