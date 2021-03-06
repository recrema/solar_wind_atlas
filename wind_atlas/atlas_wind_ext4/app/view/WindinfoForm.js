/**
 * The Layertree used in the application.
 * @extends GeoExt.tree.Panel
 */
Ext.define('AM.view.WindinfoForm', {
	extend: 'Ext.form.Panel',
	alias: 'widget.windinfoForm',
	url: 'php/wps_request.php', //?final_date=200303023&initial_date=2003020100&latitude=22.2&longitude=51.3
	method : 'POST',
	border: true,
	cls:'windinfoFrom',
	width: 298,
	autoScroll: 'true',
	bodyPadding: 7,

	layout: 'anchor',
	defaults: {
		anchor: '70%'
	},
	items:[{ xtype: 'button',
		width: 20,
		anchor: '10%',
		style: {
			marginTop: '3px',
			left: '250px',
		},
		cls:'buttonwindinfoclose',
		handler:  function () {
			var windInfoButton=Ext.ComponentQuery.query('mappanel [itemId=viewwindinfo]')[0];
			windInfoButton.toggle(false);
		}}],
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

});