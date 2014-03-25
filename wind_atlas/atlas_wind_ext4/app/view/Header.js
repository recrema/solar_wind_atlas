/**
 * The application header displayed at the top of the viewport
 * @extends Ext.Component
 */
Ext.define('AM.view.Header', {
    extend: 'Ext.Panel',

//    dock: 'top',
    baseCls: 'header',
    height: 112,
    layout: {
        type: 'hbox',
        align: 'top'
    },
    items: [{
        xtype: 'button',
        width: 290,
        height: 112,
        cls: "transparentCls",
        href : "http://recrema.masdar.ac.ae/"
    },{
        xtype: 'button',
        height: 53,
        width: 175,
        cls: "agedi",
        href : "http://recrema.masdar.ac.ae/"
    },{
        xtype: 'button',
        height: 53,
        width: 175,
        cls: "envagenc",
        href : "http://recrema.masdar.ac.ae/"
    },
    {
        xtype: 'button',
        height: 53,
        width: 175,
        cls: "irena",
        href : "http://recrema.masdar.ac.ae/"
    },{
        xtype: 'button',
        height: 53,
        width: 175,
        cls: "supcounener",
        href : "http://recrema.masdar.ac.ae/"
    },{
        xtype: 'button',
        height: 65,
        width: 48,
        cls: "min",
        href : "http://recrema.masdar.ac.ae/"
    },{
        xtype: 'button',
        height: 65,
        width: 83,
        cls: "un",
        href : "http://recrema.masdar.ac.ae/"
    }],
    
    initComponent: function() {
        Ext.applyIf(this, {
            html: 'ReCREMA Wind Atlas'
        });

        this.callParent(arguments);
    }
});
