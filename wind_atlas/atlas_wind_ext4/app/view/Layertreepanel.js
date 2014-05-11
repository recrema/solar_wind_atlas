/**
 * The Layertree used in the application.
 * @extends GeoExt.tree.Panel
 */
Ext.define('AM.view.Layertreepanel', {
	extend: 'Ext.tab.Panel',
	alias: 'widget.layertreepanel',
	
	layout: 'fit',
	border:false,
	width: 300,
    height: '70%',
    cls:'x-tabbar-dark',

	initComponent: function() {
		
		this.callParent(arguments);
	}

})