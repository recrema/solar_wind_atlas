/**
 * 
 */

Ext.define('AM.view.genericWindow', {
    extend: 'Ext.window.Window',
    alias : 'widget.genericWindow',
    itemId: 'genericWindow',
	height: 170,
	width: 250,
	draggable : true,
	border: false,
	hidden: true,
	modal: false,
	animateTarget : '',//this value will be changed in the mapController.onChartActivate() function dynamically
	header: true,
	initComponent: function() {
		var me = this;
		this.callParent(arguments);
	}

})