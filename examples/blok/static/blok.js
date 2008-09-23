// Generated: Tue Sep 23 15:59:27 2008


// ##########################
// File: /Users/malte/workspace/Joose2/examples/blok/static/ColorPicker.js
// ##########################
/* jQuery ColorPicker
   Written by Virgil Reboton(vreboton@gmail.com)
   
   ColorPicker function structures and attahcment is base on
   jQuery UI Date Picker v3.3beta
   by Marc Grabanski (m@marcgrabanski.com) and Keith Wood (kbwood@virginbroadband.com.au).
   
   ColorPicker render data is base on
   http://www.mattkruse.com/javascript/colorpicker/
   by Matt Kruse

*/

(function($) { // hide the namespace

function colorPicker()
{
    this._nextId = 0; // Next ID for a time picker instance
    this._inst = []; // List of instances indexed by ID
    this._curInst = null; // The current instance in use
    this._colorpickerShowing = false;
    this._colorPickerDiv = $('<div id="colorPickerDiv"></div>');
}
$.extend(colorPicker.prototype, {
    /* Class name added to elements to indicate already configured with a time picker. */
    markerClassName: 'hasColorPicker',

    /* Register a new time picker instance - with custom settings. */
    _register: function(inst) {
        var id = this._nextId++;
        this._inst[id] = inst;
        return id;
    },

    /* Retrieve a particular time picker instance based on its ID. */
    _getInst: function(id) {
        return this._inst[id] || id;
    },
    
    /* Handle keystrokes. */
    _doKeyDown: function(e) {
        var inst = $.colorPicker._getInst(this._colId);
        if ($.colorPicker._colorpickerShowing) {
            switch (e.keyCode) {
                case 9: 
                    // hide on tab out
                    $.colorPicker.hideColorPicker();
                    break; 

                case 27: 
                    // hide on escape
                    $.colorPicker.hideColorPicker();
                    break;
            }
        }
        else if (e.keyCode == 40) { // display the time picker on down arrow key
            $.colorPicker.showFor(this);
        }
    },

/* Handle keystrokes. */
    _resetSample: function(e) {
        var inst = $.colorPicker._getInst(this._colId);
        inst._sampleSpan.css('backgroundColor', inst._input.value);
    },
    
    /* Does this element have a particular class? */
    _hasClass: function(element, className) {
        var classes = element.attr('class');
        return (classes && classes.indexOf(className) > -1);
    },

    /* Pop-up the time picker for a given input field.
       @param  control  element - the input field attached to the time picker or
                        string - the ID or other jQuery selector of the input field or
                        object - jQuery object for input field
       @return the manager object */
    showFor: function(control) {
        
        control = (control.jquery ? control[0] :
            (typeof control == 'string' ? $(control)[0] : control));
        var input = (control.nodeName && control.nodeName.toLowerCase() == 'input' ? control : this);
        
        if ($.colorPicker._lastInput == input) { return; }
        if ($.colorPicker._colorpickerShowing) { return; }
        
        var inst = $.colorPicker._getInst(input._colId);
        
        $.colorPicker.hideColorPicker();
        $.colorPicker._lastInput = input;
        
        if (!$.colorPicker._pos) { // position below input
            $.colorPicker._pos = $.colorPicker._findPos(input);
            $.colorPicker._pos[1] += input.offsetHeight; // add the height            
        }
        
        var isFixed = true;
        /*$(input).parents().each(function() {
            isFixed |= $(this).css('position') == 'fixed';
        });*/
        
        if (isFixed && $.browser.opera) { // correction for Opera when fixed and scrolled
            $.colorPicker._pos[0] -= document.documentElement.scrollLeft;
            $.colorPicker._pos[1] -= document.documentElement.scrollTop;
        }
        
        var height = inst._colorPickerDiv.height()
        if(height == 0) {
            height = 188
        }
    
        inst._colorPickerDiv.css('position', ($.blockUI ? 'static' : (isFixed ? 'fixed' : 'absolute'))).css('left', $.colorPicker._pos[0]+150 + 'px').css('top', $.colorPicker._pos[1]+1-height + 'px');
    
        $.colorPicker._pos = null;
        $.colorPicker._showColorPicker(inst);
        

        return this;
    },

    /* Find an object's position on the screen. */
    _findPos: function(obj) {
        
        var offset = $(obj).offset();
        return [offset.left, offset.top]
        
        // removed cruft
    },
    
    /* Close time picker if clicked elsewhere. */
    _checkExternalClick: function(event) {
        if (!$.colorPicker._curInst)
        {
            return;
        }
        var target = $(event.target);        
                
        if ((target.parents("#colorPickerDiv").length == 0) && $.colorPicker._colorpickerShowing && !($.blockUI))
        {
            if (target.text() != $.colorPicker._curInst._colorPickerDiv.text())
                $.colorPicker.hideColorPicker();
        }
    },

    /* Hide the time picker from view.
       @param  speed  string - the speed at which to close the time picker
       @return void */
    hideColorPicker: function(s) {
        var inst = this._curInst;
        if (!inst) {
            return;
        }        
 
        if (this._colorpickerShowing)
        {
            this._colorpickerShowing = false;
            this._lastInput = null;
            
            this._colorPickerDiv.css('position', 'absolute').css('left', '0px').css('top', '-1000px');
            
            if ($.blockUI)
            {
                $.unblockUI();
                $('body').append(this._colorPickerDiv);
            }
        
            this._curInst = null;                    
        }
        
        if (inst._input[0].value != inst._sampleSpan.css('backgroundColor'))
        {
            inst._sampleSpan.css('backgroundColor',inst._input[0].value);
        }
    },
    
    

    /* Attach the time picker to an input field. */
    _connectColorPicker: function(target, inst) {
        var input = $(target);
        if (this._hasClass(input, this.markerClassName)) { return; }
        
        $(input).attr('autocomplete', 'OFF'); // Disable browser autocomplete        
        inst._input = $(input);    
        
        // Create sample span
        inst._sampleSpan = $('<span class="ColorPickerDivSample" style="background-color:' + inst._input[0].value + ';height:' + inst._input[0].offsetHeight + ';">&nbsp;</span>');
        input.after(inst._sampleSpan);
        
        inst._sampleSpan.click(function() {
            input.focus();
        });
        
        input.click(this.showFor);                    
        input.focus(this.showFor);
        
        input.addClass(this.markerClassName).keydown(this._doKeyDown);
        input[0]._colId = inst._id;        
    },
    
    
    /* Construct and display the time picker. */
    _showColorPicker: function(id) {
        var inst = this._getInst(id);
        this._updateColorPicker(inst);
        
        inst._colorPickerDiv.css('width', inst._startTime != null ? '10em' : '6em');
        
        inst._colorPickerDiv.show();

        if (inst._input[0].type != 'hidden')
        {
            inst._input[0].focus();
        }
        
        this._curInst = inst;
        this._colorpickerShowing = true;
    },
    
    refreshSamples: function () {
        $('.ColorPickerDivSample').each(function () {
            $(this).css("backgroundColor", $(this).parent().find(".colorPicker").val())
        })
    },

    /* Generate the time picker content. */
    _updateColorPicker: function(inst) {
        inst._colorPickerDiv.empty().append(inst._generateColorPicker());
        if (inst._input && inst._input[0].type != 'hidden')
        {
            inst._input[0].focus();
            
            $("td.color", inst._timePickerDiv).unbind().mouseover(function() {
                inst._sampleSpan.css('backgroundColor', $(this).css('backgroundColor'));
            }).click(function() {
                inst._setValue(this);
            });
        }
    } 
    
});

/* Individualised settings for time picker functionality applied to one or more related inputs.
   Instances are managed and manipulated through the TimePicker manager. */
function ColorPickerInstance()
{
    this._id = $.colorPicker._register(this);
    this._input = null;
    this._colorPickerDiv = $.colorPicker._colorPickerDiv;
    this._sampleSpan = null;
}

$.extend(ColorPickerInstance.prototype, {
    /* Get a setting value, defaulting if necessary. */
    _get: function(name) {
        return (this._settings[name] != null ? this._settings[name] : $.colorPicker._defaults[name]);
    },
    
    _getValue: function () {
        if (this._input && this._input[0].type != 'hidden' && this._input[0].value != "")
        {
            return this._input[0].value;
        }
        return null;
    },
    
    _setValue: function (sel) {
        // Update input field
        if (this._input && this._input[0].type != 'hidden')
        {
            this._input[0].value = $.attr(sel,'title');
            $(this._input[0]).change();
        }
        
        // Hide picker
        $.colorPicker.hideColorPicker();
    },
       
    /* Generate the HTML for the current state of the time picker. */
    _generateColorPicker: function() {
        // Code to populate color picker window
        var colors  = new Array("#000000","#000033","#000066","#000099","#0000CC","#0000FF","#330000","#330033","#330066","#330099","#3300CC",
                                "#3300FF","#660000","#660033","#660066","#660099","#6600CC","#6600FF","#990000","#990033","#990066","#990099",
                                "#9900CC","#9900FF","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#FF0000","#FF0033","#FF0066",
                                "#FF0099","#FF00CC","#FF00FF","#003300","#003333","#003366","#003399","#0033CC","#0033FF","#333300","#333333",
                                "#333366","#333399","#3333CC","#3333FF","#663300","#663333","#663366","#663399","#6633CC","#6633FF","#993300",
                                "#993333","#993366","#993399","#9933CC","#9933FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF",
                                "#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#006600","#006633","#006666","#006699","#0066CC",
                                "#0066FF","#336600","#336633","#336666","#336699","#3366CC","#3366FF","#666600","#666633","#666666","#666699",
                                "#6666CC","#6666FF","#996600","#996633","#996666","#996699","#9966CC","#9966FF","#CC6600","#CC6633","#CC6666",
                                "#CC6699","#CC66CC","#CC66FF","#FF6600","#FF6633","#FF6666","#FF6699","#FF66CC","#FF66FF","#009900","#009933",
                                "#009966","#009999","#0099CC","#0099FF","#339900","#339933","#339966","#339999","#3399CC","#3399FF","#669900",
                                "#669933","#669966","#669999","#6699CC","#6699FF","#999900","#999933","#999966","#999999","#9999CC","#9999FF",
                                "#CC9900","#CC9933","#CC9966","#CC9999","#CC99CC","#CC99FF","#FF9900","#FF9933","#FF9966","#FF9999","#FF99CC",
                                "#FF99FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#33CC00","#33CC33","#33CC66","#33CC99",
                                "#33CCCC","#33CCFF","#66CC00","#66CC33","#66CC66","#66CC99","#66CCCC","#66CCFF","#99CC00","#99CC33","#99CC66",
                                "#99CC99","#99CCCC","#99CCFF","#CCCC00","#CCCC33","#CCCC66","#CCCC99","#CCCCCC","#CCCCFF","#FFCC00","#FFCC33",
                                "#FFCC66","#FFCC99","#FFCCCC","#FFCCFF","#00FF00","#00FF33","#00FF66","#00FF99","#00FFCC","#00FFFF","#33FF00",
                                "#33FF33","#33FF66","#33FF99","#33FFCC","#33FFFF","#66FF00","#66FF33","#66FF66","#66FF99","#66FFCC","#66FFFF",
                                "#99FF00","#99FF33","#99FF66","#99FF99","#99FFCC","#99FFFF","#CCFF00","#CCFF33","#CCFF66","#CCFF99","#CCFFCC",
                                "#CCFFFF","#FFFF00","#FFFF33","#FFFF66","#FFFF99","#FFFFCC","#EEEEEE","#111111","#222222","#333333","#444444",
                                "#555555","#666666","#777777","#888888","#999999","#A5A5A5","#AAAAAA","#BBBBBB","#C3C3C3","#CCCCCC","#D2D2D2",
                                "#DDDDDD","#E1E1E1","#FFFFFF");
                                
        var total = colors.length;
        var width = 18;
        var html = "<table border='1px' cellspacing='0' cellpadding='0'>";
        
        for (var i=0; i<total; i++)
        {
            if ((i % width) == 0) { html += "<tr>"; }
            
            html += '<td class="color" title="' + colors[i] + '" style="background-color:' + colors[i] + '"><label>&nbsp;&nbsp;&nbsp;</label></td>';
            
            if ( ((i+1)>=total) || (((i+1) % width) == 0))
            {
                html += "</tr>";
            }
        }
        
        html += '<tr><td title="" style="background-color:#999" class="color" colspan="' + width + '" align="center"><label>No Color</label></td></tr>'
        
        html += "</table>";
    
        return html
    }
    
});


/* Attach the time picker to a jQuery selection.
   @param  settings  object - the new settings to use for this time picker instance (anonymous)
   @return jQuery object - for chaining further calls */
$.fn.attachColorPicker = function() {
    return this.each(function() {
        var nodeName = this.nodeName.toLowerCase();
        if (nodeName == 'input')
        {
            var inst = new ColorPickerInstance();
            $.colorPicker._connectColorPicker(this, inst);
        }         
    });
};

$.fn.getValue = function() {
    var inst = (this.length > 0 ? $.colorPicker._getInst(this[0]._colId) : null);
    return (inst ? inst._getValue() : null);
};

$.fn.setValue = function(value) {
    var inst = (this.length > 0 ? $.colorPicker._getInst(this[0]._colId) : null);
    if (inst) inst._setValue(value);
};

/* Initialise the time picker. */
$(document).ready(function() {
    $.colorPicker = new colorPicker(); // singleton instance
    $(document.body).append($.colorPicker._colorPickerDiv).mousedown($.colorPicker._checkExternalClick);
});

})(jQuery);
// ##########################
// File: /Users/malte/workspace/Joose2/examples/blok/static/joose.mini.js
// ##########################
Joose = function () {this.cc              = null;  
this.currentModule   = null
this.top             = window;this.globalObjects   = [];this.anonymouseClassCounter = 0;};Joose.A = {};Joose.A.each = function (array, func) {for(var i = 0; i < array.length; i++) {func(array[i], i)
}
}
Joose.A.exists = function (array, value) {for(var i = 0; i < array.length; i++) {if(array[i] == value) {return true
}
}
return false
}
Joose.A.concat = function (source, array) {source.push.apply(source, array)
return source
}
Joose.A.grep = function (array, func) {var a = [];Joose.A.each(array, function (t) {if(func(t)) {a.push(t)
}
})
return a
}
Joose.A.remove = function (array, removeEle) {var a = [];Joose.A.each(array, function (t) {if(t !== removeEle) {a.push(t)
}
})
return a
}
Joose.S = {};Joose.S.uppercaseFirst = function (string) {
var first = string.substr(0,1);var rest  = string.substr(1,string.length-1);first = first.toUpperCase()
return first + rest;}
Joose.S.isString = function (thing) {
if(typeof thing == "string") {return true
}
return false
}
Joose.O = {};Joose.O.each = function (object, func) {for(var i in object) {func(object[i], i)
}
}
Joose.O.extend = function (target, newObject) {for(var i in newObject) {var thing = newObject[i]
target[i] = thing
}
}
Joose.prototype = {addToString: function (object, func) {object.toString = func;},
/*
* Differentiates between instances and classes
*/
isInstance: function(obj) {if(!obj.meta) {throw "isInstance only works with Joose objects and classes."
}
if(obj.constructor === obj.meta.c) {return true
}
return false
},
init: function () {this.builder = new Joose.Builder();this.builder.globalize()
},
components: function () {return [
"Joose.Builder",
"Joose.Class",
"Joose.Method",
"Joose.ClassMethod",
"Joose.Method",
"Joose.Attribute",
"Joose.Role",
"Joose.SimpleRequest",
"Joose.Gears",
"Joose.Storage",
"Joose.Storage.Unpacker",
"Joose.Decorator",
"Joose.Module",
"Joose.Prototype",
"Joose.TypeConstraint",
"Joose.TypeCoercion"
]
},
loadComponents: function (basePath) {var html = "";Joose.A.each(this.components(), function (name) {var url    = ""+basePath + "/" + name.split(".").join("/") + ".js";html += '<script type="text/javascript" src="'+url+'"></script>'
})
document.write(html)
}
}
Joose.copyObject = function (source, target) {var keys = "";Joose.O.each(source, function (value, name) {  keys+=", "+name; target[name] = value })
return target
};Joose.emptyFunction = function () {};var joose = new Joose();Joose.bootstrap = function () {var BOOT = new Joose.MetaClassBootstrap();
BOOT.builder    = Joose.MetaClassBootstrap;Joose.MetaClass = BOOT.createClass("Joose.MetaClass");Joose.MetaClass.meta.addNonJooseSuperClass("Joose.MetaClassBootstrap", BOOT)
Joose.MetaClass.meta.addMethod("initialize", function () { this._name = "Joose.MetaClass" })
var META     = new Joose.MetaClass();META.builder = Joose.MetaClass;Joose.Class  = META.createClass("Joose.Class")
Joose.Class.meta.addSuperClass(Joose.MetaClass);Joose.MetaClass.meta.addMethod("initialize", function () { this._name = "Joose.Class" })
}
Joose.bootstrap2 = function () {Joose.Builder.Globals.joosify("Joose.Method", Joose.Method)
Joose.Builder.Globals.joosify("Joose.Attribute", Joose.Attribute)
}
Joose.bootstrap3 = function () {}
/**
* @name Joose.Class
* @constructor
*/
/*
* Joose.MetaClassBootstrap is used to bootstrap the Joose.Class with a regular JS constructor
*/
/** ignore */ 
Joose.MetaClassBootstrap = function () {this._name            = "Joose.MetaClassBootstrap";this.methodNames      = [];this.attributeNames   = ["_name", "isAbstract", "isDetached", "methodNames", "attributeNames", "methods", "parentClasses", "roles", "c"];this.attributes       = {},
this.methods          = {};this.classMethods     = {};this.parentClasses    = [];this.roles            = []; 
this.myRoles          = []; 
this.isAbstract       = false;this.isDetached       = false;}
/** @ignore */
Joose.MetaClassBootstrap.prototype = {toString: function () {if(this.meta) {return "a "+this.meta.className();}
return "NoMeta"
},
/**
* Returns the name of the class
* @name className
* @function
* @memberof Joose.Class
*/
/** @ignore */
className: function () {return this._name
},
/**
* Returns the name of the class (alias to className())
* @name getName
* @function
* @memberof Joose.Class
*/
/** @ignore */
getName: function () {return this.className()
},
/**
* Creates a new empty meta class object
* @function
* @name newMetaClass
* @memberof Joose.Class
*/
/** @ignore */
newMetaClass: function () {var me  = this;var metaClassClass = this.builder;var c     = new metaClassClass();c.builder = metaClassClass;c._name   = this._name
c.methodNames    = [];c.attributeNames = [];c.methods        = {};c.classMethods   = {};c.parentClasses  = [];c.roles          = [];c.myRoles        = [];c.attributes     = {};var myMeta = this.meta;if(!myMeta) {myMeta = this;}
c.meta = myMeta
return c
},
/**
* Creates a new class object
* @function
* @name createClass
* @param {function} optionalConstructor If provided will be used as the class constructor (You should not need this)
* @param {Joose.Module} optionalModuleObject If provided the Module's name will be prepended to the class name
* @memberof Joose.Class
*/
/** @ignore */
createClass:    function (name, optionalConstructor, optionalModuleObject) {var meta  = this.newMetaClass();var c;if(optionalConstructor) {c = optionalConstructor
} else {c = this.defaultClassFunctionBody()
if(optionalModuleObject) {optionalModuleObject.addElement(c)
}
}
c.prototype.meta = meta
c.meta    = meta;if(name == null) {meta._name = "__anonymous__"
} else {var className = name;if(optionalModuleObject) {className = optionalModuleObject.getName() + "." + name
}
meta._name = className;}
meta.c = c;if(!optionalModuleObject) {joose.globalObjects.push(c)
}
meta.addInitializer();meta.addToString();meta.addDetacher();meta.validateClass();return c;},
buildComplete: function () {},
initializeFromProps: function (props) {this._initializeFromProps(props)
},
_initializeFromProps: function (props) {var me = this;if(props) {Joose.O.each(props, function (value, name) {var paras             = value;var customBuilderName = "handleProp"+name;if(me.meta.can(customBuilderName)) {me[customBuilderName](paras, props)
} else { 
throw new Error("Called invalid builder "+name+" while creating class "+me.meta.className())
}
})
me.validateClass()
me.buildComplete()
}
},
/**
* Returns a new instance of the class that this meta class instance is representing
* @function
* @name instantiate
* @memberof Joose.Class
*/
instantiate: function () {var f = function () {};f.prototype = this.c.prototype;f.prototype.constructor = this.c;var obj = new f();this.c.apply(obj, arguments);return obj;},
/**
* Returns the default constructor function for new classes. You might want to override this in derived meta classes
* Default calls initialize on a new object upon construction.
* The class object will stringify to it's name
* @function
* @name defaultClassFunctionBody
* @memberof Joose.Class
*/
/** @ignore */
defaultClassFunctionBody: function () {var f = function () {this.initialize.apply(this, arguments);};joose.addToString(f, function () {return this.meta.className()
})
return f;},
/**
* Adds a toString method to a class
* The default toString method will call the method stringify if available.
* This make overriding stringification easier because toString cannot
* be reliably overriden in some JS implementations.
* @function
* @name addToString
* @memberof Joose.Class
*/
/** @ignore */
addToString: function () {this.addMethod("toString", function () {if(this.stringify) {return this.stringify()
}
return "a "+ this.meta.className()
})
},
/**
* Adds the method returned by the initializer method to the class
* @function
* @name addInitializer
* @memberof Joose.Class
*/
/** @ignore */
addInitializer: function () {if(!this.c.prototype.initialize) {this.addMethod("initialize", this.initializer())
}
},
/**
* Adds a toString method to a class
* @function
* @name initializer
* @memberof Joose.Class
*/
/** @ignore */
initializer: function () {return function initialize (paras) {var me = this;if(this.meta.isAbstract) {var name = this.meta.className();throw ""+name+" is an abstract class and may not instantiated."
}
var attributes = this.meta.getAttributes();for(var i in attributes) {var attr = attributes[i];attr.doInitialization(me, paras);}
}
},
dieIfString: function (thing) {if(Joose.S.isString(thing)) {throw new TypeError("Parameter must not be a string.")
}
},
addRole: function (roleClass) {this.dieIfString(roleClass);if(roleClass.meta.apply(this.getClassObject())) {this.roles.push(roleClass);this.myRoles.push(roleClass);}
},
getClassObject: function () {return this.c
},
classNameToClassObject: function (className) {var top    = joose.top;var parts  = className.split(".");var object = top;for(var i = 0; i < parts.length; i++) {var part = parts[i];object   = object[part];if(!object) {throw "Unable to find class "+className
}
}
return object
},
addNonJooseSuperClass: function (name, object) {var pseudoMeta     = new Joose.MetaClassBootstrap();pseudoMeta.builder = Joose.MetaClassBootstrap;var pseudoClass    = pseudoMeta.createClass(name)
Joose.O.each(object, function(value, name) {if(typeof(value) == "function") {pseudoClass.meta.addMethod(name, value)
} else {pseudoClass.meta.addAttribute(name, {init: value})
}
})
this.addSuperClass(pseudoClass);},
addSuperClass:    function (classObject) {this.dieIfString(classObject);var me    = this;var names = classObject.meta.getMethodNames();for(var i = 0; i < names.length; i++) {var name = names[i]
var m = classObject.meta.getMethodObject(name)
if(m) {var method = m.copy();method.setIsFromSuperClass(true);me.addMethodObject(method)
}
m = classObject.meta.getClassMethodObject(name)
if(m) {var method = m.copy();method.setIsFromSuperClass(true);me.addMethodObject(method)
}
}
Joose.O.each(classObject.meta.attributes, function (attr, name) {me.addAttribute(name, attr.getProps())
})
var roles = classObject.meta.roles
for(var i = 0; i < roles.length; i++) {var role = roles[i]
me.roles.push(role)
}
this.parentClasses.unshift(classObject)
},
_fixMetaclassIncompatability: function (superClass) {var superMeta     = superClass.meta;var superMetaName = superMeta.meta.className();if(
superMetaName == "Joose.Class"     ||
superMetaName == "Joose.MetaClass" ||
superMetaName == "Joose.MetaClassBootstrap") {return
}
if(this.meta.meta.isa(superMeta)) {return
}
var patched = superMeta.meta.instantiate(this);for(var i in patched) {this[i] = patched[i]
}
},
isa:            function (classObject) {this.dieIfString(classObject);var name = classObject.meta.className()
if(this.className() == name) {return true
}
for(var i = 0; i < this.parentClasses.length; i++) {var parent = this.parentClasses[i].meta
if(parent.className() == name) {return true
}
if(parent.isa(classObject)) {return true
}
}
return false
},
wrapMethod:  function (name, wrappingStyle, func, notPresentCB) {var orig = this.getMethodObject(name);if(orig) {this.addMethodObject( orig[wrappingStyle](func) )
} else {if(notPresentCB) {notPresentCB()
} else {throw new Error("Unable to apply "+wrappingStyle+" method modifier because method "+name+" does not exist");}
}
},
dispatch:        function (name) {return this.getMethodObject(name).asFunction()
},
hasMethod:         function (name) {return this.methods[name] != null || this.classMethods[name] != null
},
addMethod:         function (name, func, props) {var m = new Joose.Method(name, func, props);this.addMethodObject(m)
},
addClassMethod:         function (name, func, props) {var m = new Joose.ClassMethod(name, func, props);this.addMethodObject(m)
},
addMethodObject:         function (method) {var m              = method;var name           = m.getName();if(!this.methods[name] && !this.classMethods[name]) {this.methodNames.push(name);}
if(m.isClassMethod()) {this.classMethods[name] = m;} else {this.methods[name] = m;}
method.addToClass(this.c)
},
attributeMetaclass: function () {return Joose.Attribute
},
addAttribute:     function (name, props) {var metaclass = this.attributeMetaclass();if(props && props.metaclass) {metaclass = props.metaclass
}
var at = new metaclass(name, props);at.apply(this.c)
},
getAttributes: function () {return this.attributes
},
getAttribute: function (name) {return this.attributes[name]
},
setAttribute: function (name, attributeObject) {return this.attributes[name] = attributeObject
},
getMethodObject: function (name) {return this.methods[name]
},
getClassMethodObject: function (name) {return this.classMethods[name]
},
getAttributeNames: function () {return this.attributeNames;},
getInstanceMethods: function () {var a = [];Joose.O.each(this.methods, function (m) {a.push(m)
})
return a
},
getClassMethods: function () {var a = [];Joose.O.each(this.classMethods, function (m) {a.push(m)
})
return a
},
getSuperClasses:    function () {return this.parentClasses;},
getSuperClass:    function () {return this.parentClasses[0];},
getRoles:    function () {return this.roles;},
getMethodNames:    function () {return this.methodNames;},
makeAnonSubclass: function () {var c    = this.createClass(this.className()+"__anon__"+joose.anonymouseClassCounter++);c.meta.addSuperClass(this.getClassObject());return c;},
addDetacher: function () {this.addMethod("detach", function detach () {var meta = this.meta;if(meta.isDetached) {return 
}
var c    = meta.makeAnonSubclass()
c.meta.isDetached = true;this.meta      = c.meta;this.constructor = c;var proto;if(!this.__proto__) {proto = this
} else {proto   = {};Joose.copyObject(this, proto)
}
c.prototype    = proto;this.__proto__ = c.prototype
return
})
},
/**
* Throws an exception if the class does not implement all methods required by it's roles
* @function
* @name validateClass
* @memberof Joose.Class
*/
validateClass: function () {var c  = this.getClassObject();var me = this;var throwException = true;Joose.A.each(this.roles, function(role) {role.meta.isImplementedBy(c, throwException)
})
},
/**
* Returns true if the class implements the method
* @function
* @name can
* @param {string} methodName The method
* @memberof Joose.Class
*/
can: function (methodName) {var method = this.methods[methodName];if(!method) {return false
}
return true
},
classCan: function (methodName) {var method = this.classMethods[methodName];if(!method) {return false
}
return true
},
/**
* Returns true if the class implements a Role
* @function
* @name does
* @param {Joose.Class} methodName The class object
* @memberof Joose.Class
*/
does: function (roleObject) {for(var i = 0; i < this.roles.length; i++) {if(roleObject === this.roles[i]) {return true
}
}
for(var i = 0; i < this.roles.length; i++) {if(this.roles[i].meta.does(roleObject)) {return true
}
}
return false
},
/**
* Returns true if the given class implements all methods of the class
* @function
* @name does
* @param {Joose.Class} methodName The class object
* @memberof Joose.Class
*/
implementsMyMethods: function (classObject) {var complete = true
Joose.A.each(this.getMethodNames(), function (value) {var found = classObject.meta.can(value)
if(!found) {complete = false
}
})
return complete
},
/**
* Tells a role that the method name must be implemented by all classes that implement the role
* @function
* @param methodName {string} Name of the required method name
* @name requires
* @memberof Joose.Builder
*/
/** @ignore */
handleProprequires:    function (methodName) {var me = this;if(!this.meta.isa(Joose.Role)) {throw("Keyword 'requires' only available classes with a meta class of type Joose.Role")
}
if(methodName instanceof Array) {Joose.A.each(methodName, function (name) {me.addRequirement(name)
})
} else {me.addRequirement(methodName)
}
},
handlePropisAbstract: function (bool) {this.isAbstract = bool
},
/**
* Class builder method
* Defines the super class of the class
* @function
* @param classObject {Joose.Class} The super class
* @name isa
* @memberof Joose.Builder
*/
/** @ignore */
handlePropisa:    function (classObject) {this.addSuperClass(classObject)
},
/**
* Class builder method
* Defines a role for the class
* @function
* @param classObject {Joose.Role} The role
* @name does
* @memberof Joose.Builder
*/
/** @ignore */
handlePropdoes:    function (role) {var me = this;if(role instanceof Array) {Joose.A.each(role, function (aRole) {me.addRole(aRole)
})
} else {me.addRole(role)
}
},
/**
* Class builder method
* Defines attributes for the class
* @function
* @param classObject {object} Maps attribute names to properties (See Joose.Attribute)
* @name has
* @memberof Joose.Builder
*/
/** @ignore */
handleProphas:    function (map) {var me = this;if(typeof map == "string") {var name  = arguments[0];var props = arguments[1];me.addAttribute(name, props)
} else { 
Joose.O.each(map, function (props, name) {me.addAttribute(name, props)
})
}
},
/**
* @ignore
*/
handlePropmethod: function (name, func, props) {this.addMethod(name, func, props)
},
/**
* Class builder method
* Defines methods for the class
* @function
* @param classObject {object} Maps method names to function bodies
* @name methods
* @memberof Joose.Builder
*/
/** @ignore */
handlePropmethods: function (map) {var me = this
Joose.O.each(map, function (func, name) {me.addMethod(name, func)
})
},
/**
* Class builder method
* Defines class methods for the class
* @function
* @param classObject {object} Maps class method names to function bodies
* @name classMethods
* @memberof Joose.Builder
*/
/** @ignore */
handlePropclassMethods: function (map) {var me = this;Joose.O.each(map, function (func, name2) {me.addMethodObject(new Joose.ClassMethod(name2, func))
})
},
/**
* Class builder method
* Defines workers for the class (The class must have the meta class Joose.Gears)
* @function
* @param classObject {object} Maps method names to function bodies
* @name workers
* @memberof Joose.Builder
*/
/** @ignore */
handlePropworkers: function (map) {var me = this;Joose.O.each(map, function (func, name) {me.addWorker(name, func)
})
},
/**
* Class builder method
* Defines before method modifieres for the class.
* The defined method modifiers will be called before the method of the super class.
* The return value of the method modifier will be ignored
* @function
* @param classObject {object} Maps method names to function bodies
* @name before
* @memberof Joose.Builder
*/
/** @ignore */
handlePropbefore: function(map) {var me = this
Joose.O.each(map, function (func, name) {me.wrapMethod(name, "before", func);})
},
/**
* Class builder method
* Defines after method modifieres for the class.
* The defined method modifiers will be called after the method of the super class.
* The return value of the method modifier will be ignored
* @function
* @param classObject {object} Maps method names to function bodies
* @name after
* @memberof Joose.Builder
*/
/** @ignore */
handlePropafter: function(map) {var me = this
Joose.O.each(map, function (func, name) {me.wrapMethod(name, "after", func);})
},
/**
* Class builder method
* Defines around method modifieres for the class.
* The defined method modifiers will be called instead of the method of the super class.
* The orginial function is passed as an initial parameter to the new function
* @function
* @param classObject {object} Maps method names to function bodies
* @name around
* @memberof Joose.Builder
*/
/** @ignore */
handleProparound: function(map) {var me = this
Joose.O.each(map, function (func, name) {me.wrapMethod(name, "around", func);})
},
/**
* Class builder method
* Defines override method modifieres for the class.
* The defined method modifiers will be called instead the method of the super class.
* You can call the method of the super class by calling this.SUPER(para1, para2)
* @function
* @param classObject {object} Maps method names to function bodies
* @name override
* @memberof Joose.Builder
*/
/** @ignore */
handlePropoverride: function(map) {var me = this
Joose.O.each(map, function (func, name) {me.wrapMethod(name, "override", func);})
},
/**
* Class builder method
* Defines augment method modifieres for the class.
* These method modifiers will be called in "most super first" order
* The methods may call this.INNER() to call the augement method in it's sup class.
* @function
* @param classObject {object} Maps method names to function bodies
* @name augment
* @memberof Joose.Builder
*/
/** @ignore */
handlePropaugment: function(map) {var me = this
Joose.O.each(map, function (func, name) {me.wrapMethod(name, "augment", func, function () {me.addMethod(name, func)
});})
},
/**
* @ignore
*/
handlePropdecorates: function(map) {var me = this
Joose.O.each(map, function (classObject, attributeName) {me.decorate(classObject, attributeName)
})
}
};Joose.Attribute = function (name, props) {this.initialize(name, props)
}
Joose.Attribute.prototype = {_name:  null,
_props: null,
getName:    function () { return this._name },
getProps:    function () { return this._props },
initialize: function (name, props) {this._name  = name;this.setProps(props);},
setProps: function (props) {if(props) {this._props = props
} else {this._props = {};}
},
getIsa: function () {var props = this.getProps();if(props.isa) {if(!props.isa.meta) {return props.isa()
}
return props.isa
}
return
},
addSetter: function (classObject) {var meta  = classObject.meta;var name  = this.getName();var props = this.getProps();var isa   = this.getIsa();var func;if(isa) {func = function setterWithIsaCheck (value) {if(!value || !value.meta) {throw "The attribute "+name+" only accepts values that have a meta object."
}
if(!value.meta.isa(isa)) {throw "The attribute "+name+" only accepts values that are objects of type "+isa.meta.className()+"."
}
this[name] = value
return this;}
} else {func = function setter (value) {this[name] = value
return this;}
}
meta.addMethod(this.setterName(), func);},
addGetter: function (classObject) {var meta  = classObject.meta;var name  = this.getName();var props = this.getProps();var func  = function getter () {return this[name]
}
var init  = props.init;if(props.lazy) {func = function lazyGetter () {var val = this[name];if(typeof val == "function" && val === init) {this[name] = val.apply(this)
}
return this[name]
}
}
meta.addMethod(this.getterName(), func);},
initializerName: function () {return this.toPublicName()
},
getterName: function () {if(this.__getterNameCache) { 
return this.__getterNameCache
}
this.__getterNameCache = "get"+Joose.S.uppercaseFirst(this.toPublicName())
return this.__getterNameCache;},
setterName: function () {if(this.__setterNameCache) { 
return this.__setterNameCache
}
this.__setterNameCache = "set"+Joose.S.uppercaseFirst(this.toPublicName())
return this.__setterNameCache;},
isPrivate: function () {return this.getName().charAt(0) == "_"
},
toPublicName: function () {if(this.__publicNameCache) { 
return this.__publicNameCache
}
var name = this.getName();if(this.isPrivate()) {this.__publicNameCache = name.substr(1)
return this.__publicNameCache;}
this.__publicNameCache = name
return this.__publicNameCache
},
handleIs: function (classObject) {var meta  = classObject.meta;var name  = this.getName();var props = this.getProps();var is    = props.is;if(is == "rw" || is == "ro") {this.addGetter(classObject);}
if(is == "rw") {this.addSetter(classObject)
}
},
handleInit: function (classObject) {var props = this.getProps();var name  = this.getName();classObject.prototype[name]     = null;if(typeof props.init != "undefined") {var val = props.init;var type = typeof val;classObject.prototype[name] = val;}
},
handleProps: function (classObject) {this.handleIs(classObject);this.handleInit(classObject)
},
apply: function (classObject) {var meta  = classObject.meta;var name  = this.getName();this.handleProps(classObject)
meta.attributeNames.push(name)
meta.setAttribute(name, this)
meta.attributes[name] = this;}
}
Joose.Method = function (name, func, props) {this.initialize(name, func, props)
}
Joose.Method.prototype = {_name: null,
_body: null,
_props: null,
_isFromSuperClass: false,
getName:    function () { return this._name },
getBody:    function () { return this._body },
getProps:   function () { return this._props },
isFromSuperClass: function () {return this._isFromSuperClass
},
setIsFromSuperClass: function (bool) {this._isFromSuperClass = bool
},
copy: function () {return new Joose.Method(this.getName(), this.getBody(), this.getProps())
},
initialize: function (name, func, props) {this._name  = name;this._body  = func;this._props = props;func.name   = name
func.meta   = this
},
isClassMethod: function () { return false },
apply:    function (thisObject, args) {return this._body.apply(thisObject, args)
},
addToClass: function (c) {c.prototype[this.getName()] = this.asFunction()
},
asFunction:    function () {return this._body
}
}
Joose.bootstrap()
/**
* Assorted tools to build a class
*
* The functions Class(), Module() and joosify() are global. All other methods
* may be used inside Class definitons like this:
*
* <pre>
* Module("com.test.me", function () {*   Class("MyClass", {*     isa: SuperClass,
*     methods: {*       hello: function () { alert('world') }
*     }
*   })
* })
* </pre>
* @constructor
*/
Joose.Builder = function () {/** @ignore */
this.globalize = function () {Joose.O.each(Joose.Builder.Globals, function (func, name) {var globalName = "Joose"+name
if(typeof joose.top[name] == "undefined") {joose.top[name] = func
}
joose.top[globalName] = func
});}
}
/** @ignore */
Joose.Builder.Globals = {/**
* Global function that creates or extends a module
* @function
* @param name {string} Name of the module
* @param functionThatCreatesClassesAndRoles {function} Pass a function reference that calls Class(...) as often as you want. The created classes will be put into the module
* @name Module
*/
/** @ignore */
Module: function (name, functionThatCreatesClassesAndRoles) {return Joose.Module.setup(name, functionThatCreatesClassesAndRoles)
},
Role: function (name, props) {if(!props.meta) {props.meta = Joose.Role;}
return Class(name, props)
},
Prototype: function (name, props) {if(!props.meta) {props.meta = Joose.Prototype;}
return Class(name, props);},
/**
* Global function that creates a class (If the class already exists it will be extended)
* @function
* @param name {string} Name of the the class
* @param props {object} Declaration if the class. The object keys are used as builder methods. The values are passed as arguments to the builder methods.
* @name Class
*/
/** @ignore */
Class:    function (name, props) {var c = null;if(name) {var className  = name;if(joose.currentModule) {className  = joose.currentModule.getName() + "." + name
}
var root       = joose.top;var parts      = className.split(".")
for(var i = 0; i < parts.length; i++) {root = root[parts[i]]
}
c = root;}
if(c == null) {var metaClass;/* Use the custom meta class if provided */
if(props && props.meta) {metaClass = props.meta
delete props.meta
}
/* Otherwise use the meta class of the parent class (If there is one)
* If the parent class is Joose.Class, we don't change the meta class but use the default
* because that Joose.Class's meta class is only needed for bootstrapping
* purposes. */
else if(props && props.isa && props.isa != Joose.Class) {metaClass = props.isa.meta.builder
}
/* Default meta class is Joose.Class */
else {metaClass   = Joose.Class;}
var aClass      = new metaClass();aClass.builder  = metaClass;var c           = aClass.createClass(name, null, joose.currentModule)
c.meta.builder  = metaClass
var className   = c.meta.className()
if(name && className) {var root = joose.top;var n = new String(className);var parts = n.split(".");for(var i = 0; i < parts.length - 1; i++) {if(root[parts[i]] == null) {root[parts[i]] = {};}
root = root[parts[i]];}
root[parts[parts.length - 1]] = c
}
}
c.meta.initializeFromProps(props)
return c
},
Type: function (name, props) {var t = Joose.TypeConstraint.newFromTypeBuilder(name, props);var m = joose.currentModule
if(!m) {Module("TYPE")
m = TYPE.meta;}
m.addElement(t)
m.getContainer()[name] = t;return t
},
/**
* Global function to turn a regular JavaScript constructor into a Joose.Class
* @function
* @param name {string} Name of the class
* @param props {function} The constructor
* @name joosify
*/
/** @ignore */
joosify: function (standardClassName, standardClassObject) {var c         = standardClassObject;var metaClass = new Joose.Class();metaClass.builder = Joose.Class;c.toString = function () { return this.meta.className() }
c             = metaClass.createClass(standardClassName, c)
var meta = c.meta;for(var name in standardClassObject.prototype) {if(name == "meta") {continue
}
var value = standardClassObject.prototype[name]
if(typeof(value) == "function") {meta.addMethod(name, value)
} else {var props = {};if(typeof(value) != "undefined") {props.init = value
}
meta.addAttribute(name, props)
}
}
return c
},
/** @ignore */
rw: "rw",
/** @ignore */
ro: "ro"
};joose.init();Joose.bootstrap2();/*
* A class for methods
* Originally defined in Joose.js
*
* See http:
*/
Class("Joose.Method", {methods: {copy: function () {return this.meta.instantiate(this.getName(), this.getBody(), this.getProps())
},
_makeWrapped: function (func) {return this.meta.instantiate(this.getName(), func); 
},
around: function (func) {var orig = this.getBody();return this._makeWrapped(function aroundWrapper () {var me = this;var bound = function () { return orig.apply(me, arguments) }
return func.apply(this, Joose.A.concat([bound], arguments))
})
},
before: function (func) {var orig = this.getBody();return this._makeWrapped(function beforeWrapper () {func.apply(this, arguments)
return orig.apply(this, arguments);})
},
after: function (func) {var orig = this.getBody();return this._makeWrapped(function afterWrapper () {var ret = orig.apply(this, arguments);func.apply(this, arguments);return ret
})
},
override: function (func) {var orig = this.getBody();return this._makeWrapped(function overrideWrapper () {var me      = this;var bound   = function () { return orig.apply(me, arguments) }
var before  = this.SUPER;this.SUPER  = bound;var ret     = func.apply(this, arguments);this.SUPER  = before;return ret
})
},
augment: function (func) {var orig = this.getBody();orig.source = orig.toString();return this._makeWrapped(function augmentWrapper () {var exe       = orig;var me        = this;var inner     = func
inner.source  = inner.toString();if(!this.__INNER_STACK__) {this.__INNER_STACK__ = [];};this.__INNER_STACK__.push(inner)
var before    = this.INNER;this.INNER    = function () {return  me.__INNER_STACK__.pop().apply(me, arguments) };var ret       = orig.apply(this, arguments);this.INNER    = before;return ret
})
}
}
})
Class("Joose.ClassMethod", {isa: Joose.Method,
methods: {isClassMethod: function () { return true },
addToClass: function (c) {c[this.getName()] = this.asFunction()
},
copy: function () {return new Joose.ClassMethod(this.getName(), this.getBody(), this.getProps())
}
}
})
/*
* A class for methods
* Originally defined in Joose.js
*
* See http:
*/
Class("Joose.Method", {methods: {copy: function () {return this.meta.instantiate(this.getName(), this.getBody(), this.getProps())
},
_makeWrapped: function (func) {return this.meta.instantiate(this.getName(), func); 
},
around: function (func) {var orig = this.getBody();return this._makeWrapped(function aroundWrapper () {var me = this;var bound = function () { return orig.apply(me, arguments) }
return func.apply(this, Joose.A.concat([bound], arguments))
})
},
before: function (func) {var orig = this.getBody();return this._makeWrapped(function beforeWrapper () {func.apply(this, arguments)
return orig.apply(this, arguments);})
},
after: function (func) {var orig = this.getBody();return this._makeWrapped(function afterWrapper () {var ret = orig.apply(this, arguments);func.apply(this, arguments);return ret
})
},
override: function (func) {var orig = this.getBody();return this._makeWrapped(function overrideWrapper () {var me      = this;var bound   = function () { return orig.apply(me, arguments) }
var before  = this.SUPER;this.SUPER  = bound;var ret     = func.apply(this, arguments);this.SUPER  = before;return ret
})
},
augment: function (func) {var orig = this.getBody();orig.source = orig.toString();return this._makeWrapped(function augmentWrapper () {var exe       = orig;var me        = this;var inner     = func
inner.source  = inner.toString();if(!this.__INNER_STACK__) {this.__INNER_STACK__ = [];};this.__INNER_STACK__.push(inner)
var before    = this.INNER;this.INNER    = function () {return  me.__INNER_STACK__.pop().apply(me, arguments) };var ret       = orig.apply(this, arguments);this.INNER    = before;return ret
})
}
}
})
/*
* This handles the following attribute properties
*  * init with function value in non-lazy initialization
*  * required attributes in initializaion
*  * handles for auto-decoration
*  * predicate for attribute availability checks
*
*
* See http:
*/
Class("Joose.Attribute", {after: {handleProps: function (classObject) {this.handleHandles(classObject);this.handlePredicate(classObject);}
},
methods: {isPersistent: function () {var props = this.getProps()
if(props.persistent == false) {return false
}
return true
},
doInitialization: function (object, paras) {var  name  = this.initializerName();var _name  = this.getName();var value;var isSet  = false;if(typeof paras != "undefined" && typeof paras[name] != "undefined") {value  = paras[name];isSet  = true;} else {var props = this.getProps();if(props.required) {throw "Required initialization parameter missing: "+name + "(While initializing "+object+")"
}
var init  = props.init;if(typeof init == "function" && !props.lazy) {value = init.call(object)
isSet = true
}
}
if(isSet) {var setterName = this.setterName();if(object.meta.can(setterName)) { 
object[setterName](value)
} else { 
object[_name] = value
}
}
},
handleHandles: function (classObject) {var meta  = classObject.meta;var name  = this.getName();var props = this.getProps();var handles = props.handles;var isa     = props.isa
if(handles) {if(handles == "*") {if(!isa) {throw "I need an isa property in order to handle a class"
}
var optionalHandlerMaker = props.handleWith;meta.decorate(isa, name, optionalHandlerMaker)
}
else {throw "Unsupported value for handles: "+handles
}
}
},
handlePredicate: function (classObject) {var meta  = classObject.meta;var name  = this.getName();var props = this.getProps();var predicate = props.predicate;var getter    = this.getterName();if(predicate) {meta.addMethod(predicate, function () {var val = this[getter]();return val ? true : false
})
}
}
}
})
/*
* An Implementation of Traits
* see http:
*
* Current Composition rules:
* - At compile time we override existing (at the time of rule application) methods
* - At runtime we dont
*/
Class("Joose.Role", {isa: Joose.Class,
has: ["requiresMethodNames", "methodModifiers"],
methods: {wrapMethod: function () {this.methodModifiers.push(arguments)
var test = this.methodModifiers
},
requiresMethod: function (methodName) {var bool = false;Joose.A.each(this.requiresMethodNames, function (name) {if(methodName == name) {bool = true
}
})
return bool
},
addInitializer: Joose.emptyFunction,
defaultClassFunctionBody: function () {var f = function () {throw new Error("Roles may not be instantiated.")
};joose.addToString(f, function () { return this.meta.className() })
return f
},
addSuperClass: function () {throw new Error("Roles may not inherit from a super class.")
},
initialize: function () {this._name               = "Joose.Role"
this.requiresMethodNames = [];this.methodModifiers     = [];},
addRequirement: function (methodName) {this.requiresMethodNames.push(methodName)
},
unapply: function (object) {if(!joose.isInstance(object)) {throw new Error("You way only remove roles from instances.")
}
if(!object.meta.isDetached) {throw new Error("You may only remove roles that were applied at runtime")
}
var role  = this.getClassObject()
var roles = object.meta.myRoles; 
var found = false;var otherRoles = [];for(var i = 0; i < roles.length; i++) {if(roles[i] === role) {found = true;} else {otherRoles.push(roles[i])
}
}
if(!found) {throw new Error("The role "+this.className()+" was not applied to the object at runtime")
}
var superClass     = object.meta.getSuperClass();var c              = superClass.meta.makeAnonSubclass();/*if(typeof(object.__proto__) != "undefined") {object.__proto__ = c.prototype
} else {   
*/
var test = new c()
for(var i = 0; i < otherRoles.length; i++) {var role = otherRoles[i]
c.meta.addRole(role)
}
c.prototype        = test
object.meta        = c.meta;object.constructor = c;object.__proto__   = test
},
addMethodToClass: function (method, classObject) {var name = method.getName()
var cur;if(method.isClassMethod()) {cur = classObject.meta.getClassMethodObject(name)
} else {cur = classObject.meta. getMethodObject(name)
}
if(!cur || cur.isFromSuperClass()) {classObject.meta.addMethodObject(method)
}
},
apply: function (object) {if(object.meta.does(this.getClassObject())) {return false
}
if(joose.isInstance(object)) {object.detach();object.meta.addRole(this.getClassObject());} else {var me    = this;var names = this.getMethodNames();Joose.A.each(names, function (name) {var m = me.getMethodObject(name)
if(m) {me.addMethodToClass(m, object)
}
m = me.getClassMethodObject(name)
if(m) {me.addMethodToClass(m, object)
}
})
Joose.A.each(this.methodModifiers, function (paras) {object.meta.wrapMethod.apply(object.meta, paras)
})
}
return true
},
hasRequiredMethods: function (classObject, throwException) {var me       = this
var complete = true
Joose.A.each(this.requiresMethodNames, function (value) {var found = classObject.meta.can(value)
if(!found) {if(throwException) {throw("Class "+classObject.meta.className()+" does not fully implement the role "+me.meta.className()+". The method is "+value+" missing.")
}
complete = false
return
}
})
return complete
},
isImplementedBy: function (classObject, throwException) {var complete = this.hasRequiredMethods(classObject, throwException);if(complete) {complete = this.implementsMyMethods(classObject);}
return complete
}
}
})
Joose.Role.anonymousClassCounter = 0;/**
* Class to perform simple synchronous AJAX Requests used for component loading.
* @name Joose.SimpleRequest
* @class
*/
Class("Joose.SimpleRequest", {has: {_req: {}},
methods: {initialize: function () {if (window.XMLHttpRequest) {this._req = new XMLHttpRequest();} else {this._req = new ActiveXObject("Microsoft.XMLHTTP");}
},
/**
* Fetches text from an URL
* @name getText
* @param {string} url The URL
* @function
* @memberof Joose.SimpleRequest
*/
getText: function (url) {this._req.open("GET", url, false);try {this._req.send(null);if (this._req.status == 200 || this._req.status == 0)
return this._req.responseText;} catch (e) {throw("File not found: " + url);return null;};throw("File not found: " + url);return null;}
}
})
/**
* Joose.Gears is a meta class for classes that want to delegate work to gears workers
* @name Joose.Gears
* @extends Joose.Class
* @constructor
*/
Class("Joose.Gears", {isa: Joose.Class,
has: {wp: {  },
calls: { init: {} },
callIndex: { init: 0 }
},
methods: {initialize: function () {JooseGearsInitializeGears()
if(this.canGears()) {this.wp = google.gears.factory.create('beta.workerpool');var me = this;this.wp.onmessage = function (a,b,message) {me.handleGearsMessage(message)
}
}
},
handleGearsMessage: function (message) {var paras  = message.body
var cbName = paras.to;var ret    = paras.ret;var object = this.calls[paras.index];if(object.meta.can(cbName)) {object[cbName].call(object, ret)
}
},
canGears: function () {return window.google && window.google.gears && window.google.gears.factory
},
/**
* Adds a worker to the class
* @function
* @name addWorker
* @param {string} Name of the worker
* @param {function} Function body of the worker
* @param {props} Optional properties for the created method (ignored)
* @memberof Joose.Gears
*/
addWorker:         function (name, func, props) {var cbName  = "on"+Joose.S.uppercaseFirst(name)
var ajaxRequestFunc = this.meta.getClassObject().ajaxRequest;if(!this.canGears()) {var wrapped = function () {var me = this;var object = {sendReturn:     function (ret, cbName) { if(me.meta.can(cbName)) me[cbName].call(me, ret) },
clientHasGears: function () { return false },
ajaxRequest:    ajaxRequestFunc
};var ret = func.apply(object, arguments);object.sendReturn(ret, cbName)
}
this.addMethod(name, wrapped, props)
return
}
var jsonUrl = this.can("jsonURL") ? this.c.jsonURL() : "json2.js";var json    = new Joose.SimpleRequest().getText(jsonUrl)
var source  =
"var timer = google.gears.factory.create('beta.timer');\n"+ 
"function aClass () {}; aClass.prototype."+name+" = "+func.toString()+"\n\n"+
"aClass.prototype.clientHasGears = function () { return true }\n"+
"aClass.prototype.ajaxRequest = "+ajaxRequestFunc.toString()+"\n\n"+
"var wp = google.gears.workerPool;\n" +
"wp.onmessage = function (a,b,message) {\n"+
"var paras = message.body;\n"+
"var o = new aClass();\n"+
"o.sendReturn = function (ret, cbName) { wp.sendMessage({ ret: ret, to: cbName, index: paras.index }, message.sender) } \n"+
"var ret = o."+name+".apply(o, paras.args); if(!ret) ret = null; \n"+
"o.sendReturn(ret, paras.cbName);"+
"\n}\n\n";source += json
var wp      = this.wp;var childId = wp.createWorker(source)
var me      = this
var wrapped = function () {var args = [];for(var i = 0; i < arguments.length; i++) {args.push(arguments[i])
}
var message = { args: args, cbName: cbName, index: me.callIndex };wp.sendMessage(message, childId);me.calls[me.callIndex] = this
me.callIndex++
}
this.addMethod(name, wrapped, props)
}
},
classMethods: {setupGearsCompat: function () {window.timer = {setTimeout:    function (func, time) { return window.setTimeout(func, time) },
setInterval:   function (func, time) { return window.setInterval(func, time) },
clearTimeout:  function (timer) { return window.clearTimeout(timer) },
clearInterval: function (timer) { return window.clearInterval(timer) }
};},
clientHasGears: function () { 
return window.google && window.google.gears && window.google.gears.factory
},
ajaxRequest: function (method, url, data, callback, errorCallback) {var request
if(this.clientHasGears()) {request = google.gears.factory.create('beta.httprequest');} else {request = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();}
var dataString    = ""
if(data) {for(var i in data) {dataString += encodeURIComponent(i)+"="+encodeURIComponent(data[i])+"&"
}
}
var theUrl = url;if(data && method == "GET") {theUrl += "?"+dataString
}
request.open(method, theUrl, true);request.onreadystatechange = function onreadystatechange () {if (request.readyState == 4) {if(request.status >= 200 && request.status < 400) {var res = request.responseText;callback(res)
} else {if(errorCallback) {return errorCallback(request)
} else {throw new Error("Error fetching url "+theUrl+". Response code: " + request.status + " Response text: "+request.responseText)
}
}
}
};if(data && method == "POST") {request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
request.send(dataString)
} else {dataString = ""
request.send(dataString);}
}
}
})
function JooseGearsInitializeGears() {if (window.google && google.gears) {return;}
var factory = null;if (typeof GearsFactory != 'undefined') {factory = new GearsFactory();} else {try {factory = new ActiveXObject('Gears.Factory');if (factory.getBuildInfo().indexOf('ie_mobile') != -1) {factory.privateSetGlobalObject(this);}
} catch (e) {if (navigator.mimeTypes["application/x-googlegears"]) {factory = document.createElement("object");factory.style.display = "none";factory.width = 0;factory.height = 0;factory.type = "application/x-googlegears";document.documentElement.appendChild(factory);}
}
}
if (!factory) {return;}
if (!window.google) {google = {};}
if (!google.gears) {google.gears = {factory: factory};}
}
Role("Joose.Storage", {methods: {toJSON: function () {return this.pack(Joose.Storage.TEMP_SEEN)
},
identity: function () {if(this.__ID__) {return this.__ID__
} else {return this.__ID__ = Joose.Storage.OBJECT_COUNTER++
}
},
pack: function (seen) {return this.meta.c.storageEngine().pack(this, seen)
}
},
classMethods: {storageEngine: function () {return Joose.Storage.Engine
},
unpack: function (data) {return this.storageEngine().unpack(this, data)
}
}
})
Role("Joose.Storage.jsonpickle", {does: Joose.Storage,
classMethods: {storageEngine: function () {return Joose.Storage.Engine.jsonpickle
}
}
})
Joose.Storage.OBJECT_COUNTER = 1;Class("Joose.Storage.Engine", {classMethods: {pack: function (object, seen) {if(seen) {var id  = object.identity()
var obj = seen[id];if(obj) {return {__ID__: id
}
}
}
if(object.meta.can("prepareStorage")) {object.prepareStorage()
}
if(seen) {seen[object.identity()] = true
}
var o  = {__CLASS__: this.packedClassName(object),
__ID__:    object.identity()
};var attrs      = object.meta.getAttributes();Joose.O.each(attrs, function packAttr (attr, name) {if(attr.isPersistent()) {o[name]   = object[name];}
})
return o
},
unpack: function (classObject, data) {var meta      = classObject.meta
var me        = meta.instantiate();var seenClass = false;Joose.O.each(data, function unpack (value,name) {if(name == "__CLASS__") {var className = Joose.Storage.Unpacker.packedClassNameToJSClassName(value)
if(className != me.meta.className()) {throw new Error("Storage data is of wrong type "+className+". I am "+me.meta.className()+".")
}
seenClass = true
return
}
me[name] = value
})
if(!seenClass) {throw new Error("Serialized data needs to include a __CLASS__ attribute.: "+data)
}
delete me.__ID__
if(me.meta.can("finishUnpack")) {me.finishUnpack()
}
return me
},
packedClassName: function (object) {if(object.meta.can("packedClassName")) {return object.packedClassName();}
var name   = object.meta.className();var parts  = name.split(".");return parts.join("::");}
}
})
Class("Joose.Storage.Engine.jsonpickle", {classMethods: {pack: function (object, seen) {if(seen) {var id  = object.identity()
var obj = seen[id];if(obj) {return {objectid__: id
}
}
}
if(object.meta.can("prepareStorage")) {object.prepareStorage()
}
if(seen) {seen[object.identity()] = true
}
var o  = {classname__:   this.packedClassName(object),
classmodule__: this.packedModuleName(object),
objectid__:    object.identity()
};var attrs      = object.meta.getAttributes();Joose.O.each(attrs, function packAttr (attr, name) {if(attr.isPersistent()) {o[name]   = object[name];}
})
return o
},
unpack: function (classObject, data) {var meta      = classObject.meta
var me        = meta.instantiate();var seenClass = false;Joose.O.each(data, function unpack (value,name) {if(name == "classname__") {var className = value;var module    = data.classmodule__
if(module) {className = "" + module + "." + value
}
if(className != me.meta.className()) {throw new Error("Storage data is of wrong type "+className+". I am "+me.meta.className()+".")
}
seenClass = true
return
}
if(name == "classmodule__") {return
}
me[name] = value
})
if(!seenClass) {throw new Error("Serialized data needs to include a __CLASS__ attribute.: "+data)
}
if(me.meta.can("finishUnpack")) {me.finishUnpack()
}
return me
},
packedClassName: function (object) {var name   = object.meta.className();var parts  = name.split(".");return parts.pop()
},
packedModuleName: function (object) {var name   = object.meta.className();var parts  = name.split(".");parts.pop();return parts.join(".");}
}
})
Joose.Storage.storageEngine            = Joose.Storage.Engine
Joose.Storage.jsonpickle.storageEngine = Joose.Storage.Engine.jsonpickle
Class("Joose.Storage.Unpacker", {classMethods: {unpack: function (data) {var name = data.__CLASS__;if(!name) {throw("Serialized data needs to include a __CLASS__ attribute.")
}
var jsName = this.packedClassNameToJSClassName(name)
var co  = this.meta.classNameToClassObject(jsName);var obj = co.unpack(data);var id;if(Joose.Storage.CACHE && (id = data.__ID__)) {Joose.Storage.CACHE[id] = obj
}
return obj
},
packedClassNameToJSClassName: function (packed) {
var parts  = packed.split("-");parts      = parts[0].split("::");return parts.join(".");},
jsonParseFilter: function (key, value) {if(value != null && typeof value == "object") {if(value.__CLASS__) {return Joose.Storage.Unpacker.unpack(value)
}
if(value.__ID__) {return Joose.Storage.CACHE[value.__ID__]
}
}
return value
},
patchJSON: function () {var orig = JSON.parse;var storageFilter = this.jsonParseFilter
JSON.parse = function (s, filter) {Joose.Storage.CACHE = {}
return orig(s, function JooseJSONParseFilter (key, value) {var val = value;if(filter) {val = filter(key, value)
}
return storageFilter(key,val)
})
}
var stringify = JSON.stringify;JSON.stringify = function () {Joose.Storage.TEMP_SEEN = {}
return stringify.apply(JSON, arguments)
}
}
}
})
Class("Joose.Storage.Unpacker.jsonpickle", {isa: Joose.Storage.Unpacker,
classMethods: {unpack: function (data) {var name = data.classname__;if(!name) {throw("Serialized data needs to include a classname__ attribute.")
}
var jsName = this.packedClassNameToJSClassName(name, data.classmodule__)
var co  = this.meta.classNameToClassObject(jsName);var obj = co.unpack(data);var id;if(Joose.Storage.CACHE && (id = data.objectid__)) {Joose.Storage.CACHE[id] = obj
}
return obj
},
packedClassNameToJSClassName: function (className, moduleName) {
var name = "";if(moduleName) {name += moduleName + "."
}
name += className;return name
},
jsonParseFilter: function (key, value) {if(value != null && typeof value == "object") {if(value.classname__) {return Joose.Storage.Unpacker.jsonpickle.unpack(value)
}
if(value.objectid__) {return Joose.Storage.CACHE[value.objectid__]
}
}
return value
}
}
})
Class("Joose.Decorator", {meta: Joose.Role,
methods: {decorate: function (classObject, attributeName, optionalDelegatorFuncMaker) {var me = this;Joose.A.each(classObject.meta.getInstanceMethods(), function (m) {var name    = m.getName();var argName = attributeName;if(!me.can(name)) {var func = function () {var d = this[argName];return d[name].apply(d, arguments)
}
if(optionalDelegatorFuncMaker) {func = optionalDelegatorFuncMaker(name)
}
me.addMethod(name, func);}
})
}
}
})
Joose.Decorator.meta.apply(Joose.Class)
/*
Module("my.namespace", function () {Class("Test", {})
})
*/
Class("Joose.Module", {has: {_name: {is: "rw"
},
_elements: {is: "rw"
},
_container: {is: "rw"
}
},
classMethods: {setup: function (name, functionThatCreatesClassesAndRoles) {var me      = this;var parts   = name.split(".");var object  = joose.top;var soFar   = []
var module;for(var i = 0; i < parts.length; i++) {var part = parts[i];if(part == "meta") {throw "Module names may not include a part called 'meta'."
}
var cur = object[part];soFar.push(part)
var name = soFar.join(".")
if(typeof cur == "undefined") {object[part]      = {};module            = new Joose.Module(name)
module.setContainer(object[part])
object[part].meta = module
Joose.Module._allModules.push(object[part])
} else {module = cur.meta;if(!(module && module.meta && (module.meta.isa(Joose.Module)))) {throw "Trying to setup module "+name+" failed. There is already something else: "+module
}
}
object = object[part]
}
var before = joose.currentModule
joose.currentModule = module
if(functionThatCreatesClassesAndRoles) {functionThatCreatesClassesAndRoles(object);}
joose.currentModule = before;return object
},
getAllModules: function () {return this._allModules
}
},
methods: {alias: function (destination) {var me = this;if(arguments.length == 0) {return this
}
Joose.A.each(this.getElements(), function (thing) {var global        = me.globalName(thing.meta.className());if(destination[global] === thing) { 
return
}
if(typeof destination[global] != "undefined") {throw "There is already something else in the spot "+global
}
destination[global] = thing;})
},
globalName: function (name) {var moduleName = this.getName();if(name.indexOf(moduleName) != 0) {throw "All things inside me should have a name that starts with "+moduleName+". Name is "+name
}
var rest = name.substr(moduleName.length + 1); 
if(rest.indexOf(".") != -1) {throw "The things inside me should have no more dots in there name. Name is "+rest
}
return rest
},
removeGlobalSymbols: function () {Joose.A.each(this.getElements(), function (thing) {var global = this.globalName(thing.getName());delete joose.top[global]
})
},
initialize: function (name) {this.setElements([])
this.setName(name);},
isEmpty: function () {return this.getElements().length == 0
},
addElement: function (ele) {if(!(ele || ele.meta)) {throw "You may only add things that are Joose objects"
}
this._elements.push(ele)
},
getNames: function () {var names = [];Joose.A.each(this.getElements(), function (ele) { names.push(ele.meta.getName()) });return names
}
}
})
__global__ = {};__global__.meta = new Joose.Module();__global__.meta.setName("__global__");__global__.meta.setContainer(__global__);Joose.Module._allModules = [__global__];Module("__global__.nomodule", function () {})
__global__.nomodule.meta._elements = joose.globalObjects
Class("Joose.Prototype", {isa: Joose.Class,
override: {initializer: function () {var init = this.SUPER()
return function () {init.apply(this, arguments)
var meta = this.meta;this.meta = new Joose.PrototypeLazyMetaObjectProxy();this.meta.metaObject = meta
this.meta.object     = this;}
}
}
})
Class("Joose.PrototypeLazyMetaObjectProxy", {has: {metaObject: {is: "rw",
isa: Joose.Class,
handles: "*",
handleWith: function (name) {return function () {
var o = this.object;o.meta = this.metaObject;o.detach()
o.meta[name].apply(o.meta, arguments)
}
}
},
object: {is: "rw"
}
}
})
Joose.bootstrap3()
Class("Joose.TypeConstraint", {has: {_constraints: {is: "ro",
init: function () { return [] }
},
_coercions: {is: "ro",
init: function () { return [] }
},
_messages: {is: "ro",
init: function () { return [] }
},
_name: {is: "ro"
}
},
classMethods: {newFromTypeBuilder: function (name, props) {var t
if(props.isa) {t = props.isa.makeSubType(name);} else {t = new Joose.TypeConstraint({ name: name });}
if(props.where) {t.addConstraint(props.where)
}
if(props.coerce) {for(var i = 0; i < props.coerce.length; i++) {var coercionProps = props.coerce[i];t.addCoercion(new Joose.TypeCoercion({from: coercionProps.from,
via:  coercionProps.via
}))
}
}
return t
}
},
methods: {stringify: function () {return this._name
},
makeSubType: function (name) {var t = new Joose.TypeConstraint({ name: name })
Joose.A.each(this._constraints, function (con) {t.addConstraint(con)
})
return t
},
addCoercion: function (coercion) {this._coercions.push(coercion);},
addConstraint: function (func, message) {this._constraints.push(func);this._messages.push(message)
},
validateBool: function (value) {var i = this._validate(value);if(i == -1) {return true
}
return false
},
validate: function (value) {var i = this._validate(value);if(i == -1) {return true
}
var message = this._messages[i];if(message) {throw new ReferenceError(message.apply(this, value))
}
throw new ReferenceError("The passed value ["+value+"] is not a "+this)
},
_validate: function (value) {var con = this._constraints;var i, len;for(i = 0, len = con.length; i < len; i++) {var func = con[i];var result = false;if(func instanceof RegExp) {result = func.test(value)
} else {result = func.call(this, value)
}
if(!result) {return i
}
}
return -1
},
coerce: function (value) {if(this.validateBool(value)) {return value
}
var coercions = this._coercions;for(var i = 0, len = coercions.length; i < len; i++) {var coercion = coercions[i];var result   = coercion.coerce(value);if(result != null) {return result
}
}
return null
}
}
})
Class("Joose.TypeCoercion", {has: {_from: {isa: Joose.TypeConstraint,
is:  "rw"
},
_via: {is: "rw"
}
},
methods: {coerce: function (value) {if(this._from.validateBool(value)) {return this._via(value)
}
return null
}
}
})
// ##########################
// File: /Users/malte/workspace/Joose2/examples/blok/static/json2.js
// ##########################
/*
    http://www.JSON.org/json2.js
    2008-05-25

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    See http://www.JSON.org/js.html

    This file creates a global JSON object containing two methods: stringify
    and parse.

        JSON.stringify(value, replacer, space)
            value       any JavaScript value, usually an object or array.

            replacer    an optional parameter that determines how object
                        values are stringified for objects without a toJSON
                        method. It can be a function or an array.

            space       an optional parameter that specifies the indentation
                        of nested structures. If it is omitted, the text will
                        be packed without extra whitespace. If it is a number,
                        it will specify the number of spaces to indent at each
                        level. If it is a string (such as '\t' or '&nbsp;'),
                        it contains the characters used to indent at each level.

            This method produces a JSON text from a JavaScript value.

            When an object value is found, if the object contains a toJSON
            method, its toJSON method will be called and the result will be
            stringified. A toJSON method does not serialize: it returns the
            value represented by the name/value pair that should be serialized,
            or undefined if nothing should be serialized. The toJSON method
            will be passed the key associated with the value, and this will be
            bound to the object holding the key.

            For example, this would serialize Dates as ISO strings.

                Date.prototype.toJSON = function (key) {
                    function f(n) {
                        // Format integers to have at least two digits.
                        return n < 10 ? '0' + n : n;
                    }

                    return this.getUTCFullYear()   + '-' +
                         f(this.getUTCMonth() + 1) + '-' +
                         f(this.getUTCDate())      + 'T' +
                         f(this.getUTCHours())     + ':' +
                         f(this.getUTCMinutes())   + ':' +
                         f(this.getUTCSeconds())   + 'Z';
                };

            You can provide an optional replacer method. It will be passed the
            key and value of each member, with this bound to the containing
            object. The value that is returned from your method will be
            serialized. If your method returns undefined, then the member will
            be excluded from the serialization.

            If the replacer parameter is an array, then it will be used to
            select the members to be serialized. It filters the results such
            that only members with keys listed in the replacer array are
            stringified.

            Values that do not have JSON representations, such as undefined or
            functions, will not be serialized. Such values in objects will be
            dropped; in arrays they will be replaced with null. You can use
            a replacer function to replace those with JSON values.
            JSON.stringify(undefined) returns undefined.

            The optional space parameter produces a stringification of the
            value that is filled with line breaks and indentation to make it
            easier to read.

            If the space parameter is a non-empty string, then that string will
            be used for indentation. If the space parameter is a number, then
            the indentation will be that many spaces.

            Example:

            text = JSON.stringify(['e', {pluribus: 'unum'}]);
            // text is '["e",{"pluribus":"unum"}]'


            text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
            // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

            text = JSON.stringify([new Date()], function (key, value) {
                return this[key] instanceof Date ?
                    'Date(' + this[key] + ')' : value;
            });
            // text is '["Date(---current time---)"]'


        JSON.parse(text, reviver)
            This method parses a JSON text to produce an object or array.
            It can throw a SyntaxError exception.

            The optional reviver parameter is a function that can filter and
            transform the results. It receives each of the keys and values,
            and its return value is used instead of the original value.
            If it returns what it received, then the structure is not modified.
            If it returns undefined then the member is deleted.

            Example:

            // Parse the text. Values that look like ISO date strings will
            // be converted to Date objects.

            myData = JSON.parse(text, function (key, value) {
                var a;
                if (typeof value === 'string') {
                    a =
/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                    if (a) {
                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                            +a[5], +a[6]));
                    }
                }
                return value;
            });

            myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
                var d;
                if (typeof value === 'string' &&
                        value.slice(0, 5) === 'Date(' &&
                        value.slice(-1) === ')') {
                    d = new Date(value.slice(5, -1));
                    if (d) {
                        return d;
                    }
                }
                return value;
            });


    This is a reference implementation. You are free to copy, modify, or
    redistribute.

    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.
*/

