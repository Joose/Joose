var joosetop = this;

//XXX move Joose to namespace-compat function
Joose = function () {
    this.top             = joosetop;
    
    this.anonymouseClassCounter = 0;
};

// Static helpers for Arrays
Joose.A = {};
Joose.A.each = function (array, func, scope) {
    for(var i = 0; i < array.length; i++) {
        func.call(scope || this, array[i], i)
    }
}
Joose.A.exists = function (array, value) {
    for(var i = 0; i < array.length; i++) {
        if(array[i] == value) {
            return true
        }
    }
    return false
}
Joose.A.concat = function (source, array) {
    source.push.apply(source, array)
    return source
}

Joose.A.grep = function (array, func) {
    var a = [];
    Joose.A.each(array, function (t) {
        if(func(t)) {
            a.push(t)
        }
    })
    return a
}
Joose.A.remove = function (array, removeEle) {
    var a = [];
    Joose.A.each(array, function (t) {
        if(t !== removeEle) {
            a.push(t)
        }
    })
    return a
}

// Static helpers for Strings
Joose.S = {};
Joose.S.uppercaseFirst = function (string) { 
    var first = string.substr(0,1);
    var rest  = string.substr(1,string.length-1);
    first = first.toUpperCase()
    return first + rest;
}

Joose.S.isString = function (thing) { 
    return typeof thing == "string";
}
Joose.S.dieIfString = function (thing) {
    if(Joose.S.isString(thing)) {
        throw new TypeError("Parameter must not be a string.")
    }
}


// Static helpers for objects
Joose.O = {

    each : function (object, func, scope) {
        for(var i in object) func.call(scope || this, object[i], i);
        
        if (joose.is_IE) {
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
        
        var mutable = new f();
//        mutable.__original = object;
        
        return mutable;
    },
    
    
    extend : function (target, source) {
        return Joose.O.copy(source, target);
    }
    
    
};

//XXX should we deprecate this form?
Joose.copyObject = Joose.O.copy;



// Static helpers for functions?
Joose.F = {
    emptyFunction   : function () { return function(){} },
    newArray        : function () { return [] },
    newObject       : function () { return {} }
};


Joose.emptyFunction = function () {};

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


Joose.prototype = {
    
    addToString: function (object, func) {
        object.toString = func;
    },
    
    /*
     * Differentiates between instances and classes
     */
    isInstance: function(obj) {
        if(!obj.meta) throw "isInstance only works with Joose objects and classes."
        
        return obj.constructor === obj.meta.c;
    },
    
    init: function () {
        this.builder = new Joose.Builder();
        this.builder.globalize()
    },
    // this needs to be updated in release.pl too, if files are added
    components: function () {
        return [
            "Joose.Proto.Class",
            "Joose.Proto.Meta",
            "Joose.Managed.Property",
            "Joose.Managed.Property.Alias",
            "Joose.Managed.Property.ConflictMarker",
            "Joose.Managed.PropertySet"
//            "Joose.Managed.Builder",
//            "Joose.Managed.Meta"            
//            "Joose.Kernel.Inheritable",
//            "Joose.Kernel.ProtoMethod",
//            "Joose.Kernel.ProtoAttribute",
//            "Joose.Kernel.Inheritance",
//            "Joose.Kernel.ProtoClassMethod",
//            "Joose.Kernel.ClassMethods",
//            "Joose.Kernel.Handlers",
//            "Joose.Kernel.Roles",
//            "Joose.Kernel.ProtoModule",
//            "Joose.Kernel.NamespaceKeeper",
//            
//            "Joose.Kernel.MetaClass",
//            "Joose.Kernel.ProtoRole",
//            "Joose.Kernel.MetaClass.Depended",
////            "Joose.Kernel.MetaClass.Depended.Grouped",
////            "Joose.Kernel.MetaClass.Depended.NonCycled",
//            "Joose.Kernel.MetaClass.Depended.Transport.ScriptTag",
//            "Joose.Kernel.MetaClass.Depended.Transport.AjaxAsync",
//            
//            "Joose.Attribute",
//            "Joose.Method",
//            "Joose.ClassMethod",
//            "Joose.Class",
//            "Joose.TypeConstraint",
//            "Joose.Builder",
//            "Joose.TypeCoercion",
//            "Joose.Types",
//            "Joose.Role",
//            "Joose.Singleton",
//            "Joose.SimpleRequest",
//            "Joose.Gears",
//            "Joose.Storage",
//            "Joose.Storage.Unpacker",
//            "Joose.Decorator",
//            "Joose.TypeChecker",
//            "Joose.Prototype",
//            "Joose.TypedMethod",
//            "Joose.MultiMethod",
//            "Digest.MD5"
        ]
    },

    loadComponents: function (basePath) {
        var html = "";
        Joose.A.each(this.components(), function (name) {
            var url    = ""+basePath + "/" + name.split(".").join("/") + ".js";
           
            html += '<script type="text/javascript" src="'+url+'"></script>'
        })
        document.write(html)
    }
}


this.joose = new Joose();

// Rhino is the only popular JS engine that does not traverse objects in insertion order
// Check for Rhino (which uses the global Packages function) and set CHAOTIC_TRAVERSION_ORDER to true
(function () {
    
    if(
         typeof this["load"] == "function" &&
         (
            typeof this["Packages"] == "function" ||
            typeof this["Packages"] == "object"
         )
   ) {
        joose.CHAOTIC_TRAVERSION_ORDER = true
   }
})()

try {
    joose.is_IE = /msie/i.test(navigator.userAgent) && !/opera/i.test(navigator.userAgent);
} catch (e) {
    joose.is_IE = false;
}