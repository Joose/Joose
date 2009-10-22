Joose = function () { throw "Modules may not be instantiated." }


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
    
    saneSplit : function (str, delimeter) {
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
            Joose.A.each([ 'toString', 'constructor', 'hasOwnProperty' ], function (el) {
                if (object.hasOwnProperty(el)) func.call(scope || this, object[el], el)
            })
        } 
    },
    
    
    eachSafe : function (object, func, scope) {
        Joose.O.each(object, function (value, name) {
            if (object.hasOwnProperty(name)) func.call(scope || this, value, name)
        }, scope)
    },
    
    
    copy : function (source, target) {
        target = target || {}
        
        Joose.O.each(source, function (value, name) { target[name] = value })
        return target
    },
    
    
    copySafe : function (source, target) {
        target = target || {}
        
        Joose.O.eachSafe(source, function (value, name) { target[name] = value })
        return target
    },
    
    
    getMutableCopy : function (object) {
        var f = function () {}
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
    
    
    isInstance: function (obj) {
        return obj && obj.meta && obj.constructor == obj.meta.c
    },
    
    
    wantArray : function (obj) {
        if (obj instanceof Array) return obj
        
        return [ obj ]
    }
}


Joose.Array = function () { return [] }
Joose.Object = function () { return {} }
Joose.Function = function () { return function () {} }
Joose.Now = function () { return new Date() }

//XXX needs to be checked for IE8
try {
    Joose.is_IE = /msie/i.test(navigator.userAgent) && !/opera/i.test(navigator.userAgent)
} catch (e) {
    Joose.is_IE = false
}


/**

Name
====

Joose - A postmodern class system for JavaScript


SYNOPSIS
========

        Class("Point", {
        
            has: {
                x: {is: "ro"},
                y: {is: "rw"},
            },
            
            methods: {
                clear: function () {
                    var x = this.getX()
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
        
        var point = new Point.ThreeD({
            x : 1,
            y : 2,
            z : 3
        })


DESCRIPTION
===========

Joose is a self-hosting meta object system for JavaScript with support for classes, inheritance, roles (aka traits), method modifiers and much more.

The main goal of Joose is to make JavaScript Object Oriented Programming easier, more consistent and less tedious. With Joose you can to think more about what you want to do and less about the mechanics of OOP.

The Joose framework has been successfully used in multiple production systems for twelve months now and has been proven to be very stable. 
Joose is being tested using an automated unit-test suite that is being run in all major browsers (Firefox, IE, Safari, Opera and Chrome).

Joose core package is only 8kb (YUI+gz).


New to Joose?
-------------

If you're new to Joose, the best place to start is the [Joose.Manual][1] docs, followed by the [Joose.Cookbook][2]. The intro will show you what Joose is, and how it makes JavaScript OO better.

The cookbook recipes on Joose basics will get you up to speed with many of Joose's features quickly. Once you have an idea of what Joose can do, you can use the API documentation to get more detail on features which interest you.


 
BUILDING CLASSES WITH JOOSE
===========================

Joose makes every attempt to provide as much convenience as possible during class construction/definition, but still stay out of your way if you want it to. Here are a few items to note when building classes with Joose.

- Unless specified with 'isa', any class which uses Joose will inherit from Joose.Proto.Object.


PROVIDED INSTANCE METHODS
=========================

Joose provides a number of methods to all your classes, mostly through the inheritance from Joose.Proto.Object.

  - `this.SUPER(arg1, arg2, ...)`

Only valid in the scope of usual methods and OVERRIDE method modifiers. Calls a superclass's method with the arguments provided.

  - `this.SUPERARG(Array arg)`

Only valid in the scope of usual methods and OVERRIDE method modifiers. Calls a superclass's method with the "packed" arguments, provided as array. Usually used as: `this.SUPERARG(arguments)`

This method is just a shortcut for `this.SUPER.apply(this, arguments)`

  - `this.initialize()`

Default `initialize` method is empty function.

  - `this.toString()`

Defalt string coercion is string "a ClassName", where ClassName is a name of instance's class.
 
  - `this.detach()`

Detaches the instance from its class. See the details [here][traits]

  - `this.attach()`

Attaches the instance back to its class. See the details [here][traits]

  - `this.isDetached()`

Returns boolean value, indicating whether this instance is detached from its class.


PROVIDED INSTANCE PROPERTIES
============================

Joose provides a number of properties to all instances of your classes.

  - `this.constructor`

A class with which `this` instance was constructed.

  - `this.meta`

An instance of metaclass for `this` instance's class. 


PROVIDED CLASS PROPERTIES
============================

Joose also provides a number of properties to classes.

  - `class.meta`

An instance of metaclass for this class. The same as `this.meta` for instances of `class`

  - `class.my`

A built-in singleton instance. See [Joose.Manual.Singleton][6] for more details.

  - `class.superClass`

A superclass (constructor function) of given `class`
    
    
PROVIDED HELPERS
================

Declaration helpers
-------------------

Declaration helpers allows you to declare a class, role or module.

  - `Class(String name, Object builders)`
  
Declares a class, using provided builders. `name` will be transformed into class's constructor. See the details [here][construction]

  - `Class(Object buildersObj)`
  
Declares an anonymous class.
  
  - `Role(String name, Object builders)`

  - `Role(Object buildersObj)`
  
The same helpers for Roles. See [Roles][roles].

  - `Module(String name, Object builders)`

  - `Module(String name, Function body)`

The same helpers for Modules. See the details [here][construction]


Joose also provides a number of small helpers functions, which you might found useful. 

Helpers for Arrays
------------------

  - `Joose.A.each(array, func, scope)`

Calls a `func` in the optional `scope` for each element of `array` as: `func(element, index)`, where `index` is the index of element in the `array`

  - `Joose.A.exists(array, value)`

Returns boolean value, indicating whether this `value` is exists in the `array`.
    
  - `Joose.A.grep(array, func)`

Calls the `func` for each element of `array` and returns an array, consisted from only those elements, for which it returns 'true' value

  - `Joose.A.remove(array, removeEle)`

Returns a "shallow copy" of `array`, without the all the occurrences of `removeEle` (if any). Comparison is performing with '===' operator. Do not modifies original `array`.
    

Helpers for Strings
------------------

  - `Joose.S.saneSplit(str, delimeter)`

Implements a perl-like 'split', which returns empty array for splitted empty string (not an array with an empty string). Behave as standard `String.prototype.split` in other aspects.

  - `Joose.S.uppercaseFirst(string)`

Returns a copy of `string`, with uppercased first letter.
    

Helpers for Objects
------------------

  - `Joose.O.each(object, func, scope)`

Calls a `func` in the optional `scope` for each property of the `object` (*including* inherited via prototype chain). 
`func` is called as: `func(value, name), where `value` is the value of the `name` property of `object`.

  - `Joose.O.eachSafe(object, func, scope)`

Calls a `func` in the optional `scope` for each property of the `object` (*excluding* inherited via prototype chain). 
`func` is called as: `func(value, name), where `value` is the value of the `name` property of `object`.
    
  - `Joose.O.copy(source, target)`

Copies all the properties of `source` object to the `target` (*including* inherited via prototype chain). 

  - `Joose.O.copySafe(source, target)`

Copies all the properties of `source` object to the `target` (*excluding* inherited via prototype chain). 
    
  - `Joose.O.getMutableCopy(object)`

Returns a "mutable copy" of `object`. "Mutable copy" is an empty object, which however inherit all the properties of original via prototype chain.

  - `Joose.O.extend(target, source)`

Copies all the properties of `source` object to the `target` (*including* inherited via prototype chain). 
    
  - `Joose.O.isEmpty(object)`

Returns boolean value, indicating whether the `object` have no *own* properties.
    
  - `Joose.O.isInstance(obj)`

Returns boolean value, indicating whether the passed `obj` is an instance of some Joose class.
    
  - `Joose.O.wantArray(obj)`

Returns `obj` itself if `obj` is an array, or `[ obj ]` otherwise.


Helpers for Attributes declaration
----------------------------------

To simplify declaration of attributes Joose provides a number of default attributes initializers (see [Joose.Manual.Attributes][4] for details)

 - `Joose.Array`

Returns empty Array when called

 - `Joose.Object`

Returns empty Object when called

- `Joose.Function`

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

When you do this, your class's meta object will have the specified traits applied to it. See [Joose.Manual.Roles][5] and [Joose.Manual.Traits][traits] for further details.
    

The JooseX. namespace
=====================

Generally if you're writing an extension for Joose itself you'll want to put your extension in the JooseX. namespace. This namespace is specifically for extensions that make Joose better or different in some fundamental way. 
It is traditionally not for a package that just happens to use Joose. 

These extensions can be found on the [JSAN][3]. See [Joose.Manual.JooseX][7] for more details.


<div style="display:none">

CAVEATS
=======

The moment of trait application.

Attributes in traits.

Refering to meta instance from the constructor

Method modifiers order in Rhino

</div>


GETTING HELP
============

We offer both a mailing list and an active IRC channel.

The mailing list is <a href="mailto:joose-js@googlegroups.com">joose-js@googlegroups.com</a>. To subscribe, visit: [http://groups.google.com/group/joose-js](http://groups.google.com/group/joose-js)

You can also visit us at #joose on irc.freenode.org. Questions at all levels (on Joose-related topics ;) are welcome.


ACKNOWLEDGEMENTS
================

Many thanks to the whole Moose community for being icebreaker in the meta world. 

Special thanks to Dave Rolsky for the excellent Moose documentation written, on which this document is based.


SEE ALSO
========

[http://code.google.com/p/joose-js/](http://code.google.com/p/joose-js/)

This is the official web home of Joose.

[http://github.com/Joose/Joose](http://github.com/Joose/Joose)

Our version control repository.

[http://www.iinteractive.com/moose](http://www.iinteractive.com/moose)

Home page of Moose - post-modern class system for perl

BUGS
====

All complex software has bugs lurking in it, and this module is no exception.

Please report any bugs through the web interface at [http://code.google.com/p/joose-js/issues/list](http://code.google.com/p/joose-js/issues/list)


FEATURE REQUESTS
================

We are very strict about what features we add to the Joose core, especially the user-visible features. Instead we have made sure that the underlying meta-system of Joose is as extensible as possible so that you can add your own features easily.

That said, occasionally there is a feature needed in the meta-system to support your planned extension, in which case you should 
either email the mailing list ([joose-js@googlegroups.com](mailto:joose-js@googlegroups.com)) or join us on IRC at <irc://irc.freenode.org/#joose> to discuss. 
The [Joose.Manual.Contributing][8] has more detail about how and when you can contribute.


AUTHORS
=======

Malte Ubl 

Jeremy Wall

Nickolay Platonov



COPYRIGHT AND LICENSE
=====================

Copyright (c) 2008-2009, Malte Ubl, Nickolay Platonov

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
[4]: Joose/Manual/Attributes.html
[5]: Joose/Manual/Roles.html
[6]: Joose/Manual/Singleton.html
[7]: Joose/Manual/JooseX.html
[8]: Joose/Manual/Contributing.html

[construction]: Joose/Manual/Construction.html
[traits]: Joose/Manual/Traits.html
[roles]: Joose/Manual/Roles.html
*/
;
Joose.Proto = function () { throw "Modules may not be instantiated." }