/*jslint evil: true */

/*global JSON */

/*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", call,
    charCodeAt, getUTCDate, getUTCFullYear, getUTCHours, getUTCMinutes,
    getUTCMonth, getUTCSeconds, hasOwnProperty, join, lastIndex, length,
    parse, propertyIsEnumerable, prototype, push, replace, slice, stringify,
    test, toJSON, toString
*/

if (!this.JSON) {

// Create a JSON object only if one does not already exist. We create the
// object in a closure to avoid creating global variables.

    JSON = function () {

        function f(n) {
            // Format integers to have at least two digits.
            return n < 10 ? '0' + n : n;
        }

        Date.prototype.toJSON = function (key) {

            return this.getUTCFullYear()   + '-' +
                 f(this.getUTCMonth() + 1) + '-' +
                 f(this.getUTCDate())      + 'T' +
                 f(this.getUTCHours())     + ':' +
                 f(this.getUTCMinutes())   + ':' +
                 f(this.getUTCSeconds())   + 'Z';
        };

        var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            escapeable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            gap,
            indent,
            meta = {    // table of character substitutions
                '\b': '\\b',
                '\t': '\\t',
                '\n': '\\n',
                '\f': '\\f',
                '\r': '\\r',
                '"' : '\\"',
                '\\': '\\\\'
            },
            rep;


        function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

            escapeable.lastIndex = 0;
            return escapeable.test(string) ?
                '"' + string.replace(escapeable, function (a) {
                    var c = meta[a];
                    if (typeof c === 'string') {
                        return c;
                    }
                    return '\\u' + ('0000' +
                            (+(a.charCodeAt(0))).toString(16)).slice(-4);
                }) + '"' :
                '"' + string + '"';
        }


        function str(key, holder) {

// Produce a string from holder[key].

            var i,          // The loop counter.
                k,          // The member key.
                v,          // The member value.
                length,
                mind = gap,
                partial,
                value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

            if (value && typeof value === 'object' &&
                    typeof value.toJSON === 'function') {
                value = value.toJSON(key);
            }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

            if (typeof rep === 'function') {
                value = rep.call(holder, key, value);
            }

// What happens next depends on the value's type.

            switch (typeof value) {
            case 'string':
                return quote(value);

            case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

                return isFinite(value) ? String(value) : 'null';

            case 'boolean':
            case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

                return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

            case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

                if (!value) {
                    return 'null';
                }

// Make an array to hold the partial results of stringifying this object value.

                gap += indent;
                partial = [];

// If the object has a dontEnum length property, we'll treat it as an array.

                if (typeof value.length === 'number' &&
                        !(value.propertyIsEnumerable('length'))) {

// The object is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                    length = value.length;
                    for (i = 0; i < length; i += 1) {
                        partial[i] = str(i, value) || 'null';
                    }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                    v = partial.length === 0 ? '[]' :
                        gap ? '[\n' + gap +
                                partial.join(',\n' + gap) + '\n' +
                                    mind + ']' :
                              '[' + partial.join(',') + ']';
                    gap = mind;
                    return v;
                }

// If the replacer is an array, use it to select the members to be stringified.

                if (rep && typeof rep === 'object') {
                    length = rep.length;
                    for (i = 0; i < length; i += 1) {
                        k = rep[i];
                        if (typeof k === 'string') {
                            v = str(k, value, rep);
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v);
                            }
                        }
                    }
                } else {

// Otherwise, iterate through all of the keys in the object.

                    for (k in value) {
                        if (Object.hasOwnProperty.call(value, k)) {
                            v = str(k, value, rep);
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v);
                            }
                        }
                    }
                }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

                v = partial.length === 0 ? '{}' :
                    gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' +
                            mind + '}' : '{' + partial.join(',') + '}';
                gap = mind;
                return v;
            }
        }

