/*
 * jQuery UI @VERSION
 *
 * Copyright (c) 2008 Paul Bakaus (ui.jquery.com)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI
 *
 * $Date: 2008-04-01 10:23:47 -0300 (Ter, 01 Abr 2008) $
 * $Rev: 5174 $
 */
;(function($) {

    //If the UI scope is not available, add it
    $.ui = $.ui || {};
    
    //Add methods that are vital for all mouse interaction stuff (plugin registering)
    $.extend($.ui, {
        plugin: {
            add: function(module, option, set) {
                var proto = $.ui[module].prototype;
                for(var i in set) {
                    proto.plugins[i] = proto.plugins[i] || [];
                    proto.plugins[i].push([option, set[i]]);
                }
            },
            call: function(instance, name, arguments) {
                var set = instance.plugins[name]; if(!set) return;
                for (var i = 0; i < set.length; i++) {
                    if (instance.options[set[i][0]]) set[i][1].apply(instance.element, arguments);
                }
            }    
        },
        cssCache: {},
        css: function(name) {
            if ($.ui.cssCache[name]) return $.ui.cssCache[name];
            var tmp = $('<div class="ui-resizable-gen">').addClass(name).css({position:'absolute', top:'-5000px', left:'-5000px', display:'block'}).appendTo('body');
            
            //if (!$.browser.safari)
                //tmp.appendTo('body'); 
            
            //Opera and Safari set width and height to 0px instead of auto
            //Safari returns rgba(0,0,0,0) when bgcolor is not set
            $.ui.cssCache[name] = !!(
                (!/auto|default/.test(tmp.css('cursor')) || (/^[1-9]/).test(tmp.css('height')) || (/^[1-9]/).test(tmp.css('width')) || 
                !(/none/).test(tmp.css('backgroundImage')) || !(/transparent|rgba\(0, 0, 0, 0\)/).test(tmp.css('backgroundColor')))
            );
            try { $('body').get(0).removeChild(tmp.get(0));    } catch(e){}
            return $.ui.cssCache[name];
        },
        disableSelection: function(e) {
            e.unselectable = "on";
            e.onselectstart = function() {    return false; };
            if (e.style) e.style.MozUserSelect = "none";
        },
        enableSelection: function(e) {
            e.unselectable = "off";
            e.onselectstart = function() { return true; };
            if (e.style) e.style.MozUserSelect = "";
        },
        hasScroll: function(e, a) {
              var scroll = /top/.test(a||"top") ? 'scrollTop' : 'scrollLeft', has = false;
              if (e[scroll] > 0) return true; e[scroll] = 1;
              has = e[scroll] > 0 ? true : false; e[scroll] = 0;
              return has; 
        }
    });

    /******* fn scope modifications ********/

    $.each( ['Left', 'Top'], function(i, name) {
        if(!$.fn['scroll'+name]) $.fn['scroll'+name] = function(v) {
            return v != undefined ?
                this.each(function() { this == window || this == document ? window.scrollTo(name == 'Left' ? v : $(window)['scrollLeft'](), name == 'Top'  ? v : $(window)['scrollTop']()) : this['scroll'+name] = v; }) :
                this[0] == window || this[0] == document ? self[(name == 'Left' ? 'pageXOffset' : 'pageYOffset')] || $.boxModel && document.documentElement['scroll'+name] || document.body['scroll'+name] : this[0][ 'scroll' + name ];
        };
    });

    var _remove = $.fn.remove;
    $.fn.extend({
        position: function() {
            var offset       = this.offset();
            var offsetParent = this.offsetParent();
            var parentOffset = offsetParent.offset();

            return {
                top:  offset.top - num(this[0], 'marginTop')  - parentOffset.top - num(offsetParent, 'borderTopWidth'),
                left: offset.left - num(this[0], 'marginLeft')  - parentOffset.left - num(offsetParent, 'borderLeftWidth')
            };
        },
        offsetParent: function() {
            var offsetParent = this[0].offsetParent;
            while ( offsetParent && (!/^body|html$/i.test(offsetParent.tagName) && $.css(offsetParent, 'position') == 'static') )
                offsetParent = offsetParent.offsetParent;
            return $(offsetParent);
        },
        mouseInteraction: function(o) {
            return this.each(function() {
                new $.ui.mouseInteraction(this, o);
            });
        },
        removeMouseInteraction: function(o) {
            return this.each(function() {
                if($.data(this, "ui-mouse"))
                    $.data(this, "ui-mouse").destroy();
            });
        },
        remove: function() {
            jQuery("*", this).add(this).trigger("remove");
            return _remove.apply(this, arguments );
        }
    });
    
    function num(el, prop) {
        return parseInt($.curCSS(el.jquery?el[0]:el,prop,true))||0;
    };
    
    
    /********** Mouse Interaction Plugin *********/
    
    $.ui.mouseInteraction = function(element, options) {
    
        var self = this;
        this.element = element;

        $.data(this.element, "ui-mouse", this);
        this.options = $.extend({}, options);
        
        $(element).bind('mousedown.draggable', function() { return self.click.apply(self, arguments); });
        if($.browser.msie) $(element).attr('unselectable', 'on'); //Prevent text selection in IE
        
        // prevent draggable-options-delay bug #2553
        $(element).mouseup(function() {
            if(self.timer) clearInterval(self.timer);
        });
    };
    
    $.extend($.ui.mouseInteraction.prototype, {
        
        destroy: function() { $(this.element).unbind('mousedown.draggable'); },
        trigger: function() { return this.click.apply(this, arguments); },
        click: function(e) {
            
            if(
                   e.which != 1 //only left click starts dragging
                || $.inArray(e.target.nodeName.toLowerCase(), this.options.dragPrevention || []) != -1 // Prevent execution on defined elements
                || (this.options.condition && !this.options.condition.apply(this.options.executor || this, [e, this.element])) //Prevent execution on condition
            ) return true;
                
            var self = this;
            var initialize = function() {
                self._MP = { left: e.pageX, top: e.pageY }; // Store the click mouse position
                $(document).bind('mouseup.draggable', function() { return self.stop.apply(self, arguments); });
                $(document).bind('mousemove.draggable', function() { return self.drag.apply(self, arguments); });
                
                if(!self.initalized && Math.abs(self._MP.left-e.pageX) >= self.options.distance || Math.abs(self._MP.top-e.pageY) >= self.options.distance) {                
                    if(self.options.start) self.options.start.call(self.options.executor || self, e, self.element);
                    if(self.options.drag) self.options.drag.call(self.options.executor || self, e, this.element); //This is actually not correct, but expected
                    self.initialized = true;
                }
            };

            if(this.options.delay) {
                if(this.timer) clearInterval(this.timer);
                this.timer = setTimeout(initialize, this.options.delay);
            } else {
                initialize();
            }
                
            return false;
            
        },
        stop: function(e) {            
            
            var o = this.options;
            if(!this.initialized) return $(document).unbind('mouseup.draggable').unbind('mousemove.draggable');

            if(this.options.stop) this.options.stop.call(this.options.executor || this, e, this.element);
            $(document).unbind('mouseup.draggable').unbind('mousemove.draggable');
            this.initialized = false;
            return false;
            
        },
        drag: function(e) {

            var o = this.options;
            if ($.browser.msie && !e.button) return this.stop.apply(this, [e]); // IE mouseup check
            
            if(!this.initialized && (Math.abs(this._MP.left-e.pageX) >= o.distance || Math.abs(this._MP.top-e.pageY) >= o.distance)) {                
                if(this.options.start) this.options.start.call(this.options.executor || this, e, this.element);
                this.initialized = true;
            } else {
                if(!this.initialized) return false;
            }

            if(o.drag) o.drag.call(this.options.executor || this, e, this.element);
            return false;
            
        }
    });
    
})(jQuery);
 /*
 * jQuery UI Draggable
 *
 * Copyright (c) 2008 Paul Bakaus
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 * 
 * http://docs.jquery.com/UI/Draggables
 *
 * Depends:
 *   ui.base.js
 *
 * Revision: $Id: ui.draggable.js 5194 2008-04-04 12:30:10Z paul.bakaus $
 */
;(function($) {

    $.fn.extend({
        draggable: function(options) {
            var args = Array.prototype.slice.call(arguments, 1);
            
            return this.each(function() {
                if (typeof options == "string") {
                    var drag = $.data(this, "draggable");
                    if(drag) drag[options].apply(drag, args);

                } else if(!$.data(this, "draggable"))
                    new $.ui.draggable(this, options);
            });
        }
    });
    
    $.ui.draggable = function(element, options) {
        //Initialize needed constants
        var self = this;
        
        this.element = $(element);
        
        $.data(element, "draggable", this);
        this.element.addClass("ui-draggable");
        
        //Prepare the passed options
        this.options = $.extend({}, options);
        var o = this.options;
        $.extend(o, {
            helper: o.ghosting == true ? 'clone' : (o.helper || 'original'),
            handle : o.handle ? ($(o.handle, element)[0] ? $(o.handle, element) : this.element) : this.element,
            appendTo: o.appendTo || 'parent'        
        });
        
        $(element).bind("setData.draggable", function(event, key, value){
            self.options[key] = value;
        }).bind("getData.draggable", function(event, key){
            return self.options[key];
        });
        
        //Initialize mouse events for interaction
        $(o.handle).mouseInteraction({
            executor: this,
            delay: o.delay,
            distance: o.distance || 1,
            dragPrevention: o.cancel || o.cancel === '' ? o.cancel.toLowerCase().split(',') : ['input','textarea','button','select','option'],
            start: this.start,
            stop: this.stop,
            drag: this.drag,
            condition: function(e) { return !(e.target.className.indexOf("ui-resizable-handle") != -1 || this.options.disabled); }
        });
        
        //Position the node
        if(o.helper == 'original' && (this.element.css('position') == 'static' || this.element.css('position') == ''))
            this.element.css('position', 'relative');
            
        //Prepare cursorAt
        if(o.cursorAt && o.cursorAt.constructor == Array)
            o.cursorAt = { left: o.cursorAt[0], top: o.cursorAt[1] };
        
    };
    
    $.extend($.ui.draggable.prototype, {
        plugins: {},
        ui: function(e) {
            return {
                helper: this.helper,
                position: this.position,
                absolutePosition: this.positionAbs,
                instance: this,
                options: this.options,
                element: this.element                
            };
        },
        propagate: function(n,e) {
            $.ui.plugin.call(this, n, [e, this.ui()]);
            return this.element.triggerHandler(n == "drag" ? n : "drag"+n, [e, this.ui()], this.options[n]);
        },
        destroy: function() {
            if(!$.data(this.element[0], 'draggable')) return;
            this.options.handle.removeMouseInteraction();
            this.element
                .removeClass("ui-draggable ui-draggable-disabled")
                .removeData("draggable")
                .unbind(".draggable");
        },
        enable: function() {
            this.element.removeClass("ui-draggable-disabled");
            this.options.disabled = false;
        },
        disable: function() {
            this.element.addClass("ui-draggable-disabled");
            this.options.disabled = true;
        },
        setContrains: function(minLeft,maxLeft,minTop,maxTop) {
            this.minLeft = minLeft; this.maxLeft = maxLeft;
            this.minTop = minTop; this.maxTop = maxTop;
            this.constrainsSet = true;
        },
        checkConstrains: function() {
            if(!this.constrainsSet) return;
            if(this.position.left < this.minLeft) this.position.left = this.minLeft;
            if(this.position.left > this.maxLeft - this.helperProportions.width) this.position.left = this.maxLeft - this.helperProportions.width;
            if(this.position.top < this.minTop) this.position.top = this.minTop;
            if(this.position.top > this.maxTop - this.helperProportions.height) this.position.top = this.maxTop - this.helperProportions.height;
        },
        recallOffset: function(e) {

            var elementPosition = { left: this.elementOffset.left - this.offsetParentOffset.left, top: this.elementOffset.top - this.offsetParentOffset.top };
            var r = this.helper.css('position') == 'relative';

            //Generate the original position
            this.originalPosition = {
                left: (r ? parseInt(this.helper.css('left'),10) || 0 : elementPosition.left + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollLeft)),
                top: (r ? parseInt(this.helper.css('top'),10) || 0 : elementPosition.top + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollTop))
            };
            
            //Generate a flexible offset that will later be subtracted from e.pageX/Y
            this.offset = {left: this._pageX - this.originalPosition.left, top: this._pageY - this.originalPosition.top };
            
        },
        start: function(e) {
            var o = this.options;
            if($.ui.ddmanager) $.ui.ddmanager.current = this;
            
            //Create and append the visible helper
            this.helper = typeof o.helper == 'function' ? $(o.helper.apply(this.element[0], [e])) : (o.helper == 'clone' ? this.element.clone().appendTo((o.appendTo == 'parent' ? this.element[0].parentNode : o.appendTo)) : this.element);
            if(this.helper[0] != this.element[0]) this.helper.css('position', 'absolute');
            if(!this.helper.parents('body').length) this.helper.appendTo((o.appendTo == 'parent' ? this.element[0].parentNode : o.appendTo));
            
            
            //Find out the next positioned parent
            this.offsetParent = (function(cp) {
                while(cp) {
                    if(cp.style && (/(absolute|relative|fixed)/).test($.css(cp,'position'))) return $(cp);
                    cp = cp.parentNode ? cp.parentNode : null;
                }; return $("body");        
            })(this.helper[0].parentNode);
            
            //Prepare variables for position generation
            this.elementOffset = this.element.offset();
            this.offsetParentOffset = this.offsetParent.offset();
            var elementPosition = { left: this.elementOffset.left - this.offsetParentOffset.left, top: this.elementOffset.top - this.offsetParentOffset.top };
            this._pageX = e.pageX; this._pageY = e.pageY;
            this.clickOffset = { left: e.pageX - this.elementOffset.left, top: e.pageY - this.elementOffset.top };
            var r = this.helper.css('position') == 'relative';

            //Generate the original position
            this.originalPosition = {
                left: (r ? parseInt(this.helper.css('left'),10) || 0 : elementPosition.left + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollLeft)),
                top: (r ? parseInt(this.helper.css('top'),10) || 0 : elementPosition.top + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollTop))
            };
            
            //If we have a fixed element, we must subtract the scroll offset again
            if(this.element.css('position') == 'fixed') {
                this.originalPosition.top -= this.offsetParent[0] == document.body ? $(document).scrollTop() : this.offsetParent[0].scrollTop;
                this.originalPosition.left -= this.offsetParent[0] == document.body ? $(document).scrollLeft() : this.offsetParent[0].scrollLeft;
            }
            
            //Generate a flexible offset that will later be subtracted from e.pageX/Y
            this.offset = {left: e.pageX - this.originalPosition.left, top: e.pageY - this.originalPosition.top };
            
            //Substract margins
            if(this.element[0] != this.helper[0]) {
                this.offset.left += parseInt(this.element.css('marginLeft'),10) || 0;
                this.offset.top += parseInt(this.element.css('marginTop'),10) || 0;
            }
            
            //Call plugins and callbacks
            this.propagate("start", e);

            this.helperProportions = { width: this.helper.outerWidth(), height: this.helper.outerHeight() };
            if ($.ui.ddmanager && !o.dropBehaviour) $.ui.ddmanager.prepareOffsets(this, e);
            
            //If we have something in cursorAt, we'll use it
            if(o.cursorAt) {
                if(o.cursorAt.top != undefined || o.cursorAt.bottom != undefined) {
                    this.offset.top -= this.clickOffset.top - (o.cursorAt.top != undefined ? o.cursorAt.top : (this.helperProportions.height - o.cursorAt.bottom));
                    this.clickOffset.top = (o.cursorAt.top != undefined ? o.cursorAt.top : (this.helperProportions.height - o.cursorAt.bottom));
                }
                if(o.cursorAt.left != undefined || o.cursorAt.right != undefined) {
                    this.offset.left -= this.clickOffset.left - (o.cursorAt.left != undefined ? o.cursorAt.left : (this.helperProportions.width - o.cursorAt.right));
                    this.clickOffset.left = (o.cursorAt.left != undefined ? o.cursorAt.left : (this.helperProportions.width - o.cursorAt.right));
                }
            }

            return false;

        },
        clear: function() {
            if($.ui.ddmanager) $.ui.ddmanager.current = null;
            this.helper = null;
        },
        stop: function(e) {

            //If we are using droppables, inform the manager about the drop
            if ($.ui.ddmanager && !this.options.dropBehaviour)
                $.ui.ddmanager.drop(this, e);
                
            //Call plugins and trigger callbacks
            this.propagate("stop", e);
            
            if(this.cancelHelperRemoval) return false;            
            if(this.options.helper != 'original') this.helper.remove();
            this.clear();

            return false;
        },
        drag: function(e) {

            //Compute the helpers position
            this.position = { top: e.pageY - this.offset.top, left: e.pageX - this.offset.left };
            this.positionAbs = { left: e.pageX - this.clickOffset.left, top: e.pageY - this.clickOffset.top };

            //Call plugins and callbacks
            this.checkConstrains();            
            this.position = this.propagate("drag", e) || this.position;
            this.checkConstrains();
            
            $(this.helper).css({ left: this.position.left+'px', top: this.position.top+'px' }); // Stick the helper to the cursor
            if($.ui.ddmanager) $.ui.ddmanager.drag(this, e);
            return false;
            
        }
    });
    
/*
 * Draggable Extensions
 */
     
    $.ui.plugin.add("draggable", "cursor", {
        start: function(e, ui) {
            var t = $('body');
            if (t.css("cursor")) ui.options._cursor = t.css("cursor");
            t.css("cursor", ui.options.cursor);
        },
        stop: function(e, ui) {
            if (ui.options._cursor) $('body').css("cursor", ui.options._cursor);
        }
    });

    $.ui.plugin.add("draggable", "zIndex", {
        start: function(e, ui) {
            var t = $(ui.helper);
            if(t.css("zIndex")) ui.options._zIndex = t.css("zIndex");
            t.css('zIndex', ui.options.zIndex);
        },
        stop: function(e, ui) {
            if(ui.options._zIndex) $(ui.helper).css('zIndex', ui.options._zIndex);
        }
    });

    $.ui.plugin.add("draggable", "opacity", {
        start: function(e, ui) {
            var t = $(ui.helper);
            if(t.css("opacity")) ui.options._opacity = t.css("opacity");
            t.css('opacity', ui.options.opacity);
        },
        stop: function(e, ui) {
            if(ui.options._opacity) $(ui.helper).css('opacity', ui.options._opacity);
        }
    });


    $.ui.plugin.add("draggable", "revert", {
        stop: function(e, ui) {
            var self = ui.instance, helper = $(self.helper);
            self.cancelHelperRemoval = true;
            
            $(ui.helper).animate({ left: self.originalPosition.left, top: self.originalPosition.top }, parseInt(ui.options.revert, 10) || 500, function() {
                if(ui.options.helper != 'original') helper.remove();
                if (!helper) self.clear();
            });
        }
    });

    $.ui.plugin.add("draggable", "iframeFix", {
        start: function(e, ui) {

            var o = ui.options;
            if(ui.instance.slowMode) return; // Make clones on top of iframes (only if we are not in slowMode)
            
            if(o.iframeFix.constructor == Array) {
                for(var i=0;i<o.iframeFix.length;i++) {
                    var co = $(o.iframeFix[i]).offset({ border: false });
                    $('<div class="DragDropIframeFix"" style="background: #fff;"></div>').css("width", $(o.iframeFix[i])[0].offsetWidth+"px").css("height", $(o.iframeFix[i])[0].offsetHeight+"px").css("position", "absolute").css("opacity", "0.001").css("z-index", "1000").css("top", co.top+"px").css("left", co.left+"px").appendTo("body");
                }        
            } else {
                $("iframe").each(function() {                    
                    var co = $(this).offset({ border: false });
                    $('<div class="DragDropIframeFix" style="background: #fff;"></div>').css("width", this.offsetWidth+"px").css("height", this.offsetHeight+"px").css("position", "absolute").css("opacity", "0.001").css("z-index", "1000").css("top", co.top+"px").css("left", co.left+"px").appendTo("body");
                });                            
            }

        },
        stop: function(e, ui) {
            if(ui.options.iframeFix) $("div.DragDropIframeFix").each(function() { this.parentNode.removeChild(this); }); //Remove frame helpers    
        }
    });
    
    $.ui.plugin.add("draggable", "containment", {
        start: function(e, ui) {

            var o = ui.options;
            var self = ui.instance;
            if((o.containment.left != undefined || o.containment.constructor == Array) && !o._containment) return;
            if(!o._containment) o._containment = o.containment;

            if(o._containment == 'parent') o._containment = this[0].parentNode;
            if(o._containment == 'document') {
                o.containment = [
                    0,
                    0,
                    $(document).width(),
                    ($(document).height() || document.body.parentNode.scrollHeight)
                ];
            } else { //I'm a node, so compute top/left/right/bottom

                var ce = $(o._containment)[0];
                var co = $(o._containment).offset();

                o.containment = [
                    co.left,
                    co.top,
                    co.left+(ce.offsetWidth || ce.scrollWidth),
                    co.top+(ce.offsetHeight || ce.scrollHeight)
                ];
            }
            
            var c = o.containment;
            ui.instance.setContrains(
                c[0] - (self.offset.left - self.clickOffset.left), //min left
                c[2] - (self.offset.left - self.clickOffset.left), //max left
                c[1] - (self.offset.top - self.clickOffset.top), //min top
                c[3] - (self.offset.top - self.clickOffset.top) //max top
            );

        }
    });

    $.ui.plugin.add("draggable", "grid", {
        drag: function(e, ui) {
            var o = ui.options;
            var newLeft = ui.instance.originalPosition.left + Math.round((e.pageX - ui.instance._pageX) / o.grid[0]) * o.grid[0];
            var newTop = ui.instance.originalPosition.top + Math.round((e.pageY - ui.instance._pageY) / o.grid[1]) * o.grid[1];
            
            ui.instance.position.left = newLeft;
            ui.instance.position.top = newTop;

        }
    });

    $.ui.plugin.add("draggable", "axis", {
        drag: function(e, ui) {
            var o = ui.options;
            if(o.constraint) o.axis = o.constraint; //Legacy check
            switch (o.axis) {
                case 'x' : ui.instance.position.top = ui.instance.originalPosition.top; break;
                case 'y' : ui.instance.position.left = ui.instance.originalPosition.left; break;
            }
        }
    });

    $.ui.plugin.add("draggable", "scroll", {
        start: function(e, ui) {
            var o = ui.options;
            o.scrollSensitivity    = o.scrollSensitivity || 20;
            o.scrollSpeed        = o.scrollSpeed || 20;

            ui.instance.overflowY = function(el) {
                do { if(/auto|scroll/.test(el.css('overflow')) || (/auto|scroll/).test(el.css('overflow-y'))) return el; el = el.parent(); } while (el[0].parentNode);
                return $(document);
            }(this);
            ui.instance.overflowX = function(el) {
                do { if(/auto|scroll/.test(el.css('overflow')) || (/auto|scroll/).test(el.css('overflow-x'))) return el; el = el.parent(); } while (el[0].parentNode);
                return $(document);
            }(this);
        },
        drag: function(e, ui) {
            
            var o = ui.options;
            var i = ui.instance;

            if(i.overflowY[0] != document && i.overflowY[0].tagName != 'HTML') {
                if(i.overflowY[0].offsetHeight - (ui.position.top - i.overflowY[0].scrollTop + i.clickOffset.top) < o.scrollSensitivity)
                    i.overflowY[0].scrollTop = i.overflowY[0].scrollTop + o.scrollSpeed;
                if((ui.position.top - i.overflowY[0].scrollTop + i.clickOffset.top) < o.scrollSensitivity)
                    i.overflowY[0].scrollTop = i.overflowY[0].scrollTop - o.scrollSpeed;                
            } else {
                //$(document.body).append('<p>'+(e.pageY - $(document).scrollTop())+'</p>');
                if(e.pageY - $(document).scrollTop() < o.scrollSensitivity)
                    $(document).scrollTop($(document).scrollTop() - o.scrollSpeed);
                if($(window).height() - (e.pageY - $(document).scrollTop()) < o.scrollSensitivity)
                    $(document).scrollTop($(document).scrollTop() + o.scrollSpeed);
            }
            
            if(i.overflowX[0] != document && i.overflowX[0].tagName != 'HTML') {
                if(i.overflowX[0].offsetWidth - (ui.position.left - i.overflowX[0].scrollLeft + i.clickOffset.left) < o.scrollSensitivity)
                    i.overflowX[0].scrollLeft = i.overflowX[0].scrollLeft + o.scrollSpeed;
                if((ui.position.top - i.overflowX[0].scrollLeft + i.clickOffset.left) < o.scrollSensitivity)
                    i.overflowX[0].scrollLeft = i.overflowX[0].scrollLeft - o.scrollSpeed;                
            } else {
                if(e.pageX - $(document).scrollLeft() < o.scrollSensitivity)
                    $(document).scrollLeft($(document).scrollLeft() - o.scrollSpeed);
                if($(window).width() - (e.pageX - $(document).scrollLeft()) < o.scrollSensitivity)
                    $(document).scrollLeft($(document).scrollLeft() + o.scrollSpeed);
            }
            
            ui.instance.recallOffset(e);

        }
    });
    
    $.ui.plugin.add("draggable", "snap", {
        start: function(e, ui) {
            
            ui.instance.snapElements = [];
            $(ui.options.snap === true ? '.ui-draggable' : ui.options.snap).each(function() {
                var $t = $(this); var $o = $t.offset();
                if(this != ui.instance.element[0]) ui.instance.snapElements.push({
                    item: this,
                    width: $t.outerWidth(),
                    height: $t.outerHeight(),
                    top: $o.top,
                    left: $o.left
                });
            });
            
        },
        drag: function(e, ui) {

            var d = ui.options.snapTolerance || 20;
            var x1 = ui.absolutePosition.left, x2 = x1 + ui.instance.helperProportions.width,
                y1 = ui.absolutePosition.top, y2 = y1 + ui.instance.helperProportions.height;

            for (var i = ui.instance.snapElements.length - 1; i >= 0; i--){

                var l = ui.instance.snapElements[i].left, r = l + ui.instance.snapElements[i].width, 
                    t = ui.instance.snapElements[i].top,  b = t + ui.instance.snapElements[i].height;

                //Yes, I know, this is insane ;)
                if(!((l-d < x1 && x1 < r+d && t-d < y1 && y1 < b+d) || (l-d < x1 && x1 < r+d && t-d < y2 && y2 < b+d) || (l-d < x2 && x2 < r+d && t-d < y1 && y1 < b+d) || (l-d < x2 && x2 < r+d && t-d < y2 && y2 < b+d))) continue;

                if(ui.options.snapMode != 'inner') {
                    var ts = Math.abs(t - y2) <= 20;
                    var bs = Math.abs(b - y1) <= 20;
                    var ls = Math.abs(l - x2) <= 20;
                    var rs = Math.abs(r - x1) <= 20;
                    if(ts) ui.position.top = t - ui.instance.offset.top + ui.instance.clickOffset.top - ui.instance.helperProportions.height;
                    if(bs) ui.position.top = b - ui.instance.offset.top + ui.instance.clickOffset.top;
                    if(ls) ui.position.left = l - ui.instance.offset.left + ui.instance.clickOffset.left - ui.instance.helperProportions.width;
                    if(rs) ui.position.left = r - ui.instance.offset.left + ui.instance.clickOffset.left;
                }
                
                if(ui.options.snapMode != 'outer') {
                    var ts = Math.abs(t - y1) <= 20;
                    var bs = Math.abs(b - y2) <= 20;
                    var ls = Math.abs(l - x1) <= 20;
                    var rs = Math.abs(r - x2) <= 20;
                    if(ts) ui.position.top = t - ui.instance.offset.top + ui.instance.clickOffset.top;
                    if(bs) ui.position.top = b - ui.instance.offset.top + ui.instance.clickOffset.top - ui.instance.helperProportions.height;
                    if(ls) ui.position.left = l - ui.instance.offset.left + ui.instance.clickOffset.left;
                    if(rs) ui.position.left = r - ui.instance.offset.left + ui.instance.clickOffset.left - ui.instance.helperProportions.width;
                }

            };
        }
    });
    
    $.ui.plugin.add("draggable", "connectToSortable", {
        start: function(e,ui) {
            ui.instance.sortable = $.data($(ui.options.connectToSortable)[0], 'sortable');
            ui.instance.sortableOffset = ui.instance.sortable.element.offset();
            ui.instance.sortableOuterWidth = ui.instance.sortable.element.outerWidth();
            ui.instance.sortableOuterHeight = ui.instance.sortable.element.outerHeight();
            if(ui.instance.sortable.options.revert) ui.instance.sortable.shouldRevert = true;
        },
        stop: function(e,ui) {
            //If we are still over the sortable, we fake the stop event of the sortable, but also remove helper
            var inst = ui.instance.sortable;
            if(inst.isOver) {
                inst.isOver = 0;
                ui.instance.cancelHelperRemoval = true; //Don't remove the helper in the draggable instance
                inst.cancelHelperRemoval = false; //Remove it in the sortable instance (so sortable plugins like revert still work)
                if(inst.shouldRevert) inst.options.revert = true; //revert here
                inst.stop(e);
                inst.options.helper = "original";
            }
        },
        drag: function(e,ui) {
            //This is handy: We reuse the intersectsWith method for checking if the current draggable helper
            //intersects with the sortable container
            var inst = ui.instance.sortable;
            ui.instance.position.absolute = ui.absolutePosition; //Sorry, this is an ugly API fix
            
            if(inst.intersectsWith.call(ui.instance, {
                left: ui.instance.sortableOffset.left, top: ui.instance.sortableOffset.top,
                width: ui.instance.sortableOuterWidth, height: ui.instance.sortableOuterHeight
            })) {
                //If it intersects, we use a little isOver variable and set it once, so our move-in stuff gets fired only once
                if(!inst.isOver) {
                    inst.isOver = 1;
                    
                    //Cache the width/height of the new helper
                    var height = inst.options.placeholderElement ? $(inst.options.placeholderElement, $(inst.options.items, inst.element)).innerHeight() : $(inst.options.items, inst.element).innerHeight();
                    var width = inst.options.placeholderElement ? $(inst.options.placeholderElement, $(inst.options.items, inst.element)).innerWidth() : $(inst.options.items, inst.element).innerWidth();

                    //Now we fake the start of dragging for the sortable instance,
                    //by cloning the list group item, appending it to the sortable and using it as inst.currentItem
                    //We can then fire the start event of the sortable with our passed browser event, and our own helper (so it doesn't create a new one)
                    inst.currentItem = $(this).clone().appendTo(inst.element);
                    inst.options.helper = function() { return ui.helper[0]; };
                    inst.start(e);
                    
                    //Because the browser event is way off the new appended portlet, we modify a couple of variables to reflect the changes
                    inst.clickOffset.top = ui.instance.clickOffset.top;
                    inst.clickOffset.left = ui.instance.clickOffset.left;
                    inst.offset.left -= ui.absolutePosition.left - inst.position.absolute.left;
                    inst.offset.top -= ui.absolutePosition.top - inst.position.absolute.top;
                    
                    //Do a nifty little helper animation: Animate it to the portlet's size (just takes the first 'li' element in the sortable now)
                    inst.helperProportions = { width:  width, height: height}; //We have to reset the helper proportions, because we are doing our animation there
                    ui.helper.animate({ height: height, width: width}, 500);
                    ui.instance.propagate("toSortable", e);
                
                }

                //Provided we did all the previous steps, we can fire the drag event of the sortable on every draggable drag, when it intersects with the sortable
                if(inst.currentItem) inst.drag(e);
                
            } else {
                
                //If it doesn't intersect with the sortable, and it intersected before,
                //we fake the drag stop of the sortable, but make sure it doesn't remove the helper by using cancelHelperRemoval
                if(inst.isOver) {
                    inst.isOver = 0;
                    inst.cancelHelperRemoval = true;
                    inst.options.revert = false; //No revert here
                    inst.stop(e);
                    inst.options.helper = "original";
                    
                    //Now we remove our currentItem, the list group clone again, and the placeholder, and animate the helper back to it's original size
                    inst.currentItem.remove();
                    inst.placeholder.remove();
                    
                    ui.helper.animate({ height: this.innerHeight(), width: this.innerWidth() }, 500);
                    ui.instance.propagate("fromSortable", e);
                }
                
            };
        }
    })

    //TODO: wrapHelper

})(jQuery);