Joose.Proto.Empty = function () { throw "Joose.Proto.Empty can't be instantiated" }
    
Joose.Proto.Empty.meta = {
    methods     : {},
    attributes  : {}
};
(function () {

    Joose.Proto.Object = function () {
        throw "Joose.Proto.Object can't be instantiated"
    }
    
    
    var SUPER = function () {
        var self = SUPER.caller
        
        if (self == SUPERARG) self = self.caller
        
        if (!self.SUPER) throw "Invalid call to SUPER"
        
        return self.SUPER[self.methodName].apply(this, arguments)
    }
    
    
    var SUPERARG = function () {
        return this.SUPER.apply(this, arguments[0])
    }
    
    
    
    Joose.Proto.Object.prototype = {
        
        SUPERARG : SUPERARG,
        SUPER : SUPER,
        
        INNER : function () {
            throw "Invalid call to INNER"
        },                
        
        
        BUILD : function () {
            var config = arguments[0] 
            
            return arguments.length == 1 && typeof config == 'object' && config || {}
        },
        
        
        initialize: function (props) {
            Joose.O.copySafe(props, this)
        },
        
        
        toString: function () {
            return "a " + this.meta.name
        }
        
    }
        
    Joose.Proto.Object.meta = {
        constructor     : Joose.Proto.Object,
        
        methods         : Joose.O.copy(Joose.Proto.Object.prototype),
        attributes      : {}
    }
    
    Joose.Proto.Object.prototype.meta = Joose.Proto.Object.meta

})();
(function () {

    Joose.Proto.Class = function () {
        this.initialize(this.BUILD.apply(this, arguments))
    }
    
    var bootstrap = {
        
        constructor         : Joose.Proto.Class,
        superClass          : null,
        
        name                : null,
        
        attributes          : null,
        methods             : null,
        
        meta                : null,
        c                   : null,
        
        defaultSuperClass   : Joose.Proto.Object,
        
        
        BUILD : function (name, extend) {
            this.name = name
            
            return extend || {}
        },
        
        
        initialize: function (extend) {
            this.extractConstructor(extend)
            
            this.adaptConstructor()
            
            if (extend.constructorOnly) return
            
            this.construct(extend)
        },
        
        
        construct : function (extend) {
            if (!this.prepareProps(extend)) return
            
            this.extractSuperClass(extend)
            this.processSuperClass()
            
            this.adaptPrototype()
            
            this.finalize(extend)
        },
        
        
        finalize : function (extend) {
            this.processStem(extend)
            
            this.extend(extend)
        },
        
        
        //if the extension returns false from this method it should re-enter 'construct'
        prepareProps : function (extend) {
            return true
        },
        
        
        extractConstructor : function (extend) {
            this.c = extend.hasOwnProperty('constructor') ? extend.constructor : this.defaultConstructor()
            delete extend.constructor
        },
        
        
        extractSuperClass : function (extend) {
            this.superClass = extend.isa || this.defaultSuperClass
            delete extend.isa
        },
        
        
        processStem : function () {
            var superMeta = this.superClass.meta
            
            this.methods        = Joose.O.getMutableCopy(superMeta.methods)
            this.attributes     = Joose.O.getMutableCopy(superMeta.attributes)
        },
        
        
        
        defaultConstructor: function () {
            return function () {
                this.initialize(this.BUILD.apply(this, arguments))
            }
        },
        
        
        processSuperClass: function () {
            this.c.prototype    = Joose.O.getMutableCopy(this.superClass.prototype)
            this.c.superClass   = this.superClass.prototype
        },
        
        
        adaptConstructor: function () {
            var c = this.c
        
            c.meta = this
            
            if (!c.hasOwnProperty('toString')) c.toString = function () { return this.meta.name }
        },
    
        
        adaptPrototype: function () {
            var proto = this.c.prototype
        
            //this will fix weird semantic of native "constructor" property to more intuitive (idea borrowed from Ext)
            proto.constructor = this.c
            proto.meta = this
        },
        
        
        addMethod: function (name, func) {
            func.SUPER = this.superClass.prototype
            
            //chrome don't allow to redefine the "name" property
            func.methodName = name
            
            this.methods[name] = func
            this.c.prototype[name] = func
        },
        
        
        addAttribute: function (name, init) {
            this.attributes[name] = init
            this.c.prototype[name] = init
        },
        
        
        removeMethod : function (name) {
            delete this.methods[name]
            delete this.c.prototype[name]
        },
    
        
        removeAttribute: function (name) {
            delete this.attributes[name]
            delete this.c.prototype[name]
        },
        
        
        hasMethod: function (name) { 
            return Boolean(this.methods[name])
        },
        
        
        hasAttribute: function (name) { 
            return this.attributes[name] !== undefined
        },
        
    
        hasOwnMethod: function (name) { 
            return this.hasMethod(name) && this.methods.hasOwnProperty(name)
        },
        
        
        hasOwnAttribute: function (name) { 
            return this.hasAttribute(name) && this.attributes.hasOwnProperty(name)
        },
        
        
        extend : function (props) {
            Joose.O.eachSafe(props, function (value, name) {
                if (name != 'meta' && name != 'constructor') 
                    if (typeof value == 'function' && !value.meta) 
                        this.addMethod(name, value) 
                    else 
                        this.addAttribute(name, value)
            }, this)
        },
    
    
        subClassOf : function (classObject, extend) {
            extend = extend || {}
            extend.isa = classObject || this.c
            return new this.constructor(null, extend).c
        }
        
    }
    
    //micro bootstraping
    
    Joose.Proto.Class.prototype = Joose.O.getMutableCopy(Joose.Proto.Object.prototype)
    
    Joose.O.extend(Joose.Proto.Class.prototype, bootstrap)
    
    Joose.Proto.Class.prototype.meta = new Joose.Proto.Class('Joose.Proto.Class', bootstrap)
})();
Joose.Managed = function () { throw "Modules may not be instantiated." }

