/*
 * Ext JS Library 3.0 RC1
 * Copyright(c) 2006-2009, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */

/**
 * @class Ext.data.DataWriter
 * Abstract base class for writing structured data from a data source and converting
 * it into a JSON-string containing {@link Ext.data.Record} objects and metadata for use
 * by an {@link Ext.data.Store}.  This class is intended to be extended and should not
 * be created directly. For existing implementations, see {@link Ext.data.JsonWriter},
 * @constructor Create a new DataWriter
 * @param {Object} meta Metadata configuration options (implementation-specific)
 * @param {Object} recordType Either an Array of field definition objects as specified
 * in {@link Ext.data.Record#create}, or an {@link Ext.data.Record} object created
 * using {@link Ext.data.Record#create}.
 */
Ext.data.DataWriter = function(config){
    /**
     * This DataWriter's configured metadata as passed to the constructor.
     * @type Mixed
     * @property meta
     */
    Ext.apply(this, config);
};

Ext.data.DataWriter.prototype = {

	meta : {},
	/**
	 * @cfg {String} dataProperty The property-name in request-params where data will be written
	 * (defaults to <tt>'data'</tt>).
	 */
	dataProperty : 'data',
	/**
	 * @cfg {Boolean} writeAllFields
	 * <tt>false</tt> by default.  Set <tt>true</tt> to have DataWriter return ALL fields of a modified
	 * record -- not just those that changed.
	 * <tt>false</tt> to have DataWriter only request modified fields from a record.
	 */
	writeAllFields : false,

	/**
	 * save
	 * @param {Object} p Params-hash to apply result to.
	 * @param {Record/Record[]} rs Record(s) to write
	 */
	save : function(p, rs) {
		if (Ext.isArray(rs)) {
			var data = [];
			var ids = [];
			for (var n=0,len=rs.length;n<len;n++) {
				ids.push(rs[n].id);
				data.push(this.saveRecord(rs[n]));
			}
			p[this.meta.idProperty] = ids;
			p[this.dataProperty] = data;
		}
		else if (rs instanceof Ext.data.Record) {
			p[this.meta.idProperty] = rs.id;
			p[this.dataProperty] = this.saveRecord(rs);
		}
		return false;
	},

	/**
     * @cfg {Function} saveRecord Abstract method that should be implemented in all subclasses
     * (eg: {@link Ext.data.JsonWriter#saveRecord JsonWriter.saveRecord}
     */
	saveRecord : Ext.emptyFn,

	/**
	 * create
	 * @param {Object} p Params-hash to apply result to.
	 * @param {Record/Record[]} rs Record(s) to write
	 */
	create : function(p, rec) {
		return p[this.dataProperty] = this.createRecord(rec);
	},

	/**
     * @cfg {Function} createRecord Abstract method that should be implemented in all subclasses
     * (eg: {@link Ext.data.JsonWriter#createRecord JsonWriter.createRecord}
     */
	createRecord : Ext.emptyFn,

	/**
	 * destroy
	 * @param {Object} p Params-hash to apply result to.
	 * @param {Record/Record[]} rs Record(s) to write
	 */
	destroy : function(p, rs) {
		if (Ext.isArray(rs)) {
			var data = [];
			var ids = [];
			for (var i=0,len=rs.length;i<len;i++) {
				data.push(this.destroyRecord(rs[i]));
			}
			p[this.dataProperty] = data;
		} else if (rs instanceof Ext.data.Record) {
			p[this.dataProperty] = this.destroyRecord(rs);
		}
		return false;
	},

	/**
     * @cfg {Function} destroyRecord Abstract method that should be implemented in all subclasses
     * (eg: {@link Ext.data.JsonWriter#destroyRecord JsonWriter.destroyRecord}
     */
	destroyRecord : Ext.emptyFn,

	/**
	 * toHash
	 * Converts a Record to a hash
	 * @param {Record}
	 */
	toHash : function(rec) {
		var map = rec.fields.map;
		var data = {};
		var raw = (this.writeAllFields === false && rec.phantom === false) ? rec.getChanges() : rec.data;
		for (var k in raw) {
			data[(map[k].mapping) ? map[k].mapping : map[k].name] = raw[k];
		}
		data[this.meta.idProperty] = rec.id;
		return data;
	}
};