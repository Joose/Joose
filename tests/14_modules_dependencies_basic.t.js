(function (Class, Module, Role, Type, Prototype) {
return (function () {
var t = new Test.TAP.Class();
t.plan(15)

var thistop = Test.prototype.top()

t.testModuleClass = function() {
    var self = this;
    
    self.skip(typeof Joose.Kernel.MetaClass.Depended != 'function', "Depended Role not included", 15, function(){

        //==================================================================================================================================================================================
        self.diag("Basic testing of dependencies loading");
        
        Module("Basic", {
            use : [ 'BasicTest1', 'BasicTest2' ],
            body : function(){
                self.ok(BasicTest1.meta.meta.isa(Joose.Class), 'Basic dependencies loading passed #1-1');
                self.ok(new BasicTest1().result() == 1, "And it work as expected #1-2");
                
                self.ok(BasicTest2.meta.meta.isa(Joose.Class), 'Basic dependencies loading passed #2-1');
                self.ok(new BasicTest2().result() == 2, "And it work as expected #2-2");
            }
        });
        
        //==================================================================================================================================================================================
        self.diag("Dynamic (in-code) dependency loading");
        use('BasicTest3', function(){
            self.ok(BasicTest3.meta.meta.isa(Joose.Class), 'Dynamic (in code context) basic dependencies loading passed');
            self.ok(new BasicTest3().result() == 3, 'Dynamic (in code context) basic dependencies loading passed #2');
        });
        
        
        //==================================================================================================================================================================================
        self.diag("Loading from external url");
        Module("GMapLoader", {
            use : {
                //google loader
                url : 'http://www.google.com/jsapi?key=ABQIAAAAa2oCDn-vJ2FYnkpuhajy_BQ8NCDMUx9yLS_m39ZE2Zv5G19HFRS1GJOvVuFnjwGNLUSMM6CiGDlA7g'
            },
            
            body : function(){
                self.ok(google && google.load, "Google loader was loaded correctly")
            }
        });
            
        
        //==================================================================================================================================================================================
        self.diag("Controllbale ready-ness of Module");
        
        var bodyCalled = false;
        
        Module("GMapEngine", {
            
            use : 'GMapLoader',
            
            BEGIN : function(ready){
                self.ok(!bodyCalled, 'BEGIN called before body');
                
                google.load('maps','2',{
                    language : 'ru',
                    callback : ready
                });
            },
            
            body : function() {
                bodyCalled = true;
                self.ok(google.maps && google.maps.Map2, "Google Maps engine was loaded correctly")
            }
        });
        
        //==================================================================================================================================================================================
        self.diag("List of searchable paths (@INC)");
    
        Module("Testy", {
            use : 'BasicTest4',
            
            body : function(){
                self.ok(BasicTest4 && BasicTest4.meta.meta.isa(Joose.Class), "Class successfully loaded from secondary libroot");
                self.ok(new BasicTest4().result() == 4, "And it work as expected");
            }
        });
        
        
    //    self.skip(__JOOSE_LIBRARIAN_ENABLED__,"Librarian handles all files asynchronously", 2, function(){
    //    
    //        //==================================================================================================================================================================================
    //        self.diag("Transport switching & synchronous loading");
    //        
    //        Module("Testy2", {
    //            use : { Module : 'BasicTest5', transport : 'ajaxSync' }
    //        });
    //        
    //        self.ok(BasicTest5 && BasicTest5.meta.meta.isa(Joose.Class), "Class successfully loaded via switched transport");
    //        self.ok(new BasicTest5().result() == 5, "And it work as expected");
    //    });
    
        
        //==================================================================================================================================================================================
        self.diag("Non-Joose dependency");
        
        __global__.nonJooseDoubleDeclared = false;
        
        
        Module("Testy3", {
            use : 'ext://BasicTest6',
            
            body : function(){
                self.ok(!__global__.nonJooseDoubleDeclared, "Non-Joose dependencies are not loading twicely");
                self.ok(BasicTest6, "Non-Joose dependency was succesfully loaded");
                self.ok(new BasicTest6().result() == 6, "And it work as expected");
                
                Module("Testy4", {
                    use : 'ext://BasicTest6',
                    
                    body : function(){
                        self.ok(!__global__.nonJooseDoubleDeclared, "Non-Joose dependencies are not loading twicely #2");
                    }
                });
            }
        });
        
    });
}

return t;
})()
}).call(window, JooseClass, JooseModule, JooseRole, JooseType, JoosePrototype)
