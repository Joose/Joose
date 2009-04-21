/*
 * Ext JS Library 3.0 RC1
 * Copyright(c) 2006-2009, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */

/**
 * @class Ext.PagingToolbar
 * @extends Ext.Toolbar
 * <p>As the amount of records increases, the time required for the browser to render
 * them increases. Paging is used to reduce the amount of data exchanged with the client.
 * Note: if there are more records/rows than can be viewed in the available screen area, vertical
 * scrollbars will be added.</p>
 * <p>Paging is typically handled on the server side (see exception below). The client sends
 * parameters to the server side, which the server needs to interpret and then respond with the
 * approprate data.</p>
 * <p><b>Ext.PagingToolbar</b> is a specialized toolbar that is bound to a {@link Ext.data.Store}
 * and provides automatic paging control. This Component {@link Ext.data.Store#load load}s blocks
 * of data into the <tt>{@link #store}</tt> by passing {@link #paramNames parameters} used for
 * paging criteria.</p>
 * <p>PagingToolbar is typically used as one of the Grid's toolbars:</p>
 * <pre><code>
Ext.QuickTips.init(); // to display button quicktips

var myStore = new Ext.data.Store({
    ... 
});

var myPageSize = 25;  // server script should only send back 25 items

var grid = new Ext.grid.GridPanel({
    ...
    store: myStore,
    bbar: new Ext.PagingToolbar({
        {@link #store}: myStore,       // grid and PagingToolbar using same store
        {@link #displayInfo}: true,
        {@link #pageSize}: myPageSize,
        {@link #prependButtons}: true,
        items: [
            'text 1'
        ]
    })
});
 * </code></pre>
 * 
 * <p>To use paging, pass the paging requirements to the server when the store is first loaded.</p> 
 * <pre><code>
store.load({
    params: {
        start: 0,          // specify params for the first page load if using paging
        limit: myPageSize,
        foo:   'bar'
});
 * </code></pre>
 * <p><u>Paging with Local Data</u></p>
 * <p>Paging can also be accomplished with local data using extensions:</p>
 * <div class="mdetail-params"><ul>
 * <li><a href="http://extjs.com/forum/showthread.php?t=57386">Ext.ux.data.PagingStore</a></li>
 * <li>Paging Memory Proxy (examples/locale/PagingMemoryProxy.js)</li>
 * </ul></div>
 * @constructor
 * Create a new PagingToolbar
 * @param {Object} config The config object
 * @xtype paging
 */
