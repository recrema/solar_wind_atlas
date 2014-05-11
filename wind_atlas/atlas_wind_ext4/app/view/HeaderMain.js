/**
 * The application header displayed at the top of the viewport
 * @extends Ext.Component
 */
Ext.define('AM.view.HeaderMain', {
    extend: 'Ext.Panel',
    alias: 'widget.headerMain',
    border: false,
    dock: 'top',
    baseCls: 'headermain',
    height: 126,
    layout: 'hbox',
    items: [{
        width: 200,
        height: 60,
    	html:'UAE Wind Atlas',
    	border: true,
    	margin: '5 0 0 140',
    	baseCls: "windmillText"
    },{
        xtype: 'button',
        width: 110,
        height: 60,
        margin: '50 0 0 -50',
        cls: "windmillTransparentCls",
        href : "http://solaratlas.masdar.ac.ae/",
        listeners: {
                mouseover: function(a,e) {
                       var solar=Ext.create('Ext.panel.Panel', {
                    	    html: 'Go to Solar Atlas',
                            width: 170,
                            itemId:'solarAtlas',
                            height: 25,
                        	border: true,
                        	margin: '60 0 0 0',
                        	baseCls: "solarAtlas"
                    	});
                      var a=Ext.ComponentQuery.query('headerMain')[0];
                       a.add(solar);
                },
			    mouseout: function(a,e) {
			    	var panel=Ext.ComponentQuery.query('headerMain')[0];
			    	var solar=Ext.ComponentQuery.query('headerMain [itemId=solarAtlas]')[0];
			    	panel.remove(solar);
			    	
			    	
			 }
            }
    }
    ],
    
    initComponent: function() {

        this.callParent(arguments);
    }
});