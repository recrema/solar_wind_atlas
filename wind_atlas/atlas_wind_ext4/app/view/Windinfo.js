/**
 * The Layertree used in the application.
 * @extends GeoExt.tree.Panel
 */
Ext.define('AM.view.Windinfo', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.windinfo',
	border: 'true',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
	height: 200,
	hidden: true,
	closable:false,
	border: false,
	autoScroll: 'true',
	renderTo: Ext.getBody(),
	initComponent: function() {
		
		this.callParent(arguments);
	}

})