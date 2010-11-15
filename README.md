Name
====

Joose - A postmodern class system for JavaScript


SYNOPSIS
========

    Class('Person', {
        
        methods : {
            eat : function (food) {
                console.log('yummy')
                
                return 'yummy'
            }
        }
    })


    
    Class('Person.Tidy', {
        isa : Person,
        
        before : {
            eat : function (food) {
                this.washHands()
            }
        },
        
        after : {
            eat : function (food) {
                this.brushTeeth()
            }
        },
        
        methods : {
        
            washHands : function (food) {
                console.log('washing hands')
            },
            
            brushTeeth : function (food) {
                console.log('brushing teeth')
            },
            
            eat : function (food) {
                this.SUPER(food)
            }
        }
    })
    
    
    var person = new Person.Tidy()


DESCRIPTION
===========

Joose is a self-hosting meta object system for JavaScript with support for classes, inheritance, roles (aka traits), method modifiers and much more.

The main goal of Joose is to make JavaScript Object Oriented Programming easier, more consistent and less tedious. With Joose you can to think more about what you want to do and less about the mechanics of OOP.

The Joose framework has been successfully used in multiple production systems for twelve months now and has been proven to be very stable. 
Joose is being tested using an automated unit-test suite that is being run in all major browsers (Firefox, IE, Safari, Opera and Chrome).

Joose also fully supports NodeJS platform. 

Joose core package is only 8kb (YUI+gz).


INSTALLATION
============

From [npm](http://github.com/isaacs/npm/)

    [sudo] npm install joose 


For other options please refer to: <http://joose.github.com/Joose/doc/html/Joose/Manual/Installation.html>

DOCUMENTATION
=============

For documentation please refer to: <http://joose.github.com/Joose>


ACKNOWLEDGEMENTS
================

Many thanks to the whole Moose community for being icebreaker in the meta world. 

Special thanks to Dave Rolsky for the excellent Moose documentation, on which this document is based.


SEE ALSO
========

Web-site : <http://joose.it>

Mailing list: <http://groups.google.com/group/joose-js>

IRC channel : [#joose](http://webchat.freenode.net/?randomnick=1&channels=joose&prompt=1) on freenode

AUTHORS
=======

Malte Ubl 

Jeremy Wall

Nickolay Platonov



COPYRIGHT AND LICENSE
=====================

Copyright (c) 2008-2010, Malte Ubl, Nickolay Platonov

All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
* Neither the name of Malte Ubl nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission. 

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. 


Documentation is based on original Moose::Manual documentation, copyright 2006-2009 by Infinity Interactive, Inc.
