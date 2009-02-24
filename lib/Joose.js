var joosetop = this;

Joose = function () {
    this.top             = joosetop;
    
    this.anonymouseClassCounter = 0;
};

// Static helpers for Arrays
Joose.A = {};
Joose.A.each = function (array, func) {
    for(var i = 0; i < array.length; i++) {
        func(array[i], i)
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
    if(typeof thing == "string") {
        return true
    }
    return false
}

// Static helpers for objects
Joose.O = {};
Joose.O.each = function (object, func) {
    for(var i in object) {
        func(object[i], i)
    }
}

Joose.O.eachSafe = function (object, func, scope) {
    //messing with IE..
    var toStringProcessed = false;
    for(var i in object) {
        if(object.hasOwnProperty(i)) {
            if (i == 'toString') toStringProcessed = true;
            
            func.call(scope || this, object[i], i)
        }
    }
    if (!toStringProcessed && object.hasOwnProperty('toString')) func.call(scope || this, object['toString'], 'toString')
}

// Experimental!
Joose.O.extend = function (target, newObject) {
    for(var i in newObject) {
        var thing = newObject[i]
        target[i] = thing
    }
}


// Static helpers for functions
Joose.F = {};

//idea copied from Ext, source rewritten
//returns a function, tied to specifiec scope and arguments
Joose.F.createDelegate = function (func, scope, argsArray, appendArgs) {
    return function () {
        var thisArgs;
        if (appendArgs) {
            thisArgs = Array.prototype.slice(arguments).concat(argsArray)
        } else {
            thisArgs = argsArray
        }
        func.apply(scope || joose.top, thisArgs)
    }
}


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
            "Joose.Kernel.ProtoMeta",
            "Joose.Kernel.Inheritable",
            "Joose.Kernel.ProtoMethod",
            "Joose.Kernel.ProtoAttribute",
            "Joose.Kernel.Inheritance",
            "Joose.Kernel.ProtoClassMethod",
            "Joose.Kernel.ClassMethods",
            "Joose.Kernel.Handlers",
            "Joose.Kernel.Roles",
            "Joose.Kernel.ProtoModule",
            "Joose.Kernel.NamespaceKeeper",
            
            "Joose.Kernel.MetaClass",
            "Joose.Kernel.ProtoRole",
            "Joose.Kernel.MetaClass.Depended",
            "Joose.Kernel.MetaClass.Depended.Sequenced",
            "Joose.Kernel.MetaClass.Depended.Transport.ScriptTag",
            "Joose.Kernel.MetaClass.Depended.Transport.AjaxSync",
            
            "Joose.Attribute",
            "Joose.Method",
            "Joose.ClassMethod",
            "Joose.Class",
            "Joose.TypeConstraint",
            "Joose.Builder",
            "Joose.TypeCoercion",
            "Joose.Types",
            "Joose.Role",
            "Joose.Singleton",
            "Joose.SimpleRequest",
            "Joose.Gears",
            "Joose.Storage",
            "Joose.Storage.Unpacker",
            "Joose.Decorator",
            "Joose.TypeChecker",
            "Joose.Prototype",
            "Joose.TypedMethod",
            "Joose.MultiMethod",
            "Digest.MD5"
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

Joose.copyObject = function (source, target) {
    var keys = "";
    Joose.O.each(source, function (value, name) {  keys+=", "+name; target[name] = value })
    return target
};



Joose.emptyFunction = function () {};

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

