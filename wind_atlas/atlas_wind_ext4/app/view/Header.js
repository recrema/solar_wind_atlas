/**
 * The application header displayed at the top of the viewport
 * @extends Ext.Component
 */
Ext.define('AM.view.Header', {
    extend: 'Ext.Component',

//    dock: 'top',
    baseCls: 'header',
    height: 112,
    
    initComponent: function() {
        Ext.applyIf(this, {
            html: 'ReCREMA Wind Atlas'
        });

        this.callParent(arguments);
    }
});
