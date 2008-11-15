// Generated: Sat Nov 15 12:34:04 2008


// ##########################
// File: /Users/malubl/workspace/Joose/examples/blok/static/ColorPicker.js
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
// File: /Users/malubl/workspace/Joose/examples/blok/static/joose.mini.js
// ##########################
var joosetop=this;Joose=function(){this.cc=null;this.currentModule=null;this.top=joosetop;this.globalObjects=[];this.anonymouseClassCounter=0};Joose.A={};Joose.A.each=function(C,B){for(var A=0;A<C.length;A++){B(C[A],A)}};Joose.A.exists=function(C,B){for(var A=0;A<C.length;A++){if(C[A]==B){return true}}return false};Joose.A.concat=function(A,B){A.push.apply(A,B);return A};Joose.A.grep=function(C,B){var A=[];Joose.A.each(C,function(D){if(B(D)){A.push(D)}});return A};Joose.A.remove=function(C,B){var A=[];Joose.A.each(C,function(D){if(D!==B){A.push(D)}});return A};Joose.S={};Joose.S.uppercaseFirst=function(A){var C=A.substr(0,1);var B=A.substr(1,A.length-1);C=C.toUpperCase();return C+B};Joose.S.isString=function(A){if(typeof A=="string"){return true}return false};Joose.O={};Joose.O.each=function(A,C){for(var B in A){C(A[B],B)}};Joose.O.eachSafe=function(A,C){for(var B in A){if(A.hasOwnProperty(B)){C(A[B],B)}}};Joose.O.extend=function(D,C){for(var B in C){var A=C[B];D[B]=A}};Joose.prototype={addToString:function(A,B){A.toString=B},isInstance:function(A){if(!A.meta){throw"isInstance only works with Joose objects and classes."}if(A.constructor===A.meta.c){return true}return false},init:function(){this.builder=new Joose.Builder();this.builder.globalize()},components:function(){return["Joose.Builder","Joose.Class","Joose.Method","Joose.ClassMethod","Joose.Attribute","Joose.Role","Joose.SimpleRequest","Joose.Gears","Joose.Storage","Joose.Storage.Unpacker","Joose.Decorator","Joose.Module","Joose.Prototype","Joose.TypeConstraint","Joose.TypeCoercion","Joose.Types"]},loadComponents:function(B){var A="";Joose.A.each(this.components(),function(D){var C=""+B+"/"+D.split(".").join("/")+".js";A+='<script type="text/javascript" src="'+C+'"><\/script>'});document.write(A)}};Joose.copyObject=function(B,C){var A="";Joose.O.each(B,function(E,D){A+=", "+D;C[D]=E});return C};Joose.emptyFunction=function(){};var joose=new Joose();Joose.bootstrap=function(){var B=new Joose.MetaClassBootstrap();B.builder=Joose.MetaClassBootstrap;Joose.MetaClass=B.createClass("Joose.MetaClass");Joose.MetaClass.meta.addNonJooseSuperClass("Joose.MetaClassBootstrap",B);Joose.MetaClass.meta.addMethod("initialize",function(){this._name="Joose.MetaClass"});var A=new Joose.MetaClass();A.builder=Joose.MetaClass;Joose.Class=A.createClass("Joose.Class");Joose.Class.meta.addSuperClass(Joose.MetaClass);Joose.MetaClass.meta.addMethod("initialize",function(){this._name="Joose.Class"})};Joose.bootstrap2=function(){Joose.Builder.Globals.joosify("Joose.Method",Joose.Method);Joose.Builder.Globals.joosify("Joose.Attribute",Joose.Attribute)};Joose.bootstrap3=function(){};Joose.MetaClassBootstrap=function(){this._name="Joose.MetaClassBootstrap";this.methodNames=[];this.attributeNames=["_name","isAbstract","isDetached","methodNames","attributeNames","methods","parentClasses","roles","c"];this.attributes={},this.methods={};this.classMethods={};this.parentClasses=[];this.roles=[];this.myRoles=[];this.isAbstract=false;this.isDetached=false};Joose.MetaClassBootstrap.prototype={toString:function(){if(this.meta){return"a "+this.meta.className()}return"NoMeta"},className:function(){return this._name},getName:function(){return this.className()},newMetaClass:function(){var B=this;var A=this.builder;var D=new A();D.builder=A;D._name=this._name;D.methodNames=[];D.attributeNames=[];D.methods={};D.classMethods={};D.parentClasses=[];D.roles=[];D.myRoles=[];D.attributes={};var C=this.meta;if(!C){C=this}D.meta=C;return D},createClass:function(B,A,D){var E=this.newMetaClass();var F;if(A){F=A}else{F=this.defaultClassFunctionBody();if(D){D.addElement(F)}}F.prototype.meta=E;F.meta=E;if(B==null){E._name="__anonymous__"}else{var C=B;if(D){C=D.getName()+"."+B}E._name=C}E.c=F;if(!D){joose.globalObjects.push(F)}E.addInitializer();E.addToString();E.addDetacher();return F},buildComplete:function(){},initializeFromProps:function(A){this._initializeFromProps(A)},_initializeFromProps:function(B){var C=this;if(B){Joose.O.eachSafe(B,function(H,G){var F=H;var E="handleProp"+G;if(C.meta.can(E)){C[E](F,B)}else{throw new Error("Called invalid builder "+G+" while creating class "+C.className())}});for(var A=0;A<this.roles.length;A++){var D=this.roles[A];D.meta.applyMethodModifiers(this.c)}C.buildComplete();C.validateClass()}},instantiate:function(){var A=function(){};A.prototype=this.c.prototype;A.prototype.constructor=this.c;var B=new A();this.c.apply(B,arguments);return B},defaultClassFunctionBody:function(){var A=function(){this.initialize.apply(this,arguments)};joose.addToString(A,function(){return this.meta.className()});return A},addToString:function(){this.addMethod("toString",function(){if(this.stringify){return this.stringify()}return"a "+this.meta.className()})},addInitializer:function(){if(!this.c.prototype.initialize){this.addMethod("initialize",this.initializer())}},initializer:function(){return function A(E){var G=this;if(this.meta.isAbstract){var D=this.meta.className();throw""+D+" is an abstract class and may not instantiated."}var C=this.meta.getAttributes();for(var F in C){if(C.hasOwnProperty(F)){var B=C[F];B.doInitialization(G,E)}}}},dieIfString:function(A){if(Joose.S.isString(A)){throw new TypeError("Parameter must not be a string.")}},addRole:function(A){this.dieIfString(A);var B=this.getClassObject();if(A.meta.apply(B)){this.roles.push(A);this.myRoles.push(A)}},getClassObject:function(){return this.c},classNameToClassObject:function(D){var F=joose.top;var E=D.split(".");var B=F;for(var C=0;C<E.length;C++){var A=E[C];B=B[A];if(!B){throw"Unable to find class "+D}}return B},addNonJooseSuperClass:function(C,B){var D=new Joose.MetaClassBootstrap();D.builder=Joose.MetaClassBootstrap;var A=D.createClass(C);Joose.O.each(B,function(F,E){if(typeof(F)=="function"){A.meta.addMethod(E,F)}else{A.meta.addAttribute(E,{init:F})}});this.addSuperClass(A)},addSuperClass:function(G){this.dieIfString(G);var I=this;var H=G.meta.getMethodNames();for(var E=0;E<H.length;E++){var B=H[E];var C=G.meta.getMethodObject(B);if(C){var A=C.copy();A.setIsFromSuperClass(true);I.addMethodObject(A)}C=G.meta.getClassMethodObject(B);if(C){var A=C.copy();A.setIsFromSuperClass(true);I.addMethodObject(A)}}Joose.O.eachSafe(G.meta.attributes,function(J,K){I.addAttribute(K,J.getProps())});var F=G.meta.roles;for(var E=0;E<F.length;E++){var D=F[E];I.roles.push(D)}this.parentClasses.unshift(G)},_fixMetaclassIncompatability:function(D){var A=D.meta;var C=A.meta.className();if(C=="Joose.Class"||C=="Joose.MetaClass"||C=="Joose.MetaClassBootstrap"){return}if(this.meta.meta.isa(A)){return}var E=A.meta.instantiate(this);for(var B in E){this[B]=E[B]}},isa:function(D){this.dieIfString(D);var A=D.meta.className();if(this.className()==A){return true}for(var B=0;B<this.parentClasses.length;B++){var C=this.parentClasses[B].meta;if(C.className()==A){return true}if(C.isa(D)){return true}}return false},wrapMethod:function(B,D,C,A){var E=this.getMethodObject(B);if(E){this.addMethodObject(E[D](C))}else{if(A){A()}else{throw new Error("Unable to apply "+D+" method modifier because method "+B+" does not exist")}}},dispatch:function(A){return this.getMethodObject(A).asFunction()},hasMethod:function(A){return this.methods[A]!=null||this.classMethods[A]!=null},addMethod:function(B,D,C){var A=new Joose.Method(B,D,C);this.addMethodObject(A)},addClassMethod:function(B,D,C){var A=new Joose.ClassMethod(B,D,C);this.addMethodObject(A)},addMethodObject:function(C){var A=C;var B=A.getName();if(!this.methods[B]&&!this.classMethods[B]){this.methodNames.push(B)}if(A.isClassMethod()){this.classMethods[B]=A}else{this.methods[B]=A}C.addToClass(this.c)},attributeMetaclass:function(){return Joose.Attribute},addAttribute:function(B,C){var D=this.attributeMetaclass();if(C&&C.metaclass){D=C.metaclass}var A=new D(B,C);A.apply(this.c)},getAttributes:function(){return this.attributes},getAttribute:function(A){return this.attributes[A]},setAttribute:function(A,B){return this.attributes[A]=B},getMethodObject:function(A){return this.methods[A]},getClassMethodObject:function(A){return this.classMethods[A]},getAttributeNames:function(){return this.attributeNames},getInstanceMethods:function(){var A=[];Joose.O.eachSafe(this.methods,function(B){A.push(B)});return A},getClassMethods:function(){var A=[];Joose.O.eachSafe(this.classMethods,function(B){A.push(B)});return A},getSuperClasses:function(){return this.parentClasses},getSuperClass:function(){return this.parentClasses[0]},getRoles:function(){return this.roles},getMethodNames:function(){return this.methodNames},makeAnonSubclass:function(){var A=this.createClass(this.className()+"__anon__"+joose.anonymouseClassCounter++);A.meta.addSuperClass(this.getClassObject());return A},addDetacher:function(){this.addMethod("detach",function A(){var C=this.meta;if(C.isDetached){return}var D=C.makeAnonSubclass();D.meta.isDetached=true;this.meta=D.meta;this.constructor=D;var B;if(!this.__proto__){B=this}else{B={};Joose.copyObject(this,B)}D.prototype=B;this.__proto__=D.prototype;return})},validateClass:function(){var C=this.getClassObject();var B=this;var A=true;Joose.A.each(this.roles,function(D){D.meta.isImplementedBy(C,A)})},can:function(A){var B=this.methods[A];if(!B){return false}return true},classCan:function(A){var B=this.classMethods[A];if(!B){return false}return true},does:function(B){for(var A=0;A<this.roles.length;A++){if(B===this.roles[A]){return true}}for(var A=0;A<this.roles.length;A++){if(this.roles[A].meta.does(B)){return true}}return false},implementsMyMethods:function(B){var A=true;Joose.A.each(this.getMethodNames(),function(D){var C=B.meta.can(D);if(!C){A=false}});return A},handleProprequires:function(A){var B=this;if(!this.meta.isa(Joose.Role)){throw ("Keyword 'requires' only available classes with a meta class of type Joose.Role")}if(A instanceof Array){Joose.A.each(A,function(C){B.addRequirement(C)})}else{B.addRequirement(A)}},handlePropisAbstract:function(A){this.isAbstract=A},handlePropisa:function(A){this.addSuperClass(A)},handlePropdoes:function(B){var A=this;if(B instanceof Array){Joose.A.each(B,function(C){A.addRole(C)})}else{A.addRole(B)}},handleProphas:function(D){var C=this;if(typeof D=="string"){var A=arguments[0];var B=arguments[1];C.addAttribute(A,B)}else{Joose.O.eachSafe(D,function(F,E){C.addAttribute(E,F)})}},handlePropmethod:function(A,C,B){this.addMethod(A,C,B)},handlePropmethods:function(B){var A=this;Joose.O.eachSafe(B,function(D,C){A.addMethod(C,D)})},handlePropclassMethods:function(B){var A=this;Joose.O.eachSafe(B,function(C,D){A.addMethodObject(new Joose.ClassMethod(D,C))})},handlePropworkers:function(B){var A=this;Joose.O.eachSafe(B,function(D,C){A.addWorker(C,D)})},handlePropbefore:function(B){var A=this;Joose.O.eachSafe(B,function(D,C){A.wrapMethod(C,"before",D)})},handlePropafter:function(B){var A=this;Joose.O.eachSafe(B,function(D,C){A.wrapMethod(C,"after",D)})},handleProparound:function(B){var A=this;Joose.O.eachSafe(B,function(D,C){A.wrapMethod(C,"around",D)})},handlePropoverride:function(B){var A=this;Joose.O.eachSafe(B,function(D,C){A.wrapMethod(C,"override",D)})},handlePropaugment:function(B){var A=this;Joose.O.eachSafe(B,function(D,C){A.wrapMethod(C,"augment",D,function(){A.addMethod(C,D)})})},handlePropdecorates:function(B){var A=this;Joose.O.eachSafe(B,function(D,C){A.decorate(D,C)})}};Joose.Attribute=function(A,B){this.initialize(A,B)};Joose.Attribute.prototype={_name:null,_props:null,getName:function(){return this._name},getProps:function(){return this._props},initialize:function(A,B){this._name=A;this.setProps(B)},setProps:function(A){if(A){this._props=A}else{this._props={}}},getIsa:function(){var A=this.getProps();if(A.isa){if(!A.isa.meta){return A.isa()}return A.isa}return},addSetter:function(G){var I=G.meta;var A=this.getName();var H=this.getProps();var F=this.getIsa();var C;if(F){if(!F.meta){throw new Error("Isa declarations in attribute declarations must be Joose classes, roles or type constraints")}var J=false;var D=false;if(Joose.Role&&F.meta.meta.isa(Joose.Role)){J=true}else{if(Joose.TypeConstraint&&F.meta.isa(Joose.TypeConstraint)){D=true}}C=function B(P,M){var N=P;try{if(H.nullable===true&&N==undefined){}else{if(D){var L=null;if(H.coerce){L=F.coerce(N)}if(L==null&&H.nullable!==true){F.validate(N)}else{N=L}}else{if(!N||!N.meta){throw new ReferenceError("The attribute "+A+" only accepts values that have a meta object.")}var K=J?N.meta.does(F):N.meta.isa(F);if(!K){throw new ReferenceError("The attribute "+A+" only accepts values that are objects of type "+F.meta.className()+".")}}}}catch(O){if(M){M.call(this,O,F)}else{throw O}}this[A]=N;return this}}else{C=function E(K){this[A]=K;return this}}I.addMethod(this.setterName(),C)},addGetter:function(E){var G=E.meta;var B=this.getName();var C=this.getProps();var D=function A(){return this[B]};var H=C.init;if(C.lazy){D=function F(){var I=this[B];if(typeof I=="function"&&I===H){this[B]=I.apply(this)}return this[B]}}G.addMethod(this.getterName(),D)},initializerName:function(){return this.toPublicName()},getterName:function(){if(this.__getterNameCache){return this.__getterNameCache}this.__getterNameCache="get"+Joose.S.uppercaseFirst(this.toPublicName());return this.__getterNameCache},setterName:function(){if(this.__setterNameCache){return this.__setterNameCache}this.__setterNameCache="set"+Joose.S.uppercaseFirst(this.toPublicName());return this.__setterNameCache},isPrivate:function(){return this.getName().charAt(0)=="_"},toPublicName:function(){if(this.__publicNameCache){return this.__publicNameCache}var A=this.getName();if(this.isPrivate()){this.__publicNameCache=A.substr(1);return this.__publicNameCache}this.__publicNameCache=A;return this.__publicNameCache},handleIs:function(D){var E=D.meta;var A=this.getName();var B=this.getProps();var C=B.is;if(C=="rw"||C=="ro"){this.addGetter(D)}if(C=="rw"){this.addSetter(D)}},handleInit:function(D){var C=this.getProps();var A=this.getName();D.prototype[A]=null;if(typeof C.init!="undefined"){var E=C.init;var B=typeof E;D.prototype[A]=E}},handleProps:function(A){this.handleIs(A);this.handleInit(A)},apply:function(B){var C=B.meta;var A=this.getName();this.handleProps(B);C.attributeNames.push(A);C.setAttribute(A,this);C.attributes[A]=this}};Joose.Method=function(A,C,B){this.initialize(A,C,B)};Joose.Method.prototype={_name:null,_body:null,_props:null,_isFromSuperClass:false,getName:function(){return this._name},getBody:function(){return this._body},getProps:function(){return this._props},isFromSuperClass:function(){return this._isFromSuperClass},setIsFromSuperClass:function(A){this._isFromSuperClass=A},copy:function(){return new Joose.Method(this.getName(),this.getBody(),this.getProps())},initialize:function(A,C,B){this._name=A;this._body=C;this._props=B;C.name=A;C.meta=this},isClassMethod:function(){return false},apply:function(A,B){return this._body.apply(A,B)},addToClass:function(A){A.prototype[this.getName()]=this.asFunction()},asFunction:function(){return this._body}};Joose.bootstrap();Joose.Builder=function(){this.globalize=function(){Joose.O.each(Joose.Builder.Globals,function(C,A){var B="Joose"+A;if(typeof joose.top[A]=="undefined"){joose.top[A]=C}joose.top[B]=C})}};Joose.Builder.Globals={Module:function(B,A){return Joose.Module.setup(B,A)},Role:function(A,B){if(!B.meta){B.meta=Joose.Role}return JooseClass(A,B)},Prototype:function(A,B){if(!B.meta){B.meta=Joose.Prototype}return JooseClass(A,B)},Class:function(A,G){var F=null;if(A){var E=A;if(joose.currentModule){E=joose.currentModule.getName()+"."+A}var H=joose.top;var C=E.split(".");for(var D=0;D<C.length;D++){H=H[C[D]]}F=H}if(F==null){var I;if(G&&G.meta){I=G.meta;delete G.meta}else{if(G&&G.isa&&G.isa!=Joose.Class){I=G.isa.meta.builder}else{I=Joose.Class}}var J=new I();J.builder=I;var F=J.createClass(A,null,joose.currentModule);F.meta.builder=I;var E=F.meta.className();if(A&&E){var H=joose.top;var B=new String(E);var C=B.split(".");for(var D=0;D<C.length-1;D++){if(H[C[D]]==null){H[C[D]]={}}H=H[C[D]]}H[C[C.length-1]]=F}}F.meta.initializeFromProps(G);return F},Type:function(B,D){var C=Joose.TypeConstraint.newFromTypeBuilder(B,D);var A=joose.currentModule;if(!A){JooseModule("TYPE");A=TYPE.meta}A.addElement(C);A.getContainer()[B]=C;return C},joosify:function(F,G){var H=G;var A=new Joose.Class();A.builder=Joose.Class;H.toString=function(){return this.meta.className()};H=A.createClass(F,H);var E=H.meta;for(var B in G.prototype){if(B=="meta"){continue}var D=G.prototype[B];if(typeof(D)=="function"){E.addMethod(B,D)}else{var C={};if(typeof(D)!="undefined"){C.init=D}E.addAttribute(B,C)}}return H},rw:"rw",ro:"ro"};joose.init();Joose.bootstrap2();(function(A){A("Joose.Method",{methods:{copy:function(){return this.meta.instantiate(this.getName(),this.getBody(),this.getProps())},_makeWrapped:function(B){return this.meta.instantiate(this.getName(),B)},around:function(B){var D=this.getBody();return this._makeWrapped(function C(){var F=this;var E=function(){return D.apply(F,arguments)};return B.apply(this,Joose.A.concat([E],arguments))})},before:function(C){var D=this.getBody();return this._makeWrapped(function B(){C.apply(this,arguments);return D.apply(this,arguments)})},after:function(C){var D=this.getBody();return this._makeWrapped(function B(){var E=D.apply(this,arguments);C.apply(this,arguments);return E})},override:function(C){var D=this.getBody();return this._makeWrapped(function B(){var G=this;var F=function(){return D.apply(G,arguments)};var H=this.SUPER;this.SUPER=F;var E=C.apply(this,arguments);this.SUPER=H;return E})},augment:function(C){var D=this.getBody();D.source=D.toString();return this._makeWrapped(function B(){var I=D;var G=this;var E=C;E.source=E.toString();if(!this.__INNER_STACK__){this.__INNER_STACK__=[]}this.__INNER_STACK__.push(E);var H=this.INNER;this.INNER=function(){return G.__INNER_STACK__.pop().apply(G,arguments)};var F=D.apply(this,arguments);this.INNER=H;return F})}}})})(JooseClass);(function(A){A("Joose.ClassMethod",{isa:Joose.Method,methods:{isClassMethod:function(){return true},addToClass:function(B){B[this.getName()]=this.asFunction()},copy:function(){return new Joose.ClassMethod(this.getName(),this.getBody(),this.getProps())}}})})(JooseClass);(function(A){A("Joose.Attribute",{after:{handleProps:function(B){this.handleHandles(B);this.handlePredicate(B)}},methods:{isPersistent:function(){var B=this.getProps();if(B.persistent==false){return false}return true},doInitialization:function(C,J){var B=this.initializerName();var H=this.getName();var G;var F=false;if(typeof J!="undefined"&&typeof J[B]!="undefined"){G=J[B];F=true}else{var E=this.getProps();var I=E.init;if(typeof I=="function"&&!E.lazy){G=I.call(C);F=true}else{if(E.required){throw"Required initialization parameter missing: "+B+"(While initializing "+C+")"}}}if(F){var D=this.setterName();if(C.meta.can(D)){C[D](G)}else{C[H]=G}}},handleHandles:function(F){var G=F.meta;var B=this.getName();var D=this.getProps();var C=D.handles;var H=D.isa;if(C){if(C=="*"){if(!H){throw"I need an isa property in order to handle a class"}var E=D.handleWith;G.decorate(H,B,E)}else{throw"Unsupported value for handles: "+C}}},handlePredicate:function(F){var G=F.meta;var D=this.getName();var E=this.getProps();var C=E.predicate;var B=this.getterName();if(C){G.addMethod(C,function(){var H=this[B]();return H?true:false})}}}})})(JooseClass);(function(A){A("Joose.Role",{isa:Joose.Class,has:["requiresMethodNames","methodModifiers","metaRoles"],methods:{wrapMethod:function(C,E,D,B){this.methodModifiers.push(arguments);var F=this.methodModifiers},requiresMethod:function(C){var B=false;Joose.A.each(this.requiresMethodNames,function(D){if(C==D){B=true}});return B},addInitializer:Joose.emptyFunction,defaultClassFunctionBody:function(){var B=function(){throw new Error("Roles may not be instantiated.")};joose.addToString(B,function(){return this.meta.className()});return B},addSuperClass:function(){throw new Error("Roles may not inherit from a super class.")},initialize:function(){this._name="Joose.Role";this.requiresMethodNames=[];this.methodModifiers=[]},addRequirement:function(B){this.requiresMethodNames.push(B)},unapply:function(C){if(!joose.isInstance(C)){throw new Error("You way only remove roles from instances.")}if(!C.meta.isDetached){throw new Error("You may only remove roles that were applied at runtime")}var D=this.getClassObject();var F=C.meta.myRoles;var J=false;var B=[];for(var E=0;E<F.length;E++){if(F[E]===D){J=true}else{B.push(F[E])}}if(!J){throw new Error("The role "+this.className()+" was not applied to the object at runtime")}var I=C.meta.getSuperClass();var H=I.meta.makeAnonSubclass();var G=new H();for(var E=0;E<B.length;E++){var D=B[E];H.meta.addRole(D)}H.prototype=G;C.meta=H.meta;C.constructor=H;C.__proto__=G},addMethodToClass:function(E,C){var B=E.getName();var D;if(E.isClassMethod()){D=C.meta.getClassMethodObject(B)}else{D=C.meta.getMethodObject(B)}if(!D||D.isFromSuperClass()){C.meta.addMethodObject(E)}},apply:function(D){if(D.meta.does(this.getClassObject())){return false}if(joose.isInstance(D)){D.detach();D.meta.addRole(this.getClassObject());this.applyMethodModifiers(D);var C=true;this.isImplementedBy(D,C)}else{var E=this;var F=this.getMethodNames();Joose.A.each(F,function G(I){var H=E.getMethodObject(I);if(H){E.addMethodToClass(H,D)}H=E.getClassMethodObject(I);if(H){E.addMethodToClass(H,D)}});if(this.metaRoles){Joose.A.each(this.metaRoles,function B(H){H.meta.apply(D.meta)})}}return true},applyMethodModifiers:function(B){Joose.A.each(this.methodModifiers,function C(D){B.meta.wrapMethod.apply(B.meta,D)})},hasRequiredMethods:function(E,C){var D=this;var B=true;Joose.A.each(this.requiresMethodNames,function(G){var F=E.meta.can(G);if(!F){if(C){throw ("Class "+E.meta.className()+" does not fully implement the role "+D.className()+". The method is "+G+" missing.")}B=false;return}});return B},isImplementedBy:function(D,C){var B=this.hasRequiredMethods(D,C);if(B){B=this.implementsMyMethods(D)}return B},handlePropmetaRoles:function(B){this.metaRoles=B}}});Joose.Role.anonymousClassCounter=0})(JooseClass);(function(A){A("Joose.SimpleRequest",{has:{_req:{}},methods:{initialize:function(){if(window.XMLHttpRequest){this._req=new XMLHttpRequest()}else{this._req=new ActiveXObject("Microsoft.XMLHTTP")}},getText:function(B){this._req.open("GET",B,false);try{this._req.send(null);if(this._req.status==200||this._req.status==0){return this._req.responseText}}catch(C){throw ("File not found: "+B);return null}throw ("File not found: "+B);return null}}})})(JooseClass);(function(A){A("Joose.Gears",{isa:Joose.Class,has:{wp:{},calls:{init:{}},callIndex:{init:0}},methods:{initialize:function(){JooseGearsInitializeGears();if(this.canGears()){this.wp=google.gears.factory.create("beta.workerpool");var B=this;this.wp.onmessage=function(D,C,E){B.handleGearsMessage(E)}}},handleGearsMessage:function(E){var D=E.body;var F=D.to;var C=D.ret;var B=this.calls[D.index];if(B.meta.can(F)){B[F].call(B,C)}},canGears:function(){return window.google&&window.google.gears&&window.google.gears.factory},addWorker:function(C,D,I){var E="on"+Joose.S.uppercaseFirst(C);var L=this.meta.getClassObject().ajaxRequest;if(!this.canGears()){var J=function(){var P=this;var O={sendReturn:function(Q,R){if(P.meta.can(R)){P[R].call(P,Q)}},clientHasGears:function(){return false},ajaxRequest:L};var N=D.apply(O,arguments);O.sendReturn(N,E)};this.addMethod(C,J,I);return}var G=this.can("jsonURL")?this.c.jsonURL():"json2.js";var M=new Joose.SimpleRequest().getText(G);var B="var timer = google.gears.factory.create('beta.timer');\nfunction aClass () {}; aClass.prototype."+C+" = "+D.toString()+"\n\naClass.prototype.clientHasGears = function () { return true }\naClass.prototype.ajaxRequest = "+L.toString()+"\n\nvar wp = google.gears.workerPool;\nwp.onmessage = function (a,b,message) {\nvar paras = message.body;\nvar o = new aClass();\no.sendReturn = function (ret, cbName) { wp.sendMessage({ ret: ret, to: cbName, index: paras.index }, message.sender) } \nvar ret = o."+C+".apply(o, paras.args); if(!ret) ret = null; \no.sendReturn(ret, paras.cbName);\n}\n\n";B+=M;var K=this.wp;var F=K.createWorker(B);var H=this;var J=function(){var N=[];for(var O=0;O<arguments.length;O++){N.push(arguments[O])}var P={args:N,cbName:E,index:H.callIndex};K.sendMessage(P,F);H.calls[H.callIndex]=this;H.callIndex++};this.addMethod(C,J,I)}},classMethods:{setupGearsCompat:function(){window.timer={setTimeout:function(B,C){return window.setTimeout(B,C)},setInterval:function(B,C){return window.setInterval(B,C)},clearTimeout:function(B){return window.clearTimeout(B)},clearInterval:function(B){return window.clearInterval(B)}}},clientHasGears:function(){return window.google&&window.google.gears&&window.google.gears.factory},ajaxRequest:function(B,C,F,K,H){var E;if(this.clientHasGears()){E=google.gears.factory.create("beta.httprequest")}else{E=window.ActiveXObject?new ActiveXObject("Microsoft.XMLHTTP"):new XMLHttpRequest()}var I="";if(F){for(var G in F){I+=encodeURIComponent(G)+"="+encodeURIComponent(F[G])+"&"}}var D=C;if(F&&B=="GET"){D+="?"+I}E.open(B,D,true);E.onreadystatechange=function J(){if(E.readyState==4){if(E.status>=200&&E.status<400){var L=E.responseText;K(L)}else{if(H){return H(E)}else{throw new Error("Error fetching url "+D+". Response code: "+E.status+" Response text: "+E.responseText)}}}};if(F&&B=="POST"){E.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");E.send(I)}else{I="";E.send(I)}}}})})(JooseClass);function JooseGearsInitializeGears(){if(window.google&&google.gears){return}var A=null;if(typeof GearsFactory!="undefined"){A=new GearsFactory()}else{try{A=new ActiveXObject("Gears.Factory");if(A.getBuildInfo().indexOf("ie_mobile")!=-1){A.privateSetGlobalObject(this)}}catch(B){if(navigator.mimeTypes["application/x-googlegears"]){A=document.createElement("object");A.style.display="none";A.width=0;A.height=0;A.type="application/x-googlegears";document.documentElement.appendChild(A)}}}if(!A){return}if(!window.google){google={}}if(!google.gears){google.gears={factory:A}}}(function(A,B){B("Joose.Storage",{methods:{toJSON:function(){return this.pack(Joose.Storage.TEMP_SEEN)},identity:function(){if(this.__ID__){return this.__ID__}else{return this.__ID__=Joose.Storage.OBJECT_COUNTER++}},pack:function(C){return this.meta.c.storageEngine().pack(this,C)}},classMethods:{storageEngine:function(){return Joose.Storage.Engine},unpack:function(C){return this.storageEngine().unpack(this,C)}}});B("Joose.Storage.jsonpickle",{does:Joose.Storage,classMethods:{storageEngine:function(){return Joose.Storage.Engine.jsonpickle}}});Joose.Storage.OBJECT_COUNTER=1;A("Joose.Storage.Engine",{classMethods:{pack:function(E,C){if(C){var I=E.identity();var G=C[I];if(G){return{__ID__:I}}}if(E.meta.can("prepareStorage")){E.prepareStorage()}if(C){C[E.identity()]=true}var H={__CLASS__:this.packedClassName(E),__ID__:E.identity()};var D=E.meta.getAttributes();Joose.O.eachSafe(D,function F(J,K){if(J.isPersistent()){H[K]=E[K]}});return H},unpack:function(E,D){var G=E.meta;var C=G.instantiate();var F=false;Joose.O.eachSafe(D,function H(K,I){if(I=="__CLASS__"){var J=Joose.Storage.Unpacker.packedClassNameToJSClassName(K);if(J!=C.meta.className()){throw new Error("Storage data is of wrong type "+J+". I am "+C.meta.className()+".")}F=true;return}C[I]=K});if(!F){throw new Error("Serialized data needs to include a __CLASS__ attribute.: "+D)}delete C.__ID__;if(C.meta.can("finishUnpack")){C.finishUnpack()}return C},packedClassName:function(D){if(D.meta.can("packedClassName")){return D.packedClassName()}var C=D.meta.className();var E=C.split(".");return E.join("::")}}});A("Joose.Storage.Engine.jsonpickle",{classMethods:{pack:function(E,C){if(C){var I=E.identity();var G=C[I];if(G){return{objectid__:I}}}if(E.meta.can("prepareStorage")){E.prepareStorage()}if(C){C[E.identity()]=true}var H={classname__:this.packedClassName(E),classmodule__:this.packedModuleName(E),objectid__:E.identity()};var D=E.meta.getAttributes();Joose.O.eachSafe(D,function F(J,K){if(J.isPersistent()){H[K]=E[K]}});return H},unpack:function(E,D){var G=E.meta;var C=G.instantiate();var F=false;Joose.O.eachSafe(D,function H(L,I){if(I=="classname__"){var K=L;var J=D.classmodule__;if(J){K=""+J+"."+L}if(K!=C.meta.className()){throw new Error("Storage data is of wrong type "+K+". I am "+C.meta.className()+".")}F=true;return}if(I=="classmodule__"){return}C[I]=L});if(!F){throw new Error("Serialized data needs to include a __CLASS__ attribute.: "+D)}if(C.meta.can("finishUnpack")){C.finishUnpack()}return C},packedClassName:function(D){var C=D.meta.className();var E=C.split(".");return E.pop()},packedModuleName:function(D){var C=D.meta.className();var E=C.split(".");E.pop();return E.join(".")}}});Joose.Storage.storageEngine=Joose.Storage.Engine;Joose.Storage.jsonpickle.storageEngine=Joose.Storage.Engine.jsonpickle})(JooseClass,JooseRole);(function(A){A("Joose.Storage.Unpacker",{classMethods:{unpack:function(D){var C=D.__CLASS__;if(!C){throw ("Serialized data needs to include a __CLASS__ attribute.")}var B=this.packedClassNameToJSClassName(C);var F=this.meta.classNameToClassObject(B);var E=F.unpack(D);var G;if(Joose.Storage.CACHE&&(G=D.__ID__)){Joose.Storage.CACHE[G]=E}return E},packedClassNameToJSClassName:function(B){var C=B.split("-");C=C[0].split("::");return C.join(".")},jsonParseFilter:function(B,C){if(C!=null&&typeof C=="object"){if(C.__CLASS__){return Joose.Storage.Unpacker.unpack(C)}if(C.__ID__){return Joose.Storage.CACHE[C.__ID__]}}return C},patchJSON:function(){var D=JSON.parse;var B=this.jsonParseFilter;JSON.parse=function(G,F){Joose.Storage.CACHE={};return D(G,function E(H,I){var J=I;if(F){J=F(H,I)}return B(H,J)})};var C=JSON.stringify;JSON.stringify=function(){Joose.Storage.TEMP_SEEN={};return C.apply(JSON,arguments)}}}});A("Joose.Storage.Unpacker.jsonpickle",{isa:Joose.Storage.Unpacker,classMethods:{unpack:function(D){var C=D.classname__;if(!C){throw ("Serialized data needs to include a classname__ attribute.")}var B=this.packedClassNameToJSClassName(C,D.classmodule__);var F=this.meta.classNameToClassObject(B);var E=F.unpack(D);var G;if(Joose.Storage.CACHE&&(G=D.objectid__)){Joose.Storage.CACHE[G]=E}return E},packedClassNameToJSClassName:function(D,C){var B="";if(C){B+=C+"."}B+=D;return B},jsonParseFilter:function(B,C){if(C!=null&&typeof C=="object"){if(C.classname__){return Joose.Storage.Unpacker.jsonpickle.unpack(C)}if(C.objectid__){return Joose.Storage.CACHE[C.objectid__]}}return C}}})})(JooseClass);(function(A){A("Joose.Decorator",{meta:Joose.Role,methods:{decorate:function(F,D,C){var E=this;var B=F.meta.getInstanceMethods();Joose.A.each(B,function(G){var H=G.getName();var J=D;if(!E.can(H)){var I=function(){var K=this[J];return K[H].apply(K,arguments)};if(C){I=C(H)}E.addMethod(H,I)}})}}});Joose.Decorator.meta.apply(Joose.Class)})(JooseClass);(function(A){A("Joose.Module",{has:{_name:{is:"rw"},_elements:{is:"rw"},_container:{is:"rw"}},classMethods:{setup:function(B,C){var J=this;var G=B.split(".");var F=joose.top;var I=[];var E;for(var H=0;H<G.length;H++){var D=G[H];if(D=="meta"){throw"Module names may not include a part called 'meta'."}var L=F[D];I.push(D);var B=I.join(".");if(typeof L=="undefined"){F[D]={};E=new Joose.Module(B);E.setContainer(F[D]);F[D].meta=E;Joose.Module._allModules.push(F[D])}else{E=L.meta;if(!(E&&E.meta&&(E.meta.isa(Joose.Module)))){throw"Trying to setup module "+B+" failed. There is already something else: "+E}}F=F[D]}var K=joose.currentModule;joose.currentModule=E;if(C){C(F)}joose.currentModule=K;return F},getAllModules:function(){return this._allModules}},methods:{alias:function(B){var C=this;if(arguments.length==0){return this}Joose.A.each(this.getElements(),function(D){var E=C.globalName(D.meta.className());if(B[E]===D){return}if(typeof B[E]!="undefined"){throw"There is already something else in the spot "+E}B[E]=D})},globalName:function(C){var B=this.getName();if(C.indexOf(B)!=0){throw"All things inside me should have a name that starts with "+B+". Name is "+C}var D=C.substr(B.length+1);if(D.indexOf(".")!=-1){throw"The things inside me should have no more dots in there name. Name is "+D}return D},removeGlobalSymbols:function(){Joose.A.each(this.getElements(),function(B){var C=this.globalName(B.getName());delete joose.top[C]})},initialize:function(B){this.setElements([]);this.setName(B)},isEmpty:function(){return this.getElements().length==0},addElement:function(B){if(!(B||B.meta)){throw"You may only add things that are Joose objects"}this._elements.push(B)},getNames:function(){var B=[];Joose.A.each(this.getElements(),function(C){B.push(C.meta.getName())});return B}}})})(JooseClass);__global__={};__global__.meta=new Joose.Module();__global__.meta.setName("__global__");__global__.meta.setContainer(__global__);Joose.Module._allModules=[__global__];JooseModule("__global__.nomodule",function(){});__global__.nomodule.meta._elements=joose.globalObjects;(function(A){A("Joose.Prototype",{isa:Joose.Class,override:{initializer:function(){var B=this.SUPER();return function(){B.apply(this,arguments);var C=this.meta;this.meta=new Joose.PrototypeLazyMetaObjectProxy();this.meta.metaObject=C;this.meta.object=this}}}});A("Joose.PrototypeLazyMetaObjectProxy",{has:{metaObject:{is:"rw",isa:Joose.Class,handles:"*",handleWith:function(B){return function(){var C=this.object;C.meta=this.metaObject;C.detach();C.meta[B].apply(C.meta,arguments)}}},object:{is:"rw"}}});Joose.bootstrap3()})(JooseClass);(function(A){A("Joose.TypeConstraint",{has:{_constraints:{is:"ro",init:function(){return[]}},_coercions:{is:"ro",init:function(){return[]}},_messages:{is:"ro",init:function(){return[]}},_callback:{is:"ro",init:function(){return function(B){throw new ReferenceError(B)}}},_name:{is:"ro"},_uses:{is:"ro"},props:{is:"rw"}},classMethods:{newFromTypeBuilder:function(C,F){var E=new Joose.TypeConstraint({name:C});if(F.uses&&typeof F.uses.meta!="undefined"&&F.uses.meta.isa(Joose.TypeConstraint)){E._uses=F.uses}if(F.where){E.addConstraint(F.where,F.message)}E.setProps(F);if(F.coerce){for(var D=0;D<F.coerce.length;D++){var B=F.coerce[D];E.addCoercion(new Joose.TypeCoercion({from:B.from,via:B.via}))}}return E}},methods:{stringify:function(){return this._name},makeSubType:function(B){var C=new Joose.TypeConstraint({name:B});Joose.A.each(this._constraints,function(D){C.addConstraint(D)});return C},addCoercion:function(B){this._coercions.push(B)},addConstraint:function(C,B){this._constraints.push(C);this._messages.push(B)},getConstraintList:function(){var B=this._constraints;if(this._uses){var C=this._uses.getConstraintList();return C.concat(B)}return B},getMessageList:function(){var C=this._messages;if(this._uses){var B=this._uses.getMessageList();return B.concat(C)}return C},validateBool:function(C){var B=this._validate(C);if(B==-1){return true}return false},validate:function(E){var B=this._validate(E);if(B==-1){return true}var D=this.getMessageList();var C=D[B]?D[B].call(this,E):"The passed value ["+E+"] is not a "+this;this._callback(C)},_validate:function(G){var D=this.getConstraintList();var E,C;for(E=0,C=D.length;E<C;E++){var F=D[E];var B=false;if(F instanceof RegExp){B=F.test(G)}else{B=F.call(this,G)}if(!B){return E}}return -1},coerce:function(G){if(this.validateBool(G)){return G}var F=this._coercions;for(var E=0,C=F.length;E<C;E++){var D=F[E];var B=D.coerce(G);if(B!==null){return B}}return null}}})})(JooseClass);(function(B,A){A("CoercionFrom",{where:function(C){if(C.meta&&C.meta.isa(Joose.TypeConstraint)){return true}return false}});B("Joose.TypeCoercion",{has:{_from:{isa:TYPE.CoercionFrom,is:"rw"},_via:{is:"rw"}},methods:{coerce:function(C){if(this._from.validateBool(C)){return this._via(C)}return null}}})})(JooseClass,JooseType);(function(A){A("Any",{where:function(B){return true}});A("Null",{uses:TYPE.Any,where:function(B){if(B===null){return true}return false}});A("NotNull",{uses:TYPE.Any,where:function(B){if(B===null){return false}return true}});A("Enum",{uses:TYPE.NotNull,message:function(B){return"The passed value ["+B+"] is not "+(this.getProps().strictMatch?"*strictly* ":"")+"one of ["+this.getProps().values.join(",")+"]"},where:function(D){var C=this;if(!C.getProps()||C.getProps().values===undefined||!(C.getProps().values instanceof Array)){throw"Enum Type needs Array of values in 'values' property of Type declaration"}var B=function(E){if(C.getProps().strictMatch===true){return(E===D)}return(E==D)};if(Joose.A.grep(C.getProps().values,B).length!=0){return true}return false}});A("Obj",{uses:TYPE.NotNull,where:function(B){if(B instanceof Object){return true}return false}});A("Str",{uses:TYPE.NotNull,where:function(B){if(typeof B=="string"||B instanceof String){return true}return false},coerce:[{from:TYPE.Any,via:function(B){if(B==null){return""}else{return""+B}}}]});A("Num",{uses:TYPE.NotNull,where:function(B){if(typeof B=="number"||B instanceof Number){return true}return false},coerce:[{from:TYPE.Str,via:function(B){if(B==null||B==""){return undefined}return parseFloat(B)}}]});A("Bool",{uses:TYPE.NotNull,where:function(C){if(C===true||C===false){return true}return false},coerce:[{from:TYPE.Any,via:function(B){if(B==null||B===""){return undefined}if(B==1||B=="1"||B=="true"){return true}if(B==0||B=="0"||B=="false"){return false}return null}}]});A("Int",{uses:TYPE.Num,where:function(C){var B=String(C);if(B.match(/^\d*\.\d$/)){return false}return true},coerce:[{from:TYPE.Str,via:function(B){if(B==null||B==""){return undefined}if(B.match(/^-{0,1}\d+$/)){return parseInt(B)}return}}]});A("Float",{uses:TYPE.Num,where:function(B){return true}});A("Func",{uses:TYPE.Obj,where:function(B){if(typeof B=="function"){return true}return false}});A("Array",{uses:TYPE.Obj,where:function(B){if(B instanceof Array){return true}return false}});A("Date",{uses:TYPE.Obj,where:function(B){if(B instanceof Date){return true}return false},coerce:[{from:TYPE.Str,via:function(C){var B;if(C==undefined||C==""){return undefined}else{if(B=C.match(/\s*(\d+)-(\d+)-(\d+)/)){return new Date(B[1],B[2]-1,[B[3]])}}return null}}]});A("Joose",{uses:TYPE.Obj,where:function(B){if(B.meta&&B.meta.meta.isa(Joose.Class)){return true}return false}})})(JooseType);
// ##########################
// File: /Users/malubl/workspace/Joose/examples/blok/static/json2.js
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
// File: /Users/malubl/workspace/Joose/examples/blok/block/built_in_class_extension.js
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

// decode an html encoded string
String.prototype.decodeHtml = function () {
    var string = new String(this);
    
    string = string.replace(/&lt;/g, "<");
    string = string.replace(/&gt;/g, ">");
    string = string.replace(/&quot;/g,  "\"")
    string = string.replace(/&39;/g,  "'");
    string = string.replace(/&amp;/g, "&");
    
    return string
}
// ##########################
// File: /Users/malubl/workspace/Joose/examples/blok/block/ui/Array.js
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
// File: /Users/malubl/workspace/Joose/examples/blok/block/ui/ElementMetaclass.js
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
// File: /Users/malubl/workspace/Joose/examples/blok/block/ui/role/Notification.js
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
// File: /Users/malubl/workspace/Joose/examples/blok/block/ui/role/Draggable.js
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
// File: /Users/malubl/workspace/Joose/examples/blok/block/ui/role/Resizable.js
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
// File: /Users/malubl/workspace/Joose/examples/blok/block/ui/role/Focusable.js
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
// File: /Users/malubl/workspace/Joose/examples/blok/block/ui/role/Editable.js
// ##########################
// XXX Refactor to elimate updateState (directly set upon action)
Module("block.ui.role", function () {
    Role("Editable", {
        requires: ["getText", "setText", "_updateStateCore", "touch", "_updateFromCore", "updateState"],
        after: {
            place: function () {
                var me = this;
                this.$.dblclick(function () {
                    var newValue = prompt("Please enter Text", me.textContainer().text())
                    if(newValue) {
                        me.text(newValue);
                        me.updateState()
                    }
                })
                
                me.text(this.getText())
            },
            
            _updateFromCore: function (shape) {
                this.text(shape.getText().decodeHtml())
            },
            
            _updateStateCore: function () {
                this.setText(this.textContainer().html());
            },
            
            redraw: function () {
                 this.textContainer().html(this.getText().decodeHtml())
            }
        },
        methods: {
            
            text: function (t) {
                if(arguments.length > 0) {
                	var html = new String(t).html();
                    this.textContainer().html(html)
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
// File: /Users/malubl/workspace/Joose/examples/blok/block/ui/role/ShapeUI.js
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
// File: /Users/malubl/workspace/Joose/examples/blok/block/ui/role/Group.js
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
// File: /Users/malubl/workspace/Joose/examples/blok/block/ui/role/Stylable.js
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
// File: /Users/malubl/workspace/Joose/examples/blok/block/ui/role/Connectable.js
// ##########################
Module("block.ui.role", function () {
    Role("Connectable", {
        
    })
})
// ##########################
// File: /Users/malubl/workspace/Joose/examples/blok/block/ui/Guid.js
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
// File: /Users/malubl/workspace/Joose/examples/blok/block/ui/Manager.js
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
// File: /Users/malubl/workspace/Joose/examples/blok/block/ui/Query.js
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
// File: /Users/malubl/workspace/Joose/examples/blok/block/ui/Document.js
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
// File: /Users/malubl/workspace/Joose/examples/blok/block/ui/DocumentHeader.js
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
// File: /Users/malubl/workspace/Joose/examples/blok/block/ui/Element.js
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
// File: /Users/malubl/workspace/Joose/examples/blok/block/ui/Container.js
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
// File: /Users/malubl/workspace/Joose/examples/blok/block/ui/Undo.js
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
                console.log("undoing")
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
                    console.log("Undo shape change")
                    var copy = JSON.parse(json);
                    copy.touch();
                    before.updateFrom(copy);
                    before.touch();
                }, before)
            },
            
            addCreateStep: function (shape) {
                this.addUndoStep(function undoCreate () {
                    console.log("Undo create")
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
// File: /Users/malubl/workspace/Joose/examples/blok/block/ui/Shape.js
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
            },
            
            // calculate whether this shapes overlaps with other shapes
            // by negating the conditions for no overlap
            // Only works for rectangular shapes
            overlaps: function (other) {
            	return !(
            		other.left()   > this.right() ||
            		other.right()  < this.left()  ||
            		other.top()    > this.bottom() ||
            		other.bottom() < this.top() 
            	)
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
// File: /Users/malubl/workspace/Joose/examples/blok/block/ui/shape/Grid.js
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
// File: /Users/malubl/workspace/Joose/examples/blok/block/ui/shape/PropertiesPanel.js
// ##########################
Module("block.ui.shape", function (m) {
    
    var refreshTimeout;
    
    Class("PropertiesPanel", {
        isa: block.ui.Shape,
        has: {
            _shape: {
                is: "rw"
            },
            
            _openEdit: { // stores an edit action that gets executed if there wasnt an event before a change of shape
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
            
            handleChange: function (input, shape) {
                var me = this;
                if(shape) {
                    me.setOpenEdit(null);
                    document.undo.addUpdateStep(shape)
                    me.callProp(input, shape, $(input).val())
                    shape.touch()
                }
            },
            
            place: function () {
                var me = this;
                
                this.$  = $("#properties");
                
                this.redraw()
                
                // Update property on change of input field or select box
                this.$.find("#shapeProperties input,#shapeProperties select").each(function () {
                    $(this).change(function () {
                        me.handleChange(this, me.getShape())
                    })
                })
                
                // if we have a keypress event on an input, we will interpret this as a change if
                // there is no onchange event, but we change shapes
                this.$.find("#shapeProperties input").each(function () {
                    $(this).keypress(function () {
                        
                        var input = this;
                        var shape = me.getShape()
                        
                        me.setOpenEdit(function () {
                            me.handleChange(input, shape)
                        })
                    })
                })
            },
            
            show: function () {
                $('#shapeProperties').show()
                $('#documentProperties').hide()
                this.redraw()
            },
            
            hide: function () {
                this.executeOpenEdit()
                $('#shapeProperties').hide()
                $('#documentProperties').show()
                this.redraw()
            },
            
            executeOpenEdit: function () {
                var edit = this.getOpenEdit();
                if(edit) {
                    edit()
                    this.setOpenEdit(null)
                }
            },
            
            setShape: function (newEle) {
                this.executeOpenEdit()
                this._shape = newEle
                this.refresh(newEle);
                this.show()
            },
            
            refresh: function (shape) {
                
                if(refreshTimeout) {
                    clearTimeout(refreshTimeout)
                }
                
                var me = this;
                
                // fill in values from newly assigned shape
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
// File: /Users/malubl/workspace/Joose/examples/blok/block/ui/shape/DragPoint.js
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
// File: /Users/malubl/workspace/Joose/examples/blok/block/ui/shape/Rectangle.js
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
// File: /Users/malubl/workspace/Joose/examples/blok/block/ui/shape/Image.js
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
// File: /Users/malubl/workspace/Joose/examples/blok/block/ui/shape/SelectionGroup.js
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
// File: /Users/malubl/workspace/Joose/examples/blok/block/ui/shape/Group.js
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
// File: /Users/malubl/workspace/Joose/examples/blok/block/ui/shape/MultiSelection.js
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
                	try {
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
                	} catch(e) {
                		console.log(e)
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
// File: /Users/malubl/workspace/Joose/examples/blok/block/ui/CustomShapeBody.js
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
// File: /Users/malubl/workspace/Joose/examples/blok/block/ui/shape/Custom.js
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
// File: /Users/malubl/workspace/Joose/examples/blok/block/ui/shape/Connection.js
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
                var orig = shape1;
                var dest = shape2;
                
                if(!orig || !dest) {
                	console.log("Invalid parameters")
                	return
                }
                
                var origBottom = orig.bottom()      
                var destTop    = dest.top()
                
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
                    if(orig.overlaps(dest)) {
                    	v0.hide()
                    	v1.hide()
                    	h0.hide()
                    } else {
                    	
                    	v0.hide()
                    	v1.hide()
                    	h0.show()
                    	
                    	if(origCenter.left < destCenter.left) {
                    		h0.x(orig.right() + 1)
                    		h0.len(dest.left() - orig.right() - 1)
                    	} else {
							h0.x(dest.right() + 1)
                    		h0.len(orig.left() - dest.right() - 1)
                    	}
                    }
                    
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
                Joose.A.each(this.getVerticals(),   function (line) { if(line.$) a.push(line.$.get(0)) })
                Joose.A.each(this.getHorizontals(), function (line) { if(line.$) a.push(line.$.get(0)) })
                
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
// File: /Users/malubl/workspace/Joose/examples/blok/block/ui/Template.js
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
// File: /Users/malubl/workspace/Joose/examples/blok/block/ui/User.js
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
// File: /Users/malubl/workspace/Joose/examples/blok/block/ui/Sync.js
// ##########################
JooseGearsInitializeGears()

Module("block.ui", function (m) {
    
    var updateTimer;
    
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
                
                clearTimeout(updateTimer);
                
                updateTimer = window.setTimeout(function syncUpdate () {
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
                        2000)
                    )
            },
            
            saveState: function () {
                if(document.manager.getDirty()) {
                    this.delayedUpdate() // saving state delays update
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
                
                //console.log(data)
    
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
                        // console.log(data)
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
// File: /Users/malubl/workspace/Joose/examples/blok/block/base.js
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
	
	document.title = "Loading...";
	
	initializeDialogs()

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

})

function initializeDialogs() {
	$("#stateDialog").dialog()
    $("#stateDialog").dialog("close")
    
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
}

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



