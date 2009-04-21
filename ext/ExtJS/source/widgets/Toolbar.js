/*
 * Ext JS Library 3.0 RC1
 * Copyright(c) 2006-2009, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */

/**
 * @class Ext.layout.ToolbarLayout
 * @extends Ext.layout.ContainerLayout
 * Layout manager implicitly used by Ext.Toolbar.
 */
Ext.layout.ToolbarLayout = Ext.extend(Ext.layout.ContainerLayout, {
    monitorResize: true,
    triggerWidth: 18,
    lastOverflow: false,

    noItemsMenuText: '<div class="x-toolbar-no-items">(None)</div>',
    // private
    onLayout : function(ct, target){
        if(!this.leftTr){
            target.addClass('x-toolbar-layout-ct');
            target.insertHtml('beforeEnd',
                 '<table cellspacing="0" class="x-toolbar-ct"><tbody><tr><td class="x-toolbar-left" align="left"><table cellspacing="0"><tbody><tr class="x-toolbar-left-row"></tr></tbody></table></td><td class="x-toolbar-right" align="right"><table cellspacing="0" class="x-toolbar-right-ct"><tbody><tr><td><table cellspacing="0"><tbody><tr class="x-toolbar-right-row"></tr></tbody></table></td><td><table cellspacing="0"><tbody><tr class="x-toolbar-extras-row"></tr></tbody></table></td></tr></tbody></td></tr></tbody></table>');
            this.leftTr = target.child('tr.x-toolbar-left-row', true);
            this.rightTr = target.child('tr.x-toolbar-right-row', true);
            this.extrasTr = target.child('tr.x-toolbar-extras-row', true);
        }
        var side = this.leftTr;
        var pos = 0;

        var items = ct.items.items;
        for(var i = 0, len = items.length, c; i < len; i++, pos++) {
            c = items[i];
            if(c.isFill){
                side = this.rightTr;
                pos = -1;
            }else if(!c.rendered){
                c.render(this.insertCell(c, side, pos));
            }else{
                if(!c.xtbHidden && !this.isValidParent(c, side.childNodes[pos])){
                    var td = this.insertCell(c, side, pos);
                    td.appendChild(c.getDomPositionEl().dom);
                    c.container = Ext.get(td);
                }
            }
        }
        //strip extra empty cells
        this.cleanup(this.leftTr);
        this.cleanup(this.rightTr);
        this.cleanup(this.extrasTr);
        this.fitToSize(target);
    },

    cleanup : function(row){
        var cn = row.childNodes;
        for(var i = cn.length-1, c; i >= 0 && (c = cn[i]); i--){
            if(!c.firstChild){
                row.removeChild(c);
            }
        }
    },

    insertCell : function(c, side, pos){
        var td = document.createElement('td');
        td.className='x-toolbar-cell';
        side.insertBefore(td, side.childNodes[pos]||null);
        return td;
    },

    hideItem: function(item){
        var h = (this.hiddens = this.hiddens || []);
        h.push(item);
        item.xtbHidden = true;
        item.xtbWidth = item.getDomPositionEl().dom.parentNode.offsetWidth;
        item.hide();
    },

    unhideItem: function(item){
        item.show();
        item.xtbHidden = false;
        this.hiddens.remove(item);
        if(this.hiddens.length < 1){
            delete this.hiddens;
        }
    },

    getItemWidth : function(c){
        return c.hidden ? (c.xtbWidth || 0) : c.getDomPositionEl().dom.parentNode.offsetWidth;
    },

    fitToSize :function(t){
        if(this.container.enableOverflow === false){
            return;
        }
        var w = t.dom.clientWidth;
        var lw = this.lastWidth || 0;
        this.lastWidth = w;
        var iw = t.dom.firstChild.offsetWidth;

        var clipWidth = w - this.triggerWidth;
        var hideIndex = -1;

        if(iw > w || (this.hiddens && w > lw)){
            var i, items = this.container.items.items, len = items.length, c;
            var loopWidth = 0;
            for(i = 0; i < len; i++) {
                c = items[i];
                if(!c.isFill){
                    loopWidth += this.getItemWidth(c);
                    if(loopWidth > clipWidth){
                        if(!c.xtbHidden){
                            this.hideItem(c);
                        }
                    }else{
                        if(c.xtbHidden){
                            this.unhideItem(c);
                        }
                    }
                }
            }
        }
        if(this.hiddens){
            this.initMore();
            if(!this.lastOverflow){
                this.container.fireEvent('overflowchange', this.container, true);
                this.lastOverflow = true;
            }
        }else if(this.more){
            this.clearMenu();
            this.more.destroy();
            delete this.more;
            if(this.lastOverflow){
                this.container.fireEvent('overflowchange', this.container, false);
                this.lastOverflow = false;
            }
        }
    },

    createMenuConfig: function(c, hideOnClick){
        var cfg = {
            text: c.text,
            iconCls: c.iconCls,
            icon: c.icon,
            itemId: c.itemId,
            disabled: c.disabled,
            handler: c.handler,
            scope: c.scope,
            menu: c.menu
        };
        cfg.hideOnClick = hideOnClick;
        delete cfg.xtype;
        delete cfg.id;
        return cfg;
    },

    // private
    addComponentToMenu: function(m, c){
        if(c instanceof Ext.Toolbar.Separator){
            m.add('-');
        }else if(typeof c.isXType == 'function'){
            if(c.isXType('splitbutton')){
                m.add(this.createMenuConfig(c, true));
            }else if(c.isXType('button')){
                m.add(this.createMenuConfig(c, !c.menu));
            }else if(c.isXType('buttongroup')){
                m.add('-');
                c.items.each(function(item){
                     this.addComponentToMenu(m, item);
                }, this);
                m.add('-');
            }
        }
    },
    
    clearMenu: function(){
        var m = this.moreMenu;
        if(m && m.items){
            this.moreMenu.items.each(function(item){
                delete item.menu;
            });
        }
    },

    // private
    beforeMoreShow : function(m){
        this.clearMenu();
        m.removeAll();
        for(var i = 0, h = this.container.items.items, len = h.length, c; i < len; i++){
            c = h[i];
            if(c.xtbHidden){
                this.addComponentToMenu(m, c);
            }
        }
        // put something so the menu isn't empty
        // if no compatible items found
        if(m.items.length < 1){
            m.add(this.noItemsMenuText);
        }
    },

    initMore : function(){
        if(!this.more){
            this.moreMenu = new Ext.menu.Menu({
                listeners: {
                    beforeshow: this.beforeMoreShow,
                    scope: this
                }
            });
            this.more = new Ext.Button({
                iconCls: 'x-toolbar-more-icon',
                cls: 'x-toolbar-more',
                menu: this.moreMenu
            });
            var td = this.insertCell(this.more, this.extrasTr, 100);
            this.more.render(td);
        }
    }
    /**
     * @property activeItem
     * @hide
     */
});

