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
    	html:'UAE Solar Atlas',
    	border: true,
    	margin: '5 0 0 160',
    	baseCls: "solarmillText"
    },{
        xtype: 'button',
        width: 110,
        height: 80,
        margin: '10 0 0 20',
        cls: "windmillTransparentCls",
        href : "../atlas_wind_ext4",
        listeners: {
                mouseover: function(a,e) {
                       var solar=Ext.create('Ext.panel.Panel', {
                    	    html: 'Go to Wind Atlas',
                            width: 170,
                            itemId:'windAtlas',
                            height: 25,
                        	border: true,
                        	margin: '60 0 0 -20',
                        	baseCls: "windAtlas"
                    	});
                      var a=Ext.ComponentQuery.query('headerMain')[0];
                       a.add(solar);
                },
			    mouseout: function(a,e) {
			    	var panel=Ext.ComponentQuery.query('headerMain')[0];
			    	var solar=Ext.ComponentQuery.query('headerMain [itemId=windAtlas]')[0];
			    	panel.remove(solar);
			    	
			    	
			 }
            }
    }
    ],
    
    initComponent: function() {

        this.callParent(arguments);
    }
});