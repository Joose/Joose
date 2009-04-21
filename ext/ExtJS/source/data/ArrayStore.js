/*
 * Ext JS Library 3.0 RC1
 * Copyright(c) 2006-2009, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */

/**
 * @class Ext.data.ArrayStore
 * @extends Ext.data.Store
 * Formerly known as "SimpleStore", ArrayStore is a small helper class to make creating {@link Ext.data.Store Store}s
 * from Array data easier. ArrayStore is <b>not</b> pre-configured with a built-in {@link Ext.data.DataProxy} 
 * but is pre-configured with a built-in {@link Ext.data.ArrayReader ArrayReader}.
 * <p>To consume a data object of the form:</p><pre><code>
var myData = [
    ['3m Co',71.72,0.02,0.03,'9/1 12:00am'],
    ['Alcoa Inc',29.01,0.42,1.47,'9/1 12:00am'],
    ['Boeing Co.',75.43,0.53,0.71,'9/1 12:00am'],
    ['Hewlett-Packard Co.',36.53,-0.03,-0.08,'9/1 12:00am'],
    ['Wal-Mart Stores, Inc.',45.45,0.73,1.63,'9/1 12:00am']
]; 
</code></pre>
 * The store configuration would be something like:</p><pre><code>
var store = new Ext.data.ArrayStore({
    fields: [
       'company',
       {name: 'price', type: 'float'},
       {name: 'change', type: 'float'},
       {name: 'pctChange', type: 'float'},
       {name: 'lastChange', type: 'date', dateFormat: 'n/j h:ia'}
    ]
});
</code></pre>
 * @cfg {Number} id The array index of the record id. Leave blank to auto generate ids.
 * @cfg {Array} fields An Array of {@link Ext.data.Field Field} definition objects, or field name strings.
 * @cfg {Array} data The multi-dimensional array of data
 * @constructor
 * @param {Object} config
 * @xtype arraystore
 */
Ext.data.ArrayStore = Ext.extend(Ext.data.Store, {
    constructor: function(config){
        Ext.data.ArrayStore.superclass.constructor.call(this, Ext.apply(config, {
            reader: new Ext.data.ArrayReader(config)
        }));
    },

    loadData : function(data, append){
        if(this.expandData === true){
            var r = [];
            for(var i = 0, len = data.length; i < len; i++){
                r[r.length] = [data[i]];
            }
            data = r;
        }
        Ext.data.ArrayStore.superclass.loadData.call(this, data, append);
    }
});
Ext.reg('arraystore', Ext.data.ArrayStore);

// backwards compat
Ext.data.SimpleStore = Ext.data.ArrayStore;
Ext.reg('simplestore', Ext.data.SimpleStore);