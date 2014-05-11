/**
 * Help Window with static content using 'contentEl' property.
 * @extends Ext.window.Window
 */
Ext.define('AM.view.help.Window', {
    extend: 'Ext.window.Window',
    alias : 'widget.helpwindow',
    initComponent: function() {
        Ext.apply(this, {
            bodyCls: "helpwindow",
            closeAction: "hide",
        	modal: true,
        	animateTarget:"helpMenu",
            layout: 'fit',
            resizable:false,
            maxWidth: 600,
            title: "Help",
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
