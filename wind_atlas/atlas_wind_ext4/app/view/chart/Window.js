/**
 * Help Window with static content using 'contentEl' property.
 * @extends Ext.window.Window
 */
Ext.define('AM.view.chart.Window', {
    extend: 'Ext.window.Window',
    alias : 'widget.chartwindow',
    itemId: 'chartWindow',
	height: 500,
	width: 500,
	draggable : false,
	border: false,
	hidden: true,
	modal: true,
	animateTarget : '',//this value will be changed in the mapController.onChartActivate() function dynamically
	header: false,
	initComponent: function() {
		var me = this;
		
        Ext.apply(this, {
        	  items: [{ xtype: 'button',
        		  itemId: 'chartWindowClose',
				    style: {
				        marginTop: '10px',
				    },
   	              cls:'buttonwindclose',
	              handler:  function () {
	            	  me.hide();
	              }},
        	  ]
        });
		this.callParent(arguments);
	}

});