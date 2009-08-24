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
    
//    ,
//    eachU : function (obj, func, scope) {
//        if (obj instanceof Array) 
//            Joose.A.each(obj, func, scope)
//        else if (typeof obj == 'object')
//            Joose.O.each(obj, func, scope)
//        else
//            func.call(scope || this, obj)
//    }    
    
}


Joose.Array = function () { return [] }
Joose.Object = function () { return {} }
Joose.Function = function () { return function (){} }

//// Static helpers for functions?
//Joose.F = {
//    emptyFunction   : function () { return function(){} },
//    newArray        : function () { return [] },
//    newObject       : function () { return {} }
//}


//idea copied from Ext, source rewritten
//returns a function, tied to specifiec scope and arguments
//Joose.F.createDelegate = function (func, scope, argsArray, appendArgs) {
//    return function () {
//        var thisArgs
//        if (appendArgs) {
//            thisArgs = Array.prototype.slice(arguments).concat(argsArray)
//        } else {
//            thisArgs = argsArray
//        }
//        func.apply(scope || joose.top, thisArgs)
//    }
//}



//Probably not needed - all system properties like 'isa', 'constructor' etc are processed in implicit order

// Rhino is the only popular JS engine that does not traverse objects in insertion order
// Check for Rhino (which uses the global Packages function) and set CHAOTIC_TRAVERSION_ORDER to true
//(function () {
//    
//    if(
//         typeof this["load"] == "function" &&
//         (
//            typeof this["Packages"] == "function" ||
//            typeof this["Packages"] == "object"
//         )
//   ) {
//        joose.CHAOTIC_TRAVERSION_ORDER = true
//   }
//})()


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

 
BUILDING CLASSES WITH MOOSE
===========================

Joose makes every attempt to provide as much convenience as possible during class construction/definition, but still stay out of your way if you want it to. Here are a few items to note when building classes with Joose.

Unless specified with 'isa', any class which uses Joose will inherit from Joose.Proto.Object.

Joose will also manage all attributes (including inherited ones) that are defined with 'has' or 'have'. And (assuming you call new, which is inherited from Joose.Proto.Object) this includes properly initializing all instance slots, setting defaults where appropriate.


PROVIDED METHODS
================

Moose provides a number of methods to all your classes, mostly through the inheritance of Joose.Proto.Object.

  - this.SUPER(arg1, arg2, ...)

Only valid in the scope of usual methods and OVERRIDE method modifiers. Calls a superclass's method with the arguments provided.

  - this.SUPERARG(Array arg)

Only valid in the scope of usual methods and OVERRIDE method modifiers. Calls a superclass's method with the "packed" arguments, provided as array. Usually used as: this.SUPERARG(arguments)

  - this.initialize()

Default 'initialize' method is empty function.

  - this.toString()

Defalt string coercion is string "a ClassName", where ClassName is name instance's class.
 
  - this.detach()

Detaches the instance from its class. See more details [here][!!]

  - this.attach()

Attaches the instance back to its class. See more details [here][!!]

  - this.isDetached()

Returns boolean value, indicating whether this instance is detached from its class.

    
METACLASS
=========

