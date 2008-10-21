(function() {
var t = new Test.TAP.Class();
t.plan(12)

t.testGearsSupport = function() {
    var self = this;
    self.diag("Testing Gears Support")
    
    Joose.Gears.setupGearsCompat()
    
    Class("HardWork", {
        meta: Joose.Gears,
        has: {
            data: {is: rw, init: {}}
        },
        methods: {
            onDoWork: function (ret) {
                var result   = ret[0];
                var expected = ret[1];
                self.ok(result == expected, "Gear Worker returns correct result: "+result)
            },
            
            onIdentityPlusX: function (ret) {
                self.ok(ret.ret.test[0].para == "abc", "Complex structure made a round trip")
            },
            
            onEndTests: function () {
                endTests()
            },
            
            onTimeout: function (ret) {
                self.ok(ret == 2, "Timeout initialized")
            },
            
            afterTimeout: function (ret) {
                self.ok(ret == 1, "Timeout passed")
            },
            onGearsTest: function (bool) {
                if(bool == true) {
                    self.ok(true, "Gears is installed")
                }
                else if(bool == false) {
                    self.ok(true, "Gears is not installed")
                }
                else {
                    self.ok(false, "Error testing for gears")
                }
            },
            
            dataReceived: function (ret) {
                self.ok(ret.orig.length > 0, "Received text");
                self.ok(ret.orig.indexOf("this is just a string") != -1, "...text includes correct string")
                self.ok(ret.parsed, "We received parsed JSON")
                self.ok(ret.parsed.test == "this is just a string", "JSON parse was successful")
            },
            
            customReturn: function (ret) {
                self.ok(ret, "Custom Return function is called")
            }
        },
        workers: {
            doWork: function (start, result) { // we pass the expected result so we can test the result asynchronously
                var counter = start;
                for(var i = 0; i < 1000; i++) {
                    counter++
                }
                return [counter, result]
            },
            
            identityPlusX: function (para) {
                return {
                    ret: para
                }
            },
            
            timeout: function () {
                var me = this;
                timer.setTimeout(function () { me.sendReturn(1, "afterTimeout") }, 1000);
                return 2
            },
            
            customReturnTest: function () {
                this.sendReturn(true, "customReturn")
            },
    
            gearsTest: function () {
                return this.clientHasGears()
            },
            
            requestTest: function () {
                var me = this;
                this.ajaxRequest("GET", "example.json", function (text) {
                    var ret = {
                        orig: text,
                        parsed: JSON.parse(text)
                    };
                    
                    me.sendReturn(ret, "dataReceived")
                })
            },
            
            endTests: function () {}
        }
    })
    
    var gt = new HardWork();
    
    //alert("Gears")
    
    self.ok(gt.data, "Data member is here")
    
    gt.gearsTest()
    gt.customReturnTest()
    
    gt.doWork(1, 1001)
    gt.doWork(2, 1002)
    gt.doWork(3, 1003)
    gt.doWork(4, 1004)
    
    gt.identityPlusX({test: [{para: 'abc', test: null}, [[[{ foo: 'bar' }]]]]})
    gt.identityPlusX({test: [{para: 'abc'               }, [[[{ foo: 'bar' }]]]]})
    gt.identityPlusX({test: [{para: 'abc', test: "para2"}, [[[]]]]})
    
    gt.timeout();
    
    // only works when run through a web server due to security limitations with the file protocol
    //gt.requestTest()
}

return t;
})()
