/**
 * Help Window with static content using 'contentEl' property.
 * @extends Ext.window.Window
 */
Ext.define('AM.view.chart.Window', {
    extend: 'Ext.window.Window',
    alias : 'widget.chartwindow',
    itemId: 'chartWindow',
	height: 450,
	width: 500,
	draggable : true,
	border: false,
	hidden: false,
	modal: false,
	resizable: false,
	animateTarget : '',//this value will be changed in the mapController.onChartActivate() function dynamically
	header: true,
	listeners: { 
	    close: function() {
	    	var chartButton=Ext.ComponentQuery.query('mappanel button[itemId=viewwindinfo]')[0];
	    	chartButton.toggle(false);
	    }
	},
	initComponent: function() {
		me = this;
		me.setPosition(313,167);
//        Ext.apply(this, {
//        	  items: [{ xtype: 'button',
//				    style: {
//				        marginTop: '10px',
//				    },
//   	              cls:'buttonwindclose',
//	              handler:  function () {
//	            	  me.hide();
//	              }},
//        	  ]
//        });
		this.callParent(arguments);
	}

});