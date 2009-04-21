/*
 * Ext JS Library 3.0 RC1
 * Copyright(c) 2006-2009, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */

/**
 * @class Ext.data.JsonReader
 * @extends Ext.data.DataReader
 * Data reader class to create an Array of {@link Ext.data.Record} objects from a JSON response
 * based on mappings in a provided {@link Ext.data.Record} constructor.<br>
 * <p>
 * Example code:
 * <pre><code>
var Employee = Ext.data.Record.create([
    {name: 'firstname'},                  // map the Record's "firstname" field to the row object's key of the same name
    {name: 'job', mapping: 'occupation'}  // map the Record's "job" field to the row object's "occupation" key
]);
var myReader = new Ext.data.JsonReader(
    {                             // The metadata property, with configuration options:
        totalProperty: "results", //   the property which contains the total dataset size (optional)
        root: "rows",             //   the property which contains an Array of row objects
        idProperty: "id"          //   the property within each row object that provides an ID for the record (optional)
    },
    Employee  // {@link Ext.data.Record} constructor that provides mapping for JSON object
);
</code></pre>
 * <p>This would consume a JSON data object of the form:</p><pre><code>
{
    results: 2,  // Reader's configured totalProperty
    rows: [      // Reader's configured root
        { id: 1, firstname: 'Bill', occupation: 'Gardener' },         // a row object
        { id: 2, firstname: 'Ben' , occupation: 'Horticulturalist' }  // another row object
    ]
}
</code></pre>
 * <p><b><u>Automatic configuration using metaData</u></b>
 * <p>It is possible to change a JsonReader's metadata at any time by including a <b><tt>metaData</tt></b>
 * property in the JSON data object. If the JSON data object has a <b><tt>metaData</tt></b> property, a
 * {@link Ext.data.Store Store} object using this Reader will reconfigure itself to use the newly provided
 * field definition and fire its {@link Ext.data.Store#metachange metachange} event. The metachange event
 * handler may interrogate the <b><tt>metaData</tt></b> property to perform any configuration required.
 * Note that reconfiguring a Store potentially invalidates objects which may refer to Fields or Records
 * which no longer exist.</p>
 * <p>The <b><tt>metaData</tt></b> property in the JSON data object may contain:</p>
 * <div class="mdetail-params"><ul>
 * <li>any of the configuration options for this class</li>
 * <li>a <b><tt>{@link Ext.data.Record#fields fields}</tt></b> property which the JsonReader will
 * use as an argument to the {@link Ext.data.Record#create data Record create method} in order to
 * configure the layout of the Records it will produce.</li>
 * <li>a <b><tt>{@link Ext.data.Store#sortInfo sortInfo}</tt></b> property which the JsonReader will
 * use to set the {@link Ext.data.Store}'s {@link Ext.data.Store#sortInfo sortInfo} property</li>
 * <li>any user-defined properties needed</li>
 * </ul></div>
 * <p>To use this facility to send the same data as the example above (without having to code the creation
 * of the Record constructor), you would create the JsonReader like this:</p><pre><code>
var myReader = new Ext.data.JsonReader();
</code></pre>
 * <p>The first data packet from the server would configure the reader by containing a
 * <b><tt>metaData</tt></b> property <b>and</b> the data. For example, the JSON data object might take
 * the form:</p>
<pre><code>
{
    metaData: {
        idProperty: 'id',
        root: 'rows',
        totalProperty: 'results',
        fields: [
            {name: 'name'},
            {name: 'job', mapping: 'occupation'}
        ],
        sortInfo: {field: 'name', direction:'ASC'}, // used by store to set its sortInfo
        foo: 'bar' // custom property
    },
    results: 2,
    rows: [
        { 'id': 1, 'name': 'Bill', occupation: 'Gardener' },
        { 'id': 2, 'name': 'Ben', occupation: 'Horticulturalist' }
    ]
}
</code></pre>
 * @cfg {String} totalProperty Name of the property from which to retrieve the total number of records
 * in the dataset. This is only needed if the whole dataset is not passed in one go, but is being
 * paged from the remote server.
 * @cfg {String} successProperty Name of the property from which to retrieve the success attribute used by forms.
 * @cfg {String} root name of the property which contains the Array of row objects.
 * @cfg {String} idProperty Name of the property within a row object that contains a record identifier value.
 * @constructor
 * Create a new JsonReader
 * @param {Object} meta Metadata configuration options.
 * @param {Object} recordType Either an Array of field definition objects as passed to
 * {@link Ext.data.Record#create}, or a {@link Ext.data.Record Record} constructor created using {@link Ext.data.Record#create}.
 */
