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
//	closable: false,
	border: false,
//	headerPosition:'left',
	hidden: true,
	modal: false,
	animateTarget : '',//this value will be changed in the mapController.onChartActivate() function dynamically
	header: true,
	initComponent: function() {
		var me = this;
		
//        Ext.apply(this, {
//        	  items: [{ xtype: 'button',
//   	              text : 'close',
//   	              cls:'buttonwindclose',
//	              handler:  function () {
//	            	  me.hide();
//	              }},
//        	  ]
//        });
		this.callParent(arguments);
	}

})