/*
 * jQuery UI Droppable
 *
 * Copyright (c) 2008 Paul Bakaus
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 * 
 * http://docs.jquery.com/UI/Droppables
 *
 * Depends:
 *   ui.base.js
 *   ui.draggable.js
 *
 * Revision: $Id: ui.droppable.js 5198 2008-04-04 13:06:40Z paul.bakaus $
 */
;(function($) {
    
    $.fn.extend({
        droppable: function(options) {
            var args = Array.prototype.slice.call(arguments, 1);
            
            return this.each(function() {
                if (typeof options == "string") {
                    var drop = $.data(this, "droppable");
                    if(drop) drop[options].apply(drop, args);
                    
                } else if(!$.data(this, "droppable"))
                    new $.ui.droppable(this, options);
            });
        }
    });
    
    $.ui.droppable = function(element, options) {
        
        //Initialize needed constants
        var instance = this;
        this.element = $(element);
        $.data(element, "droppable", this);
        this.element.addClass("ui-droppable");
        
        //Prepare the passed options
        var o = this.options = options = $.extend({}, $.ui.droppable.defaults, options);
        var accept = o.accept;
        o = $.extend(o, {
            accept: o.accept && o.accept.constructor == Function ? o.accept : function(d) {
                return $(d).is(accept);
            }
        });
        
        $(element).bind("setData.droppable", function(event, key, value){
            o[key] = value;
        }).bind("getData.droppable", function(event, key){
            return o[key];
        }).bind('remove', function() {
            instance.destroy();
        });
        
        //Store the droppable's proportions
        this.proportions = { width: this.element.outerWidth(), height: this.element.outerHeight() };
        
        // Add the reference and positions to the manager
        $.ui.ddmanager.droppables.push({ item: this, over: 0, out: 1 });
        
    };
    
    $.extend($.ui.droppable, {
        defaults: {
            disabled: false,
            tolerance: 'intersect'
        }
    });
    
    $.extend($.ui.droppable.prototype, {
        plugins: {},
        ui: function(c) {
            return {
                instance: this,
                draggable: (c.currentItem || c.element),
                helper: c.helper,
                position: c.position,
                absolutePosition: c.positionAbs,
                options: this.options,
                element: this.element
            };
        },
        destroy: function() {
            var drop = $.ui.ddmanager.droppables;
            for ( var i = 0; i < drop.length; i++ )
                if ( drop[i].item == this )
                    drop.splice(i, 1);
            
            this.element
                .removeClass("ui-droppable ui-droppable-disabled")
                .removeData("droppable")
                .unbind(".droppable");
        },
        enable: function() {
            this.element.removeClass("ui-droppable-disabled");
            this.options.disabled = false;
        },
        disable: function() {
            this.element.addClass("ui-droppable-disabled");
            this.options.disabled = true;
        },
        over: function(e) {
            
            var draggable = $.ui.ddmanager.current;
            if (!draggable || (draggable.currentItem || draggable.element)[0] == this.element[0]) return; // Bail if draggable and droppable are same element
            
            if (this.options.accept.call(this.element,(draggable.currentItem || draggable.element))) {
                $.ui.plugin.call(this, 'over', [e, this.ui(draggable)]);
                this.element.triggerHandler("dropover", [e, this.ui(draggable)], this.options.over);
            }
            
        },
        out: function(e) {
            
            var draggable = $.ui.ddmanager.current;
            if (!draggable || (draggable.currentItem || draggable.element)[0] == this.element[0]) return; // Bail if draggable and droppable are same element
            
            if (this.options.accept.call(this.element,(draggable.currentItem || draggable.element))) {
                $.ui.plugin.call(this, 'out', [e, this.ui(draggable)]);
                this.element.triggerHandler("dropout", [e, this.ui(draggable)], this.options.out);
            }
            
        },
        drop: function(e,custom) {
            
            var draggable = custom || $.ui.ddmanager.current;
            if (!draggable || (draggable.currentItem || draggable.element)[0] == this.element[0]) return; // Bail if draggable and droppable are same element
            
            var childrenIntersection = false;
            this.element.find(".ui-droppable").each(function() {
                var inst = $.data(this, 'droppable');
                if(inst.options.greedy && $.ui.intersect(draggable, { item: inst, offset: inst.element.offset() }, inst.options.tolerance)) {
                    childrenIntersection = true; return false;
                }
            });
            if(childrenIntersection) return;
            
            if(this.options.accept.call(this.element,(draggable.currentItem || draggable.element))) {
                $.ui.plugin.call(this, 'drop', [e, this.ui(draggable)]);
                this.element.triggerHandler("drop", [e, this.ui(draggable)], this.options.drop);
            }
            
        },
        activate: function(e) {
            
            var draggable = $.ui.ddmanager.current;
            $.ui.plugin.call(this, 'activate', [e, this.ui(draggable)]);
            if(draggable) this.element.triggerHandler("dropactivate", [e, this.ui(draggable)], this.options.activate);
            
        },
        deactivate: function(e) {
            
            var draggable = $.ui.ddmanager.current;
            $.ui.plugin.call(this, 'deactivate', [e, this.ui(draggable)]);
            if(draggable) this.element.triggerHandler("dropdeactivate", [e, this.ui(draggable)], this.options.deactivate);
            
        }
    });
    
    $.ui.intersect = function(draggable, droppable, toleranceMode) {
        
        if (!droppable.offset) return false;
        
        var x1 = (draggable.positionAbs || draggable.position.absolute).left, x2 = x1 + draggable.helperProportions.width,
            y1 = (draggable.positionAbs || draggable.position.absolute).top, y2 = y1 + draggable.helperProportions.height;
        var l = droppable.offset.left, r = l + droppable.item.proportions.width,
            t = droppable.offset.top,  b = t + droppable.item.proportions.height;
        
        switch (toleranceMode) {
            case 'fit':
                
                if(!((y2-(draggable.helperProportions.height/2) > t && y1 < t) || (y1 < b && y2 > b) || (x2 > l && x1 < l) || (x1 < r && x2 > r))) return false;
                
                if(y2-(draggable.helperProportions.height/2) > t && y1 < t) return 1; //Crosses top edge
                if(y1 < b && y2 > b) return 2; //Crosses bottom edge
                if(x2 > l && x1 < l) return 1; //Crosses left edge
                if(x1 < r && x2 > r) return 2; //Crosses right edge
                
                //return (   l < x1 && x2 < r
                //    && t < y1 && y2 < b);
                break;
            case 'intersect':
                return (   l < x1 + (draggable.helperProportions.width  / 2)    // Right Half
                    &&     x2 - (draggable.helperProportions.width  / 2) < r    // Left Half
                    && t < y1 + (draggable.helperProportions.height / 2)        // Bottom Half
                    &&     y2 - (draggable.helperProportions.height / 2) < b ); // Top Half
                break;
            case 'pointer':
                return (   l < ((draggable.positionAbs || draggable.position.absolute).left + draggable.clickOffset.left) && ((draggable.positionAbs || draggable.position.absolute).left + draggable.clickOffset.left) < r
                    && t < ((draggable.positionAbs || draggable.position.absolute).top + draggable.clickOffset.top) && ((draggable.positionAbs || draggable.position.absolute).top + draggable.clickOffset.top) < b);
                break;
            case 'touch':
                return ( (y1 >= t && y1 <= b) ||    // Top edge touching
                         (y2 >= t && y2 <= b) ||    // Bottom edge touching
                         (y1 < t && y2 > b)        // Surrounded vertically
                         ) && (
                         (x1 >= l && x1 <= r) ||    // Left edge touching
                         (x2 >= l && x2 <= r) ||    // Right edge touching
                         (x1 < l && x2 > r)        // Surrounded horizontally
                        );
                break;
            default:
                return false;
                break;
            }
        
    };
    
    /*
        This manager tracks offsets of draggables and droppables
    */
    $.ui.ddmanager = {
        current: null,
        droppables: [],
        prepareOffsets: function(t, e) {
            
            var m = $.ui.ddmanager.droppables;
            var type = e ? e.type : null; // workaround for #2317
            for (var i = 0; i < m.length; i++) {
                
                if(m[i].item.options.disabled || (t && !m[i].item.options.accept.call(m[i].item.element,(t.currentItem || t.element)))) continue;
                m[i].offset = $(m[i].item.element).offset();
                m[i].item.proportions = { width: m[i].item.element.outerWidth(), height: m[i].item.element.outerHeight() };
                
                if(type == "dragstart") m[i].item.activate.call(m[i].item, e); //Activate the droppable if used directly from draggables
            }
            
        },
        drop: function(draggable, e) {
            
            $.each($.ui.ddmanager.droppables, function() {
                
                if (!this.item.options.disabled && $.ui.intersect(draggable, this, this.item.options.tolerance))
                    this.item.drop.call(this.item, e);
                
                if (!this.item.options.disabled && this.item.options.accept.call(this.item.element,(draggable.currentItem || draggable.element))) {
                    this.out = 1; this.over = 0;
                    this.item.deactivate.call(this.item, e);
                }
                
            });
            
        },
        drag: function(draggable, e) {
            
            //If you have a highly dynamic page, you might try this option. It renders positions every time you move the mouse.
            if(draggable.options.refreshPositions) $.ui.ddmanager.prepareOffsets(draggable, e);
            
            //Run through all droppables and check their positions based on specific tolerance options
            $.each($.ui.ddmanager.droppables, function() {
                
                if(this.item.disabled || this.greedyChild) return;
                var intersects = $.ui.intersect(draggable, this, this.item.options.tolerance);
                
                var c = !intersects && this.over == 1 ? 'out' : (intersects && this.over == 0 ? 'over' : null);
                if(!c) return;
                
                var instance = $.data(this.item.element[0], 'droppable');
                if (instance.options.greedy) {
                    this.item.element.parents('.ui-droppable:eq(0)').each(function() {
                        var parent = this;
                        $.each($.ui.ddmanager.droppables, function() {
                            if (this.item.element[0] != parent) return;
                            this[c] = 0;
                            this[c == 'out' ? 'over' : 'out'] = 1;
                            this.greedyChild = (c == 'over' ? 1 : 0);
                            this.item[c == 'out' ? 'over' : 'out'].call(this.item, e);
                            return false;
                        });
                    });
                }
                
                this[c] = 1; this[c == 'out' ? 'over' : 'out'] = 0;
                this.item[c].call(this.item, e);
                
            });
            
        }
    };
    
/*
 * Droppable Extensions
 */
    
    $.ui.plugin.add("droppable", "activeClass", {
        activate: function(e, ui) {
            $(this).addClass(ui.options.activeClass);
        },
        deactivate: function(e, ui) {
            $(this).removeClass(ui.options.activeClass);
        },
        drop: function(e, ui) {
            $(this).removeClass(ui.options.activeClass);
        }
    });
    
    $.ui.plugin.add("droppable", "hoverClass", {
        over: function(e, ui) {
            $(this).addClass(ui.options.hoverClass);
        },
        out: function(e, ui) {
            $(this).removeClass(ui.options.hoverClass);
        },
        drop: function(e, ui) {
            $(this).removeClass(ui.options.hoverClass);
        }
    });
    
})(jQuery);
/*
 * jQuery UI Resizable
 *
 * Copyright (c) 2008 Paul Bakaus
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 * 
 * http://docs.jquery.com/UI/Resizables
 *
 * Depends:
 *   ui.base.js
 *
 * Revision: $Id: ui.resizable.js 5205 2008-04-06 16:12:50Z braeker $
 */
