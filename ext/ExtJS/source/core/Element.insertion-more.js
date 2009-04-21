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
Ext.apply(Ext.Element.prototype, function() {
	var GETDOM = Ext.getDom,
		GET = Ext.get,
		DH = Ext.DomHelper;
	
	return {	
		/**
	     * Inserts (or creates) the passed element (or DomHelper config) as a sibling of this element
	     * @param {Mixed/Object/Array} el The id, element to insert or a DomHelper config to create and insert *or* an array of any of those.
	     * @param {String} where (optional) 'before' or 'after' defaults to before
	     * @param {Boolean} returnDom (optional) True to return the raw DOM element instead of Ext.Element
	     * @return {Ext.Element} the inserted Element
	     */
	    insertSibling: function(el, where, returnDom){
	        var me = this,
	        	rt;
	        	
	        if(Ext.isArray(el)){            
	            Ext.each(el, function(e) {
		            rt = me.insertSibling(e, where, returnDom);
	            });
	            return rt;
	        }
	                
	        where = (where || 'before').toLowerCase();
	        el = el || {};
	       	
            if(el.nodeType || el.dom){
                rt = me.dom.parentNode.insertBefore(GETDOM(el), where == 'before' ? me.dom : me.dom.nextSibling);
                if (!returnDom) {
                    rt = GET(rt);
                }
            }else{
                if (where == 'after' && !me.dom.nextSibling) {
                    rt = DH.append(me.dom.parentNode, el, !returnDom);
                } else {                    
                    rt = DH[where == 'after' ? 'insertAfter' : 'insertBefore'](me.dom, el, !returnDom);
                }
            }
	        return rt;
	    }
    }
}());