Ext.Container.LAYOUTS['toolbar'] = Ext.layout.ToolbarLayout;

/**
 * @class Ext.Toolbar
 * @extends Ext.Container
 * <p>Basic Toolbar class. Although the <tt>{@link Ext.Container#defaultType defaultType}</tt> for Toolbar
 * is <tt>{@link Ext.Button button}</tt>, Toolbar elements (child items for the Toolbar container) may
 * be virtually any type of Component. Toolbar elements can be created explicitly via their constructors,
 * or implicitly via their xtypes, and can be <tt>{@link #add}</tt>ed dynamically.</p>
 * <p>Some items have shortcut strings for creation:</p>
 * <pre>
<u>Shortcut</u>  <u>xtype</u>          <u>Class</u>                  <u>Description</u>    
'->'      'tbfill'       {@link Ext.Toolbar.Fill}       begin using the right-justified button container
'-'       'tbseparator'  {@link Ext.Toolbar.Separator}  add a vertical separator bar between toolbar items
' '       'tbspacer'     {@link Ext.Toolbar.Spacer}     add horiztonal space between elements
 * </pre>
 * 
 * Example usage of various elements:
 * <pre><code>
var tb = new Ext.Toolbar({
    renderTo: document.body,
    width: 600,
    height: 100,
    items: [
        {
            // xtype: 'button', // default for Toolbars, same as 'tbbutton'
            text: 'Button'
        },
        {
            xtype: 'splitbutton', // same as 'tbsplitbutton'
            text: 'Split Button'
        },
        // begin using the right-justified button container
        '->', // same as {xtype: 'tbfill'}, // Ext.Toolbar.Fill
        {
            xtype: 'textfield',
            name: 'field1',
            emptyText: 'enter search term'
        },
        // add a vertical separator bar between toolbar items
        '-', // same as {xtype: 'tbseparator'} to create Ext.Toolbar.Separator
        'text 1', // same as {xtype: 'tbtext', text: 'text1'} to create Ext.Toolbar.TextItem
        {xtype: 'tbspacer'},// same as ' ' to create Ext.Toolbar.Spacer
        'text 2',
        {xtype: 'tbspacer', width: 50}, // add a 50px space
        'text 3'        
    ]
});
 * </code></pre>
 * Example adding a ComboBox within a menu of a button:
 * <pre><code>
// ComboBox creation
var combo = new Ext.form.ComboBox({
    store: new Ext.data.ArrayStore({
        autoDestroy: true,
        fields: ['initials', 'fullname'],
        data : [
            ['FF', 'Fred Flintstone'],
            ['BR', 'Barney Rubble']
        ]
    }),
    displayField: 'fullname',
    typeAhead: true,
    mode: 'local',
    forceSelection: true,
    triggerAction: 'all',
    emptyText: 'Select a name...',
    selectOnFocus: true,
    width: 135,
    getListParent: function() {
        return this.el.up('.x-menu');
    },
    iconCls: 'no-icon' //use iconCls if placing within menu to shift to right side of menu
});

// put ComboBox in a Menu
var menu = new Ext.menu.Menu({
    id: 'mainMenu',
    items: [
        combo // A Field in a Menu
    ]
});

// add a Button with the menu
tb.add({
        text:'Button w/ Menu',
        menu: menu  // assign menu by instance
    });
tb.doLayout();
 * </code></pre>
 * @constructor
 * Creates a new Toolbar
 * @param {Object/Array} config A config object or an array of buttons to <tt>{@link #add}</tt>
 * @xtype toolbar
 */
