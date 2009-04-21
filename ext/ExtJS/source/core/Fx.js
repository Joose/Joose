/*
 * Ext JS Library 3.0 RC1
 * Copyright(c) 2006-2009, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */

(function(){
	// contants
	var NULL = null,
		UNDEFINED = undefined,
		TRUE = true,
		FALSE = false,
    	SETX = "setX",
    	SETY = "setY",
    	SETXY = "setXY",
    	LEFT = "left",
    	BOTTOM = "bottom",
    	TOP = "top",
    	RIGHT = "right",
    	HEIGHT = "height",
    	WIDTH = "width",
    	POINTS = "points",
    	HIDDEN = "hidden",
    	ABSOLUTE = "absolute",
    	VISIBLE = "visible",
    	MOTION = "motion",
    	POSITION = "position",
    	EASEOUT = "easeOut";
    	
//Notifies Element that fx methods are available
Ext.enableFx = TRUE;

/**
 * @class Ext.Fx
 * <p>A class to provide basic animation and visual effects support.  <b>Note:</b> This class is automatically applied
 * to the {@link Ext.Element} interface when included, so all effects calls should be performed via {@link Ext.Element}.
 * Conversely, since the effects are not actually defined in {@link Ext.Element}, Ext.Fx <b>must</b> be
 * {@link Ext#enableFx included} in order for the Element effects to work.</p><br/>
 * 
 * <p><b><u>Method Chaining</u></b></p>
 * <p>It is important to note that although the Fx methods and many non-Fx Element methods support "method chaining" in that
 * they return the Element object itself as the method return value, it is not always possible to mix the two in a single
 * method chain.  The Fx methods use an internal effects queue so that each effect can be properly timed and sequenced.
 * Non-Fx methods, on the other hand, have no such internal queueing and will always execute immediately.  For this reason,
 * while it may be possible to mix certain Fx and non-Fx method calls in a single chain, it may not always provide the
 * expected results and should be done with care.  Also see <tt>{@link #callback}</tt>.</p><br/>
 *
 * <p><b><u>Anchor Options for Motion Effects</u></b></p>
 * <p>Motion effects support 8-way anchoring, meaning that you can choose one of 8 different anchor points on the Element
 * that will serve as either the start or end point of the animation.  Following are all of the supported anchor positions:</p>
<pre>
Value  Description
-----  -----------------------------
tl     The top left corner
t      The center of the top edge
tr     The top right corner
l      The center of the left edge
r      The center of the right edge
bl     The bottom left corner
b      The center of the bottom edge
br     The bottom right corner
</pre>
 * <b>Note</b>: some Fx methods accept specific custom config parameters.  The options shown in the Config Options
 * section below are common options that can be passed to any Fx method unless otherwise noted.</b>
 * 
 * @cfg {Function} callback A function called when the effect is finished.  Note that effects are queued internally by the
 * Fx class, so a callback is not required to specify another effect -- effects can simply be chained together
 * and called in sequence (see note for <b><u>Method Chaining</u></b> above), for example:<pre><code>
 * el.slideIn().highlight();
 * </code></pre>
 * The callback is intended for any additional code that should run once a particular effect has completed. The Element
 * being operated upon is passed as the first parameter.
 * 
 * @cfg {Object} scope The scope of the <tt>{@link #callback}</tt> function
 * 
 * @cfg {String} easing A valid Ext.lib.Easing value for the effect:</p><div class="mdetail-params"><ul>
 * <li><b><tt>backBoth</tt></b></li>
 * <li><b><tt>backIn</tt></b></li>
 * <li><b><tt>backOut</tt></b></li>
 * <li><b><tt>bounceBoth</tt></b></li>
 * <li><b><tt>bounceIn</tt></b></li>
 * <li><b><tt>bounceOut</tt></b></li>
 * <li><b><tt>easeBoth</tt></b></li>
 * <li><b><tt>easeBothStrong</tt></b></li>
 * <li><b><tt>easeIn</tt></b></li>
 * <li><b><tt>easeInStrong</tt></b></li>
 * <li><b><tt>easeNone</tt></b></li>
 * <li><b><tt>easeOut</tt></b></li>
 * <li><b><tt>easeOutStrong</tt></b></li>
 * <li><b><tt>elasticBoth</tt></b></li>
 * <li><b><tt>elasticIn</tt></b></li>
 * <li><b><tt>elasticOut</tt></b></li>
 * </ul></div>
 *
 * @cfg {String} afterCls A css class to apply after the effect
 * @cfg {Number} duration The length of time (in seconds) that the effect should last
 * 
 * @cfg {Number} endOpacity Only applicable for {@link #fadeIn} or {@link #fadeOut}, a number between
 * <tt>0</tt> and <tt>1</tt> inclusive to configure the ending opacity value.
 *  
 * @cfg {Boolean} remove Whether the Element should be removed from the DOM and destroyed after the effect finishes
 * @cfg {Boolean} useDisplay Whether to use the <i>display</i> CSS property instead of <i>visibility</i> when hiding Elements (only applies to 
 * effects that end with the element being visually hidden, ignored otherwise)
 * @cfg {String/Object/Function} afterStyle A style specification string, e.g. <tt>"width:100px"</tt>, or an object
 * in the form <tt>{width:"100px"}</tt>, or a function which returns such a specification that will be applied to the
 * Element after the effect finishes.
 * @cfg {Boolean} block Whether the effect should block other effects from queueing while it runs
 * @cfg {Boolean} concurrent Whether to allow subsequently-queued effects to run at the same time as the current effect, or to ensure that they run in sequence
 * @cfg {Boolean} stopFx Whether preceding effects should be stopped and removed before running current effect (only applies to non blocking effects)
 */
Ext.Fx = {
	
	// private - calls the function taking arguments from the argHash based on the key.  Returns the return value of the function.
	// 			 this is useful for replacing switch statements (for example).
	switchStatements : function(key, fn, argHash){
		return fn.apply(this, argHash[key]);
	},
	
	/**
	 * Slides the element into view.  An anchor point can be optionally passed to set the point of
	 * origin for the slide effect.  This function automatically handles wrapping the element with
	 * a fixed-size container if needed.  See the Fx class overview for valid anchor point options.
	 * Usage:
	 *<pre><code>
// default: slide the element in from the top
el.slideIn();

// custom: slide the element in from the right with a 2-second duration
el.slideIn('r', { duration: 2 });

// common config options shown with default values
el.slideIn('t', {
    easing: 'easeOut',
    duration: .5
});
</code></pre>
	 * @param {String} anchor (optional) One of the valid Fx anchor positions (defaults to top: 't')
	 * @param {Object} options (optional) Object literal with any of the Fx config options
	 * @return {Ext.Element} The Element
	 */
    slideIn : function(anchor, o){        
	    var me = this,
        	el = me.getFxEl(),
        	r,
			b,				
			wrap,				
			after,
			st,
        	args, 
        	pt,
        	bw,
        	bh,
        	xy = me.getXY(),
            dom = me.dom;
        	
        o = o || {};
		anchor = anchor || "t";

        el.queueFx(o, function(){			
			st = me.dom.style;				
            	
            // fix display to visibility
            me.fixDisplay();            
            
            // restore values after effect
			r = me.getFxRestore();		
            b = {x: xy[0], y: xy[1], 0: xy[0], 1: xy[1], width: dom.offsetWidth, height: dom.offsetHeight};
            b.right = b.x + b.width;
            b.bottom = b.y + b.height;
            
            // fixed size for slide
            me.setWidth(b.width).setHeight(b.height);            
            
            // wrap if needed
            wrap = me.fxWrap(r.pos, o, HIDDEN);
            
            st.visibility = VISIBLE;
            st.position = ABSOLUTE;
            
        	// clear out temp styles after slide and unwrap
        	function after(){
                 el.fxUnwrap(wrap, r.pos, o);
                 st.width = r.width;
                 st.height = r.height;
                 el.afterFx(o);
            }
            
            // time to calculate the positions        
        	pt = {to: [b.x, b.y]}; 
        	bw = {to: b.width};
        	bh = {to: b.height};
            	
			function argCalc(wrap, style, ww, wh, sXY, sXYval, s1, s2, w, h, p){	            	
				var ret = {};
            	wrap.setWidth(ww).setHeight(wh);
            	if( wrap[sXY] )	wrap[sXY](sXYval);            		
            	style[s1] = style[s2] = "0";	            	
            	if(w) ret.width = w;
            	if(h) ret.height = h;
            	if(p) ret.points = p;
            	return ret;
        	};

            args = me.switchStatements(anchor.toLowerCase(), argCalc, {
		            t  : [wrap, st, b.width, 0, NULL, NULL, LEFT, BOTTOM, NULL, bh, NULL],
		            l  : [wrap, st, 0, b.height, NULL, NULL, RIGHT, TOP, bw, NULL, NULL],
		            r  : [wrap, st, 0, b.height, SETX, b.right, LEFT, TOP, bw, NULL, pt],
		            b  : [wrap, st, b.width, 0, SETY, b.bottom, LEFT, TOP, NULL, bh, pt],
		            tl : [wrap, st, 0, 0, NULL, NULL, RIGHT, BOTTOM, bw, NULL, pt],
		            bl : [wrap, st, 0, 0, SETY, b.y + b.height, RIGHT, TOP, bw, bh, pt],
		            br : [wrap, st, 0, 0, SETXY, [b.right, b.bottom], LEFT, TOP, bw, bh, pt],
		            tr : [0, 0, SETX, b.x + b.width, LEFT, BOTTOM, bw, bh, pt]
            	});
            
            st.visibility = VISIBLE;
            wrap.show();

            arguments.callee.anim = wrap.fxanim(args,
                o,
                MOTION,
                .5,
                EASEOUT, 
                after);
        });
        return me;
    },
    
	/**
	 * Slides the element out of view.  An anchor point can be optionally passed to set the end point
	 * for the slide effect.  When the effect is completed, the element will be hidden (visibility = 
	 * 'hidden') but block elements will still take up space in the document.  The element must be removed
	 * from the DOM using the 'remove' config option if desired.  This function automatically handles 
	 * wrapping the element with a fixed-size container if needed.  See the Fx class overview for valid anchor point options.
	 * Usage:
	 *<pre><code>
// default: slide the element out to the top
el.slideOut();

// custom: slide the element out to the right with a 2-second duration
el.slideOut('r', { duration: 2 });

// common config options shown with default values
el.slideOut('t', {
    easing: 'easeOut',
    duration: .5,
    remove: false,
    useDisplay: false
});
</code></pre>
	 * @param {String} anchor (optional) One of the valid Fx anchor positions (defaults to top: 't')
	 * @param {Object} options (optional) Object literal with any of the Fx config options
	 * @return {Ext.Element} The Element
	 */
    slideOut : function(anchor, o){
	    var me = this,
	    	el = me.getFxEl(),
	    	xy = me.getXY(),
            dom = me.dom,
	    	wrap,
	    	st,
	    	r,
	    	b,
	    	a,
	    	zero = {to: 0}; 
	    		    
        o = o || {};
        anchor = anchor || "t";

        el.queueFx(o, function(){
	        // restore values after effect
            r = me.getFxRestore(); 
            b = {x: xy[0], y: xy[1], 0: xy[0], 1: xy[1], width: dom.offsetWidth, height: dom.offsetHeight};
            b.right = b.x + b.width;
            b.bottom = b.y + b.height;
            	
            // fixed size for slide            
            me.setWidth(b.width).setHeight(b.height);

            // wrap if needed
            wrap = me.fxWrap(r.pos, o, VISIBLE);
           	st = me.dom.style;
           		
            st.visibility = VISIBLE;
            st.position = ABSOLUTE;
            wrap.setWidth(b.width).setHeight(b.height);            

            function after(){
	            o.useDisplay ? el.setDisplayed(FALSE) : el.hide();                
                el.fxUnwrap(wrap, r.pos, o);
                st.width = r.width;
                st.height = r.height;
                el.afterFx(o);
            }            
            
            function argCalc(style, s1, s2, p1, v1, p2, v2, p3, v3){	            	
	            var ret = {};
	            
            	style[s1] = style[s2] = "0";
            	ret[p1] = v1;            	
            	if(p2) ret[p2] = v2;            	
            	if(p3) ret[p3] = v3;
            	
            	return ret;
       		};
       		
       		a = me.switchStatements(anchor.toLowerCase(), argCalc, {
	            t  : [st, LEFT, BOTTOM, HEIGHT, zero],
	            l  : [st, RIGHT, TOP, WIDTH, zero],
	            r  : [st, LEFT, TOP, WIDTH, zero, POINTS, {to : [b.right, b.y]}],
	            b  : [st, LEFT, TOP, HEIGHT, zero, POINTS, {to : [b.x, b.bottom]}],
	            tl : [st, RIGHT, BOTTOM, WIDTH, zero, HEIGHT, zero],
	            bl : [st, RIGHT, TOP, WIDTH, zero, HEIGHT, zero, POINTS, {to : [b.X, b.bottom]}],
	            br : [st, LEFT, TOP, WIDTH, zero, HEIGHT, zero, POINTS, {to : [b.x + b.width, b.bottom]}],
	            tr : [st, LEFT, BOTTOM, WIDTH, zero, HEIGHT, zero, POINTS, {to : [b.right, b.y]}]
            });
            
            arguments.callee.anim = wrap.fxanim(a,
                o,
                MOTION,
                .5,
                EASEOUT, 
                after);
        });
        return me;
    },

	/**
	 * Fades the element out while slowly expanding it in all directions.  When the effect is completed, the 
	 * element will be hidden (visibility = 'hidden') but block elements will still take up space in the document. 
	 * The element must be removed from the DOM using the 'remove' config option if desired.
	 * Usage:
	 *<pre><code>
// default
el.puff();

// common config options shown with default values
el.puff({
    easing: 'easeOut',
    duration: .5,
    remove: false,
    useDisplay: false
});
</code></pre>
	 * @param {Object} options (optional) Object literal with any of the Fx config options
	 * @return {Ext.Element} The Element
	 */
    puff : function(o){
	    o = o || {};
	    
        var me = this,
        	el = me.getFxEl(),
        	r, 
        	st = me.dom.style,
        	width = me.getWidth(),
        	height = me.getHeight();        	        

        el.queueFx(o, function(){	        
            me.clearOpacity();
            me.show();

            // restore values after effect
            r = me.getFxRestore();        	       	 
        	
            function after(){
            	o.useDisplay ? el.setDisplayed(FALSE) : el.hide();	                
                el.clearOpacity();	
                el.setPositioning(r.pos);
                st.width = r.width;
                st.height = r.height;
                st.fontSize = '';
                el.afterFx(o);
            }	

            arguments.callee.anim = me.fxanim({
                    width : {to : me.adjustWidth(width * 2)},
                    height : {to : me.adjustHeight(height * 2)},
                    points : {by : [-width * .5, -height * .5]},
                    opacity : {to : 0},
                    fontSize: {to : 200, unit: "%"}
                },
                o,
                MOTION,
                .5,
                EASEOUT,
                 after);
        });
        return me;
    },

	/**
	 * Blinks the element as if it was clicked and then collapses on its center (similar to switching off a television).
	 * When the effect is completed, the element will be hidden (visibility = 'hidden') but block elements will still 
	 * take up space in the document. The element must be removed from the DOM using the 'remove' config option if desired.
	 * Usage:
	 *<pre><code>
// default
el.switchOff();

// all config options shown with default values
el.switchOff({
    easing: 'easeIn',
    duration: .3,
    remove: false,
    useDisplay: false
});
</code></pre>
	 * @param {Object} options (optional) Object literal with any of the Fx config options
	 * @return {Ext.Element} The Element
	 */
    switchOff : function(o){
	    o = o || {};
	    
        var me = this,
        	el = me.getFxEl();        

        el.queueFx(o, function(){
	        me.clearOpacity();
            me.clip();

            // restore values after effect
            var r = me.getFxRestore(),
            	st = me.dom.style,
            	after = function(){
	                o.useDisplay ? el.setDisplayed(FALSE) : el.hide();	
	                el.clearOpacity();
	                el.setPositioning(r.pos);
	                st.width = r.width;
	                st.height = r.height;	
	                el.afterFx(o);
	            };

            me.fxanim({opacity : {to : 0.3}}, 
            	NULL, 
            	NULL, 
            	.1, 
            	NULL, 
            	function(){	            		            
	                me.clearOpacity();
		                (function(){			                
		                    me.fxanim({
		                        height : {to : 1},
		                        points : {by : [0, me.getHeight() * .5]}
		                    }, 
		                    o, 
		                    MOTION, 
		                    0.3, 
		                    'easeIn', 
		                    after);
		                }).defer(100);
	            });
        });
        return me;
    },

    /**
     * Highlights the Element by setting a color (applies to the background-color by default, but can be
     * changed using the "attr" config option) and then fading back to the original color. If no original
     * color is available, you should provide the "endColor" config option which will be cleared after the animation.
     * Usage:
<pre><code>
// default: highlight background to yellow
el.highlight();

// custom: highlight foreground text to blue for 2 seconds
el.highlight("0000ff", { attr: 'color', duration: 2 });

// common config options shown with default values
el.highlight("ffff9c", {
    attr: "background-color", //can be any valid CSS property (attribute) that supports a color value
    endColor: (current color) or "ffffff",
    easing: 'easeIn',
    duration: 1
});
</code></pre>
     * @param {String} color (optional) The highlight color. Should be a 6 char hex color without the leading # (defaults to yellow: 'ffff9c')
     * @param {Object} options (optional) Object literal with any of the Fx config options
     * @return {Ext.Element} The Element
     */	
    highlight : function(color, o){
	    o = o || {};
	    
        var me = this,
        	el = me.getFxEl(),
        	attr = o.attr || "backgroundColor",
        	a = {};

        el.queueFx(o, function(){
            me.clearOpacity();
            me.show();

            function after(){
                el.dom.style[attr] = me.dom.style[attr];
                el.afterFx(o);
            }            
            	
            a[attr] = {from: color || "ffff9c", to: o.endColor || me.getColor(attr) || "ffffff"};
            arguments.callee.anim = me.fxanim(a,
                o,
                'color',
                1,
                'easeIn', 
                after);
        });
        return me;
    },

   /**
    * Shows a ripple of exploding, attenuating borders to draw attention to an Element.
    * Usage:
<pre><code>
// default: a single light blue ripple
el.frame();

// custom: 3 red ripples lasting 3 seconds total
el.frame("ff0000", 3, { duration: 3 });

// common config options shown with default values
el.frame("C3DAF9", 1, {
    duration: 1 //duration of each individual ripple.
    // Note: Easing is not configurable and will be ignored if included
});
</code></pre>
    * @param {String} color (optional) The color of the border.  Should be a 6 char hex color without the leading # (defaults to light blue: 'C3DAF9').
    * @param {Number} count (optional) The number of ripples to display (defaults to 1)
    * @param {Object} options (optional) Object literal with any of the Fx config options
    * @return {Ext.Element} The Element
    */
    frame : function(color, count, o){
        var me = this,
        	el = me.getFxEl();
        	
        o = o || {};

        el.queueFx(o, function(){
            color = color || "#C3DAF9"
            if(color.length == 6){
                color = "#" + color;
            }            
            count = count || 1;
            me.show();

            var xy = me.getXY(),
            	dom = me.dom,
            	b = {x: xy[0], y: xy[1], 0: xy[0], 1: xy[1], width: dom.offsetWidth, height: dom.offsetHeight};
            
            
            
        	function animFn(){
                var proxy = Ext.get(document.body || document.documentElement).createChild({
                     style:{
                        visbility: HIDDEN,
                        position : ABSOLUTE,
                        "z-index": 35000, // yee haw
                        border : "0px solid " + color
                     }
            	}),
            	scale = Ext.isBorderBox ? 2 : 1;
                proxy.animate({
                    top : {from : b.y, to : b.y - 20},
                    left : {from : b.x, to : b.x - 20},
                    borderWidth : {from : 0, to : 10},
                    opacity : {from : 1, to : 0},
                    height : {from : b.height, to : b.height + 20 * scale},
                    width : {from : b.width, to : b.width + 20 * scale}
                }, 
                o.duration || 1, 
                function() {
                	proxy.remove();
                	--count > 0 ? animFn() : el.afterFx(o);
            	});
        	};
            animFn.call(me);
        });
        return me;
    },

   /**
    * Creates a pause before any subsequent queued effects begin.  If there are
    * no effects queued after the pause it will have no effect.
    * Usage:
<pre><code>
el.pause(1);
</code></pre>
    * @param {Number} seconds The length of time to pause (in seconds)
    * @return {Ext.Element} The Element
    */
    pause : function(seconds){
        var el = this.getFxEl();

        el.queueFx({}, function(){
            setTimeout(function(){
                el.afterFx({});
            }, seconds * 1000);
        });
        return this;
    },

   /**
    * Fade an element in (from transparent to opaque).  The ending opacity can be specified
    * using the <tt>{@link #endOpacity}</tt> config option.
    * Usage:
<pre><code>
// default: fade in from opacity 0 to 100%
el.fadeIn();

// custom: fade in from opacity 0 to 75% over 2 seconds
el.fadeIn({ endOpacity: .75, duration: 2});

// common config options shown with default values
el.fadeIn({
    endOpacity: 1, //can be any value between 0 and 1 (e.g. .5)
    easing: 'easeOut',
    duration: .5
});
</code></pre>
    * @param {Object} options (optional) Object literal with any of the Fx config options
    * @return {Ext.Element} The Element
    */
    fadeIn : function(o){
        var me = this,
        	el = me.getFxEl();        
        o = o || {};
        
        el.queueFx(o, function(){	        
            me.setOpacity(0);
            me.fixDisplay();
            me.dom.style.visibility = VISIBLE;
            var to = o.endOpacity || 1;
            arguments.callee.anim = me.fxanim({opacity:{to:to}},
                o, NULL, .5, EASEOUT, function(){
                if(to == 1){
                    this.clearOpacity();
                }
                el.afterFx(o);
            });
        });
        return me;
    },

   /**
    * Fade an element out (from opaque to transparent).  The ending opacity can be specified
    * using the <tt>{@link #endOpacity}</tt> config option.  Note that IE may require
    * <tt>{@link #useDisplay}:true</tt> in order to redisplay correctly.
    * Usage:
<pre><code>
// default: fade out from the element's current opacity to 0
el.fadeOut();

// custom: fade out from the element's current opacity to 25% over 2 seconds
el.fadeOut({ endOpacity: .25, duration: 2});

// common config options shown with default values
el.fadeOut({
    endOpacity: 0, //can be any value between 0 and 1 (e.g. .5)
    easing: 'easeOut',
    duration: .5,
    remove: false,
    useDisplay: false
});
</code></pre>
    * @param {Object} options (optional) Object literal with any of the Fx config options
    * @return {Ext.Element} The Element
    */
    fadeOut : function(o){
	    o = o || {};
	    
        var me = this,
        	style = me.dom.style,
        	el = me.getFxEl(),
        	to = o.endOpacity || 0;        	
        
        el.queueFx(o, function(){                       
            arguments.callee.anim = me.fxanim({ 
	            opacity : {to : to}},
                o, 
                NULL, 
                .5, 
                EASEOUT, 
                function(){
	                if(to == 0){
		               me.visibilityMode == Ext.Element.DISPLAY || o.useDisplay ? 
		                	style.display = "none" :
		                	style.visibility = HIDDEN;
		                	
	                    me.clearOpacity();
                	}
                	el.afterFx(o);
            });
        });
        return me;
    },

   /**
    * Animates the transition of an element's dimensions from a starting height/width
    * to an ending height/width.  This method is a convenience implementation of {@link shift}.
    * Usage:
<pre><code>
// change height and width to 100x100 pixels
el.scale(100, 100);

// common config options shown with default values.  The height and width will default to
// the element&#39;s existing values if passed as null.
el.scale(
    [element&#39;s width],
    [element&#39;s height], {
	    easing: 'easeOut',
	    duration: .35
	}
);
</code></pre>
    * @param {Number} width  The new width (pass undefined to keep the original width)
    * @param {Number} height  The new height (pass undefined to keep the original height)
    * @param {Object} options (optional) Object literal with any of the Fx config options
    * @return {Ext.Element} The Element
    */
    scale : function(w, h, o){
	    var me = this;
        me.shift(Ext.apply({}, o, {
            width: w,
            height: h
        }));
        return me;
    },

   /**
    * Animates the transition of any combination of an element's dimensions, xy position and/or opacity.
    * Any of these properties not specified in the config object will not be changed.  This effect 
    * requires that at least one new dimension, position or opacity setting must be passed in on
    * the config object in order for the function to have any effect.
    * Usage:
<pre><code>
// slide the element horizontally to x position 200 while changing the height and opacity
el.shift({ x: 200, height: 50, opacity: .8 });

// common config options shown with default values.
el.shift({
    width: [element&#39;s width],
    height: [element&#39;s height],
    x: [element&#39;s x position],
    y: [element&#39;s y position],
    opacity: [element&#39;s opacity],
    easing: 'easeOut',
    duration: .35
});
</code></pre>
    * @param {Object} options  Object literal with any of the Fx config options
    * @return {Ext.Element} The Element
    */
    shift : function(o){
	    var me = this;
	    o = o || {};
        
	    var	el = me.getFxEl();       	
        el.queueFx(o, function(){
	        var a = {};	
	        
            for (var prop in o) {
	            if (o[prop] != UNDEFINED) {		            			                    
		            a[prop] = {to : o[prop]};	            	
	            }
            } 
            
         	a.width ? a.width.to = me.adjustWidth(o.width) : a;
         	a.height ? a.height.to = me.adjustWidth(o.height) : a;   
            
            if (a.x || a.y || a.xy) {
	            a.points = a.xy || 
	            		   {to : [ a.x ? a.x.to : me.getX(),
	            				   a.y ? a.y.to : me.getY()]};	            	
            }

            arguments.callee.anim = me.fxanim(a,
                o, 
                MOTION, 
                .35, 
                EASEOUT, 
                function(){
                	el.afterFx(o);
            	});
        });
        return me;
    },

	/**
	 * Slides the element while fading it out of view.  An anchor point can be optionally passed to set the 
	 * ending point of the effect.
	 * Usage:
	 *<pre><code>
// default: slide the element downward while fading out
el.ghost();

// custom: slide the element out to the right with a 2-second duration
el.ghost('r', { duration: 2 });

// common config options shown with default values
el.ghost('b', {
    easing: 'easeOut',
    duration: .5,
    remove: false,
    useDisplay: false
});
</code></pre>
	 * @param {String} anchor (optional) One of the valid Fx anchor positions (defaults to bottom: 'b')
	 * @param {Object} options (optional) Object literal with any of the Fx config options
	 * @return {Ext.Element} The Element
	 */
    ghost : function(anchor, o){
        var me = this,
        	el = me.getFxEl();
        	
        o = o || {};
        anchor = anchor || "b";

        el.queueFx(o, function(){
            // restore values after effect
            var r = me.getFxRestore(),
            	w = me.getWidth(),
                h = me.getHeight(),
            	st = me.dom.style,
            	after = function(){
	                if(o.useDisplay){
	                    el.setDisplayed(FALSE);
	                }else{
	                    el.hide();
                	}
                	
	                el.clearOpacity();
	                el.setPositioning(r.pos);
	                st.width = r.width;
	                st.width = r.width;
	
	                el.afterFx(o);
	            },
            	a = {opacity: {to: 0}, 
            		 points: {}}, 
            	pt = a.points;
            	
            	pt.by = me.switchStatements(anchor.toLowerCase(), function(v1,v2){ return [v1, v2];}, {
	            	t  : [0, -h],
	            	l  : [-w, 0],
	            	r  : [w, 0],
	            	b  : [0, h],
	            	tl : [-w, -h],
	            	bl : [-w, h],
	            	br : [w, h],
	            	tr : [w, -h]	
            	});
            	
            arguments.callee.anim = me.fxanim(a,
                o,
                MOTION,
                .5,
                EASEOUT, after);
        });
        return me;
    },

	/**
	 * Ensures that all effects queued after syncFx is called on the element are
	 * run concurrently.  This is the opposite of {@link #sequenceFx}.
	 * @return {Ext.Element} The Element
	 */
    syncFx : function(){
	    var me = this;
        me.fxDefaults = Ext.apply(me.fxDefaults || {}, {
            block : FALSE,
            concurrent : TRUE,
            stopFx : FALSE
        });
        return me;
    },

	/**
	 * Ensures that all effects queued after sequenceFx is called on the element are
	 * run in sequence.  This is the opposite of {@link #syncFx}.
	 * @return {Ext.Element} The Element
	 */
    sequenceFx : function(){
	    var me = this;
        me.fxDefaults = Ext.apply(me.fxDefaults || {}, {
            block : FALSE,
            concurrent : FALSE,
            stopFx : FALSE
        });
        return me;
    },

	/* @private */
    nextFx : function(){	    
        var ef = this.fxQueue[0];
        if(ef){
            ef.call(this);
        }
    },

	/**
	 * Returns true if the element has any effects actively running or queued, else returns false.
	 * @return {Boolean} True if element has active effects, else false
	 */
    hasActiveFx : function(){	    
        return this.fxQueue && this.fxQueue[0];
    },

	/**
	 * Stops any running effects and clears the element's internal effects queue if it contains
	 * any additional effects that haven't started yet.
	 * @return {Ext.Element} The Element
	 */
    stopFx : function(finish){
	    var me = this;
        if(me.hasActiveFx()){
            var cur = me.fxQueue[0];
            if(cur && cur.anim && cur.anim.isAnimated){
                me.fxQueue = [cur]; // clear out others
                cur.anim.stop(finish !== undefined ? finish : true);
            }
        }
        return me;
    },

	/* @private */
    beforeFx : function(o){
        if(this.hasActiveFx() && !o.concurrent){
           if(o.stopFx){
               this.stopFx();
               return TRUE;
           }
           return FALSE;
        }
        return TRUE;
    },

	/**
	 * Returns true if the element is currently blocking so that no other effect can be queued
	 * until this effect is finished, else returns false if blocking is not set.  This is commonly
	 * used to ensure that an effect initiated by a user action runs to completion prior to the
	 * same effect being restarted (e.g., firing only one effect even if the user clicks several times).
	 * @return {Boolean} True if blocking, else false
	 */
    hasFxBlock : function(){
        var q = this.fxQueue;
        return q && q[0] && q[0].block;
    },

	/* @private */
    queueFx : function(o, fn){
	    var me = this;
        if(!me.fxQueue){
            me.fxQueue = [];
        }
        if(!me.hasFxBlock()){
            Ext.applyIf(o, me.fxDefaults);
            if(!o.concurrent){
                var run = me.beforeFx(o);
                fn.block = o.block;
                me.fxQueue.push(fn);
                if(run){
                    me.nextFx();
                }
            }else{
                fn.call(me);
            }
        }
        return me;
    },

	/* @private */
    fxWrap : function(pos, o, vis){	
        var me = this,
        	wrap,
        	wrapXY;
        if(!o.wrap || !(wrap = Ext.get(o.wrap))){            
            if(o.fixPosition){
                wrapXY = me.getXY();
            }
            var div = document.createElement("div");
            div.style.visibility = vis;
            wrap = Ext.get(me.dom.parentNode.insertBefore(div, me.dom));
            wrap.setPositioning(pos);
            if(wrap.isStyle(POSITION, "static")){
                wrap.position("relative");
            }
            me.clearPositioning('auto');
            wrap.clip();
            wrap.dom.appendChild(me.dom);
            if(wrapXY){
                wrap.setXY(wrapXY);
            }
        }
        return wrap;
    },

	/* @private */
    fxUnwrap : function(wrap, pos, o){	    
	    var me = this;
        me.clearPositioning();
        me.setPositioning(pos);
        if(!o.wrap){
            wrap.dom.parentNode.insertBefore(me.dom, wrap.dom);
            wrap.remove();
        }
    },

	/* @private */
    getFxRestore : function(){
        var	st = this.dom.style;
        return {pos: this.getPositioning(), width: st.width, height : st.height};
    },

	/* @private */
    afterFx : function(o){
	    var me = this;
        if(o.afterStyle){
	        me.setStyle(o.afterStyle);            
        }
        if(o.afterCls){
            me.addClass(o.afterCls);
        }
        if(o.remove == TRUE){
            me.remove();
        }
        if(o.callback) o.callback.call(o.scope, me);
        if(!o.concurrent){
            me.fxQueue.shift();
            me.nextFx();
        }
    },

	/* @private */
    getFxEl : function(){ // support for composite element fx
        return Ext.get(this.dom);
    },

	/* @private */
    fxanim : function(args, opt, animType, defaultDur, defaultEase, cb){
        animType = animType || 'run';
        opt = opt || {};
        var anim = Ext.lib.Anim[animType](
	            this.dom, 
	            args,
	            (opt.duration || defaultDur) || .35,
	            (opt.easing || defaultEase) || EASEOUT,
	            cb,	           
	            this
	        );
        opt.anim = anim;
        return anim;
    }
};

// backwards compat
Ext.Fx.resize = Ext.Fx.scale;

//When included, Ext.Fx is automatically applied to Element so that all basic
//effects are available directly via the Element API
Ext.Element.addMethods(Ext.Fx);
})();