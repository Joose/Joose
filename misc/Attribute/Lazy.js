Role('Joose.Attribute.Lazy', {


    have : {
        lazy        : null
    },


    before : {
        computeValue : function () {
            if (typeof this.init == 'function' && this.lazy) {
                this.lazy = this.init
                delete this.init
            }
        }
    },


    after : {
        initialize : function () {
            if (this.lazy) this.readable = this.hasGetter = true
        }
    },


    override : {

        getGetter : function () {
            var original    = this.SUPER()
            var lazy        = this.lazy

            if (!lazy) return original

            var me      = this

            return function () {
                if (!me.hasValue(this)) {
                    var initializer = typeof lazy == 'function' ? lazy : this[ lazy.replace(/^this\./, '') ]

                    me.setValueTo(this, initializer.call(this, me))
                }

                return original.call(this)
            }
        }
    }
})


/**

Name
====


Joose.Attribute.Lazy - a role, deferring the attribute initialization untill first call to getter


SYNOPSIS
========

            Class('Some.Class', {
                has : {
                    lazyAttribute : {
                        init : function () {
                            return this.someCostlyComputation()
                        },

                        lazy : true
                    },

                    // -or-

                    lazyAttribute : {
                        lazy : function () {
                            return this.someCostlyComputation()
                        }
                    },

                    // -or-

                    lazyAttribute : {
                        lazy : 'this.someCostlyComputation'
                    },

                    // -or-

                    lazyAttribute : {
                        lazy : 'someCostlyComputation'
                    }
                },


                methods : {
                    someCostlyComputation : function () {
                        ...
                    }
                }
            })

            var instance = new Some.Class()

            instance.lazyAttribute == undefined // true, initializer of lazy attribute wasn't called yet

            var lazy = instance.getLazyAttibute()

            instance.lazyAttribute != undefined // true, initializer of lazy attribute was called


DESCRIPTION
===========

Joose lets you defer attribute population by making an attribute lazy (see the [Synopsis][] for syntax)

When `lazy` flag is set, the default is not generated until the getter method is called, rather than at object construction time.
There are several reasons you might choose to do this.

First, if the default value for this attribute depends on some other attributes, then the attribute must be lazy.
During object construction, defaults are not generated in a predictable order, so you cannot count on some other attribute being populated when generating a default.

Second, there's often no reason to calculate a default before it's needed. Making an attribute lazy lets you defer the cost until the attribute is needed.
If the attribute is never needed, you save some CPU time.


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
