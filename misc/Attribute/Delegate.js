Role('Joose.Attribute.Delegate', {
    
    have : {
        handles : null
    },
    
    
    override : {
        
        eachDelegate : function (handles, func, scope) {
            if (typeof handles == 'string') return func.call(scope, handles, handles)
            
            if (handles instanceof Array)
                return Joose.A.each(handles, function (delegateTo) {
                    
                    func.call(scope, delegateTo, delegateTo)
                })
                
            if (handles === Object(handles))
                Joose.O.eachOwn(handles, function (delegateTo, handleAs) {
                    
                    func.call(scope, handleAs, delegateTo)
                })
        },
        
        
        getAccessorsFor : function (targetClass) {
            var targetMeta  = targetClass.meta
            var methods     = this.SUPER(targetClass)
            
            var me      = this
            
            this.eachDelegate(this.handles, function (handleAs, delegateTo) {
                
                if (!targetMeta.hasMethod(handleAs)) {
                    var handler = methods[ handleAs ] = function () {
                        var attrValue = me.getValueFrom(this)
                        
                        return attrValue[ delegateTo ].apply(attrValue, arguments)
                    }
                    
                    handler.ACCESSOR_FROM = me
                }
            })
            
            return methods
        },
        
        
        getAccessorsFrom : function (from) {
            var methods = this.SUPER(from)
            
            var me          = this
            var targetMeta  = from.meta
            
            this.eachDelegate(this.handles, function (handleAs) {
                
                var handler = targetMeta.getMethod(handleAs)
                
                if (handler && handler.value.ACCESSOR_FROM == me) methods.push(handleAs)
            })
            
            return methods
        }
    }
})

/**

Name
====


Joose.Attribute.Delegate - map a method to the method of the attribute 


SYNOPSIS
========

            Class('Some.Class', { 
                
                has : {
                
                    someAttr1 : {
                        handles : 'commonMethod'
                    },
                    
                    // or
                
                    someAttr2 : {
                        handles : [ 'commonMethod1', 'commonMethod2' ]
                    },
                    
                    // or
                    
                    someAttr3 : {
                        handles : {
                            classMethod : 'attributeMethod'
                        }
                    }
                }
            })
            
            var instance = new Some.Class()
            
            
            var a = instance.classMethod('foo', 'bar')
            var b = instance.commonMethod('bar', 'baz') 
            
            // eqivalent to

            var a = instance.someAttr3.attributeMethod('foo', 'bar')
            var b = instance.someAttr1.commonMethod('bar', 'baz')


WHAT IS DELEGATION?
===================

Delegation is a feature that lets you create "proxy" methods that do nothing more than call some other method on an attribute. 
This is quite handy since it lets you simplify a complex set of "has-a" relationships and present a single unified API from one class.

With delegation, consumers of a class don't need to know about all the objects it contains, reducing the amount of API they need to learn.

Delegations are defined as a mapping between one or more methods provided by the "real" class (the delegatee), and a set of corresponding methods in the delegating class. 
The delegating class can re-use the method names provided by the delegatee or provide its own names.


DEFINING A MAPPING
==================

In the simplest form mapping is a string, which corresponds to the proxy method name.

        has : {
            someAttr : 'method'
        }


Its possible to specify an array with the method names:

        has : {
            someAttr : {
                handles : [ 'method1', 'method2' ]
            }
        }

For each array entry, in the class consuming the attribute, will be created a proxy method. This method will delegate to the method of the attribute with the same name.

Its possible to rename methods during mapping, supplying the mapping value as object:
  
        has : {
            someAttr : {
            
                handles : {
                    proxyMethod : 'methodOfTheAttribute'
                }
            }
        }


SEE ALSO
========

[Main documentation page](../Attribute.html)



AUTHORS
=======

Nickolay Platonov <nplatonov@cpan.org>



COPYRIGHT AND LICENSE
=====================

Copyright (c) 2009, Nickolay Platonov

All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
* Neither the name of Nickolay Platonov nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission. 

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. 


*/