// Return the JSON object containing the stringify and parse methods.

        return {
            stringify: function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

                var i;
                gap = '';
                indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

                if (typeof space === 'number') {
                    for (i = 0; i < space; i += 1) {
                        indent += ' ';
                    }

// If the space parameter is a string, it will be used as the indent string.

                } else if (typeof space === 'string') {
                    indent = space;
                }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

                rep = replacer;
                if (replacer && typeof replacer !== 'function' &&
                        (typeof replacer !== 'object' ||
                         typeof replacer.length !== 'number')) {
                    throw new Error('JSON.stringify');
                }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

                return str('', {'': value});
            },


            parse: function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

                var j;

                function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                    var k, v, value = holder[key];
                    if (value && typeof value === 'object') {
                        for (k in value) {
                            if (Object.hasOwnProperty.call(value, k)) {
                                v = walk(value, k);
                                if (v !== undefined) {
                                    value[k] = v;
                                } else {
                                    delete value[k];
                                }
                            }
                        }
                    }
                    return reviver.call(holder, key, value);
                }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

                cx.lastIndex = 0;
                if (cx.test(text)) {
                    text = text.replace(cx, function (a) {
                        return '\\u' + ('0000' +
                                (+(a.charCodeAt(0))).toString(16)).slice(-4);
                    });
                }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

                if (/^[\],:{}\s]*$/.
