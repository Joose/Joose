/*
 * Ext JS Library 3.0 RC1
 * Copyright(c) 2006-2009, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */

/**
 * @class Ext.data.ArrayReader
 * @extends Ext.data.JsonReader
 * Data reader class to create an Array of {@link Ext.data.Record} objects from an Array.
 * Each element of that Array represents a row of data fields. The
 * fields are pulled into a Record object using as a subscript, the <em>mapping</em> property
 * of the field definition if it exists, or the field's ordinal position in the definition.<br>
 * <p>
 * Example code:.
 * <pre><code>
var Employee = Ext.data.Record.create([
    {name: 'name', mapping: 1},         // "mapping" only needed if an "id" field is present which
    {name: 'occupation', mapping: 2}    // precludes using the ordinal position as the index.
]);
var myReader = new Ext.data.ArrayReader({
    id: 0                     // The subscript within row Array that provides an ID for the Record (optional)
}, Employee);
</code></pre>
 * <p>
 * This would consume an Array like this:
 * <pre><code>
[ [1, 'Bill', 'Gardener'], [2, 'Ben', 'Horticulturalist'] ]
  </code></pre>
 * @cfg {String} id (optional) The subscript within row Array that provides an ID for the Record
 * @constructor
 * Create a new ArrayReader
 * @param {Object} meta Metadata configuration options.
 * @param {Object} recordType Either an Array of field definition objects
 * as specified to {@link Ext.data.Record#create},
 * or a {@link Ext.data.Record Record} constructor
 * created using {@link Ext.data.Record#create}.
 */
Ext.data.ArrayReader = Ext.extend(Ext.data.JsonReader, {
    /**
     * @cfg {String} successProperty
     * @hide
     */
     /**
     * Create a data block containing Ext.data.Records from an Array.
     * @param {Object} o An Array of row objects which represents the dataset.
     * @return {Object} data A data block which is used by an Ext.data.Store object as
     * a cache of Ext.data.Records.
     */
    readRecords : function(o){
        this.arrayData = o;
        var s = this.meta;
        var sid = s ? (s.idIndex || s.id) : null;
    	var recordType = this.recordType, fields = recordType.prototype.fields;
    	var records = [];

        if(!this.getRoot){
            this.getRoot = s.root ? this.getJsonAccessor(s.root) : function(p){return p;};
            if(s.totalProperty) {
                this.getTotal = this.getJsonAccessor(s.totalProperty);
            }
        }

        var root = this.getRoot(o);

        for(var i = 0; i < root.length; i++){
		    var n = root[i];
	        var values = {};
	        var id = ((sid || sid === 0) && n[sid] !== undefined && n[sid] !== "" ? n[sid] : null);
	        for(var j = 0, jlen = fields.length; j < jlen; j++){
                var f = fields.items[j];
                var k = f.mapping !== undefined && f.mapping !== null ? f.mapping : j;
                var v = n[k] !== undefined ? n[k] : f.defaultValue;
                v = f.convert(v, n);
                values[f.name] = v;
            }
	        var record = new recordType(values, id);
	        record.json = n;
	        records[records.length] = record;
	    }

        var totalRecords = records.length;

        if(s.totalProperty){
            var v = parseInt(this.getTotal(o), 10);
            if(!isNaN(v)){
                totalRecords = v;
            }
        }

        return {
	        records : records,
	        totalRecords : totalRecords
	    };
    }
});