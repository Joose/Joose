/*
 * Ext JS Library 3.0 RC1
 * Copyright(c) 2006-2009, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */

/**
 * @class Ext.CompositeElement
 * @extends Ext.CompositeElementLite
 * Standard composite class. Creates a Ext.Element for every element in the collection.
 * <br><br>
 * <b>NOTE: Although they are not listed, this class supports all of the set/update methods of Ext.Element. All Ext.Element
 * actions will be performed on all the elements in this collection.</b>
 * <br><br>
 * All methods return <i>this</i> and can be chained.
 <pre><code>
 var els = Ext.select("#some-el div.some-class", true);
 // or select directly from an existing element
 var el = Ext.get('some-el');
 el.select('div.some-class', true);

 els.setWidth(100); // all elements become 100 width
 els.hide(true); // all elements fade out and hide
 // or
 els.setWidth(100).hide(true);
 </code></pre>
 */
Ext.CompositeElement = function(els, root){
    this.elements = [];
    this.add(els, root);
};

Ext.extend(Ext.CompositeElement, Ext.CompositeElementLite, {
    invoke : function(fn, args){
	    Ext.each(this.elements, function(e) {
        	Ext.Element.prototype[fn].apply(e, args);
        });
        return this;
    },
    
    /**
    * Adds elements to this composite.
    * @param {String/Array} els A string CSS selector, an array of elements or an element
    * @return {CompositeElement} this
    */
    add : function(els, root){
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
     * Returns the Element object at the specified index
     * @param {Number} index
     * @return {Ext.Element}
     */
    item : function(index){
        return this.elements[index] || null;
    },


    indexOf : function(el){
        return this.elements.indexOf(Ext.get(el));
    },
        
    filter : function(selector){
		var me = this,
			out = [];
			
		Ext.each(me.elements, function(el) {	
			if(el.is(selector)){
				out.push(Ext.get(el));
			}
		})
		me.elements = out;
		return me;
	},
	
	/**
    * Calls the passed function passing (el, this, index) for each element in this composite.
    * @param {Function} fn The function to call
    * @param {Object} scope (optional) The <i>this</i> object (defaults to the element)
    * @return {CompositeElement} this
    */
    each : function(fn, scope){        
        Ext.each(this.elements, function(e,i) {
	        return fn.call(scope || e, e, this, i)
        }, this);
        return this;
    }
});

/**
 * Selects elements based on the passed CSS selector to enable {@link Ext.Element Element} methods
 * to be applied to many related elements in one statement through the returned {@link Ext.CompositeElement CompositeElement} or
 * {@link Ext.CompositeElementLite CompositeElementLite} object.
 * @param {String/Array} selector The CSS selector or an array of elements
 * @param {Boolean} unique (optional) true to create a unique Ext.Element for each element (defaults to a shared flyweight object)
 * @param {HTMLElement/String} root (optional) The root element of the query or id of the root
 * @return {CompositeElementLite/CompositeElement}
 * @member Ext.Element
 * @method select
 */
Ext.Element.select = function(selector, unique, root){
    var els;
    if(typeof selector == "string"){
        els = Ext.Element.selectorFunction(selector, root);
    }else if(selector.length !== undefined){
        els = selector;
    }else{
        throw "Invalid selector";
    }

    if(unique === true) {
        return new Ext.CompositeElement(els);
    } else {
        return new Ext.CompositeElementLite(els);
    }
};
