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
    
    Class("Point3D", {
    
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
    
    var point = new Point3D()


DESCRIPTION
===========

Joose is a self-hosting meta object system for JavaScript with support for classes, inheritance, mixins, traits (aka Roles), method modifiers and much more.

Joose makes object-oriented programming with JavaScript easy, declarative and very productive. The Joose meta-object system is multi-paradigm. 
It supports class-based and prototype-based programming styles as well as class-based inheritance and role-based extention.

The Joose framework has been successfully used in multiple production systems for twelve months now and has been proven to be very stable. 
Joose is being tested using an automated unit-test suite that is being run in all major browsers (Firefox, IE, Safari, Opera and Chrome).

To get startet check out how programming with Joose compared to standard JavaScript or read the getting started guide. 


New to Joose?
-------------

If you're new to Joose, the best place to start is the [Joose::Manual][1] docs, followed by the [Joose::Cookbook][2]. The intro will show you what Joose is, and how it makes JavaScript OO better.

The cookbook recipes on Joose basics will get you up to speed with many of Joose's features quickly. Once you have an idea of what Joose can do, you can use the API documentation to get more detail on features which interest you.

Joose Extensions
----------------

The JooseX:: namespace is the official place to find Joose extensions. These extensions can be found on the [JSAN][3]. 

[1]: Joose/Manual.html
[2]: Joose/Cookbook.html
[3]: http://openjsan.org/index.html

*/
