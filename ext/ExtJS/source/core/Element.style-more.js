/*
 * Ext JS Library 3.0 RC1
 * Copyright(c) 2006-2009, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */

/**
 * @class Ext.Element
 */

// special markup used throughout Ext when box wrapping elements
Ext.Element.boxMarkup = '<div class="{0}-tl"><div class="{0}-tr"><div class="{0}-tc"></div></div></div><div class="{0}-ml"><div class="{0}-mr"><div class="{0}-mc"></div></div></div><div class="{0}-bl"><div class="{0}-br"><div class="{0}-bc"></div></div></div>';

Ext.Element.addMethods(function(){
	var INTERNAL = "_internal";
	return {			
	    /**
	     * More flexible version of {@link #setStyle} for setting style properties.
	     * @param {String/Object/Function} styles A style specification string, e.g. "width:100px", or object in the form {width:"100px"}, or
	     * a function which returns such a specification.
	     * @return {Ext.Element} this
	     */
	    applyStyles : function(style){
	        Ext.DomHelper.applyStyles(this.dom, style);
	        return this;
	    },
	    
		/**
	     * Returns an object with properties matching the styles requested.
	     * For example, el.getStyles('color', 'font-size', 'width') might return
	     * {'color': '#FFFFFF', 'font-size': '13px', 'width': '100px'}.
	     * @param {String} style1 A style name
	     * @param {String} style2 A style name
	     * @param {String} etc.
	     * @return {Object} The style object
	     */
	    getStyles : function(){
		    var ret = {};
		    Ext.each(arguments, function(v) {
			   ret[v] = this.getStyle(v); 
		    },
		    this);
		    return ret;
	    },
	    
		getStyleSize : function(){
	        var me = this,
	        	w, 
	        	h, 
	        	d = this.dom, 
	        	s = d.style;
	        if(s.width && s.width != 'auto'){
	            w = parseInt(s.width, 10);
	            if(me.isBorderBox()){
	               w -= me.getFrameWidth('lr');
	            }
	        }
	        if(s.height && s.height != 'auto'){
	            h = parseInt(s.height, 10);
	            if(me.isBorderBox()){
	               h -= me.getFrameWidth('tb');
	            }
	        }
	        return {width: w || me.getWidth(true), height: h || me.getHeight(true)};
	    },
	    
	    // private  ==> used by ext full
		setOverflow : function(v){
			var me = this;
	    	if(v=='auto' && Ext.isMac && Ext.isGecko2){ // work around stupid FF 2.0/Mac scroll bar bug
	    		me.dom.style.overflow = 'hidden';
	        	(function(){me.dom.style.overflow = 'auto';}).defer(1, me);
	    	}else{
	    		me.dom.style.overflow = v;
	    	}
		},
		
	   /**
		* <p>Wraps the specified element with a special 9 element markup/CSS block that renders by default as
		* a gray container with a gradient background, rounded corners and a 4-way shadow.</p>
		* <p>This special markup is used throughout Ext when box wrapping elements ({@link Ext.Button},
		* {@link Ext.Panel} when <tt>{@link Ext.Panel#frame frame=true}</tt>, {@link Ext.Window}).  The markup
		* is of this form:</p>
		* <pre><code>
Ext.Element.boxMarkup =
    &#39;&lt;div class="{0}-tl">&lt;div class="{0}-tr">&lt;div class="{0}-tc">&lt;/div>&lt;/div>&lt;/div>
     &lt;div class="{0}-ml">&lt;div class="{0}-mr">&lt;div class="{0}-mc">&lt;/div>&lt;/div>&lt;/div>
     &lt;div class="{0}-bl">&lt;div class="{0}-br">&lt;div class="{0}-bc">&lt;/div>&lt;/div>&lt;/div>&#39;;
		* </pre></code>
		* <p>Example usage:</p>
		* <pre><code>
// Basic box wrap
Ext.get("foo").boxWrap();

// You can also add a custom class and use CSS inheritance rules to customize the box look.
// 'x-box-blue' is a built-in alternative -- look at the related CSS definitions as an example
// for how to create a custom box wrap style.
Ext.get("foo").boxWrap().addClass("x-box-blue");
		* </pre></code>
		* @param {String} class (optional) A base CSS class to apply to the containing wrapper element
		* (defaults to <tt>'x-box'</tt>). Note that there are a number of CSS rules that are dependent on
		* this name to make the overall effect work, so if you supply an alternate base class, make sure you
		* also supply all of the necessary rules.
		* @return {Ext.Element} this
		*/
	    boxWrap : function(cls){
	        cls = cls || 'x-box';
	        var el = Ext.get(this.insertHtml("beforeBegin", "<div class='" + cls + "'>" + String.format(Ext.Element.boxMarkup, cls) + "</div>"));        //String.format('<div class="{0}">'+Ext.Element.boxMarkup+'</div>', cls)));        
	        Ext.DomQuery.selectNode('.' + cls + '-mc', el.dom).appendChild(this.dom);
	        return el;
	    },
	    
        /**
         * Set the size of this Element. If animation is true, both width and height will be animated concurrently.
         * @param {Mixed} width The new width. This may be one of:<div class="mdetail-params"><ul>
         * <li>A Number specifying the new width in this Element's {@link #defaultUnit}s (by default, pixels).</li>
         * <li>A String used to set the CSS width style. Animation may <b>not</b> be used.
         * <li>A size object in the format <code>{width: widthValue, height: heightValue}</code>.</li>
         * </ul></div>
         * @param {Mixed} height The new height. This may be one of:<div class="mdetail-params"><ul>
         * <li>A Number specifying the new height in this Element's {@link #defaultUnit}s (by default, pixels).</li>
         * <li>A String used to set the CSS height style. Animation may <b>not</b> be used.</li>
         * </ul></div>
         * @param {Boolean/Object} animate (optional) true for the default animation or a standard Element animation config object
         * @return {Ext.Element} this
         */
	    setSize : function(width, height, animate){
			var me = this;
			if(typeof width == "object"){ // in case of object from getSize()
			    height = width.height; 
			    width = width.width;
			}
			width = me.adjustWidth(width); 
			height = me.adjustHeight(height);
			if(!animate || !me.anim){
			    me.dom.style.width = me.addUnits(width);
			    me.dom.style.height = me.addUnits(height);
			}else{
			    me.anim({width: {to: width}, height: {to: height}}, me.preanim(arguments, 2));
			}
			return me;
	    },
	    
	    /**
	     * Returns either the offsetHeight or the height of this element based on CSS height adjusted by padding or borders
	     * when needed to simulate offsetHeight when offsets aren't available. This may not work on display:none elements
	     * if a height has not been set using CSS.
	     * @return {Number}
	     */
	    getComputedHeight : function(){	    
		    var me = this,        	
	        	h = Math.max(me.dom.offsetHeight, me.dom.clientHeight);
	        if(!h){
	            h = parseInt(me.getStyle('height'), 10) || 0;
	            if(!me.isBorderBox()){
	                h += me.getFrameWidth('tb');
	            }
	        }
	        return h;
	    },
	
	    /**
	     * Returns either the offsetWidth or the width of this element based on CSS width adjusted by padding or borders
	     * when needed to simulate offsetWidth when offsets aren't available. This may not work on display:none elements
	     * if a width has not been set using CSS.
	     * @return {Number}
	     */
	    getComputedWidth : function(){
	        var w = Math.max(this.dom.offsetWidth, this.dom.clientWidth);
	        if(!w){
	            w = parseInt(this.getStyle('width'), 10) || 0;
	            if(!this.isBorderBox()){
	                w += this.getFrameWidth('lr');
	            }
	        }
	        return w;
	    },
	    
	    /**
	     * Returns the sum width of the padding and borders for the passed "sides". See getBorderWidth()
	     for more information about the sides.
	     * @param {String} sides
	     * @return {Number}
	     */
	    getFrameWidth : function(sides, onlyContentBox){
	        return onlyContentBox && this.isBorderBox() ? 0 : (this.getPadding(sides) + this.getBorderWidth(sides));
	    },
	    
	    /**
	     * Sets up event handlers to add and remove a css class when the mouse is over this element
	     * @param {String} className
	     * @return {Ext.Element} this
	     */
	    addClassOnOver : function(className){
		    var me = this;	    	
	        me.hover(
	            function(){
	                Ext.fly(me, INTERNAL).addClass(className);
	            },
	            function(){
	                Ext.fly(me, INTERNAL).removeClass(className);
	            }			   
	        );
	        return me;
	    },
	
	    /**
	     * Sets up event handlers to add and remove a css class when this element has the focus
	     * @param {String} className
	     * @return {Ext.Element} this
	     */
	    addClassOnFocus : function(className){
		    var me = this;
	        me.on("focus", function(){
	            Ext.fly(me, INTERNAL).addClass(className);
	        }, me.dom);
	        me.on("blur", function(){
	            Ext.fly(me, INTERNAL).removeClass(className);
	        }, me.dom);
	        return me;
	    },
	    
	    /**
	     * Sets up event handlers to add and remove a css class when the mouse is down and then up on this element (a click effect)
	     * @param {String} className
	     * @return {Ext.Element} this
	     */
	    addClassOnClick : function(className){
	        var dom = this.dom;
	        this.on("mousedown", function(){
	            Ext.fly(dom, INTERNAL).addClass(className);
	            var d = Ext.getDoc(),
	            	fn = function(){
		                Ext.fly(dom, INTERNAL).removeClass(className);
		                d.removeListener("mouseup", fn);
		            };
	            d.on("mouseup", fn);
	        });
	        return this;
	    },
	    
	    /**
	     * Returns the width and height of the viewport.
        * <pre><code>
        var vpSize = Ext.getBody().getViewSize();

        // all Windows created afterwards will have a default value of 90% height and 95% width
        Ext.Window.override({
            width: vpSize.width * 0.9,
            height: vpSize.height * 0.95
        });
        // To handle window resizing you would have to hook onto onWindowResize. 
        </pre></code>
	     * @return {Object} An object containing the viewport's size {width: (viewport width), height: (viewport height)}
	     */
	    getViewSize : function(){
	        var doc = document, 
	        	d = this.dom, 
	        	extdom = Ext.lib.Dom, 
	        	isDoc = (d == doc || d == doc.body);
	        return { width : (isDoc ? extdom.getViewWidth() : d.clientWidth),
	        		 height : (isDoc ? extdom.getViewHeight() : d.clientHeight) };
	    },
	    
	    /**
	     * Returns the size of the element.
	     * @param {Boolean} contentSize (optional) true to get the width/size minus borders and padding
	     * @return {Object} An object containing the element's size {width: (element width), height: (element height)}
	     */
	    getSize : function(contentSize){
	        return {width: this.getWidth(contentSize), height: this.getHeight(contentSize)};
	    },   
		    
	    /**
	     * Forces the browser to repaint this element
	     * @return {Ext.Element} this
	     */
	    repaint : function(){
	        var dom = this.dom;
	        this.addClass("x-repaint");
	        setTimeout(function(){
	            Ext.get(dom).removeClass("x-repaint");
	        }, 1);
	        return this;
	    },
	    
	    /**
	     * Disables text selection for this element (normalized across browsers)
	     * @return {Ext.Element} this
	     */
	    unselectable : function(){	    
	        this.dom.unselectable = "on";        
	        return this.swallowEvent("selectstart", true).
	        		    applyStyles("-moz-user-select:none;-khtml-user-select:none;").
	        		    addClass("x-unselectable");
	    },
	    
	    /**
	     * Returns an object with properties top, left, right and bottom representing the margins of this element unless sides is passed,
	     * then it returns the calculated width of the sides (see getPadding)
	     * @param {String} sides (optional) Any combination of l, r, t, b to get the sum of those sides
	     * @return {Object/Number}
	     */
	    getMargins : function(side){
		    var me = this,
		    	key,
		    	hash = {t:"top", l:"left", r:"right", b: "bottom"};
		    	o = {};
		    	
		    if (!side) {
		        for (key in me.margins)
		        	o[hash[key]] = parseInt(me.getStyle(me.margins[key]), 10) || 0;
		        return o;
	        } else {
	            return me.addStyles.call(me, side, me.margins);
	        }
	    }	
    }
}());