(function (Class, Module, Role, Type, Prototype) {
return (function () {
var t = new Test.TAP.Class();
t.plan(1)

var thistop = Test.prototype.top()

t.testModuleClass = function() {
    var self = this;

    //==================================================================================================================================================================================
    self.diag("Basic testing of dependencies loading");
    Module("Basic", {
        use : 'OnLoadTest1',
        body : function(){
            self.ok(OnLoadTest1.meta.meta.isa(Joose.Class), 'Basic dependencies loading passed');
        }
    });
    
}

return t;
})()
}).call(window, JooseClass, JooseModule, JooseRole, JooseType, JoosePrototype)
