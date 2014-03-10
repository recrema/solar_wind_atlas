/**
 * The Layertree used in the application.
 * @extends GeoExt.tree.Panel
 */
Ext.define('AM.view.Windinfo', {
	extend: 'Ext.tab.Panel',
	alias: 'widget.windinfo',
	
	border: 'true',
	layout: 'fit',
	height: 200,
//	region: 'west',
	title: 'Layers',
//	split: 'true',
	animate: 'tree',
//	bodyStyle: 'transparent:50%;',
	hidden: true,
	collapsible: 'true',
	autoScroll: 'true',
	
	initComponent: function() {
		
		this.callParent(arguments);
	}

})