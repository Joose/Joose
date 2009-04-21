/*
 * Ext JS Library 3.0 RC1
 * Copyright(c) 2006-2009, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */

/**
 * @class Ext.data.Store
 * @extends Ext.util.Observable
 * The Store class encapsulates a client side cache of {@link Ext.data.Record Record}
 * objects which provide input data for Components such as the {@link Ext.grid.GridPanel GridPanel},
 * the {@link Ext.form.ComboBox ComboBox}, or the {@link Ext.DataView DataView}.</p>
 * <p>A Store object uses its {@link #proxy configured} implementation of {@link Ext.data.DataProxy DataProxy}
 * to access a data object unless you call {@link #loadData} directly and pass in your data.</p>
 * <p>A Store object has no inherent knowledge of the format of the data returned by the Proxy (the data object
 * could be an Array, XML, or JSON). A Store object uses an appropriate {@link #reader configured} implementation
 * of a {@link Ext.data.DataReader DataReader} to create {@link Ext.data.Record Record} instances from the data
 * object. These generated Records are cached and made available through accessor functions.</p>
 * @constructor
 * Creates a new Store.
 * @param {Object} config A config object containing the objects needed for the Store to access data,
 * and read the data into Records.
 * @xtype store
 */
Ext.data.Store = function(config){
    this.data = new Ext.util.MixedCollection(false);
    this.data.getKey = function(o){
        return o.id;
    };
    /**
     * An object containing properties which are used as parameters for every HTTP request.
     * <b>Note</b>: <tt>baseParams</tt> will supersede any <tt>params</tt> provided in a
     * <tt>{@link #load}</tt> request, see <tt>{@link #load}</tt> for more details.
     * @property
     */
    this.baseParams = {};
    /**
     * <p>An object containing properties which specify the names of the paging and
     * sorting parameters passed to remote servers when loading blocks of data. By default, this
     * object takes the following form:</p><pre><code>
{
    start : "start",  // The parameter name which specifies the start row
    limit : "limit",  // The parameter name which specifies number of rows to return
    sort : "sort",    // The parameter name which specifies the column to sort on
    dir : "dir"       // The parameter name which specifies the sort direction
}
</code></pre>
     * <p>The server must produce the requested data block upon receipt of these parameter names.
     * If different parameter names are required, this property can be overriden using a configuration
     * property.</p>
     * <p>A {@link Ext.PagingToolbar PagingToolbar} bound to this Store uses this property to determine
     * the parameter names to use in its {@link #load requests}.
     * @property
     */
    this.paramNames = {
        "start" : "start",
        "limit" : "limit",
        "sort" : "sort",
        "dir" : "dir"
    };

    if(config && config.data){
        this.inlineData = config.data;
        delete config.data;
    }

    Ext.apply(this, config);

    if(this.url && !this.proxy){
        this.proxy = new Ext.data.HttpProxy({url: this.url});
    }

    if(this.reader){ // reader passed
        if(!this.recordType){
            this.recordType = this.reader.recordType;
        }
        if(this.reader.onMetaChange){
            this.reader.onMetaChange = this.onMetaChange.createDelegate(this);
        }
        if (this.writer) { // writer passed
            this.writer.meta = this.reader.meta;
            this.pruneModifiedRecords = true;
        }
    }

    /**
     * The {@link Ext.data.Record Record} constructor as supplied to (or created by) the
     * {@link Ext.data.DataReader Reader}. Read-only.
     * <p>If the Reader was constructed by passing in an Array of {@link Ext.data.Field} definition objects,
     * instead of a created Record constructor it will implicitly create a constructor from that Array, see
     * {@link Ext.data.Record}.{@link Ext.data.Record#create create} for additional details.</p>
     * <p>This property may be used to create new Records of the type held in this Store, for example:</p><pre><code>
// create the data store
var store = new Ext.data.ArrayStore({
    autoDestroy: true,
    fields: [
       {name: 'company'},
       {name: 'price', type: 'float'},
       {name: 'change', type: 'float'},
       {name: 'pctChange', type: 'float'},
       {name: 'lastChange', type: 'date', dateFormat: 'n/j h:ia'}
    ]
});
store.loadData(myData);

// create the Grid
var grid = new Ext.grid.EditorGridPanel({
    store: store,
    colModel: new Ext.grid.ColumnModel({
        columns: [
            {id:'company', header: "Company", width: 160, dataIndex: 'company'},
            {header: "Price", renderer: 'usMoney', dataIndex: 'price'},
            {header: "Change", renderer: change, dataIndex: 'change'},
            {header: "% Change", renderer: pctChange, dataIndex: 'pctChange'},
            {header: "Last Updated", width: 85,
                renderer: Ext.util.Format.dateRenderer('m/d/Y'),
                dataIndex: 'lastChange'}
        ],
        defaults: {
            sortable: true,
            width: 75
        }
    }),
    autoExpandColumn: 'company', // match the id specified in the column model
    height:350,
    width:600,
    title:'Array Grid',
    tbar: [{
        text: 'Add Record',
        handler : function(){
            var defaultData = {
                change: 0,
                company: 'New Company',
                lastChange: (new Date()).clearTime(),
                pctChange: 0,
                price: 10
            };
            var recId = 3; // provide unique id
            var p = new store.recordType(defaultData, recId); // create new record
            grid.stopEditing();
            store.insert(0, p); // add new record to the store
            grid.startEditing(0, 0);
        }
    }]
});
     * </code></pre>
     * @property recordType
     * @type Function
     */
    if(this.recordType){
        /**
         * A {@link Ext.util.MixedCollection MixedCollection} containing the defined {@link Ext.data.Field Field}s
         * for the {@link Ext.data.Record Records} stored in this Store. Read-only.
         * @property fields
         * @type Ext.util.MixedCollection
         */
        this.fields = this.recordType.prototype.fields;
    }
    this.modified = [];

    this.addEvents(
        /**
         * @event datachanged
         * Fires when the data cache has changed in a bulk manner (e.g., it has been sorted, filtered, etc.) and a
         * widget that is using this Store as a Record cache should refresh its view.
         * @param {Store} this
         */
        'datachanged',
        /**
         * @event metachange
         * Fires when this store's reader provides new metadata (fields). This is currently only supported for JsonReaders.
         * @param {Store} this
         * @param {Object} meta The JSON metadata
         */
        'metachange',
        /**
         * @event add
         * Fires when Records have been {@link #add}ed to the Store
         * @param {Store} this
         * @param {Ext.data.Record[]} records The array of Records added
         * @param {Number} index The index at which the record(s) were added
         */
        'add',
        /**
         * @event remove
         * Fires when a Record has been {@link #remove}d from the Store
         * @param {Store} this
         * @param {Ext.data.Record} record The Record that was removed
         * @param {Number} index The index at which the record was removed
         */
        'remove',
        /**
         * @event update
         * Fires when a Record has been updated
         * @param {Store} this
         * @param {Ext.data.Record} record The Record that was updated
         * @param {String} operation The update operation being performed.  Value may be one of:
         * <pre><code>
 Ext.data.Record.EDIT
 Ext.data.Record.REJECT
 Ext.data.Record.COMMIT
         * </code></pre>
         */
        'update',
        /**
         * @event clear
         * Fires when the data cache has been cleared.
         * @param {Store} this
         */
        'clear',
        /**
         * @event beforeload
         * Fires before a request is made for a new data object.  If the beforeload handler returns
         * <tt>false</tt> the {@link #load} action will be canceled.
         * @param {Store} this
         * @param {Object} options The loading options that were specified (see {@link #load} for details)
         */
        'beforeload',
        /**
         * @event load
         * Fires after a new set of Records has been loaded.
         * @param {Store} this
         * @param {Ext.data.Record[]} records The Records that were loaded
         * @param {Object} options The loading options that were specified (see {@link #load} for details)
         */
        'load',
        /**
         * @event loadexception
         * Fires if an exception occurs in the Proxy during loading.
         * Called with the signature of the Proxy's "loadexception" event.
         */
        'loadexception',
        /**
         * @event beforesave
         * Fires before a network save request fires.  If the handler returns false, the action will be cancelled.
         * @param {Store} this
         * @param {Record/Record[]} The record or Array of records being saved
         */
        'beforesave',
        /**
         * @event save
         * Fires after a network save request has completed.
         * @param {Store} this
         * @param {Object} result data
         * @param {Ext.Direct.Transaction} response
         */
        'save',
        /**
         * @event saveexception
         * Fires when a network save exception occurs.
         * @param {DirectProxy} proxy
         * @param {Object} result
         * @param {Ext.Direct.ExceptionEvent}
         */
        'saveexception',
        /**
         * @event beforedestroy
         * Fires before a record will be destroyed
         * @param {Store} this
         * @param {Record/Record[]} rs, record(s) to be destroyed
         */
        'beforedestroy',
        /**
         * @event destroy
         * Fires after a record has been destroyed
         * @param {Store} this
         * @param {Object} result
         * @param {Ext.Direct.Event} response
         */
        'destroy',
        /**
         * @event destroyexception
         * Fires when a destroy exception occurred
         * @param {Store} this
         * @param {Ext.data.Record[]} rs
         * @param {Ext.Direct.Event} response
         */
        'destroyexception',
        /**
         * @event beforecreate
         * Fires before a network create request occurs
         * @param {Store} this
         * @param {Record/Record[]}
         */
        'beforecreate',
        /**
         * @event create
         * Fires after network create request occurs
         * @param {Store} this
         * @param {Object} result
         * @param {Ext.Direct.ExceptionEvent} response
         */
        'create',
        /**
         * @event createexception
         * Fires after network create exception occurs
         * @param {DirectProxy} this
         * @param {Record} record
         * @param {Ext.Direct.ExceptionEvent}
         */
        'createexception',
		/**
		 * @event event
		 * fires on create, load, destroy, save
		 */
		'event'
    );

    if(this.proxy){
        this.relayEvents(this.proxy,  ["loadexception"]);
    }
    // With a writer installed into the Store, we want to listen to add/remove events to remotely create/destroy records.
    if (this.writer) {
        this.relayEvents(this.proxy, ["saveexception", "createexception", "destroyexception"]);
        this.on('add', this.createRecords.createDelegate(this));
        this.on('remove', this.destroyRecord.createDelegate(this));
        this.on('update', this.updateRecord.createDelegate(this));
    }

    this.sortToggle = {};
    if(this.sortField){
        this.setDefaultSort(this.sortField, this.sortDir);
    }else if(this.sortInfo){
        this.setDefaultSort(this.sortInfo.field, this.sortInfo.direction);
    }

    Ext.data.Store.superclass.constructor.call(this);

    if(this.id){
        this.storeId = this.id;
        delete this.id;
    }
    if(this.storeId){
        Ext.StoreMgr.register(this);
    }
    if(this.inlineData){
        this.loadData(this.inlineData);
        delete this.inlineData;
    }else if(this.autoLoad){
        this.load.defer(10, this, [
            typeof this.autoLoad == 'object' ?
                this.autoLoad : undefined]);
    }
};
Ext.extend(Ext.data.Store, Ext.util.Observable, {
    /**
     * @cfg {String} storeId If passed, the id to use to register with the <b>{@link Ext.StoreMgr StoreMgr}</b>.
     * <p><b>Note</b>: if a (deprecated) <tt>{@link #id}</tt> is specified it will supersede the <tt>storeId</tt>
     * assignment.</p>
     */
    /**
     * @cfg {String} url If a <tt>{@link #proxy}</tt> is not specified the <tt>url</tt> will be used to
     * implicitly configure a {@link Ext.data.HttpProxy HttpProxy} if an <tt>url</tt> is specified.
     */
    /**
     * @cfg {Boolean/Object} autoLoad If <tt>{@link #data}</tt> is not specified, and if <tt>autoLoad</tt>
     * is <tt>true</tt> or an <tt>Object</tt>, this store's {@link #load} method is automatically called
     * after creation. If the value of <tt>autoLoad</tt> is an <tt>Object</tt>, this <tt>Object</tt> will
     * be passed to the store's {@link #load} method.
     */
    /**
     * @cfg {Ext.data.DataProxy} proxy The {@link Ext.data.DataProxy DataProxy} object which provides
     * access to a data object.
     */
    /**
     * @cfg {Array} data Inline data to be loaded when the store is initialized.
     */
    /**
     * @cfg {Ext.data.DataReader} reader The {@link Ext.data.DataReader Reader} object which processes the
     * data object and returns an Array of {@link Ext.data.Record} objects which are cached keyed by their
     * <b><tt>{@link Ext.data.Record#id id}</tt></b> property.
     */
    /**
     * @cfg {Ext.data.DataWriter} writer The {@link Ext.data.DataWriter Writer} object which processes a record
     * object for being written to the server-side database.
     */
    writer : undefined,
    /**
     * @cfg {Object} baseParams <p>An object containing properties which are to be sent as parameters
     * for <i>every</i> HTTP request.</p>
     * <p>Parameters are encoded as standard HTTP parameters using {@link Ext#urlEncode}.</p>
     * <p><b>Note</b>: <tt>baseParams</tt> will supersede any <tt>params</tt> provided in a
     * <tt>{@link #load}</tt> request, see <tt>{@link #load}</tt> for more details.</p>
     */
    /**
     * @cfg {Object} sortInfo A config object to specify the sort order in the request of a Store's
     * {@link #load} operation.  Note that for local sorting, the <tt>direction</tt> property is
     * case-sensitive. See also {@link #remoteSort} and {@link #paramNames}.
     * For example:<pre><code>
sortInfo: {
    field: "fieldName",
    direction: "ASC" // or "DESC" (case sensitive for local sorting)
}
</code></pre>
     */
    /**
     * @cfg {boolean} remoteSort <tt>true</tt> if sorting is to be handled by requesting the <tt>{@link #proxy Proxy}</tt>
     * to provide a refreshed version of the data object in sorted order, as opposed to sorting the Record cache
     * in place (defaults to <tt>false</tt>).
     * <p>If <tt>remoteSort</tt> is <tt>true</tt>, then clicking on a {@link Ext.grid.Column Grid Column}'s
     * {@link Ext.grid.Column#header header} causes the current page to be requested from the server appending
     * the following two parameters to the <b><tt>{@link #load params}</tt></b>:<div class="mdetail-params"><ul>
     * <li><b><tt>sort</tt></b> : String<p class="sub-desc">The <tt>name</tt> (as specified in the Record's
     * {@link Ext.data.Field Field definition}) of the field to sort on.</p></li>
     * <li><b><tt>dir</tt></b> : String<p class="sub-desc">The direction of the sort, "ASC" or "DESC" (case-sensitive).</p></li>
     * </ul></div></p>
     */
    remoteSort : false,

    /**
     * @cfg {Boolean} autoDestroy <tt>true</tt> to destroy the store when the component the store is bound
     * to is destroyed (defaults to <tt>false</tt>).
     * <p><b>Note</b>: this should be set to true when using stores that are bound to only 1 component.</p>
     */
    autoDestroy : false,

    /**
     * @cfg {Boolean} pruneModifiedRecords <tt>true</tt> to clear all modified record information each time
     * the store is loaded or when a record is removed (defaults to <tt>false</tt>). See {@link #getModifiedRecords}
     * for the accessor method to retrieve the modified records.
     */
    pruneModifiedRecords : false,

    /**
     * Contains the last options object used as the parameter to the {@link #load} method. See {@link #load}
     * for the details of what this may contain. This may be useful for accessing any params which were used
     * to load the current Record cache.
     * @property
     */
   lastOptions : null,

    /**
     * @cfg {Boolean} batchSave
     * Defaults to <tt>false</tt>, which requires manually calling {@link #save} to send all
     * modifiedRecords to the server. Specify <tt>true</tt> for the store to automatically
     * {@link #save} records to the server when a record changes.
     */
    batchSave : false,

    // private destroy temporary cache
    removed : [],

    /**
     * Destroys the store.
     */
    destroy : function(){
        if(this.storeId){
            Ext.StoreMgr.unregister(this);
        }
        this.data = null;
        this.purgeListeners();
    },

    /**
     * Add Records to the Store and fires the {@link #add} event.
     * @param {Ext.data.Record[]} records An Array of Ext.data.Record objects to add to the cache. See {@link #recordType}.
     */
    add : function(records){
        records = [].concat(records);
        if(records.length < 1){
            return;
        }
        for(var i = 0, len = records.length; i < len; i++){
            records[i].join(this);
        }
        var index = this.data.length;
        this.data.addAll(records);
        if(this.snapshot){
            this.snapshot.addAll(records);
        }
        this.fireEvent("add", this, records, index);
    },

    /**
     * (Local sort only) Inserts the passed Record into the Store at the index where it
     * should go based on the current sort information.
     * @param {Ext.data.Record} record
     */
    addSorted : function(record){
        var index = this.findInsertIndex(record);
        this.insert(index, record);
    },

    /**
     * Remove a Record from the Store and fires the {@link #remove} event.
     * @param {Ext.data.Record} record The Ext.data.Record object to remove from the cache.
     */
    remove : function(record){
        var index = this.data.indexOf(record);
        this.data.removeAt(index);
        if(this.pruneModifiedRecords){
            this.modified.remove(record);
        }
        if(this.snapshot){
            this.snapshot.remove(record);
        }
        this.fireEvent("remove", this, record, index);
    },

    /**
     * Remove a Record from the Store at the specified index. Fires the {@link #remove} event.
     * @param {Number} index The index of the record to remove.
     */
    removeAt : function(index){
        this.remove(this.getAt(index));
    },

    /**
     * Remove all Records from the Store and fires the {@link #clear} event.
     */
    removeAll : function(){
        this.data.clear();
        if(this.snapshot){
            this.snapshot.clear();
        }
        if(this.pruneModifiedRecords){
            this.modified = [];
        }
        this.fireEvent("clear", this);
    },

    /**
     * Inserts Records into the Store at the given index and fires the {@link #add} event.
     * @param {Number} index The start index at which to insert the passed Records.
     * @param {Ext.data.Record[]} records An Array of Ext.data.Record objects to add to the cache.
     */
    insert : function(index, records){
        records = [].concat(records);
        for(var i = 0, len = records.length; i < len; i++){
            this.data.insert(index, records[i]);
            records[i].join(this);
        }
        this.fireEvent("add", this, records, index);
    },

    /**
     * Get the index within the cache of the passed Record.
     * @param {Ext.data.Record} record The Ext.data.Record object to find.
     * @return {Number} The index of the passed Record. Returns -1 if not found.
     */
    indexOf : function(record){
        return this.data.indexOf(record);
    },

    /**
     * Get the index within the cache of the Record with the passed id.
     * @param {String} id The id of the Record to find.
     * @return {Number} The index of the Record. Returns -1 if not found.
     */
    indexOfId : function(id){
        return this.data.indexOfKey(id);
    },

    /**
     * Get the Record with the specified id.
     * @param {String} id The id of the Record to find.
     * @return {Ext.data.Record} The Record with the passed id. Returns undefined if not found.
     */
    getById : function(id){
        return this.data.key(id);
    },

    /**
     * Get the Record at the specified index.
     * @param {Number} index The index of the Record to find.
     * @return {Ext.data.Record} The Record at the passed index. Returns undefined if not found.
     */
    getAt : function(index){
        return this.data.itemAt(index);
    },

    /**
     * Returns a range of Records between specified indices.
     * @param {Number} startIndex (optional) The starting index (defaults to 0)
     * @param {Number} endIndex (optional) The ending index (defaults to the last Record in the Store)
     * @return {Ext.data.Record[]} An array of Records
     */
    getRange : function(start, end){
        return this.data.getRange(start, end);
    },

    // private
    storeOptions : function(o){
        o = Ext.apply({}, o);
        delete o.callback;
        delete o.scope;
        this.lastOptions = o;
    },

    /**
     * Loads the Record cache from the configured <tt>{@link #proxy}</tt> using the configured <tt>{@link #reader}</tt>.
     * <p>If using remote paging, then the first load call must specify the <tt>start</tt>
     * and <tt>limit</tt> properties in the options.params property to establish the initial
     * position within the dataset, and the number of Records to cache on each read from the Proxy.</p>
     * <p><b>Important</b>: loading is asynchronous, so this call will return before the new data has been
     * loaded. To perform any post-processing where information from the load call is required, use the
     * <tt>callback</tt> function, or {@link Ext.util.Observable#listeners a "load" event handler}.</p>
     * @param {Object} options An object containing properties which control loading options:<ul>
     * <li><b><tt>params</tt></b> :Object<div class="sub-desc"><p>An object containing properties to pass as HTTP
     * parameters to a remote data source. <b>Note</b>: <tt>{@link #baseParams}</tt> will supersede specified
     * <tt>parameters</tt>.</p>
     * <p>Parameters are encoded as standard HTTP parameters using {@link Ext#urlEncode}.</p></div></li>
     * <li><b><tt>callback</tt></b> : Function<div class="sub-desc"><p>A function to be called after the Records
     * have been loaded. The <tt>callback</tt> is passed the following arguments:<ul>
     * <li><tt>r</tt> : Ext.data.Record[]</li>
     * <li><tt>options</tt>: Options object from the load call</li>
     * <li><tt>success</tt>: Boolean success indicator</li></ul></p></div></li>
     * <li><b><tt>scope</tt></b> : Object<div class="sub-desc"><p>Scope with which to call the callback (defaults
     * to the Store object)</p></div></li>
     * <li><b><tt>add</tt></b> : Boolean<div class="sub-desc"><p>Indicator to append loaded records rather than
     * replace the current cache.  <b>Note</b>: see note for <tt>{@link #loadData}</tt></p></div></li>
     * </ul>
     * @return {Boolean} If the <i>developer</i> provided <tt>{@link #beforeload}</tt> event handler returns
     * <tt>false</tt>, the load call will abort and will return <tt>false</tt>; otherwise will return <tt>true</tt>.
     */
    load : function(options) {
        options = options || {};
        this.storeOptions(options);
        if(this.sortInfo && this.remoteSort){
            var pn = this.paramNames;
            options.params = options.params || {};
            options.params[pn["sort"]] = this.sortInfo.field;
            options.params[pn["dir"]] = this.sortInfo.direction;
        }
        return this.execute('load', null, options);
    },

    /**
     * updateRecord  Should not be used directly.  This method will be called automatically if a Writer is installed.
     * Listens to "update" event.
     * @param {Object} store
     * @param {Object} record
     * @param {Object} action
     * @private
     */
    updateRecord : function(store, record, action) {
        if (action != Ext.data.Record.EDIT || this.batchSave) {
            return;
        }
        if (!record.phantom || (record.phantom && record.isValid)) {
            this.save(record);
        }
    },

    /**
     * createRecords.  Should not be used directly.  Store#add will call this automatically if a Writer is installed
     * @param {Object} store
     * @param {Object} rs
     * @param {Object} index
     * @private
     */
    createRecords : function(store, rs, index) {
        if (this.batchSave == false) {
            for (var i = 0, len = rs.length; i < len; i++) {
                if (rs[i].phantom && rs[i].isValid()) {
                    rs[i].markDirty();	// <-- Mark new records dirty
                    this.execute('create', rs[i]);
                }
            }
        }
        else {
            for (var i = 0, len = rs.length; i < len; i++) {
                if (rs[i].phantom && rs[i].isValid()) {
                    rs[i].markDirty();	// <-- Mark new records dirty
                    this.modified.push(rs[i]);
                }
            }
        }
    },

    /**
     * destroyRecord
     * Destroys a record or records.  Should not be used directly.  It's called by Store#remove if a Writer is installed.
     * @param {Store} this
     * @param {Ext.data.Record/Ext.data.Record[]}
     * @param {Number} index
     * @private
     */
    destroyRecord : function(store, record, index) {
        if (this.modified.indexOf(record) != -1) {	// <-- handled already if @cfg pruneModifiedRecords == true
            this.modified.remove(record);
        }
        if (record.phantom === true) {
            return;
        }

		// since the record has already been removed from the store but the server request has not yet been executed,
		// must keep track of the last known index this record existed.  If a server error occurs, the record can be
		// put back into the store.  @see Store#createCallback where the record is returned when response status === false
		record.lastIndex = index;

        if (!this.batchSave) {
            this.execute('destroy', record);
        }
        else {
            this.removed.push(record);
        }
    },

    /**
     * execute Executes a CRUD action on a proxy if a Writer is installed.  Should not be used directly.  Called automatically
     * by Store#add, Store#remove, Store#afterEdit
     * @param {String} action
     * @param {Record/Record[]} rs
     * @param {Object} options
     * @private
     */
    execute : function(action, rs, options) {
        if (action != 'load' && !this.writer) {	// TODO: define actions as CONSTANTS
            // blow up if trying to execute 'create', 'destroy', 'save' without a Writer installed.
            throw new Error('Store attempted to execute the remote action "' + action + '" without a DataWriter installed.');
        }
        options = options || {};
        if (this.fireEvent('before'+action, this, rs||options)) {	// <-- if action is load, rs will be null
            var p = Ext.apply(options.params || {}, this.baseParams, {xaction: action});
            if (this.writer && typeof(this.writer[action]) == 'function') {
                this.writer[action](p, rs);// <-- call writer if action-method exists (ie: it won't for load action; will for create, destroy, save)
            }
            this.proxy.request(action, rs, p, this.reader, this.writer, this.createCallback(action, rs), this, options);
            return true;
        }
        else {
            return false;
        }
    },

    /**
     * Send all {@link #getModifiedRecords modifiedRecords} to the server using the
     * api's configured save url.
     * @param {Object} options
     */
    save : function(rs) {
        rs = rs || this.getModifiedRecords();
        if (!rs.length && !rs instanceof Ext.data.Record && !this.removed.length) {
            return false;
        }
        var action = 'save';
        if (this.removed.length) {
            try {
                this.execute('destroy', this.removed);
            }
            catch (e) {
                throw e;	// <-- just re-throw it for now...
            }
        }
        try {
            if (Ext.isArray(rs)) {
                for (var i = rs.length-1; i >= 0; i--) {
                    if (rs[i].phantom === true) {
                        var rec = rs.splice(i, 1).shift();
                        if (rec.isValid()) {
                            this.execute('create', rec);
                        }
                    }
                }
            }
            else if (rs.phantom) {
                if (!rs.isValid()) {
                    return false;
                }
                action = 'create';
            }
            if (Ext.isArray(rs) && rs.length == 1) {
                rs = rs[0];
            }
            if (rs instanceof Ext.data.Record || rs.length > 0) {
                this.execute(action, rs);
                return true;
            }
            else {
                // no more actions to execute.  They may have been spliced-out by create actions above.  just return true.
                return true;
            }
        }
        catch (e) {
            throw e;
        }
        return true;
    },

    // private callback-handler for remote CRUD actions
	// TODO:  refactor.  place destroy fail switch into its own method perhaps?  Maybe remove the if (success === true) check
	// and let each onAction method check for success?  Notice that both the destroy-fail case and onDestroyRecords each
	// set this.removed = [].
    createCallback : function(action, rs) {
        return (action == 'load') ? this.loadRecords : function(data, response, success) {
            if (success === true) {
                switch (action) {
                    case 'create':
                        this.onCreateRecord(rs, data);
                        break;
                    case 'destroy':
                        this.onDestroyRecords(rs, data);
                        break;
                    case 'save':
                        this.onSaveRecords(rs, data);
                        break;
                }
                this.fireEvent(action, this, data, response);
            }
			else {
				switch (action) {
					case 'destroy':
						// put records back into store if remote destroy fails.
						if (rs instanceof Ext.data.Record) {
							rs = [rs];
						}
						for (var i=0,len=rs.length;i<len;i++) {
							this.insert(rs[i].lastIndex, rs[i]);	// <-- lastIndex set in Store#destroyRecord
						}
						this.removed = [];

						break;
				}
			}
			// fire on 'create', 'destroy', 'save'
			this.fireEvent('event', this, data, response);
        }
    },

    // private onCreateRecord proxy callback for create action
    onCreateRecord : function(record, data) {
        // TODO: raise exception if server didn't send a database pk back?
        if (record.phantom && data[this.reader.meta.idProperty]) {
			record.realize(data, data[this.reader.meta.idProperty]);
        }
    },

    // private, onSaveRecords proxy callback for update action
    onSaveRecords : function(rs, data) {
        if (!Ext.isArray(rs)) {
            rs = [rs];
        }
        // maybe just commit row changes?
        for (var i=rs.length-1;i>=0;i--) {
            rs[i].commit();
        }
    },

    // private onDestroyRecords proxy callback for destroy action
    onDestroyRecords : function(rs, data) {
        this.removed = [];
    },

    /**
     * <p>Reloads the Record cache from the configured Proxy using the configured {@link Ext.data.Reader Reader} and
     * the options from the last load operation performed.</p>
     * <p><b>Note</b>: see the Important note in {@link #load}.</p>
     * @param {Object} options (optional) An <tt>Object</tt> containing {@link #load loading options} which may
     * override the options used in the last {@link #load} operation. See {@link #load} for details (defaults to
     * <tt>null</tt>, in which case the {@link #lastOptions} are used).
     */
    reload : function(options){
        this.load(Ext.applyIf(options||{}, this.lastOptions));
    },

    // private
    // Called as a callback by the Reader during a load operation.
    loadRecords : function(o, options, success){
        if(!o || success === false){
            if(success !== false){
                this.fireEvent("load", this, [], options);
            }
            if(options.callback){
                options.callback.call(options.scope || this, [], options, false);
            }
            return;
        }
        var r = o.records, t = o.totalRecords || r.length;
        if(!options || options.add !== true){
            if(this.pruneModifiedRecords){
                this.modified = [];
            }
            for(var i = 0, len = r.length; i < len; i++){
                r[i].join(this);
            }
            if(this.snapshot){
                this.data = this.snapshot;
                delete this.snapshot;
            }
            this.data.clear();
            this.data.addAll(r);
            this.totalLength = t;
            this.applySort();
            this.fireEvent("datachanged", this);
        }else{
            this.totalLength = Math.max(t, this.data.length+r.length);
            this.add(r);
        }
        this.fireEvent("load", this, r, options);
        if(options.callback){
            options.callback.call(options.scope || this, r, options, true);
        }
    },

    /**
     * Loads data from a passed data block and fires the {@link #load} event. A {@link Ext.data.Reader Reader}
     * which understands the format of the data must have been configured in the constructor.
     * @param {Object} data The data block from which to read the Records.  The format of the data expected
     * is dependent on the type of {@link Ext.data.Reader Reader} that is configured and should correspond to
     * that {@link Ext.data.Reader Reader}'s <tt>{@link Ext.data.Reader#readRecords}</tt> parameter.
     * @param {Boolean} append (Optional) <tt>true</tt> to append the new Records rather the default to replace
     * the existing cache.
     * <b>Note</b>: that Records in a Store are keyed by their {@link Ext.data.Record#id id}, so added Records
     * with ids which are already present in the Store will <i>replace</i> existing Records. Records with new,
     * unique ids will be added.
     */
    loadData : function(o, append){
        var r = this.reader.readRecords(o);
        this.loadRecords(r, {add: append}, true);
    },

    /**
     * Gets the number of cached records.
     * <p>If using paging, this may not be the total size of the dataset. If the data object
     * used by the Reader contains the dataset size, then the {@link #getTotalCount} function returns
     * the dataset size.  <b>Note</b>: see the Important note in {@link #load}.</p>
     * @return {Number} The number of Records in the Store's cache.
     */
    getCount : function(){
        return this.data.length || 0;
    },

    /**
     * Gets the total number of records in the dataset as returned by the server.
     * <p>If using paging, for this to be accurate, the data object used by the {@link #reader Reader}
     * must contain the dataset size. For remote data sources, the value for this property
     * (<tt>totalProperty</tt> for {@link Ext.data.JsonReader JsonReader},
     * <tt>totalRecords</tt> for {@link Ext.data.XmlReader XmlReader}) shall be returned by a query on the server.
     * <b>Note</b>: see the Important note in {@link #load}.</p>
     * @return {Number} The number of Records as specified in the data object passed to the Reader
     * by the Proxy.
     * <p><b>Note</b>: this value is not updated when changing the contents of the Store locally.</p>
     */
    getTotalCount : function(){
        return this.totalLength || 0;
    },

    /**
     * Returns an object describing the current sort state of this Store.
     * @return {Object} The sort state of the Store. An object with two properties:<ul>
     * <li><b>field : String<p class="sub-desc">The name of the field by which the Records are sorted.</p></li>
     * <li><b>direction : String<p class="sub-desc">The sort order, "ASC" or "DESC" (case-sensitive).</p></li>
     * </ul>
     * See <tt>{@link #sortInfo}</tt> for additional details.
     */
    getSortState : function(){
        return this.sortInfo;
    },

    // private
    applySort : function(){
        if(this.sortInfo && !this.remoteSort){
            var s = this.sortInfo, f = s.field;
            this.sortData(f, s.direction);
        }
    },

    // private
    sortData : function(f, direction){
        direction = direction || 'ASC';
        var st = this.fields.get(f).sortType;
        var fn = function(r1, r2){
            var v1 = st(r1.data[f]), v2 = st(r2.data[f]);
            return v1 > v2 ? 1 : (v1 < v2 ? -1 : 0);
        };
        this.data.sort(direction, fn);
        if(this.snapshot && this.snapshot != this.data){
            this.snapshot.sort(direction, fn);
        }
    },

    /**
     * Sets the default sort column and order to be used by the next {@link #load} operation.
     * @param {String} fieldName The name of the field to sort by.
     * @param {String} dir (optional) The sort order, "ASC" or "DESC" (case-sensitive, defaults to <tt>"ASC"</tt>)
     */
    setDefaultSort : function(field, dir){
        dir = dir ? dir.toUpperCase() : "ASC";
        this.sortInfo = {field: field, direction: dir};
        this.sortToggle[field] = dir;
    },

    /**
     * Sort the Records.
     * If remote sorting is used, the sort is performed on the server, and the cache is reloaded. If local
     * sorting is used, the cache is sorted internally. See also {@link #remoteSort} and {@link #paramNames}.
     * @param {String} fieldName The name of the field to sort by.
     * @param {String} dir (optional) The sort order, "ASC" or "DESC" (case-sensitive, defaults to <tt>"ASC"</tt>)
     */
    sort : function(fieldName, dir){
        var f = this.fields.get(fieldName);
        if(!f){
            return false;
        }
        if(!dir){
            if(this.sortInfo && this.sortInfo.field == f.name){ // toggle sort dir
                dir = (this.sortToggle[f.name] || "ASC").toggle("ASC", "DESC");
            }else{
                dir = f.sortDir;
            }
        }
        var st = (this.sortToggle) ? this.sortToggle[f.name] : null;
        var si = (this.sortInfo) ? this.sortInfo : null;

        this.sortToggle[f.name] = dir;
        this.sortInfo = {field: f.name, direction: dir};
        if(!this.remoteSort){
            this.applySort();
            this.fireEvent("datachanged", this);
        }else{
            if (!this.load(this.lastOptions)) {
                if (st) {
                    this.sortToggle[f.name] = st;
                }
                if (si) {
                    this.sortInfo = si;
                }
            }
        }
    },

    /**
     * Calls the specified function for each of the {@link Ext.data.Record Records} in the cache.
     * @param {Function} fn The function to call. The {@link Ext.data.Record Record} is passed as the first parameter.
     * Returning <tt>false</tt> aborts and exits the iteration.
     * @param {Object} scope (optional) The scope in which to call the function (defaults to the {@link Ext.data.Record Record}).
     */
    each : function(fn, scope){
        this.data.each(fn, scope);
    },

    /**
     * Gets all {@link Ext.data.Record records} modified since the last commit.  Modified records are
     * persisted across load operations (e.g., during paging). <b>Note</b>: deleted records are not
     * included.  See also <tt>{@link #pruneModifiedRecords}</tt> and
     * {@link Ext.data.Record}<tt>{@link Ext.data.Record#markDirty markDirty}.</tt>.
     * @return {Ext.data.Record[]} An array of {@link Ext.data.Record Records} containing outstanding
     * modifications.  To obtain modified fields within a modified record see
     *{@link Ext.data.Record}<tt>{@link Ext.data.Record#modified modified}.</tt>.
     */
    getModifiedRecords : function(){
        return this.modified;
    },

    // private
    createFilterFn : function(property, value, anyMatch, caseSensitive){
        if(Ext.isEmpty(value, false)){
            return false;
        }
        value = this.data.createValueMatcher(value, anyMatch, caseSensitive);
        return function(r){
            return value.test(r.data[property]);
        };
    },

    /**
     * Sums the value of <tt>property</tt> for each {@link Ext.data.Record record} between <tt>start</tt>
     * and <tt>end</tt> and returns the result.
     * @param {String} property A field in each record
     * @param {Number} start (optional) The record index to start at (defaults to <tt>0</tt>)
     * @param {Number} end (optional) The last record index to include (defaults to length - 1)
     * @return {Number} The sum
     */
    sum : function(property, start, end){
        var rs = this.data.items, v = 0;
        start = start || 0;
        end = (end || end === 0) ? end : rs.length-1;

        for(var i = start; i <= end; i++){
            v += (rs[i].data[property] || 0);
        }
        return v;
    },

    /**
     * Filter the {@link Ext.data.Record records} by a specified property.
     * @param {String} field A field on your records
     * @param {String/RegExp} value Either a string that the field should begin with, or a RegExp to test
     * against the field.
     * @param {Boolean} anyMatch (optional) <tt>true</tt> to match any part not just the beginning
     * @param {Boolean} caseSensitive (optional) <tt>true</tt> for case sensitive comparison
     */
    filter : function(property, value, anyMatch, caseSensitive){
        var fn = this.createFilterFn(property, value, anyMatch, caseSensitive);
        return fn ? this.filterBy(fn) : this.clearFilter();
    },

    /**
     * Filter by a function. The specified function will be called for each
     * Record in this Store. If the function returns <tt>true</tt> the Record is included,
     * otherwise it is filtered out.
     * @param {Function} fn The function to be called. It will be passed the following parameters:<ul>
     * <li><b>record</b> : Ext.data.Record<p class="sub-desc">The {@link Ext.data.Record record}
     * to test for filtering. Access field values using {@link Ext.data.Record#get}.</p></li>
     * <li><b>id</b> : Object<p class="sub-desc">The ID of the Record passed.</p></li>
     * </ul>
     * @param {Object} scope (optional) The scope of the function (defaults to this)
     */
    filterBy : function(fn, scope){
        this.snapshot = this.snapshot || this.data;
        this.data = this.queryBy(fn, scope||this);
        this.fireEvent("datachanged", this);
    },

    /**
     * Query the records by a specified property.
     * @param {String} field A field on your records
     * @param {String/RegExp} value Either a string that the field
     * should begin with, or a RegExp to test against the field.
     * @param {Boolean} anyMatch (optional) True to match any part not just the beginning
     * @param {Boolean} caseSensitive (optional) True for case sensitive comparison
     * @return {MixedCollection} Returns an Ext.util.MixedCollection of the matched records
     */
    query : function(property, value, anyMatch, caseSensitive){
        var fn = this.createFilterFn(property, value, anyMatch, caseSensitive);
        return fn ? this.queryBy(fn) : this.data.clone();
    },

    /**
     * Query the cached records in this Store using a filtering function. The specified function
     * will be called with each record in this Store. If the function returns <tt>true</tt> the record is
     * included in the results.
     * @param {Function} fn The function to be called. It will be passed the following parameters:<ul>
     * <li><b>record</b> : Ext.data.Record<p class="sub-desc">The {@link Ext.data.Record record}
     * to test for filtering. Access field values using {@link Ext.data.Record#get}.</p></li>
     * <li><b>id</b> : Object<p class="sub-desc">The ID of the Record passed.</p></li>
     * </ul>
     * @param {Object} scope (optional) The scope of the function (defaults to this)
     * @return {MixedCollection} Returns an Ext.util.MixedCollection of the matched records
     **/
    queryBy : function(fn, scope){
        var data = this.snapshot || this.data;
        return data.filterBy(fn, scope||this);
    },

    /**
     * Finds the index of the first matching record in this store by a specific property/value.
     * @param {String} property A property on your objects
     * @param {String/RegExp} value Either a string that the property value
     * should begin with, or a RegExp to test against the property.
     * @param {Number} startIndex (optional) The index to start searching at
     * @param {Boolean} anyMatch (optional) True to match any part of the string, not just the beginning
     * @param {Boolean} caseSensitive (optional) True for case sensitive comparison
     * @return {Number} The matched index or -1
     */
    find : function(property, value, start, anyMatch, caseSensitive){
        var fn = this.createFilterFn(property, value, anyMatch, caseSensitive);
        return fn ? this.data.findIndexBy(fn, null, start) : -1;
    },

    /**
     * Find the index of the first matching Record in this Store by a function.
     * If the function returns <tt>true</tt> it is considered a match.
     * @param {Function} fn The function to be called. It will be passed the following parameters:<ul>
     * <li><b>record</b> : Ext.data.Record<p class="sub-desc">The {@link Ext.data.Record record}
     * to test for filtering. Access field values using {@link Ext.data.Record#get}.</p></li>
     * <li><b>id</b> : Object<p class="sub-desc">The ID of the Record passed.</p></li>
     * </ul>
     * @param {Object} scope (optional) The scope of the function (defaults to this)
     * @param {Number} startIndex (optional) The index to start searching at
     * @return {Number} The matched index or -1
     */
    findBy : function(fn, scope, start){
        return this.data.findIndexBy(fn, scope, start);
    },

    /**
     * Collects unique values for a particular dataIndex from this store.
     * @param {String} dataIndex The property to collect
     * @param {Boolean} allowNull (optional) Pass true to allow null, undefined or empty string values
     * @param {Boolean} bypassFilter (optional) Pass true to collect from all records, even ones which are filtered
     * @return {Array} An array of the unique values
     **/
    collect : function(dataIndex, allowNull, bypassFilter){
        var d = (bypassFilter === true && this.snapshot) ?
                this.snapshot.items : this.data.items;
        var v, sv, r = [], l = {};
        for(var i = 0, len = d.length; i < len; i++){
            v = d[i].data[dataIndex];
            sv = String(v);
            if((allowNull || !Ext.isEmpty(v)) && !l[sv]){
                l[sv] = true;
                r[r.length] = v;
            }
        }
        return r;
    },

    /**
     * Revert to a view of the Record cache with no filtering applied.
     * @param {Boolean} suppressEvent If <tt>true</tt> the filter is cleared silently without firing the
     * {@link #datachanged} event.
     */
    clearFilter : function(suppressEvent){
        if(this.isFiltered()){
            this.data = this.snapshot;
            delete this.snapshot;
            if(suppressEvent !== true){
                this.fireEvent("datachanged", this);
            }
        }
    },

    /**
     * Returns true if this store is currently filtered
     * @return {Boolean}
     */
    isFiltered : function(){
        return this.snapshot && this.snapshot != this.data;
    },

    // private
    afterEdit : function(record){
        if(this.modified.indexOf(record) == -1){
            this.modified.push(record);
        }
        this.fireEvent("update", this, record, Ext.data.Record.EDIT);
    },

    // private
    afterReject : function(record){
        this.modified.remove(record);
        this.fireEvent("update", this, record, Ext.data.Record.REJECT);
    },

    // private
    afterCommit : function(record){
        this.modified.remove(record);
        this.fireEvent("update", this, record, Ext.data.Record.COMMIT);
    },

    /**
     * Commit all Records with {@link #getModifiedRecords outstanding changes}. To handle updates for changes,
     * subscribe to the Store's {@link #update update event}, and perform updating when the third parameter is
     * Ext.data.Record.COMMIT.
     */
    commitChanges : function(){
        var m = this.modified.slice(0);
        this.modified = [];
        for(var i = 0, len = m.length; i < len; i++){
            m[i].commit();
        }
    },

    /**
     * {@link Ext.data.Record#reject Reject} outstanding changes on all {@link #getModifiedRecords modified records}.
     */
    rejectChanges : function(){
        var m = this.modified.slice(0);
        this.modified = [];
        for(var i = 0, len = m.length; i < len; i++){
            m[i].reject();
        }
    },

    // private
    onMetaChange : function(meta, rtype, o){
        this.recordType = rtype;
        this.fields = rtype.prototype.fields;
        delete this.snapshot;
        this.sortInfo = meta.sortInfo;
        this.modified = [];
        this.fireEvent('metachange', this, this.reader.meta);
    },

    // private
    findInsertIndex : function(record){
        this.suspendEvents();
        var data = this.data.clone();
        this.data.add(record);
        this.applySort();
        var index = this.data.indexOf(record);
        this.data = data;
        this.resumeEvents();
        return index;
    },

    /**
     * Set the value for a property name in this store's {@link #baseParams}.  Usage:</p><pre><code>
myStore.setBaseParam('foo', {bar:3});
</code></pre>
     * @param {String} name Name of the property to assign
     * @param {Mixed} value Value to assign the <tt>name</tt>d property
     **/
    setBaseParam : function (name, value){
        this.baseParams = this.baseParams || {};
        this.baseParams[name] = value;
    }
});

Ext.reg('store', Ext.data.Store);