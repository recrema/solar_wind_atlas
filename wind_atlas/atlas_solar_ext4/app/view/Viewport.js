/**
 * The main application viewport, which displays the whole application
 * @extends Ext.Viewport
 */
Ext.define('AM.view.Viewport', {
    extend: 'Ext.Viewport',
    layout: 'fit',
    
    requires: [
        'Ext.layout.container.Border',
        'Ext.layout.container.Fit',
        'Ext.tab.Panel',
        'Ext.tree.TreePanel',
        'Ext.tree.plugin.TreeViewDragDrop',
        'Ext.form.field.Date',
        'Ext.Img',
        'Ext.form.field.Time',
        'Ext.data.writer.Json',
        'GeoExt.tree.Panel',
        'GeoExt.panel.Map',
        'Ext.form.Label',
        'GeoExt.tree.OverlayLayerContainer',
        'GeoExt.tree.BaseLayerContainer',
        'GeoExt.data.LayerTreeModel',
        'GeoExt.tree.View',
        'GeoExt.tree.Column',
        'GeoExt.tree.LayerLoader',
        'GeoExt.slider.LayerOpacity',
        'GeoExt.slider.Tip',
        'GeoExt.panel.Legend',
        'GeoExt.container.WmsLegend',
        'GeoExt.data.reader.WmsCapabilities',
        'GeoExt.data.WmsCapabilitiesLayerStore',
        'AM.view.feedback.Action',
        'AM.view.HeaderLogo',
        'AM.view.HeaderMain',
        'AM.view.Map',
        'AM.view.Layertreepanel',
        'AM.view.Footer',
        'AM.view.WindinfoForm',
        'AM.view.Windinfo',
        'AM.view.chart.Window',
        'AM.view.genericWindow',
        'AM.view.WindinfoResult',
        'Chart.ux.Highcharts',
        'Chart.ux.Highcharts.Serie'
    ],

    initComponent: function() {

            this.items = [{
                xtype: 'panel',
                itemId: 'p1',
                border: false,
                layout: 'border',

                items: [
                        {
                	xtype: 'panel',
                	region: 'west',
                	layout:'vbox',
                	border:false,
                	width: 298,
                	items: [
								{
									xtype: 'headerLogo',
				                	border:false,
									region: 'north'
								},
								{
									xtype: 'layertreepanel',
									region: 'south',
				                	border:false,
									flex: 2
								}
                	        ],
                },{
                    xtype: 'panel',
                    region: 'center',
                    layout:'border',
                    border:false,
                    items:[{
						xtype: 'headerMain',
	                	border:false,
						region: 'north'
					},{
                        xtype: 'mappanel',
                        region: 'center'
                    }]
                },{
                	xtype: 'windinfo',
                	region: 'south',
                	items: [{
                    	xtype: 'windinfoForm',
                    },
                    {
                    	xtype: 'windinfoResult',
                    	flex: 1,
                    }]
                },{
                    xtype: 'footer',
                    region: 'south'
                }]
            }]

        this.callParent(arguments);
    }
});