Joose.Managed.Property = new Joose.Proto.Class('Joose.Managed.Property', {
    
    name            : null,
    
    init            : null,
    value           : null,
    
    definedIn       : null,
    
    
    initialize : function (props) {
        Joose.Managed.Property.superClass.initialize.call(this, props)
        
        this.computeValue()
    },
    
    
    computeValue : function () {
        this.value = this.init
    },    
    
    
    //targetClass is still open at this stage ;)
    prepareApply : function (targetClass) {
    },
    
    
    apply : function (target) {
        target[this.name] = this.value
    },
    
    
    isAppliedTo : function (target) {
        return target[this.name] == this.value
    },
    
    
    unapply : function (from) {
        if (!this.isAppliedTo(from)) throw "Unapply of property [" + this.name + "] from [" + from + "] failed"
        
        delete from[this.name]
    },
    
    
    cloneProps : function () {
        return {
            name        : this.name, 
            init        : this.init,
            definedIn   : this.definedIn
        }
    },

    
    clone : function (name) {
        var props = this.cloneProps()
        
        props.name = name || props.name
        
        return new this.constructor(props)
    }
    
    
}).c;
Joose.Managed.Property.ConflictMarker = new Joose.Proto.Class('Joose.Managed.Property.ConflictMarker', {
    
    isa : Joose.Managed.Property,

    apply : function (target) {
        throw "Attempt to apply ConflictMarker [" + this.name + "] to [" + target + "]"
    },
    
    
    unapply : function (from) {
        throw "Attempt to unapply ConflictMarker [" + this.name + "] from [" + from + "]"
    }
    
}).c;
Joose.Managed.Property.Requirement = new Joose.Proto.Class('Joose.Managed.Property.Requirement', {
    
    isa : Joose.Managed.Property,

    apply : function (target) {
        if (!target.meta.hasMethod(this.name)) throw "Requirement [" + this.name + "], defined in [" + this.definedIn.definedIn.name + "] is not satisfied for class [" + target + "]"
    },
    
    
    unapply : function (from) {
    }
    
}).c;
Joose.Managed.Property.Attribute = new Joose.Proto.Class('Joose.Managed.Property.Attribute', {
    
    isa : Joose.Managed.Property,
    
    apply : function (target) {
        Joose.Managed.Property.Attribute.superClass.apply.call(this, target.prototype)
    },
    
    
    unapply : function (from) {
        Joose.Managed.Property.Attribute.superClass.unapply.call(this, from.prototype)
    }
    
}).c;
Joose.Managed.Property.MethodModifier = new Joose.Proto.Class('Joose.Managed.Property.MethodModifier', {
    
    isa : Joose.Managed.Property,

    
    prepareWrapper : function () {
        throw "Abstract method [prepareWrapper] of " + this + " was called"
    },
    

    apply : function (target) {
        var name = this.name
        var targetProto = target.prototype
        var isOwn = targetProto.hasOwnProperty(name)
        var original = targetProto[name]
        var superProto = target.meta.superClass.prototype
        
        
        var originalCall = isOwn ? original : function () { return superProto[name].apply(this, arguments) }
        
        var methodWrapper = this.prepareWrapper({
            name            : name,
            modifier        : this.value, 
            
            isOwn           : isOwn,
            originalCall    : originalCall, 
            
            superProto      : superProto,
            
            target          : target
        })
        
        if (isOwn) methodWrapper._original = original
        methodWrapper._contain = this.value
        
        targetProto[name] = methodWrapper
    },
    
    
    isAppliedTo : function (target) {
        var targetCont = target.prototype[this.name]
        
        return targetCont && targetCont._contain == this.value
    },
    
    
    unapply : function (from) {
        var name = this.name
        var fromProto = from.prototype
        var original = fromProto[name]._original
        
        if (!this.isAppliedTo(from)) throw "Unapply of method [" + name + "] from class [" + from + "] failed"
        
        //if modifier was applied to own method - restore it
        if (original) 
            fromProto[name] = original
        //otherwise - just delete it, to reveal the inherited method 
        else
            delete fromProto[name]
    }
    
}).c;
Joose.Managed.Property.MethodModifier.Override = new Joose.Proto.Class('Joose.Managed.Property.MethodModifier.Override', {
    
    isa : Joose.Managed.Property.MethodModifier,

    
    prepareWrapper : function (params) {
        
        var modifier        = params.modifier
        var originalCall    = params.originalCall
        var superProto      = params.superProto
        
        //call to Joose.Proto level, require some additional processing
        var isCallToProto = superProto.meta.constructor == Joose.Proto.Class || superProto.meta.constructor == Joose.Proto.Object
        
        var original = originalCall
        
        if (isCallToProto) original = function () {
            var beforeSUPER = this.SUPER
            
            this.SUPER  = superProto.SUPER
            
            var res = originalCall.apply(this, arguments)
            
            this.SUPER = beforeSUPER
            
            return res
        }

        return function () {
            
            var beforeSUPER = this.SUPER
            
            this.SUPER  = original
            
            var res = modifier.apply(this, arguments)
            
            this.SUPER = beforeSUPER
            
            return res
        }
    }
    
    
}).c;
Joose.Managed.Property.MethodModifier.Put = new Joose.Proto.Class('Joose.Managed.Property.MethodModifier.Put', {
    
    isa : Joose.Managed.Property.MethodModifier.Override,


    prepareWrapper : function (params) {
        
        if (params.isOwn) throw "Method [" + params.name + "] is applying over something [" + params.originalCall + "] in class [" + params.target + "]"
        
        return Joose.Managed.Property.MethodModifier.Put.superClass.prepareWrapper.call(this, params)
    }
    
    
}).c;
Joose.Managed.Property.MethodModifier.After = new Joose.Proto.Class('Joose.Managed.Property.MethodModifier.After', {
    
    isa : Joose.Managed.Property.MethodModifier,

    
    prepareWrapper : function (params) {
        
        var modifier        = params.modifier
        var originalCall    = params.originalCall
        
        return function () {
            var res = originalCall.apply(this, arguments)
            modifier.apply(this, arguments)
            return res
        }
    }    

    
}).c;
Joose.Managed.Property.MethodModifier.Before = new Joose.Proto.Class('Joose.Managed.Property.MethodModifier.Before', {
    
    isa : Joose.Managed.Property.MethodModifier,

    
    prepareWrapper : function (params) {
        
        var modifier        = params.modifier
        var originalCall    = params.originalCall
        
        return function () {
            modifier.apply(this, arguments)
            return originalCall.apply(this, arguments)
        }
    }
    
}).c;
Joose.Managed.Property.MethodModifier.Around = new Joose.Proto.Class('Joose.Managed.Property.MethodModifier.Around', {
    
    isa : Joose.Managed.Property.MethodModifier,

    prepareWrapper : function (params) {
        
        var modifier        = params.modifier
        var originalCall    = params.originalCall
        
        var me
        
        var bound = function () {
            return originalCall.apply(me, arguments)
        }
            
        return function () {
            me = this
            
            var boundArr = [ bound ]
            boundArr.push.apply(boundArr, arguments)
            
            return modifier.apply(this, boundArr)
        }
    }
    
}).c;
Joose.Managed.Property.MethodModifier.Augment = new Joose.Proto.Class('Joose.Managed.Property.MethodModifier.Augment', {
    
    isa : Joose.Managed.Property.MethodModifier,

    
    prepareWrapper : function (params) {
        
        var AUGMENT = function () {
            
            //populate callstack to the most deep non-augment method
            var callstack = []
            
            var self = AUGMENT
            
            do {
                callstack.push(self.IS_AUGMENT ? self._contain : self)
                
                self = self.IS_AUGMENT && (self._original || self.SUPER[self.methodName])
            } while (self)
            
            
            //save previous INNER
            var beforeINNER = this.INNER
            
            //create new INNER
            this.INNER = function () {
                var innerCall = callstack.pop()
                
                return innerCall ? innerCall.apply(this, arguments) : undefined
            }
            
            //augment modifier results in hypotetical INNER call of the same method in subclass 
            var res = this.INNER.apply(this, arguments)
            
            //restore previous INNER chain
            this.INNER = beforeINNER
            
            return res
        }
        
        AUGMENT.methodName  = params.name
        AUGMENT.SUPER       = params.superProto
        AUGMENT.IS_AUGMENT  = true
        
        return AUGMENT
    }
    
}).c;
Joose.Managed.PropertySet = new Joose.Proto.Class('Joose.Managed.PropertySet', {
    
    isa                       : Joose.Managed.Property,

    properties                : null,
    
    propertyMetaClass         : Joose.Managed.Property,
    
    
    initialize : function (props) {
        Joose.Managed.PropertySet.superClass.initialize.call(this, props)
        
        //XXX this guards the meta roles :)
        this.properties = props.properties || {}
    },
    
    
    addProperty : function (name, props) {
        var metaClass = props.meta || this.propertyMetaClass
        delete props.meta
        
        props.definedIn     = this
        props.name          = name
        
        return this.properties[name] = new metaClass(props)
    },
    
    
    addPropertyObject : function (object) {
        return this.properties[object.name] = object
    },
    
    
    removeProperty : function (name) {
        var prop = this.properties[name]
        
        //probably should be 
        //this.properties[name] = undefined
        delete this.properties[name]
        
        return prop
    },
    
    
    haveProperty : function (name) {
        return this.properties[name] != null
    },
    

    haveOwnProperty : function (name) {
        return this.haveProperty(name)
    },
    
    
    getProperty : function (name) {
        return this.properties[name]
    },
    
    
    each : function (func, scope) {
        scope = scope || this
        
        Joose.O.each(this.properties, function (property, name) {
            if (property != null) func.call(scope, property, name)
        })
    },
    
    
    eachAll : function (func, scope) {
        this.each(func, scope)
    },
    
    
    eachOwn : function (func, scope) {
        this.each(func, scope)
    },
    
    
    cloneProps : function () {
        var props = Joose.Managed.PropertySet.superClass.cloneProps.call(this)
        
        props.properties = Joose.O.getMutableCopy(this.properties)
        
        return props
    },
    
    
    cleanClone : function (name) {
        var clone = this.clone(name)
        
        clone.properties = {}
        
        return clone
    },
    
    
    alias : function (what) {
        var props = this.properties
        
        Joose.O.each(what, function (aliasName, originalName) {
            var original = props[originalName]
            
            if (original) this.addPropertyObject(original.clone(aliasName))
        }, this)
    },
    
    
    exclude : function (what) {
        Joose.A.each(what, function (name) {
            //not just "delete" to implicitly override possible inherited via getMutableCopy property
            if (this.properties[name]) this.properties[name] = undefined
        }, this)
    },
    
    
    flattenTo : function (target) {
        var targetProps = target.properties
        
        this.each(function (property, name) {
            var targetProperty = targetProps[name]
            
            if (targetProperty instanceof Joose.Managed.Property.ConflictMarker) return
            
            if (targetProperty == null) {
                target.addPropertyObject(property)
                return
            }
            
            if (targetProperty == property) return
            
            target.removeProperty(name)
            target.addProperty(name, {
                meta : Joose.Managed.Property.ConflictMarker
            })
        }, this)
    },
    
    
    composeTo : function (target) {
        this.each(function (property, name) {
            if (!target.haveOwnProperty(name)) target.addPropertyObject(property)
        })
    },
    
    
    composeFrom : function () {
        if (!arguments.length) return
        
        var flattening = this.cleanClone()
        
        Joose.A.each(arguments, function (arg) {
            var propSet = arg
            
            if (!(arg instanceof Joose.Managed.PropertySet)) {
                propSet = arg.propertySet
                
                if (arg.alias || arg.exclude) propSet = propSet.clone()
                if (arg.alias) propSet.alias(arg.alias)
                if (arg.exclude) propSet.exclude(arg.exclude)
            }
            
            propSet.flattenTo(flattening)
        })
        
        flattening.composeTo(this)
    },
    
    
    prepareApply : function (target) {
        this.each(function (property) {
            property.prepareApply(target)
        })
    },
    
    
    apply : function (target) {
        this.each(function (property) {
            property.apply(target)
        })
    },
    
    
    unapply : function (from) {
        this.each(function (property) {
            property.unapply(from)
        })
    }
    
    
}).c
;
(function () {
    
    var __ID__ = 1
    

    Joose.Managed.PropertySet.Mutable = new Joose.Proto.Class('Joose.Managed.PropertySet.Mutable', {
        
        isa                 : Joose.Managed.PropertySet,
    
        ID                  : null,
        
        derivatives         : null,
        
        opened              : null,
        
        composedFrom        : null,
        
        
        initialize : function (props) {
            Joose.Managed.PropertySet.Mutable.superClass.initialize.call(this, props)
            
            //initially opened
            this.opened             = 1
            this.derivatives        = {}
            this.ID                 = __ID__++
            this.composedFrom       = []
        },
        
        
        setComposeInfo : function () {
            this.ensureOpen()
            
            Joose.A.each(this.composedFrom, function (arg) {
                var propSet = arg instanceof Joose.Managed.PropertySet ? arg : arg.propertySet
                    
                delete propSet.derivatives[this.ID]
            }, this)
            
            this.composedFrom = []
            
            this.addComposeInfo.apply(this, arguments)
        },
        
        
        addComposeInfo : function () {
            this.ensureOpen()
            
            Joose.A.each(arguments, function (arg) {
                this.composedFrom.push(arg)
                
                var propSet = arg instanceof Joose.Managed.PropertySet ? arg : arg.propertySet
                    
                propSet.derivatives[this.ID] = this
            }, this)
        },
        
        
        removeComposeInfo : function () {
            this.ensureOpen()
            
            Joose.A.each(arguments, function (arg) {
                
                var i = 0
                
                while (i < this.composedFrom.length) {
                    var propSet = this.composedFrom[i]
                    propSet = propSet instanceof Joose.Managed.PropertySet ? propSet : propSet.propertySet
                    
                    if (arg == propSet) {
                        delete propSet.derivatives[this.ID]
                        this.composedFrom.splice(i, 1)
                    } else i++
                }
                
            }, this)
        },
        
        
        ensureOpen : function () {
            if (!this.opened) throw "Mutation of closed property set: [" + this.name + "]"
        },
        
        
        addProperty : function (name, props) {
            this.ensureOpen()
            
            return Joose.Managed.PropertySet.Mutable.superClass.addProperty.call(this, name, props)
        },
        
    
        addPropertyObject : function (object) {
            this.ensureOpen()
            
            return Joose.Managed.PropertySet.Mutable.superClass.addPropertyObject.call(this, object)
        },
        
        
        removeProperty : function (name) {
            this.ensureOpen()
            
            return Joose.Managed.PropertySet.Mutable.superClass.removeProperty.call(this, name)
        },
        
        
        composeFrom : function () {
            this.ensureOpen()
            
            return Joose.Managed.PropertySet.Mutable.superClass.composeFrom.apply(this, this.composedFrom)
        },
        
        
        open : function () {
            this.opened++
            
            if (this.opened == 1) {
            
                Joose.O.each(this.derivatives, function (propSet) {
                    propSet.open()
                })
                
                this.deCompose()
            }
        },
        
        
        close : function () {
            if (!this.opened) throw "Unmatched 'close' operation on property set: [" + this.name + "]"
            
            if (this.opened == 1) {
                this.reCompose()
                
                Joose.O.each(this.derivatives, function (propSet) {
                    propSet.close()
                })
            }
            this.opened--
        },
        
        
        reCompose : function () {
            this.composeFrom()
        },
        
        
        deCompose : function () {
            this.each(function (property, name) {
                if (property.definedIn != this) this.removeProperty(name)
            }, this)
        }
        
    }).c
    
    
})()

