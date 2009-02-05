(function (Class, Module, Role, Type, Prototype) {
return (function () {
var t = new Test.TAP.Class();
t.plan(12)

t.testMethodWrappers = function() {
    var self = this;
    self.diag("Method wrappers");
    
    Class("Level1", {
        has: {result: {init: ""}},
        methods: {
            add: function () { this.result += "1"; return this.result }
        }
    })
    
    var c = new Level1();
    
    self.ok(c.result == "", "Correctly initialized")
    self.ok(c.add() == "1", "Add works once")
    self.ok(c.add() == "11", "Add works twice")
    
    Class("Level1", {
        before: {
            add: function () { this.result += "2" }
        }
    })
    
    self.ok(c.add() == "1121", "Before wrapper works")
    
    Class("Level1", {
        before: {
            add: function () { this.result += "3" }
        }
    })
    
    self.ok(c.add() == "1121321", "Can apply multiple wrappers")
    
    Class("Level2", {
        isa: Level1,
        before: {
            add: function () { this.result += "4" }
        }
    })
    
    var l2 = new Level2();
    
    self.ok(l2.add() == "4321", "Before wrappers works on subclasses")
    
    Class("Level3", {
        isa: Level2,
        before: {
            add: function () { this.result += "5" }
        }
    })
    
    var l3 = new Level3();
    
    self.ok(l3.add() == "54321", "Before wrappers works on subclasses subclasses")
    
    Class("Level3", {    
        after: {
            add: function () { this.result += "6" }
        }
    })
    
    Class("Level3", {    
        after: {
            add: function () { this.result += "7" }
        }
    })
    
    l3.add()
    
    self.ok(l3.result == "543215432167", "After wrappers work");
    
    Class("Level3", {    
        around: {
            add: function (original) { this.result += "8"; original(); this.result += "9" }
        }
    })
    
    l3.add();
    
    self.ok(l3.result == "543215432167854321679", "Generic wrappers work");
    
    
    Class("S1", {
        has: {
            result1: {init: ""},
            result2: {init: ""}
        },
        methods: {
            one: function () { this.result1 += "1" },
            two: function () { this.result2 += "1" }
        }
    })
    
    Class("S2", {
        isa: S1,
        override: {
            one: function () { 
                this.result1 += "2"
                this.SUPER();
            },
            two: function () { 
                this.result2 += "2"
                this.SUPER();
            }
        }
    })
    
    Class("S3", {
        isa: S2,
        override: {
            two: function () { 
                this.result2 += "3"
                this.SUPER();
            }
        }
    })
    
    var o = new S3();
    
    o.one()
    
    self.ok(o.result1 == "21", "Overriding works")
    
    o.two()
    
    self.ok(o.result2 == "321", "Overriding works on the second level two")
    
    
    Class("HTMLDoc", {
        augment: {
            html: function () { return "<html>"+this.INNER()+"</html>" }
        }
    })
    
    
    
    Class("HTMLDocBody", {
        isa: HTMLDoc,
        augment: {
            html: function () { return "<head>"+this.head()+"</head><body>"+this.INNER()+"</body>" },
            head: function () { return "<title>"+this.INNER()+"</title>" }
        }
    })
    
    
    Class("TPSReport", {
        isa: HTMLDocBody,
        augment: {
            html: function () { return "<h1>TPS-Report</h1>" },
            head: function () { return "TPS-Report" }
        }
    })
    
    var tps = new TPSReport();
    var report = tps.html();
    self.ok(report == "<html><head><title>TPS-Report</title></head><body><h1>TPS-Report</h1></body></html>", "Augment method modifier works");
}

return t;
})()
}).call(window, JooseClass, JooseModule, JooseRole, JooseType, JoosePrototype)
