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
            layout: 'fit',
            maxWidth: 600,
            title: "Help"
        });
        this.callParent(arguments);
    }
});