;(function($) {
    
    $.fn.extend({
        resizable: function(options, data) {
            var args = Array.prototype.slice.call(arguments, 1);
            
            return this.each(function() {
                if (typeof options == "string") {
                    var resize = $.data(this, "resizable");
                    if (resize) resize[options].apply(resize, args);
    
                } else if(!$(this).is(".ui-resizable"))
                    new $.ui.resizable(this, options);
            });
        }
    });

    $.ui.resizable = function(element, options) {
        //Initialize needed constants
        var self = this;
        
        this.element = $(element);
        
        $.data(element, "resizable", this);
        
        // simulate .ui-resizable { position: relative; }
        var elpos = this.element.css('position');
        this.element.addClass("ui-resizable").css({ position: /static/.test(elpos) ? 'relative' : elpos });
        
        //Prepare the passed options
        this.options = $.extend({
            preventDefault: true,
            transparent: false,
            minWidth: 10,
            minHeight: 10,
            aspectRatio: false,
            disableSelection: true,
            preserveCursor: true,
            autohide: false,
            knobHandles: false
        }, options);
        
        this.options._aspectRatio = !!(this.options.aspectRatio);
        
        // force proxy if helper is enabled
        this.options.proxy = this.options.proxy || this.options.ghost ? 'proxy' : null; 
        
        // force proxy if animation is enabled
        this.options.proxy = this.options.proxy || this.options.animate ? 'proxy' : null; 
        
        // if knobHandles equals true set to ui-resizable-knob-handle
        this.options.knobHandles = this.options.knobHandles === true ? 'ui-resizable-knob-handle' : this.options.knobHandles;
        
        $(element).bind("setData.resizable", function(event, key, value){
            self.options[key] = value;
        }).bind("getData.resizable", function(event, key){
            return self.options[key];
        });
    
        var o = this.options;
    
        //Default Theme
        var aBorder = '1px solid #DEDEDE';
    
        o.defaultTheme = {
            'ui-resizable': { display: 'block' },
            'ui-resizable-handle': { position: 'absolute', background: '#F2F2F2', fontSize: '0.1px' },
            'ui-resizable-n': { cursor: 'n-resize', height: '4px', left: '0px', right: '0px', borderTop: aBorder },
            'ui-resizable-s': { cursor: 's-resize', height: '4px', left: '0px', right: '0px', borderBottom: aBorder },
            'ui-resizable-e': { cursor: 'e-resize', width: '4px', top: '0px', bottom: '0px', borderRight: aBorder },
            'ui-resizable-w': { cursor: 'w-resize', width: '4px', top: '0px', bottom: '0px', borderLeft: aBorder },
            'ui-resizable-se': { cursor: 'se-resize', width: '4px', height: '4px', borderRight: aBorder, borderBottom: aBorder },
            'ui-resizable-sw': { cursor: 'sw-resize', width: '4px', height: '4px', borderBottom: aBorder, borderLeft: aBorder },
            'ui-resizable-ne': { cursor: 'ne-resize', width: '4px', height: '4px', borderRight: aBorder, borderTop: aBorder },
            'ui-resizable-nw': { cursor: 'nw-resize', width: '4px', height: '4px', borderLeft: aBorder, borderTop: aBorder }
        };
        
        o.knobTheme = {
            'ui-resizable-handle': { background: '#F2F2F2', border: '1px solid #808080', height: '8px', width: '8px' },
            'ui-resizable-n': { cursor: 'n-resize', top: '-4px', left: '45%' },
            'ui-resizable-s': { cursor: 's-resize', bottom: '-4px', left: '45%' },
            'ui-resizable-e': { cursor: 'e-resize', right: '-4px', top: '45%' },
            'ui-resizable-w': { cursor: 'w-resize', left: '-4px', top: '45%' },
            'ui-resizable-se': { cursor: 'se-resize', right: '-4px', bottom: '-4px' },
            'ui-resizable-sw': { cursor: 'sw-resize', left: '-4px', bottom: '-4px' },
            'ui-resizable-nw': { cursor: 'nw-resize', left: '-4px', top: '-4px' },
            'ui-resizable-ne': { cursor: 'ne-resize', right: '-4px', top: '-4px' }
        };
    
        //Position the node
        if(!o.proxy && (this.element.css('position') == 'static' || this.element.css('position') === ''))
            this.element.css('position', 'relative');
    
        o._nodeName = element.nodeName;
    
        //Wrap the element if it cannot hold child nodes
        if(o._nodeName.match(/textarea|input|select|button|img/i)) {
            var el = this.element;
            
            //Opera fixing relative position
            if (/relative/.test(el.css('position')) && $.browser.opera)
                el.css({ position: 'relative', top: 'auto', left: 'auto' });
            
            //Create a wrapper element and set the wrapper to the new current internal element
            el.wrap(
                $('<div class="ui-wrapper"    style="overflow: hidden;"></div>').css( {
                    position: el.css('position'),
                    width: el.outerWidth(),
                    height: el.outerHeight(),
                    top: el.css('top'),
                    left: el.css('left')
                })
            );
            
            var oel = this.element; element = element.parentNode; this.element = $(element);
    
            //Move margins to the wrapper
            this.element.css({ marginLeft: oel.css("marginLeft"), marginTop: oel.css("marginTop"),
                marginRight: oel.css("marginRight"), marginBottom: oel.css("marginBottom")
            });
    
            oel.css({ marginLeft: 0, marginTop: 0, marginRight: 0, marginBottom: 0});
    
            //Prevent Safari textarea resize
            if ($.browser.safari && o.preventDefault) oel.css('resize', 'none');
    
            o.proportionallyResize = oel.css({ position: 'static', zoom: 1, display: 'block' });
            
            // avoid IE jump
            this.element.css({ margin: oel.css('margin') });
            
            // fix handlers offset
            this._proportionallyResize();
        }
    
        if(!o.handles) o.handles = !$('.ui-resizable-handle', element).length ? "e,s,se" : { n: '.ui-resizable-n', e: '.ui-resizable-e', s: '.ui-resizable-s', w: '.ui-resizable-w', se: '.ui-resizable-se', sw: '.ui-resizable-sw', ne: '.ui-resizable-ne', nw: '.ui-resizable-nw' };
        if(o.handles.constructor == String) {
    
            if(o.handles == 'all') o.handles = 'n,e,s,w,se,sw,ne,nw';
    
            var n = o.handles.split(","); o.handles = {};
    
            o.zIndex = o.zIndex || 1000;
            
            // insertions are applied when don't have theme loaded
            var insertionsDefault = {
                handle: 'position: absolute; display: none; overflow:hidden;',
                n: 'top: 0pt; width:100%;',
                e: 'right: 0pt; height:100%;',
                s: 'bottom: 0pt; width:100%;',
                w: 'left: 0pt; height:100%;',
                se: 'bottom: 0pt; right: 0px;',
                sw: 'bottom: 0pt; left: 0px;',
                ne: 'top: 0pt; right: 0px;',
                nw: 'top: 0pt; left: 0px;'
            };
    
            for(var i = 0; i < n.length; i++) {
                var handle = jQuery.trim(n[i]), dt = o.defaultTheme, hname = 'ui-resizable-'+handle, loadDefault = !$.ui.css(hname) && !o.knobHandles, userKnobClass = $.ui.css('ui-resizable-knob-handle'), 
                            allDefTheme = $.extend(dt[hname], dt['ui-resizable-handle']), allKnobTheme = $.extend(o.knobTheme[hname], !userKnobClass ? o.knobTheme['ui-resizable-handle'] : {});
                
                // increase zIndex of sw, se, ne, nw axis
                var applyZIndex = /sw|se|ne|nw/.test(handle) ? { zIndex: ++o.zIndex } : {};
                
                var defCss = (loadDefault ? insertionsDefault[handle] : ''), 
                    axis = $(['<div class="ui-resizable-handle ', hname, '" style="', defCss, insertionsDefault.handle, '"></div>'].join('')).css( applyZIndex );
                o.handles[handle] = '.ui-resizable-'+handle;
                
                this.element.append(
                    //Theme detection, if not loaded, load o.defaultTheme
                    axis.css( loadDefault ? allDefTheme : {} )
                        // Load the knobHandle css, fix width, height, top, left...
                        .css( o.knobHandles ? allKnobTheme : {} ).addClass(o.knobHandles ? 'ui-resizable-knob-handle' : '').addClass(o.knobHandles)
                );
            }
            
            if (o.knobHandles) this.element.addClass('ui-resizable-knob').css( !$.ui.css('ui-resizable-knob') ? { /*border: '1px #fff dashed'*/ } : {} );
        }
    
        this._renderAxis = function(target) {
            target = target || this.element;
    
            for(var i in o.handles) {
                if(o.handles[i].constructor == String) 
                    o.handles[i] = $(o.handles[i], element).show();
    
                if (o.transparent)
                    o.handles[i].css({opacity:0});
    
                //Apply pad to wrapper element, needed to fix axis position (textarea, inputs, scrolls)
                if (this.element.is('.ui-wrapper') && 
                    o._nodeName.match(/textarea|input|select|button/i)) {
    
                    var axis = $(o.handles[i], element), padWrapper = 0;
    
                    //Checking the correct pad and border
                    padWrapper = /sw|ne|nw|se|n|s/.test(i) ? axis.outerHeight() : axis.outerWidth();
    
                    //The padding type i have to apply...
                    var padPos = [ 'padding', 
                        /ne|nw|n/.test(i) ? 'Top' :
                        /se|sw|s/.test(i) ? 'Bottom' : 
                        /^e$/.test(i) ? 'Right' : 'Left' ].join(""); 
    
                    if (!o.transparent)
                        target.css(padPos, padWrapper);
    
                    this._proportionallyResize();
                }
                if(!$(o.handles[i]).length) continue;
            }
        };
            
        this._renderAxis(this.element);
        o._handles = $('.ui-resizable-handle', self.element);
        
        if (o.disableSelection)
            o._handles.each(function(i, e) { $.ui.disableSelection(e); });
        
        //Matching axis name
        o._handles.mouseover(function() {
            if (!o.resizing) {
                if (this.className) 
                    var axis = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i);
                //Axis, default = se
                self.axis = o.axis = axis && axis[1] ? axis[1] : 'se';
            }
        });
                
        //If we want to auto hide the elements
        if (o.autohide) {
            o._handles.hide();
            $(self.element).addClass("ui-resizable-autohide").hover(function() {
                $(this).removeClass("ui-resizable-autohide");
                o._handles.show();
            },
            function(){
                if (!o.resizing) {
                    $(this).addClass("ui-resizable-autohide");
                    o._handles.hide();
                }
            });
        }
    
        //Initialize mouse events for interaction
        this.element.mouseInteraction({
            executor: this,
            delay: 0,
            distance: 0,
            dragPrevention: ['input','textarea','button','select','option'],
            start: this.start,
            stop: this.stop,
            drag: this.drag,
            condition: function(e) {
                if(this.disabled) return false;
                for(var i in this.options.handles) {
                    if($(this.options.handles[i])[0] == e.target) return true;
                }
                return false;
            }
        });
    };

    $.extend($.ui.resizable.prototype, {
        plugins: {},
        ui: function() {
            return {
                instance: this,
                axis: this.options.axis,
                options: this.options
            };
        },
        _renderProxy: function() {
            var el = this.element, o = this.options;
            this.elementOffset = el.offset();
    
            if(o.proxy) {
                this.helper = this.helper || $('<div style="overflow:hidden;"></div>');
    
                // fix ie6 offset
                var ie6 = $.browser.msie && $.browser.version  < 7, ie6offset = (ie6 ? 1 : 0),
                pxyoffset = ( ie6 ? 2 : -1 );
    
                this.helper.addClass(o.proxy).css({
                    width: el.outerWidth() + pxyoffset,
                    height: el.outerHeight() + pxyoffset,
                    position: 'absolute',
                    left: this.elementOffset.left - ie6offset +'px',
                    top: this.elementOffset.top - ie6offset +'px',
                    zIndex: ++o.zIndex
                });
                
                this.helper.appendTo("body");
    
                if (o.disableSelection)
                    $.ui.disableSelection(this.helper.get(0));
    
            } else {
                this.helper = el; 
            }
        },
        propagate: function(n,e) {
            $.ui.plugin.call(this, n, [e, this.ui()]);
            this.element.triggerHandler(n == "resize" ? n : ["resize", n].join(""), [e, this.ui()], this.options[n]);
        },
        destroy: function() {
            var el = this.element, wrapped = el.children(".ui-resizable").get(0),
            
            _destroy = function(exp) {
                $(exp).removeClass("ui-resizable ui-resizable-disabled")
                    .removeMouseInteraction().removeData("resizable").unbind(".resizable").find('.ui-resizable-handle').remove();
            };
            
            _destroy(el);
            
            if (el.is('.ui-wrapper') && wrapped) {
                  el.parent().append(
                    $(wrapped).css({
                      position: el.css('position'),
                      width: el.outerWidth(),
                      height: el.outerHeight(),
                      top: el.css('top'),
                      left: el.css('left')
                  })
                ).end().remove();
                
                _destroy(wrapped);
              }
        },
        enable: function() {
            this.element.removeClass("ui-resizable-disabled");
            this.disabled = false;
        },
        disable: function() {
            this.element.addClass("ui-resizable-disabled");
            this.disabled = true;
        },
        start: function(e) {
            var o = this.options, iniPos = this.element.position(), el = this.element, 
                num = function(v) { return parseInt(v, 10) || 0; }, ie6 = $.browser.msie && $.browser.version < 7;
            o.resizing = true;
            o.documentScroll = { top: $(document).scrollTop(), left: $(document).scrollLeft() };
    
            // bugfix #1749
            if (el.is('.ui-draggable') || (/absolute/).test(el.css('position'))) {
                
                // sOffset decides if document scrollOffset will be added to the top/left of the resizable element
                var sOffset = $.browser.msie && !o.containment && (/absolute/).test(el.css('position')) && !(/relative/).test(el.parent().css('position'));
                var dscrollt = sOffset ? o.documentScroll.top : 0, dscrolll = sOffset ? o.documentScroll.left : 0;
                
                el.css({ position: 'absolute', top: (iniPos.top + dscrollt), left: (iniPos.left + dscrolll) });
            }
            
            //Opera fixing relative position
            if (/relative/.test(el.css('position')) && $.browser.opera)
                el.css({ position: 'relative', top: 'auto', left: 'auto' });
    
            this._renderProxy();
    
            var curleft = num(this.helper.css('left')), curtop = num(this.helper.css('top'));
            
            //Store needed variables
            this.offset = this.helper.offset();
            this.position = { left: curleft, top: curtop };
            this.size = o.proxy || ie6 ? { width: el.outerWidth(), height: el.outerHeight() } : { width: el.width(), height: el.height() };
            this.originalSize = o.proxy || ie6 ? { width: el.outerWidth(), height: el.outerHeight() } : { width: el.width(), height: el.height() };
            this.originalPosition = { left: curleft, top: curtop };
            this.sizeDiff = { width: el.outerWidth() - el.width(), height: el.outerHeight() - el.height() };
            this.originalMousePosition = { left: e.pageX, top: e.pageY };
            
            //Aspect Ratio
            o.aspectRatio = (typeof o.aspectRatio == 'number') ? o.aspectRatio : ((this.originalSize.height / this.originalSize.width)||1);
    
            if (o.preserveCursor)
                $('body').css('cursor', this.axis + '-resize');
                
            this.propagate("start", e);     
            return false;
        },
        stop: function(e) {
            this.options.resizing = false;
            var o = this.options, num = function(v) { return parseInt(v, 10) || 0; }, self = this;
    
            if(o.proxy) {
                var pr = o.proportionallyResize, ista = pr && /textarea/i.test(pr.get(0).nodeName), 
                            soffseth = ista && $.ui.hasScroll(pr.get(0), 'left') /* TODO - jump height */ ? 0 : self.sizeDiff.height,
                                soffsetw = ista ? 0 : self.sizeDiff.width;
            
                var style = { width: (self.size.width - soffsetw), height: (self.size.height - soffseth) },
                        left = parseInt(self.element.css('left'), 10) + (self.position.left - self.originalPosition.left), 
                            top = parseInt(self.element.css('top'), 10) + (self.position.top - self.originalPosition.top);
                
                if (!o.animate)
                    this.element.css($.extend(style, { top: top, left: left }));
                
                if (o.proxy && !o.animate) this._proportionallyResize();
                this.helper.remove();
            }

            if (o.preserveCursor)
            $('body').css('cursor', 'auto');
    
            this.propagate("stop", e);    
            return false;
        },
        drag: function(e) {
            //Increase performance, avoid regex
            var el = this.helper, o = this.options, props = {},
                self = this, smp = this.originalMousePosition, a = this.axis;

            var dx = (e.pageX-smp.left)||0, dy = (e.pageY-smp.top)||0;
            var trigger = this.change[a];
            if (!trigger) return false;
         
            // Calculate the attrs that will be change
            var data = trigger.apply(this, [e, dx, dy]), ie6 = $.browser.msie && $.browser.version < 7, csdif = this.sizeDiff;
         
            if (o._aspectRatio || e.shiftKey)
                data = this._updateRatio(data, e);
            
            data = this._respectSize(data, e);
            
            this.propagate("resize", e);
            
            el.css({
                top: this.position.top + "px", left: this.position.left + "px", 
                width: this.size.width + "px", height: this.size.height + "px"
            });
            
            if (!o.proxy && o.proportionallyResize)
                this._proportionallyResize();
            
            this._updateCache(data);
            
            return false;
        },
        
        _updateCache: function(data) {
            var o = this.options;
            this.offset = this.helper.offset();
            if (data.left) this.position.left = data.left;
            if (data.top) this.position.top = data.top;
            if (data.height) this.size.height = data.height;
            if (data.width) this.size.width = data.width;
        },
        
        _updateRatio: function(data, e) {
            var o = this.options, cpos = this.position, csize = this.size, a = this.axis;
            
            if (data.height) data.width = Math.round(csize.height / o.aspectRatio);
            else if (data.width) data.height = Math.round(csize.width * o.aspectRatio);
            
            if (a == 'sw') {
                data.left = cpos.left + (csize.width - data.width);
                data.top = null;
            }
            if (a == 'nw') { 
                data.top = cpos.top + (csize.height - data.height);
                data.left = cpos.left + (csize.width - data.width);
            }
            
            return data;
        },
        
        _respectSize: function(data, e) {
            
            var el = this.helper, o = this.options, pRatio = o._aspectRatio || e.shiftKey,  a = this.axis, 
                    ismaxw = data.width && o.maxWidth && o.maxWidth < data.width, ismaxh = data.height && o.maxHeight && o.maxHeight < data.height,
                        isminw = data.width && o.minWidth && o.minWidth > data.width, isminh = data.height && o.minHeight && o.minHeight > data.height;
            
            if (isminw) data.width = o.minWidth;
            if (isminh) data.height = o.minHeight;
            if (ismaxw) data.width = o.maxWidth;
            if (ismaxh) data.height = o.maxHeight;
            
            var dw = this.originalPosition.left + this.originalSize.width, dh = this.position.top + this.size.height;
            var cw = /sw|nw|w/.test(a), ch = /nw|ne|n/.test(a);
            
            if (isminw && cw) data.left = dw - o.minWidth;
            if (ismaxw && cw) data.left = dw - o.maxWidth;
            if (isminh && ch)    data.top = dh - o.minHeight;
            if (ismaxh && ch)    data.top = dh - o.maxHeight;
            
            // fixing jump error on top/left - bug #2330
            var isNotwh = !data.width && !data.height;
            if (isNotwh && !data.left && data.top) data.top = null;
            else if (isNotwh && !data.top && data.left) data.left = null;
            
            return data;
        },
        
        _proportionallyResize: function() {
            var o = this.options;
            if (!o.proportionallyResize) return;
            var prel = o.proportionallyResize, el = this.helper || this.element;
         
            if (!o.borderDif) {
                var b = [prel.css('borderTopWidth'), prel.css('borderRightWidth'), prel.css('borderBottomWidth'), prel.css('borderLeftWidth')],
                    p = [prel.css('paddingTop'), prel.css('paddingRight'), prel.css('paddingBottom'), prel.css('paddingLeft')];
                 
                o.borderDif = $.map(b, function(v, i) {
                    var border = parseInt(v,10)||0, padding = parseInt(p[i],10)||0;
                    return border + padding; 
                });
            }
            prel.css({
                height: (el.height() - o.borderDif[0] - o.borderDif[2]) + "px",
                width: (el.width() - o.borderDif[1] - o.borderDif[3]) + "px"
            });
        },
        
        change: {
            e: function(e, dx, dy) {
                return { width: this.originalSize.width + dx };
            },
            w: function(e, dx, dy) {
                var o = this.options, cs = this.originalSize, sp = this.originalPosition;
                return { left: sp.left + dx, width: cs.width - dx };
            },
            n: function(e, dx, dy) {
                var o = this.options, cs = this.originalSize, sp = this.originalPosition;
                return { top: sp.top + dy, height: cs.height - dy };
            },
            s: function(e, dx, dy) {
                return { height: this.originalSize.height + dy };
            },
            se: function(e, dx, dy) {
                return $.extend(this.change.s.apply(this, arguments), this.change.e.apply(this, [e, dx, dy]));
            },
            sw: function(e, dx, dy) {
                return $.extend(this.change.s.apply(this, arguments), this.change.w.apply(this, [e, dx, dy]));
            },
            ne: function(e, dx, dy) {
                return $.extend(this.change.n.apply(this, arguments), this.change.e.apply(this, [e, dx, dy]));
            },
            nw: function(e, dx, dy) {
                return $.extend(this.change.n.apply(this, arguments), this.change.w.apply(this, [e, dx, dy]));
            }
        }
    });

/*
 * Resizable Extensions
 */

    $.ui.plugin.add("resizable", "containment", {
        
        start: function(e, ui) {
            var o = ui.options, self = ui.instance, el = self.element;
            var oc = o.containment,    ce = (oc instanceof jQuery) ? oc.get(0) : (/parent/.test(oc)) ? el.parent().get(0) : oc;
            if (!ce) return;
            
            if (/document/.test(oc) || oc == document) {
                self.containerOffset = { left: 0, top: 0 };

                self.parentData = { 
                    element: $(document), left: 0, top: 0, width: $(document).width(),
                    height: $(document).height() || document.body.parentNode.scrollHeight
                };
            }
            
            // i'm a node, so compute top, left, right, bottom
            else{
                self.containerOffset = $(ce).offset(), self.containerSize = { height: $(ce).innerHeight(), width: $(ce).innerWidth() };
            
                var co = self.containerOffset, ch = self.containerSize.height,    cw = self.containerSize.width, 
                            width = ($.ui.hasScroll(ce, "left") ? ce.scrollWidth : cw ), height = ($.ui.hasScroll(ce) ? ce.scrollHeight : ch);
            
                self.parentData = { 
                    element: ce, left: co.left, top: co.top, width: width, height: height
                };
            }
        },
        
        resize: function(e, ui) {
            var o = ui.options, self = ui.instance, ps = self.containerSize, 
                        co = self.containerOffset, cs = self.size, cp = self.position,
                            pRatio = o._aspectRatio || e.shiftKey;
            
            if (cp.left < (o.proxy ? co.left : 0)) {
                self.size.width = self.size.width + (o.proxy ? (self.position.left - co.left) : self.position.left);
                if (pRatio) self.size.height = self.size.width * o.aspectRatio;
                self.position.left = o.proxy ? co.left : 0;
            }
            
            if (cp.top < (o.proxy ? co.top : 0)) {
                self.size.height = self.size.height + (o.proxy ? (self.position.top - co.top) : self.position.top);
                if (pRatio) self.size.width = self.size.height / o.aspectRatio;
                self.position.top = o.proxy ? co.top : 0;
            }
            
            var woset = (o.proxy ? self.offset.left - co.left : self.position.left) + self.sizeDiff.width, 
                        hoset = (o.proxy ? self.offset.top - co.top : self.position.top) + self.sizeDiff.height;
            
            if (woset + self.size.width >= self.parentData.width) {
                self.size.width = self.parentData.width - woset;
                if (pRatio) self.size.height = self.size.width * o.aspectRatio;
            }
            
            if (hoset + self.size.height >= self.parentData.height) {
                self.size.height = self.parentData.height - hoset;
                if (pRatio) self.size.width = self.size.height / o.aspectRatio;
            }
        }
    });
    
    $.ui.plugin.add("resizable", "grid", {
        
        resize: function(e, ui) {
            var o = ui.options, self =  ui.instance, cs = self.size, os = self.originalSize, op = self.originalPosition, a = self.axis, ratio = o._aspectRatio || e.shiftKey;
            o.grid = typeof o.grid == "number" ? [o.grid, o.grid] : o.grid;
            var ox = Math.round((cs.width - os.width) / o.grid[0]) * o.grid[0], oy = Math.round((cs.height - os.height) / o.grid[1]) * o.grid[1];
            
            if (/^(se|s|e)$/.test(a)) {
                self.size.width = os.width + ox;
                self.size.height = os.height + oy;
            }
            else if (/^(ne)$/.test(a)) {
                self.size.width = os.width + ox;
                self.size.height = os.height + oy;
                self.position.top = op.top - oy;
            }
            else if (/^(sw)$/.test(a)) {
                self.size.width = os.width + ox;
                self.size.height = os.height + oy;
                self.position.left = op.left - ox;
            }
            else {
                self.size.width = os.width + ox;
                self.size.height = os.height + oy;
                self.position.top = op.top - oy;
                self.position.left = op.left - ox;
            }
        }
        
    });
    
    $.ui.plugin.add("resizable", "animate", {
        
        stop: function(e, ui) {
            var o = ui.options, self =  ui.instance;

            var pr = o.proportionallyResize, ista = pr && /textarea/i.test(pr.get(0).nodeName), 
                            soffseth = ista && $.ui.hasScroll(pr.get(0), 'left') /* TODO - jump height */ ? 0 : self.sizeDiff.height,
                                soffsetw = ista ? 0 : self.sizeDiff.width;
            
            var style = { width: (self.size.width - soffsetw), height: (self.size.height - soffseth) },
                        left = parseInt(self.element.css('left'), 10) + (self.position.left - self.originalPosition.left), 
                            top = parseInt(self.element.css('top'), 10) + (self.position.top - self.originalPosition.top); 
            
            self.element.animate(
                $.extend(style, { top: top, left: left }),
                { 
                    duration: o.animateDuration || "slow", 
                    easing: o.animateEasing || "swing", 
                    step: function() {
                        if (pr) pr.css({ width: self.element.css('width'), height: self.element.css('height') });
                    }
                }
            );
        }
        
    });
    
    $.ui.plugin.add("resizable", "ghost", {
        
        start: function(e, ui) {
            var o = ui.options, self =  ui.instance, pr = o.proportionallyResize, cs = self.size;
            
            if (!pr) self.ghost = self.element.clone();
            else self.ghost = pr.clone();
            
            self.ghost.css(
                { opacity: .25, display: 'block', position: 'relative', height: cs.height, width: cs.width, margin: 0, left: 0, top: 0 }
            )
            .addClass('ui-resizable-ghost').addClass(typeof o.ghost == 'string' ? o.ghost : '');
            
            self.ghost.appendTo(self.helper);
            
        },
        
        resize: function(e, ui){
            var o = ui.options, self =  ui.instance, pr = o.proportionallyResize;
            
            if (self.ghost) self.ghost.css({ position: 'relative', height: self.size.height, width: self.size.width });
            
        },
        
        stop: function(e, ui){
            var o = ui.options, self =  ui.instance, pr = o.proportionallyResize;
            if (self.ghost && self.helper) self.helper.get(0).removeChild(self.ghost.get(0));
        }
        
    });

})(jQuery);
/*
 * jQuery UI Selectable
 *
 * Copyright (c) 2008 Richard D. Worth (rdworth.org)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 * 
 * http://docs.jquery.com/UI/Selectables
 *
 * Depends:
 *   ui.base.js
 *
 * Revision: $Id: ui.selectable.js 5204 2008-04-06 14:32:58Z braeker $
 */
;(function($) {

    $.fn.extend({
        selectable: function(options) {
            var args = Array.prototype.slice.call(arguments, 1); 
            
            return this.each(function() {
                if (typeof options == "string") {
                    var select = $.data(this, "selectable");
                    if (select) select[options].apply(select, args);

                } else if(!$.data(this, "selectable"))
                    new $.ui.selectable(this, options);
            });
        }
    });

    $.ui.selectable = function(element, options) {
        var instance = this;
        
        this.element = $(element);
        
        $.data(element, "selectable", this); 
        this.element.addClass("ui-selectable");
        
        this.options = $.extend({
            appendTo: 'body',
            autoRefresh: true,
            filter: '*',
            tolerance: 'touch'
        }, options);
        
        $(element).bind("setData.selectable", function(event, key, value){
            instance.options[key] = value;
        }).bind("getData.selectable", function(event, key){
            return instance.options[key];
        });
        
        this.dragged = false;

        // cache selectee children based on filter
        var selectees;
        this.refresh = function() {
            selectees = $(instance.options.filter, instance.element[0]);
            selectees.each(function() {
                var $this = $(this);
                var pos = $this.offset();
                $.data(this, "selectable-item", {
                    element: this,
                    $element: $this,
                    left: pos.left,
                    top: pos.top,
                    right: pos.left + $this.width(),
                    bottom: pos.top + $this.height(),
                    startselected: false,
                    selected: $this.hasClass('ui-selected'),
                    selecting: $this.hasClass('ui-selecting'),
                    unselecting: $this.hasClass('ui-unselecting')
                });
            });
        };
        this.refresh();

        this.selectees = selectees.addClass("ui-selectee");

        //Initialize mouse interaction
        this.element.mouseInteraction({
            executor: this,
            appendTo: 'body',
            delay: 0,
            distance: 0,
            dragPrevention: ['input','textarea','button','select','option'],
            start: this.start,
            stop: this.stop,
            drag: this.drag,
            condition: function(e) {
                var isSelectee = false;
                $(e.target).parents().andSelf().each(function() {
                    if($.data(this, "selectable-item")) isSelectee = true;
                });
                return this.options.keyboard ? !isSelectee : true;
            }
        });
        
        this.helper = $(document.createElement('div')).css({border:'1px dotted black'});
    };

    $.extend($.ui.selectable.prototype, {
        toggle: function() {
            if(this.disabled){
                this.enable();
            } else {
                this.disable();
            }
        },
        destroy: function() {
            this.element
                .removeClass("ui-selectable ui-selectable-disabled")
                .removeData("selectable")
                .unbind(".selectable")
                .removeMouseInteraction();
        },
        enable: function() {
            this.element.removeClass("ui-selectable-disabled");
            this.disabled = false;
        },
        disable: function() {
            this.element.addClass("ui-selectable-disabled");
            this.disabled = true;
        },
        start: function(ev, element) {
            
            this.opos = [ev.pageX, ev.pageY];
            
            if (this.disabled)
                return;

            var options = this.options;

            this.selectees = $(options.filter, element);

            // selectable START callback
            this.element.triggerHandler("selectablestart", [ev, {
                "selectable": element,
                "options": options
            }], options.start);

            $('body').append(this.helper);
            // position helper (lasso)
            this.helper.css({
                "z-index": 100,
                "position": "absolute",
                "left": ev.clientX,
                "top": ev.clientY,
                "width": 0,
                "height": 0
            });

            if (options.autoRefresh) {
                this.refresh();
            }

            this.selectees.filter('.ui-selected').each(function() {
                var selectee = $.data(this, "selectable-item");
                selectee.startselected = true;
                if (!ev.ctrlKey) {
                    selectee.$element.removeClass('ui-selected');
                    selectee.selected = false;
                    selectee.$element.addClass('ui-unselecting');
                    selectee.unselecting = true;
                    // selectable UNSELECTING callback
                    $(this.element).triggerHandler("selectableunselecting", [ev, {
                        selectable: element,
                        unselecting: selectee.element,
                        options: options
                    }], options.unselecting);
                }
            });
        },
        drag: function(ev, element) {
            this.dragged = true;
            
            if (this.disabled)
                return;

            var options = this.options;

            var x1 = this.opos[0], y1 = this.opos[1], x2 = ev.pageX, y2 = ev.pageY;
            if (x1 > x2) { var tmp = x2; x2 = x1; x1 = tmp; }
            if (y1 > y2) { var tmp = y2; y2 = y1; y1 = tmp; }
            this.helper.css({left: x1, top: y1, width: x2-x1, height: y2-y1});

            this.selectees.each(function() {
                var selectee = $.data(this, "selectable-item");
                //prevent helper from being selected if appendTo: selectable
                if (!selectee || selectee.element == element)
                    return;
                var hit = false;
                if (options.tolerance == 'touch') {
                    hit = ( !(selectee.left > x2 || selectee.right < x1 || selectee.top > y2 || selectee.bottom < y1) );
                } else if (options.tolerance == 'fit') {
                    hit = (selectee.left > x1 && selectee.right < x2 && selectee.top > y1 && selectee.bottom < y2);
                }

                if (hit) {
                    // SELECT
                    if (selectee.selected) {
                        selectee.$element.removeClass('ui-selected');
                        selectee.selected = false;
                    }
                    if (selectee.unselecting) {
                        selectee.$element.removeClass('ui-unselecting');
                        selectee.unselecting = false;
                    }
                    if (!selectee.selecting) {
                        selectee.$element.addClass('ui-selecting');
                        selectee.selecting = true;
                        // selectable SELECTING callback
                        $(this.element).triggerHandler("selectableselecting", [ev, {
                            selectable: element,
                            selecting: selectee.element,
                            options: options
                        }], options.selecting);
                    }
                } else {
                    // UNSELECT
                    if (selectee.selecting) {
                        if (ev.ctrlKey && selectee.startselected) {
                            selectee.$element.removeClass('ui-selecting');
                            selectee.selecting = false;
                            selectee.$element.addClass('ui-selected');
                            selectee.selected = true;
                        } else {
                            selectee.$element.removeClass('ui-selecting');
                            selectee.selecting = false;
                            if (selectee.startselected) {
                                selectee.$element.addClass('ui-unselecting');
                                selectee.unselecting = true;
                            }
                            // selectable UNSELECTING callback
                            $(this.element).triggerHandler("selectableunselecting", [ev, {
                                selectable: element,
                                unselecting: selectee.element,
                                options: options
                            }], options.unselecting);
                        }
                    }
                    if (selectee.selected) {
                        if (!ev.ctrlKey && !selectee.startselected) {
                            selectee.$element.removeClass('ui-selected');
                            selectee.selected = false;

                            selectee.$element.addClass('ui-unselecting');
                            selectee.unselecting = true;
                            // selectable UNSELECTING callback
                            $(this.element).triggerHandler("selectableunselecting", [ev, {
                                selectable: element,
                                unselecting: selectee.element,
                                options: options
                            }], options.unselecting);
                        }
                    }
                }
            });
        },
        stop: function(ev, element) {
            this.dragged = false;
            
            var options = this.options;

            $('.ui-unselecting', this.element).each(function() {
                var selectee = $.data(this, "selectable-item");
                selectee.$element.removeClass('ui-unselecting');
                selectee.unselecting = false;
                selectee.startselected = false;
                $(this.element).triggerHandler("selectableunselected", [ev, {
                    selectable: element,
                    unselected: selectee.element,
                    options: options
                }], options.unselected);
            });
            $('.ui-selecting', this.element).each(function() {
                var selectee = $.data(this, "selectable-item");
                selectee.$element.removeClass('ui-selecting').addClass('ui-selected');
                selectee.selecting = false;
                selectee.selected = true;
                selectee.startselected = true;
                $(this.element).triggerHandler("selectableselected", [ev, {
                    selectable: element,
                    selected: selectee.element,
                    options: options
                }], options.selected);
            });
            $(this.element).triggerHandler("selectablestop", [ev, {
                selectable: element,
                options: this.options
            }], this.options.stop);
            
            this.helper.remove();
        }
    });
    
})(jQuery);
/*
 * jQuery UI Sortable
 *
 * Copyright (c) 2008 Paul Bakaus
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 * 
 * http://docs.jquery.com/UI/Sortables
 *
 * Depends:
 *   ui.base.js
 *
 * Revision: $Id: ui.sortable.js 5199 2008-04-04 14:04:32Z paul.bakaus $
 */
