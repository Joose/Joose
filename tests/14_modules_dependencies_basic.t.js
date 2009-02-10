(function (Class, Module, Role, Type, Prototype) {
return (function () {
var t = new Test.TAP.Class();
t.plan(5)

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
    
    use('BasicTest3', function(){
        self.ok(BasicTest3.meta.meta.isa(Joose.Class), 'Dynamic (in code context) basic dependencies loading passed');
    });
    
    
    Module("GMapLoader", {
        use : {
            //google loader
            url : 'http://www.google.com/jsapi?key=ABQIAAAAa2oCDn-vJ2FYnkpuhajy_BQ8NCDMUx9yLS_m39ZE2Zv5G19HFRS1GJOvVuFnjwGNLUSMM6CiGDlA7g'
        },
        
        body : function(){
            self.ok(google && google.load, "Google loader was loaded correctly")
        }
    });
        
    
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
    
}

return t;
})()
}).call(window, JooseClass, JooseModule, JooseRole, JooseType, JoosePrototype)
