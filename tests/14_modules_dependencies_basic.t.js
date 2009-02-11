(function (Class, Module, Role, Type, Prototype) {
return (function () {
var t = new Test.TAP.Class();
t.plan(9)

var thistop = Test.prototype.top()

t.testModuleClass = function() {
    var self = this;

    //==================================================================================================================================================================================
    self.diag("Basic testing of dependencies loading");
    Module("Basic", {
        use : 'BasicTest1',
        body : function(){
            self.ok(BasicTest1.meta.meta.isa(Joose.Class), 'Basic dependencies loading passed');
        }
    });
    
    //==================================================================================================================================================================================
    self.diag("Dynamic (in-code) dependency loading");
    use('BasicTest3', function(){
        self.ok(BasicTest3.meta.meta.isa(Joose.Class), 'Dynamic (in code context) basic dependencies loading passed');
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
    
    
    //==================================================================================================================================================================================
    self.diag("Transport switching & synchronous loading");
    
    Module("Testy2", {
        use : { Module : 'BasicTest5', transport : 'ajaxSync' }
    });
    
    self.ok(BasicTest5 && BasicTest5.meta.meta.isa(Joose.Class), "Class successfully loaded via switched transport - synchronously");
    self.ok(new BasicTest5().result() == 5, "And it work as expected");
    
    //==================================================================================================================================================================================
    self.diag("Non-Joose dependencies (no Namespace meta)");
    
    Module("Testy3", {
        use : { Module : 'BasicTest5', presence : function(){ return BasicTest5 } }
    });
    
    self.ok(BasicTest5 && BasicTest5.meta.meta.isa(Joose.Class), "Class successfully loaded via switched transport - synchronously");
    self.ok(new BasicTest5().result() == 5, "And it work as expected");
}

return t;
})()
}).call(window, JooseClass, JooseModule, JooseRole, JooseType, JoosePrototype)