;(function($) {

    if (window.Node && Node.prototype && !Node.prototype.contains) {
        Node.prototype.contains = function (arg) {
            return !!(this.compareDocumentPosition(arg) & 16);
        };
    }

    $.fn.extend({
        sortable: function(options) {
            
            var args = Array.prototype.slice.call(arguments, 1);
            
            if (options == "serialize" || options == "toArray")
                return $.data(this[0], "sortable")[options](arguments[1]);
            
            return this.each(function() {
                if (typeof options == "string") {
                    var sort = $.data(this, "sortable");
                    if (sort) sort[options].apply(sort, args);

                } else if(!$.data(this, "sortable"))
                    new $.ui.sortable(this, options);
            });
        }
    });
    
    $.ui.sortable = function(element, options) {
        //Initialize needed constants
        var self = this;
        
        this.element = $(element);
        this.containerCache = {};
        
        $.data(element, "sortable", this);
        this.element.addClass("ui-sortable");

        //Prepare the passed options
        this.options = $.extend({}, options);
        var o = this.options;
        $.extend(o, {
            items: this.options.items || '> *',
            zIndex: this.options.zIndex || 1000,
            startCondition: function() {
                return !self.options.disabled;
            }
        });
        
        $(element).bind("setData.sortable", function(event, key, value){
            self.options[key] = value;
        }).bind("getData.sortable", function(event, key){
            return self.options[key];
        });
        
        //Get the items
        this.refresh();

        //Let's determine if the items are floating
        this.floating = this.items.length ? (/left|right/).test(this.items[0].item.css('float')) : false;
        
        //Let's determine the parent's offset
        if(!(/(relative|absolute|fixed)/).test(this.element.css('position'))) this.element.css('position', 'relative');
        this.offset = this.element.offset();

        //Initialize mouse events for interaction
        this.element.mouseInteraction({
            executor: this,
            delay: o.delay,
            distance: o.distance || 0,
            dragPrevention: o.prevention ? o.prevention.toLowerCase().split(',') : ['input','textarea','button','select','option'],
            start: this.start,
            stop: this.stop,
            drag: this.drag,
            condition: function(e) {

                if(this.options.disabled || this.options.type == 'static') return false;

                //Find out if the clicked node (or one of its parents) is a actual item in this.items
                var currentItem = null, nodes = $(e.target).parents().each(function() {    
                    if($.data(this, 'sortable-item')) {
                        currentItem = $(this);
                        return false;
                    }
                });
                if($.data(e.target, 'sortable-item')) currentItem = $(e.target);
                
                if(!currentItem) return false;    
                if(this.options.handle) {
                    var validHandle = false;
                    $(this.options.handle, currentItem).each(function() { if(this == e.target) validHandle = true; });
                    if(!validHandle) return false;
                }
                    
                this.currentItem = currentItem;
                return true;

            }
        });
        
        //Prepare cursorAt
        if(o.cursorAt && o.cursorAt.constructor == Array)
            o.cursorAt = { left: o.cursorAt[0], top: o.cursorAt[1] };
    };
    
    $.extend($.ui.sortable.prototype, {
        plugins: {},
        ui: function(inst) {
            return {
                helper: (inst || this)["helper"],
                placeholder: (inst || this)["placeholder"] || $([]),
                position: (inst || this)["position"].current,
                absolutePosition: (inst || this)["position"].absolute,
                instance: this,
                options: this.options,
                element: this.element,
                item: (inst || this)["currentItem"],
                sender: inst ? inst.element : null
            };        
        },
        propagate: function(n,e,inst) {
            $.ui.plugin.call(this, n, [e, this.ui(inst)]);
            this.element.triggerHandler(n == "sort" ? n : "sort"+n, [e, this.ui(inst)], this.options[n]);
        },
        serialize: function(o) {
            
            var items = $(this.options.items, this.element).not('.ui-sortable-helper'); //Only the items of the sortable itself
            var str = []; o = o || {};
            
            items.each(function() {
                var res = ($(this).attr(o.attribute || 'id') || '').match(o.expression || (/(.+)[-=_](.+)/));
                if(res) str.push((o.key || res[1])+'[]='+(o.key ? res[1] : res[2]));
            });
            
            return str.join('&');
            
        },
        toArray: function(attr) {
            var items = $(this.options.items, this.element).not('.ui-sortable-helper'); //Only the items of the sortable itself
            var ret = [];

            items.each(function() { ret.push($(this).attr(attr || 'id')); });
            return ret;
        },
        enable: function() {
            this.element.removeClass("ui-sortable-disabled");
            this.options.disabled = false;
        },
        disable: function() {
            this.element.addClass("ui-sortable-disabled");
            this.options.disabled = true;
        },
        /* Be careful with the following core functions */
        intersectsWith: function(item) {
            
            var x1 = this.position.absolute.left, x2 = x1 + this.helperProportions.width,
                y1 = this.position.absolute.top, y2 = y1 + this.helperProportions.height;
            var l = item.left, r = l + item.width, 
                t = item.top,  b = t + item.height;
            
            return (   l < x1 + (this.helperProportions.width  / 2)    // Right Half
                &&     x2 - (this.helperProportions.width  / 2) < r    // Left Half
                && t < y1 + (this.helperProportions.height / 2)        // Bottom Half
                &&     y2 - (this.helperProportions.height / 2) < b ); // Top Half
            
        },
        intersectsWithEdge: function(item) {    
            var x1 = this.position.absolute.left, x2 = x1 + this.helperProportions.width,
                y1 = this.position.absolute.top, y2 = y1 + this.helperProportions.height;
            var l = item.left, r = l + item.width, 
                t = item.top,  b = t + item.height;


            if (!(   l < x1 + (this.helperProportions.width  / 2)    // Right Half
                &&     x2 - (this.helperProportions.width  / 2) < r    // Left Half
                && t < y1 + (this.helperProportions.height / 2)        // Bottom Half
                &&     y2 - (this.helperProportions.height / 2) < b )) return false; // Top Half
            
            if(this.floating) {
                if(x2 > l && x1 < l) return 2; //Crosses left edge
                if(x1 < r && x2 > r) return 1; //Crosses right edge
            } else {
                if(y2 > t && y1 < t) return 1; //Crosses top edge
                if(y1 < b && y2 > b) return 2; //Crosses bottom edge
            }
            
            return false;
            
        },
        //This method checks approximately if the item is dragged in a container, but doesn't touch any items
        inEmptyZone: function(container) {

            if(!$(container.options.items, container.element).length) {
                return container.options.dropOnEmpty ? true : false;
            };

            var last = $(container.options.items, container.element).not('.ui-sortable-helper'); last = $(last[last.length-1]);
            var top = last.offset()[this.floating ? 'left' : 'top'] + last[0][this.floating ? 'offsetWidth' : 'offsetHeight'];
            return (this.position.absolute[this.floating ? 'left' : 'top'] > top);
        },
        refresh: function() {
            this.refreshItems();
            this.refreshPositions();
        },
        refreshItems: function() {
            
            this.items = [];
            this.containers = [this];
            var items = this.items;
            var queries = [$(this.options.items, this.element)];
            
            if(this.options.connectWith) {
                for (var i = this.options.connectWith.length - 1; i >= 0; i--){
                    var cur = $(this.options.connectWith[i]);
                    for (var j = cur.length - 1; j >= 0; j--){
                        var inst = $.data(cur[j], 'sortable');
                        if(inst && !inst.options.disabled) {
                            queries.push($(inst.options.items, inst.element));
                            this.containers.push(inst);
                        }
                    };
                };
            }

            for (var i = queries.length - 1; i >= 0; i--){
                queries[i].each(function() {
                    $.data(this, 'sortable-item', true); // Data for target checking (mouse manager)
                    items.push({
                        item: $(this),
                        width: 0, height: 0,
                        left: 0, top: 0
                    });
                });
            };

        },
        refreshPositions: function(fast) {
            for (var i = this.items.length - 1; i >= 0; i--){
                if(!fast) this.items[i].width             = this.items[i].item.outerWidth();
                if(!fast) this.items[i].height             = this.items[i].item.outerHeight();
                var p = this.items[i].item.offset();
                this.items[i].left                         = p.left;
                this.items[i].top                         = p.top;
            };
            for (var i = this.containers.length - 1; i >= 0; i--){
                var p =this.containers[i].element.offset();
                this.containers[i].containerCache.left     = p.left;
                this.containers[i].containerCache.top     = p.top;
                this.containers[i].containerCache.width    = this.containers[i].element.outerWidth();
                this.containers[i].containerCache.height= this.containers[i].element.outerHeight();
            };
        },
        destroy: function() {
            this.element
                .removeClass("ui-sortable ui-sortable-disabled")
                .removeData("sortable")
                .unbind(".sortable")
                .removeMouseInteraction();
            
            for ( var i = this.items.length - 1; i >= 0; i-- )
                this.items[i].item.removeData("sortable-item");
        },
        createPlaceholder: function(that) {
            (that || this).placeholderElement = this.options.placeholderElement ? $(this.options.placeholderElement, (that || this).currentItem) : (that || this).currentItem;
            (that || this).placeholder = $('<div></div>')
                .addClass(this.options.placeholder)
                .appendTo('body')
                .css({ position: 'absolute' })
                .css((that || this).placeholderElement.offset())
                .css({ width: (that || this).placeholderElement.outerWidth(), height: (that || this).placeholderElement.outerHeight() })
                ;
        },
        contactContainers: function(e) {
            for (var i = this.containers.length - 1; i >= 0; i--){

                if(this.intersectsWith(this.containers[i].containerCache)) {
                    if(!this.containers[i].containerCache.over) {
                        

                        if(this.currentContainer != this.containers[i]) {
                            
                            //When entering a new container, we will find the item with the least distance and append our item near it
                            var dist = 10000; var itemWithLeastDistance = null; var base = this.position.absolute[this.containers[i].floating ? 'left' : 'top'];
                            for (var j = this.items.length - 1; j >= 0; j--) {
                                if(!this.containers[i].element[0].contains(this.items[j].item[0])) continue;
                                var cur = this.items[j][this.containers[i].floating ? 'left' : 'top'];
                                if(Math.abs(cur - base) < dist) {
                                    dist = Math.abs(cur - base); itemWithLeastDistance = this.items[j];
                                }
                            }
                            
                            //We also need to exchange the placeholder
                            if(this.placeholder) this.placeholder.remove();
                            if(this.containers[i].options.placeholder) {
                                this.containers[i].createPlaceholder(this);
                            } else {
                                this.placeholder = null; this.placeholderElement = null;
                            }
                            
                            
                            itemWithLeastDistance ? this.rearrange(e, itemWithLeastDistance) : this.rearrange(e, null, this.containers[i].element);
                            this.propagate("change", e); //Call plugins and callbacks
                            this.containers[i].propagate("change", e, this); //Call plugins and callbacks
                            this.currentContainer = this.containers[i];

                        }
                        
                        this.containers[i].propagate("over", e, this);
                        this.containers[i].containerCache.over = 1;
                    }
                } else {
                    if(this.containers[i].containerCache.over) {
                        this.containers[i].propagate("out", e, this);
                        this.containers[i].containerCache.over = 0;
                    }
                }
                
            };            
        },
        start: function(e,el) {
            
            var o = this.options;
            this.refresh();

            //Create and append the visible helper
            this.helper = typeof o.helper == 'function' ? $(o.helper.apply(this.element[0], [e, this.currentItem])) : this.currentItem.clone();
            if(!this.helper.parents('body').length) this.helper.appendTo(o.appendTo || this.currentItem[0].parentNode); //Add the helper to the DOM if that didn't happen already
            this.helper.css({ position: 'absolute', clear: 'both' }).addClass('ui-sortable-helper'); //Position it absolutely and add a helper class
            
            //Prepare variables for position generation
            $.extend(this, {
                offsetParent: this.helper.offsetParent(),
                offsets: {
                    absolute: this.currentItem.offset()
                },
                mouse: {
                    start: { top: e.pageY, left: e.pageX }
                },
                margins: {
                    top: parseInt(this.currentItem.css("marginTop")) || 0,
                    left: parseInt(this.currentItem.css("marginLeft")) || 0
                }
            });
            
            //The relative click offset
            this.offsets.parent = this.offsetParent.offset();
            this.clickOffset = { left: e.pageX - this.offsets.absolute.left, top: e.pageY - this.offsets.absolute.top };
            
            this.originalPosition = {
                left: this.offsets.absolute.left - this.offsets.parent.left - this.margins.left,
                top: this.offsets.absolute.top - this.offsets.parent.top - this.margins.top
            }
            
            //Generate a flexible offset that will later be subtracted from e.pageX/Y
            //I hate margins - they need to be removed before positioning the element absolutely..
            this.offset = {
                left: e.pageX - this.originalPosition.left,
                top: e.pageY - this.originalPosition.top
            };

            //Save the first time position
            $.extend(this, {
                position: {
                    current: { top: e.pageY - this.offset.top, left: e.pageX - this.offset.left },
                    absolute: { left: e.pageX - this.clickOffset.left, top: e.pageY - this.clickOffset.top },
                    dom: this.currentItem.prev()[0]
                }
            });

            //If o.placeholder is used, create a new element at the given position with the class
            if(o.placeholder) this.createPlaceholder();

            this.propagate("start", e); //Call plugins and callbacks
            this.helperProportions = { width: this.helper.outerWidth(), height: this.helper.outerHeight() }; //Save and store the helper proportions

            //If we have something in cursorAt, we'll use it
            if(o.cursorAt) {
                if(o.cursorAt.top != undefined || o.cursorAt.bottom != undefined) {
                    this.offset.top -= this.clickOffset.top - (o.cursorAt.top != undefined ? o.cursorAt.top : (this.helperProportions.height - o.cursorAt.bottom));
                    this.clickOffset.top = (o.cursorAt.top != undefined ? o.cursorAt.top : (this.helperProportions.height - o.cursorAt.bottom));
                }
                if(o.cursorAt.left != undefined || o.cursorAt.right != undefined) {
                    this.offset.left -= this.clickOffset.left - (o.cursorAt.left != undefined ? o.cursorAt.left : (this.helperProportions.width - o.cursorAt.right));
                    this.clickOffset.left = (o.cursorAt.left != undefined ? o.cursorAt.left : (this.helperProportions.width - o.cursorAt.right));
                }
            }

            if(this.options.placeholder != 'clone') $(this.currentItem).css('visibility', 'hidden'); //Set the original element visibility to hidden to still fill out the white space
            for (var i = this.containers.length - 1; i >= 0; i--) { this.containers[i].propagate("activate", e, this); } //Post 'activate' events to possible containers
            
            //Prepare possible droppables
            if($.ui.ddmanager) $.ui.ddmanager.current = this;
            if ($.ui.ddmanager && !o.dropBehaviour) $.ui.ddmanager.prepareOffsets(this, e);

            this.dragging = true;
            return false;
            
        },
        stop: function(e) {

            this.propagate("stop", e); //Call plugins and trigger callbacks
            if(this.position.dom != this.currentItem.prev()[0]) this.propagate("update", e); //Trigger update callback if the DOM position has changed
            if(!this.element[0].contains(this.currentItem[0])) { //Node was moved out of the current element
                this.propagate("remove", e);
                for (var i = this.containers.length - 1; i >= 0; i--){
                    if(this.containers[i].element[0].contains(this.currentItem[0])) {
                        this.containers[i].propagate("update", e, this);
                        this.containers[i].propagate("receive", e, this);
                    }
                };
            };
            
            //Post events to containers
            for (var i = this.containers.length - 1; i >= 0; i--){
                this.containers[i].propagate("deactivate", e, this);
                if(this.containers[i].containerCache.over) {
                    this.containers[i].propagate("out", e, this);
                    this.containers[i].containerCache.over = 0;
                }
            }
            
            //If we are using droppables, inform the manager about the drop
            if ($.ui.ddmanager && !this.options.dropBehaviour) $.ui.ddmanager.drop(this, e);
            
            this.dragging = false;
            if(this.cancelHelperRemoval) return false;
            $(this.currentItem).css('visibility', '');
            if(this.placeholder) this.placeholder.remove();
            this.helper.remove();

            return false;
            
        },
        drag: function(e) {

            //Compute the helpers position
            this.position.current = { top: e.pageY - this.offset.top, left: e.pageX - this.offset.left };
            this.position.absolute = { left: e.pageX - this.clickOffset.left, top: e.pageY - this.clickOffset.top };

            //Rearrange
            for (var i = this.items.length - 1; i >= 0; i--) {
                var intersection = this.intersectsWithEdge(this.items[i]);
                if(!intersection) continue;
                
                if(     this.items[i].item[0] != this.currentItem[0] //cannot intersect with itself
                    &&    this.currentItem[intersection == 1 ? "next" : "prev"]()[0] != this.items[i].item[0] //no useless actions that have been done before
                    &&    !this.currentItem[0].contains(this.items[i].item[0]) //no action if the item moved is the parent of the item checked
                    && (this.options.type == 'semi-dynamic' ? !this.element[0].contains(this.items[i].item[0]) : true)
                ) {
                    
                    this.direction = intersection == 1 ? "down" : "up";
                    this.rearrange(e, this.items[i]);
                    this.propagate("change", e); //Call plugins and callbacks
                    break;
                }
            }
            
            //Post events to containers
            this.contactContainers(e);
            
            //Interconnect with droppables
            if($.ui.ddmanager) $.ui.ddmanager.drag(this, e);

            this.propagate("sort", e); //Call plugins and callbacks
            this.helper.css({ left: this.position.current.left+'px', top: this.position.current.top+'px' }); // Stick the helper to the cursor
            return false;
            
        },
        rearrange: function(e, i, a) {
            a ? a.append(this.currentItem) : i.item[this.direction == 'down' ? 'before' : 'after'](this.currentItem);
            this.refreshPositions(true); //Precompute after each DOM insertion, NOT on mousemove
            if(this.placeholderElement) this.placeholder.css(this.placeholderElement.offset());
        }
    });
    
/*
 * Sortable Extensions
 */

    $.ui.plugin.add("sortable", "cursor", {
        start: function(e, ui) {
            var t = $('body');
            if (t.css("cursor")) ui.options._cursor = t.css("cursor");
            t.css("cursor", ui.options.cursor);
        },
        stop: function(e, ui) {
            if (ui.options._cursor) $('body').css("cursor", ui.options._cursor);
        }
    });

    $.ui.plugin.add("sortable", "zIndex", {
        start: function(e, ui) {
            var t = ui.helper;
            if(t.css("zIndex")) ui.options._zIndex = t.css("zIndex");
            t.css('zIndex', ui.options.zIndex);
        },
        stop: function(e, ui) {
            if(ui.options._zIndex) $(ui.helper).css('zIndex', ui.options._zIndex);
        }
    });

    $.ui.plugin.add("sortable", "opacity", {
        start: function(e, ui) {
            var t = ui.helper;
            if(t.css("opacity")) ui.options._opacity = t.css("opacity");
            t.css('opacity', ui.options.opacity);
        },
        stop: function(e, ui) {
            if(ui.options._opacity) $(ui.helper).css('opacity', ui.options._opacity);
        }
    });


    $.ui.plugin.add("sortable", "revert", {
        stop: function(e, ui) {
            var self = ui.instance;
            self.cancelHelperRemoval = true;
            var cur = self.currentItem.offset();
            var op = self.helper.offsetParent().offset();
            if(ui.instance.options.zIndex) ui.helper.css('zIndex', ui.instance.options.zIndex); //Do the zIndex again because it already was resetted by the plugin above on stop

            //Also animate the placeholder if we have one
            if(ui.instance.placeholder) ui.instance.placeholder.animate({ opacity: 'hide' }, parseInt(ui.options.revert, 10) || 500);
            
            
            ui.helper.animate({
                left: cur.left - op.left - self.margins.left,
                top: cur.top - op.top - self.margins.top
            }, parseInt(ui.options.revert, 10) || 500, function() {
                self.currentItem.css('visibility', 'visible');
                window.setTimeout(function() {
                    if(self.placeholder) self.placeholder.remove();
                    self.helper.remove();
                    if(ui.options._zIndex) ui.helper.css('zIndex', ui.options._zIndex);
                }, 50);
            });
        }
    });

    
    $.ui.plugin.add("sortable", "containment", {
        start: function(e, ui) {

            var o = ui.options;
            if((o.containment.left != undefined || o.containment.constructor == Array) && !o._containment) return;
            if(!o._containment) o._containment = o.containment;

            if(o._containment == 'parent') o._containment = this[0].parentNode;
            if(o._containment == 'sortable') o._containment = this[0];
            if(o._containment == 'document') {
                o.containment = [
                    0,
                    0,
                    $(document).width(),
                    ($(document).height() || document.body.parentNode.scrollHeight)
                ];
            } else { //I'm a node, so compute top/left/right/bottom

                var ce = $(o._containment);
                var co = ce.offset();

                o.containment = [
                    co.left,
                    co.top,
                    co.left+(ce.outerWidth() || ce[0].scrollWidth),
                    co.top+(ce.outerHeight() || ce[0].scrollHeight)
                ];
            }

        },
        sort: function(e, ui) {

            var o = ui.options;
            var h = ui.helper;
            var c = o.containment;
            var self = ui.instance;
            var borderLeft = (parseInt(self.offsetParent.css("borderLeftWidth"), 10) || 0);
            var borderRight = (parseInt(self.offsetParent.css("borderRightWidth"), 10) || 0);
            var borderTop = (parseInt(self.offsetParent.css("borderTopWidth"), 10) || 0);
            var borderBottom = (parseInt(self.offsetParent.css("borderBottomWidth"), 10) || 0);
            
            if(c.constructor == Array) {
                if((self.position.absolute.left < c[0])) self.position.current.left = c[0] - self.offsets.parent.left - self.margins.left;
                if((self.position.absolute.top < c[1])) self.position.current.top = c[1] - self.offsets.parent.top - self.margins.top;
                if(self.position.absolute.left - c[2] + self.helperProportions.width >= 0) self.position.current.left = c[2] - self.offsets.parent.left - self.helperProportions.width - self.margins.left - borderLeft - borderRight;
                if(self.position.absolute.top - c[3] + self.helperProportions.height >= 0) self.position.current.top = c[3] - self.offsets.parent.top - self.helperProportions.height - self.margins.top - borderTop - borderBottom;
            } else {
                if((ui.position.left < c.left)) self.position.current.left = c.left;
                if((ui.position.top < c.top)) self.position.current.top = c.top;
                if(ui.position.left - self.offsetParent.innerWidth() + self.helperProportions.width + c.right + borderLeft + borderRight >= 0) self.position.current.left = self.offsetParent.innerWidth() - self.helperProportions.width - c.right - borderLeft - borderRight;
                if(ui.position.top - self.offsetParent.innerHeight() + self.helperProportions.height + c.bottom + borderTop + borderBottom >= 0) self.position.current.top = self.offsetParent.innerHeight() - self.helperProportions.height - c.bottom - borderTop - borderBottom;
            }

        }
    });

    $.ui.plugin.add("sortable", "axis", {
        sort: function(e, ui) {
            var o = ui.options;
            if(o.constraint) o.axis = o.constraint; //Legacy check
            o.axis == 'x' ? ui.instance.position.top = ui.instance.originalPosition.top : ui.instance.position.left = ui.instance.originalPosition.left;
        }
    });

    $.ui.plugin.add("sortable", "scroll", {
        start: function(e, ui) {
            var o = ui.options;
            o.scrollSensitivity    = o.scrollSensitivity || 20;
            o.scrollSpeed        = o.scrollSpeed || 20;

            ui.instance.overflowY = function(el) {
                do { if((/auto|scroll/).test(el.css('overflow')) || (/auto|scroll/).test(el.css('overflow-y'))) return el; el = el.parent(); } while (el[0].parentNode);
                return $(document);
            }(this);
            ui.instance.overflowX = function(el) {
                do { if((/auto|scroll/).test(el.css('overflow')) || (/auto|scroll/).test(el.css('overflow-x'))) return el; el = el.parent(); } while (el[0].parentNode);
                return $(document);
            }(this);
            
            if(ui.instance.overflowY[0] != document && ui.instance.overflowY[0].tagName != 'HTML') ui.instance.overflowYstart = ui.instance.overflowY[0].scrollTop;
            if(ui.instance.overflowX[0] != document && ui.instance.overflowX[0].tagName != 'HTML') ui.instance.overflowXstart = ui.instance.overflowX[0].scrollLeft;
            
        },
        sort: function(e, ui) {
            
            var o = ui.options;
            var i = ui.instance;

            if(i.overflowY[0] != document && i.overflowY[0].tagName != 'HTML') {
                if(i.overflowY[0].offsetHeight - (ui.position.top - i.overflowY[0].scrollTop + i.clickOffset.top) < o.scrollSensitivity)
                    i.overflowY[0].scrollTop = i.overflowY[0].scrollTop + o.scrollSpeed;
                if((ui.position.top - i.overflowY[0].scrollTop + i.clickOffset.top) < o.scrollSensitivity)
                    i.overflowY[0].scrollTop = i.overflowY[0].scrollTop - o.scrollSpeed;                
            } else {
                //$(document.body).append('<p>'+(e.pageY - $(document).scrollTop())+'</p>');
                if(e.pageY - $(document).scrollTop() < o.scrollSensitivity)
                    $(document).scrollTop($(document).scrollTop() - o.scrollSpeed);
                if($(window).height() - (e.pageY - $(document).scrollTop()) < o.scrollSensitivity)
                    $(document).scrollTop($(document).scrollTop() + o.scrollSpeed);
            }
            
            if(i.overflowX[0] != document && i.overflowX[0].tagName != 'HTML') {
                if(i.overflowX[0].offsetWidth - (ui.position.left - i.overflowX[0].scrollLeft + i.clickOffset.left) < o.scrollSensitivity)
                    i.overflowX[0].scrollLeft = i.overflowX[0].scrollLeft + o.scrollSpeed;
                if((ui.position.top - i.overflowX[0].scrollLeft + i.clickOffset.left) < o.scrollSensitivity)
                    i.overflowX[0].scrollLeft = i.overflowX[0].scrollLeft - o.scrollSpeed;                
            } else {
                if(e.pageX - $(document).scrollLeft() < o.scrollSensitivity)
                    $(document).scrollLeft($(document).scrollLeft() - o.scrollSpeed);
                if($(window).width() - (e.pageX - $(document).scrollLeft()) < o.scrollSensitivity)
                    $(document).scrollLeft($(document).scrollLeft() + o.scrollSpeed);
            }
            
            //ui.instance.recallOffset(e);
            i.offset = {
                left: i.mouse.start.left - i.originalPosition.left + (i.overflowXstart !== undefined ? i.overflowXstart - i.overflowX[0].scrollLeft : 0),
                top: i.mouse.start.top - i.originalPosition.top + (i.overflowYstart !== undefined ? i.overflowYstart - i.overflowX[0].scrollTop : 0)
            };

        }
    });

})(jQuery);
/*
 * jQuery UI Accordion
 * 
 * Copyright (c) 2007 Jörn Zaefferer
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Accordion
 *
 * Depends:
 *   ui.base.js
 *
 * Revision: $Id: ui.accordion.js 5188 2008-04-03 18:05:08Z joern.zaefferer $
 */

;(function($) {

    $.fn.extend({
        accordion: function(options, data) {
            return this.each(function() {
                var instance = $.data(this, "accordion");
                if (!instance) {
                    $.data(this, "accordion", new $.ui.accordion(this, options));
                } else if (typeof options == "string") {
                    instance[options](data);
                }
            });
        }
    });
    
    $.ui.accordion = function(container, options) {
        
        // setup configuration
        this.options = options = $.extend({}, $.ui.accordion.defaults, options);
        this.element = $(container);
        
        if ( options.navigation ) {
            var current = this.element.find("a").filter(options.navigationFilter);
            if ( current.length ) {
                if ( current.filter(options.header).length ) {
                    options.active = current;
                } else {
                    options.active = current.parent().parent().prev();
                    current.addClass("current");
                }
            }
        }
        
        // calculate active if not specified, using the first header
        options.headers = this.element.find(options.header);
        options.active = findActive(options.headers, options.active);
        
        if (!this.element.hasClass("ui-accordion")) {
            this.element.addClass("ui-accordion");
            $("<span class='ui-accordion-left'/>").insertBefore(options.headers);
            $("<span class='ui-accordion-right'/>").appendTo(options.headers);
            options.headers.addClass("ui-accordion-header").attr("tabindex", "0");
        }
    
        if ( options.fillSpace ) {
            var maxHeight = this.element.parent().height();
            options.headers.each(function() {
                maxHeight -= $(this).outerHeight();
            });
            var maxPadding = 0;
            options.headers.next().each(function() {
                maxPadding = Math.max(maxPadding, $(this).innerHeight() - $(this).height());
            }).height(maxHeight - maxPadding);
        } else if ( options.autoHeight ) {
            var maxHeight = 0;
            options.headers.next().each(function() {
                maxHeight = Math.max(maxHeight, $(this).outerHeight());
            }).height(maxHeight);
        }
    
        options.headers
            .not(options.active || "")
            .next()
            .hide();
        options.active.parent().andSelf().addClass(options.selectedClass);
        
        if (options.event)
            this.element.bind((options.event) + ".accordion", clickHandler);
    };
    
    $.ui.accordion.prototype = {
        activate: function(index) {
            // call clickHandler with custom event
            clickHandler.call(this.element[0], {
                target: findActive( this.options.headers, index )[0]
            });
        },
        
        enable: function() {
            this.options.disabled = false;
        },
        disable: function() {
            this.options.disabled = true;
        },
        destroy: function() {
            this.options.headers.next().css("display", "");
            if ( this.options.fillSpace || this.options.autoHeight ) {
                this.options.headers.next().css("height", "");
            }
            $.removeData(this.element[0], "accordion");
            this.element.removeClass("ui-accordion").unbind(".accordion");
        }
    };
    
    function scopeCallback(callback, scope) {
        return function() {
            return callback.apply(scope, arguments);
        };
    };
    
    function completed(cancel) {
        // if removed while animated data can be empty
        if (!$.data(this, "accordion"))
            return;
        var instance = $.data(this, "accordion");
        var options = instance.options;
        options.running = cancel ? 0 : --options.running;
        if ( options.running )
            return;
        if ( options.clearStyle ) {
            options.toShow.add(options.toHide).css({
                height: "",
                overflow: ""
            });
        }
        $(this).triggerHandler("accordionchange", [options.data], options.change);
    }
    
    function toggle(toShow, toHide, data, clickedActive, down) {
        var options = $.data(this, "accordion").options;
        options.toShow = toShow;
        options.toHide = toHide;
        options.data = data;
        var complete = scopeCallback(completed, this);
        
        // count elements to animate
        options.running = toHide.size() == 0 ? toShow.size() : toHide.size();
        
        if ( options.animated ) {
            if ( !options.alwaysOpen && clickedActive ) {
                $.ui.accordion.animations[options.animated]({
                    toShow: jQuery([]),
                    toHide: toHide,
                    complete: complete,
                    down: down,
                    autoHeight: options.autoHeight
                });
            } else {
                $.ui.accordion.animations[options.animated]({
                    toShow: toShow,
                    toHide: toHide,
                    complete: complete,
                    down: down,
                    autoHeight: options.autoHeight
                });
            }
        } else {
            if ( !options.alwaysOpen && clickedActive ) {
                toShow.toggle();
            } else {
                toHide.hide();
                toShow.show();
            }
            complete(true);
        }
    }
    
    function clickHandler(event) {
        var options = $.data(this, "accordion").options;
        if (options.disabled)
            return false;
        
        // called only when using activate(false) to close all parts programmatically
        if ( !event.target && !options.alwaysOpen ) {
            options.active.parent().andSelf().toggleClass(options.selectedClass);
            var toHide = options.active.next(),
                data = {
                    instance: this,
                    options: options,
                    newHeader: jQuery([]),
                    oldHeader: options.active,
                    newContent: jQuery([]),
                    oldContent: toHide
                },
                toShow = options.active = $([]);
            toggle.call(this, toShow, toHide, data );
            return false;
        }
        // get the click target
        var clicked = $(event.target);
        
        // due to the event delegation model, we have to check if one
        // of the parent elements is our actual header, and find that
        if ( clicked.parents(options.header).length )
            while ( !clicked.is(options.header) )
                clicked = clicked.parent();
        
        var clickedActive = clicked[0] == options.active[0];
        
        // if animations are still active, or the active header is the target, ignore click
        if (options.running || (options.alwaysOpen && clickedActive))
            return false;
        if (!clicked.is(options.header))
            return;
    
        // switch classes
        options.active.parent().andSelf().toggleClass(options.selectedClass);
        if ( !clickedActive ) {
            clicked.parent().andSelf().addClass(options.selectedClass);
        }
    
        // find elements to show and hide
        var toShow = clicked.next(),
            toHide = options.active.next(),
            //data = [clicked, options.active, toShow, toHide],
            data = {
                instance: this,
                options: options,
                newHeader: clicked,
                oldHeader: options.active,
                newContent: toShow,
                oldContent: toHide
            },
            down = options.headers.index( options.active[0] ) > options.headers.index( clicked[0] );
        
        options.active = clickedActive ? $([]) : clicked;
        toggle.call(this, toShow, toHide, data, clickedActive, down );
    
        return false;
    };
    
    function findActive(headers, selector) {
        return selector != undefined
            ? typeof selector == "number"
                ? headers.filter(":eq(" + selector + ")")
                : headers.not(headers.not(selector))
            : selector === false
                ? $([])
                : headers.filter(":eq(0)");
    }
    
    $.extend($.ui.accordion, {
        defaults: {
            selectedClass: "selected",
            alwaysOpen: true,
            animated: 'slide',
            event: "click",
            header: "a",
            autoHeight: true,
            running: 0,
            navigationFilter: function() {
                return this.href.toLowerCase() == location.href.toLowerCase();
            }
        },
        animations: {
            slide: function(options, additions) {
                options = $.extend({
                    easing: "swing",
                    duration: 300
                }, options, additions);
                if ( !options.toHide.size() ) {
                    options.toShow.animate({height: "show"}, options);
                    return;
                }
                var hideHeight = options.toHide.height(),
                    showHeight = options.toShow.height(),
                    difference = showHeight / hideHeight;
                options.toShow.css({ height: 0, overflow: 'hidden' }).show();
                options.toHide.filter(":hidden").each(options.complete).end().filter(":visible").animate({height:"hide"},{
                    step: function(now) {
                        var current = (hideHeight - now) * difference;
                        if ($.browser.msie || $.browser.opera) {
                            current = Math.ceil(current);
                        }
                        options.toShow.height( current );
                    },
                    duration: options.duration,
                    easing: options.easing,
                    complete: function() {
                        if ( !options.autoHeight ) {
                            options.toShow.css("height", "auto");
                        }
                        options.complete();
                    }
                });
            },
            bounceslide: function(options) {
                this.slide(options, {
                    easing: options.down ? "bounceout" : "swing",
                    duration: options.down ? 1000 : 200
                });
            },
            easeslide: function(options) {
                this.slide(options, {
                    easing: "easeinout",
                    duration: 700
                });
            }
        }
    });
    
    // deprecated, use accordion("activate", index) instead
    $.fn.activate = function(index) {
        return this.accordion("activate", index);
    };

})(jQuery);
/*
 * jQuery UI Dialog
 *
 * Copyright (c) 2008 Richard D. Worth (rdworth.org)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 * 
 * http://docs.jquery.com/UI/Dialog
 *
 * Depends:
 *   ui.base.js
 *   ui.draggable.js
 *   ui.resizable.js
 *
 * Revision: $Id: ui.dialog.js 5185 2008-04-03 15:39:51Z scott.gonzalez $
 */
