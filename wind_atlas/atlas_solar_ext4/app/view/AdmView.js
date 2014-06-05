Ext.define('AM.view.AdmView', {
	extend: 'Ext.window.Window',
	alias: 'widget.admView',
	height: 600,
	width: 700,
	draggable : false,
	closeAction :'hide',
	border: false,
	hidden: false,
	modal: true,
	header: false,
	resizable:false,
	initComponent: function() {
		admView = this;
        Ext.apply(this, {
        	  items: [ { xtype: 'button',
				    style: {
				        marginTop: '10px',
				    },
   	              cls:'buttonwindclose',
	              handler:  function () {
	            	  admView.hide();
	              }},{
        	        xtype : "component",
	            	border:false,
        	        height: "100%",
        	        width:"100%",
        	        autoEl : {
        	            tag : "iframe",
        	            src : "php/adm_panel/adm_panel_2.php"
        	        }
        	    }
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