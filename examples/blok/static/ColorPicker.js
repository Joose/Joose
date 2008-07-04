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