;(function($) {
    
    $.fn.extend({
        dialog: function(options) {
            var args = Array.prototype.slice.call(arguments, 1);

            return this.each(function() {
                if (typeof options == "string") {
                    var elem = $(this).is('.ui-dialog')
                        ? this
                        : $(this).parents(".ui-dialog:first").find(".ui-dialog-content")[0];
                    var dialog = elem ? $.data(elem, "dialog") : {};
                    if (dialog[options])
                        dialog[options].apply(dialog, args);
                // INIT with optional options
                } else if (!$(this).is(".ui-dialog-content"))
                    new $.ui.dialog(this, options);
            });
        }
    });

    $.ui.dialog = function(el, options) {
        
        this.options = options = $.extend({}, $.ui.dialog.defaults, options);
        this.element = el;
        var self = this; //Do bindings

        $.data(this.element, "dialog", this);

        $(el).bind("remove", function() {
            self.destroy();
        });
        
        $(el).bind("setData.dialog", function(event, key, value){
            switch (key) {
                case "draggable":
                    uiDialog.draggable(value ? 'enable' : 'disable');
                    break;
                case "dragStart":
                    uiDialog.data('start.draggable', value);
                    break;
                case "drag":
                    uiDialog.data('drag.draggable', value);
                    break;
                case "dragStop":
                    uiDialog.data('stop.draggable', value);
                    break;
                case "height":
                    uiDialog.height(value);
                    break;
                case "maxHeight":
                case "minHeight":
                case "maxWidth":
                case "minWidth":
                    uiDialog.data(key + ".resizable", value);
                    break;
                case "position":
                    self.position(value);
                    break;
                case "resizable":
                    uiDialog.resizable(value ? 'enable' : 'disable');
                    break;
                case "resizeStart":
                    uiDialog.data('start.resizable', value);
                    break;
                case "resize":
                    uiDialog.data('resize.resizable', value);
                    break;
                case "resizeStop":
                    uiDialog.data('stop.resizable', value);
                    break;
                case "title":
                    $(".ui-dialog-title", uiDialogTitlebar).text(value);
                    break;
                case "width":
                    break;
            }
            options[key] = value;
        }).bind("getData.dialog", function(event, key){
            return options[key];
        });

        var uiDialogContent = $(el).addClass('ui-dialog-content');

        if (!uiDialogContent.parent().length) {
            uiDialogContent.appendTo('body');
        }
        uiDialogContent
            .wrap(document.createElement('div'))
            .wrap(document.createElement('div'));
        var uiDialogContainer = uiDialogContent.parent().addClass('ui-dialog-container').css({position: 'relative'});
        var uiDialog = this.uiDialog = uiDialogContainer.parent().hide()
            .addClass('ui-dialog')
            .css({position: 'absolute', width: options.width, height: options.height, overflow: 'hidden'}); 

        var classNames = uiDialogContent.attr('className').split(' ');

        // Add content classes to dialog, to inherit theme at top level of element
        $.each(classNames, function(i, className) {
            if (className != 'ui-dialog-content')
                uiDialog.addClass(className);
        });

        if ($.fn.resizable) {
            uiDialog.append('<div class="ui-resizable-n ui-resizable-handle"></div>')
                .append('<div class="ui-resizable-s ui-resizable-handle"></div>')
                .append('<div class="ui-resizable-e ui-resizable-handle"></div>')
                .append('<div class="ui-resizable-w ui-resizable-handle"></div>')
                .append('<div class="ui-resizable-ne ui-resizable-handle"></div>')
                .append('<div class="ui-resizable-se ui-resizable-handle"></div>')
                .append('<div class="ui-resizable-sw ui-resizable-handle"></div>')
                .append('<div class="ui-resizable-nw ui-resizable-handle"></div>');
            uiDialog.resizable({
                maxWidth: options.maxWidth,
                maxHeight: options.maxHeight,
                minWidth: options.minWidth,
                minHeight: options.minHeight,
                start: options.resizeStart,
                resize: options.resize,
                stop: function(e, ui) {
                    options.resizeStop && options.resizeStop.apply(this, arguments);
                    $.ui.dialog.overlay.resize();
                }
            });
            if (!options.resizable)
                uiDialog.resizable('disable');
        }

        uiDialogContainer.prepend('<div class="ui-dialog-titlebar"></div>');
        var uiDialogTitlebar = $('.ui-dialog-titlebar', uiDialogContainer);
        var title = (options.title) ? options.title : (uiDialogContent.attr('title')) ? uiDialogContent.attr('title') : '';
        uiDialogTitlebar.append('<span class="ui-dialog-title">' + title + '</span>');
        uiDialogTitlebar.append('<a href="#" class="ui-dialog-titlebar-close"><span>X</span></a>');
        this.uiDialogTitlebarClose = $('.ui-dialog-titlebar-close', uiDialogTitlebar)
            .hover(function() { $(this).addClass('ui-dialog-titlebar-close-hover'); }, 
                   function() { $(this).removeClass('ui-dialog-titlebar-close-hover'); })
            .mousedown(function(ev) {
                ev.stopPropagation();
            })
            .click(function() {
                self.close();
                return false;
            })
            .keydown(function(ev) {
                var ESC = 27;
                ev.keyCode && ev.keyCode == ESC && self.close(); 
            });

        var l = 0;
        $.each(options.buttons, function() { l = 1; return false; });
        if (l == 1) {
            uiDialog.append('<div class="ui-dialog-buttonpane"></div>');
            var uiDialogButtonPane = $('.ui-dialog-buttonpane', uiDialog);
            $.each(options.buttons, function(name, value) {
                var btn = $(document.createElement('button')).text(name).click(value);
                uiDialogButtonPane.append(btn);
            });
        }

        if ($.fn.draggable) {
            uiDialog.draggable({
                handle: '.ui-dialog-titlebar',
                start: function(e, ui) {
                    self.activate();
                    options.dragStart && options.dragStart.apply(this, arguments);
                },
                drag: options.drag,
                stop: function(e, ui) {
                    options.dragStop && options.dragStop.apply(this, arguments);
                    $.ui.dialog.overlay.resize();
                }
            });
            if (!options.draggable)
                uiDialog.draggable('disable')
        }
    
        uiDialog.mousedown(function() {
            self.activate();
        });
        uiDialogTitlebar.click(function() {
            self.activate();
        });
        
        options.bgiframe && $.fn.bgiframe && uiDialog.bgiframe();

        this.position = function(pos) {
            var wnd = $(window), doc = $(document), top = doc.scrollTop(), left = doc.scrollLeft();
            if (pos.constructor == Array) {
                // [x, y]
                top += pos[1];
                left += pos[0];
            } else {
                switch (pos) {
                    case 'center':
                        top += (wnd.height() / 2) - (uiDialog.height() / 2);
                        left += (wnd.width() / 2) - (uiDialog.width() / 2);
                        break;
                    case 'top':
                        top += 0;
                        left += (wnd.width() / 2) - (uiDialog.width() / 2);
                        break;
                    case 'right':
                        top += (wnd.height() / 2) - (uiDialog.height() / 2);
                        left += (wnd.width()) - (uiDialog.width());
                        break;
                    case 'bottom':
                        top += (wnd.height()) - (uiDialog.height());
                        left += (wnd.width() / 2) - (uiDialog.width() / 2);
                        break;
                    case 'left':
                        top += (wnd.height() / 2) - (uiDialog.height() / 2);
                        left += 0;
                        break;
                    default:
                        //center
                        top += (wnd.height() / 2) - (uiDialog.height() / 2);
                        left += (wnd.width() / 2) - (uiDialog.width() / 2);
                }
            }
            top = top < doc.scrollTop() ? doc.scrollTop() : top;
            uiDialog.css({top: top, left: left});
        }
        
        this.open = function() {
            this.overlay = options.modal ? new $.ui.dialog.overlay(self) : null;
            uiDialog.appendTo('body');
            this.position(options.position);
            uiDialog.show();
            self.moveToTop();
            self.activate();
            
            // CALLBACK: open
            var openEV = null;
            var openUI = {
                options: options
            };
            this.uiDialogTitlebarClose.focus();
            $(this.element).triggerHandler("dialogopen", [openEV, openUI], options.open);
        };

        this.activate = function() {
            // Move modeless dialogs to the top when they're activated.  Even
            // if there is a modal dialog in the window, the modeless dialog
            // should be on top because it must have been opened after the modal
            // dialog.  Modal dialogs don't get moved to the top because that
            // would make any modeless dialogs that it spawned unusable until
            // the modal dialog is closed.
            !options.modal && this.moveToTop();
        };
        
        this.moveToTop = function() {
            var maxZ = options.zIndex;
            $('.ui-dialog:visible').each(function() {
                maxZ = Math.max(maxZ, parseInt($(this).css('z-index'), 10) || options.zIndex);
            });
            this.overlay && this.overlay.$el.css('z-index', ++maxZ);
            uiDialog.css('z-index', ++maxZ);
        };
        
        this.close = function() {
            this.overlay && this.overlay.destroy();
            uiDialog.hide();

            // CALLBACK: close
            var closeEV = null;
            var closeUI = {
                options: options
            };
            $(this.element).triggerHandler("dialogclose", [closeEV, closeUI], options.close);
            $.ui.dialog.overlay.resize();
        };

        this.destroy = function() {
            this.overlay && this.overlay.destroy();
            uiDialog.hide();
            $(el).unbind('.dialog').removeClass('ui-dialog-content').hide().appendTo('body');
            uiDialog.remove();
            $.removeData(this.element, "dialog");
        };
        
        if (options.autoOpen) {
            this.open();
        };
    };
    
    $.extend($.ui.dialog, {
        defaults: {
            autoOpen: true,
            bgiframe: false,
            buttons: [],
            draggable: true,
            height: 200,
            minHeight: 100,
            minWidth: 150,
            modal: false,
            overlay: {},
            position: 'center',
            resizable: true,
            width: 300,
            zIndex: 1000
        },
        
        overlay: function(dialog) {
            this.$el = $.ui.dialog.overlay.create(dialog);
        }
    });
    
    $.extend($.ui.dialog.overlay, {
        instances: [],
        events: $.map('focus,mousedown,mouseup,keydown,keypress,click'.split(','),
            function(e) { return e + '.dialog-overlay'; }).join(' '),
        create: function(dialog) {
            if (this.instances.length === 0) {
                // prevent use of anchors and inputs
                $('a, :input').bind(this.events, function() {
                    // allow use of the element if inside a dialog and
                    // - there are no modal dialogs
                    // - there are modal dialogs, but we are in front of the
                    //   topmost modal dialog
                    var allow = false;
                    var $dialog = $(this).parents('.ui-dialog');
                    if ($dialog.length) {
                        var $overlays = $('.ui-dialog-overlay');
                        if ($overlays.length) {
                            var maxZ = parseInt($overlays.css('z-index'), 10);
                            $overlays.each(function() {
                                maxZ = Math.max(maxZ, parseInt($(this).css('z-index'), 10));
                            });
                            allow = parseInt($dialog.css('z-index'), 10) > maxZ;
                        } else {
                            allow = true;
                        }
                    }
                    return allow;
                });
                
                // allow closing by pressing the escape key
                $(document).bind('keydown.dialog-overlay', function(e) {
                    var ESC = 27;
                    e.keyCode && e.keyCode == ESC && dialog.close(); 
                });
                
                // handle window resize
                $(window).bind('resize.dialog-overlay', $.ui.dialog.overlay.resize);
            }
            
            var $el = $('<div/>').appendTo(document.body)
                .addClass('ui-dialog-overlay').css($.extend({
                    borderWidth: 0, margin: 0, padding: 0,
                    position: 'absolute', top: 0, left: 0,
                    width: this.width(),
                    height: this.height()
                }, dialog.options.overlay));
            
            dialog.options.bgiframe && $.fn.bgiframe && $el.bgiframe();
            
            this.instances.push($el);
            return $el;
        },
        
        destroy: function($el) {
            this.instances.splice($.inArray(this.instances, $el), 1);
            
            if (this.instances.length === 0) {
                $('a, :input').add([document, window]).unbind('.dialog-overlay');
            }
            
            $el.remove();
        },
        
        height: function() {
            if ($.browser.msie && $.browser.version < 7) {
                var scrollHeight = Math.max(
                    document.documentElement.scrollHeight,
                    document.body.scrollHeight
                );
                var offsetHeight = Math.max(
                    document.documentElement.offsetHeight,
                    document.body.offsetHeight
                );
                
                if (scrollHeight < offsetHeight) {
                    return $(window).height() + 'px';
                } else {
                    return scrollHeight + 'px';
                }
            } else {
                return $(document).height() + 'px';
            }
        },
        
        width: function() {
            if ($.browser.msie && $.browser.version < 7) {
                var scrollWidth = Math.max(
                    document.documentElement.scrollWidth,
                    document.body.scrollWidth
                );
                var offsetWidth = Math.max(
                    document.documentElement.offsetWidth,
                    document.body.offsetWidth
                );
                
                if (scrollWidth < offsetWidth) {
                    return $(window).width() + 'px';
                } else {
                    return scrollWidth + 'px';
                }
            } else {
                return $(document).width() + 'px';
            }
        },
        
        resize: function() {
            /* If the dialog is draggable and the user drags it past the
             * right edge of the window, the document becomes wider so we
             * need to stretch the overlay.  If the user then drags the
             * dialog back to the left, the document will become narrower,
             * so we need to shrink the overlay to the appropriate size.
             * This is handled by shrinking the overlay before setting it
             * to the full document size.
             */
            var $overlays = $([]);
            $.each($.ui.dialog.overlay.instances, function() {
                $overlays = $overlays.add(this);
            });
            
            $overlays.css({
                width: 0,
                height: 0
            }).css({
                width: $.ui.dialog.overlay.width(),
                height: $.ui.dialog.overlay.height()
            });
        }
    });
    
    $.extend($.ui.dialog.overlay.prototype, {
        destroy: function() {
            $.ui.dialog.overlay.destroy(this.$el);
        }
    });

})(jQuery);
/*
 * jQuery UI Slider
 *
 * Copyright (c) 2008 Paul Bakaus
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 * 
 * http://docs.jquery.com/UI/Slider
 *
 * Depends:
 *   ui.base.js
 *
 * Revision: $Id: ui.slider.js 5219 2008-04-09 20:16:05Z braeker $
 */
;(function($) {

    $.fn.extend({
        slider: function(options) {
            var args = Array.prototype.slice.call(arguments, 1);
            
            if ( options == "value" )
                return $.data(this[0], "slider").value(arguments[1]);
            
            return this.each(function() {
                if (typeof options == "string") {
                    var slider = $.data(this, "slider");
                    if (slider) slider[options].apply(slider, args);

                } else if(!$.data(this, "slider"))
                    new $.ui.slider(this, options);
            });
        }
    });
    
    $.ui.slider = function(element, options) {

        //Initialize needed constants
        var self = this;
        this.element = $(element);
        $.data(element, "slider", this);
        this.element.addClass("ui-slider");
        
        //Prepare the passed options
        this.options = $.extend({}, $.ui.slider.defaults, options);
        var o = this.options;
        $.extend(o, {
            axis: o.axis || (element.offsetWidth < element.offsetHeight ? 'vertical' : 'horizontal'),
            max: !isNaN(parseInt(o.max,10)) ? { x: parseInt(o.max, 10), y: parseInt(o.max, 10)  } : ({ x: o.max && o.max.x || 100, y:  o.max && o.max.y || 100 }),
            min: !isNaN(parseInt(o.min,10)) ? { x: parseInt(o.min, 10), y: parseInt(o.min, 10)  } : ({ x: o.min && o.min.x || 0, y:  o.min && o.min.y || 0 })
        });
    
        //Prepare the real maxValue
        o.realMax = {
            x: o.max.x - o.min.x,
            y: o.max.y - o.min.y
        };
        
        //Calculate stepping based on steps
        o.stepping = {
            x: o.stepping && o.stepping.x || parseInt(o.stepping, 10) || (o.steps && o.steps.x ? o.realMax.x/o.steps.x : 0),
            y: o.stepping && o.stepping.y || parseInt(o.stepping, 10) || (o.steps && o.steps.y ? o.realMax.y/o.steps.y : 0)
        };
        
        $(element).bind("setData.slider", function(event, key, value){
            self.options[key] = value;
        }).bind("getData.slider", function(event, key){
            return self.options[key];
        });

        //Initialize mouse and key events for interaction
        this.handle = $(o.handle, element);
        if (!this.handle.length) {
            self.handle = self.generated = $(o.handles || [0]).map(function() {
                var handle = $("<div/>").addClass("ui-slider-handle").appendTo(element);
                if (this.id)
                    handle.attr("id", this.id);
                return handle[0];
            });
        }
        $(this.handle)
            .mouseInteraction({
                executor: this,
                delay: o.delay,
                distance: o.distance != undefined ? o.distance : 1,
                dragPrevention: o.prevention ? o.prevention.toLowerCase().split(',') : ['input','textarea','button','select','option'],
                start: this.start,
                stop: this.stop,
                drag: this.drag,
                condition: function(e, handle) {
                    if(!this.disabled) {
                        if(this.currentHandle) this.blur(this.currentHandle);
                        this.focus(handle,1);
                        return !this.disabled;
                    }
                }
            })
            .wrap('<a href="javascript:void(0)" style="cursor:default;"></a>')
            .parent()
                .bind('focus', function(e) { self.focus(this.firstChild); })
                .bind('blur', function(e) { self.blur(this.firstChild); })
                .bind('keydown', function(e) {
                    if(/(37|38|39|40)/.test(e.keyCode)) {
                        self.moveTo({
                            x: /(37|39)/.test(e.keyCode) ? (e.keyCode == 37 ? '-' : '+') + '=' + self.oneStep(1) : null,
                            y: /(38|40)/.test(e.keyCode) ? (e.keyCode == 38 ? '-' : '+') + '=' + self.oneStep(2) : null
                        }, this.firstChild);
                    }
                })
        ;
        
        //Prepare dynamic properties for later use
        this.actualSize = { width: this.element.outerWidth() , height: this.element.outerHeight() };
        
        //Bind the click to the slider itself
        this.element.bind('mousedown.slider', function(e) {
            self.click.apply(self, [e]);
            self.currentHandle.data("ui-mouse").trigger(e);
            self.firstValue = self.firstValue + 1; //This is for always triggering the change event
        });
        
        //Move the first handle to the startValue
        $.each(o.handles || [], function(index, handle) {
            self.moveTo(handle.start, index, true);
        });
        if (!isNaN(o.startValue))
            this.moveTo(o.startValue, 0, true);
        
        //If we only have one handle, set the previous handle to this one to allow clicking before selecting the handle
        if(this.handle.length == 1) this.previousHandle = this.handle;
        if(this.handle.length == 2 && o.range) this.createRange();
    
    };
    
    $.extend($.ui.slider.prototype, {
        plugins: {},
        createRange: function() {
            this.rangeElement = $('<div></div>')
                .addClass('ui-slider-range')
                .css({ position: 'absolute' })
                .appendTo(this.element);
            this.updateRange();
        },
        updateRange: function() {
                var prop = this.options.axis == "vertical" ? "top" : "left";
                var size = this.options.axis == "vertical" ? "height" : "width";
                this.rangeElement.css(prop, parseInt($(this.handle[0]).css(prop),10) + this.handleSize(0, this.options.axis == "vertical" ? 2 : 1)/2);
                this.rangeElement.css(size, parseInt($(this.handle[1]).css(prop),10) - parseInt($(this.handle[0]).css(prop),10));
        },
        getRange: function() {
            return this.rangeElement ? this.convertValue(parseInt(this.rangeElement.css(this.options.axis == "vertical" ? "height" : "width"),10)) : null;
        },
        ui: function(e) {
            return {
                instance: this,
                options: this.options,
                handle: this.currentHandle,
                value: this.options.axis != "both" || !this.options.axis ? Math.round(this.value(null,this.options.axis == "vertical" ? 2 : 1)) : {
                    x: Math.round(this.value(null,1)),
                    y: Math.round(this.value(null,2))
                },
                range: this.getRange()
            };
        },
        propagate: function(n,e) {
            $.ui.plugin.call(this, n, [e, this.ui()]);
            this.element.triggerHandler(n == "slide" ? n : "slide"+n, [e, this.ui()], this.options[n]);
        },
        destroy: function() {
            this.element
                .removeClass("ui-slider ui-slider-disabled")
                .removeData("slider")
                .unbind(".slider");
            this.handle.removeMouseInteraction();
            this.generated && this.generated.remove();
        },
        enable: function() {
            this.element.removeClass("ui-slider-disabled");
            this.disabled = false;
        },
        disable: function() {
            this.element.addClass("ui-slider-disabled");
            this.disabled = true;
        },
        focus: function(handle,hard) {
            this.currentHandle = $(handle).addClass('ui-slider-handle-active');
            if(hard) this.currentHandle.parent()[0].focus();
        },
        blur: function(handle) {
            $(handle).removeClass('ui-slider-handle-active');
            if(this.currentHandle && this.currentHandle[0] == handle) { this.previousHandle = this.currentHandle; this.currentHandle = null; };
        },
        value: function(handle, axis) {
            if(this.handle.length == 1) this.currentHandle = this.handle;
            if(!axis) axis = this.options.axis == "vertical" ? 2 : 1;
            
            var value = ((parseInt($(handle != undefined && handle !== null ? this.handle[handle] || handle : this.currentHandle).css(axis == 1 ? "left" : "top"),10) / (this.actualSize[axis == 1 ? "width" : "height"] - this.handleSize(null,axis))) * this.options.realMax[axis == 1 ? "x" : "y"]) + this.options.min[axis == 1 ? "x" : "y"];
            
            var o = this.options;
            if (o.stepping[axis == 1 ? "x" : "y"]) {
                value = Math.round(value / o.stepping[axis == 1 ? "x" : "y"]) * o.stepping[axis == 1 ? "x" : "y"];
            }
            return value;
        },
        convertValue: function(value,axis) {
            if(!axis) axis = this.options.axis == "vertical" ? 2 : 1;
            return this.options.min[axis == 1 ? "x" : "y"] + (value / (this.actualSize[axis == 1 ? "width" : "height"] - this.handleSize(null,axis))) * this.options.realMax[axis == 1 ? "x" : "y"];
        },
        translateValue: function(value,axis) {
            if(!axis) axis = this.options.axis == "vertical" ? 2 : 1;
            return ((value - this.options.min[axis == 1 ? "x" : "y"]) / this.options.realMax[axis == 1 ? "x" : "y"]) * (this.actualSize[axis == 1 ? "width" : "height"] - this.handleSize(null,axis));
        },
        handleSize: function(handle,axis) {
            if(!axis) axis = this.options.axis == "vertical" ? 2 : 1;
            return $(handle != undefined && handle !== null ? this.handle[handle] : this.currentHandle)[axis == 1 ? "outerWidth" : "outerHeight"]();    
        },
        click: function(e) {
        
            // This method is only used if:
            // - The user didn't click a handle
            // - The Slider is not disabled
            // - There is a current, or previous selected handle (otherwise we wouldn't know which one to move)
            var pointer = [e.pageX,e.pageY];
            var clickedHandle = false; this.handle.each(function() { if(this == e.target) clickedHandle = true;  });
            if(clickedHandle || this.disabled || !(this.currentHandle || this.previousHandle)) return;

            //If a previous handle was focussed, focus it again
            if(this.previousHandle) this.focus(this.previousHandle, 1);
            
            //Move focussed handle to the clicked position
            this.offset = this.element.offset();
            this.moveTo({
                y: this.convertValue(e.pageY - this.offset.top - this.currentHandle.outerHeight()/2),
                x: this.convertValue(e.pageX - this.offset.left - this.currentHandle.outerWidth()/2)
            }, null, true);
        },
        start: function(e, handle) {
        
            var o = this.options;
            if(!this.currentHandle) this.focus(this.previousHandle, true); //This is a especially ugly fix for strange blur events happening on mousemove events

            this.offset = this.element.offset();
            this.handleOffset = this.currentHandle.offset();
            this.clickOffset = { top: e.pageY - this.handleOffset.top, left: e.pageX - this.handleOffset.left };
            this.firstValue = this.value();
            
            this.propagate('start', e);
            return false;
                        
        },
        stop: function(e) {
            this.propagate('stop', e);
            if (this.firstValue != this.value())
                this.propagate('change', e);
            this.focus(this.currentHandle, true); //This is a especially ugly fix for strange blur events happening on mousemove events
            return false;
        },
        
        oneStep: function(axis) {
            if(!axis) axis = this.options.axis == "vertical" ? 2 : 1;
            return this.options.stepping[axis == 1 ? "x" : "y"] ? this.options.stepping[axis == 1 ? "x" : "y"] : (this.options.realMax[axis == 1 ? "x" : "y"] / this.actualSize[axis == 1 ? "width" : "height"]) * 5;
        },
        
        translateRange: function(value,axis) {
            if (this.rangeElement) {
                if (this.currentHandle[0] == this.handle[0] && value >= this.translateValue(this.value(1),axis))
                    value = this.translateValue(this.value(1,axis) - this.oneStep(axis), axis);
                if (this.currentHandle[0] == this.handle[1] && value <= this.translateValue(this.value(0),axis))
                    value = this.translateValue(this.value(0,axis) + this.oneStep(axis));
            }
            if (this.options.handles) {
                var handle = this.options.handles[this.handleIndex()];
                if (value < this.translateValue(handle.min,axis)) {
                    value = this.translateValue(handle.min,axis);
                } else if (value > this.translateValue(handle.max,axis)) {
                    value = this.translateValue(handle.max,axis);
                }
            }
            return value;
        },
        
        handleIndex: function() {
            return this.handle.index(this.currentHandle[0])
        },
        
        translateLimits: function(value,axis) {
            if(!axis) axis = this.options.axis == "vertical" ? 2 : 1;
            if (value >= this.actualSize[axis == 1 ? "width" : "height"] - this.handleSize(null,axis))
                value = this.actualSize[axis == 1 ? "width" : "height"] - this.handleSize(null,axis);
            if (value <= 0)
                value = 0;
            return value;
        },
        
        drag: function(e, handle) {

            var o = this.options;
            var position = { top: e.pageY - this.offset.top - this.clickOffset.top, left: e.pageX - this.offset.left - this.clickOffset.left};
            if(!this.currentHandle) this.focus(this.previousHandle, true); //This is a especially ugly fix for strange blur events happening on mousemove events

            position.left = this.translateLimits(position.left,1);
            position.top = this.translateLimits(position.top,2);
            
            if (o.stepping.x) {
                var value = this.convertValue(position.left,1);
                value = Math.round(value / o.stepping.x) * o.stepping.x;
                position.left = this.translateValue(value, 1);    
            }
            if (o.stepping.y) {
                var value = this.convertValue(position.top,2);
                value = Math.round(value / o.stepping.y) * o.stepping.y;
                position.top = this.translateValue(value, 2);    
            }
            
            position.left = this.translateRange(position.left, 1);
            position.top = this.translateRange(position.top, 2);

            if(o.axis != "vertical") this.currentHandle.css({ left: position.left });
            if(o.axis != "horizontal") this.currentHandle.css({ top: position.top });
            
            if (this.rangeElement)
                this.updateRange();
            this.propagate('slide', e);
            return false;
        },
        
        moveTo: function(value, handle, noPropagation) {
            var o = this.options;
            if (handle == undefined && !this.currentHandle && this.handle.length != 1)
                return false; //If no handle has been passed, no current handle is available and we have multiple handles, return false
            if (handle == undefined && !this.currentHandle)
                handle = 0; //If only one handle is available, use it
            if (handle != undefined)
                this.currentHandle = this.previousHandle = $(this.handle[handle] || handle);



            if(value.x !== undefined && value.y !== undefined) {
                var x = value.x;
                var y = value.y;
            } else {
                var x = value, y = value;
            }

            if(x && x.constructor != Number) {
                var me = /^\-\=/.test(x), pe = /^\+\=/.test(x);
                if (me) {
                    x = this.value(null,1) - parseInt(x.replace('-=', ''), 10);
                } else if (pe) {
                    x = this.value(null,1) + parseInt(x.replace('+=', ''), 10);
                }
            }
            
            if(y && y.constructor != Number) {
                var me = /^\-\=/.test(y), pe = /^\+\=/.test(y);
                if (me) {
                    y = this.value(null,2) - parseInt(y.replace('-=', ''), 10);
                } else if (pe) {
                    y = this.value(null,2) + parseInt(y.replace('+=', ''), 10);
                }
            }

            if(o.axis != "vertical" && x) {
                if(o.stepping.x) x = Math.round(x / o.stepping.x) * o.stepping.x;
                x = this.translateValue(x, 1);
                x = this.translateLimits(x, 1);
                x = this.translateRange(x, 1);
                this.currentHandle.css({ left: x });
            }

            if(o.axis != "horizontal" && y) {
                if(o.stepping.y) y = Math.round(y / o.stepping.y) * o.stepping.y;
                y = this.translateValue(y, 2);
                y = this.translateLimits(y, 2);
                y = this.translateRange(y, 2);
                this.currentHandle.css({ top: y });
            }
            
            if (this.rangeElement)
                this.updateRange();
            
            if (!noPropagation) {
                this.propagate('start', null);
                this.propagate('stop', null);
                this.propagate('change', null);
                this.propagate("slide", null);
            }
        }
    });
    
    $.ui.slider.defaults = {
        handle: ".ui-slider-handle"
    };

})(jQuery);
/*
 * jQuery UI Tabs
 *
 * Copyright (c) 2007 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Tabs
 *
 * Depends:
 *   ui.base.js
 *
 * Revision: $Id: ui.tabs.js 5149 2008-03-31 10:51:18Z rdworth $
 */
