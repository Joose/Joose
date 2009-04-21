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
Ext.Element.addMethods({
    /**
     * Scrolls this element the specified scroll point. It does NOT do bounds checking so if you scroll to a weird value it will try to do it. For auto bounds checking, use scroll().
     * @param {String} side Either "left" for scrollLeft values or "top" for scrollTop values.
     * @param {Number} value The new scroll value
     * @param {Boolean/Object} animate (optional) true for the default animation or a standard Element animation config object
     * @return {Element} this
     */
    scrollTo : function(side, value, animate){
        var tester = /top/i,
        	prop = "scroll" + (tester.test(side) ? "Top" : "Left"),
        	me = this,
        	dom = me.dom;
        if (!animate || !me.anim) {
            dom[prop] = value;
        } else {
            me.anim({scroll: {to: tester.test(prop) ? [dom[prop], value] : [value, dom[prop]]}},
            		 me.preanim(arguments, 2), 'scroll');
        }
        return me;
    },
    
    /**
     * Scrolls this element into view within the passed container.
     * @param {Mixed} container (optional) The container element to scroll (defaults to document.body).  Should be a
     * string (id), dom node, or Ext.Element.
     * @param {Boolean} hscroll (optional) False to disable horizontal scroll (defaults to true)
     * @return {Ext.Element} this
     */
    scrollIntoView : function(container, hscroll){
        var c = Ext.getDom(container) || Ext.getBody().dom,
        	el = this.dom,
        	o = this.getOffsetsTo(c),
            l = o[0] + c.scrollLeft,
            t = o[1] + c.scrollTop,
            b = t + el.offsetHeight,
            r = l + el.offsetWidth,
        	ch = c.clientHeight,
        	ct = parseInt(c.scrollTop, 10),
        	cl = parseInt(c.scrollLeft, 10),
        	cb = ct + ch,
        	cr = cl + c.clientWidth;

        if (el.offsetHeight > ch || t < ct) {
        	c.scrollTop = t;
        } else if (b > cb){
            c.scrollTop = b-ch;
        }
        c.scrollTop = c.scrollTop; // corrects IE, other browsers will ignore

        if(hscroll !== false){
			if(el.offsetWidth > c.clientWidth || l < cl){
                c.scrollLeft = l;
            }else if(r > cr){
                c.scrollLeft = r - c.clientWidth;
            }
            c.scrollLeft = c.scrollLeft;
        }
        return this;
    },

    // private
    scrollChildIntoView : function(child, hscroll){
        Ext.fly(child, '_scrollChildIntoView').scrollIntoView(this, hscroll);
    },
    
    /**
     * Scrolls this element the specified direction. Does bounds checking to make sure the scroll is
     * within this element's scrollable range.
     * @param {String} direction Possible values are: "l" (or "left"), "r" (or "right"), "t" (or "top", or "up"), "b" (or "bottom", or "down").
     * @param {Number} distance How far to scroll the element in pixels
     * @param {Boolean/Object} animate (optional) true for the default animation or a standard Element animation config object
     * @return {Boolean} Returns true if a scroll was triggered or false if the element
     * was scrolled as far as it could go.
     */
     scroll : function(direction, distance, animate){
         if(this.isScrollable()){
	         var el = this.dom,
	         	l = el.scrollLeft, t = el.scrollTop,
	         	w = el.scrollWidth, h = el.scrollHeight,
	         	cw = el.clientWidth, ch = el.clientHeight,
	         	scrolled = false,	         		         	
	         	l = Math.min(l + distance, w-cw),
	         	r = Math.max(l - distance, 0),
	         	t = Math.max(t - distance, 0),
	         	b = Math.min(t + distance, h-ch),
	         	hash = {
		        	l : l,
		        	left : l,
		        	r : r,
		        	right : r,
		        	t : t,
		        	top : t,
		        	up : t,
		        	b : b, 
		        	bottom : b,
		        	down : b 		
	         	};
	         	
	         direction = direction.toLowerCase();
	         
	         if (v = hash[direction]) {
			     this.scrollTo("left", v, this.preanim(arguments, 2));
		         scrolled = true;
         	 }
	         return scrolled;
         }
    }
});