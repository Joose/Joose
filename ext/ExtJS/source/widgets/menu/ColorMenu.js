/*
 * Ext JS Library 3.0 RC1
 * Copyright(c) 2006-2009, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */

/**
 * @class Ext.menu.ColorMenu
 * @extends Ext.menu.Menu
 * A menu containing a {@link Ext.ColorPalette} Component.
 * @xtype colormenu
 */
 Ext.menu.ColorMenu = Ext.extend(Ext.menu.Menu, {
    /** 
     * @cfg {Boolean} enableScrolling
     * @hide 
     */
    enableScrolling: false,
    /** 
     * @cfg {Number} maxHeight
     * @hide 
     */
    /** 
     * @cfg {Number} scrollIncrement
     * @hide 
     */
    /**
     * @property palette
     * @type ColorPalette
     * The {@link Ext.ColorPalette} instance for this ColorMenu
     */
    initComponent: function(){
        Ext.apply(this, {
            plain: true,
            showSeparator: false,
            items: this.palette = new Ext.ColorPalette(this.initialConfig)
        });
        Ext.menu.ColorMenu.superclass.initComponent.call(this);
        this.relayEvents(this.palette, ['select']);
    },

    onClick: function() {
        this.hide(true);
    }
});
Ext.reg('colormenu', Ext.menu.ColorMenu);