;(function($) {

    // tabs API methods
    $.fn.tabs = function() {
        var method = typeof arguments[0] == 'string' && arguments[0];
        var args = method && Array.prototype.slice.call(arguments, 1) || arguments;

        return method == 'length' ?
            $.data(this[0], 'tabs').$tabs.length :
            this.each(function() {
                if (method) {
                    var tabs = $.data(this, 'tabs');
                    if (tabs) tabs[method].apply(tabs, args);
                } else
                    new $.ui.tabs(this, args[0] || {});
            });
    };

    // tabs class
    $.ui.tabs = function(el, options) {
        var self = this;
        
        this.options = $.extend({}, $.ui.tabs.defaults, options);
        this.element = el;

        // doesn't extend with null
        if (options.selected === null)
            this.options.selected = null;

        this.options.event += '.tabs'; // namespace event

        $(el).bind('setData.tabs', function(event, key, value) {
            if ((/^selected/).test(key))
                self.select(value);
            else {
                self.options[key] = value;
                self.tabify();
            }
        }).bind('getData.tabs', function(event, key) {
            return self.options[key];
        });

        // save instance for later
        $.data(el, 'tabs', this);

        // create tabs
        this.tabify(true);
    };
    
    $.ui.tabs.defaults = {
        // basic setup
        selected: 0,
        unselect: false,
        event: 'click',
        disabled: [],
        cookie: null, // e.g. { expires: 7, path: '/', domain: 'jquery.com', secure: true }
        // TODO history: false,

        // Ajax
        spinner: 'Loading&#8230;',
        cache: false,
        idPrefix: 'ui-tabs-',
        ajaxOptions: {},

        // animations
        fx: null, // e.g. { height: 'toggle', opacity: 'toggle', duration: 200 }

        // templates
        tabTemplate: '<li><a href="#{href}"><span>#{label}</span></a></li>',
        panelTemplate: '<div></div>',

        // CSS classes
        navClass: 'ui-tabs-nav',
        selectedClass: 'ui-tabs-selected',
        unselectClass: 'ui-tabs-unselect',
        disabledClass: 'ui-tabs-disabled',
        panelClass: 'ui-tabs-panel',
        hideClass: 'ui-tabs-hide',
        loadingClass: 'ui-tabs-loading'
    };

    // instance methods
    $.extend($.ui.tabs.prototype, {
        tabId: function(a) {
            return a.title && a.title.replace(/\s/g, '_').replace(/[^A-Za-z0-9\-_:\.]/g, '')
                || this.options.idPrefix + $.data(a);
        },
        ui: function(tab, panel) {
            return {
                instance: this,
                options: this.options,
                tab: tab,
                panel: panel
            };
        },
        tabify: function(init) {

            this.$lis = $('li:has(a[href])', this.element);
            this.$tabs = this.$lis.map(function() { return $('a', this)[0]; });
            this.$panels = $([]);

            var self = this, o = this.options;

            this.$tabs.each(function(i, a) {
                // inline tab
                if (a.hash && a.hash.replace('#', '')) // Safari 2 reports '#' for an empty hash
                    self.$panels = self.$panels.add(a.hash);
                // remote tab
                else if ($(a).attr('href') != '#') { // prevent loading the page itself if href is just "#"
                    $.data(a, 'href.tabs', a.href); // required for restore on destroy
                    $.data(a, 'load.tabs', a.href); // mutable
                    var id = self.tabId(a);
                    a.href = '#' + id;
                    var $panel = $('#' + id);
                    if (!$panel.length) {
                        $panel = $(o.panelTemplate).attr('id', id).addClass(o.panelClass)
                            .insertAfter( self.$panels[i - 1] || self.element );
                        $panel.data('destroy.tabs', true);
                    }
                    self.$panels = self.$panels.add( $panel );
                }
                // invalid tab href
                else
                    o.disabled.push(i + 1);
            });

            if (init) {

                // attach necessary classes for styling if not present
                $(this.element).hasClass(o.navClass) || $(this.element).addClass(o.navClass);
                this.$panels.each(function() {
                    var $this = $(this);
                    $this.hasClass(o.panelClass) || $this.addClass(o.panelClass);
                });

                // Try to retrieve selected tab:
                // 1. from fragment identifier in url if present
                // 2. from cookie
                // 3. from selected class attribute on <li>
                // 4. otherwise use given "selected" option
                // 5. check if tab is disabled
                this.$tabs.each(function(i, a) {
                    if (location.hash) {
                        if (a.hash == location.hash) {
                            o.selected = i;
                            // prevent page scroll to fragment
                            //if (($.browser.msie || $.browser.opera) && !o.remote) {
                            if ($.browser.msie || $.browser.opera) {
                                var $toShow = $(location.hash), toShowId = $toShow.attr('id');
                                $toShow.attr('id', '');
                                setTimeout(function() {
                                    $toShow.attr('id', toShowId); // restore id
                                }, 500);
                            }
                            scrollTo(0, 0);
                            return false; // break
                        }
                    } else if (o.cookie) {
                        var index = parseInt($.cookie('ui-tabs' + $.data(self.element)),10);
                        if (index && self.$tabs[index]) {
                            o.selected = index;
                            return false; // break
                        }
                    } else if ( self.$lis.eq(i).hasClass(o.selectedClass) ) {
                        o.selected = i;
                        return false; // break
                    }
                });

                // highlight selected tab
                this.$panels.addClass(o.hideClass);
                this.$lis.removeClass(o.selectedClass);
                if (o.selected !== null) {
                    this.$panels.eq(o.selected).show().removeClass(o.hideClass); // use show and remove class to show in any case no matter how it has been hidden before
                    this.$lis.eq(o.selected).addClass(o.selectedClass);
                }

                // load if remote tab
                var href = o.selected !== null && $.data(this.$tabs[o.selected], 'load.tabs');
                if (href)
                    this.load(o.selected);

                // Take disabling tabs via class attribute from HTML
                // into account and update option properly...
                o.disabled = $.unique(o.disabled.concat(
                    $.map(this.$lis.filter('.' + o.disabledClass),
                        function(n, i) { return self.$lis.index(n); } )
                )).sort();
                
                // clean up to avoid memory leaks in certain versions of IE 6
                $(window).bind('unload', function() {
                    self.$tabs.unbind('.tabs');
                    self.$lis = self.$tabs = self.$panels = null;
                });

            }

            // disable tabs
            for (var i = 0, li; li = this.$lis[i]; i++)
                $(li)[$.inArray(i, o.disabled) != -1 && !$(li).hasClass(o.selectedClass) ? 'addClass' : 'removeClass'](o.disabledClass);

            // reset cache if switching from cached to not cached
            if (o.cache === false)
                this.$tabs.removeData('cache.tabs');
            
            // set up animations
            var hideFx, showFx, baseFx = { 'min-width': 0, duration: 1 }, baseDuration = 'normal';
            if (o.fx && o.fx.constructor == Array)
                hideFx = o.fx[0] || baseFx, showFx = o.fx[1] || baseFx;
            else
                hideFx = showFx = o.fx || baseFx;

            // reset some styles to maintain print style sheets etc.
            var resetCSS = { display: '', overflow: '', height: '' };
            if (!$.browser.msie) // not in IE to prevent ClearType font issue
                resetCSS.opacity = '';

            // Hide a tab, animation prevents browser scrolling to fragment,
            // $show is optional.
            function hideTab(clicked, $hide, $show) {
                $hide.animate(hideFx, hideFx.duration || baseDuration, function() { //
                    $hide.addClass(o.hideClass).css(resetCSS); // maintain flexible height and accessibility in print etc.
                    if ($.browser.msie && hideFx.opacity)
                        $hide[0].style.filter = '';
                    if ($show)
                        showTab(clicked, $show, $hide);
                });
            }

            // Show a tab, animation prevents browser scrolling to fragment,
            // $hide is optional.
            function showTab(clicked, $show, $hide) {
                if (showFx === baseFx)
                    $show.css('display', 'block'); // prevent occasionally occuring flicker in Firefox cause by gap between showing and hiding the tab panels
                $show.animate(showFx, showFx.duration || baseDuration, function() {
                    $show.removeClass(o.hideClass).css(resetCSS); // maintain flexible height and accessibility in print etc.
                    if ($.browser.msie && showFx.opacity)
                        $show[0].style.filter = '';

                    // callback
                    $(self.element).triggerHandler('tabsshow', [self.ui(clicked, $show[0])], o.show);

                });
            }

            // switch a tab
            function switchTab(clicked, $li, $hide, $show) {
                /*if (o.bookmarkable && trueClick) { // add to history only if true click occured, not a triggered click
                    $.ajaxHistory.update(clicked.hash);
                }*/
                $li.addClass(o.selectedClass)
                    .siblings().removeClass(o.selectedClass);
                hideTab(clicked, $hide, $show);
            }

            // attach tab event handler, unbind to avoid duplicates from former tabifying...
            this.$tabs.unbind('.tabs').bind(o.event, function() {

                //var trueClick = e.clientX; // add to history only if true click occured, not a triggered click
                var $li = $(this).parents('li:eq(0)'),
                    $hide = self.$panels.filter(':visible'),
                    $show = $(this.hash);

                // If tab is already selected and not unselectable or tab disabled or 
                // or is already loading or click callback returns false stop here.
                // Check if click handler returns false last so that it is not executed
                // for a disabled or loading tab!
                if (($li.hasClass(o.selectedClass) && !o.unselect)
                    || $li.hasClass(o.disabledClass) 
                    || $(this).hasClass(o.loadingClass)
                    || $(self.element).triggerHandler('tabsselect', [self.ui(this, $show[0])], o.select) === false
                    ) {
                    this.blur();
                    return false;
                }

                self.options.selected = self.$tabs.index(this);

                // if tab may be closed
                if (o.unselect) {
                    if ($li.hasClass(o.selectedClass)) {
                        self.options.selected = null;
                        $li.removeClass(o.selectedClass);
                        self.$panels.stop();
                        hideTab(this, $hide);
                        this.blur();
                        return false;
                    } else if (!$hide.length) {
                        self.$panels.stop();
                        var a = this;
                        self.load(self.$tabs.index(this), function() {
                            $li.addClass(o.selectedClass).addClass(o.unselectClass);
                            showTab(a, $show);
                        });
                        this.blur();
                        return false;
                    }
                }

                if (o.cookie)
                    $.cookie('ui-tabs' + $.data(self.element), self.options.selected, o.cookie);

                // stop possibly running animations
                self.$panels.stop();

                // show new tab
                if ($show.length) {

                    // prevent scrollbar scrolling to 0 and than back in IE7, happens only if bookmarking/history is enabled
                    /*if ($.browser.msie && o.bookmarkable) {
                        var showId = this.hash.replace('#', '');
                        $show.attr('id', '');
                        setTimeout(function() {
                            $show.attr('id', showId); // restore id
                        }, 0);
                    }*/

                    var a = this;
                    self.load(self.$tabs.index(this), $hide.length ? 
                        function() {
                            switchTab(a, $li, $hide, $show);
                        } :
                        function() {
                            $li.addClass(o.selectedClass);
                            showTab(a, $show);
                        }
                    );

                    // Set scrollbar to saved position - need to use timeout with 0 to prevent browser scroll to target of hash
                    /*var scrollX = window.pageXOffset || document.documentElement && document.documentElement.scrollLeft || document.body.scrollLeft || 0;
                    var scrollY = window.pageYOffset || document.documentElement && document.documentElement.scrollTop || document.body.scrollTop || 0;
                    setTimeout(function() {
                        scrollTo(scrollX, scrollY);
                    }, 0);*/

                } else
                    throw 'jQuery UI Tabs: Mismatching fragment identifier.';

                // Prevent IE from keeping other link focussed when using the back button
                // and remove dotted border from clicked link. This is controlled in modern
                // browsers via CSS, also blur removes focus from address bar in Firefox
                // which can become a usability and annoying problem with tabsRotate.
                if ($.browser.msie)
                    this.blur();

                //return o.bookmarkable && !!trueClick; // convert trueClick == undefined to Boolean required in IE
                return false;

            });

            // disable click if event is configured to something else
            if (!(/^click/).test(o.event))
                this.$tabs.bind('click.tabs', function() { return false; });

        },
        add: function(url, label, index) {
            if (index == undefined) 
                index = this.$tabs.length; // append by default

            var o = this.options;
            var $li = $(o.tabTemplate.replace(/#\{href\}/, url).replace(/#\{label\}/, label));
            $li.data('destroy.tabs', true);

            var id = url.indexOf('#') == 0 ? url.replace('#', '') : this.tabId( $('a:first-child', $li)[0] );

            // try to find an existing element before creating a new one
            var $panel = $('#' + id);
            if (!$panel.length) {
                $panel = $(o.panelTemplate).attr('id', id)
                    .addClass(o.panelClass).addClass(o.hideClass);
                $panel.data('destroy.tabs', true);
            }
            if (index >= this.$lis.length) {
                $li.appendTo(this.element);
                $panel.appendTo(this.element.parentNode);
            } else {
                $li.insertBefore(this.$lis[index]);
                $panel.insertBefore(this.$panels[index]);
            }
            
            o.disabled = $.map(o.disabled,
                function(n, i) { return n >= index ? ++n : n });
                
            this.tabify();

            if (this.$tabs.length == 1) {
                 $li.addClass(o.selectedClass);
                 $panel.removeClass(o.hideClass);
                 var href = $.data(this.$tabs[0], 'load.tabs');
                 if (href)
                     this.load(index, href);
            }

            // callback
            $(this.element).triggerHandler('tabsadd',
                [this.ui(this.$tabs[index], this.$panels[index])], o.add
            );
        },
        remove: function(index) {
            var o = this.options, $li = this.$lis.eq(index).remove(),
                $panel = this.$panels.eq(index).remove();

            // If selected tab was removed focus tab to the right or
            // in case the last tab was removed the tab to the left.
            if ($li.hasClass(o.selectedClass) && this.$tabs.length > 1)
                this.select(index + (index + 1 < this.$tabs.length ? 1 : -1));

            o.disabled = $.map($.grep(o.disabled, function(n, i) { return n != index; }),
                function(n, i) { return n >= index ? --n : n });

            this.tabify();

            // callback
            $(this.element).triggerHandler('tabsremove',
                [this.ui($li.find('a')[0], $panel[0])], o.remove
            );
        },
        enable: function(index) {
            var o = this.options;
            if ($.inArray(index, o.disabled) == -1)
                return;
                
            var $li = this.$lis.eq(index).removeClass(o.disabledClass);
            if ($.browser.safari) { // fix disappearing tab (that used opacity indicating disabling) after enabling in Safari 2...
                $li.css('display', 'inline-block');
                setTimeout(function() {
                    $li.css('display', 'block');
                }, 0);
            }

            o.disabled = $.grep(o.disabled, function(n, i) { return n != index; });

            // callback
            $(this.element).triggerHandler('tabsenable',
                [this.ui(this.$tabs[index], this.$panels[index])], o.enable
            );

        },
        disable: function(index) {
            var self = this, o = this.options;
            if (index != o.selected) { // cannot disable already selected tab
                this.$lis.eq(index).addClass(o.disabledClass);

                o.disabled.push(index);
                o.disabled.sort();

                // callback
                $(this.element).triggerHandler('tabsdisable',
                    [this.ui(this.$tabs[index], this.$panels[index])], o.disable
                );
            }
        },
        select: function(index) {
            if (typeof index == 'string')
                index = this.$tabs.index( this.$tabs.filter('[href$=' + index + ']')[0] );
            this.$tabs.eq(index).trigger(this.options.event);
        },
        load: function(index, callback) { // callback is for internal usage only
            
            var self = this, o = this.options, $a = this.$tabs.eq(index), a = $a[0],
                    bypassCache = callback == undefined || callback === false, url = $a.data('load.tabs');

            callback = callback || function() {};
            
            // no remote or from cache - just finish with callback
            if (!url || ($.data(a, 'cache.tabs') && !bypassCache)) {
                callback();
                return;
            }

            // load remote from here on
            if (o.spinner) {
                var $span = $('span', a);
                $span.data('label.tabs', $span.html()).html('<em>' + o.spinner + '</em>');
            }
            var finish = function() {
                self.$tabs.filter('.' + o.loadingClass).each(function() {
                    $(this).removeClass(o.loadingClass);
                    if (o.spinner) {
                        var $span = $('span', this);
                        $span.html($span.data('label.tabs')).removeData('label.tabs');
                    }
                });
                self.xhr = null;
            };
            var ajaxOptions = $.extend({}, o.ajaxOptions, {
                url: url,
                success: function(r, s) {
                    $(a.hash).html(r);
                    finish();
                    
                    // This callback is required because the switch has to take
                    // place after loading has completed.
                    callback();

                    if (o.cache)
                        $.data(a, 'cache.tabs', true); // if loaded once do not load them again

                    // callback
                    $(self.element).triggerHandler('tabsload',
                        [self.ui(self.$tabs[index], self.$panels[index])], o.load
                    );

                    o.ajaxOptions.success && o.ajaxOptions.success(r, s);
                }
            });
            if (this.xhr) {
                // terminate pending requests from other tabs and restore tab label
                this.xhr.abort();
                finish();
            }
            $a.addClass(o.loadingClass);
            setTimeout(function() { // timeout is again required in IE, "wait" for id being restored
                self.xhr = $.ajax(ajaxOptions);
            }, 0);

        },
        url: function(index, url) {
            this.$tabs.eq(index).removeData('cache.tabs').data('load.tabs', url);
        },
        destroy: function() {
            var o = this.options;
            $(this.element).unbind('.tabs')
                .removeClass(o.navClass).removeData('tabs');
            this.$tabs.each(function() {
                var href = $.data(this, 'href.tabs');
                if (href)
                    this.href = href;
                var $this = $(this).unbind('.tabs');
                $.each(['href', 'load', 'cache'], function(i, prefix) {
                      $this.removeData(prefix + '.tabs');
                });
            });
            this.$lis.add(this.$panels).each(function() {
                if ($.data(this, 'destroy.tabs'))
                    $(this).remove();
                else
                    $(this).removeClass([o.selectedClass, o.unselectClass,
                        o.disabledClass, o.panelClass, o.hideClass].join(' '));
            });
        }
    });

/*
 * Tabs Extensions
 */

    /*
     * Rotate
     */
    $.extend($.ui.tabs.prototype, {
        rotation: null,
        rotate: function(ms, continuing) {
            
            continuing = continuing || false;
            
            var self = this, t = this.options.selected;
            
            function start() {
                self.rotation = setInterval(function() {
                    t = ++t < self.$tabs.length ? t : 0;
                    self.select(t);
                }, ms);    
            }
            
            function stop(e) {
                if (!e || e.clientX) { // only in case of a true click
                    clearInterval(self.rotation);
                }
            }
            
            // start interval
            if (ms) {
                start();
                if (!continuing)
                    this.$tabs.bind(this.options.event, stop);
                else
                    this.$tabs.bind(this.options.event, function() {
                        stop();
                        t = self.options.selected;
                        start();
                    });
            }
            // stop interval
            else {
                stop();
                this.$tabs.unbind(this.options.event, stop);
            }
        }
    });

})(jQuery);
/* jQuery UI Date Picker v3.4.3 (previously jQuery Calendar)
   Written by Marc Grabanski (m@marcgrabanski.com) and Keith Wood (kbwood@virginbroadband.com.au).

   Copyright (c) 2007 Marc Grabanski (http://marcgrabanski.com/code/ui-datepicker)
   Dual licensed under the MIT (MIT-LICENSE.txt)
   and GPL (GPL-LICENSE.txt) licenses.
   Date: 09-03-2007  */
   
;(function($) { // hide the namespace

/* Date picker manager.
   Use the singleton instance of this class, $.datepicker, to interact with the date picker.
   Settings for (groups of) date pickers are maintained in an instance object
   (DatepickerInstance), allowing multiple different settings on the same page. */

function Datepicker() {
    this.debug = false; // Change this to true to start debugging
    this._nextId = 0; // Next ID for a date picker instance
    this._inst = []; // List of instances indexed by ID
    this._curInst = null; // The current instance in use
    this._disabledInputs = []; // List of date picker inputs that have been disabled
    this._datepickerShowing = false; // True if the popup picker is showing , false if not
    this._inDialog = false; // True if showing within a "dialog", false if not
    this.regional = []; // Available regional settings, indexed by language code
    this.regional[''] = { // Default regional settings
        clearText: 'Clear', // Display text for clear link
        clearStatus: 'Erase the current date', // Status text for clear link
        closeText: 'Close', // Display text for close link
        closeStatus: 'Close without change', // Status text for close link
        prevText: '&#x3c;Prev', // Display text for previous month link
        prevStatus: 'Show the previous month', // Status text for previous month link
        nextText: 'Next&#x3e;', // Display text for next month link
        nextStatus: 'Show the next month', // Status text for next month link
        currentText: 'Today', // Display text for current month link
        currentStatus: 'Show the current month', // Status text for current month link
        monthNames: ['January','February','March','April','May','June',
            'July','August','September','October','November','December'], // Names of months for drop-down and formatting
        monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], // For formatting
        monthStatus: 'Show a different month', // Status text for selecting a month
        yearStatus: 'Show a different year', // Status text for selecting a year
        weekHeader: 'Wk', // Header for the week of the year column
        weekStatus: 'Week of the year', // Status text for the week of the year column
        dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], // For formatting
        dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], // For formatting
        dayNamesMin: ['Su','Mo','Tu','We','Th','Fr','Sa'], // Column headings for days starting at Sunday
        dayStatus: 'Set DD as first week day', // Status text for the day of the week selection
        dateStatus: 'Select DD, M d', // Status text for the date selection
        dateFormat: 'mm/dd/yy', // See format options on parseDate
        firstDay: 0, // The first day of the week, Sun = 0, Mon = 1, ...
        initStatus: 'Select a date', // Initial Status text on opening
        isRTL: false // True if right-to-left language, false if left-to-right
    };
    this._defaults = { // Global defaults for all the date picker instances
        showOn: 'focus', // 'focus' for popup on focus,
            // 'button' for trigger button, or 'both' for either
        showAnim: 'show', // Name of jQuery animation for popup
        defaultDate: null, // Used when field is blank: actual date,
            // +/-number for offset from today, null for today
        appendText: '', // Display text following the input box, e.g. showing the format
        buttonText: '...', // Text for trigger button
        buttonImage: '', // URL for trigger button image
        buttonImageOnly: false, // True if the image appears alone, false if it appears on a button
        closeAtTop: true, // True to have the clear/close at the top,
            // false to have them at the bottom
        mandatory: false, // True to hide the Clear link, false to include it
        hideIfNoPrevNext: false, // True to hide next/previous month links
            // if not applicable, false to just disable them
        changeMonth: true, // True if month can be selected directly, false if only prev/next
        changeYear: true, // True if year can be selected directly, false if only prev/next
        yearRange: '-10:+10', // Range of years to display in drop-down,
            // either relative to current year (-nn:+nn) or absolute (nnnn:nnnn)
        changeFirstDay: true, // True to click on day name to change, false to remain as set
        showOtherMonths: false, // True to show dates in other months, false to leave blank
        showWeeks: false, // True to show week of the year, false to omit
        calculateWeek: this.iso8601Week, // How to calculate the week of the year,
            // takes a Date and returns the number of the week for it
        shortYearCutoff: '+10', // Short year values < this are in the current century,
            // > this are in the previous century, 
            // string value starting with '+' for current year + value
        showStatus: false, // True to show status bar at bottom, false to not show it
        statusForDate: this.dateStatus, // Function to provide status text for a date -
            // takes date and instance as parameters, returns display text
        minDate: null, // The earliest selectable date, or null for no limit
        maxDate: null, // The latest selectable date, or null for no limit
        speed: 'normal', // Speed of display/closure
        beforeShowDay: null, // Function that takes a date and returns an array with
            // [0] = true if selectable, false if not,
            // [1] = custom CSS class name(s) or '', e.g. $.datepicker.noWeekends
        beforeShow: null, // Function that takes an input field and
            // returns a set of custom settings for the date picker
        onSelect: null, // Define a callback function when a date is selected
        onClose: null, // Define a callback function when the datepicker is closed
        numberOfMonths: 1, // Number of months to show at a time
        stepMonths: 1, // Number of months to step back/forward
        rangeSelect: false, // Allows for selecting a date range on one date picker
        rangeSeparator: ' - ' // Text between two dates in a range
    };
    $.extend(this._defaults, this.regional['']);
    this._datepickerDiv = $('<div id="datepicker_div">');
}

$.extend(Datepicker.prototype, {
    /* Class name added to elements to indicate already configured with a date picker. */
    markerClassName: 'hasDatepicker',

    /* Debug logging (if enabled). */
    log: function () {
        if (this.debug)
            console.log.apply('', arguments);
    },
    
    /* Register a new date picker instance - with custom settings. */
    _register: function(inst) {
        var id = this._nextId++;
        this._inst[id] = inst;
        return id;
    },

    /* Retrieve a particular date picker instance based on its ID. */
    _getInst: function(id) {
        return this._inst[id] || id;
    },

    /* Override the default settings for all instances of the date picker. 
       @param  settings  object - the new settings to use as defaults (anonymous object)
       @return the manager object */
    setDefaults: function(settings) {
        extendRemove(this._defaults, settings || {});
        return this;
    },

    /* Attach the date picker to a jQuery selection.
       @param  target    element - the target input field or division or span
       @param  settings  object - the new settings to use for this date picker instance (anonymous) */
    _attachDatepicker: function(target, settings) {
        // check for settings on the control itself - in namespace 'date:'
        var inlineSettings = null;
        for (attrName in this._defaults) {
            var attrValue = target.getAttribute('date:' + attrName);
            if (attrValue) {
                inlineSettings = inlineSettings || {};
                try {
                    inlineSettings[attrName] = eval(attrValue);
                } catch (err) {
                    inlineSettings[attrName] = attrValue;
                }
            }
        }
        var nodeName = target.nodeName.toLowerCase();
        var instSettings = (inlineSettings ? 
            $.extend(settings || {}, inlineSettings || {}) : settings);
        if (nodeName == 'input') {
            var inst = (inst && !inlineSettings ? inst :
                new DatepickerInstance(instSettings, false));
            this._connectDatepicker(target, inst);
        } else if (nodeName == 'div' || nodeName == 'span') {
            var inst = new DatepickerInstance(instSettings, true);
            this._inlineDatepicker(target, inst);
        }
    },

    /* Detach a datepicker from its control.
       @param  target    element - the target input field or division or span */
    _destroyDatepicker: function(target) {
        var nodeName = target.nodeName.toLowerCase();
        var calId = target._calId;
        target._calId = null;
        var $target = $(target);
        if (nodeName == 'input') {
            $target.siblings('.datepicker_append').replaceWith('').end()
                .siblings('.datepicker_trigger').replaceWith('').end()
                .removeClass(this.markerClassName)
                .unbind('focus', this._showDatepicker)
                .unbind('keydown', this._doKeyDown)
                .unbind('keypress', this._doKeyPress);
            var wrapper = $target.parents('.datepicker_wrap');
            if (wrapper)
                wrapper.replaceWith(wrapper.html());
        } else if (nodeName == 'div' || nodeName == 'span')
            $target.removeClass(this.markerClassName).empty();
        if ($('input[_calId=' + calId + ']').length == 0)
            // clean up if last for this ID
            this._inst[calId] = null;
    },

    /* Enable the date picker to a jQuery selection.
       @param  target    element - the target input field or division or span */
    _enableDatepicker: function(target) {
        target.disabled = false;
        $(target).siblings('button.datepicker_trigger').each(function() { this.disabled = false; }).end()
            .siblings('img.datepicker_trigger').css({opacity: '1.0', cursor: ''});
        this._disabledInputs = $.map(this._disabledInputs,
            function(value) { return (value == target ? null : value); }); // delete entry
    },

    /* Disable the date picker to a jQuery selection.
       @param  target    element - the target input field or division or span */
    _disableDatepicker: function(target) {
        target.disabled = true;
        $(target).siblings('button.datepicker_trigger').each(function() { this.disabled = true; }).end()
            .siblings('img.datepicker_trigger').css({opacity: '0.5', cursor: 'default'});
        this._disabledInputs = $.map($.datepicker._disabledInputs,
            function(value) { return (value == target ? null : value); }); // delete entry
        this._disabledInputs[$.datepicker._disabledInputs.length] = target;
    },

    /* Is the first field in a jQuery collection disabled as a datepicker?
       @param  target    element - the target input field or division or span
       @return boolean - true if disabled, false if enabled */
    _isDisabledDatepicker: function(target) {
        if (!target)
            return false;
        for (var i = 0; i < this._disabledInputs.length; i++) {
            if (this._disabledInputs[i] == target)
                return true;
        }
        return false;
    },

    /* Update the settings for a date picker attached to an input field or division.
       @param  target  element - the target input field or division or span
       @param  name    string - the name of the setting to change or
                       object - the new settings to update
       @param  value   any - the new value for the setting (omit if above is an object) */
    _changeDatepicker: function(target, name, value) {
        var settings = name || {};
        if (typeof name == 'string') {
            settings = {};
            settings[name] = value;
        }
        if (inst = this._getInst(target._calId)) {
            extendRemove(inst._settings, settings);
            this._updateDatepicker(inst);
        }
    },

    /* Set the dates for a jQuery selection.
       @param  target   element - the target input field or division or span
       @param  date     Date - the new date
       @param  endDate  Date - the new end date for a range (optional) */
    _setDateDatepicker: function(target, date, endDate) {
        if (inst = this._getInst(target._calId)) {
            inst._setDate(date, endDate);
            this._updateDatepicker(inst);
        }
    },

    /* Get the date(s) for the first entry in a jQuery selection.
       @param  target  element - the target input field or division or span
       @return Date - the current date or
               Date[2] - the current dates for a range */
    _getDateDatepicker: function(target) {
        var inst = this._getInst(target._calId);
        return (inst ? inst._getDate() : null);
    },

    /* Handle keystrokes. */
    _doKeyDown: function(e) {
        var inst = $.datepicker._getInst(this._calId);
        if ($.datepicker._datepickerShowing)
            switch (e.keyCode) {
                case 9:  $.datepicker._hideDatepicker(null, '');
                        break; // hide on tab out
                case 13: $.datepicker._selectDay(inst, inst._selectedMonth, inst._selectedYear,
                            $('td.datepicker_daysCellOver', inst._datepickerDiv)[0]);
                        return false; // don't submit the form
                        break; // select the value on enter
                case 27: $.datepicker._hideDatepicker(null, inst._get('speed'));
                        break; // hide on escape
                case 33: $.datepicker._adjustDate(inst,
                            (e.ctrlKey ? -1 : -inst._get('stepMonths')), (e.ctrlKey ? 'Y' : 'M'));
                        break; // previous month/year on page up/+ ctrl
                case 34: $.datepicker._adjustDate(inst,
                            (e.ctrlKey ? +1 : +inst._get('stepMonths')), (e.ctrlKey ? 'Y' : 'M'));
                        break; // next month/year on page down/+ ctrl
                case 35: if (e.ctrlKey) $.datepicker._clearDate(inst);
                        break; // clear on ctrl+end
                case 36: if (e.ctrlKey) $.datepicker._gotoToday(inst);
                        break; // current on ctrl+home
                case 37: if (e.ctrlKey) $.datepicker._adjustDate(inst, -1, 'D');
                        break; // -1 day on ctrl+left
                case 38: if (e.ctrlKey) $.datepicker._adjustDate(inst, -7, 'D');
                        break; // -1 week on ctrl+up
                case 39: if (e.ctrlKey) $.datepicker._adjustDate(inst, +1, 'D');
                        break; // +1 day on ctrl+right
                case 40: if (e.ctrlKey) $.datepicker._adjustDate(inst, +7, 'D');
                        break; // +1 week on ctrl+down
            }
        else if (e.keyCode == 36 && e.ctrlKey) // display the date picker on ctrl+home
            $.datepicker._showDatepicker(this);
    },

    /* Filter entered characters - based on date format. */
    _doKeyPress: function(e) {
        var inst = $.datepicker._getInst(this._calId);
        var chars = $.datepicker._possibleChars(inst._get('dateFormat'));
        var chr = String.fromCharCode(e.charCode == undefined ? e.keyCode : e.charCode);
        return e.ctrlKey || (chr < ' ' || !chars || chars.indexOf(chr) > -1);
    },

    /* Attach the date picker to an input field. */
    _connectDatepicker: function(target, inst) {
        var input = $(target);
        if (input.is('.' + this.markerClassName))
            return;
        var appendText = inst._get('appendText');
        var isRTL = inst._get('isRTL');
        if (appendText) {
            if (isRTL)
                input.before('<span class="datepicker_append">' + appendText);
            else
                input.after('<span class="datepicker_append">' + appendText);
        }
        var showOn = inst._get('showOn');
        if (showOn == 'focus' || showOn == 'both') // pop-up date picker when in the marked field
            input.focus(this._showDatepicker);
        if (showOn == 'button' || showOn == 'both') { // pop-up date picker when button clicked
            input.wrap('<span class="datepicker_wrap">');
            var buttonText = inst._get('buttonText');
            var buttonImage = inst._get('buttonImage');
            var trigger = $(inst._get('buttonImageOnly') ? 
                $('<img>').addClass('datepicker_trigger').attr({ src: buttonImage, alt: buttonText, title: buttonText }) :
                $('<button>').addClass('datepicker_trigger').attr({ type: 'button' }).html(buttonImage != '' ? 
                        $('<img>').attr({ src:buttonImage, alt:buttonText, title:buttonText }) : buttonText));
            if (isRTL)
                input.before(trigger);
            else
                input.after(trigger);
            trigger.click(function() {
                if ($.datepicker._datepickerShowing && $.datepicker._lastInput == target)
                    $.datepicker._hideDatepicker();
                else
                    $.datepicker._showDatepicker(target);
            });
        }
        input.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress)
            .bind("setData.datepicker", function(event, key, value) {
                inst._settings[key] = value;
            }).bind("getData.datepicker", function(event, key) {
                return inst._get(key);
            });
        input[0]._calId = inst._id;
    },

    /* Attach an inline date picker to a div. */
    _inlineDatepicker: function(target, inst) {
        var input = $(target);
        if (input.is('.' + this.markerClassName))
            return;
        input.addClass(this.markerClassName).append(inst._datepickerDiv)
            .bind("setData.datepicker", function(event, key, value){
                inst._settings[key] = value;
            }).bind("getData.datepicker", function(event, key){
                return inst._get(key);
            });
        input[0]._calId = inst._id;
        this._updateDatepicker(inst);
    },

    /* Tidy up after displaying the date picker. */
    _inlineShow: function(inst) {
        var numMonths = inst._getNumberOfMonths(); // fix width for dynamic number of date pickers
        inst._datepickerDiv.width(numMonths[1] * $('.datepicker', inst._datepickerDiv[0]).width());
    }, 

    /* Pop-up the date picker in a "dialog" box.
       @param  input     element - ignored
       @param  dateText  string - the initial date to display (in the current format)
       @param  onSelect  function - the function(dateText) to call when a date is selected
       @param  settings  object - update the dialog date picker instance's settings (anonymous object)
       @param  pos       int[2] - coordinates for the dialog's position within the screen or
                         event - with x/y coordinates or
                         leave empty for default (screen centre)
       @return the manager object */
    _dialogDatepicker: function(input, dateText, onSelect, settings, pos) {
        var inst = this._dialogInst; // internal instance
        if (!inst) {
            inst = this._dialogInst = new DatepickerInstance({}, false);
            this._dialogInput = $('<input type="text" size="1" style="position: absolute; top: -100px;"/>');
            this._dialogInput.keydown(this._doKeyDown);
            $('body').append(this._dialogInput);
            this._dialogInput[0]._calId = inst._id;
        }
        extendRemove(inst._settings, settings || {});
        this._dialogInput.val(dateText);

        this._pos = (pos ? (pos.length ? pos : [pos.pageX, pos.pageY]) : null);
        if (!this._pos) {
            var browserWidth = window.innerWidth || document.documentElement.clientWidth ||    document.body.clientWidth;
            var browserHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
            var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
            this._pos = // should use actual width/height below
                [(browserWidth / 2) - 100 + scrollX, (browserHeight / 2) - 150 + scrollY];
        }

        // move input on screen for focus, but hidden behind dialog
        this._dialogInput.css('left', this._pos[0] + 'px').css('top', this._pos[1] + 'px');
        inst._settings.onSelect = onSelect;
        this._inDialog = true;
        this._datepickerDiv.addClass('datepicker_dialog');
        this._showDatepicker(this._dialogInput[0]);
        if ($.blockUI)
            $.blockUI(this._datepickerDiv);
        return this;
    },

    /* Pop-up the date picker for a given input field.
       @param  input  element - the input field attached to the date picker or
                      event - if triggered by focus */
    _showDatepicker: function(input) {
        input = input.target || input;
        if (input.nodeName.toLowerCase() != 'input') // find from button/image trigger
            input = $('input', input.parentNode)[0];
        if ($.datepicker._isDisabledDatepicker(input) || $.datepicker._lastInput == input) // already here
            return;
        var inst = $.datepicker._getInst(input._calId);
        var beforeShow = inst._get('beforeShow');
        extendRemove(inst._settings, (beforeShow ? beforeShow.apply(input, [input, inst]) : {}));
        $.datepicker._hideDatepicker(null, '');
        $.datepicker._lastInput = input;
        inst._setDateFromField(input);
        if ($.datepicker._inDialog) // hide cursor
            input.value = '';
        if (!$.datepicker._pos) { // position below input
            $.datepicker._pos = $.datepicker._findPos(input);
            $.datepicker._pos[1] += input.offsetHeight; // add the height
        }
        var isFixed = false;
        $(input).parents().each(function() {
            isFixed |= $(this).css('position') == 'fixed';
        });
        if (isFixed && $.browser.opera) { // correction for Opera when fixed and scrolled
            $.datepicker._pos[0] -= document.documentElement.scrollLeft;
            $.datepicker._pos[1] -= document.documentElement.scrollTop;
        }
        inst._datepickerDiv.css('position', ($.datepicker._inDialog && $.blockUI ?
            'static' : (isFixed ? 'fixed' : 'absolute')))
            .css({ left: $.datepicker._pos[0] + 'px', top: $.datepicker._pos[1] + 'px' });
        $.datepicker._pos = null;
        inst._rangeStart = null;
        $.datepicker._updateDatepicker(inst);
        if (!inst._inline) {
            var speed = inst._get('speed');
            var postProcess = function() {
                $.datepicker._datepickerShowing = true;
                $.datepicker._afterShow(inst);
            };
            var showAnim = inst._get('showAnim') || 'show';
            inst._datepickerDiv[showAnim](speed, postProcess);
            if (speed == '')
                postProcess();
            if (inst._input[0].type != 'hidden')
                inst._input[0].focus();
            $.datepicker._curInst = inst;
        }
    },

    /* Generate the date picker content. */
    _updateDatepicker: function(inst) {
        inst._datepickerDiv.empty().append(inst._generateDatepicker());
        var numMonths = inst._getNumberOfMonths();
        if (numMonths[0] != 1 || numMonths[1] != 1)
            inst._datepickerDiv.addClass('datepicker_multi');
        else
            inst._datepickerDiv.removeClass('datepicker_multi');

        if (inst._get('isRTL'))
            inst._datepickerDiv.addClass('datepicker_rtl');
        else
            inst._datepickerDiv.removeClass('datepicker_rtl');

        if (inst._input && inst._input[0].type != 'hidden')
            inst._input[0].focus();
    },

    /* Tidy up after displaying the date picker. */
    _afterShow: function(inst) {
        var numMonths = inst._getNumberOfMonths(); // fix width for dynamic number of date pickers
        inst._datepickerDiv.width(numMonths[1] * $('.datepicker', inst._datepickerDiv[0])[0].offsetWidth);
        if ($.browser.msie && parseInt($.browser.version) < 7) { // fix IE < 7 select problems
            $('#datepicker_cover').css({width: inst._datepickerDiv.width() + 4,
                height: inst._datepickerDiv.height() + 4});
        }
        // re-position on screen if necessary
        var isFixed = inst._datepickerDiv.css('position') == 'fixed';
        var pos = inst._input ? $.datepicker._findPos(inst._input[0]) : null;
        var browserWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        var browserHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        var scrollX = (isFixed ? 0 : document.documentElement.scrollLeft || document.body.scrollLeft);
        var scrollY = (isFixed ? 0 : document.documentElement.scrollTop || document.body.scrollTop);
        // reposition date picker horizontally if outside the browser window
        if ((inst._datepickerDiv.offset().left + inst._datepickerDiv.width() -
                (isFixed && $.browser.msie ? document.documentElement.scrollLeft : 0)) >
                (browserWidth + scrollX)) {
            inst._datepickerDiv.css('left', Math.max(scrollX,
                pos[0] + (inst._input ? $(inst._input[0]).width() : null) - inst._datepickerDiv.width() -
                (isFixed && $.browser.opera ? document.documentElement.scrollLeft : 0)) + 'px');
        }
        // reposition date picker vertically if outside the browser window
        if ((inst._datepickerDiv.offset().top + inst._datepickerDiv.height() -
                (isFixed && $.browser.msie ? document.documentElement.scrollTop : 0)) >
                (browserHeight + scrollY) ) {
            inst._datepickerDiv.css('top', Math.max(scrollY,
                pos[1] - (this._inDialog ? 0 : inst._datepickerDiv.height()) -
                (isFixed && $.browser.opera ? document.documentElement.scrollTop : 0)) + 'px');
        }
    },
    
    /* Find an object's position on the screen. */
    _findPos: function(obj) {
        while (obj && (obj.type == 'hidden' || obj.nodeType != 1)) {
            obj = obj.nextSibling;
        }
        var position = $(obj).offset();
        return [position.left, position.top];
    },

    /* Hide the date picker from view.
       @param  input  element - the input field attached to the date picker
       @param  speed  string - the speed at which to close the date picker */
    _hideDatepicker: function(input, speed) {
        var inst = this._curInst;
        if (!inst)
            return;
        var rangeSelect = inst._get('rangeSelect');
        if (rangeSelect && this._stayOpen) {
            this._selectDate(inst, inst._formatDate(
                inst._currentDay, inst._currentMonth, inst._currentYear));
        }
        this._stayOpen = false;
        if (this._datepickerShowing) {
            speed = (speed != null ? speed : inst._get('speed'));
            var showAnim = inst._get('showAnim');
            inst._datepickerDiv[(showAnim == 'slideDown' ? 'slideUp' :
                (showAnim == 'fadeIn' ? 'fadeOut' : 'hide'))](speed, function() {
                $.datepicker._tidyDialog(inst);
            });
            if (speed == '')
                this._tidyDialog(inst);
            var onClose = inst._get('onClose');
            if (onClose) {
                onClose.apply((inst._input ? inst._input[0] : null),
                    [inst._getDate(), inst]);  // trigger custom callback
            }
            this._datepickerShowing = false;
            this._lastInput = null;
            inst._settings.prompt = null;
            if (this._inDialog) {
                this._dialogInput.css({ position: 'absolute', left: '0', top: '-100px' });
                if ($.blockUI) {
                    $.unblockUI();
                    $('body').append(this._datepickerDiv);
                }
            }
            this._inDialog = false;
        }
        this._curInst = null;
    },

    /* Tidy up after a dialog display. */
    _tidyDialog: function(inst) {
        inst._datepickerDiv.removeClass('datepicker_dialog').unbind('.datepicker');
        $('.datepicker_prompt', inst._datepickerDiv).remove();
    },

    /* Close date picker if clicked elsewhere. */
    _checkExternalClick: function(event) {
        if (!$.datepicker._curInst)
            return;
        var $target = $(event.target);
        if (($target.parents("#datepicker_div").length == 0) &&
                ($target.attr('class') != 'datepicker_trigger') &&
                $.datepicker._datepickerShowing && !($.datepicker._inDialog && $.blockUI)) {
            $.datepicker._hideDatepicker(null, '');
        }
    },

    /* Adjust one of the date sub-fields. */
    _adjustDate: function(id, offset, period) {
        var inst = this._getInst(id);
        inst._adjustDate(offset, period);
        this._updateDatepicker(inst);
    },

    /* Action for current link. */
    _gotoToday: function(id) {
        var date = new Date();
        var inst = this._getInst(id);
        inst._selectedDay = date.getDate();
        inst._drawMonth = inst._selectedMonth = date.getMonth();
        inst._drawYear = inst._selectedYear = date.getFullYear();
        this._adjustDate(inst);
    },

    /* Action for selecting a new month/year. */
    _selectMonthYear: function(id, select, period) {
        var inst = this._getInst(id);
        inst._selectingMonthYear = false;
        inst[period == 'M' ? '_drawMonth' : '_drawYear'] =
            select.options[select.selectedIndex].value - 0;
        this._adjustDate(inst);
    },

    /* Restore input focus after not changing month/year. */
    _clickMonthYear: function(id) {
        var inst = this._getInst(id);
        if (inst._input && inst._selectingMonthYear && !$.browser.msie)
            inst._input[0].focus();
        inst._selectingMonthYear = !inst._selectingMonthYear;
    },

    /* Action for changing the first week day. */
    _changeFirstDay: function(id, day) {
        var inst = this._getInst(id);
        inst._settings.firstDay = day;
        this._updateDatepicker(inst);
    },

    /* Action for selecting a day. */
    _selectDay: function(id, month, year, td) {
        if ($(td).is('.datepicker_unselectable'))
            return;
        var inst = this._getInst(id);
        var rangeSelect = inst._get('rangeSelect');
        if (rangeSelect) {
            if (!this._stayOpen) {
                $('.datepicker td').removeClass('datepicker_currentDay');
                $(td).addClass('datepicker_currentDay');
            } 
            this._stayOpen = !this._stayOpen;
        }
        inst._selectedDay = inst._currentDay = $('a', td).html();
        inst._selectedMonth = inst._currentMonth = month;
        inst._selectedYear = inst._currentYear = year;
        this._selectDate(id, inst._formatDate(
            inst._currentDay, inst._currentMonth, inst._currentYear));
        if (this._stayOpen) {
            inst._endDay = inst._endMonth = inst._endYear = null;
            inst._rangeStart = new Date(inst._currentYear, inst._currentMonth, inst._currentDay);
            this._updateDatepicker(inst);
        }
        else if (rangeSelect) {
            inst._endDay = inst._currentDay;
            inst._endMonth = inst._currentMonth;
            inst._endYear = inst._currentYear;
            inst._selectedDay = inst._currentDay = inst._rangeStart.getDate();
            inst._selectedMonth = inst._currentMonth = inst._rangeStart.getMonth();
            inst._selectedYear = inst._currentYear = inst._rangeStart.getFullYear();
            inst._rangeStart = null;
            if (inst._inline)
                this._updateDatepicker(inst);
        }
    },

    /* Erase the input field and hide the date picker. */
    _clearDate: function(id) {
        var inst = this._getInst(id);
        if (inst._get('mandatory'))
            return;
        this._stayOpen = false;
        inst._endDay = inst._endMonth = inst._endYear = inst._rangeStart = null;
        this._selectDate(inst, '');
    },

    /* Update the input field with the selected date. */
    _selectDate: function(id, dateStr) {
        var inst = this._getInst(id);
        dateStr = (dateStr != null ? dateStr : inst._formatDate());
        if (inst._rangeStart)
            dateStr = inst._formatDate(inst._rangeStart) + inst._get('rangeSeparator') + dateStr;
        if (inst._input)
            inst._input.val(dateStr);
        var onSelect = inst._get('onSelect');
        if (onSelect)
            onSelect.apply((inst._input ? inst._input[0] : null), [dateStr, inst]);  // trigger custom callback
        else if (inst._input)
            inst._input.trigger('change'); // fire the change event
        if (inst._inline)
            this._updateDatepicker(inst);
        else if (!this._stayOpen) {
            this._hideDatepicker(null, inst._get('speed'));
            this._lastInput = inst._input[0];
            if (typeof(inst._input[0]) != 'object')
                inst._input[0].focus(); // restore focus
            this._lastInput = null;
        }
    },

    /* Set as beforeShowDay function to prevent selection of weekends.
       @param  date  Date - the date to customise
       @return [boolean, string] - is this date selectable?, what is its CSS class? */
    noWeekends: function(date) {
        var day = date.getDay();
        return [(day > 0 && day < 6), ''];
    },
    
    /* Set as calculateWeek to determine the week of the year based on the ISO 8601 definition.
       @param  date  Date - the date to get the week for
       @return  number - the number of the week within the year that contains this date */
    iso8601Week: function(date) {
        var checkDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), (date.getTimezoneOffset() / -60));
        var firstMon = new Date(checkDate.getFullYear(), 1 - 1, 4); // First week always contains 4 Jan
        var firstDay = firstMon.getDay() || 7; // Day of week: Mon = 1, ..., Sun = 7
        firstMon.setDate(firstMon.getDate() + 1 - firstDay); // Preceding Monday
        if (firstDay < 4 && checkDate < firstMon) { // Adjust first three days in year if necessary
            checkDate.setDate(checkDate.getDate() - 3); // Generate for previous year
            return $.datepicker.iso8601Week(checkDate);
        } else if (checkDate > new Date(checkDate.getFullYear(), 12 - 1, 28)) { // Check last three days in year
            firstDay = new Date(checkDate.getFullYear() + 1, 1 - 1, 4).getDay() || 7;
            if (firstDay > 4 && (checkDate.getDay() || 7) < firstDay - 3) { // Adjust if necessary
                checkDate.setDate(checkDate.getDate() + 3); // Generate for next year
                return $.datepicker.iso8601Week(checkDate);
            }
        }
        return Math.floor(((checkDate - firstMon) / 86400000) / 7) + 1; // Weeks to given date
    },
    
    /* Provide status text for a particular date.
       @param  date  the date to get the status for
       @param  inst  the current datepicker instance
       @return  the status display text for this date */
    dateStatus: function(date, inst) {
        return $.datepicker.formatDate(inst._get('dateStatus'), date, inst._getFormatConfig());
    },

    /* Parse a string value into a date object.
       The format can be combinations of the following:
       d  - day of month (no leading zero)
       dd - day of month (two digit)
       D  - day name short
       DD - day name long
       m  - month of year (no leading zero)
       mm - month of year (two digit)
       M  - month name short
       MM - month name long
       y  - year (two digit)
       yy - year (four digit)
       '...' - literal text
       '' - single quote

       @param  format           String - the expected format of the date
       @param  value            String - the date in the above format
       @param  settings  Object - attributes include:
                         shortYearCutoff  Number - the cutoff year for determining the century (optional)
                         dayNamesShort    String[7] - abbreviated names of the days from Sunday (optional)
                         dayNames         String[7] - names of the days from Sunday (optional)
                         monthNamesShort  String[12] - abbreviated names of the months (optional)
                         monthNames       String[12] - names of the months (optional)
       @return  Date - the extracted date value or null if value is blank */
    parseDate: function (format, value, settings) {
        if (format == null || value == null)
            throw 'Invalid arguments';
        value = (typeof value == 'object' ? value.toString() : value + '');
        if (value == '')
            return null;
        var shortYearCutoff = (settings ? settings.shortYearCutoff : null) || this._defaults.shortYearCutoff;
        var dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort;
        var dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames;
        var monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort;
        var monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames;
        var year = -1;
        var month = -1;
        var day = -1;
        var literal = false;
        // Check whether a format character is doubled
        var lookAhead = function(match) {
            var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
            if (matches)
                iFormat++;
            return matches;    
        };
        // Extract a number from the string value
        var getNumber = function(match) {
            lookAhead(match);
            var size = (match == 'y' ? 4 : 2);
            var num = 0;
            while (size > 0 && iValue < value.length &&
                    value.charAt(iValue) >= '0' && value.charAt(iValue) <= '9') {
                num = num * 10 + (value.charAt(iValue++) - 0);
                size--;
            }
            if (size == (match == 'y' ? 4 : 2))
                throw 'Missing number at position ' + iValue;
            return num;
        };
        // Extract a name from the string value and convert to an index
        var getName = function(match, shortNames, longNames) {
            var names = (lookAhead(match) ? longNames : shortNames);
            var size = 0;
            for (var j = 0; j < names.length; j++)
                size = Math.max(size, names[j].length);
            var name = '';
            var iInit = iValue;
            while (size > 0 && iValue < value.length) {
                name += value.charAt(iValue++);
                for (var i = 0; i < names.length; i++)
                    if (name == names[i])
                        return i + 1;
                size--;
            }
            throw 'Unknown name at position ' + iInit;
        };
        // Confirm that a literal character matches the string value
        var checkLiteral = function() {
            if (value.charAt(iValue) != format.charAt(iFormat))
                throw 'Unexpected literal at position ' + iValue;
            iValue++;
        };
        var iValue = 0;
        for (var iFormat = 0; iFormat < format.length; iFormat++) {
            if (literal)
                if (format.charAt(iFormat) == "'" && !lookAhead("'"))
                    literal = false;
                else
                    checkLiteral();
            else
                switch (format.charAt(iFormat)) {
                    case 'd':
                        day = getNumber('d');
                        break;
                    case 'D': 
                        getName('D', dayNamesShort, dayNames);
                        break;
                    case 'm': 
                        month = getNumber('m');
                        break;
                    case 'M':
                        month = getName('M', monthNamesShort, monthNames); 
                        break;
                    case 'y':
                        year = getNumber('y');
                        break;
                    case "'":
                        if (lookAhead("'"))
                            checkLiteral();
                        else
                            literal = true;
                        break;
                    default:
                        checkLiteral();
                }
        }
        if (year < 100) {
            year += new Date().getFullYear() - new Date().getFullYear() % 100 +
                (year <= shortYearCutoff ? 0 : -100);
        }
        var date = new Date(year, month - 1, day);
        if (date.getFullYear() != year || date.getMonth() + 1 != month || date.getDate() != day) {
            throw 'Invalid date'; // E.g. 31/02/*
        }
        return date;
    },

    /* Format a date object into a string value.
       The format can be combinations of the following:
       d  - day of month (no leading zero)
       dd - day of month (two digit)
       D  - day name short
       DD - day name long
       m  - month of year (no leading zero)
       mm - month of year (two digit)
       M  - month name short
       MM - month name long
       y  - year (two digit)
       yy - year (four digit)
       '...' - literal text
       '' - single quote

       @param  format    String - the desired format of the date
       @param  date      Date - the date value to format
       @param  settings  Object - attributes include:
                         dayNamesShort    String[7] - abbreviated names of the days from Sunday (optional)
                         dayNames         String[7] - names of the days from Sunday (optional)
                         monthNamesShort  String[12] - abbreviated names of the months (optional)
                         monthNames       String[12] - names of the months (optional)
       @return  String - the date in the above format */
    formatDate: function (format, date, settings) {
        if (!date)
            return '';
        var dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort;
        var dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames;
        var monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort;
        var monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames;
        // Check whether a format character is doubled
        var lookAhead = function(match) {
            var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
            if (matches)
                iFormat++;
            return matches;    
        };
        // Format a number, with leading zero if necessary
        var formatNumber = function(match, value) {
            return (lookAhead(match) && value < 10 ? '0' : '') + value;
        };
        // Format a name, short or long as requested
        var formatName = function(match, value, shortNames, longNames) {
            return (lookAhead(match) ? longNames[value] : shortNames[value]);
        };
        var output = '';
        var literal = false;
        if (date) {
            for (var iFormat = 0; iFormat < format.length; iFormat++) {
                if (literal)
                    if (format.charAt(iFormat) == "'" && !lookAhead("'"))
                        literal = false;
                    else
                        output += format.charAt(iFormat);
                else
                    switch (format.charAt(iFormat)) {
                        case 'd':
                            output += formatNumber('d', date.getDate()); 
                            break;
                        case 'D': 
                            output += formatName('D', date.getDay(), dayNamesShort, dayNames);
                            break;
                        case 'm': 
                            output += formatNumber('m', date.getMonth() + 1); 
                            break;
                        case 'M':
                            output += formatName('M', date.getMonth(), monthNamesShort, monthNames); 
                            break;
                        case 'y':
                            output += (lookAhead('y') ? date.getFullYear() : 
                                (date.getYear() % 100 < 10 ? '0' : '') + date.getYear() % 100);
                            break;
                        case "'":
                            if (lookAhead("'"))
                                output += "'";
                            else
                                literal = true;
                            break;
                        default:
                            output += format.charAt(iFormat);
                    }
            }
        }
        return output;
    },

    /* Extract all possible characters from the date format. */
    _possibleChars: function (format) {
        var chars = '';
        var literal = false;
        for (var iFormat = 0; iFormat < format.length; iFormat++)
            if (literal)
                if (format.charAt(iFormat) == "'" && !lookAhead("'"))
                    literal = false;
                else
                    chars += format.charAt(iFormat);
            else
                switch (format.charAt(iFormat)) {
                    case 'd' || 'm' || 'y':
                        chars += '0123456789'; 
                        break;
                    case 'D' || 'M':
                        return null; // Accept anything
                    case "'":
                        if (lookAhead("'"))
                            chars += "'";
                        else
                            literal = true;
                        break;
                    default:
                        chars += format.charAt(iFormat);
                }
        return chars;
    }
});

