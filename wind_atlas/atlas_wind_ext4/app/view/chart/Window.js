/**
 * Help Window with static content using 'contentEl' property.
 * @extends Ext.window.Window
 */
Ext.define('AM.view.chart.Window', {
    extend: 'Ext.window.Window',
    alias : 'widget.chartwindow',
    itemId: 'chartWindow',
//    closeAction: 'hide',
	height: 500,
	width: 500,
	draggable : false,
	border: false,
//	region: 'west',
//	split: 'true',
//	bodyStyle: 'transparent:50%;',
	hidden: false,
	modal: true,
	autoShow: true,
	header: false,
	
	initComponent: function() {
		var me = this;
		
        Ext.apply(this, {
        	  items: [{ xtype: 'button',
   	              text : 'close',
   	              cls:'buttonwindclose',
	              handler:  function () {
	            	  me.hide();
	              }},
        	  ]
        });
		this.callParent(arguments);
	}

})