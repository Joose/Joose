/*
 * Ext JS Library 3.0 RC1
 * Copyright(c) 2006-2009, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */

/**
 * @class Ext.CompositeElementLite
 */
Ext.apply(Ext.CompositeElementLite.prototype, {	
	addElements : function(els, root){
        if(!els) return this;
        if(typeof els == "string"){
            els = Ext.Element.selectorFunction(els, root);
        }
        var yels = this.elements;        
	    Ext.each(els, function(e) {
        	yels.push(Ext.get(e));
        });
        return this;
    },
    
    /**
    * Clears this composite and adds the elements returned by the passed selector.
    * @param {String/Array} els A string CSS selector, an array of elements or an element
    * @return {CompositeElement} this
    */
    fill : function(els){
        this.elements = [];
        this.add(els);
        return this;
    },
    
    /**
     * Returns the first Element
     * @return {Ext.Element}
     */
    first : function(){
        return this.item(0);
    },   
    
    /**
     * Returns the last Element
     * @return {Ext.Element}
     */
    last : function(){
        return this.item(this.getCount()-1);
    },
    
    /**
     * Returns true if this composite contains the passed element
     * @param el {Mixed} The id of an element, or an Ext.Element, or an HtmlElement to find within the composite collection.
     * @return Boolean
     */
    contains : function(el){
        return this.indexOf(el) != -1;
    },

    /**
    * Filters this composite to only elements that match the passed selector.
    * @param {String} selector A string CSS selector
    * @return {CompositeElement} this
    */
    filter : function(selector){
        var els = [];
        this.each(function(el){
            if(el.is(selector)){
                els[els.length] = el.dom;
            }
        });
        this.fill(els);
        return this;
    },
    
    /**
    * Removes the specified element(s).
    * @param {Mixed} el The id of an element, the Element itself, the index of the element in this composite
    * or an array of any of those.
    * @param {Boolean} removeDom (optional) True to also remove the element from the document
    * @return {CompositeElement} this
    */
    removeElement : function(keys, removeDom){
        var me = this,
	        els = this.elements,	    
	    	el;	    	
	    Ext.each(keys, function(val){
		    if (el = (els[val] || els[val = me.indexOf(val)])) {
		    	if(removeDom)
		    		el.dom ? el.remove() : Ext.removeNode(el);
		    	els.splice(val, 1);		    	
			}
	    });
        return this;
    }    
});
