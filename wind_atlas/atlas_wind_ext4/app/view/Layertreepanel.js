/**
 * The Layertree used in the application.
 * @extends GeoExt.tree.Panel
 */
Ext.define('AM.view.Layertreepanel', {
	extend: 'Ext.tab.Panel',
	alias: 'widget.layertreepanel',
	
//	requires:['AM.controller.Layertreepanel'],
	
	border: 'true',
	layout: 'fit',
	width: 300,
//	region: 'west',
//	split: 'true',
	animate: 'tree',
//	bodyStyle: 'transparent:50%;',
//	collapsible: 'true',
	autoScroll: 'true',

//	items :[{
//	 	title: "Overall Maps",
//	 	itemId: 'tabpanel0'
//	// 	items: yearLayerTree
//	 },{
//	 	title: "Year Maps",
//	 	itemId: 'tabpanel1'
//	// 	items: monthLayerTree
//	 },{
//	 	title: "Month Maps",
//	 	itemId: 'tabpanel2'
//	// 	items: heightLayerTree
//	 }],
	
	initComponent: function() {
		
		this.callParent(arguments);
	}

})