;
Joose.Managed.PropertySet.Containable = new Joose.Proto.Class('Joose.Managed.PropertySet.Containable', {
    
    isa                     : Joose.Managed.PropertySet.Mutable,

    //points to class
    targetMeta             : null,
    
    container               : null,

    
    initialize : function (props) {
        Joose.Managed.PropertySet.Containable.superClass.initialize.call(this, props)
        
        this.computeContainer()
    },
    
    
    computeContainer : function () {
        throw "Abstract method [computeContainer] of " + this + " was called"
    },
    
    
    addProperty : function (name, props) {
        return this.container[name] = Joose.Managed.PropertySet.Containable.superClass.addProperty.call(this, name, props)
    },
    

    addPropertyObject : function (object) {
        return this.container[object.name] = Joose.Managed.PropertySet.Containable.superClass.addPropertyObject.call(this, object)
    },
    

    removeProperty : function (name) {
        try {
            delete this.container[name]
        } catch(e) {
            this.container[name] = undefined
        }
        
        return Joose.Managed.PropertySet.Containable.superClass.removeProperty.call(this, name)
    },
    
    
    haveProperty : function (name) {
        return this.container[name] != null
    },
    
    
    haveOwnProperty : function (name) {
        return this.haveProperty(name) && this.container.hasOwnProperty(name)
    },
    
    
    getProperty : function (name) {
        return this.container[name]
    },
    
    
    
    cloneProps : function () {
        var props = Joose.Managed.PropertySet.Containable.superClass.cloneProps.call(this)
        
        props.targetMeta = this.targetMeta
        
        return props
    },

    
    cleanClone : function (name) {
        var clon = Joose.Managed.PropertySet.Containable.superClass.cleanClone.call(this, name)
        
        clon.container = {}
        
        return clon
    },
    
    
    eachAll : function (func, scope) {
        Joose.O.each(this.container, function (property, name) {
            if (property != null) func.call(scope || this, property, name, this.haveOwnProperty(name))
        }, this)
    }
    
}).c
;
Joose.Managed.StemElement = function () { throw "Modules may not be instantiated." }

