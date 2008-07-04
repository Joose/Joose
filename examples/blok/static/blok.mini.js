/* jQuery ColorPicker
Written by Virgil Reboton(vreboton@gmail.com)
ColorPicker function structures and attahcment is base on
jQuery UI Date Picker v3.3beta
by Marc Grabanski (m@marcgrabanski.com) and Keith Wood (kbwood@virginbroadband.com.au).
ColorPicker render data is base on
http:
by Matt Kruse
*/
(function($) { 
function colorPicker()
{this._nextId = 0; 
this._inst = []; 
this._curInst = null; 
this._colorpickerShowing = false;this._colorPickerDiv = $('<div id="colorPickerDiv"></div>');}
$.extend(colorPicker.prototype, {/* Class name added to elements to indicate already configured with a time picker. */
markerClassName: 'hasColorPicker',
/* Register a new time picker instance - with custom settings. */
_register: function(inst) {var id = this._nextId++;this._inst[id] = inst;return id;},
/* Retrieve a particular time picker instance based on its ID. */
_getInst: function(id) {return this._inst[id] || id;},
/* Handle keystrokes. */
_doKeyDown: function(e) {var inst = $.colorPicker._getInst(this._colId);if ($.colorPicker._colorpickerShowing) {switch (e.keyCode) {case 9:
$.colorPicker.hideColorPicker();break;
case 27:
$.colorPicker.hideColorPicker();break;}
}
else if (e.keyCode == 40) { 
$.colorPicker.showFor(this);}
},
/* Handle keystrokes. */
_resetSample: function(e) {var inst = $.colorPicker._getInst(this._colId);inst._sampleSpan.css('backgroundColor', inst._input.value);},
/* Does this element have a particular class? */
_hasClass: function(element, className) {var classes = element.attr('class');return (classes && classes.indexOf(className) > -1);},
/* Pop-up the time picker for a given input field.
@param  control  element - the input field attached to the time picker or
string - the ID or other jQuery selector of the input field or
object - jQuery object for input field
@return the manager object */
showFor: function(control) {control = (control.jquery ? control[0] :
(typeof control == 'string' ? $(control)[0] : control));var input = (control.nodeName && control.nodeName.toLowerCase() == 'input' ? control : this);if ($.colorPicker._lastInput == input) { return; }
if ($.colorPicker._colorpickerShowing) { return; }
var inst = $.colorPicker._getInst(input._colId);$.colorPicker.hideColorPicker();$.colorPicker._lastInput = input;if (!$.colorPicker._pos) { 
$.colorPicker._pos = $.colorPicker._findPos(input);$.colorPicker._pos[1] += input.offsetHeight; 
}
var isFixed = true;/*$(input).parents().each(function() {isFixed |= $(this).css('position') == 'fixed';});*/
if (isFixed && $.browser.opera) { 
$.colorPicker._pos[0] -= document.documentElement.scrollLeft;$.colorPicker._pos[1] -= document.documentElement.scrollTop;}
var height = inst._colorPickerDiv.height()
if(height == 0) {height = 188
}
inst._colorPickerDiv.css('position', ($.blockUI ? 'static' : (isFixed ? 'fixed' : 'absolute'))).css('left', $.colorPicker._pos[0]+150 + 'px').css('top', $.colorPicker._pos[1]+1-height + 'px');$.colorPicker._pos = null;$.colorPicker._showColorPicker(inst);return this;},
/* Find an object's position on the screen. */
_findPos: function(obj) {var offset = $(obj).offset();return [offset.left, offset.top]
},
/* Close time picker if clicked elsewhere. */
_checkExternalClick: function(event) {if (!$.colorPicker._curInst)
{return;}
var target = $(event.target);
if ((target.parents("#colorPickerDiv").length == 0) && $.colorPicker._colorpickerShowing && !($.blockUI))
{if (target.text() != $.colorPicker._curInst._colorPickerDiv.text())
$.colorPicker.hideColorPicker();}
},
/* Hide the time picker from view.
@param  speed  string - the speed at which to close the time picker
@return void */
hideColorPicker: function(s) {var inst = this._curInst;if (!inst) {return;}
if (this._colorpickerShowing)
{this._colorpickerShowing = false;this._lastInput = null;this._colorPickerDiv.css('position', 'absolute').css('left', '0px').css('top', '-1000px');if ($.blockUI)
{$.unblockUI();$('body').append(this._colorPickerDiv);}
this._curInst = null;
}
if (inst._input[0].value != inst._sampleSpan.css('backgroundColor'))
{inst._sampleSpan.css('backgroundColor',inst._input[0].value);}
},
/* Attach the time picker to an input field. */
_connectColorPicker: function(target, inst) {var input = $(target);if (this._hasClass(input, this.markerClassName)) { return; }
$(input).attr('autocomplete', 'OFF'); 
inst._input = $(input);
inst._sampleSpan = $('<span class="ColorPickerDivSample" style="background-color:' + inst._input[0].value + ';height:' + inst._input[0].offsetHeight + ';">&nbsp;</span>');input.after(inst._sampleSpan);inst._sampleSpan.click(function() {input.focus();});input.click(this.showFor);
input.focus(this.showFor);input.addClass(this.markerClassName).keydown(this._doKeyDown);input[0]._colId = inst._id;
},
/* Construct and display the time picker. */
_showColorPicker: function(id) {var inst = this._getInst(id);this._updateColorPicker(inst);inst._colorPickerDiv.css('width', inst._startTime != null ? '10em' : '6em');inst._colorPickerDiv.show();if (inst._input[0].type != 'hidden')
{inst._input[0].focus();}
this._curInst = inst;this._colorpickerShowing = true;},
refreshSamples: function () {$('.ColorPickerDivSample').each(function () {$(this).css("backgroundColor", $(this).parent().find(".colorPicker").val())
})
},
/* Generate the time picker content. */
_updateColorPicker: function(inst) {inst._colorPickerDiv.empty().append(inst._generateColorPicker());if (inst._input && inst._input[0].type != 'hidden')
{inst._input[0].focus();$("td.color", inst._timePickerDiv).unbind().mouseover(function() {inst._sampleSpan.css('backgroundColor', $(this).css('backgroundColor'));}).click(function() {inst._setValue(this);});}
}
});/* Individualised settings for time picker functionality applied to one or more related inputs.
Instances are managed and manipulated through the TimePicker manager. */
function ColorPickerInstance()
{this._id = $.colorPicker._register(this);this._input = null;this._colorPickerDiv = $.colorPicker._colorPickerDiv;this._sampleSpan = null;}
$.extend(ColorPickerInstance.prototype, {/* Get a setting value, defaulting if necessary. */
_get: function(name) {return (this._settings[name] != null ? this._settings[name] : $.colorPicker._defaults[name]);},
_getValue: function () {if (this._input && this._input[0].type != 'hidden' && this._input[0].value != "")
{return this._input[0].value;}
return null;},
_setValue: function (sel) {if (this._input && this._input[0].type != 'hidden')
{this._input[0].value = $.attr(sel,'title');$(this._input[0]).change();}
$.colorPicker.hideColorPicker();},
/* Generate the HTML for the current state of the time picker. */
_generateColorPicker: function() {var colors  = new Array("#000000","#000033","#000066","#000099","#0000CC","#0000FF","#330000","#330033","#330066","#330099","#3300CC",
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
"#DDDDDD","#E1E1E1","#FFFFFF");var total = colors.length;var width = 18;var html = "<table border='1px' cellspacing='0' cellpadding='0'>";for (var i=0; i<total; i++)
{if ((i % width) == 0) { html += "<tr>"; }
html += '<td class="color" title="' + colors[i] + '" style="background-color:' + colors[i] + '"><label>&nbsp;&nbsp;&nbsp;</label></td>';if ( ((i+1)>=total) || (((i+1) % width) == 0))
{html += "</tr>";}
}
html += '<tr><td title="" style="background-color:#999" class="color" colspan="' + width + '" align="center"><label>No Color</label></td></tr>'
html += "</table>";return html
}
});/* Attach the time picker to a jQuery selection.
@param  settings  object - the new settings to use for this time picker instance (anonymous)
@return jQuery object - for chaining further calls */
$.fn.attachColorPicker = function() {return this.each(function() {var nodeName = this.nodeName.toLowerCase();if (nodeName == 'input')
{var inst = new ColorPickerInstance();$.colorPicker._connectColorPicker(this, inst);}
});};$.fn.getValue = function() {var inst = (this.length > 0 ? $.colorPicker._getInst(this[0]._colId) : null);return (inst ? inst._getValue() : null);};$.fn.setValue = function(value) {var inst = (this.length > 0 ? $.colorPicker._getInst(this[0]._colId) : null);if (inst) inst._setValue(value);};/* Initialise the time picker. */
$(document).ready(function() {$.colorPicker = new colorPicker(); 
$(document.body).append($.colorPicker._colorPickerDiv).mousedown($.colorPicker._checkExternalClick);});})(jQuery);Joose = function () {this.cc              = null;  
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
Joose.prototype = {/*
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
Joose.MetaClassBootstrap = function () {this._name            = "Joose.MetaClassBootstrap";this.methodNames      =    [];this.attributeNames   =    ["_name", "isAbstract", "methodNames", "attributeNames", "methods", "parentClasses", "roles", "c"];this.attributes       = {},
this.methods          = {};this.parentClasses    = [];this.roles            = [];this.isAbstract       = false;}
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
c.methodNames    = []
c.attributeNames = []
c.methods        = {}
c.parentClasses  = []
c.roles          = []
c.attributes     = {}
var myMeta = this.meta;if(!myMeta) {myMeta = this;}
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
defaultClassFunctionBody: function () {var f = function () {this.initialize.apply(this, arguments);};f.toString = function () {return this.meta.className()
}
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
initializer: function () {return function (paras) {var me = this;if(this.meta.isAbstract) {var name = this.meta.className();throw ""+name+" is an abstract class and may not instantiated."
}
Joose.O.each(this.meta.getAttributes(), function (attr) {attr.doInitialization(me, paras);})
}
},
dieIfString: function (thing) {if(Joose.S.isString(thing)) {throw new TypeError("Parameter must not be a string.")
}
},
addRole: function (roleClass) {this.dieIfString(roleClass);this.roles.push(roleClass);roleClass.meta.apply(this.getClassObject())
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
importMethods: function (classObject) {var me    = this;var names = classObject.meta.getMethodNames();Joose.A.each(names, function (name) {var m = classObject.meta.dispatch(name);me.addMethodObject(m.meta.copy())
})
},
addSuperClass:    function (classObject) {this.dieIfString(classObject);var me    = this;var names = classObject.meta.getMethodNames();Joose.A.each(names, function (name) {var m = classObject.meta.dispatch(name);var o = m.meta.copy();o.setIsFromSuperClass(true)
me.addMethodObject(o)
})
Joose.O.each(classObject.meta.attributes, function (attr, name) {me.addAttribute(name, attr.getProps())
})
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
hasMethod:         function (name) {return this.methods[name] != null
},
addMethod:         function (name, func, props) {var m = new Joose.Method(name, func, props);this.addMethodObject(m)
},
addClassMethod:         function (name, func, props) {var m = new Joose.ClassMethod(name, func, props);this.addMethodObject(m)
},
addMethodObject:         function (method) {var m              = method;var name           = m.getName();if(!Joose.A.exists(this.methodNames, name)) {this.methodNames.push(name);}
this.methods[name] = m;method.addToClass(this.c)
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
getAttributeNames: function () {return this.attributeNames;},
getInstanceMethods: function () {var a = [];Joose.O.each(this.methods, function (m) {if(!m.isClassMethod()) {a.push(m)
}
})
return a
},
getClassMethods: function () {var a = [];Joose.O.each(this.methods, function (m) {if(m.isClassMethod()) {a.push(m)
}
})
return a
},
getSuperClasses:    function () {return this.parentClasses;},
getRoles:    function () {return this.roles;},
getMethodNames:    function () {return this.methodNames;},
addDetacher: function () {this.addMethod("detach", function () {var meta = this.meta;var c    = meta.createClass(meta.className()+"__anon__"+joose.anonymouseClassCounter++);c.meta.addSuperClass(meta.getClassObject());this.meta      = c.meta;this.constructor = c;c.prototype = this;return
if(this.__proto__) {this.__proto__ = c.prototype
} else {   
for(var i in c.prototype) {if(this[i] == null) {this[i] = c.prototype[i]
}
}
}
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
can: function (methodName) {var method = this.methods[methodName];if(!method || method.isClassMethod()) {return false
}
return true
},
classCan: function (methodName) {var method = this.methods[methodName];if(!method || !method.isClassMethod()) {return false
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
addSetter: function (classObject) {var meta  = classObject.meta;var name  = this.getName();var props = this.getProps();var isa   = this.getIsa();var func;if(isa) {func = function (value) {if(!value || !value.meta) {throw "The attribute "+name+" only accepts values that have a meta object."
}
if(!value.meta.isa(isa)) {throw "The attribute "+name+" only accepts values that are objects of type "+isa.meta.className()+"."
}
this[name] = value
return this;}
} else {func = function (value) {this[name] = value
return this;}
}
meta.addMethod(this.setterName(), func);},
addGetter: function (classObject) {var meta  = classObject.meta;var name  = this.getName();var props = this.getProps();var func  = function () {return this[name]
}
var init  = props.init;if(props.lazy) {func = function () {var val = this[name];if(typeof val == "function" && val === init) {this[name] = val.apply(this)
}
return this[name]
}
}
meta.addMethod(this.getterName(), func);},
initializerName: function () {return this.toPublicName()
},
getterName: function () {return "get"+Joose.S.uppercaseFirst(this.toPublicName())
},
setterName: function () {return "set"+Joose.S.uppercaseFirst(this.toPublicName())
},
isPrivate: function () {return this.getName().charAt(0) == "_"
},
toPublicName: function () {var name = this.getName();if(this.isPrivate()) {return name.substr(1)
}
return name
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
initialize: function (name, func, props) {this._name  = name;this._body  = func;this._props = props;func.name = "test"+name
func.meta   = this
},
isClassMethod: function () { return false },
apply:    function (thisObject, args) {return this._body.apply(thisObject, args)
},
asFunction: function () {var me = this
return function () {var args = arguments;return me.apply(this, args)
}
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
this.globalize = function () {Joose.O.each(Joose.Builder.Globals, function (func, name) {joose.top[name] = func
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
joose.cc = c;if(props) {Joose.O.each(props, function (value, name) {
var builder = Joose.Builder.Builders[name];if(!builder) {throw new Error("Called invalid builder "+name+" while creating class "+c.meta.className())
}
var paras   = value;builder.call(Joose.Builder, paras)
})
c.meta.validateClass()
c.meta.buildComplete()
}
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
joosify: function (standardClassName, standardClassObject) {var c         = standardClassObject;var metaClass = new Joose.Class();metaClass.builder = Joose.Class;c.toString = function () { return joose.cc.meta.className() }
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
};Joose.Builder.Builders = {isAbstract: function (bool) {joose.cc.meta.isAbstract = bool
},
/**
* Tells a role that the method name must be implemented by all classes that implement joose.cc role
* @function
* @param methodName {string} Name of the required method name
* @name requires
* @memberof Joose.Builder
*/
/** @ignore */
requires:    function (methodName) {if(!joose.cc.meta.meta.isa(Joose.Role)) { 
throw("Keyword 'requires' only available classes with a meta class of type Joose.Role")
}
if(methodName instanceof Array) {Joose.A.each(methodName, function (name) {joose.cc.meta.addRequirement(name)
})
} else {joose.cc.meta.addRequirement(methodName)
}
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
isa:    function (classObject) {joose.cc.meta.addSuperClass(classObject)
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
does:    function (role) {if(role instanceof Array) {Joose.A.each(role, function (aRole) {joose.cc.meta.addRole(aRole)
})
} else {joose.cc.meta.addRole(role)
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
has:    function (map) {if(typeof map == "string") {var name  = arguments[0];var props = arguments[1];joose.cc.meta.addAttribute(name, props)
} else { 
var me = joose.cc;Joose.O.each(map, function (props, name) {me.meta.addAttribute(name, props)
})
}
},
/**
* @ignore
*/
method: function (name, func, props) {joose.cc.meta.addMethod(name, func, props)
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
methods: function (map) {var me = joose.cc
Joose.O.each(map, function (func, name) {me.meta.addMethod(name, func)
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
classMethods: function (map) {var me = joose.cc
Joose.O.each(map, function (func, name2) {me.meta.addMethodObject(new Joose.ClassMethod(name2, func))
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
workers: function (map) {var me = joose.cc
Joose.O.each(map, function (func, name) {me.meta.addWorker(name, func)
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
before: function(map) {var me = joose.cc
Joose.O.each(map, function (func, name) {me.meta.wrapMethod(name, "before", func);})
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
after: function(map) {var me = joose.cc
Joose.O.each(map, function (func, name) {me.meta.wrapMethod(name, "after", func);})
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
around: function(map) {var me = joose.cc
Joose.O.each(map, function (func, name) {me.meta.wrapMethod(name, "around", func);})
},
/**
* Class builder method
* Defines override method modifieres for the class.
* The defined method modifiers will be called instead the method of the super class.
* You can call the method of the super class by calling joose.cc.SUPER(para1, para2)
* @function
* @param classObject {object} Maps method names to function bodies
* @name override
* @memberof Joose.Builder
*/
/** @ignore */
override: function(map) {var me = joose.cc
Joose.O.each(map, function (func, name) {me.meta.wrapMethod(name, "override", func);})
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
augment: function(map) {var me = joose.cc
Joose.O.each(map, function (func, name) {me.meta.wrapMethod(name, "augment", func, function () {me.meta.addMethod(name, func)
});})
},
/**
* @ignore
*/
decorates: function(map) {var me = joose.cc
Joose.O.each(map, function (classObject, attributeName) {me.meta.decorate(classObject, attributeName)
})
}
};joose.init();Joose.bootstrap2();/*
* A class for methods
* Originally defined in Joose.js
*/
Class("Joose.Method", {methods: {_makeWrapped: function (func) {return this.meta.instantiate(this.getName(), func); 
},
around: function (func) {var orig = this.getBody();return this._makeWrapped(function () {var me = this;var bound = function () { return orig.apply(me, arguments) }
return func.apply(this, Joose.A.concat([bound], arguments))
})
},
before: function (func) {var orig = this.getBody();return this._makeWrapped(function () {func.apply(this, arguments)
return orig.apply(this, arguments);})
},
after: function (func) {var orig = this.getBody();return this._makeWrapped(function () {var ret = orig.apply(this, arguments);func.apply(this, arguments);return ret
})
},
override: function (func) {var orig = this.getBody();return this._makeWrapped(function () {var me      = this;var bound   = function () { return orig.apply(me, arguments) }
var before  = this.SUPER;this.SUPER  = bound;var ret     = func.apply(this, arguments);this.SUPER  = before;return ret
})
},
augment: function (func) {var orig = this.getBody();orig.source = orig.toString();return this._makeWrapped(function () {var exe       = orig;var me        = this;var inner     = func
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
*/
Class("Joose.Method", {methods: {_makeWrapped: function (func) {return this.meta.instantiate(this.getName(), func); 
},
around: function (func) {var orig = this.getBody();return this._makeWrapped(function () {var me = this;var bound = function () { return orig.apply(me, arguments) }
return func.apply(this, Joose.A.concat([bound], arguments))
})
},
before: function (func) {var orig = this.getBody();return this._makeWrapped(function () {func.apply(this, arguments)
return orig.apply(this, arguments);})
},
after: function (func) {var orig = this.getBody();return this._makeWrapped(function () {var ret = orig.apply(this, arguments);func.apply(this, arguments);return ret
})
},
override: function (func) {var orig = this.getBody();return this._makeWrapped(function () {var me      = this;var bound   = function () { return orig.apply(me, arguments) }
var before  = this.SUPER;this.SUPER  = bound;var ret     = func.apply(this, arguments);this.SUPER  = before;return ret
})
},
augment: function (func) {var orig = this.getBody();orig.source = orig.toString();return this._makeWrapped(function () {var exe       = orig;var me        = this;var inner     = func
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
*/
Class("Joose.Attribute", {after: {handleProps: function (classObject) {this.handleHandles(classObject);this.handlePredicate(classObject);}
},
methods: {isPersistent: function () {var props = this.getProps()
if(props.persistent == false) {return false
}
return true
},
doInitialization: function (object, paras) {var  name  = this.initializerName();var _name  = this.getName();var value;var set    = false;if(typeof paras != "undefined" && typeof paras[name] != "undefined") {value = paras[name];set   = true;} else {var props = this.getProps();if(props.required) {throw "Required initialization parameter missing: "+name + "(While initializing "+object+")"
}
var init  = props.init;if(typeof init == "function" && !props.lazy) {value = init.call(object)
set   = true
}
}
if(set) {var setterName = this.setterName();if(object.meta.can(setterName)) { 
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
};f.toString = function () { return this.meta.className() }
return f
},
addSuperClass: function () {throw new Error("Roles may not inherit from a super class.")
},
initialize: function () {this._name               = "Joose.Role"
this.requiresMethodNames = [];this.methodModifiers     = [];},
addRequirement: function (methodName) {this.requiresMethodNames.push(methodName)
},
apply: function (object) {if(joose.isInstance(object)) {object.detach();object.meta.addRole(this.getClassObject());} else {var me    = this;var names = this.getMethodNames();Joose.A.each(names, function (name) {var m = me.dispatch(name);if(!object.meta.hasMethod(name) || object.meta.getMethodObject(name).isFromSuperClass()) {object.meta.addMethodObject(m.meta)
}
})
Joose.A.each(this.methodModifiers, function (paras) {object.meta.wrapMethod.apply(object.meta, paras)
})
}
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
handleGearsMessage: function (message) {var paras  = JSON.parse(message.text);var cbName = paras.to;var ret    = paras.ret;var object = this.calls[paras.index];object[cbName].call(object, ret)
delete this.calls[paras.index]
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
if(!this.canGears()) {var wrapped = function () {var ret = func.apply(this, arguments);this[cbName].call(this, ret)
}
this.addMethod(name, wrapped, props)
return
}
var json = new Joose.SimpleRequest().getText("json2.js")
var source = "function aClass () {}; aClass.prototype."+name+" = "+func.toString()+"\n\n"+
"var wp = google.gears.workerPool\n" +
"wp.onmessage = function (a,b,message) {\n"+
"var paras = JSON.parse(message.text)\n"+
"var o = new aClass(); var ret = o."+name+".apply(o, paras.args); wp.sendMessage(JSON.stringify({ ret: ret, to: paras.cbName, index: paras.index }), message.sender)"+
"\n}\n\n";source += json
var wp      = this.wp;var childId = wp.createWorker(source)
var me      = this
var wrapped = function () {var message = JSON.stringify({ args: arguments, cbName: cbName, index: me.callIndex })
wp.sendMessage(message, childId);me.calls[me.callIndex] = this
me.callIndex++
}
this.addMethod(name, wrapped, props)
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
Class("Joose.Storage", {meta: Joose.Role,
methods: {toJSON: function () {return this.pack()
},
pack: function () {if(this.meta.can("prepareStorage")) {this.prepareStorage()
}
var o  = {__CLASS__: this.packedClassName()
};var me        = this;var attrs      = this.meta.getAttributes();Joose.O.each(attrs, function (attr, name) {if(attr.isPersistent()) {o[name]   = me[name];}
})
return o
},
packedClassName: function () {var name   = this.meta.className();var parts  = name.split(".");return parts.join("::");}
},
classMethods: {unpack: function (data) {var meta      = this.meta
var me        = meta.instantiate();var seenClass = false;Joose.O.each(data, function (value,name) {if(name == "__CLASS__") {var className = Joose.Storage.Unpacker.packedClassNameToJSClassName(value)
if(className != me.meta.className()) {throw new Error("Storage data is of wrong type "+className+". I am "+me.meta.className()+".")
}
seenClass = true
return
}
me[name] = value
})
if(!seenClass) {throw new Error("Serialized data needs to include a __CLASS__ attribute.: "+data)
}
if(me.meta.can("finishUnpack")) {me.finishUnpack()
}
return me
}
}
})
Class("Joose.Storage.Unpacker", {classMethods: {unpack: function (data) {var name = data.__CLASS__;if(!name) {throw("Serialized data needs to include a __CLASS__ attribute.")
}
var jsName = this.packedClassNameToJSClassName(name)
var co = this.meta.classNameToClassObject(jsName);return co.unpack(data)
},
packedClassNameToJSClassName: function (packed) {
var parts  = packed.split("-");parts      = parts[0].split("::");return parts.join(".");},
jsonParseFilter: function (key, value) {if(value != null && typeof value == "object" && value.__CLASS__) {return Joose.Storage.Unpacker.unpack(value)
}
return value
},
patchJSON: function () {var orig = JSON.parse;JSON.parse = function (s, filter) {return orig(s, function (key, value) {var val = value;if(filter) {val = filter(key, value)
}
return Joose.Storage.Unpacker.jsonParseFilter(key,val)
})
}
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
Class("Joose.Module", {has: {_name: {is: rw
},
_elements: {is: rw
},
_container: {is: rw
}
},
classMethods: {setup: function (name, functionThatCreatesClassesAndRoles) {var me      = this;var parts   = name.split(".");var object  = joose.top;var soFar   = []
var module;for(var i = 0; i < parts.length; i++) {var part = parts[i];if(part == "meta") {throw "Module names may not include a part called 'meta'."
}
cur = object[part];soFar.push(part)
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
removeGlobalSymbols: function () {Joose.A.each(this.getElements(), function () {var global = this.globalName(thing.getName());delete joose.top[global]
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
Class("Joose.PrototypeLazyMetaObjectProxy", {has: {metaObject: {is: rw,
isa: Joose.Class,
handles: "*",
handleWith: function (name) {return function () {
var o = this.object;o.meta = this.metaObject;o.detach()
o.meta[name].apply(o.meta, arguments)
}
}
},
object: {is: rw
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
_validate: function (value) {var con = this._constraints;var i;for(i = 0, len = con.length; i < len; i++) {var func = con[i];var result = false;if(func instanceof RegExp) {result = func.test(value)
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
/*
json2.js
2008-02-14
Public Domain
No warranty expressed or implied. Use at your own risk.
See http:
This file creates a global JSON object containing two methods:
JSON.stringify(value, whitelist)
value       any JavaScript value, usually an object or array.
whitelist   an optional array parameter that determines how object
values are stringified.
This method produces a JSON text from a JavaScript value.
There are three possible ways to stringify an object, depending
on the optional whitelist parameter.
If an object has a toJSON method, then the toJSON() method will be
called. The value returned from the toJSON method will be
stringified.
Otherwise, if the optional whitelist parameter is an array, then
the elements of the array will be used to select members of the
object for stringification.
Otherwise, if there is no whitelist parameter, then all of the
members of the object will be stringified.
Values that do not have JSON representaions, such as undefined or
functions, will not be serialized. Such values in objects will be
dropped; in arrays will be replaced with null.
JSON.stringify(undefined) returns undefined. Dates will be
stringified as quoted ISO dates.
Example:
var text = JSON.stringify(['e', {pluribus: 'unum'}]);JSON.parse(text, filter)
This method parses a JSON text to produce an object or
array. It can throw a SyntaxError exception.
The optional filter parameter is a function that can filter and
transform the results. It receives each of the keys and values, and
its return value is used instead of the original value. If it
returns what it received, then structure is not modified. If it
returns undefined then the member is deleted.
Example:
myData = JSON.parse(text, function (key, value) {return key.indexOf('date') >= 0 ? new Date(value) : value;});This is a reference implementation. You are free to copy, modify, or
redistribute.
Use your own copy. It is extremely unwise to load third party
code into your pages.
*/
/*jslint evil: true */
/*global JSON */
/*members "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
charCodeAt, floor, getUTCDate, getUTCFullYear, getUTCHours,
getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join, length,
parse, propertyIsEnumerable, prototype, push, replace, stringify, test,
toJSON, toString
*/
if (!this.JSON) {JSON = function () {function f(n) {    
return n < 10 ? '0' + n : n;}
Date.prototype.toJSON = function () {return this.getUTCFullYear()   + '-' +
f(this.getUTCMonth() + 1) + '-' +
f(this.getUTCDate())      + 'T' +
f(this.getUTCHours())     + ':' +
f(this.getUTCMinutes())   + ':' +
f(this.getUTCSeconds())   + 'Z';};var m = {    
'\b': '\\b',
'\t': '\\t',
'\n': '\\n',
'\f': '\\f',
'\r': '\\r',
'"' : '\\"',
'\\': '\\\\'
};function stringify(value, whitelist) {var a,          
i,          
k,          
l,          
r = /["\\\x00-\x1f\x7f-\x9f]/g,
v;          
switch (typeof value) {case 'string':
return r.test(value) ?
'"' + value.replace(r, function (a) {var c = m[a];if (c) {return c;}
c = a.charCodeAt();return '\\u00' + Math.floor(c / 16).toString(16) +
(c % 16).toString(16);}) + '"' :
'"' + value + '"';case 'number':
return isFinite(value) ? String(value) : 'null';case 'boolean':
case 'null':
return String(value);case 'object':
if (!value) {return 'null';}
if (typeof value.toJSON === 'function') {return stringify(value.toJSON());}
a = [];if (typeof value.length === 'number' &&
!(value.propertyIsEnumerable('length'))) {l = value.length;for (i = 0; i < l; i += 1) {a.push(stringify(value[i], whitelist) || 'null');}
return '[' + a.join(',') + ']';}
if (whitelist) {l = whitelist.length;for (i = 0; i < l; i += 1) {k = whitelist[i];if (typeof k === 'string') {v = stringify(value[k], whitelist);if (v) {a.push(stringify(k) + ':' + v);}
}
}
} else {for (k in value) {if (typeof k === 'string') {v = stringify(value[k], whitelist);if (v) {a.push(stringify(k) + ':' + v);}
}
}
}
return '{' + a.join(',') + '}';}
}
return {stringify: stringify,
parse: function (text, filter) {var j;function walk(k, v) {var i, n;if (v && typeof v === 'object') {for (i in v) {if (Object.prototype.hasOwnProperty.apply(v, [i])) {n = walk(i, v[i]);if (n !== undefined) {v[i] = n;} else {delete v[i];}
}
}
}
return filter(k, v);}
if (/^[\],:{}\s]*$/.test(text.replace(/\\./g, '@').
replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {j = eval('(' + text + ')');return typeof filter === 'function' ? walk('', j) : j;}
throw new SyntaxError('parseJSON');}
};}();}
Module("block.ui", function () {Class("Array", {has: {array: {is: "rw",
init: function () { return [] }
}
},
methods: {initialize: function (array) {this.array = array
},
each: function (func) {var a = this.array
for(var i = 0, len = a.length; i < len; i++) {func.call(this, a[i])
}
},
call: function (method, paras) {this.each(function (ele) {ele[method].apply(ele, paras)
})
}
}
})
})
function $A(array) {return new block.ui.Array(array)
}
Module("block.ui", function (m) {Class("ElementMetaclass", {isa: Joose.Class,
methods: {attributeMetaclass: function () {return m.ElementAttributeMetaclass
}
}
});Class("ElementAttributeMetaclass", {isa: Joose.Attribute/*,
after: {addSetter: function (classObject) {var name   = this.setterName();var getter = this.getterName();var before = function (newVal) {if(this[getter]() != newVal) {this.updated()
}
}
classObject.meta.wrapMethod(name, "before", before)
}
}*/
})
})
Module("block.ui.role", function () {Role("Notification", {methods: {updated: function () {var listener = this.listener;for(var i = 0; i < listener.length; i++) {this.listener[i].notify(this)
}
},
addListener: function (object) {this.listener.push(object);},
removeListener: function (object) {var listener = this.listener;var without  = [];for(var i = 0; i < listener.length; i++) {if(object !== this.listener[i]) {without.push(this.listener[i])
}
}
this.listener = without
},
notify: function () {}
}
})
})
Module("block.ui.role", function () {Role("Draggable", {methods: {makeDraggable: function () {var me     = this;
this.$.draggable({stop: function () { me.dragComplete(); },
grid: document.grid.jQueryGridParameter()
})
},
dragComplete: function () {this.updateState()
this.redraw();}
}
})
})
Module("block.ui.role", function () {Role("Resizable", {requires: ["getMinWidth", "getMinHeight"],
after: {place: function () {this.makeResizable()
}
},
methods: {makeResizable: function () {var me = this;this.resize$().resizable({handles:   'all',
autoHide:  true,
proxy:     false,
minHeight: me.getMinHeight(),
minWidth:  me.getMinWidth(),
aspectRatio: this.maintainAspectRatio() ? "preserve" : null,
stop:        function () { me.onResize() },
grid:        document.grid.jQueryGridParameter()
})
},
maintainAspectRatio: function () {return document.manager.shiftKeyDown()
},
resize$: function () {return this.$
},
onResize: function () {this.updateState()
}
}
})
})
Module("block.ui.role", function () {Role("Focusable", {after: {place: function () {var me = this;this.$.mousedown(function () {document.manager.switchFocus(me)
})
},
focus: function () {this.$.addClass("focus")
},
blur: function () {this.$.removeClass("focus")
}
}
})
})
Module("block.ui.role", function () {Role("Editable", {requires: ["getText", "setText", "_updateStateCore", "touch", "_updateFromCore", "updateState"],
after: {place: function () {var me = this;this.$.dblclick(function () {me.text(prompt("Please enter Text", me.textContainer().text()));me.updateState()
})
me.text(this.getText())
},
_updateFromCore: function (shape) {this.text(shape.getText())
},
_updateStateCore: function () {this.setText(this.textContainer().text());},
redraw: function () {this.textContainer().text(this.getText())
}
},
methods: {text: function (t) {if(arguments.length > 0) {this.textContainer().text(t)
}
return this.getText()
},
textContainer: function () {return this.$.find(".textField")
}
}
})
})
Module("block.ui.role", function () {Role("ShapeUI", {requires: [],
after: {place: function () {var me = this;this.$.contextMenu('ShapeContextMenu', {bindings: {ctDelete: function () {me.destroy()
},
ctCopy: function () {document.manager.copy(me)
},
ctBringToFront: function () {me.zIndex(document.manager.nextZIndex())
},
ctAsGroup: function () {if(!me.meta.isa(block.ui.shape.SelectionGroup)) {alert("selection must be selection group")
return
}
var group = me.asRealGroup();document.shapes.addAndDraw(group)
document.manager.switchFocus(group)
},
ctUnGroup: function () {alert("not implemented")
}
}
})
}
}
})
})
Module("block.ui.role", function () {Role("Group", {does: [
block.ui.role.Draggable,
block.ui.role.Focusable,
block.ui.role.ShapeUI
],
before: {destroy: function () {Joose.A.each(this.getElements(), function (shape) { shape.destroy() })
},
touch: function () {Joose.A.each(this.getElements(), function (shape) { shape.touch() })
}
},
after: {draw: function () {var me   = this;var left   = null;var top    = null;var right  = null;var bottom = null
Joose.A.each(this.getElements(), function (ele) {var myTop = ele.top();if(top == null || myTop < top) {top = myTop
}
var myLeft = ele.left();if(left == null || myLeft < left) {left = myLeft
}
var myRight = ele.right();if(right == null || myRight > right) {right = myRight
}
var myBottom = ele.bottom();if(bottom == null || myBottom > bottom) {bottom = myBottom
}
})
if(left != null && top != null && right != null && bottom != null) {this.x(left);this.y(top);this.width(right - left)
this.height(bottom - top)
var dontMoveChildren = true
this.updateState(dontMoveChildren)
}
}
},
override: {updateState: function (dontMoveChildren) { 
var beforeLeft = this.getLeft();var beforeTop  = this.getTop();this.SUPER();if(!dontMoveChildren) {var afterLeft  = this.getLeft();var afterTop   = this.getTop();var deltaLeft  = afterLeft - beforeLeft;var deltaTop   = afterTop  - beforeTop;if(deltaLeft == 0 && deltaTop == 0) { 
return
}
Joose.A.each(this.getElements(), function (ele) {ele.x(ele.left() + deltaLeft)
ele.y(ele.top() + deltaTop)
if(ele.meta.can("dragComplete")) {ele.redraw()
}
ele.updateState()
})
}
}
},
methods: {create: function () {return jQuery("<div class='group shape'></div>")
},
focus: function () {this.$.show()
},
blur: function () {this.$.hide()
}
}
})
})
Module("block.ui.role", function () {Role("Stylable", {requires: ["getStyle", "setStyle"],
after: {initialize: function () {if(this.getStyle() == null) {this.setStyle({})
}
},
draw: function () {this.drawCSS()
},
redraw: function () {this.drawCSS()
},
_updateFromCore: function (shape) {var before = this.getStyle()
this.setStyle(shape.getStyle())
this.drawCSS(before)
}
},
methods: {drawCSS: function (before) {var me    = this;var style = this.getStyle()
Joose.O.each(style, function (value, name) {if(!before || before[name] != value) {me.css(name, value)
}
})
},
css: function (key, value) {if(arguments.length > 1) {this.$.css(key, value)
this.$.find(".stylable").css(key, value)
this.getStyle()[key] = value
}
return this.getStyle()[key]
}
}
})
})
Module("block.ui.role", function () {Role("Connectable", {})
})
Module("block.ui", function () {var GuidCounter = 0;Class("Manager", {has: {_focusElement: {is: "ro"
},
_zIndex: {is:   "rw",
init: 10
},
_tempStore: {is: "rw"
},
currentKeyCode: {is: "rw"
},
dirty: {is: "rw",
init: true
},
shapeByGuidMap: {is: "rw",
init: function () { return {} }
}
},
after: {initialize: function () {var me  = this;var win = $(window);win.keydown(function (event) {me.setCurrentKeyCode(event.keyCode)
})
win.keyup(function () {me.setCurrentKeyCode(null)
})
}
},
methods: {clearFocus: function () {if(this._focusElement) {this._focusElement.blur()
}
this._focusElement = null
document.propPanel.hide()
},
switchFocus: function (newEle) {if(this._focusElement === newEle) {if(this.shiftKeyDown()) {this.clearFocus()
}
return
}
if(this._focusElement) {if(this.shiftKeyDown()) {if(!this._focusElement.meta.isa(block.ui.shape.SelectionGroup)) {var before = this._focusElement;before.blur()
this._focusElement = new block.ui.shape.SelectionGroup();this._focusElement.add(before)
}
this._focusElement.add(newEle)
this._focusElement.draw()
this._focusElement.redraw();this._focusElement.focus()
document.propPanel.setShape(this._focusElement);return
} else {this._focusElement.blur()
}
}
this._focusElement = newEle
newEle.focus()
document.propPanel.setShape(newEle);},
selectAll: function () {var group = new block.ui.shape.SelectionGroup();var eles  = document.shapes.getElements();Joose.A.each(eles, function (shape) {group.add(shape);})
group.draw()
group.redraw()
this.switchFocus(group)
},
setupShortcuts: function () {var me = this;var options = {disableInInput: true
};var copy = function() {var f = me.getFocusElement();if(f) {me.copy(f)
}
};var cut = function() {var f = me.getFocusElement();if(f) {me.copy(f)
f.destroy()
}
};var paste = function() {me.paste()
};var selectAll = function () {me.selectAll()
};var clearSelection = function () {me.clearFocus()
}
var destroy = function () {var cur = me.getFocusElement();if(cur) {cur.destroy()
}
};var undo = function () {document.undo.undo()
}
$.hotkeys.add("Ctrl+c", options, copy);$.hotkeys.add("Meta+c", options, copy);$.hotkeys.add("Ctrl+v", options, paste);$.hotkeys.add("Meta+v", options, paste);$.hotkeys.add("Ctrl+x", options, cut);$.hotkeys.add("Meta+x", options, cut);$.hotkeys.add("Ctrl+a", options, selectAll);$.hotkeys.add("Meta+a", options, selectAll);$.hotkeys.add("Ctrl+d", options, clearSelection);$.hotkeys.add("Meta+d", options, clearSelection);$.hotkeys.add("backspace", options, destroy);$.hotkeys.add("del",       options, destroy);$.hotkeys.add("Ctrl+z", options, undo);$.hotkeys.add("Meta+z", options, undo);},
shiftKeyDown: function () {return this.getCurrentKeyCode() == 16
},
getViewPort: function () {return $('#shapeArea')
},
setMaxZIndex: function (max) {if(max > this.getZIndex()) {this.setZIndex(max)
$("#leftMenu").css("zIndex", max + 1)
}
},
nextZIndex: function () {var next = this.getZIndex() + 1;this.setZIndex(next);return next;},
makeGuid: function () {return document.paras.guidBase + "-" + GuidCounter++
},
shapeFromGuid: function (guid) {return this.shapeByGuidMap[guid]
},
copy: function (shape) {this.setTempStore(JSON.stringify(shape))
},
copyFocused: function () {var shape = this.getFocusElement()
if(shape) {this.copy(shape)
}
},
paste: function () {var content = this.getTempStore()
if(content) {var shape = JSON.parse(content)
shape.paste(document.shapes);}
}
}
})
})
Module("block.ui", function (m) {Class("Query", {has: {query: {is: "rw"
}
},
methods: {asHash: function () {return this.query;},
param: function (name) {return this.query[name]
},
initialize: function () {var search = window.location.search;var parts  = search.split("?");var search = parts[1];if(search == null) {search = "";}
parts      = search.split("&");var query  = {};for(var i = 0; i < parts.length; i++) {var pair = parts[i].split("=");query[unescape(pair[0])] = unescape(pair[1])
}
this.setQuery(query)
}
}
})
});Module("block.ui", function (m) {Class("Document", {does: [Joose.Storage],
has: {header: {is:   "rw",
init: function () { return new block.ui.DocumentHeader() }
},
body: {is: "rw"
},
id: {is: "rw",
init: function () {var id = document.paras.docId
if(id != null && id != "") {return id
}
return "default"
}
}
},
methods: {getUser: function () {return this.getHeader().getUser()
}
}
})
})
Module("block.ui", function (m) {var userId = Math.random();Class("DocumentHeader", {does: [Joose.Storage],
has: {title: {is:   "rw"
},
user: {is:   "rw",
init: function () { return document.location.search ? document.location.search : userId  }
}
},
after: {initialize: function () {this.setTitle("Untitled Document")
},
setTitle: function () {document.title = ""+this.getTitle() + " - blok";}
}
})
})
Module("block.ui", function (m) {Class("Element", {meta: block.ui.ElementMetaclass,
does: [Joose.Storage, block.ui.role.Notification],
has: {container: {is:         "rw",
persistent: false
},
$: {is:         "rw",
persistent: false
},
document: {is:         "rw",
init:       function () { return $(document) },
persistent: false
},
viewPort: {is:         "rw",
init:       function () { return document.manager.getViewPort() },
persistent: false
},
placed: {is:         "rw",
init:       false,
persistent: false
},
listener: {is:            "rw",
init:        function () { return [] },
persistent: false
},
deleted: {is:            "rw",
init:        false
}
},
methods: {isDeleted: function () {return this.deleted
},
getGuid: function () { 
return 0
},
place: function () {},
draw: function () {if(!this.placed && !this.deleted) {this.placed = true
this.place()
}
},
redraw: function () {},
focus: function () {},
blur:  function () {},
isSelectionGroup: function () {return false
}
}
})
})
Module("block.ui", function (m) {Class("Container", {isa: block.ui.Element,
has: {elements: {is: "rw",
init: function () { return [] }
}
},
after: {draw: function () {Joose.A.each(this.getElements(), function (ele) {ele.draw()
})
}
},
methods: {traverse: function (func, depth, seen) {var me       = this
var seenHash = seen
if(!seenHash) {seenHash = {};}
myDepth = depth
if(!myDepth) {myDepth = 0
}
Joose.A.each(this.getElements(), function (ele) {var guid = ele.getGuid()
if(!seenHash[guid]) {seenHash[guid] = true
func(ele, me, myDepth)
ele.traverse(func, myDepth+1, seenHash)
}
})
},
prettyPrint: function() {var html = "<ul>\n"
var me   = this;Joose.A.each(this.getElements(), function (ele) {html += "<li>"+ele+"\n<ul>\n"
var fields = ["getGuid", "getLeft", "getWidth", "getHeight", "getTop", "getText", "getDeleted"]
Joose.A.each(fields, function (field, i) {if(ele.meta.can(field)) {html += "<li>"+fields[i]+": "+ ele[field]() +"</li>"
}
})
html += "</ul>\n"
html += ele.prettyPrint()+"</li>\n"
})
html += "</ul>\n"
return html
},
redraw: function () {Joose.A.each(this.getElements(), function (ele) {ele.redraw()
})
},
add: function (ele) {this.getElements().push(ele)
this.propagate(ele)
},
removeElement: function (ele) {var elements = [];Joose.A.each(this.getElements(), function (cur) {if(ele !== cur) {elements.push(cur)
}
})
this.setElements(elements)
},
propagate: function (ele) {ele.setContainer(this)
ele.setDocument(this.getDocument())
ele.setViewPort(this.getViewPort())
},
finishUnpack: function () {var me = this;Joose.A.each(this.getElements(), function (ele) {me.propagate(ele)
})
},
addAndDraw: function (ele) {this.add(ele);this.draw();this.redraw();}
}
})
})
Module("block.ui", function (m) {Class("Undo", {has: {_steps: {is: "rw",
init: function () { return [] }
}
},
methods: {undo: function () {var last = this._steps.pop();if(last) {last()
}
},
addUndoStep: function (step, shape) {if(!shape.meta.does(block.ui.role.Group)) { 
console.log("Add Undo step")
this._steps.push(step);if(this._steps.length > 10) { 
this._steps.shift()
}
}
},
addUpdateStep: function (before) {var json = JSON.stringify(before);this.addUndoStep(function undoUpdate () {var copy = JSON.parse(json);copy.touch();before.updateFrom(copy);before.touch();}, before)
},
addCreateStep: function (shape) {this.addUndoStep(function undoCreate () {shape.destroy()
}, shape)
},
addDestroyStep: function (shape) {this.addUndoStep(function undoDestroy () {console.log("Undo destroy")
shape.setDeleted(false);shape.setPlaced(false); 
shape.touch()
document.shapes.addAndDraw(shape);}, shape)
}
}
})
});Module("block.ui", function (m) {Class("Shape", {isa: block.ui.Container,
has: {_left:   {
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
_minWidth: {is: "rw",
init: 20
},
_minHeight: {is: "rw",
init: 20
},
_guid: {is: "rw",
init: function () { return this.initGuid() }
},
_lastUpdate: {is: "rw",
init: 0
},
_offsetLeft: {is: "rw",
init: function () { return 150; return this.getViewPort().offset().left },
lazy: true
},
_offsetTop: {is: "rw",
init: function () { return 0; return this.getViewPort().offset().top },
lazy: true
},
_style : {is: "rw",
init: function () { return {} }
}
},
methods: {create: function () {throw "Abstract"
},
initGuid: function () {return document.manager.makeGuid(this)
},
addDragPoints: function () {},
makeDraggable: function () {},
place: function () {this.$ = this.create()
this.getViewPort().append(this.$)
var zIndex = this.getZIndex();if(zIndex == -1) {zIndex = document.manager.nextZIndex();}
this.zIndex(zIndex)
this.x(this.getLeft());this.y(this.getTop())
this.width(this.getWidth());this.height(this.getHeight());this.addDragPoints();this.makeDraggable();},
prepareStorage: function () {},
_updateStateCore: function () {var offset = this.offset()
this.setLeft(offset.left);this.setTop(offset.top);this.setWidth(this.width());this.setHeight(this.height())
},
updateState: function () {if(!this.isDeleted()) {document.undo.addUpdateStep(this)
this._updateStateCore();this.touch();}
},
touch: function () {document.propPanel.refresh(this);this.setLastUpdate(this.syncedTime())
console.log("Touch: "+this.getLastUpdate())
document.manager.setDirty(true)
this.updated()
},
_updateFromCore: function (shape) {if(shape.isDeleted() && !this.isDeleted()) {this.destroy()
}
else if(!this.isDeleted()) {if(shape.getLeft() != this.getLeft())
this.x(shape.getLeft());if(shape.getTop() != this.getTop())
this.y(shape.getTop());if(shape.getWidth() != this.getWidth())
this.width(shape.getWidth());if(shape.getHeight() != this.getHeight())
this.height(shape.getHeight());this.setLastUpdate(shape.getLastUpdate())
}
},
updateFrom: function (shape) {console.log(shape.getLastUpdate() +">"+ this.getLastUpdate())
if(shape.getLastUpdate() > this.getLastUpdate()) {console.log("Change shape")
this._updateFromCore(shape)
this._updateStateCore()
document.propPanel.refresh(this);this.updated()
}
},
syncedTime: function () {return new Date().getTime() + document.paras.timeOffset
},
offset: function () {var offset = this.dim$().offset();offset.left -= this.getOffsetLeft();offset.top  -= this.getOffsetTop();return offset;},
left: function (left) {var ele = this.dim$();if(arguments.length > 0) {var before = this.left()
ele.css("left", ""+left+"px")
ele.width(this.width() - (left - before))
} else {return ele.offset().left - this.getOffsetLeft()
}
},
top: function (top) {var ele = this.dim$();if(arguments.length > 0) {var before = this.top()
ele.css("top", ""+top+"px")
ele.height(this.height() - (top - before))
} else {var base = ele.offset().top;var offset = this.getOffsetTop()
return base - offset
}
},
dim$: function () {return this.$
},
height: function () {var ele = this.dim$()
return ele.height.apply(ele, arguments)
},
width: function () {var ele = this.dim$()
return ele.width.apply(ele, arguments)
},
right: function (right) {if(arguments.length > 0) {this.width(right - this.left())
} else {return this.left() + this.width()
}
},
bottom: function (bottom) {if(arguments.length > 0) {var top = this.top()
this.height(bottom - top)
} else {return this.top()  + this.height()
}
},
zIndex: function (index) {if(arguments.length > 0) {this.setZIndex(index);document.manager.setMaxZIndex(index);this.$.css("zIndex", index)
} else {throw "Only settable"
}
},
x: function (x) {if(arguments.length > 0) {this.$.css("left", ""+x+"px")
} else {return this.left()
}
},
y: function (y) {if(arguments.length > 0) {this.$.css("top", ""+y+"px")
} else {return this.top()
}
},
center: function (left, top) {if(arguments.length > 0) {this.x(Math.round(left - this.width() / 2))
this.y(Math.round(top - this.height() / 2))
} else {return {left: Math.round(this.left() + this.width() / 2),
top:  Math.round(this.top()  + this.height() / 2)
}
}
},
show: function () {this.$.show()
},
hide: function () {this.$.hide()
},
resetGuid: function () {this.setGuid(this.initGuid())
this.registerGuid();this.touch()
},
paste: function (target) {this.resetGuid()
this.traverse(function (shape) {shape.resetGuid()
})
target.addAndDraw(this);document.manager.switchFocus(this)
},
registerGuid: function () {document.manager.shapeByGuidMap[this.getGuid()] = this
},
optionalRegisterGuid: function () {if(!document.manager.shapeByGuidMap[this.getGuid()]) {this.registerGuid()
}
},
/*finishUnpack: function () {this.optionalRegisterGuid()
},*/
destroy: function () {this.setDeleted(true);this.$.hide()
this.$.remove()
this.touch()
document.undo.addDestroyStep(this)
},
type: function () {var name = this.meta.className();return name.split('.').pop()
}
},
after: {initialize: function () {this.optionalRegisterGuid();}
},
classMethods: {addToDoc: function (paras) { 
var me = this.meta.instantiate(paras);document.shapes.addAndDraw(me);me.touch()
document.undo.addCreateStep(me)
return me
}
}
})
})
Module("block.ui.shape", function (m) {Class("Grid", {isa: block.ui.Shape,
has: {distance: {is:   "rw",
init: 20
},
color: {is: "rw",
init: "#CCCCCC"
},
multiSelection: {is: "rw"
}
},
methods: {place: function () {var me       = this;this.$       = $("#grid");var offsetLeft = this.getOffsetLeft();var offsetTop  = this.getOffsetTop()
var d        = this.getDocument();var width    = d.width()  - offsetLeft
var height   = d.height() - offsetTop
var distance = this.getDistance();var color    = this.getColor()
var html     = "";for(var i = 0; i < width; i += distance) {html += '<div style="position:absolute; top: 0px; left: '+i+'px; background-color: '+color+'; width: 1px; height: '+height+'px"></div>\n'
}
for(var i = 0; i < height; i += distance) {html += '<div style="position:absolute; top: '+i+'px; left: 0px; background-color: '+color+'; width: '+width+'px; height: 1px"><img src="/static/t.gif" width=1 height=1 /></div>\n'
}
this.$.width(width);this.$.height(height);this.$.click(function () {document.manager.clearFocus()
})
var start;this.$.mousedown(function (e) {var multi = new block.ui.shape.MultiSelection();multi.draw()
multi.redraw()
start = e;var baseX = e.pageX - offsetLeft
multi.x(baseX);multi.y(e.pageY - offsetTop);multi.width(1);multi.height(1);me.setMultiSelection(multi)
var win = $(window);var redrawMulti = function (multi, e) {var deltaX = e.pageX - start.pageX;var deltaY = e.pageY - start.pageY;if(deltaX < 0) {multi.left(e.pageX - offsetLeft);multi.width(deltaX * -1)
} else {multi.width( deltaX );}
if(deltaY < 0) {multi.top(e.pageY - offsetTop);multi.height(deltaY * -1)
} else {multi.height( deltaY );}
}
win.mousemove(function (e) {if(me.getMultiSelection()) {redrawMulti(me.getMultiSelection(), e)
}
})
win.mouseup(function (end) {var sel = me.getMultiSelection();if(sel) {redrawMulti(sel, end)
sel.selectContained()
sel.destroy()
}
me.setMultiSelection(null)
})
})
this.$.append(html)
},
redraw: function () {this.placed = false
this.$.html("")
this.draw()
},
jQueryGridParameter: function () {return [this.getDistance(), this.getDistance()]
}
}
})
})
Module("block.ui.shape", function (m) {Class("PropertiesPanel", {isa: block.ui.Shape,
has: {_shape: {is: "rw"
}
},
methods: {callProp: function (ele, shape, value) {var $ele = $(ele);var id    = ele.id
var parts = id.substr(4).split("-");var prop  = parts[0];var optionalPara = parts[1];var paras = [];if(optionalPara) {paras.push(optionalPara)
}
if(arguments.length > 2) {var val = "" + value;if($ele.attr("addPx")) {val += "px"
}
paras.push(val)
}
var does = $ele.attr('jooseDoes');if(shape.meta.can(prop) && (!does || shape.meta.does(shape.meta.classNameToClassObject(does))) ) {ele.disabled = false;var val = shape[prop].apply(shape, paras);if(val != null) {if($ele.attr("addPx")) {val = val.replace(/px/, "")
}
return val
} else {return ""
}
} else {ele.disabled = true;return "n/a"
}
},
place: function () {var me = this;this.$  = $("#properties");this.redraw()
this.$.find("input,select").each(function () {var input = $(this);input.change(function () {var shape = me.getShape();if(shape) {me.callProp(this, shape, $(this).val())
shape.updateState()
}
})
})
},
show: function () {this.$.show();},
hide: function () {this.$.hide();},
setShape: function (newEle) {this._shape = newEle
this.refresh(newEle);this.show()
},
refresh: function (shape) {var me = this;if(shape === this.getShape()) {$('#shapeType').html(shape.type())
this.$.find("input, select").each(function () {$(this).val(me.callProp(this, shape))
})
$.colorPicker.refreshSamples()
}
},
redraw: function () {this.$.css("top",$(window).height() - this.$.height());}
}
})
})
Module("block.ui.shape", function (m) {Class("DragPoint", {isa:  block.ui.Shape,
does: block.ui.role.Draggable,
has: {xMethod: {is: "rw"
},
yMethod: {is: "rw"
}
},
methods: {create: function () {return jQuery("<div class='dragPoint shape'></div>")
},
redraw: function () {this.center(this.getContainer()[this.getXMethod()](), this.getContainer()[this.getYMethod()]())
},
dragHandler: function () {var me = this;return function (e) {var self = me;me.getContainer()[me.getXMethod()](Math.round(me.left() + me.width() / 2))
me.getContainer()[me.getYMethod()](Math.round(me.top() + me.height() / 2))
me.getContainer().redraw()
return false
}
}
}
})
})
Module("block.ui.shape", function (m) {Class("Rectangle", {isa:  block.ui.Shape,
does: [
block.ui.role.Draggable,
block.ui.role.Resizable,
block.ui.role.Focusable,
block.ui.role.Editable,
block.ui.role.ShapeUI,
block.ui.role.Stylable,
block.ui.role.Connectable
],
has: {_text: {is:   "rw",
init: ""
}
},
methods: {create: function () {return jQuery("<div class='rectangle shape stylable'><table width=100% height=100%><tr><td valign=center align=center class='textField stdText stylable'></td></tr></table></div>")
}
}
});})
Module("block.ui.shape", function (m) {Class("Image", {isa:  block.ui.Shape,
has: {_imageUrl: {is: "rw",
init: "/static/pony.jpg"
}
},
does: [
block.ui.role.Draggable,
block.ui.role.Resizable,
block.ui.role.Focusable
],
after: {place: function () {var me = this;this.$.dblclick(function () {var url = prompt("Please enter an image URL:", me.getImageUrl());if(url) {me.imageUrl(url);me.updateState()
}
})
this.imageUrl(this.getImageUrl())
this.resizeImage()
},
_updateFromCore: function (shape) {this.imageUrl(shape.getImageUrl())
this.resizeImage()
},
_updateStateCore: function () {this.setImageUrl(this.imageContainer().find("img").attr('src'));this.resizeImage()
}
},
methods: {resizeImage: function () {var img = this.imageContainer().find("img");img.width(this.getWidth())
img.height(this.getHeight())
},
imageUrl: function (url) {if(arguments.length > 0) {this.imageContainer().html("<img class='image' src='"+url+"' />")
}
return this.getImageUrl()
},
imageContainer: function () {return this.$.find("div div")
},
create: function () {return jQuery("<div class='shape'><div><div></div></div></div>")
},
dim$: function () {return this.$
},
resize$: function () {return this.$
}
}
});})
Module("block.ui.shape", function (m) {Class("SelectionGroup", {isa:  block.ui.Shape,
does: [
block.ui.role.Group
],
methods: {propagate: function () {},
paste: function (target) {Joose.A.each(this.getElements(), function (ele) {ele.paste(target)
})
this.draw();this.redraw();document.manager.switchFocus(this)
},
css: function (key, value) {var args = arguments
if(value != null) {Joose.A.each(this.getElements(), function (shape) {shape.css.apply(shape, args)
})
}
return ""
},
asRealGroup: function () {var group = new block.ui.shape.Group();Joose.A.each(this.getElements(), function (ele) {group.add(ele);})
return group
}
}
});});Module("block.ui.shape", function (m) {Class("Group", {isa:  block.ui.Shape,
does: [
block.ui.role.Group
],
override: {add: function (ele) {var oldContainer = ele.getContainer();if(oldContainer) {oldContainer.removeElement(ele)
}
this.SUPER(ele)
}
},
methods: {blur: function () {this.$.addClass("groupBlurred")
},
focus: function () {this.$.removeClass("groupBlurred")
}
}
});})
Module("block.ui.shape", function (m) {Class("MultiSelection", {isa:  block.ui.Shape,
does: [],
methods: {create: function () {return jQuery("<div class='multiSelection shape'></div>")
},
selectContained: function () {var top    = this.$.offset().top
var left   = this.left();var right  = this.right();var bottom = top + this.height()
var group  = new block.ui.shape.SelectionGroup();var found  = false;document.shapes.traverse(function (shape) {if(!shape.getDeleted() && shape.meta.does(block.ui.role.Focusable)) {if(shape.top()    >= top &&
shape.left()   >= left &&
shape.right()  <= right &&
shape.bottom() <= bottom
) {group.add(shape);found = true;}
}
})
if(found) {group.draw()
group.redraw();document.manager.switchFocus(group)
} else {document.manager.clearFocus()
}
}
}
});})
Module("block.ui", function (m) {Class("CustomShape", {does: [Joose.Storage],
has: {_html: {is: "rw",
init: ""
},
_name: {is: "rw",
init: "CustomShape"
}
}
})
})
Module("block.ui.shape", function (m) {Class("Custom", {isa:  block.ui.Shape,
has: {_shapeUrl: {is: "rw",
init: ""
},
_customShape: {is: "rw",
persistent: false
},
_text: {is:   "rw",
init: ""
}
},
does: [
block.ui.role.Draggable,
block.ui.role.Resizable,
block.ui.role.Focusable,
block.ui.role.Editable,
block.ui.role.ShapeUI,
block.ui.role.Stylable
],
after: {place: function () {this.shapeUrl(this.getShapeUrl());this.fetchAndDraw()
},
_updateFromCore: function (shape) {this.shapeUrl(shape.getShapeUrl())
},
_updateStateCore: function () {}
},
methods: {fetchAndDraw: function () {var me = this;jQuery.getJSON(this.getShapeUrl(), function shapeFetched (data) {var customShape = Joose.Storage.Unpacker.unpack(data)
me.setCustomShape(customShape)
me.renderCustomShape()
})
},
renderCustomShape: function () {this.html$().html(this.getCustomShape().getHtml());this.redraw()
},
shapeUrl: function (url) {if(arguments.length > 0) {if(url != this.getShapeUrl()) {this.setShapeUrl(url);this.fetchAndDraw();}
}
return this.getShapeUrl()
},
html$: function () {return this.$.find("div div")
},
create: function () {return jQuery("<div class='shape baseSize'><div><div></div></div></div>")
}
}
});})
var c0, c1
function testConnection() {if(!c0) {c0 = new block.ui.shape.Connection();}
if(!c1) {c1 = new block.ui.shape.Connection();}
var shapes = document.shapes.getElements();c0.connect(shapes[0], shapes[1])
c1.connect(shapes[0], shapes[2])
}
Module("block.ui.shape", function (m) {Class("Connector", {classMethods: {connectFocused: function () {var shapes = document.manager.getFocusElement();if(!shapes) {alert("Please select at least two shapes.")
} else {if(shapes.meta.does(block.ui.role.Group)) {this.connect(shapes.getElements())
} else {alert("Please select multiple shapes.")
}
}
},
connect: function (shapes) {var dests  = [];var origin = shapes[0];if(origin) {Joose.A.each(shapes, function (shape) {if(shape.meta.does(block.ui.role.Connectable)) {if(origin && origin.center().top > shape.center().top) {origin = shape;}
dests.push(shape)
}
})
dests = Joose.A.remove(dests, origin)
Joose.A.each(dests, function (dest) {var connection = m.Connection.addToDoc({origin:      origin,
destination: dest
})
connection.draw()
document.shapes.add(connection)
})
}
}
}
})
Class("Connection", {isa:  block.ui.Shape,
does: [
block.ui.role.Focusable
],
has: {_verticals: {is: "rw",
persistent: false,
init: function () { return [new m.VerticalLine(), new m.VerticalLine()] }
},
_horizontals: {is: "rw",
persistent: false,
init: function () { return [new m.HorizontalLine()] }
},
_origin: {is: "rw",
persistent: false
},
_destination: {is: "rw",
persistent: false
},
_originGuid: {is: "rw"
},
_destinationGuid: {is: "rw"
}
},
methods: {changeNode: function (curNode, newNode) {if(curNode) {curNode.removeListener(this)
}
newNode.addListener(this)
},
notify: function (shape) {console.log("redraw connection")
if(shape.isDeleted() && !this.isDeleted()) {this.destroy()
} else {this.redraw()
}
},
place: function () {this.redraw()
},
redraw: function () {if(!this.isDeleted()) {this.connect(this.getOrigin(), this.getDestination())
}
},
/* This currently implements a simple connection strategy based on 3 lines */
/* and should later be refactored to allow for different connection strategires. */
connect: function (shape1, shape2) {var orig = shape1;var dest = shape2;var origBottom = orig.bottom()
var destTop    = dest.top()
if(orig.top() > destTop) {orig = shape2
dest = shape1
origBottom = orig.bottom()
destTop    = dest.top()
}
var origCenter = orig.center();var destCenter = dest.center();var v0 = this.getVerticals()[0];var v1 = this.getVerticals()[1];var h0 = this.getHorizontals()[0];v0.draw()
v0.y(origBottom + 1)
v0.x(origCenter.left)
var vlen = (destTop - origBottom) / 2;v0.len(vlen);var hlen = destCenter.left - origCenter.left;h0.draw()
h0.y(origBottom + vlen);h0.x(origCenter.left)
h0.len(hlen)
v1.draw();v1.y(origBottom + vlen);v1.x(origCenter.left + hlen)
v1.len(vlen)
if(origBottom > destTop) {console.log("Special case for later")
v0.hide()
v1.hide()
h0.hide()
} else {v0.show()
v1.show()
h0.show()
}
}
},
before: {setOrigin: function (newNode) {this.changeNode(this.getOrigin(), newNode);this.setOriginGuid(newNode.getGuid())
},
setDestination: function (newNode) {this.changeNode(this.getDestination(), newNode);this.setDestinationGuid(newNode.getGuid())
},
place: function () {if(!this.getOrigin() && this.getOriginGuid()) {this.setOrigin(document.manager.shapeFromGuid(this.getOriginGuid()))
}
if(!this.getDestination() && this.getDestinationGuid()) {this.setDestination(document.manager.shapeFromGuid(this.getDestinationGuid()))
}
}
},
after: {place: function () {var a = [];Joose.A.each(this.getVerticals(),   function (line) { a.push(line.$.get(0)) })
Joose.A.each(this.getHorizontals(), function (line) { a.push(line.$.get(0)) })
this.$ = $(a)
}
}
})
Class("HorizontalLine", {isa:  block.ui.Shape,
does: [
block.ui.role.Stylable
],
has: {},
methods: {create: function () {return jQuery("<div class='line horizontalLine shape'></div>")
},
getLength: function () {return this.getWidth()
},
setLength: function (len) {this.setWidth(len);if(len >= 0) {this.width(len)
} else {len = Math.abs(len)
this.x(this.left() - len);this.width(len)
}
},
redraw: function () {this.len(this.getLength())
},
len: function (len) {if(arguments.length > 0) {this.setLength(len)
}
return this.width()
}
}
});Class("VerticalLine", {isa:  m.HorizontalLine,
methods: {create: function () {return jQuery("<div class='line verticalLine shape'></div>")
},
getLength: function () {return this.getHeight()
},
setLength: function (len) {this.setHeight(len);if(len >= 0) {this.height(len)
} else {len = Math.abs(len)
this.y(this.top() - len);this.height(len)
}
}
}
});})
Module("block.ui", function (m) {Class("Sync", {has: {_maxVersion: {is: "rw",
init: 0
},
_doc: {is: "rw"
}
},
methods: {startListening: function ()  {},
update: function () {var me = this
this.fetchStates();},
updateFromArray: function (updates) {var me = this;Joose.A.each(updates, function (update) {console.log("Update from version "+update.version)
me.setMaxVersion(update.version);var doc = update.data
me.updateDocument(doc)
})
this.saveState()
var me = this;window.setTimeout(function syncTimer () {me.update()
}, 2000)
},
updateDocument: function (doc) {console.log("Got something new!")
var cur;var state = doc.getBody()
var newTitle = doc.getHeader().getTitle();if(newTitle != null) {this.getDoc().getHeader().setTitle(newTitle)
}
state.traverse(function updateDocVisitor (shape, container) {var map = document.manager.shapeByGuidMap
var cur = map[shape.getGuid()]
if(cur) {console.log("Update")
if(!cur.isDeleted()) {cur.updateFrom(shape)
if(cur.getContainer().getGuid() != container.getGuid()) {cur.getContainer().removeElement(cur)
var dest = map[container.getGuid()];dest.add(cur)
}
}
} else {console.log("Insert")
var dest
if(container === state) { 
dest = document.shapes
} else {dest = map[container.getGuid()]
}
if(!shape.isDeleted()) {shape.registerGuid()
dest.addAndDraw(shape)
}
}
});},
fetchStates: function () {return m.SyncDocument.fetchNewData(this)
},
_saveState: function () {return m.SyncDocument.addData(this, false)
},
saveState: function () {if(document.manager.getDirty()) {this._saveState()
document.manager.setDirty(false)
}
},
savePermanent: function () {return m.SyncDocument.addData(this, true)
},
syncedTime: function () {return new Date().getTime()
}
}
});Class("SyncDocument", {classMethods: {fetchNewData: function (sync) {var dataArray = [];var rows      = []
var doc = sync.getDoc()
$.get("/fetch",
{hash:        doc.getId(),
max_version: (sync.getMaxVersion() || 0),
session:	 document.paras.sessionId,
no_cache:    Math.random()
},
function updateData (data) {console.log("Got data "+data + data.data.length)
rows = data.data
for(var i = 0; i < rows.length; i++) {console.log("Row version "+rows[i].version)
dataArray.push({data:    JSON.parse(rows[i].data),
version: rows[i].version
});}
sync.updateFromArray(dataArray)
},
"json")
},
addData: function (sync, isSavePoint) {var me   = new m.SyncDocument();var doc  = sync.getDoc();var data = JSON.stringify(sync.getDoc());$.post("/add",
{hash:         doc.getId(),
data:         data,
is_savepoint: isSavePoint,
name:         doc.getHeader().getTitle(),
session:	  document.paras.sessionId
},
function () {console.log("save successful")
},
"json");}
}
});});