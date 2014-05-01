/**
 * 
 * @extends Ext.window.Window
 */
Ext.define('AM.view.feedback.Window', {
    extend: 'Ext.window.Window',
    alias : 'widget.feedbackwindow',
    initComponent: function() {
        Ext.apply(this, {
            bodyCls: "feedbackwindow",
            closeAction: "hide",
            resizable:false,
        	modal: true,
        	animateTarget:"helpMenu",
//            layout: 'fit',
            width: 700,
            height: 650,
            title: "Feedback",
            items:[{
            		header: false,
					border: false,
					width: 200,
					height: 100,
				    style: {
				        marginLeft: 'auto',
				        marginRight: 'auto',
				        marginTop: '10px',
				    },
					items:[{
						xtype: 'image',
						width: 202,
						height: 96,
					    src: 'resources/images/RCREMA-logo-transparent.png'
					}]},
                   {
            	xtype:'form',
                bodyPadding: 20,
                height: 502,
                border: false,
			    style: {
			        marginLeft: 'auto',
			        marginRight: 'auto',
			        marginTop: '-5px',
			    },
//                // The form will submit an AJAX request to this URL when submitted
                url: 'php/FeedbkController.php',

                // Fields will be arranged vertically, stretched to full width
//                layout: 'anchor',
//                defaults: {
//                    anchor: '90%'
//                },

                // The fields

                items: [{
                	xtype:'panel',
                	border: false,
				    style: {
				        marginLeft: 'auto',
				        marginRight: 'auto',
				    },
                	layout: 'anchor',
                	anchor: '90%',
					height: 40,
html:"<center>Please send us your feedback. We're sorry if you experienced any difficulties with this service. Your feedback will help us to improve this application and is very much appreciated!</center>",

                },{
                	xtype:'textfield',
                	layout: 'anchor',
                	anchor: '95%',
                	style: {
                	    marginTop: '7px'
                	},
                    fieldLabel: 'Name',
                    name: 'name',
                    allowBlank: false
                },{
                	xtype:'textfield',
                	layout: 'anchor',
                	anchor: '95%',
                    fieldLabel: 'Email',
                    name: 'email',
                    vtype:'email',
                    allowBlank: false
                },
                {
                	xtype:'textfield',
                	layout: 'anchor',
                	anchor: '95%',
                    fieldLabel: 'Summary',
                    name: 'summary',
                    allowBlank: false
                },{
                	xtype:'htmleditor',
                	layout: 'anchor',
                	anchor: '95%',
                    fieldLabel: 'Description',
                    name: 'feedback',
                    allowBlank: false
                },{
                    xtype: 'panel',
                    itemId: 'reCaptcha',
                    border: false,
//					width: 202,
    			    style: {
    			        marginLeft: '140px'
    			    },
					height: 120,
                    html: '<div id="recaptcha">adsf</div>',
                    listeners:{
                        afterrender:function() {
                            console.log(Ext.getDom(this.body));
                            Recaptcha.create("6Lekj_ISAAAAALWDT5P-ld561ElCOPSOXlnjN-DV",
                                Ext.getDom(this.body),
                                {
                                    theme: "clean",
                                    callback: Recaptcha.focus_response_field
                                }
                            );
                        }
                    }
                },{
                	xtype:'hiddenfield',
                	id:'challenge_field',
                    name: 'recaptcha_challenge_field'
                },{
                	xtype:'hiddenfield',
                	id:'response_field',
                    name: 'recaptcha_response_field'
                }],

                // Reset and Submit buttons
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
                    	Ext.ComponentQuery.query('feedbackwindow')[0].setLoading(true);
                    	var challenge_field=Recaptcha.get_challenge();
                    	var	response_field=Recaptcha.get_response();
                        var form = this.up('form').getForm();
                        form.setValues([{id:'challenge_field', value:challenge_field},
                                        {id:'response_field', value:response_field} ]);
                        if (form.isValid()) {
                            form.submit({
                                success: function(form, action) {
                                	Ext.ComponentQuery.query('feedbackwindow')[0].setLoading(false);
                                	Ext.MessageBox.alert('Success', action.result.msg, function()
                                			{
                                				form.reset();
                                				Recaptcha.reload();
                                				Ext.ComponentQuery.query('feedbackwindow')[0].close();
                                			}
                                			);
                                },
                                failure: function(form, action) {
                                	Ext.ComponentQuery.query('feedbackwindow')[0].setLoading(false);
                                	Recaptcha.reload();
                                    Ext.Msg.alert('Failed', action.result.error.reason);
                                }
                            });
                        }
                    }
                }],
            }
                   
            ],
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

        this.callParent(arguments);
    }
});
