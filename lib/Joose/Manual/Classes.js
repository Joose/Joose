/**

NAME
====

Joose.Manual.Classes - Making your classes use Joose (and subclassing)

USING Joose
-----------

Using Joose is very simple, just include the appropriate files in your page (see the [Joose.Manual.Installation][1] section) a type:


    Class('Person', {
    })


That's it, you've made a class with Joose!

There's actually a lot going on here under the hood, so let's step through it.

When you constructing a class with Joose, a properties of 2nd argument passed to 'Class' call are called *builders*. These include things like has, isa, does and more. These builders are what you use to define your class. For example, you might define an attribute ...

    Class('Person', {
        has : {
            firstName : { is : 'rw' }
        }
    })

Attributes are described in the [Joose.Manual.Attributes][2] documentation.


When you use Joose, your class will become a subclass of Joose.Proto.Object. The Joose.Proto.Object class provides a default constructor and a number of additional methods. You can read more about this in the [Joose.Manual.Construction][3] document.

<As a convenience, Joose creates a new class type for your class. See the Joose.Manual.Types document to learn more about types.>

It also creates instance of Joose.Meta.Class for your class. This metaclass instance is now available as a meta property on your class, for example: **Person.meta**.

The metaclass object provides an introspection API for your class. It is also used by Joose itself under the hood to add attributes, compose roles, and so on. In fact, all of Joose's sugar does the real work by calling methods on this metaclass object (and other meta API objects).


SUBCLASSING
===========

Joose provides a simple builder for declaring your parent class: **isa**

    Class('User', {
        isa : Person,

        has : {
            userName : { is : 'rw' }
        }
    })

Note that Joose allows a single parent class only.


AUTHOR
======

Nickolay Platonov <nickolay8@gmail.com>

Heavily based on the original content of Moose::Manual, by Dave Rolsky <autarch@urth.org>


COPYRIGHT AND LICENSE
=====================

Copyright (c) 2008, Malte Ubl

All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
* Neither the name of Malte Ubl nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission. 

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. 

[1]: ./Installation.html
[Joose.Manual.Attributes][2]
[Joose.Manual.Construction][3]

*/
