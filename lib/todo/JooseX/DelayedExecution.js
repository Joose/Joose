Module("JooseX", function () {
    
    /**
     * JooseX.DelayedExecution implements a type of mock object that implements the complete interface
     * of the class object given to its constructor.
     * Every method call will schedule the method call with all its arguments for
     * later execution on the original object.
     * 
     * This enables building asynchronous APIs that look like synchronous APIs.
     * 
     * Example:
     * 
     * This asynchronous code:
     * 
     * myFunc("foo", function (para) {
     *     para.anotherFunc(function (para) {
     *         para.yetAnotherFunc("bar")
     *     })
     * })
     * 
     * can be turned into:
     * 
     * myFunc("foo").anotherFunc().yetAnotherFunc("bar")
     * 
     * by changing myFunc into this:
     * 
     * myFunc = function (para, callback) {
     *     var result;
     *     var process = function (result) {
     *         delayed.__performOn(result)
     *        }
     *     ... do something in an async callback that sets the variable result
     *     return new JooseX.DelayedExecution(typeOfResult) // typeOfResult is the Joose class of the result object
     * }
     * Mind you that the code will still be executed asynchrounously.
     */
    
    Class("DelayedExecution", {
        
        has: {
            work: {
                
            }
        },
        
        methods: {
            
            // The initializer expects a Joose class or object
            // and will add methods for all methods of the given class to the new object.
            initialize: function (templateClassOrObject) {
                this.work = [];
                this.__mockClass(templateClassOrObject)
            },
            
            // Add a mock method to the class.
            // when called it will add its name and the call-arguments to the work instance variable
            __addDelayer: function (name) {
                var delay = this;
                this[name] = function () {
                    delay.work.push([name, arguments])
                    return delay;
                }
            },
            
            // Call the scheduled work on the target object. The return value of each method
            // call will be used as the next target
            __performOn: function (target) {
                var self = target;
                for(var i = 0; i < this.work.length; i++) {
                    var work  = this.work[i];
                    var name  = work[0];
                    var paras = work[1];
                    
                    // If the method has a name, we call the name as the method name on the object
                    if(name) {
                        self = self[name].apply(self, paras)
                    } 
                    // Otherwise the object actually is the method (function)
                    else {
                        self = self.apply(self, paras)
                    }
                }
            },
            
            // Add a delayer method for each instance method of obj
            __mockClass: function (obj) {
                var me      = this;
                var methods = obj.meta.getInstanceMethods();
                Joose.A.each(methods, function (method) {
                    var name = method.getName()
                    if(name != "initialize" && name != "toString") {
                        me.__addDelayer(name)
                    }
                })
            }
        }    
    })
})