/* Individualised settings for date picker functionality applied to one or more related inputs.
   Instances are managed and manipulated through the Datepicker manager. */
function DatepickerInstance(settings, inline) {
    this._id = $.datepicker._register(this);
    this._selectedDay = 0; // Current date for selection
    this._selectedMonth = 0; // 0-11
    this._selectedYear = 0; // 4-digit year
    this._drawMonth = 0; // Current month at start of datepicker
    this._drawYear = 0;
    this._input = null; // The attached input field
    this._inline = inline; // True if showing inline, false if used in a popup
    this._datepickerDiv = (!inline ? $.datepicker._datepickerDiv :
        $('<div id="datepicker_div_' + this._id + '" class="datepicker_inline">'));
    // customise the date picker object - uses manager defaults if not overridden
    this._settings = extendRemove(settings || {}); // clone
    if (inline)
        this._setDate(this._getDefaultDate());
}

$.extend(DatepickerInstance.prototype, {
    /* Get a setting value, defaulting if necessary. */
    _get: function(name) {
        return this._settings[name] || $.datepicker._defaults[name];
    },

    /* Parse existing date and initialise date picker. */
    _setDateFromField: function(input) {
        this._input = $(input);
        var dateFormat = this._get('dateFormat');
        var dates = this._input ? this._input.val().split(this._get('rangeSeparator')) : null; 
        this._endDay = this._endMonth = this._endYear = null;
        var date = defaultDate = this._getDefaultDate();
        if (dates.length > 0) {
            var settings = this._getFormatConfig();
            if (dates.length > 1) {
                date = $.datepicker.parseDate(dateFormat, dates[1], settings) || defaultDate;
                this._endDay = date.getDate();
                this._endMonth = date.getMonth();
                this._endYear = date.getFullYear();
            }
            try {
                date = $.datepicker.parseDate(dateFormat, dates[0], settings) || defaultDate;
            } catch (e) {
                $.datepicker.log(e);
                date = defaultDate;
            }
        }
        this._selectedDay = date.getDate();
        this._drawMonth = this._selectedMonth = date.getMonth();
        this._drawYear = this._selectedYear = date.getFullYear();
        this._currentDay = (dates[0] ? date.getDate() : 0);
        this._currentMonth = (dates[0] ? date.getMonth() : 0);
        this._currentYear = (dates[0] ? date.getFullYear() : 0);
        this._adjustDate();
    },
    
    /* Retrieve the default date shown on opening. */
    _getDefaultDate: function() {
        var date = this._determineDate('defaultDate', new Date());
        var minDate = this._getMinMaxDate('min', true);
        var maxDate = this._getMinMaxDate('max');
        date = (minDate && date < minDate ? minDate : date);
        date = (maxDate && date > maxDate ? maxDate : date);
        return date;
    },

    /* A date may be specified as an exact value or a relative one. */
    _determineDate: function(name, defaultDate) {
        var offsetNumeric = function(offset) {
            var date = new Date();
            date.setDate(date.getDate() + offset);
            return date;
        };
        var offsetString = function(offset, getDaysInMonth) {
            var date = new Date();
            var matches = /^([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?$/.exec(offset);
            if (matches) {
                var year = date.getFullYear();
                var month = date.getMonth();
                var day = date.getDate();
                switch (matches[2] || 'd') {
                    case 'd' : case 'D' :
                        day += (matches[1] - 0); break;
                    case 'w' : case 'W' :
                        day += (matches[1] * 7); break;
                    case 'm' : case 'M' :
                        month += (matches[1] - 0); 
                        day = Math.min(day, getDaysInMonth(year, month));
                        break;
                    case 'y': case 'Y' :
                        year += (matches[1] - 0);
                        day = Math.min(day, getDaysInMonth(year, month));
                        break;
                }
                date = new Date(year, month, day);
            }
            return date;
        };
        var date = this._get(name);
        return (date == null ? defaultDate :
            (typeof date == 'string' ? offsetString(date, this._getDaysInMonth) :
            (typeof date == 'number' ? offsetNumeric(date) : date)));
    },

    /* Set the date(s) directly. */
    _setDate: function(date, endDate) {
        this._selectedDay = this._currentDay = date.getDate();
        this._drawMonth = this._selectedMonth = this._currentMonth = date.getMonth();
        this._drawYear = this._selectedYear = this._currentYear = date.getFullYear();
        if (this._get('rangeSelect')) {
            if (endDate) {
                this._endDay = endDate.getDate();
                this._endMonth = endDate.getMonth();
                this._endYear = endDate.getFullYear();
            } else {
                this._endDay = this._currentDay;
                this._endMonth = this._currentMonth;
                this._endYear = this._currentYear;
            }
        }
        this._adjustDate();
    },

    /* Retrieve the date(s) directly. */
    _getDate: function() {
        var startDate = (!this._currentYear || (this._input && this._input.val() == '') ? null :
            new Date(this._currentYear, this._currentMonth, this._currentDay));
        if (this._get('rangeSelect')) {
            return [startDate, (!this._endYear ? null :
                new Date(this._endYear, this._endMonth, this._endDay))];
        } else
            return startDate;
    },

    /* Generate the HTML for the current state of the date picker. */
    _generateDatepicker: function() {
        var today = new Date();
        today = new Date(today.getFullYear(), today.getMonth(), today.getDate()); // clear time
        var showStatus = this._get('showStatus');
        var isRTL = this._get('isRTL');
        // build the date picker HTML
        var clear = (this._get('mandatory') ? '' :
            '<div class="datepicker_clear"><a onclick="jQuery.datepicker._clearDate(' + this._id + ');"' + 
            (showStatus ? this._addStatus(this._get('clearStatus') || '&#xa0;') : '') + '>' +
            this._get('clearText') + '</a></div>');
        var controls = '<div class="datepicker_control">' + (isRTL ? '' : clear) +
            '<div class="datepicker_close"><a onclick="jQuery.datepicker._hideDatepicker();"' +
            (showStatus ? this._addStatus(this._get('closeStatus') || '&#xa0;') : '') + '>' +
            this._get('closeText') + '</a></div>' + (isRTL ? clear : '')  + '</div>';
        var prompt = this._get('prompt');
        var closeAtTop = this._get('closeAtTop');
        var hideIfNoPrevNext = this._get('hideIfNoPrevNext');
        var numMonths = this._getNumberOfMonths();
        var stepMonths = this._get('stepMonths');
        var isMultiMonth = (numMonths[0] != 1 || numMonths[1] != 1);
        var minDate = this._getMinMaxDate('min', true);
        var maxDate = this._getMinMaxDate('max');
        var drawMonth = this._drawMonth;
        var drawYear = this._drawYear;
        if (maxDate) {
            var maxDraw = new Date(maxDate.getFullYear(),
                maxDate.getMonth() - numMonths[1] + 1, maxDate.getDate());
            maxDraw = (minDate && maxDraw < minDate ? minDate : maxDraw);
            while (new Date(drawYear, drawMonth, 1) > maxDraw) {
                drawMonth--;
                if (drawMonth < 0) {
                    drawMonth = 11;
                    drawYear--;
                }
            }
        }
        // controls and links
        var prev = '<div class="datepicker_prev">' + (this._canAdjustMonth(-1, drawYear, drawMonth) ? 
            '<a onclick="jQuery.datepicker._adjustDate(' + this._id + ', -' + stepMonths + ', \'M\');"' +
            (showStatus ? this._addStatus(this._get('prevStatus') || '&#xa0;') : '') + '>' +
            this._get('prevText') + '</a>' :
            (hideIfNoPrevNext ? '' : '<label>' + this._get('prevText') + '</label>')) + '</div>';
        var next = '<div class="datepicker_next">' + (this._canAdjustMonth(+1, drawYear, drawMonth) ?
            '<a onclick="jQuery.datepicker._adjustDate(' + this._id + ', +' + stepMonths + ', \'M\');"' +
            (showStatus ? this._addStatus(this._get('nextStatus') || '&#xa0;') : '') + '>' +
            this._get('nextText') + '</a>' :
            (hideIfNoPrevNext ? '>' : '<label>' + this._get('nextText') + '</label>')) + '</div>';
        var html = (prompt ? '<div class="datepicker_prompt">' + prompt + '</div>' : '') +
            (closeAtTop && !this._inline ? controls : '') +
            '<div class="datepicker_links">' + (isRTL ? next : prev) +
            (this._isInRange(today) ? '<div class="datepicker_current">' +
            '<a onclick="jQuery.datepicker._gotoToday(' + this._id + ');"' +
            (showStatus ? this._addStatus(this._get('currentStatus') || '&#xa0;') : '') + '>' +
            this._get('currentText') + '</a></div>' : '') + (isRTL ? prev : next) + '</div>';
        var showWeeks = this._get('showWeeks');
        for (var row = 0; row < numMonths[0]; row++)
            for (var col = 0; col < numMonths[1]; col++) {
                var selectedDate = new Date(drawYear, drawMonth, this._selectedDay);
                html += '<div class="datepicker_oneMonth' + (col == 0 ? ' datepicker_newRow' : '') + '">' +
                    this._generateMonthYearHeader(drawMonth, drawYear, minDate, maxDate,
                    selectedDate, row > 0 || col > 0) + // draw month headers
                    '<table class="datepicker" cellpadding="0" cellspacing="0"><thead>' + 
                    '<tr class="datepicker_titleRow">' +
                    (showWeeks ? '<td>' + this._get('weekHeader') + '</td>' : '');
                var firstDay = this._get('firstDay');
                var changeFirstDay = this._get('changeFirstDay');
                var dayNames = this._get('dayNames');
                var dayNamesShort = this._get('dayNamesShort');
                var dayNamesMin = this._get('dayNamesMin');
                for (var dow = 0; dow < 7; dow++) { // days of the week
                    var day = (dow + firstDay) % 7;
                    var status = this._get('dayStatus') || '&#xa0;';
                    status = (status.indexOf('DD') > -1 ? status.replace(/DD/, dayNames[day]) :
                        status.replace(/D/, dayNamesShort[day]));
                    html += '<td' + ((dow + firstDay + 6) % 7 >= 5 ? ' class="datepicker_weekEndCell"' : '') + '>' +
                        (!changeFirstDay ? '<span' :
                        '<a onclick="jQuery.datepicker._changeFirstDay(' + this._id + ', ' + day + ');"') + 
                        (showStatus ? this._addStatus(status) : '') + ' title="' + dayNames[day] + '">' +
                        dayNamesMin[day] + (changeFirstDay ? '</a>' : '</span>') + '</td>';
                }
                html += '</tr></thead><tbody>';
                var daysInMonth = this._getDaysInMonth(drawYear, drawMonth);
                if (drawYear == this._selectedYear && drawMonth == this._selectedMonth) {
                    this._selectedDay = Math.min(this._selectedDay, daysInMonth);
                }
                var leadDays = (this._getFirstDayOfMonth(drawYear, drawMonth) - firstDay + 7) % 7;
                var currentDate = (!this._currentDay ? new Date(9999, 9, 9) :
                    new Date(this._currentYear, this._currentMonth, this._currentDay));
                var endDate = this._endDay ? new Date(this._endYear, this._endMonth, this._endDay) : currentDate;
                var printDate = new Date(drawYear, drawMonth, 1 - leadDays);
                var numRows = (isMultiMonth ? 6 : Math.ceil((leadDays + daysInMonth) / 7)); // calculate the number of rows to generate
                var beforeShowDay = this._get('beforeShowDay');
                var showOtherMonths = this._get('showOtherMonths');
                var calculateWeek = this._get('calculateWeek') || $.datepicker.iso8601Week;
                var dateStatus = this._get('statusForDate') || $.datepicker.dateStatus;
                for (var dRow = 0; dRow < numRows; dRow++) { // create date picker rows
                    html += '<tr class="datepicker_daysRow">' +
                        (showWeeks ? '<td class="datepicker_weekCol">' + calculateWeek(printDate) + '</td>' : '');
                    for (var dow = 0; dow < 7; dow++) { // create date picker days
                        var daySettings = (beforeShowDay ?
                            beforeShowDay.apply((this._input ? this._input[0] : null), [printDate]) : [true, '']);
                        var otherMonth = (printDate.getMonth() != drawMonth);
                        var unselectable = otherMonth || !daySettings[0] ||
                            (minDate && printDate < minDate) || (maxDate && printDate > maxDate);
                        html += '<td class="datepicker_daysCell' +
                            ((dow + firstDay + 6) % 7 >= 5 ? ' datepicker_weekEndCell' : '') + // highlight weekends
                            (otherMonth ? ' datepicker_otherMonth' : '') + // highlight days from other months
                            (printDate.getTime() == selectedDate.getTime() && drawMonth == this._selectedMonth ?
                            ' datepicker_daysCellOver' : '') + // highlight selected day
                            (unselectable ? ' datepicker_unselectable' : '') +  // highlight unselectable days
                            (otherMonth && !showOtherMonths ? '' : ' ' + daySettings[1] + // highlight custom dates
                            (printDate.getTime() >= currentDate.getTime() && printDate.getTime() <= endDate.getTime() ?  // in current range
                            ' datepicker_currentDay' : '') + // highlight selected day
                            (printDate.getTime() == today.getTime() ? ' datepicker_today' : '')) + '"' + // highlight today (if different)
                            (unselectable ? '' : ' onmouseover="jQuery(this).addClass(\'datepicker_daysCellOver\');' +
                            (!showStatus || (otherMonth && !showOtherMonths) ? '' : 'jQuery(\'#datepicker_status_' +
                            this._id + '\').html(\'' + (dateStatus.apply((this._input ? this._input[0] : null),
                            [printDate, this]) || '&#xa0;') +'\');') + '"' +
                            ' onmouseout="jQuery(this).removeClass(\'datepicker_daysCellOver\');' +
                            (!showStatus || (otherMonth && !showOtherMonths) ? '' : 'jQuery(\'#datepicker_status_' +
                            this._id + '\').html(\'&#xa0;\');') + '" onclick="jQuery.datepicker._selectDay(' +
                            this._id + ',' + drawMonth + ',' + drawYear + ', this);"') + '>' + // actions
                            (otherMonth ? (showOtherMonths ? printDate.getDate() : '&#xa0;') : // display for other months
                            (unselectable ? printDate.getDate() : '<a>' + printDate.getDate() + '</a>')) + '</td>'; // display for this month
                        printDate.setDate(printDate.getDate() + 1);
                    }
                    html += '</tr>';
                }
                drawMonth++;
                if (drawMonth > 11) {
                    drawMonth = 0;
                    drawYear++;
                }
                html += '</tbody></table></div>';
            }
        html += (showStatus ? '<div id="datepicker_status_' + this._id + 
            '" class="datepicker_status">' + (this._get('initStatus') || '&#xa0;') + '</div>' : '') +
            (!closeAtTop && !this._inline ? controls : '') +
            '<div style="clear: both;"></div>' + 
            ($.browser.msie && parseInt($.browser.version) < 7 && !this._inline ? 
            '<iframe src="javascript:false;" class="datepicker_cover"></iframe>' : '');
        return html;
    },
    
    /* Generate the month and year header. */
    _generateMonthYearHeader: function(drawMonth, drawYear, minDate, maxDate, selectedDate, secondary) {
        minDate = (this._rangeStart && minDate && selectedDate < minDate ? selectedDate : minDate);
        var showStatus = this._get('showStatus');
        var html = '<div class="datepicker_header">';
        // month selection
        var monthNames = this._get('monthNames');
        if (secondary || !this._get('changeMonth'))
            html += monthNames[drawMonth] + '&#xa0;';
            
        else {
            var inMinYear = (minDate && minDate.getFullYear() == drawYear);
            var inMaxYear = (maxDate && maxDate.getFullYear() == drawYear);
            html += '<select class="datepicker_newMonth" ' +
                'onchange="jQuery.datepicker._selectMonthYear(' + this._id + ', this, \'M\');" ' +
                'onclick="jQuery.datepicker._clickMonthYear(' + this._id + ');"' +
                (showStatus ? this._addStatus(this._get('monthStatus') || '&#xa0;') : '') + '>';
            for (var month = 0; month < 12; month++) {
                if ((!inMinYear || month >= minDate.getMonth()) &&
                        (!inMaxYear || month <= maxDate.getMonth())) {
                    html += '<option value="' + month + '"' +
                        (month == drawMonth ? ' selected="selected"' : '') +
                        '>' + monthNames[month] + '</option>';
                }
            }
            html += '</select>';
        }
        // year selection
        if (secondary || !this._get('changeYear'))
            html += drawYear;
        else {
            // determine range of years to display
            var years = this._get('yearRange').split(':');
            var year = 0;
            var endYear = 0;
            if (years.length != 2) {
                year = drawYear - 10;
                endYear = drawYear + 10;
            } else if (years[0].charAt(0) == '+' || years[0].charAt(0) == '-') {
                year = drawYear + parseInt(years[0], 10);
                endYear = drawYear + parseInt(years[1], 10);
            } else {
                year = parseInt(years[0], 10);
                endYear = parseInt(years[1], 10);
            }
            year = (minDate ? Math.max(year, minDate.getFullYear()) : year);
            endYear = (maxDate ? Math.min(endYear, maxDate.getFullYear()) : endYear);
            html += '<select class="datepicker_newYear" ' +
                'onchange="jQuery.datepicker._selectMonthYear(' + this._id + ', this, \'Y\');" ' +
                'onclick="jQuery.datepicker._clickMonthYear(' + this._id + ');"' +
                (showStatus ? this._addStatus(this._get('yearStatus') || '&#xa0;') : '') + '>';
            for (; year <= endYear; year++) {
                html += '<option value="' + year + '"' +
                    (year == drawYear ? ' selected="selected"' : '') +
                    '>' + year + '</option>';
            }
            html += '</select>';
        }
        html += '</div>'; // Close datepicker_header
        return html;
    },

    /* Provide code to set and clear the status panel. */
    _addStatus: function(text) {
        return ' onmouseover="jQuery(\'#datepicker_status_' + this._id + '\').html(\'' + text + '\');" ' +
            'onmouseout="jQuery(\'#datepicker_status_' + this._id + '\').html(\'&#xa0;\');"';
    },

    /* Adjust one of the date sub-fields. */
    _adjustDate: function(offset, period) {
        var year = this._drawYear + (period == 'Y' ? offset : 0);
        var month = this._drawMonth + (period == 'M' ? offset : 0);
        var day = Math.min(this._selectedDay, this._getDaysInMonth(year, month)) +
            (period == 'D' ? offset : 0);
        var date = new Date(year, month, day);
        // ensure it is within the bounds set
        var minDate = this._getMinMaxDate('min', true);
        var maxDate = this._getMinMaxDate('max');
        date = (minDate && date < minDate ? minDate : date);
        date = (maxDate && date > maxDate ? maxDate : date);
        this._selectedDay = date.getDate();
        this._drawMonth = this._selectedMonth = date.getMonth();
        this._drawYear = this._selectedYear = date.getFullYear();
    },
    
    /* Determine the number of months to show. */
    _getNumberOfMonths: function() {
        var numMonths = this._get('numberOfMonths');
        return (numMonths == null ? [1, 1] : (typeof numMonths == 'number' ? [1, numMonths] : numMonths));
    },

    /* Determine the current maximum date - ensure no time components are set - may be overridden for a range. */
    _getMinMaxDate: function(minMax, checkRange) {
        var date = this._determineDate(minMax + 'Date', null);
        if (date) {
            date.setHours(0);
            date.setMinutes(0);
            date.setSeconds(0);
            date.setMilliseconds(0);
        }
        return date || (checkRange ? this._rangeStart : null);
    },

    /* Find the number of days in a given month. */
    _getDaysInMonth: function(year, month) {
        return 32 - new Date(year, month, 32).getDate();
    },

    /* Find the day of the week of the first of a month. */
    _getFirstDayOfMonth: function(year, month) {
        return new Date(year, month, 1).getDay();
    },

    /* Determines if we should allow a "next/prev" month display change. */
    _canAdjustMonth: function(offset, curYear, curMonth) {
        var numMonths = this._getNumberOfMonths();
        var date = new Date(curYear, curMonth + (offset < 0 ? offset : numMonths[1]), 1);
        if (offset < 0)
            date.setDate(this._getDaysInMonth(date.getFullYear(), date.getMonth()));
        return this._isInRange(date);
    },

    /* Is the given date in the accepted range? */
    _isInRange: function(date) {
        // during range selection, use minimum of selected date and range start
        var newMinDate = (!this._rangeStart ? null :
            new Date(this._selectedYear, this._selectedMonth, this._selectedDay));
        newMinDate = (newMinDate && this._rangeStart < newMinDate ? this._rangeStart : newMinDate);
        var minDate = newMinDate || this._getMinMaxDate('min');
        var maxDate = this._getMinMaxDate('max');
        return ((!minDate || date >= minDate) && (!maxDate || date <= maxDate));
    },
    
    /* Provide the configuration settings for formatting/parsing. */
    _getFormatConfig: function() {
        var shortYearCutoff = this._get('shortYearCutoff');
        shortYearCutoff = (typeof shortYearCutoff != 'string' ? shortYearCutoff :
            new Date().getFullYear() % 100 + parseInt(shortYearCutoff, 10));
        return {shortYearCutoff: shortYearCutoff,
            dayNamesShort: this._get('dayNamesShort'), dayNames: this._get('dayNames'),
            monthNamesShort: this._get('monthNamesShort'), monthNames: this._get('monthNames')};
    },

    /* Format the given date for display. */
    _formatDate: function(day, month, year) {
        if (!day) {
            this._currentDay = this._selectedDay;
            this._currentMonth = this._selectedMonth;
            this._currentYear = this._selectedYear;
        }
        var date = (day ? (typeof day == 'object' ? day : new Date(year, month, day)) :
            new Date(this._currentYear, this._currentMonth, this._currentDay));
        return $.datepicker.formatDate(this._get('dateFormat'), date, this._getFormatConfig());
    }
});

/* jQuery extend now ignores nulls! */
function extendRemove(target, props) {
    $.extend(target, props);
    for (var name in props)
        if (props[name] == null)
            target[name] = null;
    return target;
};

/* Invoke the datepicker functionality.
   @param  options  String - a command, optionally followed by additional parameters or
                    Object - settings for attaching new datepicker functionality
   @return  jQuery object */
$.fn.datepicker = function(options){
    var otherArgs = Array.prototype.slice.call(arguments, 1);
    if (typeof options == 'string' && (options == 'isDisabled' || options == 'getDate')) {
        return $.datepicker['_' + options + 'Datepicker'].apply($.datepicker, [this[0]].concat(otherArgs));
    }
    return this.each(function() {
        typeof options == 'string' ?
            $.datepicker['_' + options + 'Datepicker'].apply($.datepicker, [this].concat(otherArgs)) :
            $.datepicker._attachDatepicker(this, options);
    });
};
    
/* Initialise the date picker. */
$(document).ready(function() {
    $(document.body).append($.datepicker._datepickerDiv)
        .mousedown($.datepicker._checkExternalClick);
});

$.datepicker = new Datepicker(); // singleton instance

})(jQuery);