Joose.Managed.StemElement.Attributes = new Joose.Proto.Class('Joose.Managed.StemElement.Attributes', {
    
    isa                     : Joose.Managed.PropertySet.Containable,
    
    propertyMetaClass       : Joose.Managed.Property.Attribute,
    
    
    computeContainer : function (props) {
        this.container = this.targetMeta.attributes
    }
    
}).c
;
Joose.Managed.StemElement.Methods = new Joose.Proto.Class('Joose.Managed.StemElement.Methods', {
    
    isa : Joose.Managed.PropertySet.Containable,
    
    propertyMetaClass : Joose.Managed.Property.MethodModifier.Put,
    
    
    computeContainer : function (props) {
        this.container = this.targetMeta.methods
    },
    
    
    prepareApply : function () {
    }
    
}).c;
Joose.Managed.StemElement.Requirements = new Joose.Proto.Class('Joose.Managed.StemElement.Requirements', {

    isa                     : Joose.Managed.PropertySet.Mutable,
    
    targetMeta              : null,
    
    propertyMetaClass       : Joose.Managed.Property.Requirement,
    
    
    
    cloneProps : function () {
        var props = Joose.Managed.StemElement.Requirements.superClass.cloneProps.call(this)
        
        props.targetMeta = this.targetMeta
        
        return props
    },
    
    
    alias : function () {
    },
    
    
    exclude : function () {
    },
    
    
    flattenTo : function (target) {
        this.each(function (property, name) {
            if (!target.haveProperty(name)) target.addPropertyObject(property)
        })
    },
    
    
    composeTo : function (target) {
        this.flattenTo(target)
    },
    
    
    prepareApply : function (target) {
    }
    
}).c;
Joose.Managed.StemElement.MethodModifiers = new Joose.Proto.Class('Joose.Managed.StemElement.MethodModifiers', {

    isa                     : Joose.Managed.PropertySet.Mutable,
    
    targetMeta              : null,
    
    propertyMetaClass       : null,
    
    
    cloneProps : function () {
        var props = Joose.Managed.StemElement.MethodModifiers.superClass.cloneProps.call(this)
        
        props.targetMeta = this.targetMeta
        
        return props
    },
    
    
    addProperty : function (name, props) {
        var metaClass = props.meta
        delete props.meta
        
        props.definedIn         = this
        props.name              = name
        var modifier            = new metaClass(props)
        
        if (!this.properties[name]) this.properties[name] = []
        this.properties[name].push(modifier)
        
        return modifier
    },
    

    addPropertyObject : function (object) {
        var name = object.name
        
        if (!this.properties[name]) this.properties[name] = []
        
        this.properties[name].push(object)
        
        return object
    },
    
    
    //remove only the last modifier
    removeProperty : function (name) {
        if (!this.haveProperty(name)) return undefined
        
        var modifier = this.properties[name].pop()
        
        //if all modifiers were removed - clearing the properties
        if (!this.properties[name].length) Joose.Managed.StemElement.MethodModifiers.superClass.removeProperty.call(this, name)
        
        return modifier
    },
    
    
    alias : function () {
    },
    
    
    exclude : function () {
    },
    
    
    flattenTo : function (target) {
        var targetProps = target.properties
        
        this.each(function (modifiersArr, name) {
            var targetModifiersArr = targetProps[name]
            
            if (targetModifiersArr == null) targetModifiersArr = targetProps[name] = []
            
            Joose.A.each(modifiersArr, function (modifier) {
                if (!Joose.A.exists(targetModifiersArr, modifier)) targetModifiersArr.push(modifier)
            })
            
        }, this)
        
        return this
    },
    
    
    composeTo : function (target) {
        this.flattenTo(target)
    },

    
    deCompose : function () {
        this.each(function (modifiersArr, name) {
            var i = 0
            while (i < modifiersArr.length) if (modifiersArr[i].definedIn != this) modifiersArr.splice(i, 1); else i++
            
        }, this)
    },
    
    
    prepareApply : function (target) {
//        this.each(function (modifiersArr, name) {
//            Joose.A.each(modifiersArr, function (modifier) {
//                modifier.prepareApply(target)
//            })
//        }, this)
    },

    
    apply : function (target) {
        this.each(function (modifiersArr, name) {
            Joose.A.each(modifiersArr, function (modifier) {
                modifier.apply(target)
            })
        })
    },
    
    
    unapply : function (from) {
        this.each(function (modifiersArr, name) {
            for (var i = modifiersArr.length - 1; i >=0; i--) {
                modifiersArr[i].unapply(from)
            }
        })
    }
    
    
    
}).c;
Joose.Managed.PropertySet.Composition = new Joose.Proto.Class('Joose.Managed.PropertySet.Composition', {
    
    isa                         : Joose.Managed.PropertySet.Mutable,
    
    propertyMetaClass           : Joose.Managed.PropertySet.Mutable,
    
    processOrder                : null,

    
    each : function (func, scope) {
        var props = this.properties
        
        Joose.A.each(this.processOrder, function (name) {
            func.call(scope || this, props[name], name)
        }, this)
    },
    
    
    eachR : function (func, scope) {
        var props = this.properties
        
        for(var i = this.processOrder.length - 1; i >= 0; i--) 
            func.call(scope || this, props[this.processOrder[i]], this.processOrder[i])
    },
    
    
    clone : function () {
        var clone = Joose.Managed.PropertySet.Composition.superClass.clone.call(this)
        
        clone.properties = {}
        
        this.each(function (property) {
            clone.addPropertyObject(property.clone())
        })
        
        return clone
    },
    
    
    alias : function (what) {
        this.each(function (property) {
            property.alias(what)
        })
    },
    
    
    exclude : function (what) {
        this.each(function (property) {
            property.exclude(what)
        })
    },
    
    
    flattenTo : function (target) {
        var targetProps = target.properties
        
        this.each(function (property, name) {
            var subTarget = targetProps[name] || target.addProperty(name, {
                meta : property.constructor
            })
            
            property.flattenTo(subTarget)
        })
    },
    
    
    composeTo : function (target) {
        var targetProps = target.properties
        
        this.each(function (property, name) {
            var subTarget = targetProps[name] || target.addProperty(name, {
                meta : property.constructor
            })
            
            property.composeTo(subTarget)
        })
    },
    
    
    
    deCompose : function () {
        this.eachR(function (property) {
            property.open()
        })
        
        Joose.Managed.PropertySet.Composition.superClass.deCompose.call(this)
    },
    
    
    reCompose : function () {
        Joose.Managed.PropertySet.Composition.superClass.reCompose.call(this)
        
        this.each(function (property) {
            property.close()
        })
    },
    
    
    unapply : function (from) {
        this.eachR(function (property) {
            property.unapply(from)
        })
    }
    
    
    
}).c
;
Joose.Managed.Stem = new Joose.Proto.Class('Joose.Managed.Stem', {
    
    isa                  : Joose.Managed.PropertySet.Composition,
    
    targetMeta           : null,
    
    attributesMC         : Joose.Managed.StemElement.Attributes,
    methodsMC            : Joose.Managed.StemElement.Methods,
    requirementsMC       : Joose.Managed.StemElement.Requirements,
    methodsModifiersMC   : Joose.Managed.StemElement.MethodModifiers,
    
    processOrder         : [ 'attributes', 'methods', 'requirements', 'methodsModifiers'],
    
    
    initialize : function (props) {
        Joose.Managed.Stem.superClass.initialize.call(this, props)
        
        var targetMeta = this.targetMeta
        
        this.addProperty('attributes', {
            meta : this.attributesMC,
            targetMeta : targetMeta
        })
        
        this.addProperty('methods', {
            meta : this.methodsMC,
            targetMeta : targetMeta
        })
        
        this.addProperty('requirements', {
            meta : this.requirementsMC,
            targetMeta : targetMeta
        })
        
        this.addProperty('methodsModifiers', {
            meta : this.methodsModifiersMC,
            targetMeta : targetMeta
        })
    },
    
    
    cloneProps : function () {
        var props = Joose.Managed.Stem.superClass.cloneProps.call(this)
        
        props.targetMeta = this.targetMeta
        
        return props
    },
    
    
    cleanClone : function (name) {
        var emptyClassMeta = new this.targetMeta.constructor()
        
        var props = this.cloneProps()
        
        props.properties = {}
        props.targetMeta = emptyClassMeta
        
        return new this.constructor(props)
        
//        var clone = this.clone(name)
//        
////        clone.properties = {}
//        
//        return clone
        
        
//        var emptyClassMeta = new this.targetMeta.constructor()
//        
//        return new this.constructor({
//            name        : name || this.name,
//            targetMeta  : emptyClassMeta
//        })
    },
    
    
    reCompose : function () {
        this.prepareApply(this.targetMeta.c)
        
        Joose.Managed.Stem.superClass.reCompose.call(this)
        
        this.apply(this.targetMeta.c)
    },
    
    
    deCompose : function () {
        this.unapply(this.targetMeta.c)
        
        Joose.Managed.Stem.superClass.deCompose.call(this)
    }
    
    
}).c
;
Joose.Managed.Builder = new Joose.Proto.Class('Joose.Managed.Builder', {
    
    //points to meta
    targetMeta : null,
    
    
    initialize : function (props) {
        Joose.Managed.Builder.superClass.initialize.call(this, props)
    },
    
    
    _buildStart : function (targetClassMeta, props) {
        targetClassMeta.stem.open()
    },
    
    
    _extend : function (props) {
        if (Joose.O.isEmpty(props)) return
        
        var targetMeta = this.targetMeta
        
        this._buildStart(targetMeta, props)
        
        Joose.O.eachSafe(props, function (value, name) {
            var handler = this[name]
            
            if (!handler) throw "Unknow builder [" + name + "] was used during extending of [" + targetMeta.c + "]"
            
            handler.call(this, targetMeta, value)
        }, this)
        
        this._buildComplete(targetMeta, props)
    },
    

    _buildComplete : function (targetClassMeta, props) {
        targetClassMeta.stem.close()
    },
    
    
    methods : function (targetClassMeta, info) {
        Joose.O.eachSafe(info, function (value, name) {
            targetClassMeta.addMethod(name, value)
        }, this)
    },
    

    removeMethods : function (targetClassMeta, info) {
        Joose.A.each(info, function (name) {
            targetClassMeta.removeMethod(name)
        }, this)
    },
    
    
    have : function (targetClassMeta, info) {
        Joose.O.eachSafe(info, function (value, name) {
            targetClassMeta.addAttribute(name, value)
        }, this)
    },
    
    
    havenot : function (targetClassMeta, info) {
        Joose.A.each(info, function (name) {
            targetClassMeta.removeAttribute(name)
        }, this)
    },
    

    havent : function (targetClassMeta, info) {
        this.havenot(targetClassMeta, info)
    },
    
    
    after : function (targetClassMeta, info) {
        Joose.O.each(info, function (value, name) {
            targetClassMeta.addMethodModifier(name, value, Joose.Managed.Property.MethodModifier.After)
        }, this)
    },
    
    
    before : function (targetClassMeta, info) {
        Joose.O.each(info, function (value, name) {
            targetClassMeta.addMethodModifier(name, value, Joose.Managed.Property.MethodModifier.Before)
        }, this)
    },
    
    
    override : function (targetClassMeta, info) {
        Joose.O.each(info, function (value, name) {
            targetClassMeta.addMethodModifier(name, value, Joose.Managed.Property.MethodModifier.Override)
        }, this)
    },
    
    
    around : function (targetClassMeta, info) {
        Joose.O.each(info, function (value, name) {
            targetClassMeta.addMethodModifier(name, value, Joose.Managed.Property.MethodModifier.Around)
        }, this)
    },
    
    
    augment : function (targetClassMeta, info) {
        Joose.O.each(info, function (value, name) {
            targetClassMeta.addMethodModifier(name, value, Joose.Managed.Property.MethodModifier.Augment)
        }, this)
    },
    
    
    removeModifier : function (targetClassMeta, info) {
        Joose.A.each(info, function (name) {
            targetClassMeta.removeMethodModifier(name)
        }, this)
    },
    
    
    does : function (targetClassMeta, info) {
        Joose.A.each(Joose.O.wantArray(info), function (desc) {
            targetClassMeta.addRole(desc)
        }, this)
    },
    

    doesnot : function (targetClassMeta, info) {
        Joose.A.each(Joose.O.wantArray(info), function (desc) {
            targetClassMeta.removeRole(desc)
        }, this)
    },
    
    
    doesnt : function (targetClassMeta, info) {
        this.doesnot(targetClassMeta, info)
    }
    
    
}).c;
Joose.Managed.Class = new Joose.Proto.Class('Joose.Managed.Class', {
    
    isa                         : Joose.Proto.Class,
    
    stem                        : null,
    stemClass                   : Joose.Managed.Stem,
    
    builder                     : null,
    builderClass                : Joose.Managed.Builder,
    
    
    finalize: function (extend) {
        Joose.Managed.Class.superClass.finalize.call(this, extend)
        
        this.stem.close()
    },
    
    
    processStem : function () {
        Joose.Managed.Class.superClass.processStem.call(this)
        
        this.builder    = new this.builderClass({ targetMeta : this })
        this.stem       = new this.stemClass({ name : this.name, targetMeta : this })
        
        var builderClass = this.getAttributedClass('builderClass')
        if (builderClass) this.addAttribute('builderClass', this.subClassOf(builderClass))
        
        var stemClass = this.getAttributedClass('stemClass')
        if (stemClass) this.addAttribute('stemClass', this.subClassOf(stemClass))
    },
    
    
    extend : function (props) {
        if (props.builder) {
            this.getBuilderTarget().meta.extend(props.builder)
            delete props.builder
        }
        
        if (props.stem) {
            this.getStemTarget().meta.extend(props.stem)
            delete props.stem
        }
        
        this.builder._extend(props)
    },
    
    
    getBuilderTarget : function () {
        var builderClass = this.getAttributedClass('builderClass')
        if (!builderClass) throw "Attempt to extend a builder on non-meta class"
        
        return builderClass
    },
    

    getStemTarget : function () {
        var stemClass = this.getAttributedClass('stemClass')
        if (!stemClass) throw "Attempt to extend a stem on non-meta class"
        
        return stemClass
    },
    
    
    getAttributedClass : function (attributeName) {
        var attrClass = this.getAttribute(attributeName)
        if (attrClass instanceof Joose.Managed.Property.Attribute) attrClass = attrClass.value
        
        return attrClass
    },
    
    
    addMethodModifier: function (name, func, type) {
        var props = {}
        props.init = func
        props.meta = type
        
        return this.stem.properties.methodsModifiers.addProperty(name, props)
    },
    
    
    removeMethodModifier: function (name) {
        return this.stem.properties.methodsModifiers.removeProperty(name)
    },
    
    
    addMethod: function (name, func, props) {
        props = props || {}
        props.init = func
        
        return this.stem.properties.methods.addProperty(name, props)
    },
    
    
    addAttribute: function (name, init, props) {
        props = props || {}
        props.init = init
        
        return this.stem.properties.attributes.addProperty(name, props)
    },
    
    
    removeMethod : function (name) {
        return this.stem.properties.methods.removeProperty(name)
    },

    
    removeAttribute: function (name) {
        return this.stem.properties.attributes.removeProperty(name)
    },
    
    
    hasMethod: function (name) {
        return this.stem.properties.methods.haveProperty(name)
    },
    
    
    hasAttribute: function (name) { 
        return this.stem.properties.attributes.haveProperty(name)
    },
    
    
    hasOwnMethod: function (name) {
        return this.stem.properties.methods.haveOwnProperty(name)
    },
    
    
    hasOwnAttribute: function (name) { 
        return this.stem.properties.attributes.haveOwnProperty(name)
    },
    

    getMethod : function (name) {
        return this.stem.properties.methods.getProperty(name)
    },
    
    
    getAttribute : function (name) {
        return this.stem.properties.attributes.getProperty(name)
    },
    
    
    //XXX method need sanitizing
    addRole : function () {
        Joose.A.each(arguments, function (arg) {
            //instanceof Class to allow treat classes as roles
            var role = (arg.meta instanceof Joose.Managed.Class) ? arg : arg.role
            
            if (role.meta.builderRole) this.getBuilderTarget().meta.extend({
                does : [ role.meta.builderRole ]
            })
            
            if (role.meta.stemRole) this.getStemTarget().meta.extend({
                does : [ role.meta.stemRole ]
            })
            
            var desc = arg
            
            //instanceof Class to allow treat classes as roles
            if (!(desc.meta instanceof Joose.Managed.Class)) {
                desc.propertySet = desc.role.meta.stem
                delete desc.role
            } else
                desc = desc.meta.stem
            
            this.stem.addComposeInfo(desc)
        }, this)
    },
    
    
    removeRole : function () {
        Joose.A.each(arguments, function (role) {
            
            if (role.meta.builderRole) this.getBuilderTarget().meta.extend({
                doesnt : [ role.meta.builderRole ]
            })
            
            if (role.meta.stemRole) this.getStemTarget().meta.extend({
                doesnt : [ role.meta.stemRole ]
            })
            
            
            this.stem.removeComposeInfo(role.meta.stem)
        }, this)
    },
    
    
    getRoles : function () {
        var roles = []
        
        Joose.A.each(this.stem.composedFrom, function (composeDesc) {
            //compose descriptor can contain 'alias' and 'exclude' fields, in this case actual reference is stored
            //into 'propertySet' field
            if (!(composeDesc instanceof Joose.Managed.PropertySet)) composeDesc = composeDesc.propertySet
            
            roles.push(composeDesc.targetMeta.c)
        })
        
        return roles
    },
    
    
    does : function (role) {
        var myRoles = this.getRoles()
        for (var i = 0; i < myRoles.length; i++) if (role == myRoles[i]) return true
        
        for (var i = 0; i < myRoles.length; i++) if (myRoles[i].meta.does(role)) return true
        
        var superMeta = this.superClass.meta
        
        if (this.superClass != Joose.Proto.Empty && superMeta.meta.hasMethod('does')) return superMeta.does(role)
        
        return false
    },
    
    
    getMethods : function () {
        return this.stem.properties.methods
    },
    
    
    getAttributes : function () {
        return this.stem.properties.attributes
    }
    
    
}).c;
Joose.Managed.Role = new Joose.Managed.Class('Joose.Managed.Role', {
    
    isa                         : Joose.Managed.Class,
    
    have : {
        defaultSuperClass       : Joose.Proto.Empty,
        
        builderRole             : null,
        stemRole                : null
    },
    
    
    methods : {
        
        defaultConstructor: function () {
            return function () {
                throw "Roles cant be instantiated"
            }
        },
        

        processSuperClass : function () {
            if (this.superClass != this.defaultSuperClass) throw "Roles cant inherit from anything"
        },
        
        
        getBuilderTarget : function () {
            if (!this.builderRole) this.builderRole = new this.constructor().c
            
            return this.builderRole
        },
        
    
        getStemTarget : function () {
            if (!this.stemRole) this.stemRole = new this.constructor().c
            
            return this.stemRole
        },
        
    
        hasOwnMethod: function (name) { 
            return this.hasMethod(name)
        },
        
        
        hasOwnAttribute: function (name) { 
            return this.hasAttribute(name)
        },
        
    
        addRequirement : function (methodName) {
            this.stem.properties.requirements.addProperty(methodName, {})
        }
        
    },
    

    stem : {
        methods : {
            prepareApply : function () {
            },
            
            
            apply : function () {
            },
            
            
            unapply : function () {
            }
        }
    },
    
    
    builder : {
        methods : {
            requires : function (targetClassMeta, info) {
                Joose.A.each(info, function (methodName) {
                    targetClassMeta.addRequirement(methodName)
                }, this)
            }
        }
    }
    
}).c;
Joose.Managed.Property.MetaRole = new Joose.Proto.Class('Joose.Managed.Property.MetaRole', {
    
    isa : Joose.Managed.Property
    
}).c;
Joose.Managed.StemElement.MetaRoles = new Joose.Proto.Class('Joose.Managed.StemElement.MetaRoles', {

    //inherit the same behavior during composition and flattening
    isa                         : Joose.Managed.StemElement.Requirements,
    
    propertyMetaClass           : Joose.Managed.Property.MetaRole,
    
    
    apply : function (targetClass) {
        if (Joose.O.isEmpty(this.properties)) return
        
        var metaRoles = []
        
        this.each(function (property) {
            metaRoles.push(property.value)
        })
        
        var metaInstance = targetClass.meta
        
        metaInstance.detach()
        
        metaInstance.meta.extend({
            does : metaRoles
        })
    },
    
    
    unapply : function (from) {
        if (Joose.O.isEmpty(this.properties)) return
        
        from.meta.attach()
    },
    
    
    reCompose : function () {
        //commenting this, not needed stage
        //this.prepareApply(this.targetMeta.c)
        
        Joose.Managed.StemElement.MetaRoles.superClass.reCompose.call(this)
        
        this.apply(this.targetMeta.c)
    },
    
    
    deCompose : function () {
        this.unapply(this.targetMeta.c)
        
        Joose.Managed.StemElement.MetaRoles.superClass.deCompose.call(this)
    }
    
    
}).c;
Joose.Managed.MetaRole = new Joose.Managed.Role('Joose.Managed.MetaRole', {
    
    have : {
        metaRoles : null
    },
    
    
    builder : {
        
        override : {
            
            _extend : function (props) {
                var targetMeta = this.targetMeta
                
                this._buildStart(targetMeta, props)
                
                props = props || {}
                
                
                targetMeta.metaRoles.open()
                
                Joose.A.each([ 'trait', 'traits', 'removeTrait', 'removeTraits', 'metaRole', 'metaRoles', 'removeMetaRole', 'removeMetaRoles', 'does', 'doesnot', 'doesnt' ], function (builder) {
                    if (props[builder]) {
                        this[builder](targetMeta, props[builder])
                        delete props[builder]
                    }
                }, this)
                
                targetMeta.metaRoles.close()
                
                this.SUPER(props)
                
                this._buildComplete(targetMeta, props)
            }
        },
        
        
        methods : {
            
            trait : function () {
                this.metaRoles.apply(this, arguments)
            },
            
            
            traits : function () {
                this.metaRoles.apply(this, arguments)
            },
            
            
            metaRole : function () {
                this.metaRoles.apply(this, arguments)
            },
            
            
            removeTrait : function () {
                this.removeMetaRoles.apply(this, arguments)
            },
             
            
            removeTraits : function () {
                this.removeMetaRoles.apply(this, arguments)
            },
            
            
            removeMetaRole : function () {
                this.removeMetaRoles.apply(this, arguments)
            },
            
            
            metaRoles : function (targetClassMeta, info) {
                
                Joose.A.each(Joose.O.wantArray(info), function (metaRole) {
                    
                    targetClassMeta.metaRoles.addProperty(metaRole.meta.name, { init : metaRole })
                })
            },
            
            
            removeMetaRoles : function (targetClassMeta, info) {
                
                Joose.A.each(Joose.O.wantArray(info), function (metaRole) {
                    
                    targetClassMeta.metaRoles.removeProperty(metaRole.meta.name)
                })
            } 
        }
            
    },
    
    
    before : {
        
        addRole : function () {
            
            Joose.A.each(arguments, function (arg) {
                var role = (arg.meta instanceof Joose.Managed.Class) ? arg : arg.role
                
                if (role.meta.meta.hasAttribute('metaRoles') && role.meta.metaRoles) this.metaRoles.addComposeInfo(role.meta.metaRoles)
            }, this)
            
        },
        
        
        removeRole : function () {
            
            Joose.A.each(arguments, function (role) {
                if (role.meta.meta.hasAttribute('metaRoles') && role.meta.metaRoles) this.metaRoles.removeComposeInfo(role.meta.metaRoles)
            }, this)
            
        }
        
    },
    
    
    after : {
        
        processSuperClass : function () {
            var metaRoles = this.metaRoles = new Joose.Managed.StemElement.MetaRoles({
                targetMeta : this
            })
            
            var superClass = this.superClass
            var superMeta = superClass.meta
            
            //manual compose info manipulation.. ok, just hack )
            if (superClass != Joose.Proto.Empty && superClass != Joose.Proto.Object && superMeta.meta.hasAttribute('metaRoles') && superMeta.metaRoles)
                metaRoles.addComposeInfo(superMeta.metaRoles)
                
            //metaRoles are initially closed - they'll be opened in 'extend'
            metaRoles.opened = 0
        }
    }
    
    
}).c
;
Joose.Managed.Attribute = new Joose.Managed.Class('Joose.Managed.Attribute', {
    
    isa : Joose.Managed.Property.Attribute,
    
    have : {
        is              : null,
        
        isPrivate       : null,
        
        role            : null,
        
        publicName      : null,
        setterName      : null,
        getterName      : null,
        
        required        : false
    },
    
    
    override : {
        
        computeValue : function () {
            if (typeof this.init != 'function') this.SUPER()
            
            var isPrivate = /^_/.test(this.name)
            
            this.publicName = this.name.replace(/^_+/, '')
            
            this.isPrivate = this.isPrivate || isPrivate
            
            if (this.isPrivate && !isPrivate) this.name = '__' + this.name
            
            this.setterName = 'set' + Joose.S.uppercaseFirst(this.publicName)
            this.getterName = 'get' + Joose.S.uppercaseFirst(this.publicName)
            
            if (this.is) {
                var methods = {}
                
                if (this.is == 'rw') methods[this.setterName] = this.getSetter()
                if (this.is == 'rw' || this.is == 'ro') methods[this.getterName] = this.getGetter()
                
                this.role = new Joose.Managed.Role('attribute:' + this.name, { methods : methods }).c
            }
        },

        
        prepareApply : function (targetClass) {
            if (this.role) targetClass.meta.extend({
                does : [ this.role ]
            })
        },
        
        
//        apply : function (target) {
//            this.SUPER(target)
//        },
        
        
        unapply : function (from) {
            if (this.role) from.meta.extend({
                doesnt : [ this.role ]
            })
            this.SUPER(from)
        }
        
    },
    
    
    methods : {
        
        getSetter : function () {
            var name = this.name
            
            return function (value) {
                this[name] = value
                return this
            }
        },
        
        
        getGetter : function () {
            var name = this.name
            
            return function () {
                return this[name]
            }
            
        }
        
    }

}).c
;
Joose.Managed.PropertySet.Namespace = new Joose.Proto.Class('Joose.Managed.PropertySet.Namespace', {
    
    isa : Joose.Managed.PropertySet.Containable,
    
    propertyMetaClass : null,
    
    
    computeContainer : function (props) {
        this.container = this.targetMeta.c
    },
    
    
    apply : function (target) {
        this.each(function (property, name) {
            this.container[name] = property
        }, this)
    },
    
    
    unapply : function () {
        this.each(function (property, name) {
            try {
                delete this.container[name]
            } catch(e) {
                this.container[name] = undefined
            }
        }, this)
    },
    
    
    
    prepareApply : function () {
    },
    
    
    addProperty : function (name, value) {
        if (value && value.meta && value.meta.meta.hasAttribute('ns')) value.meta.parentNs = this.targetMeta.ns
        
        return this.container[name] = this.properties[name] = value
    },
    

    haveOwnProperty : function (name) {
        return this.haveProperty(name);// && this.container.hasOwnProperty(name)
    },
    
    
    addPropertyObject : function (object) {
    }
    
    
}).c
;
Joose.Managed.Attribute.Builder = new Joose.Managed.Role('Joose.Managed.Attribute.Builder', {
    
    
    have : {
        defaultAttributeClass : Joose.Managed.Attribute
    },
    
    builder : {
        
        methods : {
            
            has : function (targetClassMeta, info) {
                Joose.O.eachSafe(info, function (props, name) {
                    if (typeof props != 'object' || props == null) props = { init : props }
                    
                    props.meta = props.meta || targetClassMeta.defaultAttributeClass
                    
                    targetClassMeta.addAttribute(name, props.init, props)
                }, this)
            },
            
            
            hasnot : function (targetClassMeta, info) {
                this.havenot(targetClassMeta, info)
            },
            
            
            hasnt : function (targetClassMeta, info) {
                this.hasnot(targetClassMeta, info)
            }
        }
            
    }
    
}).c
;
Joose.Managed.My = new Joose.Managed.Role('Joose.Managed.My', {
    
    have : {
        myClass                         : null
    },
    
    
    methods : {
        createMy : function (extend) {
            var thisMeta = this.meta
            var isRole = this instanceof Joose.Managed.Role
            
            var myExtend = extend.my || {}
            delete extend.my
            
            var myExtendBody = myExtend.body
            var me = this
            
            //deferring creating instance to creating a class itself (which may be async)
            myExtend.body = function (createdClass) {
                me.c.my = isRole ? createdClass : new createdClass({ targetMeta : me })
                
                if (myExtendBody) myExtendBody.call(this, createdClass)
            }
            
            if (!isRole) myExtend.isa = myExtend.isa || this.superClass.meta.myClass || thisMeta.defaultSuperClass.meta.myClass || thisMeta.defaultSuperClass
            myExtend.meta = myExtend.meta || this.constructor
            
            this.myClass = Class(myExtend)
        }
    },
    
    
    before : {
        
        extend : function (props) {
            if (!this.myClass && this.superClass.meta.myClass) this.createMy(props)
            
            if (props.my)
                if (!this.myClass) 
                    this.createMy(props)
                else {
                    this.myClass.meta.extend(props.my)
                    delete props.my
                }
        },
        
        
        addRole : function () {
            var myStem
            
            Joose.A.each(arguments, function (arg) {
                //instanceof Class to allow treat classes as roles
                var role = (arg.meta instanceof Joose.Managed.Class) ? arg : arg.role
                
                if (role.meta.meta.hasAttribute('myClass') && role.meta.myClass) {
                    
                    if (!this.myClass) {
                        this.createMy({
                            my : {
                                does : role.meta.myClass
                            }
                        })
                        return
                    }
                    
                    myStem = this.myClass.meta.stem
                    if (!myStem.opened) myStem.open()
                    
                    myStem.addComposeInfo(role.my.meta.stem)
                }
            }, this)
            
            if (myStem) myStem.close()
        },
        
        
        removeRole : function () {
            if (!this.myClass) return
            
            var myStem = this.myClass.meta.stem
            myStem.open()
            
            Joose.A.each(arguments, function (role) {
                if (role.meta.meta.hasAttribute('myClass') && role.meta.myClass) myStem.removeComposeInfo(role.my.meta.stem)
            }, this)
            
            myStem.close()
        }
        
    }
    
}).c;
Joose.Namespace = function () { throw "Modules may not be instantiated." }