When you use Joose, you can specify which metaclass to use:

    Class("Point", {
    
        meta : 
    
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


You can also specify traits which will be applied to your metaclass:

    use Joose -traits => 'My::Trait';

This is very similar to the attribute traits feature. When you do this, your class's meta object will have the specified traits applied to it. See "Metaclass and Trait Name Resolution" for more details.
Metaclass and Trait Name Resolution

By default, when given a trait name, Joose simply tries to load a class of the same name. If such a class does not exist, it then looks for for a class matching Joose::Meta::$type::Custom::Trait::$trait_name. The $type variable here will be one of Attribute or Class, depending on what the trait is being applied to.

If a class with this long name exists, Joose checks to see if it has the method register_implementation. This method is expected to return the real class name of the trait. If there is no register_implementation method, it will fall back to using Joose::Meta::$type::Custom::Trait::$trait as the trait name.

The lookup method for metaclasses is the same, except that it looks for a class matching Joose::Meta::$type::Custom::$metaclass_name.

If all this is confusing, take a look at Joose::Cookbook::Meta::Recipe3, which demonstrates how to create an attribute trait.    
    

EXTENDING AND EMBEDDING MOOSE ^

To learn more about extending Joose, we recommend checking out the "Extending" recipes in the Joose::Cookbook, starting with Joose::Cookbook::Extending::Recipe1, which provides an overview of all the different ways you might extend Joose.
Joose->init_meta(for_class => $class, base_class => $baseclass, metaclass => $metaclass)

The init_meta method sets up the metaclass object for the class specified by for_class. This method injects a a meta accessor into the class so you can get at this object. It also sets the class's superclass to base_class, with Joose::Object as the default.

init_meta returns the metaclass object for $class.

You can specify an alternate metaclass with the metaclass option.

For more detail on this topic, see Joose::Cookbook::Extending::Recipe2.

This method used to be documented as a function which accepted positional parameters. This calling style will still work for backwards compatibility, but is deprecated.
import

Joose's import method supports the Sub::Exporter form of {into => $pkg} and {into_level => 1}.

NOTE: Doing this is more or less deprecated. Use Joose::Exporter instead, which lets you stack multiple Joose.pm-alike modules sanely. It handles getting the exported functions into the right place for you.
throw_error

An alias for confess, used by internally by Joose.
METACLASS COMPATIBILITY AND MOOSE ^

Metaclass compatibility is a thorny subject. You should start by reading the "About Metaclass compatibility" section in the Class::MOP docs.

Joose will attempt to resolve a few cases of metaclass incompatibility when you set the superclasses for a class, unlike Class::MOP, which simply dies if the metaclasses are incompatible.

In actuality, Joose fixes incompatibility for all of a class's metaclasses, not just the class metaclass. That includes the instance metaclass, attribute metaclass, as well as its constructor class and destructor class. However, for simplicity this discussion will just refer to "metaclass", meaning the class metaclass, most of the time.

Joose has two algorithms for fixing metaclass incompatibility.

The first algorithm is very simple. If all the metaclass for the parent is a subclass of the child's metaclass, then we simply replace the child's metaclass with the parent's.

The second algorithm is more complicated. It tries to determine if the metaclasses only "differ by roles". This means that the parent and child's metaclass share a common ancestor in their respective hierarchies, and that the subclasses under the common ancestor are only different because of role applications. This case is actually fairly common when you mix and match various MooseX::* modules, many of which apply roles to the metaclass.

If the parent and child do differ by roles, Joose replaces the metaclass in the child with a newly created metaclass. This metaclass is a subclass of the parent's metaclass, does all of the roles that the child's metaclass did before being replaced. Effectively, this means the new metaclass does all of the roles done by both the parent's and child's original metaclasses.

Ultimately, this is all transparent to you except in the case of an unresolvable conflict.
The MooseX:: namespace

Generally if you're writing an extension for Joose itself you'll want to put your extension in the MooseX:: namespace. This namespace is specifically for extensions that make Joose better or different in some fundamental way. It is traditionally not for a package that just happens to use Joose. This namespace follows from the examples of the LWPx:: and DBIx:: namespaces that perform the same function for LWP and DBI respectively.
CAVEATS ^

    * It should be noted that super and inner cannot be used in the same method. However, they may be combined within the same class hierarchy; see t/014_override_augment_inner_super.t for an example.

      The reason for this is that super is only valid within a method with the override modifier, and inner will never be valid within an override method. In fact, augment will skip over any override methods when searching for its appropriate inner.

      This might seem like a restriction, but I am of the opinion that keeping these two features separate (yet interoperable) actually makes them easy to use, since their behavior is then easier to predict. Time will tell whether I am right or not (UPDATE: so far so good).

GETTING HELP ^

We offer both a mailing list and a very active IRC channel.

The mailing list is moose@perl.org. You must be subscribed to send a message. To subscribe, send an empty message to moose-subscribe@perl.org

You can also visit us at #moose on irc.perl.org. This channel is quite active, and questions at all levels (on Joose-related topics ;) are welcome.
ACKNOWLEDGEMENTS ^

I blame Sam Vilain for introducing me to the insanity that is meta-models.
I blame Audrey Tang for then encouraging my meta-model habit in #perl6.
Without Yuval "nothingmuch" Kogman this module would not be possible, and it certainly wouldn't have this name ;P
The basis of the TypeContraints module was Rob Kinyon's idea originally, I just ran with it.
Thanks to mst & chansen and the whole #moose posse for all the early ideas/feature-requests/encouragement/bug-finding.
Thanks to David "Theory" Wheeler for meta-discussions and spelling fixes.

SEE ALSO ^

http://www.iinteractive.com/moose

    This is the official web home of Joose, it contains links to our public SVN repository as well as links to a number of talks and articles on Joose and Joose related technologies.
The Joose is flying, a tutorial by Randal Schwartz

    Part 1 - http://www.stonehenge.com/merlyn/LinuxMag/col94.html

    Part 2 - http://www.stonehenge.com/merlyn/LinuxMag/col95.html
Several Joose extension modules in the MooseX:: namespace.

    See http://search.cpan.org/search?query=MooseX:: for extensions.
Joose stats on ohloh.net - http://www.ohloh.net/projects/moose

Books

The Art of the MetaObject Protocol

    I mention this in the Class::MOP docs too, this book was critical in the development of both modules and is highly recommended.

Papers

http://www.cs.utah.edu/plt/publications/oopsla04-gff.pdf

    This paper (suggested by lbr on #moose) was what lead to the implementation of the super/override and inner/augment features. If you really want to understand them, I suggest you read this.

BUGS ^

All complex software has bugs lurking in it, and this module is no exception.

Please report any bugs to bug-moose@rt.cpan.org, or through the web interface at http://rt.cpan.org.
FEATURE REQUESTS ^

We are very strict about what features we add to the Joose core, especially the user-visible features. Instead we have made sure that the underlying meta-system of Joose is as extensible as possible so that you can add your own features easily.

That said, occasionally there is a feature needed in the meta-system to support your planned extension, in which case you should either email the mailing list (moose@perl.org) or join us on IRC at irc://irc.perl.org/#moose to discuss. The Joose::Manual::Contributing has more detail about how and when you can contribute.
AUTHOR ^

Joose is an open project, there are at this point dozens of people who have contributed, and can contribute. If you have added anything to the Joose project you have a commit bit on this file and can add your name to the list.
CABAL

However there are only a few people with the rights to release a new version of Joose. The Joose Cabal are the people to go to with questions regarding the wider purview of Joose, and help out maintaining not just the code but the community as well.

Stevan (stevan) Little <stevan@iinteractive.com>

Yuval (nothingmuch) Kogman

Shawn (sartak) Moore <sartak@bestpractical.com>

Dave (autarch) Rolsky <autarch@urth.org>
OTHER CONTRIBUTORS

Aankhen

Adam (Alias) Kennedy

Anders (Debolaz) Nor Berle

Nathan (kolibrie) Gray

Christian (chansen) Hansen

Hans Dieter (confound) Pearcey

Eric (ewilhelm) Wilhelm

Guillermo (groditi) Roditi

Jess (castaway) Robinson

Matt (mst) Trout

Robert (phaylon) Sedlacek

Robert (rlb3) Boone

Scott (konobi) McWhirter

Shlomi (rindolf) Fish

Chris (perigrin) Prather

Wallace (wreis) Reis

Jonathan (jrockway) Rockway

Piotr (dexter) Roszatycki

Sam (mugwump) Vilain

Cory (gphat) Watson

Dylan Hardison (doc fixes)

... and many other #moose folks
COPYRIGHT AND LICENSE ^

Copyright 2006-2009 by Infinity Interactive, Inc.

http://www.iinteractive.com

This library is free software; you can redistribute it and/or modify it under the same terms as Perl itself.


[1]: Joose/Manual.html
[2]: Joose/Cookbook.html
[3]: http://openjsan.org/index.html

*/