Ext.Toolbar = function(config){
    if(Ext.isArray(config)){
        config = {items: config, layout: 'toolbar'};
    } else {
    	config = Ext.apply({
    		layout: 'toolbar'
    	}, config);
	    if(config.buttons) {
	    	config.items = config.buttons;
	    }
    }
    Ext.Toolbar.superclass.constructor.call(this, config);
};

(function(){

var T = Ext.Toolbar;

Ext.extend(T, Ext.Container, {

    defaultType: 'button',

    trackMenus : true,
    internalDefaults: {removeMode: 'container', hideParent: true},
    toolbarCls: 'x-toolbar',

    initComponent : function(){
        T.superclass.initComponent.call(this);

        /**
         * @event overflowchange
         * Fires after the overflow state has changed.
         * @param {Object} c The Container
         * @param {Boolean} lastOverflow overflow state
         */
        this.addEvents('overflowchange');
    },

    // private
    onRender : function(ct, position){
        if(!this.el){
            if(!this.autoCreate){
                this.autoCreate = {
                    cls: this.toolbarCls + ' x-small-editor'
                }
            }
            this.el = ct.createChild(Ext.apply({ id: this.id },this.autoCreate), position);
        }
    },
    
    /**
     * Adds element(s) to the toolbar -- this function takes a variable number of
     * arguments of mixed type and adds them to the toolbar.
     * @param {Mixed} arg1 The following types of arguments are all valid:<br />
     * <ul>
     * <li>{@link Ext.Toolbar.Button} config: A valid button config object (equivalent to {@link #addButton})</li>
     * <li>HtmlElement: Any standard HTML element (equivalent to {@link #addElement})</li>
     * <li>Field: Any form field (equivalent to {@link #addField})</li>
     * <li>Item: Any subclass of {@link Ext.Toolbar.Item} (equivalent to {@link #addItem})</li>
     * <li>String: Any generic string (gets wrapped in a {@link Ext.Toolbar.TextItem}, equivalent to {@link #addText}).
     * Note that there are a few special strings that are treated differently as explained next.</li>
     * <li>'separator' or '-': Creates a separator element (equivalent to {@link #addSeparator})</li>
     * <li>' ': Creates a spacer element (equivalent to {@link #addSpacer})</li>
     * <li>'->': Creates a fill element (equivalent to {@link #addFill})</li>
     * </ul>
     * @param {Mixed} arg2
     * @param {Mixed} etc.
     */
    add : function(){
        var a = arguments, l = a.length;
        for(var i = 0; i < l; i++){
            var el = a[i];
            if(el.isFormField){ // some kind of form field
                this.addField(el);
            }else if(el.render){ // some kind of Toolbar.Item
                this.addItem(el);
            }else if(typeof el == "string"){ // string
                if(el == "separator" || el == "-"){
                    this.addSeparator();
                }else if(el == " "){
                    this.addSpacer();
                }else if(el == "->"){
                    this.addFill();
                }else{
                    this.addText(el);
                }
            }else if(el.tag){ // DomHelper spec
                this.addDom(el);
            }else if(el.tagName){ // element
                this.addElement(el);
            }else if(typeof el == "object"){ // must be button config?
                if(el.xtype){
                    this.addItem(Ext.create(el, 'button'));
                }else{
                    this.addButton(el);
                }
            }
        }
    },

    /**
     * Adds a separator
     * @return {Ext.Toolbar.Item} The separator {@link Ext.Toolbar.Item item}
     */
    addSeparator : function(){
        return this.addItem(new T.Separator());
    },

    /**
     * Adds a spacer element
     * @return {Ext.Toolbar.Spacer} The spacer item
     */
    addSpacer : function(){
        return this.addItem(new T.Spacer());
    },

    /**
     * Forces subsequent additions into the float:right toolbar
     */
    addFill : function(){
    	this.addItem(new T.Fill());
    },

    /**
     * Adds any standard HTML element to the toolbar
     * @param {Mixed} el The element or id of the element to add
     * @return {Ext.Toolbar.Item} The element's item
     */
    addElement : function(el){
    	var item = new T.Item({el:el});
        this.addItem(item);
        return item;
    },

    /**
     * Adds any Toolbar.Item or subclass
     * @param {Ext.Toolbar.Item} item
     * @return {Ext.Toolbar.Item} The item
     */
    addItem : function(item){
    	Ext.Toolbar.superclass.add.apply(this, arguments);
    	return item;
    },

    /**
     * Adds a button (or buttons). See {@link Ext.Toolbar.Button} for more info on the config.
     * @param {Object/Array} config A button config or array of configs
     * @return {Ext.Toolbar.Button/Array}
     */
    addButton : function(config){
        if(Ext.isArray(config)){
            var buttons = [];
            for(var i = 0, len = config.length; i < len; i++) {
                buttons.push(this.addButton(config[i]));
            }
            return buttons;
        }
        var b = config;
        if(!b.events){
            b = config.split ?
                new T.SplitButton(config) :
                new T.Button(config);
        }
        this.initMenuTracking(b);
        this.addItem(b);
        return b;
    },

    // private
    initMenuTracking : function(item){
        if(this.trackMenus && item.menu){
        	this.mon(item, {
                'menutriggerover' : this.onButtonTriggerOver,
                'menushow' : this.onButtonMenuShow,
                'menuhide' : this.onButtonMenuHide,
                scope: this
            });
        }
    },

    /**
     * Adds text to the toolbar
     * @param {String} text The text to add
     * @return {Ext.Toolbar.Item} The element's item
     */
    addText : function(text){
    	var t = new T.TextItem(text);
        this.addItem(t);
        return t;
    },

    /**
     * Inserts any {@link Ext.Toolbar.Item}/{@link Ext.Toolbar.Button} at the specified index.
     * @param {Number} index The index where the item is to be inserted
     * @param {Object/Ext.Toolbar.Item/Ext.Toolbar.Button/Array} item The button, or button config object to be
     * inserted, or an array of buttons/configs.
     * @return {Ext.Toolbar.Button/Item}
     */
    insertButton : function(index, item){
        if(Ext.isArray(item)){
            var buttons = [];
            for(var i = 0, len = item.length; i < len; i++) {
               buttons.push(this.insertButton(index + i, item[i]));
            }
            return buttons;
        }
        if (!(item instanceof T.Button)){
           item = new T.Button(item);
        }
        Ext.Toolbar.superclass.insert.call(this, index, item);
        return item;
    },

    /**
     * Adds a new element to the toolbar from the passed {@link Ext.DomHelper} config
     * @param {Object} config
     * @return {Ext.Toolbar.Item} The element's item
     */
    addDom : function(config){
    	var item = new T.Item({autoEl: config});
        this.addItem(item);
        return item;
    },

    /**
     * Adds a dynamically rendered Ext.form field (TextField, ComboBox, etc). Note: the field should not have
     * been rendered yet. For a field that has already been rendered, use {@link #addElement}.
     * @param {Ext.form.Field} field
     * @return {Ext.Toolbar.Item}
     */
    addField : function(field){
    	this.addItem(field);
    	return field;
    },

    applyDefaults : function(c){
        c = Ext.Toolbar.superclass.applyDefaults.call(this, c);
        var d = this.internalDefaults;
        if(c.events){
            Ext.applyIf(c.initialConfig, d);
            Ext.apply(c, d);
        }else{
            Ext.applyIf(c, d);
        }
        return c;
    },

    // private
    onDisable : function(){
        this.items.each(function(item){
             if(item.disable){
                 item.disable();
             }
        });
    },

    // private
    onEnable : function(){
        this.items.each(function(item){
             if(item.enable){
                 item.enable();
             }
        });
    },

    // private
    onButtonTriggerOver : function(btn){
        if(this.activeMenuBtn && this.activeMenuBtn != btn){
            this.activeMenuBtn.hideMenu();
            btn.showMenu();
            this.activeMenuBtn = btn;
        }
    },

    // private
    onButtonMenuShow : function(btn){
        this.activeMenuBtn = btn;
    },

    // private
    onButtonMenuHide : function(btn){
        delete this.activeMenuBtn;
    }
});
Ext.reg('toolbar', Ext.Toolbar);

/**
 * @class Ext.Toolbar.Item
 * The base class that other non-interacting Toolbar Item classes should extend in order to
 * get some basic common toolbar item functionality.
 * @constructor
 * Creates a new Item
 * @param {HTMLElement} el
 * @xtype tbitem
 */
T.Item = Ext.extend(Ext.BoxComponent, {
    hideParent: true, //  Hiding a Toolbar.Item hides its containing TD
    enable:Ext.emptyFn,
    disable:Ext.emptyFn,
    focus:Ext.emptyFn
});
Ext.reg('tbitem', T.Item);

/**
 * @class Ext.Toolbar.Separator
 * @extends Ext.Toolbar.Item
 * A simple class that adds a vertical separator bar between toolbar items
 * (css class:<tt>'xtb-sep'</tt>). Example usage:
 * <pre><code>
new Ext.Panel({
	tbar : [
		'Item 1',
		{xtype: 'tbseparator'}, // or '-'
		'Item 2'
	]
});
</code></pre>
 * @constructor
 * Creates a new Separator
 * @xtype tbseparator
 */
T.Separator = Ext.extend(T.Item, {
    onRender : function(ct, position){
        this.el = ct.createChild({tag:'span', cls:'xtb-sep'}, position);
    }
});
Ext.reg('tbseparator', T.Separator);

/**
 * @class Ext.Toolbar.Spacer
 * @extends Ext.Toolbar.Item
 * A simple element that adds extra horizontal space between items in a toolbar.
 * By default a 2px wide space is added via css specification:<pre><code>
.x-toolbar .xtb-spacer {
    width:2px;
}
 * </code></pre>
 * <p>Example usage:</p>
 * <pre><code>
new Ext.Panel({
	tbar : [
		'Item 1',
		{xtype: 'tbspacer'}, // or ' '
		'Item 2',
		// space width is also configurable via javascript
		{xtype: 'tbspacer', width: 50}, // add a 50px space
		'Item 3'        
	]
});
</code></pre>
 * @constructor
 * Creates a new Spacer
 * @xtype tbspacer
 */
T.Spacer = Ext.extend(T.Item, {
    /**
     * @cfg {Number} width
     * The width of the spacer in pixels (defaults to 2px via css style <tt>.x-toolbar .xtb-spacer</tt>).
     */
    
    onRender : function(ct, position){
        this.el = ct.createChild({tag:'div', cls:'xtb-spacer', style: this.width?'width:'+this.width+'px':''}, position);
    }
});
Ext.reg('tbspacer', T.Spacer);

/**
 * @class Ext.Toolbar.Fill
 * @extends Ext.Toolbar.Spacer
 * A non-rendering placeholder item which instructs the Toolbar's Layout to begin using
 * the right-justified button container.
 * <pre><code>
new Ext.Panel({
	tbar : [
		'Item 1',
		{xtype: 'tbfill'}, // or '->'
		'Item 2'
	]
});
</code></pre>
 * @constructor
 * Creates a new Fill
 * @xtype tbfill
 */
T.Fill = Ext.extend(T.Item, {
    // private
    render : Ext.emptyFn,
    isFill : true
});
Ext.reg('tbfill', T.Fill);

/**
 * @class Ext.Toolbar.TextItem
 * @extends Ext.Toolbar.Item
 * A simple class that renders text directly into a toolbar
 * (css class:<tt>'xtb-text'</tt>). Example usage:
 * <pre><code>
new Ext.Panel({
	tbar : [
		{xtype: 'tbtext', text: 'Item 1'} // or simply 'Item 1'
	]
});
</code></pre>
 * @constructor
 * Creates a new TextItem
 * @param {String/Object} text A text string, or a config object containing a <tt>text</tt> property
 * @xtype tbtext
 */
T.TextItem = Ext.extend(T.Item, {
	constructor: function(config){
		if (typeof config == 'string') {
			config = { autoEl: {cls: 'xtb-text', html: config }};
		} else {
			config.autoEl = {cls: 'xtb-text', html: config.text || ''};
		}
	    T.TextItem.superclass.constructor.call(this, config);
	},
    setText: function(t) {
    	if (this.rendered) {
    		this.el.dom.innerHTML = t;
    	} else {
    		this.autoEl.html = t;
    	}
    }
});
Ext.reg('tbtext', T.TextItem);

// backwards compat
T.Button = Ext.extend(Ext.Button, {});
T.SplitButton = Ext.extend(Ext.SplitButton, {});
Ext.reg('tbbutton', T.Button);
Ext.reg('tbsplit', T.SplitButton);

})();