Joose.Namespace.Able = new Joose.Managed.Role('Joose.Namespace.Able', {

    have : {
        parentNs                : null,
        
        localName               : null,
        
        ns                      : null,
        
        bodyFunc                : null
    },
    
    
    before : {
        extend : function (extend) {
            this.bodyFunc = extend.body
            delete extend.body
        }
    },
    
    
    after: {
        //at this point targetMeta will contain 'c' which is a container for Joose.Managed.PropertySet.Namespace
        adaptConstructor: function (extend) {
            this.localName = (this.name || '').split('.').pop()
            
            //XXX check that 'ns' is overwritten after planting
            this.ns = new Joose.Managed.PropertySet.Namespace({ name : this.name, targetMeta : this })
        },

        
        extend : function () {
            this.processBody()
        },
        
        
        finalize : function () {
            this.processBody()
        }
        
    },
    
    
    methods : {
        
        processBody : function () {
            if (!this.stem.opened) {
                var bodyFunc = this.bodyFunc
                delete this.bodyFunc
                
                if (bodyFunc) Joose.Namespace.Manager.my.executeIn(this.c, bodyFunc, this.ns.container, [ this.c ])
            }
        }
        
    }
    
}).c;
Joose.Managed.Bootstrap = new Joose.Managed.Role('Joose.Managed.Bootstrap', {
    does   : [ Joose.Managed.MetaRole, Joose.Namespace.Able, Joose.Managed.My, Joose.Managed.Attribute.Builder ]
}).c
;
Joose.Meta = function () { throw "Modules may not be instantiated." }