test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').
replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                    j = eval('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                    return typeof reviver === 'function' ?
                        walk({'': j}, '') : j;
                }

// If the text is not JSON parseable, then a SyntaxError is thrown.

                throw new SyntaxError('JSON.parse');
            }
        };
    }();
}

// ##########################
// File: /Users/malte/workspace/Joose2/examples/blok/block/built_in_class_extension.js
// ##########################


// html escape a string
String.prototype.html = function () {
	var string = new String(this);
	string = string.replace(/\&/g, "&amp;");
	string = string.replace(/\</g, "&lt;");
	string = string.replace(/\>/g, "&gt;");
	string = string.replace(/"/g,  "&quot;")
	string = string.replace(/'/g,  "&#39;");
	
	return string
}
// ##########################
// File: /Users/malte/workspace/Joose2/examples/blok/block/ui/Array.js
// ##########################
Module("block.ui", function () {
    Class("Array", {
        has: {
            array: {
                is: "rw",
                init: function () { return [] }
            }
        },
        methods: {
            initialize: function (array) {
                this.array = array
            },
            each: function (func) {
                var a = this.array
                for(var i = 0, len = a.length; i < len; i++) {
                    func.call(this, a[i])
                }
            },
            call: function (method, paras) {
                this.each(function eachEle (ele) {
                    ele[method].apply(ele, paras)
                })
            }
        }
    })
})

function $A(array) {
    return new block.ui.Array(array)
}
// ##########################
// File: /Users/malte/workspace/Joose2/examples/blok/block/ui/ElementMetaclass.js
// ##########################
Module("block.ui", function (m) {
    Class("ElementMetaclass", {
        isa: Joose.Class,
        methods: {
            attributeMetaclass: function () {
                return m.ElementAttributeMetaclass
            }
        }
    });
    
    Class("ElementAttributeMetaclass", {
        isa: Joose.Attribute/*,
        
        after: {
            addSetter: function (classObject) {
                var name   = this.setterName();
                var getter = this.getterName();
                var before = function (newVal) {
                    if(this[getter]() != newVal) {
                        this.updated()
                    }
                }
                classObject.meta.wrapMethod(name, "before", before)
                
            }
        }*/
    })
})
// ##########################
// File: /Users/malte/workspace/Joose2/examples/blok/block/ui/role/Notification.js
// ##########################
Module("block.ui.role", function () {
    Role("Notification", {
        methods: {
            updated: function () {
                var listener = this.listener;
                for(var i = 0; i < listener.length; i++) {
                    this.listener[i].notify(this)
                }
            },
            
            addListener: function (object) {
                this.listener.push(object);
            },
            
            removeListener: function (object) {
                var listener = this.listener;
                var without  = [];
                for(var i = 0; i < listener.length; i++) {
                    if(object !== this.listener[i]) {
                        without.push(this.listener[i])
                    }
                }
                this.listener = without
            },
            
            notify: function () {}
        }
    })
})
// ##########################
// File: /Users/malte/workspace/Joose2/examples/blok/block/ui/role/Draggable.js
// ##########################
Module("block.ui.role", function () {
    Role("Draggable", {
        methods: {
            makeDraggable: function () {
                var me     = this;        
                this.$.draggable({
                    //drag: onDrag,
                    stop: function () { me.dragComplete(); },
                    grid: document.grid.jQueryGridParameter()
                })
            },
            dragComplete: function () {
                this.updateState()
                this.redraw();
            }
        }
    })
})
// ##########################
// File: /Users/malte/workspace/Joose2/examples/blok/block/ui/role/Resizable.js
// ##########################
Module("block.ui.role", function () {
    Role("Resizable", {
        requires: ["getMinWidth", "getMinHeight"],
        after: {
            place: function () {
                this.makeResizable()
            }
        },
        methods: {
            
            makeResizable: function () {
                var me = this;
                this.resize$().resizable({
                    handles:   'all',
                    autoHide:  true,
                    proxy:     false,
                    minHeight: me.getMinHeight(),
                    minWidth:  me.getMinWidth(),
                    aspectRatio: this.maintainAspectRatio() ? "preserve" : null,
                    stop:        function onResize () { me.onResize() },
                    grid:        document.grid.jQueryGridParameter()
                })
            },
            
            maintainAspectRatio: function () {
                return document.manager.shiftKeyDown()
            },
            resize$: function () {
                return this.$
            },
            onResize: function () {
                this.updateState()
            }
        }
    })
})
// ##########################
// File: /Users/malte/workspace/Joose2/examples/blok/block/ui/role/Focusable.js
// ##########################
Module("block.ui.role", function () {
    Role("Focusable", {
        after: {
            place: function () {
                var me = this;
                this.$.mousedown(function focusClick (e) {
                    e.preventDefault()
                    document.manager.switchFocus(me, e.shiftKey)
                    return false;
                })
            },
            
            focus: function () {
                this.$.append('<div class="focusDiv"></div>')
            },
            
            blur: function () {
                this.$.find(".focusDiv").remove()
            }
        }
    })
})
// ##########################
// File: /Users/malte/workspace/Joose2/examples/blok/block/ui/role/Editable.js
// ##########################
// XXX Refactor to elimate updateState (directly set upon action)
Module("block.ui.role", function () {
    Role("Editable", {
        requires: ["getText", "setText", "_updateStateCore", "touch", "_updateFromCore", "updateState"],
        after: {
            place: function () {
                var me = this;
                this.$.dblclick(function () {
                    me.text(prompt("Please enter Text", me.textContainer().text()));
                    me.updateState()
                })
                
                me.text(this.getText())
            },
            
            _updateFromCore: function (shape) {
                this.text(shape.getText())
            },
            
            _updateStateCore: function () {
                this.setText(this.textContainer().text());
            },
            
            redraw: function () {
                 this.textContainer().text(this.getText())
            }
        },
        methods: {
            
            text: function (t) {
                if(arguments.length > 0) {
                    this.textContainer().text(new String(t).html())
                }
                return this.getText()
            },
            
            textContainer: function () {
                return this.$.find(".textField")
            }
        }
    })
})
// ##########################
// File: /Users/malte/workspace/Joose2/examples/blok/block/ui/role/ShapeUI.js
// ##########################
Module("block.ui.role", function () {
    Role("ShapeUI", {
        requires: [],
        after: {
            place: function () {
                var me = this;
                this.$.contextMenu('ShapeContextMenu', {
                    bindings: {
                        ctDelete: function () {
                            me.destroy()
                        },
                        ctCopy: function () {
                            document.manager.copy(me)
                        },
                        ctBringToFront: function () {
                            me.zIndex(document.manager.nextZIndex())
                        },
                        ctAsGroup: function () {
                            if(!me.meta.isa(block.ui.shape.SelectionGroup)) {
                                alert("selection must be selection group")
                                return
                            }
                            var group = me.asRealGroup();
                            document.shapes.addAndDraw(group)
                            document.manager.switchFocus(group)
                        },
                        
                        ctUnGroup: function () {
                            alert("not implemented")
                        }
                    }
                })
            }
        }
    })
})
// ##########################
// File: /Users/malte/workspace/Joose2/examples/blok/block/ui/role/Group.js
// ##########################
Module("block.ui.role", function () {
    Role("Group", {
        does: [
            block.ui.role.Draggable,
            block.ui.role.Focusable,
            block.ui.role.ShapeUI
        ],
        after: {
            draw: function () {
                var me   = this;
                var left   = null;
                var top    = null;
                var right  = null;
                var bottom = null
                Joose.A.each(this.getElements(), function drawGroupEle (ele) {
                    var myTop = ele.top();
                    if(top == null || myTop < top) {
                        top = myTop
                    }
                    var myLeft = ele.left();
                    if(left == null || myLeft < left) {
                        left = myLeft
                    }
                    var myRight = ele.right();
                    if(right == null || myRight > right) {
                        right = myRight
                    }
                    var myBottom = ele.bottom();
                    if(bottom == null || myBottom > bottom) {
                        bottom = myBottom
                    }
                })
                if(left != null && top != null && right != null && bottom != null) {
                    
                    this.x(left);
                    this.y(top);
                    this.width(right - left)
                    this.height(bottom - top)
                    
                    var dontMoveChildren = true
                    this.updateState(dontMoveChildren)
                }
            }
        },
        
        override: {
        	
        	destroy: function () {
            	document.undo.beginTransaction()
                Joose.A.each(this.getElements(), function (shape) { shape.destroy() })
                this.SUPER()
                document.undo.commit()
            },
            
            touch: function () {
                Joose.A.each(this.getElements(), function (shape) { shape.touch() })
                this.SUPER()
            },
        	
            updateState: function (dontMoveChildren) { // evil hack para to avoid movement ruding initialization
                document.undo.beginTransaction()
                
                var beforeLeft = this.getLeft();
                var beforeTop  = this.getTop();
                
                this.SUPER();
                
                if(!dontMoveChildren) {
                
                    var afterLeft  = this.getLeft();
                    var afterTop   = this.getTop();
                
                    var deltaLeft  = afterLeft - beforeLeft;
                    var deltaTop   = afterTop  - beforeTop;
                
                    if(deltaLeft == 0 && deltaTop == 0) { // we didnt really move :)
                        return
                    }
                
                    Joose.A.each(this.getElements(), function updateChild (ele) {
                        ele.x(ele.left() + deltaLeft)
                        ele.y(ele.top() + deltaTop)
                        if(ele.meta.can("dragComplete")) {
                            ele.redraw()
                        }
                        ele.updateState()
                    })
                }
                
                document.undo.commit()
            }
        },
        
        methods: {
        	
            create: function () {
                return jQuery("<div class='group shape'></div>")
            },
            
            focus: function () {
                this.$.show()
            },
            
            blur: function () {
                this.$.hide()
            }
        }
    })
})
// ##########################
// File: /Users/malte/workspace/Joose2/examples/blok/block/ui/role/Stylable.js
// ##########################
Module("block.ui.role", function () {
    Role("Stylable", {
        requires: ["getStyle", "setStyle"],
        
        after: {
            
            initialize: function () {
                if(this.getStyle() == null) {
                    this.setStyle({})
                }
            },
            
            draw: function () {
                this.drawCSS()
            },
            
            redraw: function () {
                this.drawCSS()
            },
            
            _updateFromCore: function (shape) {
                var before = this.getStyle()
                this.setStyle(shape.getStyle())
                this.drawCSS(before)
            }
        },
        methods: {
            
            drawCSS: function (before) {
                var me    = this;
                var style = this.getStyle()
                
                Joose.O.each(style, function eachCss (value, name) {
                    if(!before || before[name] != value) {
                        me.css(name, value)
                    }
                })
            },
            
            css: function (key, value) {
                if(arguments.length > 1) {
                    this.$.css(key, value)
                    this.$.find(".stylable").css(key, value)
                    this.getStyle()[key] = value
                }
                return this.getStyle()[key]
            }
        }
    })
})
// ##########################
// File: /Users/malte/workspace/Joose2/examples/blok/block/ui/role/Connectable.js
// ##########################
Module("block.ui.role", function () {
    Role("Connectable", {
        
    })
})
// ##########################
// File: /Users/malte/workspace/Joose2/examples/blok/block/ui/Guid.js
// ##########################
Module("block.ui", function () {
	
	var GuidCounter = 0;
	
	Class("Guid", {
		has: {
			id:{}
		},
		
		methods: {
			toString: function () {
				return ""+this.id
			}
		},
		
		classMethods: {
			
			// initializes hash for storing transformed Guids during a replace session
			startReplaceSession: function () {
				this.substitution = {};
			},
			
			// reset guids in a shapes and its childs. Make sure connections stay connected
			replaceGuids: function (shape) {
				
				var me = this;
				
				var shapes       = [shape];
                shape.traverse(function (shape) {
                    shapes.push(shape)
                })
                
                // replace all guids of shapes
                Joose.A.each(shapes, function (s) {
                	var before = shape.getGuid();
                	var after  = shape.resetGuid();
                	
                	me.substitution[before] = after;
                })
                
                // reassign connections
                Joose.A.each(shapes, function (s) {
                	if(s.meta.isa(block.ui.shape.Connection)) {
                		var origin = me.substitution[s.getOriginGuid()];
                		s.setOriginGuid(origin)
                		var dest   = me.substitution[s.getDestinationGuid()];
                		s.setDestinationGuid(dest)
                	}
                })
			},
			
			create: function () {
                return document.paras.guidBase + "-" + GuidCounter++
			}
		}
	})
})
// ##########################
// File: /Users/malte/workspace/Joose2/examples/blok/block/ui/Manager.js
// ##########################
Module("block.ui", function () {
    
    var focusTimeout;
    
    
    Class("Manager", {
        has: {
            _focusElement: {
                is: "ro"
            },
            _zIndex: {
                is:   "rw",
                init: 10
            },
            _tempStore: {
                is: "rw"
            },
            currentKeyCode: {
                is: "rw"
            },
            dirty: {
                is: "rw",
                init: false
            },
            shapeByGuidMap: {
                is: "rw",
                init: function () { return {} }
            }
        },
        after: {
            initialize: function () {
                var me  = this;
                var win = $(window);
                win.keydown(function keydown (event) {
                    me.setCurrentKeyCode(event.keyCode)
                })
                win.keyup(function keyup () {
                    me.setCurrentKeyCode(null)
                })
            },
            
            setDirty: function () {
            	saveMessage("Unsaved")
            }
        },
        methods: {
            clearFocus: function () {
            	
            	if(focusTimeout) { // If focus was set asynchronously, clear the timeout
            		clearTimeout(focusTimeout)
            	}
            	
                if(this._focusElement) {
                    this._focusElement.blur()
                }
                this._focusElement = null
                
                document.propPanel.hide()
            },
            
            // Use when switching focus multiple times to avoid actually doing it every time
            asyncSwitchFocus: function () {
            	if(focusTimeout) {
            		clearTimeout(focusTimeout)
            	}
            	var me   = this;
            	var args = arguments
            	focusTimeout = setTimeout(function () {
            		me.switchFocus.apply(me, args)
            	}, 0)
            },
            
            switchFocus: function (newEle, shiftDown) {
                if(this._focusElement === newEle) {
                    if(shiftDown) {
                        this.clearFocus()
                    }
                    return
                }
                if(this._focusElement) {
                    if(shiftDown) {
                        if(!this._focusElement.meta.isa(block.ui.shape.SelectionGroup)) {
                            var before = this._focusElement;
                            before.blur()
                            this._focusElement = new block.ui.shape.SelectionGroup();
                            this._focusElement.add(before)
                        }
                        this._focusElement.add(newEle)
                        
                        this._focusElement.draw()
                        this._focusElement.redraw();
                        this._focusElement.focus()
                        document.propPanel.setShape(this._focusElement);
                        return
                    } else {
                        this._focusElement.blur()
                    }
                }
                this._focusElement = newEle
                newEle.focus()
                document.propPanel.setShape(newEle);
            },
            
            selectAll: function () {
                var group = new block.ui.shape.SelectionGroup();
                var eles  = document.shapes.getElements();
                Joose.A.each(eles, function (shape) {
                    group.add(shape);
                })
                group.draw()
                group.redraw()
                this.switchFocus(group)
            },
            
            setupShortcuts: function () {
                var me = this;
                var options = {
                    disableInInput: true
                };
                
                var copy = function() {
                    var f = me.getFocusElement();
                    if(f) {
                        me.copy(f)
                    }
                };
                var cut = function() {
                    var f = me.getFocusElement();
                    if(f) {
                        me.copy(f)
                        f.destroy()
                    }
                };
                var paste = function() {
                    me.paste()
                };
                var selectAll = function () {
                    me.selectAll()
                };
                var clearSelection = function () {
                    me.clearFocus()
                }
                var destroy = function () {
                    var cur = me.getFocusElement();
                    if(cur) {
                        cur.destroy()
                    }
                };
                
                var save = function () {
                	saveDocument()
                };
                
                var openDocs = function () {
                	loadDocuments()
                }
                
                
                var undo = function () {
                    document.undo.undo()
                }
                
                $.hotkeys.add("Ctrl+c", options, copy);
                $.hotkeys.add("Meta+c", options, copy);
                $.hotkeys.add("Ctrl+v", options, paste);
                $.hotkeys.add("Meta+v", options, paste);
                $.hotkeys.add("Ctrl+x", options, cut);
                $.hotkeys.add("Meta+x", options, cut);
                $.hotkeys.add("Ctrl+a", options, selectAll);
                $.hotkeys.add("Meta+a", options, selectAll);
                $.hotkeys.add("Ctrl+d", options, clearSelection);
                $.hotkeys.add("Meta+d", options, clearSelection);
                $.hotkeys.add("backspace", options, destroy);
                $.hotkeys.add("del",       options, destroy);
                $.hotkeys.add("Ctrl+z", options, undo);
                $.hotkeys.add("Meta+z", options, undo);
                
                $.hotkeys.add("Ctrl+s", options, save);
                $.hotkeys.add("Meta+s", options, save);
                $.hotkeys.add("Ctrl+o", options, openDocs);
                $.hotkeys.add("Meta+o", options, openDocs);
            },
            
            shiftKeyDown: function () {
                return this.getCurrentKeyCode() == 16
            },
            
            getViewPort: function () {
                return $('#shapeArea')
            },
            
            setMaxZIndex: function (max) {
                if(max > this.getZIndex()) {
                    this.setZIndex(max)
                    $("#leftMenu").css("zIndex", max + 1)
                }
            },
            
            nextZIndex: function () {
                var next = this.getZIndex() + 1;
                this.setZIndex(next);
                return next;
            },
            
            makeGuid: function () {
                return block.ui.Guid.create()
            },
            
            shapeFromGuid: function (guid) {
                return this.shapeByGuidMap[guid]
            },
            
            copy: function (shape) {
                this.setTempStore(JSON.stringify(shape))
            },
            
            copyFocused: function () {
                var shape = this.getFocusElement()
                if(shape) {
                    this.copy(shape)
                }
            },
            
            syncedTime: function () {
            	return new Date().getTime() + document.paras.timeOffset
            },
            
            paste: function () {
                var content = this.getTempStore()
                if(content) {
                	
                	block.ui.Guid.startReplaceSession();
                	
                    var shape = JSON.parse(content)
                    
                    shape.paste(document.shapes);
                }
            }
        }
    })
})
// ##########################
// File: /Users/malte/workspace/Joose2/examples/blok/block/ui/Query.js
// ##########################
Module("block.ui", function (m) {
    Class("Query", {
        has: {
            query: {
                is: "rw"
            }
        },
        
        methods: {
            asHash: function () {
                return this.query;
            },
    
            param: function (name) {
                return this.query[name]
            },
    
            initialize: function () {
                var search = window.location.search;
                var parts  = search.split("?");
                var search = parts[1];

                if(search == null) {
                    search = "";
                }
    
                parts      = search.split("&");
    
                var query  = {};
    
                for(var i = 0; i < parts.length; i++) {
                    var pair = parts[i].split("=");
                    query[unescape(pair[0])] = unescape(pair[1])
                }
        
                this.setQuery(query)
            }
        }
    })
});
// ##########################
// File: /Users/malte/workspace/Joose2/examples/blok/block/ui/Document.js
// ##########################
Module("block.ui", function (m) {
    Class("Document", {
        does: [Joose.Storage],
        has: {
               header: {
                is:   "rw",
                init: function () { return new block.ui.DocumentHeader() }
            },
               body: {
                is: "rw"
            },
            id: {
                is: "rw",
                init: function () {
                    var id = document.paras.docId
                    if(id != null && id != "") {
                        return id
                    }
                    return "default"
                }
            }
        },
        methods: {
            getUser: function () {
                return this.getHeader().getUser()
            }
        }
    })
})
// ##########################
// File: /Users/malte/workspace/Joose2/examples/blok/block/ui/DocumentHeader.js
// ##########################
Module("block.ui", function (m) {
    
    var userId = Math.random();
    
    var defaultTitle = "Untitled Document";
    
    Class("DocumentHeader", {
        does: [Joose.Storage],
        has: {
            title: {
                is:   "rw"
            },
            user: {
                is:   "rw",
                init: function () { return document.location.search ? document.location.search : userId  }
            }
        },
        
        methods: {
        	touch: function () {
        		document.manager.setDirty(true);
        		document.sync.saveState()
        	},
        	
        	// Need this extra method, because setTitle is also called upon initialization
        	changeTitle: function (title) {
        		this.setTitle(title);
        		this.touch()
        	},
        	
        	isDefaultTitle: function () {
        		return this.getTitle == defaultTitle
        	}
        },
        
        after: {
            
            initialize: function () {
                this.setTitle(defaultTitle)
            },
            
            setTitle: function () {
                document.title = (""+this.getTitle() + " - blok");
                $('#documentTitle').html(this.getTitle().html())
            }
        }
    })
})
// ##########################
// File: /Users/malte/workspace/Joose2/examples/blok/block/ui/Element.js
// ##########################
Module("block.ui", function (m) {
    Class("Element", {
        meta: block.ui.ElementMetaclass,
        does: [Joose.Storage, block.ui.role.Notification],
        has: {
            container: {
                is:         "rw",
                persistent: false
            },
            $: {
                is:         "rw",
                persistent: false
            },
            document: {
                is:         "rw",
                init:       function () { return $(document) },
                persistent: false
            },
            viewPort: {
                is:         "rw",
                init:       function () { return document.manager.getViewPort() },
                persistent: false
            },
            placed: {
                is:         "rw",
                init:       false,
                persistent: false
            },
            listener: {
                is:            "rw",
                init:        function () { return [] },
                persistent: false
            },
            
            deleted: {
                is:            "rw",
                init:        false
            },
            
            redrawTimeout: {
            	persistent:   false
            }
        },
        methods: {
            
            isDeleted: function () {
                return this.deleted
            },
            
            getGuid: function () { // override for real Guids, See Shape.js
                return 0
            },
            
            place: function () {},
            draw: function () {
                if(!this.placed && !this.deleted) {
                    this.placed = true
                    this.place()
                }
            },
            
            // call this to make sure you only redraw once in a mass redraw of shapes
            asyncRedraw: function () {
            	if(this.redrawTimeout) {
            		clearTimeout(this.redrawTimeout)
            	}
            	var me = this;
            	this.redrawTimeout = setTimeout(function asyncRedrawCallback () {
            		me.redraw()
            	}, 0)
            },
            
            redraw: function () {},
            
            focus: function () {},
            blur:  function () {},
            
            isSelectionGroup: function () {
                return false
            }
        }
    })
})

// ##########################
// File: /Users/malte/workspace/Joose2/examples/blok/block/ui/Container.js
// ##########################
Module("block.ui", function (m) {
    Class("Container", {
        isa: block.ui.Element,
        has: {
            elements: {
                is: "rw",
                init: function () { return [] }
            }
        },
        after: {
            draw: function () {
                Joose.A.each(this.getElements(), function drawEach (ele) {
                    ele.draw()
                })
            }
        },
        methods: {
            
            traverse: function (func, depth, seen) {
                var me       = this
                var seenHash = seen
                if(!seenHash) {
                    seenHash = {};
                }
                myDepth = depth
                if(!myDepth) {
                    myDepth = 0
                }
                
                var eles = this.getElements();
                for(var i = 0; i < eles.length; i++) {
                    var ele = eles[i];
                    var guid = ele.getGuid()
                    if(!seenHash[guid]) {
                        seenHash[guid] = true
                        func(ele, me, myDepth)
                        ele.traverse(func, myDepth+1, seenHash)
                    }
                }
            },
            
            prettyPrint: function() {
                var html = ""
                var me   = this;
                Joose.A.each(this.getElements(), function (ele) {
                    html += "  "+ele+"\n\n"
                    var fields = ["getGuid", "getLeft", "getWidth", "getHeight", "getTop", "getText", "getDeleted"]
                    Joose.A.each(fields, function (field, i) {
                        if(ele.meta.can(field)) {
                            html += "    "+fields[i]+": "+ ele[field]() +"\n"
                        }
                    })
                    html += ele.prettyPrint()+"\n"
                })
                
                return html
            },
            
            redraw: function () {
                Joose.A.each(this.getElements(), function redrawEach (ele) {
                    ele.redraw()
                })
            },
            add: function (ele) {
                this.getElements().push(ele)
                this.propagate(ele)
            },
            
            removeElement: function (ele) {
                var elements = [];
                Joose.A.each(this.getElements(), function (cur) {
                    if(ele !== cur) {
                        elements.push(cur)
                    }
                })
                this.setElements(elements)
            },
            
            propagate: function (ele) {
                ele.setContainer(this)
                ele.setDocument(this.getDocument())
                ele.setViewPort(this.getViewPort())
            },
            
            finishUnpack: function () {
                var me = this;
                Joose.A.each(this.getElements(), function finishUnpackEach (ele) {
                    me.propagate(ele)
                })
            },
            addAndDraw: function (ele) {
                this.add(ele);
                this.draw();
                this.redraw();
            },
            
            isEmpty: function () {
            	return this.getElements().length == 0;
            }
        }
    })
})
// ##########################
// File: /Users/malte/workspace/Joose2/examples/blok/block/ui/Undo.js
// ##########################
Module("block.ui", function (m) {
    Class("Undo", {
        has: {
            _steps: {
                is: "rw",
                init: function () { return [] }
            },
            
            _activeTransaction: {
            	is: "rw",
            	init: false
            }
        },
        
        methods: {
        	
        	// "Transactions" make all steps until a commit collapse into a single step
        	beginTransaction: function () {
        		if(this.getActiveTransaction()) {
        			return
        		}
        		this.addUndoStep(function emptyUndoStep () {}, block.ui.Shape)
        		this.setActiveTransaction(true);
        	},
        	
        	commit: function () {
        		this.setActiveTransaction(false);
        	},
            
            undo: function () {
                var last = this._steps.pop();
                if(last) {
                    last()
                }
            },
            
            addUndoStep: function (step, shape) {
            	if(!shape.meta.does(block.ui.role.Group)) {
                	console.log("Add Undo step: "+shape)
                
                	if(this.getActiveTransaction()) {
                		var last = this._steps.pop();
                		this._steps.push(function undoWrapper () {
                			last();
                			step();
                		});
                	} else {
                		this._steps.push(step);
                	}
                    
                	if(this._steps.length > 10) { // modulo :)
                	    this._steps.shift()
                	}
            	}
            },
            
            addUpdateStep: function (before) {
                var json = JSON.stringify(before);
                this.addUndoStep(function undoUpdate () {
                    var copy = JSON.parse(json);
                    copy.touch();
                    before.updateFrom(copy);
                    before.touch();
                }, before)
            },
            
            addCreateStep: function (shape) {
                this.addUndoStep(function undoCreate () {
                    shape.destroy()
                }, shape)
            },
            
            addDestroyStep: function (shape) {
                this.addUndoStep(function undoDestroy () {
                    console.log("Undo destroy")
                    shape.setDeleted(false);
                    shape.setPlaced(false); // so we draw again
                    shape.touch()
                    document.shapes.addAndDraw(shape);
                }, shape)
            }
        }
    })
});
// ##########################
// File: /Users/malte/workspace/Joose2/examples/blok/block/ui/Shape.js
// ##########################
Module("block.ui", function (m) {
    Class("Shape", {
        isa: block.ui.Container,
        has: {
            _left:   { 
                is: "rw",
                init: 200
            },
            _top:    { 
                is: "rw",
                init: 100
            },
            _width:  { is: "rw" },
            _height: { is: "rw" },
            _zIndex: { 
                is: "rw",
                init: -1
            },
            _minWidth: {
                is: "rw",
                init: 20
            },
            _minHeight: {
                is: "rw",
                init: 20
            },
            _guid: {
                is: "rw",
                init: function () { return this.initGuid() }
            },
            _lastUpdate: {
                is: "rw",
                init: 0
            },
            // general ViewPort Offset
            _offsetLeft: {
                is: "rw",
                init: function () { return 150; return this.getViewPort().offset().left },
                lazy: true
            },
            _offsetTop: {
                is: "rw",
                init: function () { return 0; return this.getViewPort().offset().top },
                lazy: true
            },
            _style : {
                is: "rw",
                init: function () { return {} }
            }
        },
        methods: {
            
            
            
            create: function () {
                throw "Abstract"
            },
            
            initGuid: function () {
                return document.manager.makeGuid(this)
            },
            
            addDragPoints: function () {},
            makeDraggable: function () {},
            
            place: function () {
                this.$ = this.create()
                this.getViewPort().append(this.$)
                
                var zIndex = this.getZIndex();
                if(zIndex == -1) {
                    zIndex = document.manager.nextZIndex();
                }
                this.zIndex(zIndex)
                
                this.x(this.getLeft());
                this.y(this.getTop())
                //this.width(""+ this.getWidth()+"px");
                //this.height(""+this.getHeight()+"px");
                this.width(this.getWidth());
                this.height(this.getHeight());
                
                this.addDragPoints();
                this.makeDraggable();
            },
            
            prepareStorage: function () {
                //this._updateStateCore()
            },
            
            _updateStateCore: function () {
                var offset = this.offset()
                this.setLeft(offset.left);
                this.setTop(offset.top);
                this.setWidth(this.width());
                this.setHeight(this.height())
            },
            
            updateState: function () {
                if(!this.isDeleted()) {
                    document.undo.addUpdateStep(this)
                    this._updateStateCore();
                    this.touch();
                }
            },
            
            touch: function () {
                document.propPanel.refresh(this);
                this.setLastUpdate(this.syncedTime())
                console.log("Touch: "+this.getLastUpdate())
                document.manager.setDirty(true)
                
                 // notify listeners
                this.updated()
                
                document.sync.saveState()
            },
            
            // augment in sub class or role to update extra state
            _updateFromCore: function (shape) {
                
                if(shape.isDeleted() && !this.isDeleted()) {
                    this.destroy()
                } 
                else if(!this.isDeleted()) {
                    if(shape.getLeft() != this.getLeft())                
                        this.x(shape.getLeft());
                    if(shape.getTop() != this.getTop())       
                        this.y(shape.getTop());
                    if(shape.getWidth() != this.getWidth())   
                        this.width(shape.getWidth());
                    if(shape.getHeight() != this.getHeight())       
                        this.height(shape.getHeight());
                    this.setLastUpdate(shape.getLastUpdate())
                }
            },
            
            updateFrom: function (shape) {
                console.log(shape.getLastUpdate() +">"+ this.getLastUpdate())
                if(shape.getLastUpdate() > this.getLastUpdate()) {
                    console.log("Change shape")
                    this._updateFromCore(shape)
                    this._updateStateCore()
                    document.propPanel.refresh(this);
                    
                    // notify listeners
                    this.updated()
                }
            },
            
            syncedTime: function () {
                return document.manager.syncedTime();
            },
            offset: function () {
                var offset = this.dim$().offset();
                offset.left -= this.getOffsetLeft();
                offset.top  -= this.getOffsetTop();
                return offset;
            },
            left: function (left) {
                var ele = this.dim$();
                if(arguments.length > 0) {
                    var before = this.left()
                    ele.css("left", ""+left+"px")
                    ele.width(this.width() - (left - before))
                } else {
                    return ele.offset().left - this.getOffsetLeft()
                }
            },
            top: function (top) {
                var ele = this.dim$();
                if(arguments.length > 0) {
                    var before = this.top()
                    ele.css("top", ""+top+"px")
                    ele.height(this.height() - (top - before))
                } else {
                    var base = ele.offset().top;
                    var offset = this.getOffsetTop()
                    
                    return base - offset
                }
            },
            
            dim$: function () {
                return this.$
            },
            
            height: function () {
                var ele = this.dim$()
                return ele.height.apply(ele, arguments)
            },
            width: function () {
                var ele = this.dim$()
                return ele.width.apply(ele, arguments)
            },
            right: function (right) {
                if(arguments.length > 0) {
                    this.width(right - this.left())
                } else {
                	var right = this.left() + this.width();
                    return right
                }
            },
            bottom: function (bottom) {
                if(arguments.length > 0) {
                    var top = this.top()
                    this.height(bottom - top)
                } else {
                	var bottom = this.top()  + this.height();
                    return bottom;
                }
            },
            zIndex: function (index) {
                if(arguments.length > 0) {
                    this.setZIndex(index);
                    document.manager.setMaxZIndex(index);
                    this.$.css("zIndex", index)
                } else {
                    throw "Only settable"
                }
            },
            x: function (x) {
                if(arguments.length > 0) {
                    this.$.css("left", ""+x+"px")
                } else {
                    return this.left()
                }
            },
            y: function (y) {
                if(arguments.length > 0) {
                    this.$.css("top", ""+y+"px")
                } else {
                    return this.top()
                }
            },
            center: function (left, top) {
                if(arguments.length > 0) {
                    this.x(Math.round(left - this.width() / 2))
                    this.y(Math.round(top - this.height() / 2))
                } else {
                    return {
                        left: Math.round(this.left() + this.width() / 2),
                        top:  Math.round(this.top()  + this.height() / 2)
                    }
                }
            },
            
            show: function () {
                this.$.show()
            },
            hide: function () {
                this.$.hide()
            },
            
            resetGuid: function () {
            	var guid = this.initGuid();
                this.setGuid(guid)
                this.registerGuid();
                this.touch()
                return guid
            },
            
            paste: function (target) {
            	
            	block.ui.Guid.replaceGuids(this)
                
                target.addAndDraw(this);
                document.manager.asyncSwitchFocus(this)
            },
            
            registerGuid: function () {
                document.manager.shapeByGuidMap[this.getGuid()] = this
            },
            optionalRegisterGuid: function () {
                if(!document.manager.shapeByGuidMap[this.getGuid()]) {
                    this.registerGuid()
                }
            },
            
            /*finishUnpack: function () {
                this.optionalRegisterGuid()
            },*/
            
            destroy: function () {
                this.setDeleted(true);
                this.$.hide()
                this.$.remove()
                this.touch()
                
                document.undo.addDestroyStep(this)
            },
            
            type: function () {
                var name = this.meta.className();
                return name.split('.').pop()
            },
            
           drawOnDoc: function () {
            	var me = this;
            	
            	document.shapes.addAndDraw(me);
                me.touch()
                
                document.undo.addCreateStep(me)
                
                return me
            }
        },
        after: {
            initialize: function () {
                this.optionalRegisterGuid();
            }
        },
        classMethods: {
            addToDoc: function (paras) { // use to add new shapes to the document
                var me = this.meta.instantiate(paras);
               	return me.drawOnDoc()
            }
        }
    })
})
// ##########################
// File: /Users/malte/workspace/Joose2/examples/blok/block/ui/shape/Grid.js
// ##########################
Module("block.ui.shape", function (m) {
	
	var firstDraw = true;
	
    Class("Grid", {
        isa: block.ui.Shape,
        has: {
            distance: {
                is:   "rw",
                init: 20
            },
            color: {
                is: "rw",
                init: "#CCCCCC"
            },
            
            multiSelection: {
                is: "rw"
            }
        },
        methods: {
            place: function () {
                var me       = this;
                
                this.$       = $("#grid");
                
                var offsetLeft = this.getOffsetLeft();
                var offsetTop  = this.getOffsetTop()
                
                var d        = this.getDocument();
                if(firstDraw) {
                	d = $(window)
                	firstDraw = false
                }
                var distance = this.getDistance();
                var width    = d.width()  - offsetLeft - 1
                var height   = d.height() - offsetTop
                var html     = "";
                for(var i = 0; i < width; i += distance) {
                    html += '<div style="top: 0px; left: '+i+'px; width: 1px; height: '+height+'px"></div>\n'
                }
                for(var i = 0; i < height; i += distance) {
                    html += '<div style="top: '+i+'px; left: 0px; width: '+width+'px; height: 1px"><img src="/static/t.gif" width=1 height=1 /></div>\n'
                }
                
                this.$.append(html)
                
                this.$.width(width);
                this.$.height(height);
                
                
                
                this.$.click(function () {
                    document.manager.clearFocus()
                })
                
                
                //FIXME IE support für die MultiSelection
                if(document.all) {
                    return
                }
                
                var start;
                
                // events for multi selection
                this.$.mousedown(function (e) {
                    e.preventDefault()
                    
                    var multi = new block.ui.shape.MultiSelection();
                    multi.draw()
                    multi.redraw()
                    start = e;
                    var baseX = e.pageX - offsetLeft
                    multi.x(baseX);
                    multi.y(e.pageY - offsetTop);
                    multi.width(1);
                    multi.height(1);
                    me.setMultiSelection(multi)
                    
                    var win = $(window);
                    
                    var redrawMulti = function (multi, e) {
                          
                          var deltaX = e.pageX - start.pageX;
                          var deltaY = e.pageY - start.pageY;
                          
                          if(deltaX < 0) {
                              multi.left(e.pageX - offsetLeft);
                              multi.width(deltaX * -1)
                          } else {
                              multi.width( deltaX );
                          }
                          
                          if(deltaY < 0) {
                              multi.top(e.pageY - offsetTop);
                              multi.height(deltaY * -1)
                          } else {
                              multi.height( deltaY );
                          }
                          
                    }
                    
                    var mousemove = function (e) {
                        if(me.getMultiSelection()) {
                            redrawMulti(me.getMultiSelection(), e)
                        }
                    }
                
                    win.mousemove(mousemove)
                
                    win.one("mouseup", function (end) {
                        win.unbind("mousemove", mousemove)
                        var sel = me.getMultiSelection();
                        if(sel) {
                            redrawMulti(sel, end)
                            sel.selectContained()
                            sel.destroy()
                        }
                        me.setMultiSelection(null)
                        return true
                    })
                    
                    
                    return true
                })
                
                
                
            },
            
            redraw: function () {
                this.placed = false
                this.$.html("")
                this.draw()
            },
            
            jQueryGridParameter: function () {
                return [this.getDistance(), this.getDistance()]
            }
        }
    })
})
// ##########################
// File: /Users/malte/workspace/Joose2/examples/blok/block/ui/shape/PropertiesPanel.js
// ##########################
Module("block.ui.shape", function (m) {
	
	var refreshTimeout;
	
    Class("PropertiesPanel", {
        isa: block.ui.Shape,
        has: {
            _shape: {
                is: "rw"
            }
        },
        methods: {
            
            // Warning ugly:
            // ele must be an input or select
            // ele.id must me a method name or a methodName-firstPara
            callProp: function (ele, shape, value) {
                
                var $ele = $(ele);
                
                var id    = ele.id
                 var parts = id.substr(4).split("-");
                 var prop  = parts[0];
                 var optionalPara = parts[1];
                 var paras = [];
                 if(optionalPara) {
                     paras.push(optionalPara)
                 }
                 if(arguments.length > 2) {
                     var val = "" + value;
                     
                     if($ele.attr("addPx")) {
                         val += "px"
                     }
                     paras.push(val)
                 }
                 var does = $ele.attr('jooseDoes');
                 if(shape.meta.can(prop) && (!does || shape.meta.does(shape.meta.classNameToClassObject(does))) ) {
                     ele.disabled = false;
                     var val = shape[prop].apply(shape, paras);
                     if(val != null) {
                         if($ele.attr("addPx")) {
                             val = val.replace(/px/, "")
                         }
                         return val
                     } else {
                         return ""
                     }
                 } else {
                     ele.disabled = true;
                     return "n/a"
                 }
            },
            
            place: function () {
                var me = this;
                
                this.$  = $("#properties");
                
                this.redraw()
                
                this.$.find("#shapeProperties input,#shapeProperties select").each(function () {
                    
                    var input = $(this);
                    
                    input.change(function () {
                        var shape = me.getShape();
                        if(shape) {
                            me.callProp(this, shape, $(this).val())
                            document.manager.setDirty(true)
                            document.sync.saveState()
                        }
                    })
                })
            },
            
            show: function () {
                $('#shapeProperties').show()
                $('#documentProperties').hide()
                this.redraw()
            },
            
            hide: function () {
                $('#shapeProperties').hide()
                $('#documentProperties').show()
                this.redraw()
            },
            
            setShape: function (newEle) {
                this._shape = newEle
                this.refresh(newEle);
                this.show()
            },
            
            refresh: function (shape) {
            	
            	if(refreshTimeout) {
            		clearTimeout(refreshTimeout)
            	}
            	
                var me = this;
                
                refreshTimeout = setTimeout(function () {
                	if(shape === me.getShape()) {
                	    $('#shapeType').html(shape.type())
                	    me.$.find("#shapeProperties input, #shapeProperties select").each(function () {
                	        $(this).val(me.callProp(this, shape))
                	    })
                	    $.colorPicker.refreshSamples()
               	 	}
                }, 0)
            },
            
            redraw: function () {
            	var height = this.$.height();
                this.$.css("top",""+($(window).height() - height - 20) + "px"); // 10 is padding
                this.$.css("width", ""+($(window).width() - 150)  + "px"); // FIXME get rid of constants
            }
        }
    })
})
// ##########################
// File: /Users/malte/workspace/Joose2/examples/blok/block/ui/shape/DragPoint.js
// ##########################
Module("block.ui.shape", function (m) {
    
    Class("DragPoint", {
        isa:  block.ui.Shape,
        does: block.ui.role.Draggable,    
        has: {
            xMethod: {
                is: "rw"
            },
            yMethod: {
                is: "rw"
            }
        },
        methods: {
            
            create: function () {
                return jQuery("<div class='dragPoint shape'></div>")
            },
            redraw: function () {
                this.center(this.getContainer()[this.getXMethod()](), this.getContainer()[this.getYMethod()]())
            },
            dragHandler: function () {
                var me = this;
                return function (e) {
                    var self = me;
                    me.getContainer()[me.getXMethod()](Math.round(me.left() + me.width() / 2))
                    me.getContainer()[me.getYMethod()](Math.round(me.top() + me.height() / 2))
                    me.getContainer().redraw()
                    return false
                }
            }
        }
    })
})
// ##########################
// File: /Users/malte/workspace/Joose2/examples/blok/block/ui/shape/Rectangle.js
// ##########################
Module("block.ui.shape", function (m) {
    Class("Rectangle", {
        isa:  block.ui.Shape,
        does: [
            block.ui.role.Draggable, 
            block.ui.role.Resizable, 
            block.ui.role.Focusable,
            block.ui.role.Editable,
            block.ui.role.ShapeUI,
            block.ui.role.Stylable,
            block.ui.role.Connectable
        ],
        has: {
            _text: {
                is:   "rw",
                init: ""
            }
        },
        methods: {
            create: function () {
                return jQuery("<div class='rectangle shape stylable'><table width=100% height=100%><tr><td valign=center align=center class='textField stdText stylable'></td></tr></table></div>")
            }
        }
    });
})
// ##########################
// File: /Users/malte/workspace/Joose2/examples/blok/block/ui/shape/Image.js
// ##########################
Module("block.ui.shape", function (m) {
    Class("Image", {
        isa:  block.ui.Shape,
        has: {
            _imageUrl: {
                is: "rw",
                init: "/static/pony.jpg"
            }
        },
        does: [
            block.ui.role.Draggable, 
            block.ui.role.Resizable, 
            block.ui.role.Focusable
        ],
        after: {
            place: function () {
                var me = this;
                this.$.dblclick(function () {
                    var url = prompt("Please enter an image URL:", me.getImageUrl());
                    if(url) {
                        me.imageUrl(url);
                        me.updateState()
                    }
                })
                
                this.imageUrl(this.getImageUrl())
                
                this.resizeImage()
            },
            
            _updateFromCore: function (shape) {
                this.imageUrl(shape.getImageUrl())
                this.resizeImage()
            },
            
            _updateStateCore: function () {
                this.setImageUrl(this.imageContainer().find("img").attr('src'));
                this.resizeImage()
            }
            
        },
        methods: {
            
            resizeImage: function () {
                var img = this.imageContainer().find("img");
                img.width(this.getWidth())
                img.height(this.getHeight())
            },
            
            imageUrl: function (url) {
                if(arguments.length > 0) {
                    // rerender to get new size
                    this.imageContainer().html("<img class='image' src='"+url+"' />")
                }
                return this.getImageUrl()
            },
            
            imageContainer: function () {
                return this.$.find("div div")
            },
        

            create: function () {
                return jQuery("<div class='shape'><div><div></div></div></div>")
            },
            
            dim$: function () {
                return this.$
            },
            
            resize$: function () {
                return this.$
            }
        }
    });
})
// ##########################
// File: /Users/malte/workspace/Joose2/examples/blok/block/ui/shape/SelectionGroup.js
// ##########################
Module("block.ui.shape", function (m) {
    Class("SelectionGroup", {
        isa:  block.ui.Shape,
        does: [
            block.ui.role.Group
        ],
        methods: {

            propagate: function () {},
            
            touch: function () {
            	// we are just a selection
            	// Touching ourselves should not make the document dirty 
            	
            	this.updated()
            },
            
            paste: function (target) {
                
                // add only my elements to the target because I am just a transient group
                Joose.A.each(this.getElements(), function (ele) {
                    ele.paste(target)
                })
                
                this.draw();
                this.redraw();
                
                document.manager.asyncSwitchFocus(this)
            },
            
            css: function (key, value) {
                var args = arguments
                if(value != null) {
                    Joose.A.each(this.getElements(), function (shape) {
                        shape.css.apply(shape, args)
                    })
                }
                return ""
            },
            
            asRealGroup: function () {
                var group = new block.ui.shape.Group();
                Joose.A.each(this.getElements(), function (ele) {
                    group.add(ele);
                })
                return group
            }
        }
    });
});

// ##########################
// File: /Users/malte/workspace/Joose2/examples/blok/block/ui/shape/Group.js
// ##########################
Module("block.ui.shape", function (m) {
    Class("Group", {
        isa:  block.ui.Shape,
        does: [
            block.ui.role.Group
        ],
        override: {
            add: function (ele) {
                var oldContainer = ele.getContainer();
                if(oldContainer) {
                    oldContainer.removeElement(ele)
                }
                this.SUPER(ele)
            }
        },
        
        methods: {
            blur: function () {
                this.$.addClass("groupBlurred")
            },
            focus: function () {
                this.$.removeClass("groupBlurred")
            }
        }
    });
})
// ##########################
// File: /Users/malte/workspace/Joose2/examples/blok/block/ui/shape/MultiSelection.js
// ##########################
Module("block.ui.shape", function (m) {
    Class("MultiSelection", {
        isa:  block.ui.Shape,
        does: [],
        methods: {
            create: function () {
                return jQuery("<div class='multiSelection shape'></div>")
            },
            
            touch: function () {
            	// we are just a selection
            	// Touching ourselves should not make the document dirty 
            	
            	this.updated()
            },
            
            selectContained: function () {
                var top    = this.$.offset().top
                var left   = this.left();
                var right  = this.right();
                var bottom = top + this.height()
                
                var group  = new block.ui.shape.SelectionGroup();
                var found  = false;
                
                document.shapes.traverse(function (shape) {
                    if(!shape.getDeleted() && shape.meta.does(block.ui.role.Focusable)) {
                        if(shape.top()    >= top &&
                           shape.left()   >= left &&
                           shape.right()  <= right &&
                           shape.bottom() <= bottom
                          ) {
                            group.add(shape);
                            found = true;
                        }
                    }
                })
                
                if(found) {
                    group.draw()
                    group.redraw();
                    document.manager.switchFocus(group)
                } else {
                    document.manager.clearFocus()
                }
            }
        }
    });
})
// ##########################
// File: /Users/malte/workspace/Joose2/examples/blok/block/ui/CustomShapeBody.js
// ##########################
Module("block.ui", function (m) {
    
    Class("CustomShapeBody", {
        does: [Joose.Storage],
        has: {
            _html: {
                is: "rw",
                init: ""
            },
            _name: {
                is: "rw",
                init: "CustomShape"
            },
            _url: {
                is: "rw"
            },
            _roles: {
                is: "rw",
                init: function () { return [] }
            },
            _description: {
                is: "rw",
                init: ""
            }
        },
        
        methods: {
            getId: function () {
                return this.getUrl() + "/" + this.getName()
            }
        },
        
        override: {
            //allow a style declarion like height:20blok to autosize a shape to our grid size
            getHtml: function () {
                var html = this.SUPER();
                var match;
                while(match = html.match(/(\d+)\s*blok/)) {
                    var n = parseInt(match[1]) * 20;
                    html  = html.replace(/(\d+)\s*blok/, ""+n+"px")
                }
                return html
            }
        }
    });
    
    Class("CustomShapeManager", {
        
        has: {
            _shapeBodies: {
                is: "rw",
                init: function () { return {} }
            }
        },
        
        methods: {
            fetch: function (url) {
                var me = this;
                block.ui.SyncDocument.request("GET", url, null, function shapesFetched (data) {
                    Joose.O.each(data, function (body, key) {
                        body.setUrl(url);
                        var id              = body.getId();
                        me.setBody(body)
                        var h = $('<li><a href="#">'+body.getName().html()+'</li>');
                        h.click(function () { me.drawShape(id) })
                        $('#customShapes').append(h)
                    })
                })
            },
            
            getBody: function (id) {
                return this.getShapeBodies()[id]
            },
            
            setBody: function (body) {
                this.getShapeBodies()[body.getId()] = body
            },
            
            
            drawShape: function (id) {
                
                var body  = this.getBody(id)
                
                var shape = new block.ui.shape.Custom({
                    body: body
                });
                
                shape.drawOnDoc();
            }
        }
    });
})

// ##########################
// File: /Users/malte/workspace/Joose2/examples/blok/block/ui/shape/Custom.js
// ##########################
Module("block.ui.shape", function (m) {
    
    
    Class("Custom", {
        isa:  block.ui.Shape,
        has: {
            _body: {
                is: "rw"
            },
            _text: {
                is:   "rw",
                init: ""
            }
        },
        before: {
            draw: function () {
                this.updateBody()
                this.applyRoles()
            }
        },
        methods: {
            
            updateBody: function () {
                var cur = document.customShapes.getBody(this.getBody().getId())
                if(cur && cur !== this.getBody()) {
                    this.setBody(cur);
                        if(this.$) {
                        this.$.remove();
                        this.placed = false;
                    }
                }
                
            },
            
            // override to ignore changed name through runtime role application
            packedClassName: function () {
                return "block::ui::shape::Custom"
            },
            
            applyRoles: function () {
                var me      = this;
                var strings = this.getBody().getRoles();
                Joose.A.each(strings, function (s) {
                    var name = "block.ui.role."+s
                    var role = me.meta.classNameToClassObject(name);
                    role.meta.apply(me)
                })
            },

            create: function () {
                   var ele = jQuery(this.getBody().getHtml());
                   ele.addClass("shape");
                   ele.addClass("baseSize");
                   return ele
            },
            
            type: function () {
                return this.getBody().getName()
            }
        }
    });
})
// ##########################
// File: /Users/malte/workspace/Joose2/examples/blok/block/ui/shape/Connection.js
// ##########################
var c0, c1
function testConnection() {
    if(!c0) {
        c0 = new block.ui.shape.Connection();
    }
    
    if(!c1) {
        c1 = new block.ui.shape.Connection();
    }
    
    var shapes = document.shapes.getElements();
    c0.connect(shapes[0], shapes[1])
    c1.connect(shapes[0], shapes[2])
}

Module("block.ui.shape", function (m) {
    
    
    Class("Connector", {
        classMethods: {
            
            connectFocused: function () {
                var shapes = document.manager.getFocusElement();
                if(!shapes) {
                    alert("Please select at least two shapes.")
                } else {
                    if(shapes.meta.does(block.ui.role.Group)) {
                        this.connect(shapes.getElements())
                    } else {
                        alert("Please select multiple shapes.")
                    }
                }
            },
            
            connect: function (shapes) {
                
                var dests  = [];
                var origin = shapes[0];
                if(origin) {
                    Joose.A.each(shapes, function (shape) {
                        if(shape.meta.does(block.ui.role.Connectable)) {
                            if(origin && origin.center().top > shape.center().top) {
                                origin = shape;
                            }
                            dests.push(shape)
                        }
                    })

                    dests = Joose.A.remove(dests, origin)
                    
                    Joose.A.each(dests, function (dest) {
                        var connection = m.Connection.addToDoc({
                            origin:      origin,
                            destination: dest
                        })
                        connection.draw()
                        
                        document.shapes.add(connection)
                    })
                }
            }
        }
    })
    
    Class("Connection", {
        isa:  block.ui.Shape,
        
        does: [
            block.ui.role.Focusable
        ],
        
        has: {
            _verticals: {
                is: "rw",
                persistent: false,
                init: function () { return [new m.VerticalLine(), new m.VerticalLine()] }
            },
            _horizontals: {
                is: "rw",
                persistent: false,
                init: function () { return [new m.HorizontalLine()] }
            },
            _origin: {
                is: "rw",
                persistent: false
            },
            _destination: {
                is: "rw",
                persistent: false
            },
            _originGuid: {
                is: "rw"
            },
            _destinationGuid: {
                is: "rw"
            }
        },
        
        
        methods: {
            
            changeNode: function (curNode, newNode) {
            	if(newNode) {
                	if(curNode) {
                	    curNode.removeListener(this)
                	}
                	newNode.addListener(this)
            	} else {
            		console.log("There is now newNode")
            	}
            },
            
            updateFrom: function () {
            	// Do nothing. Update will happen through notification from attached Shapes
            },
            
            notify: function (shape) {
                console.log("redraw connection")
                if(shape.isDeleted() && !this.isDeleted()) {
                    this.destroy()
                } else {
                    this.asyncRedraw()
                }
            },
            
            place: function () {
                this.redraw()
            },
            
            redraw: function () {
                if(!this.isDeleted()) {
                    this.connect(this.getOrigin(), this.getDestination())
                }
            },
            
            /* This currently implements a simple connection strategy based on 3 lines */
            /* and should later be refactored to allow for different connection strategires. */
            connect: function (shape1, shape2) {
            	try {
                	var orig = shape1;
                	var dest = shape2;
                
                	var origBottom = orig.bottom()      
                	var destTop    = dest.top()
            	} catch(e) {
            		window.log(e);
            		return
            	}
                
                if(orig.top() > destTop) {
                    // reverse origin and destination
                    orig = shape2
                    dest = shape1
                    
                    origBottom = orig.bottom()
                    destTop    = dest.top()
                }
                
                var origCenter = orig.center();
                var destCenter = dest.center();
                
                var v0 = this.getVerticals()[0];
                var v1 = this.getVerticals()[1];
                var h0 = this.getHorizontals()[0];
                
                v0.draw()
                v0.y(origBottom + 1)
                v0.x(origCenter.left)
                
                var vlen = (destTop - origBottom) / 2;
                
                v0.len(vlen);
                
                   var hlen = destCenter.left - origCenter.left;
                   
                   h0.draw()
                   h0.y(origBottom + vlen);
                   h0.x(origCenter.left)
                   h0.len(hlen)
                   
                   v1.draw();
                   v1.y(origBottom + vlen);
                v1.x(origCenter.left + hlen)
                v1.len(vlen)
                
                if(origBottom > destTop) {
                    
                    console.log("Special case for later")
                        
                    
                    v0.hide()
                    v1.hide()
                    h0.hide()
                } else {
                    v0.show()
                    v1.show()
                    h0.show()
                }
            }
        },
        
        before: {
            setOrigin: function (newNode) {
                this.changeNode(this.getOrigin(), newNode);
                this.setOriginGuid(newNode.getGuid())
            },
            setDestination: function (newNode) {
                this.changeNode(this.getDestination(), newNode);
                this.setDestinationGuid(newNode.getGuid())
            },
            
            place: function () {
                if(!this.getOrigin() && this.getOriginGuid()) {
                    this.setOrigin(document.manager.shapeFromGuid(this.getOriginGuid()))
                }
                if(!this.getDestination() && this.getDestinationGuid()) {
                    this.setDestination(document.manager.shapeFromGuid(this.getDestinationGuid()))
                }
            }
        },
        after: {
            place: function () {
                var a = [];
                Joose.A.each(this.getVerticals(),   function (line) { a.push(line.$.get(0)) })
                Joose.A.each(this.getHorizontals(), function (line) { a.push(line.$.get(0)) })
                
                this.$ = $(a)
            }
        }
    })
    
    Class("HorizontalLine", {
        isa:  block.ui.Shape,
        does: [
            block.ui.role.Stylable
        ],
        has: {},
        methods: {
            create: function () {
                return jQuery("<div class='line horizontalLine shape'></div>")
            },
            
            getLength: function () {
                return this.getWidth()
            },
            
            updateFrom: function () {
            	//
            },
            
            setLength: function (len) {
                this.setWidth(len);
                if(len >= 0) {
                    this.width(len)
                } else {
                    len = Math.abs(len)
                    this.x(this.left() - len);
                    this.width(len)
                }
            },
            
            redraw: function () {
                this.len(this.getLength())
            },
            
            len: function (len) {
                if(arguments.length > 0) {
                    this.setLength(len)
                }
                return this.width()
            }
        }
    });

    Class("VerticalLine", {
        isa:  m.HorizontalLine,
        methods: {
            create: function () {
                return jQuery("<div class='line verticalLine shape'></div>")
            },
            
            getLength: function () {
                return this.getHeight()
            },
            setLength: function (len) {
                this.setHeight(len);
                if(len >= 0) {
                    this.height(len)
                } else {
                    len = Math.abs(len)
                    this.y(this.top() - len);
                    this.height(len)
                }
            }
        }
    });
})
// ##########################
// File: /Users/malte/workspace/Joose2/examples/blok/block/ui/Template.js
// ##########################
Module("block.ui", function (m) {
	Class("Template", {
		has: {
			_url: {
				is: "rw"
			}
		},
		
		methods: {
			loadAndDraw: function () {
				block.ui.SyncDocument.request("GET", this.getUrl(), null, function templateFetched (template) {
					block.ui.Guid.startReplaceSession();
					template.paste(document.shapes)
				})
			}
		}
	})
})
// ##########################
// File: /Users/malte/workspace/Joose2/examples/blok/block/ui/User.js
// ##########################
Module("block.ui", function (m) {
	Class("User", {
		
		has: {
			id: {
				is: "rw",
				init: document.paras.userName
			}
		},
		
		methods: {
			loggedIn: function () {
				return document.paras.userName != "";
			},
			
			login: function (action) {
				var after = window.location.href;
				after.replace(/#.+/, "");
				after += "&action="+action
				window.location.href = "/login?continue="+encodeURIComponent(after)
			},
			
			saveCurrentDocument: function () {
				if(this.loggedIn()) {
					// make sure we saved this at least once
					document.manager.setDirty(true);
					document.sync.saveState();
					block.ui.SyncDocument.request("GET", "/save", { hash: document.paras.docId }, function saved (template) {
						alert("The document was successfully saved.")
					});
				} else {
					this.login("save");
				}
			},
			
			loadDocuments: function (callback) {
				if(this.loggedIn()) {
					block.ui.SyncDocument.request("GET", "/documents", null, function fetchDocuments (documents) {
						callback(documents)
					});
				} else {
					this.login("open")
				}
				
			}
		}
		
	})
})
// ##########################
// File: /Users/malte/workspace/Joose2/examples/blok/block/ui/Sync.js
// ##########################
JooseGearsInitializeGears()

Module("block.ui", function (m) {
    Class("Sync", {
        
        has: {
            _maxVersion: {
                is: "rw",
                init: 0
            },
            _doc: {
                is: "rw"
            },
            
            _firstUpdate: {
                is: "rw",
                init: true
            },
            
            _syncInterval: {
                is: "rw"
            },
            
            _syncTime: {
                is: "rw"
            },
            
            _saveTimeout: {
            	is: "rw"
            }
        },
        
        methods: {
            
            delayedUpdate: function () {
                var me = this;
                
                window.setTimeout(function syncUpdate () {
                    me.update()
                }, 5000) 
            },
            
            startListening: function ()  {
                var me = this;
                
                // Make sure we do an update at least every 20 seconds
                // This only fires if there was an error on a previous update
                // and no next update was triggered
                window.setInterval(function recoverTimer () {
                    var last = me.getSyncTime();
                    var now  = new Date().getTime();
                    
                    if(now - last > 20000) { // restart syncing if there was no update in 20 seconds
                        me.update()
                    }  
                    
                }, 5000)
            },
            
            update: function () {
                this.setSyncTime(new Date().getTime())
                this.fetchStates();
            },
            
            updateFromArray: function (updates) {
                var me = this;
                for(var i = 0; i < updates.length; i++) {
                    var update = updates[i];
                    console.log("Update from version "+update.version)
                    
                    var doc = update.data
                    
                    me.updateDocument(doc)
                }    
                
                this.fireFirstDraw()
                
                // Request next Update
                this.delayedUpdate()
            },
            
            updateDocument: function (doc) {
                console.log("Got something new!")
                var cur;
                var state = doc.getBody()
                
                var newTitle = doc.getHeader().getTitle();
                if(newTitle != null) {
                    this.getDoc().getHeader().setTitle(newTitle)
                }
                
                state.traverse(function updateDocVisitor (shape, container) {
                    var map = document.manager.shapeByGuidMap
                    var cur = map[shape.getGuid()]
                    if(cur) {
                        console.log("Update")
                        if(!cur.isDeleted()) {
                            cur.updateFrom(shape)
                            // if we changed the hierarchy
                        
                            if(cur.getContainer().getGuid() != container.getGuid()) {
                                cur.getContainer().removeElement(cur)
                                var dest = map[container.getGuid()];
                                if(dest) {
                                	dest.add(cur)
                                } else {
                                	console.log("Cannot find "+container.getGuid())
                                }
                            }
                        }
                    } else {
                        console.log("Insert")
                        var dest
                        if(container === state) { // root
                            dest = document.shapes
                        } else {
                            dest = map[container.getGuid()]
                            if(dest) {
                               	dest.add(cur)
                            } else {
                              	console.log("Cannot find "+container.getGuid())
                            }
                        }
                        if(!shape.isDeleted()) {
                            shape.registerGuid()
                            dest.addAndDraw(shape)
                        }
                    }
                });
                
            },
            
            fireFirstDraw: function () {
            	if(this.getFirstUpdate()) {
                    window.onfirstdraw();
                    this.setFirstUpdate(false)
                }
            },
            
            fetchStates: function () {
                return m.SyncDocument.fetchNewData(this)
            },
            
            _saveState: function () {
            	var timer = this.getSaveTimeout();
            	if(timer) {
            		clearTimeout(timer)
            	}
            	
            	var me = this;
            	this.setSaveTimeout(
            		window.setTimeout(
            			function () {
            				m.SyncDocument.addData(me, false)
            			},
            			800)
            		)
            },
            
            saveState: function () {
                if(document.manager.getDirty()) {
                	saveMessage("Saving...")
                    this._saveState()
                    document.manager.setDirty(false)
                }
            },
            
            savePermanent: function () {
                return m.SyncDocument.addData(this, true)
            },
            
            syncedTime: function () {
                return new Date().getTime()
            }
        }
    });
 
    
    Class("SyncDocument", {
        
        classMethods: {
            fetchNewData: function (sync) {
            
                var dataArray  = [];
                var rows       = []
            
                var doc        = sync.getDoc()
                var maxVersion = sync.getMaxVersion() || 0;
            
                this.request("GET", "/fetch",
                    {
                        hash:        doc.getId(),
                        max_version: maxVersion,
                        session:     document.paras.sessionId,
                        no_cache:    Math.random()
                    },
                    function updateData (data) {
                        console.log("Got data "+data + " Length: "+data.data.length + " (Requested from version "+maxVersion+"/"+Math.round(document.manager.syncedTime()/1000)+")")
                        rows = data.data
                        
                        var newMaxVersion = data.max_version;
            
                        for(var i = 0; i < rows.length; i++) {
                            console.log("Row version "+rows[i].version)
                            dataArray.push({
                                data:    JSON.parse(rows[i].data),
                                version: rows[i].version
                            });
                    
                        }
                        sync.updateFromArray(dataArray)
                        if(newMaxVersion > 0) {
                        	sync.setMaxVersion(newMaxVersion);
                        }
                    })
                
                
            },
            
            addData: function (sync, isSavePoint) {
                var me   = new m.SyncDocument();
                var doc  = sync.getDoc();
                
                var data = JSON.stringify(sync.getDoc());
                
                console.log(data)
    
                this.request("POST", "/add",
                    {
                        hash:         doc.getId(),
                        data:         data,
                        is_savepoint: isSavePoint,
                        name:         doc.getHeader().getTitle(),
                        session:      document.paras.sessionId
                    },
                    function saveMessage () {
                    	window.saveMessage("Saved")
                        console.log("save successful")
                    });
            },
            
            request: function (method, url, data, callback) {
            	try {
                	Joose.Gears.ajaxRequest(method, url, data, function receivedData (data) {
                		console.log(data)
                	    callback(JSON.parse(data))
                	}, function onError (request) {
                		console.log("Error fetching url "+request.url+". Response code: " + request.status + " Response text: "+request.responseText)
                	})
            	} catch (e) {
            		console.log(e)
            	}
            }
        }
        
    });
    

});
// ##########################
// File: /Users/malte/workspace/Joose2/examples/blok/block/base.js
// ##########################
if(!window.console) {
	window.console = {
		log: function log (msg) {
			//$("#stateDialog").html(""+msg+"<br>"+$("#stateDialog").html())
		}
	}
}




Joose.Storage.Unpacker.patchJSON();

$(document).ready(function docReady () {

	$("#leftMenu h2").click(function () {
		$(this).parent().find('ul').toggle()
	})

	document.query   = new block.ui.Query();
	
	document.user    = new block.ui.User();

	document.manager = new block.ui.Manager();
	document.manager.setupShortcuts()

	document.grid = new block.ui.shape.Grid({ container: $("#grid") })
	document.grid.draw();
	
	$('.colorPicker').attachColorPicker();
	
	document.propPanel = new block.ui.shape.PropertiesPanel()
	document.propPanel.draw()
	
	$(window).resize(function onResize () {
		document.propPanel.redraw()
		document.grid.redraw()
	})
	$(window).scroll(function onScroll () {
		document.grid.redraw()
	})
	
	$("#stateDialog").dialog()
	$("#stateDialog").dialog("close")
	
	$("#share").focus(function () {
		this.select()
	})

	document.shapes = new block.ui.Container({ $: $('#shapeArea')});

	var doc         = new block.ui.Document({ body: document.shapes });
	
	document.sync   = new block.ui.Sync({ doc: doc })
	document.sync.update();
	
	document.sync.startListening()
	
	document.undo   = new block.ui.Undo();
	
	document.customShapes = new block.ui.CustomShapeManager();
	//document.customShapes.fetch("/static/custom-shapes/test.shape.json")
	
	$('#welcomeDialog').dialog({
		height: "400px",
		width:  "500px"
	})
	$('#welcomeDialog').dialog("close")
	
	$('#loadDialog').dialog({
		height: "300px",
		width:  "400px"
	});
	$('#loadDialog').dialog("close")
	
	
})

function loadTemplate(url) {
	var template = new block.ui.Template({
		url: url
	})
	
	template.loadAndDraw()
}

function closeWelcomeDialog() {
	$('#welcomeDialog').dialog("close")
}

function showState() {

	var state = document.shapes.prettyPrint()

	$('#stateDialog textarea').val(state)
	$('#Dialog').dialog("open")
}

function showClipboardContent() {
	
	var val = document.manager.getTempStore() || "empty"
	
	$('#stateDialog textarea').val(val)
	$('#stateDialog').dialog("open")
}

function read() {
	$('#shapeArea').html("")
	var json        = document.getElementById("outputArea").value
	if(json != null && json != "") {
		document.shapes = JSON.parse(json);
		document.shapes.draw();
		document.shapes.redraw();
		
		document.sync.getDoc().setBody(document.shapes)
	}
}

function changeName() {
	var current = document.sync.getDoc().getHeader().getTitle()
	var name = prompt('Save as:', current);
	if(name) {
		document.sync.getDoc().getHeader().changeTitle(name)
		return true
	}
	return false
}

function write() {
	document.getElementById("outputArea").value = JSON.stringify(document.shapes)
}

function saveDocument() {
	if(changeName()) {
		document.user.saveCurrentDocument()
	}
}

function loadDocuments() {

	var list = $("#documentList");
	list.html("Loading...")
	
	$('#loadDialog').dialog("open")
	
	var html = "<table class=list>"
	html    += "<tr><th>Name</th><th>Last Update</th></tr>"
	
	document.user.loadDocuments(function (docs) {

		var count = 0;
		Joose.A.each(docs, function (doc) {
			html += "<tr class=listItem onclick=\"loadDocument('"+doc.hash.html()+"')\"><td>"+doc.name.html()+"</td><td>"+doc.lastUpdate.html()+"</td></tr>\n"	
			count++
		})
		
		if(count == 0) {
			html += "<tr><td colspan=2>You have not yet saved any documents.</td></tr>"
		}
		
		html +="</table>"
		
		list.html(html)
		
	})
}

function loadDocument(hash) {
	location.href = "/?id="+hash
}

function saveMessage(msg) {
	$('#saveMessage').html(msg)
}

function doInitialAction() {
	
	window.setTimeout(function () {document.propPanel.redraw()}, 1000) // Safari might have gotten the page height wrong before

	// Only load initial template or display welcome dialog im document is empty
	if(document.shapes.isEmpty()) {
		var template = document.query.param("template")
		if(template && template.length > 0) {
			loadTemplate(template)
		} else {
			$('#welcomeDialog').dialog("open")
		}
	}
	
	var action = document.query.param("action");
	
	if(action == "save") {
		saveDocument()
	}
	
	if(action == "open") {
		loadDocuments()
	}
}



