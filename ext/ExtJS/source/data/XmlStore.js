/*
 * Ext JS Library 3.0 RC1
 * Copyright(c) 2006-2009, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */

/**
 * @class Ext.data.XmlStore
 * @extends Ext.data.Store
 * Small convenience class which uses an XmlReader and an HttpProxy
 * @xtype xmlstore
 */
Ext.data.XmlStore = Ext.extend(Ext.data.Store, {
    constructor: function(config){
        Ext.data.XmlStore.superclass.constructor.call(this, Ext.apply(config, {
            reader: new Ext.data.XmlReader(config)
        }));
    }
    /**
     * @cfg {Ext.data.DataReader} reader @hide
     */
    /**
     * @cfg {Ext.data.DataProxy} proxy @hide
     */
});
Ext.reg('xmlstore', Ext.data.XmlStore);