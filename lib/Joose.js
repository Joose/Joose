Joose = function(){ throw "Modules may not be instantiated." }

Joose.top = this

// Static helpers for Arrays
Joose.A = {

    each : function (array, func, scope) {
        for (var i = 0, len = array.length; i < len; i++) func.call(scope || this, array[i], i)
    },
    
    exists : function (array, value) {
        for (var i = 0, len = array.length; i < len; i++) if (array[i] == value) return true
        	
        return false
    },
    
    concat : function (source, array) {
        source.push.apply(source, array)
        return source
    },
    
    grep : function (array, func) {
        var a = []
        Joose.A.each(array, function (t) {
            if (func(t)) a.push(t)
        })
        return a
    },
    
    remove : function (array, removeEle) {
        var a = []
        Joose.A.each(array, function (t) {
            if (t !== removeEle) a.push(t)
        })
        return a
    }
    
}

// Static helpers for Strings
Joose.S = {
	
	saneSplit : function(str, delimeter) {
        var res = (str || '').split(delimeter)
        if (res.length == 1 && !res[0]) res.shift()
        
        return res
	},
	

    uppercaseFirst : function (string) { 
        return string.substr(0, 1).toUpperCase() + string.substr(1, string.length - 1)
    }
    
}


// Static helpers for objects
Joose.O = {

    each : function (object, func, scope) {
        for(var i in object) func.call(scope || this, object[i], i)
        
        if (Joose.is_IE) {
            Joose.A.each([ 'toString', 'constructor', 'hasOwnProperty' ], function(el){
                if (object.hasOwnProperty(el)) func.call(scope || this, object[el], el); 
            })
        } 
    },
    
    
    eachSafe : function (object, func, scope) {
        Joose.O.each(object, function(value, name){
            if (object.hasOwnProperty(name)) func.call(scope || this, value, name)
        }, scope)
    },
    
    
    copy : function (source, target) {
        target = target || {}
        
        Joose.O.each(source, function (value, name) { target[name] = value })
        return target
    },
    
    
    copySafe : function (source, target) {
        Joose.O.eachSafe(source, function (value, name) { target[name] = value })
        return target
    },
    
    
    getMutableCopy : function (object) {
        var f = function(){}
        f.prototype = object
        return new f()
    },
    
    
    extend : function (target, source) {
        return Joose.O.copy(source, target)
    },
    
    
    isEmpty : function (object) {
		for (var i in object) if (object.hasOwnProperty(i)) return false
		
		return true
    },
    
    
    isInstance: function(obj) {
        return obj && obj.meta && obj.constructor == obj.meta.c
    },
    
    
    wantArray : function (obj) {
        if (obj instanceof Array) return obj
        
        return [ obj ]
    }
}


Joose.Array = function () { return [] }
Joose.Object = function () { return {} }
Joose.Function = function () { return Joose.Function }


//XXX needs to be checked for IE8
try {
    Joose.is_IE = /msie/i.test(navigator.userAgent) && !/opera/i.test(navigator.userAgent)
} catch (e) {
    Joose.is_IE = false
}


