/**
 * The application header displayed at the top of the viewport
 * @extends Ext.Component
 */
Ext.define('AM.view.HeaderLogo', {
    extend: 'Ext.Panel',
    alias: 'widget.headerLogo',
    border: false,
    baseCls: 'headerlogo',
    height: 112,
    layout: {
        type: 'hbox',
        align: 'top'
    },
    items: [{
        xtype: 'button',
        width: 290,
        height: 112,
        cls: "transparentCls",
        href : "http://recrema.masdar.ac.ae/"
    }],
    
    initComponent: function() {
        Ext.applyIf(this, {
        });

        this.callParent(arguments);
    }
});