Joose.Meta.Object = new Joose.Proto.Class('Joose.Meta.Object', {
    
    isa             : Joose.Proto.Object,
    
    initialize : function (config) {
            
        Joose.O.each(this.meta.attributes, function (attribute, name) {
            
            var haveInitValue = config.hasOwnProperty(name)
            
            if (attribute instanceof Joose.Managed.Attribute) {
                var setValue, isSet = false
                
                if (haveInitValue) {
                    setValue = config[name]
                    isSet = true
                } else 
                    if (typeof attribute.init == 'function') {
                        setValue = attribute.init.call(this, name, config)
                        isSet = true
                    }
                
                
                if (isSet)
                    if (this.meta.hasMethod(attribute.setterName)) 
                        this[attribute.setterName].call(this, setValue)
                    else
                        this[name] = setValue
                else 
                    if (attribute.required) throw "Required attribute [" + name + "] is missed during initialization of " + this
                
            } else 
                if (haveInitValue) this[name] = config[name]
            
            
        }, this)
    },
    
    
    detach : function () {
        if (this.isDetached()) return this
        
        var detachedClass = new Joose.Meta.Class.Detached(null, { isa : this.constructor }).c
        
        detachedClass.meta.stem.open()
        
        detachedClass.prototype = this
        
        this.meta = detachedClass.meta
        
        var original = this.meta.originalClass = this.constructor
        detachedClass.my = original.my
        
        this.constructor = detachedClass
        
        detachedClass.meta.stem.close()
        
        return this
    },
    
    
    attach : function () {
        if (!this.isDetached()) return this
        
        this.meta.stem.open()
        
        this.constructor.prototype = {}
        
        delete this.constructor
        delete this.meta
        
        //XXX hack for metaroles with custom builders
        if (this.builder && this.builder.isDetached()) this.builder.attach()
        if (this.stem && this.stem.isDetached()) this.stem.attach()
        
        return this
    },
    
    
    isDetached : function () {
        return this.meta instanceof Joose.Meta.Class.Detached 
    }
    
    
}).c;
Joose.Meta.Class = new Joose.Managed.Class('Joose.Meta.Class', {
    
    isa                         : Joose.Managed.Class,
    
    does                        : Joose.Managed.Bootstrap,
    
    have : {
        defaultSuperClass       : Joose.Meta.Object
    },
    
    
    methods : {
        
        detach      : Joose.Meta.Object.meta.methods.detach,
        attach      : Joose.Meta.Object.meta.methods.attach,
        isDetached  : Joose.Meta.Object.meta.methods.isDetached
        
    }
    
}).c

