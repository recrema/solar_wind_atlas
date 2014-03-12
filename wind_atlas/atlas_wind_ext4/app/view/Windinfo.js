/**
 * The Layertree used in the application.
 * @extends GeoExt.tree.Panel
 */
Ext.define('AM.view.Windinfo', {
	extend: 'Ext.form.Panel',
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
	
	
	   layout: 'anchor',
	    defaults: {
	        anchor: '20%'
	    },

	
	 buttons: [{
	        text: 'Reset',
	        handler: function() {
	            this.up('form').getForm().reset();
	        }
	    }, {
	        text: 'Submit',
	        formBind: true, //only enabled once the form is valid
	        disabled: true,
	        handler: function() {
	            var form = this.up('form').getForm();
	            if (form.isValid()) {
	                form.submit({
	                    success: function(form, action) {
	                       Ext.Msg.alert('Success', action.result.msg);
	                    },
	                    failure: function(form, action) {
	                        Ext.Msg.alert('Failed', action.result.msg);
	                    }
	                });
	            }
	        }
	    }],
	
	initComponent: function() {
		
		this.callParent(arguments);
	}

})