Ext.data.JsonReader = function(meta, recordType){
    meta = meta || {};
    Ext.data.JsonReader.superclass.constructor.call(this, meta, recordType || meta.fields);
};
Ext.extend(Ext.data.JsonReader, Ext.data.DataReader, {
    /**
     * This JsonReader's metadata as passed to the constructor, or as passed in
     * the last data packet's <b><tt>metaData</tt></b> property.
     * @type Mixed
     * @property meta
     */
    /**
     * This method is only used by a DataProxy which has retrieved data from a remote server.
     * @param {Object} response The XHR object which contains the JSON data in its responseText.
     * @return {Object} data A data block which is used by an Ext.data.Store object as
     * a cache of Ext.data.Records.
     */
    read : function(response){
        var json = response.responseText;
        var o = Ext.decode(json);
        if(!o) {
            throw {message: "JsonReader.read: Json object not found"};
        }
        return this.readRecords(o);
    },

    // private function a store will implement
    onMetaChange : function(meta, recordType, o){

    },

    /**
     * @ignore
     */
    simpleAccess: function(obj, subsc) {
        return obj[subsc];
    },

    /**
     * @ignore
     */
    getJsonAccessor: function(){
        var re = /[\[\.]/;
        return function(expr) {
            try {
                return(re.test(expr))
                    ? new Function("obj", "return obj." + expr)
                    : function(obj){
                        return obj[expr];
                    };
            } catch(e){}
            return Ext.emptyFn;
        };
    }(),

    /**
     * Create a data block containing Ext.data.Records from a JSON object.
     * @param {Object} o An object which contains an Array of row objects in the property specified
     * in the config as 'root, and optionally a property, specified in the config as 'totalProperty'
     * which contains the total size of the dataset.
     * @return {Object} data A data block which is used by an Ext.data.Store object as
     * a cache of Ext.data.Records.
     */
    readRecords : function(o){
        /**
         * After any data loads, the raw JSON data is available for further custom processing.  If no data is
         * loaded or there is a load exception this property will be undefined.
         * @type Object
         */
        this.jsonData = o;
        if(o.metaData){
            delete this.ef;
            this.meta = o.metaData;
            this.recordType = Ext.data.Record.create(o.metaData.fields);
            this.onMetaChange(this.meta, this.recordType, o);
        }
        var s = this.meta, Record = this.recordType,
            f = Record.prototype.fields, fi = f.items, fl = f.length;

//      Generate extraction functions for the totalProperty, the root, the id, and for each field
        if (!this.ef) {
            if(s.totalProperty) {
                this.getTotal = this.getJsonAccessor(s.totalProperty);
            }
            if(s.successProperty) {
                this.getSuccess = this.getJsonAccessor(s.successProperty);
            }
            this.getRoot = s.root ? this.getJsonAccessor(s.root) : function(p){return p;};
            if (s.id || s.idProperty) {
                var g = this.getJsonAccessor(s.id || s.idProperty);
                this.getId = function(rec) {
                    var r = g(rec);
                    return (r === undefined || r === "") ? null : r;
                };
            } else {
                this.getId = function(){return null;};
            }
            this.ef = [];
            for(var i = 0; i < fl; i++){
                f = fi[i];
                var map = (f.mapping !== undefined && f.mapping !== null) ? f.mapping : f.name;
                this.ef[i] = this.getJsonAccessor(map);
            }
        }

        var root = this.getRoot(o), c = root.length, totalRecords = c, success = true;
        if(s.totalProperty){
            var v = parseInt(this.getTotal(o), 10);
            if(!isNaN(v)){
                totalRecords = v;
            }
        }
        if(s.successProperty){
            var v = this.getSuccess(o);
            if(v === false || v === 'false'){
                success = false;
            }
        }
        var records = [];
        for(var i = 0; i < c; i++){
            var n = root[i];
            var values = {};
            var id = this.getId(n);
            for(var j = 0; j < fl; j++){
                f = fi[j];
                var v = this.ef[j](n);
                values[f.name] = f.convert((v !== undefined) ? v : f.defaultValue, n);
            }
            var record = new Record(values, id);
            record.json = n;
            records[i] = record;
        }
        return {
            success : success,
            records : records,
            totalRecords : totalRecords
        };
    },

	/**
	 * readResponse
	 * decodes a json response from server
	 * @param {Object} response
	 */
	readResponse : function(response) {
		var json = response.responseText;
        var o = eval("("+json+")");
        if(!o) {
            throw {message: "JsonReader.read: Json object not found"};
        }
		return o;
	}
});