/**

Name
====

Joose - A postmodern object system for JavaScript


SYNOPSIS
========

    Class("Point", {
    
        has: {
            x: {is: "ro"},
            y: {is: "rw"},
        },
        
        methods: {
            clear: function () {
                this.x = 0
                this.setY(0)
            }
        }
    })
    
    Class("Point.ThreeD", {
    
        isa: Point,
        
        has: {
            z: {}
        },
        
        after: {
            clear: function () {
                this.z = 0
            }
        }
    })
    
    var point = new Point.ThreeD()


DESCRIPTION
===========

Joose is a self-hosting meta object system for JavaScript with support for classes, inheritance, roles (aka traits), method modifiers and much more.

Joose makes object-oriented programming with JavaScript easy, declarative and very productive. The Joose meta-object system is multi-paradigm. 
It supports class-based and prototype-based programming styles as well as class-based inheritance and role-based extention.

The Joose framework has been successfully used in multiple production systems for twelve months now and has been proven to be very stable. 
Joose is being tested using an automated unit-test suite that is being run in all major browsers (Firefox, IE, Safari, Opera and Chrome).


New to Joose?
-------------

If you're new to Joose, the best place to start is the [Joose.Manual][1] docs, followed by the [Joose.Cookbook][2]. The intro will show you what Joose is, and how it makes JavaScript OO better.

The cookbook recipes on Joose basics will get you up to speed with many of Joose's features quickly. Once you have an idea of what Joose can do, you can use the API documentation to get more detail on features which interest you.

Joose Extensions
----------------

The JooseX. namespace is the official place to find Joose extensions. These extensions can be found on the [JSAN][3].

 
BUILDING CLASSES WITH JOOSE
===========================

Joose makes every attempt to provide as much convenience as possible during class construction/definition, but still stay out of your way if you want it to. Here are a few items to note when building classes with Joose.

Unless specified with 'isa', any class which uses Joose will inherit from Joose.Proto.Object.

Joose will also manage all attributes (including inherited ones) that are defined with 'has' or 'have'. And (assuming you call new, which is inherited from Joose.Proto.Object) this includes properly initializing all instance slots, setting defaults where appropriate.


PROVIDED METHODS
================

Joose provides a number of methods to all your classes, mostly through the inheritance from Joose.Proto.Object.

  - this.SUPER(arg1, arg2, ...)

Only valid in the scope of usual methods and OVERRIDE method modifiers. Calls a superclass's method with the arguments provided.

  - this.SUPERARG(Array arg)

Only valid in the scope of usual methods and OVERRIDE method modifiers. Calls a superclass's method with the "packed" arguments, provided as array. Usually used as: this.SUPERARG(arguments)

  - this.initialize()

Default 'initialize' method is empty function.

  - this.toString()

Defalt string coercion is string "a ClassName", where ClassName is a name of instance's class.
 
  - this.detach()

Detaches the instance from its class. See more details [here][!!]

  - this.attach()

Attaches the instance back to its class. See more details [here][!!]

  - this.isDetached()

Returns boolean value, indicating whether this instance is detached from its class.


PROVIDED PROPERTIES
===================

Instance properties
-------------------

Joose provides a number of properties to all instances of your classes.

  - this.constructor

A class with which 'this' instance were constructed.

  - this.meta

An instance of metaclass for 'this' instance's class. 


Class properties
----------------

Joose also provides a number of properties to classes.

  - class.meta

An instance of metaclass for 'this' instance's class. The same as 'this.meta' for instances of **class**

  - class.my

A built-in singleton instance. See [Joose.Manual.Singleton Pattern][!!] for more details.

    
PROVIDED HELPERS METHODS
========================

Joose provides a number of small helpers methods, which you might found useful. 

Helpers for Arrays
------------------

  - Joose.A.each(array, func, scope)

Calls a **func** in the optional **scope** for each element of **array** as: func(element, index), where 'index' is the index of element in the array

  - Joose.A.exists(array, value)

Returns boolean value, indicating whether this **value** is exists in the **array**.
    
  - Joose.A.concat(source, array)

Safely concat the **source** array with the **array**, which is sometimes required to correctly handle the 'arguments' object.

  - Joose.A.grep(array, func) {

Calls the **func** for each element of **array** and returns an array, consisted from only those elements, for which it returns 'true' value

  - Joose.A.remove(array, removeEle) {

Returns a "shallow" copy of **array**, without the all the occurrences of **removeEle** (if any). Do not modifies original **array**.
    

Helpers for Strings
------------------

  - Joose.S.saneSplit(str, delimeter)

Implements a perl-like 'split', which returns empty array for splitting empty string (not an array with an empty string). Behave as standard 'String.prototype.split' in other aspects.

  - Joose.S.uppercaseFirst(string)

Returns a new string, with uppercased first letter.
    

Helpers for Objects
------------------

  - Joose.O.each(object, func, scope)

Calls a **func** in the optional **scope** for each property of the **object** (*including* inherited via prototype chain). 
**func** is called as: func(*value*, *name*), where *value* is the value of the *name* property of **object**.


  - Joose.O.eachSafe(object, func, scope)

Calls a **func** in the optional **scope** for each property of the **object** (*excluding* inherited via prototype chain). 
**func** is called as: func(*value*, *name*), where *value* is the value of the *name* property of **object**.
    
  - Joose.O.copy(source, target)

Copies all the properties of **source** object to the **target** (*including* inherited via prototype chain). 

  - Joose.O.copySafe(source, target)

Copies all the properties of **source** object to the **target** (*excluding* inherited via prototype chain). 
    
  - Joose.O.getMutableCopy(object)

Returns a "mutable copy" of **object**. "Mutable copy" is actually an empty object, which however inherit all the properties of original source via prototype chain.

  - Joose.O.extend(target, source)

Copies all the properties of **source** object to the **target** (*including* inherited via prototype chain). 
    
  - Joose.O.isEmpty(object)

Returns boolean value, indicating whether the **object** have no *own* properties.
    
  - Joose.O.isInstance(obj)

Returns boolean value, indicating whether the passed **obj** is an instance of some Joose class.
    
  - Joose.O.wantArray(obj)

Returns **obj** itself if **obj** is an array, or [ **obj** ] otherwise.


Helpers for Attributes declaration
----------------------------------

To simplify declaration of attributes Joose provides a number of default attributes initializers (see [Joose.Manual.Attributes][!!] for more details)

 - Joose.Array

Returns empty Array when called

 - Joose.Object

Returns empty Object when called

- Joose.Function

Returns empty Function when called (which in turn will return empty function)


METACLASS
=========

When you use Joose, you can specify which metaclass to use:

    Class("Point", {
    
        meta : NewMetaClass,
        ....
    })


You can also specify traits which will be applied to your metaclass:

    Class("Point", {
    
        trait : TraitWithCustomBuilder,
    
        coords : [ 1, 2, 3 ]
        
        ....
    })

When you do this, your class's meta object will have the specified traits applied to it. See [Joose.Manual.Roles][!!] for more details.
    

The JooseX. namespace
=====================

Generally if you're writing an extension for Joose itself you'll want to put your extension in the JooseX. namespace. This namespace is specifically for extensions that make Joose better or different in some fundamental way. It is traditionally not for a package that just happens to use Joose. 


CAVEATS
=======

Attributes in traits.

Refering to meta instance from the constructor


GETTING HELP
============

We offer both a mailing list and an active IRC channel.

The mailing list is <joose-js@googlegroups.com>. To subscribe, visit: <http://groups.google.com/group/joose-js>

You can also visit us at #joose on irc.freenode.org. Questions at all levels (on Joose-related topics ;) are welcome.


ACKNOWLEDGEMENTS
================

Many thanks to the whole Moose community for being icebreaker in the meta world. 

Special thanks to Dave Rolsky for the excellent Moose documentation written, on which this document is based.


SEE ALSO
========

<http://code.google.com/p/joose-js/>

This is the official web home of Joose, it contains links to our public SVN repository as well as links to a number of talks and articles on Joose and Joose related technologies.


<http://www.iinteractive.com/moose>

Home page of Moose - post-modern class system for perl

BUGS
====

All complex software has bugs lurking in it, and this module is no exception.

Please report any bugs through the web interface at <http://code.google.com/p/joose-js/issues/list>


FEATURE REQUESTS
================

We are very strict about what features we add to the Joose core, especially the user-visible features. Instead we have made sure that the underlying meta-system of Joose is as extensible as possible so that you can add your own features easily.

That said, occasionally there is a feature needed in the meta-system to support your planned extension, in which case you should either email the mailing list (<joose-js@googlegroups.com>) or join us on IRC at <irc://irc.freenode.org/#joose> to discuss. The Joose.Manual.Contributing has more detail about how and when you can contribute.


AUTHORS
======

Malte Ubl 

Jeremy Wall

Nickolay Platonov



COPYRIGHT AND LICENSE
=====================

Copyright (c) 2008, Malte Ubl

All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
* Neither the name of Malte Ubl nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission. 

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. 


Documentation is based on original Moose::Manual documentation, copyright 2006-2009 by Infinity Interactive, Inc.


[1]: Joose/Manual.html
[2]: Joose/Cookbook.html
[3]: http://openjsan.org/index.html

*/
