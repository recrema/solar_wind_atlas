/**
 * The Layertree used in the application.
 * @extends GeoExt.tree.Panel
 */
Ext.define('AM.view.WindinfoForm', {
	extend: 'Ext.form.Panel',
	alias: 'widget.windinfoForm',
	url: 'php/wps_request.php',
	border: true,
//	title: 'Layers',
//	split: 'true',
	width: 250,
	animate: 'tree',
//	bodyStyle: 'transparent:50%;',
	hidden: true,
//	collapsible: 'true',
	autoScroll: 'true',
	
	
	   layout: 'anchor',
	    defaults: {
	        anchor: '90%'
	    },

	    buttons: [{
		 	itemId: 'windfinfoFormResetButton',
	        text: 'Reset',
	        handler: function() {
	            this.up('form').getForm().reset();
	        }
	    }, {
	        text: 'Submit',
	        itemId: 'windfinfoFormSubmitButton',
	        formBind: true, //only enabled once the form is valid
	        disabled: true
	    }],
	
	initComponent: function() {
		
		this.callParent(arguments);
	}

})