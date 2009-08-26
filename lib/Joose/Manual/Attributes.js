/**

NAME
====

Joose.Manual.Attributes - Object attributes with Joose


INTRODUCTION
============

Joose attributes may have many properties, and attributes are probably the one of the most powerful and flexible part of Joose. 
You can create a powerful class simply by declaring attributes. In fact, it's possible to have classes that consist solely of attribute declarations.

An attribute is a property that every member of a class has. For example, we might say that "every Person object has a first name and last name". Attributes can be optional, so that we can say "some Person objects have a social security number (and some don't)".

At its simplest, an attribute can be thought of as a named value (as in a hash) that can be read and set. However, attributes can also have defaults, type constraints, delegation and much more.

In other languages, attributes are also referred to as slots or properties.

However, all the "attributes magic" is often skipped by beginners, as its generally an advanced topic. Thats why its provided outside of the core, as JooseX.Attribute extension. In this document we'll cover only the base capabilities of attributes, which are included in the core.


BASIC ATTRIBUTE OPTIONS
=======================

The simplest attribute in Joose can be constructed with *have* builder:

        Class('Person', {
            have : {
                firstName : 'John Doe'
            }
        })

This says that all Person objects have an "first_name" attribute, which has a default value 'John Doe'. Default value will be installed directly to the class's prototype without any modifications. Thats all, no other features. This type of attribute is used primarily in the Joose internals and low-level extensions.


ADVANCED ATTRIBUTE OPTIONS
==========================

The advanced attribute in Joose can be constructed with *has* builder:

        Class('User', {
            isa : Person,
    
            has : {
                username : { is : 'rw', init : 'root' }
            }
        })


The options passed to *has* define the properties of the attribute. There can be many options (provided in the extension packages), but in the simplest form you just need to set *is*, which can be either 'rw' (read-write) or 'ro' (read-only). 
When an attribute is 'rw', you can change it by passing a value to its *accessor*. When an attribute is 'ro', you may only read the current value of the attribute.

Accessor methods
----------------

Each attribute has one or more accessor methods. An accessors lets you read or write the value of that attribute for an object.

By default, the read accessor method has the name 'getAttributeName', where the 'AttributeName' is the name of attribute with uppercased first letter.
Write accessor has the name 'setAttributeName'. If you declared your attribute as 'ro' then it will have only read accessor. If you declared it read-write, you get both read-write accessors. Simple.

Given our User example above, we now have a 'getUsername/setUsername' accessors that can read/write User object's username attribute's value:

        var user = new User()
    
        user.setUsername('dba')
    
        if (user.getUsername() == 'dba') { ... }

Class can provide custom implementation of the accessor methods, they will not be overriden by attributes.


Default value
----------------------------------

To specify the default value for the attribute use *init* property. In the example above 'username' attribute will be initialized with default value 'root'. 

        Class('User', {
            isa : Person,
    
            has : {
                lastLogin : { is : 'rw', init : function () { return new Date() } }
            }
        })

If you'll provide a function as the value for *init*, it will be called during initialization with the following signature:
**func(attributeName, config)**, where **config** is the 1st argument passed to constructor. Function will be called as class's method (in the instance's scope).



Simplified form. Attribute helpers
----------------------------------

Advanced attributes also allows a simplified form, when the attribute's properties object is provided as an atomic value (string or number for example).
In this case, this value is treated as value of 'init' property, value of 'is' remains 'undefined'.

The following examples are equivalent:

        Class('User', {
            isa : Person,
    
            has : {
                password : { init : '12345' },
                lastLogin : { init : function () { return new Date() } }
            }
        })
    
        ...
    
        Class('User', {
            isa : Person,
    
            has : {
                password : '12345',
                lastLogin : function () { return new Date() }
            }
        })
    
        ...
    
        Class('User', {
            isa : Person,
    
            has : {
                password : '12345',
                lastLogin : Joose.Now
            }
        })

The 'Joose.Now' construct in the last example is an *attribute helper* - a simple function, which return a certain initializing value.

Joose provides following attribute helpers:

- Joose.Array - return empty array
- Joose.Object- return empty oject
- Joose.Function - return empty function 
- Joose.Now - return current timestamp

Required or not?
----------------

By default, all attributes are optional, and do not need to be provided at object construction time. If you want to make an attribute required, simply set the required option to true:

        has : {
            username : { is : 'rw', init : 'root', required : true }
        }

There is a caveat worth mentioning in regards to what "required" actually means.

Basically, all it says is that this attribute ('username') must be provided to the constructor. It does not say anything about its value, so it could be 'null' or 'undefined'.


Custom Metaclass 
--------------------

One of Joose's best features is that it can be extended in all sorts of ways through the use of custom metaclasses.

When declaring an attribute, you can change its default metaclass with the 'meta' property:

        has : {
            password : {
                meta : JooseX.Attribute.Hashed,
                init : '12345',
                hashType : 'SHA-1',
                salt : 'custom_metaclass'
            }
        }

In this case, the 'password' attribute will be created using JooseX.Attribute.Hashed metaclss, which probably will provide a special setter method, which replace the actual attribute value with its hashed version.

There are a number of JooseX modules on JSAN which provide useful attribute metaclasses. See [Joose.Manual.JooseX][1] for some examples. You can also write your own metaclasses. 
See the "Meta" and "Extending" recipes in [Joose.Cookbook][2] for examples.


ATTRIBUTE INHERITANCE
=====================

A child class inherits all of its parent class attributes. Surely, you can override some of the inherited attribute in the child class.

To override an attribute, you simply re-declare it with desired properties.

MORE ON ATTRIBUTES
==================

Joose attributes are a big topic, and this document glosses over a few aspects. We recommend that you read the [JooseX.Attribute][3] documentation as further reading.

AUTHOR
======

Nickolay Platonov [nickolay8@gmail.com](mailto:nickolay8@gmail.com)

Heavily based on the original content of Moose::Manual, by Dave Rolsky [autarch@urth.org](mailto:autarch@urth.org)


COPYRIGHT AND LICENSE
=====================

Copyright (c) 2008-2009, Malte Ubl, Nickolay Platonov

All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
* Neither the name of Malte Ubl nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission. 

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. 

[1]: [Joose.Manual.JooseX][1]
[2]: [Joose.Cookbook][2]
[3]: [JooseX.Attribute][3]

*/
