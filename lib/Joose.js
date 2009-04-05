Joose = function(){ throw "Modules may not be instantiated." };

Joose.top = this;

// Static helpers for Arrays
Joose.A = {

    each : function (array, func, scope) {
        for(var i = 0; i < array.length; i++) {
            func.call(scope || this, array[i], i)
        }
    },
    
    exists : function (array, value) {
        for(var i = 0; i < array.length; i++) {
            if(array[i] == value) {
                return true
            }
        }
        return false
    },
    
    concat : function (source, array) {
        source.push.apply(source, array)
        return source
    },
    
    grep : function (array, func) {
        var a = [];
        Joose.A.each(array, function (t) {
            if(func(t)) {
                a.push(t)
            }
        })
        return a
    },
    
    remove : function (array, removeEle) {
        var a = [];
        Joose.A.each(array, function (t) {
            if(t !== removeEle) {
                a.push(t)
            }
        })
        return a
    }
    
};

// Static helpers for Strings
Joose.S = {
	
	saneSplit : function(str, delimeter) {
        var res = (str || '').split(delimeter);
        if (res.length == 1 && !res[0]) res.shift();
        
        return res;
	}

//    uppercaseFirst : function (string) { 
//        var first = string.substr(0,1);
//        var rest  = string.substr(1,string.length-1);
//        first = first.toUpperCase()
//        return first + rest;
//    },
//    
//    isString : function (thing) { 
//        return typeof thing == "string";
//    },
//    
//    dieIfString : function (thing) {
//        if(Joose.S.isString(thing)) {
//            throw new TypeError("Parameter must not be a string.")
//        }
//    }
    
};


// Static helpers for objects
Joose.O = {

    each : function (object, func, scope) {
        for(var i in object) func.call(scope || this, object[i], i);
        
        if (Joose.is_IE) {
            Joose.A.each([ 'toString', 'constructor', 'hasOwnProperty' ], function(el){
                if (object.hasOwnProperty(el)) func.call(scope || this, object[el], el); 
            })
        } 
    },
    
    
    eachSafe : function (object, func, scope) {
        Joose.O.each(object, function(value, name){
            if (object.hasOwnProperty(name)) func.call(scope || this, value, name)
        }, scope);
    },
    
    
    copy : function (source, target) {
        Joose.O.each(source, function (value, name) { target[name] = value })
        return target
    },
    
    
    copySafe : function (source, target) {
        Joose.O.eachSafe(source, function (value, name) { target[name] = value })
        return target
    },
    
    
    getMutableCopy : function (object) {
        var f = function(){};
        f.prototype = object;
        return new f();
    },
    
    
    extend : function (target, source) {
        return Joose.O.copy(source, target);
    },
    
    
    isEmpty : function (object) {
		for (var i in object) if (object.hasOwnProperty(i)) return false;
		
		return true;
    }
    
};


//// Static helpers for functions?
//Joose.F = {
//    emptyFunction   : function () { return function(){} },
//    newArray        : function () { return [] },
//    newObject       : function () { return {} }
//};



//idea copied from Ext, source rewritten
//returns a function, tied to specifiec scope and arguments
//Joose.F.createDelegate = function (func, scope, argsArray, appendArgs) {
//    return function () {
//        var thisArgs;
//        if (appendArgs) {
//            thisArgs = Array.prototype.slice(arguments).concat(argsArray)
//        } else {
//            thisArgs = argsArray
//        }
//        func.apply(scope || joose.top, thisArgs)
//    }
//}


//Joose.prototype = {
//    
//    addToString: function (object, func) {
//        object.toString = func;
//    },
//    
//    /*
//     * Differentiates between instances and classes
//     */
//    isInstance: function(obj) {
//        if(!obj.meta) throw "isInstance only works with Joose objects and classes."
//        
//        return obj.constructor === obj.meta.c;
//    },
//    
//    init: function () {
//        this.builder = new Joose.Builder();
//        this.builder.globalize()
//    }
//
//};


//this.joose = new Joose();

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

try {
    Joose.is_IE = /msie/i.test(navigator.userAgent) && !/opera/i.test(navigator.userAgent);
} catch (e) {
    Joose.is_IE = false;
}