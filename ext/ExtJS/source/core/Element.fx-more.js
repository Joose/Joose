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
Ext.Element.addMethods(
function(){
    var VISIBILITY = "visibility",
        DISPLAY = "display",
        HIDDEN = "hidden",
        NONE = "none",
	    XMASKED = "x-masked",
		XMASKEDRELATIVE = "x-masked-relative";
		
	return {
		/**
	     * Checks whether the element is currently visible using both visibility and display properties.
	     * @param {Boolean} deep (optional) True to walk the dom and see if parent elements are hidden (defaults to false)
	     * @return {Boolean} True if the element is currently visible, else false
	     */
	    isVisible : function(deep) {
	        var vis = !this.isStyle(VISIBILITY,HIDDEN) && !this.isStyle(DISPLAY,NONE),
	        	p = this.dom.parentNode;
	        if(deep !== true || !vis){
	            return vis;
	        }	        
	        while(p && !/body/i.test(p.tagName)){
	            if(!Ext.fly(p, '_isVisible').isVisible()){
	                return false;
	            }
	            p = p.parentNode;
	        }
	        return true;
	    },
	    
	    /**
	     * Returns true if display is not "none"
	     * @return {Boolean}
	     */
	    isDisplayed : function() {
	        return !this.isStyle(DISPLAY, NONE);
	    },
	    
		/**
	     * Convenience method for setVisibilityMode(Element.DISPLAY)
	     * @param {String} display (optional) What to set display to when visible
	     * @return {Ext.Element} this
	     */
	    enableDisplayMode : function(display){	    
	        this.setVisibilityMode(Ext.Element.DISPLAY);
	        if(!Ext.isEmpty(display)) this.originalDisplay = display;
	        return this;
	    },
	    
		/**
	     * Puts a mask over this element to disable user interaction. Requires core.css.
	     * This method can only be applied to elements which accept child nodes.
	     * @param {String} msg (optional) A message to display in the mask
	     * @param {String} msgCls (optional) A css class to apply to the msg element
	     * @return {Element} The mask element
	     */
	    mask : function(msg, msgCls){
		    var me = this,
		    	dom = me.dom,
		    	dh = Ext.DomHelper,
		    	EXTELMASKMSG = "ext-el-mask-msg";
		    	
	        if(me.getStyle("position") == "static"){
	            me.addClass(XMASKEDRELATIVE);
	        }
	        if(me._maskMsg){
	            me._maskMsg.remove();
	        }
	        if(me._mask){
	            me._mask.remove();
	        }
	
	        me._mask = dh.append(dom, {cls : "ext-el-mask"}, true);
	
	        me.addClass(XMASKED);
	        me._mask.setDisplayed(true);
	        if(typeof msg == 'string'){
	            me._maskMsg = dh.append(dom, {cls : EXTELMASKMSG, cn:{tag:'div'}}, true);
	            var mm = me._maskMsg;
	            mm.dom.className = msgCls ? EXTELMASKMSG + " " + msgCls : EXTELMASKMSG;
	            mm.dom.firstChild.innerHTML = msg;
	            mm.setDisplayed(true);
	            mm.center(me);
	        }
	        if(Ext.isIE && !(Ext.isIE7 && Ext.isStrict) && me.getStyle('height') == 'auto'){ // ie will not expand full height automatically
	            me._mask.setSize(dom.clientWidth, me.getHeight());
	        }
	        return me._mask;
	    },
	
	    /**
	     * Removes a previously applied mask.
	     */
	    unmask : function(){
		    var me = this,
		    	mask = me._mask,
		    	maskMsg = me._maskMsg;
	        if(mask){
	            if(maskMsg){
	                maskMsg.remove();
	                delete me._maskMsg;
	            }
	            mask.remove();
	            delete me._mask;
	        }
	        me.removeClass([XMASKED, XMASKEDRELATIVE]);
	    },
	
	    /**
	     * Returns true if this element is masked
	     * @return {Boolean}
	     */
	    isMasked : function(){	    
	        return this.mask && this.mask.isVisible();
	    },
	    
	    /**
	     * Creates an iframe shim for this element to keep selects and other windowed objects from
	     * showing through.
	     * @return {Ext.Element} The new shim element
	     */
	    createShim : function(){
	        var el = document.createElement('iframe'),        	
	        	shim;
	        el.frameBorder = '0';
	        el.className = 'ext-shim';
	        if(Ext.isIE && Ext.isSecure){
	            el.src = Ext.SSL_SECURE_URL;
	        }
	        shim = Ext.get(this.dom.parentNode.insertBefore(el, this.dom));
	        shim.autoBoxAdjust = false;
	        return shim;
	    }
    }
}());