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
        'GeoExt.tree.Panel',
        'GeoExt.panel.Map',
        'Ext.form.Label',
//        'Ext.resizer.Splitter',
        'GeoExt.tree.OverlayLayerContainer',
        'GeoExt.tree.BaseLayerContainer',
        'GeoExt.data.LayerTreeModel',
        'GeoExt.tree.View',
        'GeoExt.tree.Column',
        'GeoExt.tree.LayerLoader',
        'GeoExt.slider.LayerOpacity',
        'GeoExt.slider.Tip',
        'AM.view.feedback.Action',
        'AM.view.Header',
        'AM.view.Map',
        'AM.view.Layertreepanel',
        'AM.view.WindinfoForm',
        'AM.view.Windinfo',
        'AM.view.chart.Window',
        'AM.view.genericWindow',
        'AM.view.WindinfoResult',
        'Chart.ux.Highcharts',
        'Chart.ux.Highcharts.Serie',
//        'Chart.ux.Highcharts.AreaRangeSerie',
//        'Chart.ux.Highcharts.AreaSerie',
//        'Chart.ux.Highcharts.AreaSplineRangeSerie',
//        'Chart.ux.Highcharts.AreaSplineSerie',
//        'Chart.ux.Highcharts.BarSerie',
//        'Chart.ux.Highcharts.ColumnRangeSerie',
//        'Chart.ux.Highcharts.ColumnSerie',
//        'Chart.ux.Highcharts.GaugeSerie',
//        'Chart.ux.Highcharts.LineSerie',
//        'Chart.ux.Highcharts.PieSerie',
//        'Chart.ux.Highcharts.RangeSerie',
//        'Chart.ux.Highcharts.ScatterSerie',
//        'Chart.ux.Highcharts.SplineSerie'
//        'AM.controller.Layertreepanel'
    ],

    initComponent: function() {

//        Ext.apply(this, {
            this.items = [{
                xtype: 'panel',
                itemId: 'p1',
                border: false,
                layout: 'border',
                dockedItems: [
                    Ext.create('AM.view.Header')
                ],
                items: [{
                	xtype: 'layertreepanel',
                	region: 'west',

//                	title: 'Layers',
//                	id: 'tabpanel0',
//                	region: 'west',
//                	activeTab: 0,
//            		animCollapse: true,
////            		autoScroll: true,
//            		border: false,
//            		defaults:{autoHeight: true},
////                	items :[{
////         		        	title: "Overall Maps",
////         		        	id: 'tabpanel0'
//////         		        	items: yearLayerTree
////         		        },{
////         		        	title: "Year Maps",
////         		        	id: 'tabpanel1'
//////         		        	items: monthLayerTree
////         		        },{
////         		        	title: "Month Maps",
////         		        	id: 'tabpanel2'
//////         		        	items: heightLayerTree
////         		        }]
                },{
                    xtype: 'mappanel',
                    region: 'center'
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
                }]
            }]
//        });

        this.callParent(arguments);
    }
});