;
Joose.Meta.Role = new Joose.Meta.Class('Joose.Meta.Role', {
    
    isa                         : Joose.Managed.Role,
    
    does                        : Joose.Managed.Bootstrap,
    

    methods : {

        //'to' must be instance 
        apply : function (to) {
            if (!Joose.O.isInstance(to)) throw "Role can be applied only to Joose instance"
            
            if (!to.meta.hasMethod('detach')) throw "Apply failed: Instance [" + to + "] has no 'detach' method"
            
            to.detach()
            
            to.meta.extend({ does : [ this.c ] })
        },
        
        
        //instance remains detached
        unapply : function (from) {
            if (!Joose.O.isInstance(from)) throw "Role can be unapplied only from Joose instance"
            
            if (!(from.meta instanceof Joose.Meta.Class.Detached)) throw "Instance [" + from + "] is not detached"
            
            from.meta.extend({ doesnt : [ this.c ] })
        }
        
        
    }
    
}).c;
Joose.Meta.Class.Detached = new Joose.Meta.Class('Joose.Meta.Class.Detached', {
    
    isa                         : Joose.Meta.Class,
    
    have : {
        originalClass : null
    },
    
    stem : {
        
        have : {
            woAttributes         : [ 'methods', 'requirements', 'methodsModifiers']
        },
        
        override : { 
            
            prepareApply : function (target) {
                this.processOrder = this.woAttributes
                
                this.SUPER(target)
                
                delete this.processOrder
            },
            
            
            apply : function (target) {
                this.processOrder = this.woAttributes
                
                this.SUPER(target)
                
                delete this.processOrder
            },
            
            
            unapply : function (target) {
                this.processOrder = this.woAttributes
                
                this.SUPER(target)
                
                delete this.processOrder
            }
        }
        
    },
    
    
    methods : {
        
        getBuilderTarget : function () {
            var builder = this.c.prototype.builder
            
            return builder.detach()
        },
        
    
        getStemTarget : function () {
            var stem = this.c.prototype.stem
            
            return stem.detach()
        }
        
    }
    
    
}).c;
Joose.Namespace.Keeper = new Joose.Meta.Class('Joose.Namespace.Keeper', {
    
    isa : Joose.Meta.Class,
    
    have : {
        externalConstructor             : null
    },
    
    
    methods: {
        
        defaultConstructor: function () {
            return function () {
                var thisMeta = this.meta
                
                if (thisMeta instanceof Joose.Namespace.Keeper) throw "Module [" + thisMeta.c + "] may not be instantiated."
                
                var externalConstructor = thisMeta.externalConstructor
                
                if (typeof externalConstructor == 'function') {
                    
                    externalConstructor.meta = thisMeta
                    
                    externalConstructor.apply(this, arguments)
                    
                    return
                }
                
                throw "NamespaceKeeper was planted incorrectly."
            }
        },
        
        
        //withClass should be not constructed yet on this stage (see Joose.Proto.Class.construct)
        //however it should already have constructor
        plant: function (withClass) {
            var keeper = this.c
            
            //constructors should assume that constructor is meta.c (not arguments.callee itself) 
            keeper.meta = withClass.meta
            
            keeper.meta.c = keeper
            keeper.meta.externalConstructor = withClass
            
            this.copyNamespaceState(keeper)
        },

        
        copyNamespaceState : function (targetClass) {
            var targetMeta = targetClass.meta
            
            targetMeta.parentNs             = this.parentNs
            targetMeta.localName            = this.localName
            
            targetMeta.ns                   = this.ns
        }
        
    }
    
}).c


;
Joose.Namespace.Manager = new Joose.Managed.Class('Joose.Namespace.Manager', {
    
    have : {
        global      : null,
        globalNs    : null,
        
        current     : null
    },
    
    
    methods : {
        
        initialize : function () {
            var global = this.global = new Joose.Namespace.Keeper('').c
            
            var globalNs = this.globalNs = global.meta.ns
            
            globalNs.container      = Joose.top
            global.meta.parentNs    = global
            
            this.current = [ global ]
        },
        
        
        getCurrent: function () {
            return this.current[0]
        },
        
        
        executeIn : function (ns, func, scope, argsArray) {
            var current = this.current
            
            current.unshift(ns)
            var res = func.apply(scope || this, argsArray || [])
            current.shift()
            
            return res
        },
        
        
        earlyCreate : function (name, metaClass, props) {
            var earlyProps = {
                constructorOnly : true
            }
            
            if (props && props.hasOwnProperty('constructor')) {
                earlyProps.constructor = props.constructor
                delete props.constructor
            }
            
            return new metaClass(name, earlyProps).c
        },
        
        
        //this function establishing the full "namespace chain" (including the last element)
        create : function (nsName, metaClass, extend) {
            //if no name provided, then we creating an anonymous class, so just skip all the namespace manipulations
            if (!nsName) return new metaClass(nsName, extend).c
            
            props = extend || {}
            
            var parts = Joose.S.saneSplit(nsName, '.')
            var object  = this.getCurrent()
            var soFar   = Joose.S.saneSplit(object.meta.name, '.')
            
            for(var i = 0; i < parts.length; i++) {
                var part = parts[i]
                var isLast = i == parts.length - 1
                
                if (part == "meta" || part == "my" || !part) throw "Module name [" + nsName + "] may not include a part called 'meta' or 'my' or empty part."
                
                var cur = (object == this.global ? this.global.meta.ns.container : object)[part]//object.meta.ns.getProperty(part)
                
                soFar.push(part)
                var soFarName = soFar.join(".")
                var needFinalize = false
                var nsKeeper
                
                if (typeof cur == "undefined") {
                    if (isLast) {
                        nsKeeper = this.earlyCreate(soFarName, metaClass, props)
                        needFinalize = true
                    } else
                        nsKeeper = new Joose.Namespace.Keeper(soFarName).c
                    
                    if (object.meta) 
                        object.meta.ns.addProperty(nsKeeper.meta.localName, nsKeeper)
                    else
                        object[nsKeeper.meta.localName] = nsKeeper
                    
                    cur = nsKeeper
                } else if (isLast && cur && cur.meta) {
                    //XXX needs cleanup and sanitizing
                    if (cur.meta.constructor == metaClass && extend)
                        cur.meta.extend(props)
                    else if (cur.meta instanceof Joose.Namespace.Keeper && metaClass != Joose.Namespace.Keeper) { 
                        cur.meta.plant(this.earlyCreate(soFarName, metaClass, props))
                        needFinalize = true
                    } 
                    else if (metaClass != Joose.Namespace.Keeper)
                        throw "Re-declaration of class " + soFarName + "with different meta is not allowed"
                } else 
                    if (isLast && !(cur && cur.meta && cur.meta.meta && cur.meta.meta.hasAttribute('ns'))) throw "Trying to setup module " + soFarName + " failed. There is already something: " + cur
                
                if (needFinalize) cur.meta.construct(props)
                    
                object = cur
            }
            
            return object
        },
        
        
        
        //this function establishing the full "namespace chain" (including the last element)
        prepareNamespace : function (nsName) {
            
            var parts = Joose.S.saneSplit(nsName, '.')
            var object  = this.getCurrent()
            var soFar   = Joose.S.saneSplit(object.meta.name, '.')
            
            for(var i = 0; i < parts.length; i++) {
                var part = parts[i]
                
                if (part == "meta" || part == "my" || !part) throw "Module name [" + nsName + "] may not include a part called 'meta' or 'my' or empty part."
                
                var cur = (object == this.global ? this.global.meta.ns.container : object)[part]
                
                soFar.push(part)
                
                if (cur === undefined) {
                    var nsKeeper = new Joose.Namespace.Keeper(soFar.join(".")).c
                    
                    var objectMeta = object.meta
                    
                    if (objectMeta && objectMeta.ns) 
                        objectMeta.ns.addProperty(part, nsKeeper)
                    else
                        object[part] = nsKeeper
                    
                    cur = nsKeeper
                }
                    
                object = cur
            }
            
            if (!(object && object.meta && object.meta.ns)) throw "Trying to setup module " + soFarName + " failed. There is already something: " + object
            
            return object
        },
        
        
        prepareArguments : function (name, props) {
            if (typeof name != 'string') {
                props = name
                name = null
            }
            
            var meta
            
            if (props && props.meta) {
                meta = props.meta
                delete props.meta
            }
            
            return {
                name : name,
                meta : meta,
                props : props
            }
        },
        
        
        getDefaultHelperFor : function (metaClass) {
            return function (name, props) {
                var args = Joose.Namespace.Manager.my.prepareArguments(name, props)
                
                args.meta = args.meta || metaClass
                
                return Joose.Namespace.Manager.my.create(args.name, args.meta, args.props)
            }
        },
        
        
        register : function (helperName, metaClass, func) {
            
            if (this.meta.hasMethod(helperName))
                this.global.meta.ns.addProperty(helperName, function () {
                    return Joose.Namespace.Manager.my[helperName].apply(Joose.Namespace.Manager.my, arguments)
                })
            else {
                var methods = {}
                
                methods[helperName] = func || this.getDefaultHelperFor(metaClass)
                
                this.meta.extend({
                    methods : methods
                })
                
                this.register(helperName)
            }
        },
        
        
        Class : function (name, props) {
            var args = this.prepareArguments(name, props)
            
            if (!args.meta)
                if (props && typeof props.isa == 'function')
                    if (props.isa.meta.isDetached())
                        args.meta = props.isa.meta.meta.originalClass
                    else
                        args.meta = props.isa.meta.constructor
                else
                    args.meta = Joose.Meta.Class
                    
            //to allow delayed meta declaration in nested classes
            //if not a class
            if (!args.meta.meta) args.meta = args.meta()
            
            return Joose.Namespace.Manager.my.create(args.name, args.meta, args.props)
        },
        
        
        Module : function (name, props) {
            if (typeof props == 'function') props = { body : props }    
            
            return Joose.Namespace.Manager.my.create(name, Joose.Namespace.Keeper, props)
        }
        
        
        
    }
    
}).c

Joose.Namespace.Manager.my = new Joose.Namespace.Manager()

Joose.Namespace.Manager.my.register('Class')
Joose.Namespace.Manager.my.register('Role', Joose.Meta.Role)
Joose.Namespace.Manager.my.register('Module');
