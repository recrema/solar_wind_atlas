/**
 * 
 */

Ext.define('AM.view.LoginView', {
	extend: 'Ext.window.Window',
	alias: 'widget.loginView',
	height: 420,
	width: 600,
	draggable : true,
//	closable: false,
	closeAction :'hide',
	border: false,
	hidden: false,
	modal: true,
	header: false,
	initComponent: function() {
		loginView = this;
        Ext.apply(this, {
        	  items: [ imagePanel,form,footerPanel
        	  ]
        });
		this.callParent(arguments);
	},
	listeners: {
	    show: function(win) {
	        if (this.modal) {
	            var dom = Ext.dom.Query.select('.x-mask');
	            var el = Ext.get(dom[0]);
	            el.addCls('loginMask');
	        }
	    },
	    hide:  function(win) {
	        if (this.modal) {
	            var dom = Ext.dom.Query.select('.x-mask');
	            var el = Ext.get(dom[0]);
	            el.removeCls('loginMask');
	        }
	    }
	}
});
var imagePanel= Ext.create('Ext.panel.Panel', {
	header: false,
	border: false,
	width: 200,
	height: 100,
    style: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '20px',
    },
	items:[{
		xtype: 'image',
		width: 202,
		height: 96,
	    src: 'resources/images/RCREMA-logo-transparent.png'
	}]
});
var footerPanel= Ext.create('Ext.panel.Panel', {
	header: false,
	border: false,
	height: 50,
	width: 550,
    style: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '20px',
    },
	items:[{
		xtype: 'image',

	    src: 'resources/images/loginbanner.png'
	}]
});


var form=Ext.create('Ext.form.Panel', {
    bodyPadding: 5,
    itemId:'loginFormPanel',
    border:true,
    width: 300,
    height:170,
    url: 'php/LoginController.php',
    style: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '25px',
    },
    defaultType: 'textfield',
    items: [{
        style: {
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: '25px',
        },
        fieldLabel: 'Username',
        name: '_user',
        allowBlank: false,
        inputType:'text'
    },{
        style: {
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: '5px',
        },
        fieldLabel: 'Password',
        name: '_password',
        allowBlank: false,
        inputType:'password'
    }],
    buttons: [{
        text: 'Cancel',
        handler: function() {
        	loginView.close();
        }
    }, {
        text: 'Submit',
        formBind: true, //only enabled once the form is valid
        disabled: true,
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {
                form.submit({
                	params : {_action:'0'},
                    success: function(form, action) {
                    	form.reset();
                       loginController.onLogin(action.result);
                       
                    },
                    failure: function(form, action) {
                    	form.reset();
                        Ext.Msg.alert('Failed', action.result.error.reason);
                    }
                });
            }
        }
    }]
});