(function () {
var t = new Test.TAP.Class();
t.plan(319)

var thistop = Test.prototype.top()

t.testModuleClass = function() {
    var self = this;
    
    self.skip(typeof JooseX.Namespace.Depended != 'function', "Depended Role not included", 319, function(){
    	
//    	if (console) console.profile();

        Module("StressTest");
        self.ok(StressTest, "Root module created");
        __global__.doubleDeclarations = false;
        __global__.unSatisfiedDeps = false;
        //==================================================================================================================================================================================
        self.diag("Stress testing of dependencies loading");
    
        var start      = new Date();
        Module("StressTest", {
            use : 'StressTest.Test001',
            
            //body is executing after the all dependencies are satisfied
            body : function(){
                var end   = new Date();
                
                self.diag("Duration = " + (end.getTime() - start.getTime()) / 1000);
                
                self.ok(!__global__.doubleDeclarations, "Stress testing passed without redeclarations");
                self.ok(!__global__.unSatisfiedDeps, "Stress testing passed with all dependencies satisfied");
                
                for (var i = 1; i <= 100; i++) {
                    var class_name = new String(i).split('');
                    while (class_name.length < 3) class_name.unshift('0');
                    class_name = 'Test' + class_name.join('');
                    
                    if (typeof StressTest[class_name] == 'function') {
                        self.ok(StressTest[class_name], "StressTest." + class_name + " module created");
                        self.ok(StressTest[class_name].meta.constructor == Joose.MetaClass, "StressTest." + class_name + " class created");
                        self.ok(StressTest[class_name].meta.hasMethod('result'), "StressTest." + class_name + " has method 'result'");
                        self.ok(new (StressTest[class_name])().result() == i, "StressTest." + class_name + " can be instantiated");
                    }
                }
                
//                if (console) console.profileEnd();
            }
        });
        
    });
}

return t;
})()