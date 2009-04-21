/*
 * Ext JS Library 3.0 RC1
 * Copyright(c) 2006-2009, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */

/**
 * @class Ext.layout.ContainerLayout
 * <p>The ContainerLayout class is the default layout manager delegated by {@link Ext.Container} to
 * render any child Components when no <tt>{@link Ext.Container#layout layout}</tt> is configured into
 * a {@link Ext.Container Container}. ContainerLayout provides the basic foundation for all other layout
 * classes in Ext. It simply renders all child Components into the Container, performing no sizing or
 * positioning services. To utilize a layout that provides sizing and positioning of child Components,
 * specify an appropriate <tt>{@link Ext.Container#layout layout}</tt>.</p>
 * <p>This class is intended to be extended or created via the <tt><b>{@link Ext.Container#layout layout}</b></tt>
 * configuration property.  See <tt><b>{@link Ext.Container#layout}</b></tt> for additional details.</p>
 */
Ext.layout.ContainerLayout = function(config){
    Ext.apply(this, config);
};

Ext.layout.ContainerLayout.prototype = {
    /**
     * @cfg {String} extraCls
     * <p>An optional extra CSS class that will be added to the container. This can be useful for adding
     * customized styles to the container or any of its children using standard CSS rules. See
     * {@link Ext.Component}.{@link Ext.Component#ctCls ctCls} also.</p>
     * <p><b>Note</b>: <tt>extraCls</tt> defaults to <tt>''</tt> except for the following classes
     * which assign a value by default:
     * <div class="mdetail-params"><ul>
     * <li>{@link Ext.layout.AbsoluteLayout Absolute Layout} : <tt>'x-abs-layout-item'</tt></li>
     * <li>{@link Ext.layout.Box Box Layout} : <tt>'x-box-item'</tt></li>
     * <li>{@link Ext.layout.ColumnLayout Column Layout} : <tt>'x-column'</tt></li>
     * </ul></div>
     * To configure the above Classes with an extra CSS class append to the default.  For example,
     * for ColumnLayout:<pre><code>
     * extraCls: 'x-column custom-class'
     * </code></pre>
     * </p>
     */
    /**
     * @cfg {Boolean} renderHidden
     * True to hide each contained item on render (defaults to false).
     */

    /**
     * A reference to the {@link Ext.Component} that is active.  For example, <pre><code>
     * if(myPanel.layout.activeItem.id == 'item-1') { ... }
     * </code></pre>
     * <tt>activeItem</tt> only applies to layout styles that can display items one at a time
     * (like {@link Ext.layout.AccordionLayout}, {@link Ext.layout.CardLayout}
     * and {@link Ext.layout.FitLayout}).  Read-only.  Related to {@link Ext.Container#activeItem}.
     * @type {Ext.Component}
     * @property activeItem
     */

    // private
    monitorResize:false,
    // private
    activeItem : null,

    // private
    layout : function(){
        var target = this.container.getLayoutTarget();
        this.onLayout(this.container, target);
        this.container.fireEvent('afterlayout', this.container, this);
    },

    // private
    onLayout : function(ct, target){
        this.renderAll(ct, target);
    },

    // private
    isValidParent : function(c, target){
		return target && c.getDomPositionEl().dom.parentNode == (target.dom || target);
    },

    // private
    renderAll : function(ct, target){
        var items = ct.items.items;
        for(var i = 0, len = items.length; i < len; i++) {
            var c = items[i];
            if(c && (!c.rendered || !this.isValidParent(c, target))){
                this.renderItem(c, i, target);
            }
        }
    },

    // private
    renderItem : function(c, position, target){
        if(c && !c.rendered){
            c.render(target, position);
            if(this.extraCls){
            	var t = c.getPositionEl ? c.getPositionEl() : c;
            	t.addClass(this.extraCls);
            }
            if (this.renderHidden && c != this.activeItem) {
                c.hide();
            }
        }else if(c && !this.isValidParent(c, target)){
            if(this.extraCls){
                var t = c.getPositionEl ? c.getPositionEl() : c;
            	t.addClass(this.extraCls);
            }
            if(typeof position == 'number'){
                position = target.dom.childNodes[position];
            }
            target.dom.insertBefore(c.getDomPositionEl().dom, position || null);
            c.container = target;
            if (this.renderHidden && c != this.activeItem) {
                c.hide();
            }
        }
    },

    // private
    onResize: function(){
        if(this.container.collapsed){
            return;
        }
        var b = this.container.bufferResize;
        if(b){
            if(!this.resizeTask){
                this.resizeTask = new Ext.util.DelayedTask(this.layout, this);
                this.resizeBuffer = typeof b == 'number' ? b : 100;
            }
            this.resizeTask.delay(this.resizeBuffer);
        }else{
            this.layout();
        }
    },

    // private
    setContainer : function(ct){
        if(this.monitorResize && ct != this.container){
            if(this.container){
                this.container.un('resize', this.onResize, this);
            }
            if(ct){
                ct.on('resize', this.onResize, this);
            }
        }
        this.container = ct;
    },

    // private
    parseMargins : function(v){
        if(typeof v == 'number'){
            v = v.toString();
        }
        var ms = v.split(' ');
        var len = ms.length;
        if(len == 1){
            ms[1] = ms[0];
            ms[2] = ms[0];
            ms[3] = ms[0];
        }
        if(len == 2){
            ms[2] = ms[0];
            ms[3] = ms[1];
        }
        if(len == 3){
            ms[3] = ms[1];
        }
        return {
            top:parseInt(ms[0], 10) || 0,
            right:parseInt(ms[1], 10) || 0,
            bottom:parseInt(ms[2], 10) || 0,
            left:parseInt(ms[3], 10) || 0
        };
    },

    /**
     * @cfg {Ext.Template} fieldTpl
     * A {@link Template Ext.Template} used by Field rendering layout classes (such as
     * {@link Ext.layout.FormLayout}) to create the DOM structure of a fully wrapped,
     * labeled and styled form Field. A default Template is supplied, but this may be
     * overriden to create custom field structures. The template processes values returned from
     * {@link Ext.form.FormLayout#getTemplateArgs}.
     */
    fieldTpl: (function() {
        var t = new Ext.Template(
            '<div class="x-form-item {itemCls}" tabIndex="-1">',
                '<label for="{id}" style="{labelStyle}" class="x-form-item-label">{label}{labelSeparator}</label>',
                '<div class="x-form-element" id="x-form-el-{id}" style="{elementStyle}">',
                '</div><div class="{clearCls}"></div>',
            '</div>'
        );
        t.disableFormats = true;
        return t.compile();
    })(),
	
    /*
     * Destroys this layout. This is a template method that is empty by default, but should be implemented
     * by subclasses that require explicit destruction to purge event handlers or remove DOM nodes.
     * @protected
     */
    destroy : Ext.emptyFn
};
Ext.Container.LAYOUTS['auto'] = Ext.layout.ContainerLayout;