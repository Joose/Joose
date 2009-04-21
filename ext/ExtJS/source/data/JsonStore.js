/*
 * Ext JS Library 3.0 RC1
 * Copyright(c) 2006-2009, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */

/**
 * @class Ext.data.JsonStore
 * @extends Ext.data.Store
 * Small helper class to make creating {@link Ext.data.Store}s for remotely-loaded JSON data easier.
 * JsonStore is pre-configured with a built-in {@link Ext.data.HttpProxy} and {@link Ext.data.JsonReader}.
 * If you require some other proxy/reader combination then you will have to create a basic
 * {@link Ext.data.Store} configured as needed.<br/>
<pre><code>
var store = new Ext.data.JsonStore({
    autoDestroy: true,
    url: 'get-images.php',
    root: 'images', // *see Note  
    fields: ['name', 'url', {name:'size', type: 'float'}, {name:'lastmod', type:'date'}]
});
</code></pre>
 * This would consume a returned object of the form:
<pre><code>
{
    images: [
        {name: 'Image one', url:'/GetImage.php?id=1', size:46.5, lastmod: new Date(2007, 10, 29)},
        {name: 'Image Two', url:'/GetImage.php?id=2', size:43.2, lastmod: new Date(2007, 10, 30)}
    ]
}
</code></pre>
 * An object literal of this form could also be used as the {@link #data} config option.
 * <p><b>*Note:</b> Although they are not listed, this class inherits all of the config options of 
 * <b>{@link Ext.data.Store Store}</b> and <b>{@link Ext.data.JsonReader JsonReader}</b>
 * (eg. <tt>root</tt>, <tt>idProperty</tt>, <tt>totalProperty</tt>).</p>
 * @cfg {String} url  The URL from which to load data through an HttpProxy. Either this
 * option, or the {@link #data} option must be specified.
 * @cfg {Object} data  A data object readable by this object's JsonReader. Either this
 * option, or the {@link #url} option must be specified.
 * @cfg {Array} fields  Either an Array of {@link Ext.data.Field Field} definition objects as passed to
 * {@link Ext.data.Record#create}, or a {@link Ext.data.Record Record} constructor created using {@link Ext.data.Record#create}.<br>
 * <p>This config is used to create the <tt>recordType</tt> parameter to the {@link Ext.data.JsonReader#JsonReader JsonReader}
 * constructor that is implicitly called, and creates the {@link Ext.data.Record Record definition} used by the Store.
 * @constructor
 * @param {Object} config
 * @xtype jsonstore
 */
Ext.data.JsonStore = Ext.extend(Ext.data.Store, {
    constructor: function(config){
        Ext.data.JsonStore.superclass.constructor.call(this, Ext.apply(config, {
            reader: new Ext.data.JsonReader(config)
        }));
    }
    /**
     * @cfg {Ext.data.DataReader} reader @hide
     */
    /**
     * @cfg {Ext.data.DataProxy} proxy @hide
     */
});
Ext.reg('jsonstore', Ext.data.JsonStore);