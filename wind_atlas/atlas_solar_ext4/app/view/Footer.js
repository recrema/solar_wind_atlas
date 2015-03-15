/**
 * The application header displayed at the top of the viewport
 * @extends Ext.Component
 */
Ext.define('AM.view.Footer', {
    extend: 'Ext.Panel',
	alias: 'widget.footer',
    border: true,
    baseCls:'footer',
    height: 50,
    layout: {
        type: 'hbox',
        pack: 'center',
        align : 'middle',
        defaultMargins: '0 20 0 20',
        
    },
    items: [{
        xtype: 'button',
        border: false,
        height: 45,
        width: 256,
        cls: "masdar",
        
        href : "http://www.masdar.ac.ae/"
    },{
        xtype: 'button',
        border: false,
        height: 45,
        width: 171,
        cls: "agedi",
        href : "http://www.agedi.ae/"
    },{
        xtype: 'button',
        border: false,
        height: 45,
        width: 156,
        cls: "envagenc",
        href : "http://www.ead.ae/en"
    },
    {
        xtype: 'button',
        border: false,
        height: 45,
        width: 178,
        cls: "irena",
        href : "http://www.irena.org/"
    },{
        xtype: 'button',
        border: false,
        height: 50,
        width: 156,
        cls: "supcounener",
        href : "http://www.dubaisce.gov.ae"
    },{
        xtype: 'button',
        border: false,
        height: 45,
        width: 29,
        cls: "min",
        href : "http://www.mofa.gov.ae/mofa_english"
    },{
        xtype: 'button',
        border: false,
        height: 45,
        width: 61,
        cls: "un",
        href : "http://www.ncms.ae"
    }],
    
    initComponent: function() {

        this.callParent(arguments);
    }
});