(function() {

var T = Ext.Toolbar;

Ext.PagingToolbar = Ext.extend(Ext.Toolbar, {
    /**
     * @cfg {Ext.data.Store} store
     * The {@link Ext.data.Store} the paging toolbar should use as its data source (required).
     */
    /**
     * @cfg {Boolean} displayInfo
     * <tt>true</tt> to display the displayMsg (defaults to <tt>false</tt>)
     */
    /**
     * @cfg {Number} pageSize
     * The number of records to display per page (defaults to <tt>20</tt>)
     */
    pageSize: 20,
    /**
     * @cfg {Boolean} prependButtons
     * <tt>true</tt> to insert any configured <tt>items</tt> <i>before</i> the paging buttons.
     * Defaults to <tt>false</tt>.
     */
    /**
     * @cfg {String} displayMsg
     * The paging status message to display (defaults to <tt>"Displaying {0} - {1} of {2}"</tt>).
     * Note that this string is formatted using the braced numbers <tt>{0}-{2}</tt> as tokens
     * that are replaced by the values for start, end and total respectively. These tokens should
     * be preserved when overriding this string if showing those values is desired.
     */
    displayMsg : 'Displaying {0} - {1} of {2}',
    /**
     * @cfg {String} emptyMsg
     * The message to display when no records are found (defaults to "No data to display")
     */
    emptyMsg : 'No data to display',
    /**
     * @cfg {String} beforePageText
     * The text displayed before the input item (defaults to <tt>"Page"</tt>).
     */
    beforePageText : "Page",
    /**
     * @cfg {String} afterPageText
     * Customizable piece of the default paging text (defaults to <tt>"of {0}"</tt>). Note that
     * this string is formatted using <tt>{0}</tt> as a token that is replaced by the number of
     * total pages. This token should be preserved when overriding this string if showing the
     * total page count is desired.
     */
    afterPageText : "of {0}",
    /**
     * @cfg {String} firstText
     * The quicktip text displayed for the first page button (defaults to <tt>"First Page"</tt>).
     * <b>Note</b>: quick tips must be initialized for the quicktip to show.
     */
    firstText : "First Page",
    /**
     * @cfg {String} prevText
     * The quicktip text displayed for the previous page button (defaults to <tt>"Previous Page"</tt>).
     * <b>Note</b>: quick tips must be initialized for the quicktip to show.
     */
    prevText : "Previous Page",
    /**
     * @cfg {String} nextText
     * The quicktip text displayed for the next page button (defaults to <tt>"Next Page"</tt>).
     * <b>Note</b>: quick tips must be initialized for the quicktip to show.
     */
    nextText : "Next Page",
    /**
     * @cfg {String} lastText
     * The quicktip text displayed for the last page button (defaults to <tt>"Last Page"</tt>).
     * <b>Note</b>: quick tips must be initialized for the quicktip to show.
     */
    lastText : "Last Page",
    /**
     * @cfg {String} lastText
     * The quicktip text displayed for the Refresh button (defaults to <tt>"Refresh"</tt>).
     * <b>Note</b>: quick tips must be initialized for the quicktip to show.
     */
    refreshText : "Refresh",

    /**
     * Object mapping of parameter names used for load calls.  This property is affected by
     * See also {@link Ext.data.Store#paramNames}, but is initially set to:
     * <pre>{start: 'start', limit: 'limit'}</pre>
     */
    paramNames : {start: 'start', limit: 'limit'},

    /**
     * The number of records to display per page.  See also <tt>{@link #cursor}</tt>.
     * @type Number
     * @property pageSize
     */
    
    /**
     * Indicator for the record position.  This property might be used to get the active page
     * number for example:<pre><code>
     * // t is reference to the paging toolbar instance
     * var activePage = Math.ceil((t.cursor + t.pageSize) / t.pageSize);
     * </code></pre>
     * @type Number
     * @property cursor
     */
    
    // private
    constructor: function(config) {
	    var pagingItems = [this.first = new T.Button({
	        tooltip: this.firstText,
	        iconCls: "x-tbar-page-first",
	        disabled: true,
	        handler: this.onClick,
	        scope: this
	    }), this.prev = new T.Button({
	        tooltip: this.prevText,
	        iconCls: "x-tbar-page-prev",
	        disabled: true,
	        handler: this.onClick,
	        scope: this
	    }), '-', this.beforePageText,
	    this.inputItem = new T.Item({
	    	height: 18,
	    	autoEl: {
		        tag: "input",
		        type: "text",
		        size: "3",
		        value: "1",
		        cls: "x-tbar-page-number"
		    }
	    }), this.afterTextItem = new T.TextItem({
	    	text: String.format(this.afterPageText, 1)
	    }), '-', this.next = new T.Button({
            tooltip: this.nextText,
	        iconCls: "x-tbar-page-next",
	        disabled: true,
	        handler: this.onClick,
	        scope: this
	    }), this.last = new T.Button({
	        tooltip: this.lastText,
	        iconCls: "x-tbar-page-last",
	        disabled: true,
	        handler: this.onClick,
	        scope: this
	    }), '-', this.refresh = new T.Button({
	        tooltip: this.refreshText,
	        iconCls: "x-tbar-loading",
	        handler: this.onClick,
	        scope: this
	    })];


        var userItems = config.items || config.buttons || [];
        if (config.prependButtons) {
            config.items = userItems.concat(pagingItems);
        }else{
            config.items = pagingItems.concat(userItems);
        }
	    delete config.buttons;
	    if(config.displayInfo){
            config.items.push('->');
            config.items.push(this.displayItem = new T.TextItem({}));
        }
	    Ext.PagingToolbar.superclass.constructor.apply(this, arguments);

        this.addEvents(
            /**
             * @event change
             * Fires after the active page has been changed.
             * @param {Ext.PagingToolbar} this
             * @param {Object} pageData An object that has these properties:<ul>
             * <li><code>total</code> : Number <div class="sub-desc">The total number of records in the dataset as
             * returned by the server</div></li>
             * <li><code>activePage</code> : Number <div class="sub-desc">The current page number</div></li>
             * <li><code>pages</code> : Number <div class="sub-desc">The total number of pages (calculated from
             * the total number of records in the dataset as returned by the server and the current {@link #pageSize})</div></li>
             * </ul>
             */
            'change',
            /**
             * @event beforechange
             * Fires just before the active page is changed.
             * Return false to prevent the active page from being changed.
             * @param {Ext.PagingToolbar} this
             * @param {Object} params An object hash of the parameters which the PagingToolbar will send when
             * loading the required page. This will contain:<ul>
             * <li><code>start</code> : Number <div class="sub-desc">The starting row number for the next page of records to
             * be retrieved from the server</div></li>
             * <li><code>limit</code> : Number <div class="sub-desc">The number of records to be retrieved from the server</div></li>
             * </ul>
             * <p>(note: the names of the <b>start</b> and <b>limit</b> properties are determined
             * by the store's {@link Ext.data.Store#paramNames paramNames} property.)</p>
             * <p>Parameters may be added as required in the event handler.</p>
             */
            'beforechange'
        );

        this.cursor = 0;
        this.bindStore(this.store);
	},
    
    initComponent: function(){
        Ext.PagingToolbar.superclass.initComponent.call(this);
        this.on('afterlayout', this.onFirstLayout, this, {single: true});
    },

    // private
	onFirstLayout: function(ii) {
		this.mon(this.inputItem.el, "keydown", this.onPagingKeyDown, this);
		this.mon(this.inputItem.el, "blur", this.onPagingBlur, this);
		this.mon(this.inputItem.el, "focus", this.onPagingFocus, this);

        this.field = this.inputItem.el.dom;
        if(this.dsLoaded){
            this.onLoad.apply(this, this.dsLoaded);
        }
	},

    // private
    updateInfo : function(){
        if(this.displayItem){
            var count = this.store.getCount();
            var msg = count == 0 ?
                this.emptyMsg :
                String.format(
                    this.displayMsg,
                    this.cursor+1, this.cursor+count, this.store.getTotalCount()
                );
            this.displayItem.setText(msg);
        }
    },

    // private
    onLoad : function(store, r, o){
        if(!this.rendered){
            this.dsLoaded = [store, r, o];
            return;
        }
        this.cursor = (o.params && o.params[this.paramNames.start]) ? o.params[this.paramNames.start] : 0;
        var d = this.getPageData(), ap = d.activePage, ps = d.pages;

        this.afterTextItem.setText(String.format(this.afterPageText, d.pages));
        this.field.value = ap;
        this.first.setDisabled(ap == 1);
        this.prev.setDisabled(ap == 1);
        this.next.setDisabled(ap == ps);
        this.last.setDisabled(ap == ps);
        this.refresh.enable();
        this.updateInfo();
        this.fireEvent('change', this, d);
    },

    // private
    getPageData : function(){
        var total = this.store.getTotalCount();
        return {
            total : total,
            activePage : Math.ceil((this.cursor+this.pageSize)/this.pageSize),
            pages :  total < this.pageSize ? 1 : Math.ceil(total/this.pageSize)
        };
    },

    /**
     * Change the active page
     * @param {Integer} page The page to display
     */
    changePage: function(page){
        this.doLoad(((page-1) * this.pageSize).constrain(0, this.store.getTotalCount()));
    },

    // private
    onLoadError : function(){
        if(!this.rendered){
            return;
        }
        this.refresh.enable();
    },

    // private
    readPage : function(d){
        var v = this.field.value, pageNum;
        if (!v || isNaN(pageNum = parseInt(v, 10))) {
            this.field.value = d.activePage;
            return false;
        }
        return pageNum;
    },
    
    onPagingFocus: function(){
        this.field.select();
    },

    //private
    onPagingBlur: function(e){
        this.field.value = this.getPageData().activePage;
    },

    // private
    onPagingKeyDown : function(e){
        var k = e.getKey(), d = this.getPageData(), pageNum;
        if (k == e.RETURN) {
            e.stopEvent();
            pageNum = this.readPage(d);
            if(pageNum !== false){
                pageNum = Math.min(Math.max(1, pageNum), d.pages) - 1;
                this.doLoad(pageNum * this.pageSize);
            }
        }else if (k == e.HOME || k == e.END){
            e.stopEvent();
            pageNum = k == e.HOME ? 1 : d.pages;
            this.field.value = pageNum;
        }else if (k == e.UP || k == e.PAGEUP || k == e.DOWN || k == e.PAGEDOWN){
            e.stopEvent();
            if(pageNum = this.readPage(d)){
                var increment = e.shiftKey ? 10 : 1;
                if(k == e.DOWN || k == e.PAGEDOWN){
                    increment *= -1;
                }
                pageNum += increment;
                if(pageNum >= 1 & pageNum <= d.pages){
                    this.field.value = pageNum;
                }
            }
        }
    },

    // private
    beforeLoad : function(){
        if(this.rendered && this.refresh){
            this.refresh.disable();
        }
    },

    // private
    doLoad : function(start){
        var o = {}, pn = this.paramNames;
        o[pn.start] = start;
        o[pn.limit] = this.pageSize;
        if(this.fireEvent('beforechange', this, o) !== false){
            this.store.load({params:o});
        }
    },

    // private
    onClick : function(button){
        var store = this.store;
        switch(button){
            case this.first:
                this.doLoad(0);
            break;
            case this.prev:
                this.doLoad(Math.max(0, this.cursor-this.pageSize));
            break;
            case this.next:
                this.doLoad(this.cursor+this.pageSize);
            break;
            case this.last:
                var total = store.getTotalCount();
                var extra = total % this.pageSize;
                var lastStart = extra ? (total - extra) : total-this.pageSize;
                this.doLoad(lastStart);
            break;
            case this.refresh:
                this.doLoad(this.cursor);
            break;
        }
    },

    /**
     * Binds the paging toolbar to the specified {@link Ext.data.Store}
     * @param {Store} store The store to bind to this view
     */
    bindStore : function(store, initial){
        if(!initial && this.store){
            this.store.un("beforeload", this.beforeLoad, this);
            this.store.un("load", this.onLoad, this);
            this.store.un("loadexception", this.onLoadError, this);
            
            if(store !== this.store && this.store.autoDestroy){
                this.store.destroy();
            }
        }
        if(store){
            store = Ext.StoreMgr.lookup(store);
            store.on("beforeload", this.beforeLoad, this);
            store.on("load", this.onLoad, this);
            store.on("loadexception", this.onLoadError, this);  
                      
            this.paramNames.start = store.paramNames.start;
            this.paramNames.limit = store.paramNames.limit;
            
            if (store.getCount() > 0){
                this.onLoad(store, null, {});
            }            
        }
        this.store = store;
    },

    /**
     * Unbinds the paging toolbar from the specified {@link Ext.data.Store} <b>(deprecated)</b>
     * @param {Ext.data.Store} store The data store to unbind
     */
    unbind : function(store){
        this.bindStore(null);
    },

    /**
     * Binds the paging toolbar to the specified {@link Ext.data.Store} <b>(deprecated)</b>
     * @param {Ext.data.Store} store The data store to bind
     */
    bind : function(store){
        this.bindStore(store);
    },
        
    // private
    onDestroy : function(){
        this.bindStore(null);
        Ext.PagingToolbar.superclass.onDestroy.call(this);
    }
});

})();
Ext.reg('paging', Ext.PagingToolbar);