/**
 * @class Ext.ButtonGroup
 * @extends Ext.Panel
 * Container for a group of buttons. Example usage:
 * <pre><code>
var p = new Ext.Panel({
    title: 'Panel with Button Group',
    width: 300,
    height:200,
    renderTo: document.body,
    html: 'whatever',
    tbar: [{
        xtype: 'buttongroup',
        {@link #columns}: 3,
        title: 'Clipboard',
        items: [{
            text: 'Paste',
            scale: 'large',
            rowspan: 3, iconCls: 'add',
            iconAlign: 'top',
            cls: 'x-btn-as-arrow'
        },{
            xtype:'splitbutton',
            text: 'Hideous',
            scale: 'large',
            rowspan: 3,
            iconCls: 'add',
            iconAlign: 'top',
            arrowAlign:'bottom',
            menu: [{text: 'Ribbons are hideous'}]
        },{
            xtype:'splitbutton', text: 'Cut', iconCls: 'add16', menu: [{text: 'Hideousness'}]
        },{
            text: 'Copy', iconCls: 'add16'
        },{
            text: 'Format', iconCls: 'add16'
        }]
    }]
});
 * </code></pre>
 * @xtype buttongroup
 */
Ext.ButtonGroup = Ext.extend(Ext.Panel, {
    /**
     * @cfg {Number} columns The <tt>columns</tt> configuration property passed to the
     * {@link #layout configured layout manager}. See {@link Ext.layout.TableLayout#columns}.
     */
    /**
     * @cfg {String} baseCls  Defaults to <tt>'x-btn-group'</tt>.  See {@link Ext.Panel#baseCls}.
     */
    baseCls: 'x-btn-group',
    /**
     * @cfg {String} layout  Defaults to <tt>'table'</tt>.  See {@link Ext.Container#layout}.
     */
    layout:'table',
    defaultType: 'button',
    /**
     * @cfg {Boolean} frame  Defaults to <tt>true</tt>.  See {@link Ext.Panel#frame}.
     */
    frame: true,
    internalDefaults: {removeMode: 'container', hideParent: true},

    initComponent : function(){
        this.layoutConfig = this.layoutConfig || {};
        Ext.applyIf(this.layoutConfig, {
            columns : this.columns
        });
        if(!this.title){
            this.addClass('x-btn-group-notitle');
        }
        this.on('afterlayout', this.onAfterLayout, this);
        Ext.ButtonGroup.superclass.initComponent.call(this);
    },

    applyDefaults : function(c){
        c = Ext.ButtonGroup.superclass.applyDefaults.call(this, c);
        var d = this.internalDefaults;
        if(c.events){
            Ext.applyIf(c.initialConfig, d);
            Ext.apply(c, d);
        }else{
            Ext.applyIf(c, d);
        }
        return c;
    },

    onAfterLayout : function(){
        var bodyWidth = this.body.getFrameWidth('lr') + this.body.dom.firstChild.offsetWidth;
        this.body.setWidth(bodyWidth);
        this.el.setWidth(bodyWidth + this.getFrameWidth());
    }
    /**
     * @cfg {Array} tools  @hide
     */
   
});

Ext.reg('buttongroup', Ext.ButtonGroup);