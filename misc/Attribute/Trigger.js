Role('Joose.Attribute.Trigger', {

    have : {
        trigger        : null
    },


    after : {
        initialize : function() {
            if (this.trigger) {
                if (!this.writeable) throw new Error("Can't use `trigger` for read-only attributes")

                this.hasSetter = true
            }
        }
    },


    override : {

        getSetter : function() {
            var original    = this.SUPER()
            var trigger     = this.trigger

            if (!trigger) return original

            var me      = this
            var init    = Joose.O.isFunction(me.init) ? null : me.init

            return function () {
                var oldValue    = me.hasValue(this) ? me.getValueFrom(this) : init

                var res         = original.apply(this, arguments)

                trigger.call(this, me.getValueFrom(this), oldValue)

                return res
            }
        }
    }
})


/**

Name
====


Joose.Attribute.Trigger - call a function after attribute has been changed via setter call


SYNOPSIS
========

            Class('Some.Class', {
                has : {
                    someAttribuute : {
                        init : 'foo',

                        trigger : function (newValue, oldValue) {
                            this.triggerCalled = true
                        }
                    }
                }
            })

            var instance = new Some.Class()

            instance.triggerCalled == false //trigger wasn't called yet

            instance.setSomeAttibute('bar')

            instance.triggerCalled == true //trigger was called


DESCRIPTION
===========

`Joose.Attribute.Trigger` is a role, which triggers a function call, after an attribute was changed via setter call.

It is called as a method (in the scope of the instance), and receives the new value as 1st argument, and old value as 2nd.

Trigger is also called when an attribute's value is passed to the constructor.

**Note**, that trigger will not be called for the value of attribute's `init` option, as it only translates the value to the prototype of the class


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