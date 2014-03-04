/**
 * This code was developed by Masdar Institute of Science and Technology, Abu Dhabi, United Arab Emirates
 * 
 */

// Line needed to activate the tooltip information over the icons
Ext.QuickTips.init();

// GLOBAL VARIABLES
var map, mapPanel, LayersToc, controls = [], info, pop;
var num_month;
var num_year;
var geoserverUrl="http://solaratlas.masdar.ac.ae:8080/geoserver/wind/wms";
var leftPanelWidth = 300;
var allLayers=[];

var pureCoverage = true;
// pink tile avoidance
OpenLayers.IMAGE_RELOAD_ATTEMPTS = 5;
// make OL compute scale according to WMS spec
OpenLayers.DOTS_PER_INCH = 25.4 / 0.28;

Ext.onReady(function() {
	
	format = 'image/png';
	
    var extent = new OpenLayers.Bounds(52, 22, 57, 27);
	var bounds = new OpenLayers.Bounds(48, 22, 62, 28);
	
	options = {
			projection: new OpenLayers.Projection('EPSG:900913'),
			displayProjection: new OpenLayers.Projection('EPSG:4326'),
			units: 'degrees',
			numZoomLevels: 22,
			maxResolution: 156543.0339,
			maxExtent: bounds,
			allOverlays: false
	};

	extent.transform(new OpenLayers.Projection('EPSG:4326'), options.projection);
    
	map = new OpenLayers.Map(options); 
    
	map.addControl(new OpenLayers.Control.MousePosition());
	
	map.events.register("mousemove", map, function(e) { 
        var position = this.events.getMousePosition(e);
        OpenLayers.Util.getElement("coords").innerHTML = position;
    });
	
	var worldview = new GeoExt.Action({
//	    text: "World view",
		tooltip: "Zoom to global view",
	    icon: 'images/zoom_fullextent.png',
	    control: new OpenLayers.Control.ZoomToMaxExtent(),
	    map: map
	});	
	
	var zoombox = new GeoExt.Action({
//	    text: "Zoom Window",
		tooltip: "Zoom window",
	    toggleGroup: 'tool_grp',
	    pressed: false,
	    icon: 'images/zoom_window.png',
	    control: new OpenLayers.Control.ZoomBox(),
	    map: map
	});
	
	var zoomin = new GeoExt.Action({
//	    text: "Zoom in",
		tooltip: "Zoom in",
//	    toggleGroup: 'tool_grp',
	    pressed: false,
	    icon: 'images/zoom_in.png',
	    control: new OpenLayers.Control.ZoomIn(),
	    map: map
	});
	
	var zoomout = new GeoExt.Action({
//	    text: "Zoom out",
		tooltip: "Zoom out",
//	    toggleGroup: 'tool_grp',
	    pressed: false,
	    icon: 'images/zoom_out.png',
	    control: new OpenLayers.Control.ZoomOut(),
	    map: map
	});
	
	// Navigation history - two "button" controls
    ctrl = new OpenLayers.Control.NavigationHistory();
    map.addControl(ctrl);
	
	var previous = new GeoExt.Action({
//        text: "previous",
        control: ctrl.previous,
        disabled: true,
        icon: 'previous.png',
        tooltip: "Zoom previous"
    });

    var next = new GeoExt.Action({
//        text: "next",
        control: ctrl.next,
        disabled: true,
        icon: 'next.png',
        tooltip: "Zoom next"
    });
	
	var toolbar = new Ext.Toolbar([worldview, previous, next, zoombox, zoomin, zoomout]);
	
	var mapPanel = new GeoExt.MapPanel({
//    	region: "center",
        id: "mappanel",
        title: "Map",
//        xtype: "gx_mappanel",
        map: map,
        extent: extent,
        split: true,
        layers: LayersToc,
        controls: controls,
        tbar: toolbar
    });
	
	var htmlText = "<p style='font-weight: bold;'>UAE SOLAR ATLAS ONLINE USER GUIDE</p>" +
				"<br><p style='font-weight: bold;'>General Note to Users:</p>" +
					"<ul>" +
						"<li>	- To start using the UAE Solar Atlas one must activate the desired maps on the left side Tree.</li>" +
						"<li>	- Users can take advantage of various tools available in the map toolbar like <b>Zoom to global view</b>, <b>Zoom previous</b>, <b>Zoom next</b>, <b>Zoom window</b>, <b>Zoom in</b> or <b>Zoom out</b></li>" +
					"</ul><br>" +
				"<p style='font-weight: bold;'>Activating/deactivating layers:</p>" +
					"<ul>" +
						"<li>	- In the left side Tree, expand the folders to view the maps and check/uncheck them by clicking on the corresponding checkbox</li>" +
						"<li>	- Check/uncheck by clicking on the corresponding checkbox to show or hide the maps</li>" +
						"<li>	- Note: clicking the checkbox of the upper-level folders will automatically check/uncheck all the maps that are under them. " +
						"Multiple maps can be checked simultaneously with the exception of <b>Base layer</b> maps</li>" +
					"</ul><br>" +
				"<p style='font-weight: bold;'>Setting the active layer:</p>" +
					"<ul>" +
						"<li>	- To set the active layer click the corresponding radio button</li>" +
						"<li>	- Note: Only one layer can be set as the active layer at one time</li>" +
					"</ul><br>" +
				"<p style='font-weight: bold;'>Viewing the legend of a layer:</p>" +
					"<ul>" +
						"<li>	- Set the desired layer as active</li>" +
						"<li>	- Click the <b>Legend</b> tool in the left side tool bar</li>" +
						"<li>	- Note: the legends are static; multiple legends can be opened simultaneously</li>" +
					"</ul><br>" +
				"<p style='font-weight: bold;'>Changing the transparency of a layer:</p>" +
					"<ul>" +
						"<li>	- Set the desired layer as active</li>" +
						"<li>	- Click the <b>Transparency</b> tool in the left side tool bar</li>" +
						"<li>	- Slide the slider to adjust the transparency</li>" +
					"</ul><br>" +
				"<p style='font-weight: bold;'>Viewing the chart with the power values:</p>" +
					"<ul>" +
						"<li>	- Check the desired layer(s)</li>" +
						"<li>	- Click the <b>Chart</b> button on the toolbar above the map</li>" +
						"<li>	- Click on the desired pixel on the map to view the chart with the values of the checked layer for that location (red sign over the map)</li>" +
						"<li>	- Note: the chart is built <b>on the fly</b> and only one location at a time can be shown</li>" +
					"</ul>";
	
	
	var tabs = new Ext.TabPanel({
		region: "center",
		activeTab: 0,
		items: [
		        mapPanel,
		        {title: "User guide",
		        html: htmlText,
		        autoScroll: true}		        
		        ]
	});
		
	/* --------------------------------------------------------------------------------
	*  Add Layers to the map
	*  -------------------------------------------------------------------------------- */
	
	var osm = new OpenLayers.Layer.OSM("Open Street Map");
	
	var hybrid = new OpenLayers.Layer.Google(
        "Google Hybrid",
        {type: google.maps.MapTypeId.HYBRID, numZoomLevels: 22}
	);
	var physical = new OpenLayers.Layer.Google(
        "Google Physical",
        {type: google.maps.MapTypeId.TERRAIN, numZoomLevels: 22}
    );
    var streets = new OpenLayers.Layer.Google(
        "Google Streets", // the default
        {type: google.maps.MapTypeId.STREET, numZoomLevels: 20}
    );
    var satellite = new OpenLayers.Layer.Google(
        "Google Satellite",
        {type: google.maps.MapTypeId.SATELLITE, numZoomLevels: 22}
    );
    
    map.addLayers([streets, hybrid, physical, satellite, osm]);
	
	var heights = [10, 50, 80, 100, 120];
	//collection of years to use
	var year_start = 2003;
	var year_end = 2012;
	var layer_prefix = "uaewindmap_moswindspeed_";//to use in the WMS request due to the layer name in the geoserver
	var layer_text_prefix = "UAE Wind Speed "
	var workspace = "wind";
	//var x = "a10";
	//var y = "a2003";
	//
	//window[x + y] = "test";
	//console.log(a10a2003)
	var temp = {};
	var layers_configurations = {buffer: 0, displayOutsideMaxExtent: true, ratio: 1, opacity: 1, visibility: false};
//	var h = new OpenLayers.Layer.WMS("XPTO", geoserverUrl, {Layers: workspace + ":uaewindmap_moswindspeed_10m_2006", format: format, tiled: true, transparent: true, tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom}, layers_configurations);
//	map.addLayers([h])
	
	function get_month_name(month){
		months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dec"];
		return months[month-1];
	}

	//routine to create all variables, add vthem  and respective WMS requests
	for (height in heights){
		
		for (year = year_start; year <= year_end; year++){
			
			layer_title = layer_text_prefix + " " + year + " at " + heights[height] + "m " + "Masdar Institute";
//			console.log(layer_title);
			layer_name = layer_prefix + heights[height] + 'm_' + year;
			temp[layer_name] = new OpenLayers.Layer.WMS(layer_title, geoserverUrl, {Layers: workspace + ":" + layer_name, format: format, tiled: true, transparent: true, tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom}, layers_configurations);
			map.addLayers([temp[layer_name]]);
			
			for (month = 1; month <= 12; month++){
				
				month_name = get_month_name(month);
				layer_title = layer_text_prefix + " " + month_name + " " + year + " at " + heights[height] + "m " + "Masdar Institute";
//				console.log(layer_title);
				layer_name = layer_prefix + heights[height] + 'm_' + year + month;
				temp[layer_name] = new OpenLayers.Layer.WMS(layer_text_prefix, geoserverUrl, {Layers: workspace + ":" + layer_name, format: format, tiled: true, transparent: true, tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom}, layers_configurations);
				map.addLayers([temp[layer_name]]);
				
			}
			
		}
		
	}

//	console.log(temp);
//	console.log(temp["uaewindmap_moswindspeed_10m_2006"]);
	
	// create our own layer node UI class, using the RadioButtonMixin
    var LayerNodeUI = Ext.extend(
        GeoExt.tree.LayerNodeUI, new GeoExt.tree.RadioButtonMixin()
    );

    maps_by_year = {
    		text: "Years", leaf: false, checked: false,
    		children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", layer: temp["uaewindmap_moswindspeed_10m_2007"], radioGroup: "my", uiProvider: "use_radio"}]
    	}
    
    maps_by_month = {
    		text: "Months", leaf: false,
	    }
    
    maps_by_height = {
        	text: "Heights", leaf: false,
   		
        	}
    
	var treeConfig = ([{
        nodeType: "gx_baselayercontainer"
	}, 	maps_by_year]);

	/* ------------------------------------------------------------------------------
	*  Creating the Tree panel
	*  ------------------------------------------------------------------------------ */
	
	var LayerTree = new Ext.tree.TreePanel({
		title: 'Layers',
		renderTo: 'layers',
		rootVisible: false,
		animate: true,
		enableDD: true,
		listeners: {
            checkchange:function(node,checked) {
                    if (checked) {
                    	//this will also select its parentNode                   
                        var tnode = node.parentNode;
                        while (tnode) {
                            if(tnode.ui.checkbox) {
                                tnode.ui.checkbox.checked = true;
                                tnode.ui.checkbox.defaultChecked = true;
                                tnode.attributes.checked = true;
                            }
                            tnode = tnode.parentNode;
                        }
                    }

                    node.expand(true,false,function(node){
                      
                        node.eachChild(function(child){
                                child.ui.toggleCheck(checked);
   
                                if (!child.ui.checkbox) {
                                    child.ui.fireEvent('checkchange', child, checked);
                                }
                            });
//                        if (!checked) {
//                            node.collapse();
//                        }
                        
                    });
                }
}, 
		loader: new Ext.tree.TreeLoader({
			            applyLoader: false,
			            uiProviders: {
			            	"use_radio": LayerNodeUI
			            }
			        }),
		root: {
	        nodeType: "async",
//	        expanded: true,
//	        text: "Layers",
	        children: treeConfig
	    }
	});
	
	
	/* ------------------------------------------------------------------------------
	*  Activate the radio listener and get the active layer
	*  ------------------------------------------------------------------------------ */	
		
	var activeLayer, activeLayerNode, activeLayerID;
	var numLayers = map.layers.length;
	
	// get the active layer.
	    var registerRadio = function(node){
	        if(!node.hasListener("radiochange")) {
	            node.on("radiochange", function(node){
	            	activeLayerNode = node.layer.name;
	            	activeLayerID = node.layer.id;
	            	activeLayer = map.getLayer(activeLayerID);
	            	map.setLayerIndex(activeLayer, numLayers); // The active layer stays always on top of the other ones
	            	map.setLayerIndex(markers, numLayers+1);
	            	numLayers = numLayers+1;
	            });
	        }
	    };
	    LayerTree.on({
	        "insert": registerRadio,
	        "append": registerRadio,
	        scope: this
	    });
	
	/* ------------------------------------------------------------------------------
	*  Adding button on Left side toolbar to open layer legend
	*  ------------------------------------------------------------------------------ */
    
//    var open_legend = new Ext.Button({
//        text: 'Legend',
//        icon: "images/legend.png",
//    	tooltip: "Show the legend of the active layer",
//        handler: function(record){
////        	console.log(record.get("layer").name.indexOf(activeLayer) !== -1),
////        	if (legend)
////        		legend.hide();
////        	legendStyle(activeLayer);
//        	if (activeLayerNode) {
//        	legend = new Ext.Window({
//    	    	title: "Layer legend",
//    	    	aligned: top,
//    	    	autoWidth: true,
//    	    	autoHeight: true,
//    	    	x: 350,
//    	    	y: 150,
//    	    	items: [new GeoExt.LegendPanel({
////    	            layers: mapPanel.layers,
////    	          	title: 'Legend',
//    	    		dynamic: false,
//            		filter: function(record) {
//            			SelectedLayer = record.get("layer").name.indexOf(activeLayerNode) !== -1;
//            			return SelectedLayer;
//            		},
//            		defaults: {
//    	          		legendTitle: "<bold>"+activeLayerNode+"</bold><bold><p>kWh/m<sup>2</sup></p></bold>",
//    					style: 'padding:5px',
//    					baseParams: {
//							FORMAT: 'image/png8',
//							LEGEND_OPTIONS: 'forceLabels:on'
//							}
//    					}
//    			})
//    			]
//    	}),
//        	legend.show();
//        } else alert("You should activate the layer you want to see the legend using the radio buttons in the tree layers (left panel)");
//        	}
//    });
//    
//	var left_toolbar = new Ext.Toolbar([open_legend]);
	var left_toolbar = new Ext.Toolbar
	/* ------------------------------------------------------------------------------
	*  Adding button on Left side toolbar to open layer legend
	*  ------------------------------------------------------------------------------ */
	
	var openSlider = new Ext.Button({
		text: "Transparency",
		icon: "images/transparency.png",
		handler: function(record){
			if (activeLayer){
			slider = new Ext.Window({
			    title: " Layer Transparency ",
			    aligned: top,
    	    	autoWidth: true,
    	    	autoHeight: true,
    	    	x: 350,
    	    	y: 150,
			    items: {
					xtype: "gx_opacityslider",
					layer: map.getLayer(activeLayerID),
					aggressive: true
		            }
			});
			slider.show();
			} else alert("Activate the layer you want to use the transparency slider for. Use the radio buttons in the tree layers (left panel)");
		}
	});
    
	left_toolbar.add([openSlider]);

	/* ------------------------------------------------------------------------------
	*  Button to uncheck all checked layers
	*  ------------------------------------------------------------------------------ */
	
	function unchecNodes(node) {
		for (var counter = 5; counter < map.layers.length; ++counter) {
//			if (map.layers[counter]!=baselayer) {
			map.layers[counter].setVisibility(false);
//		}
		}
	}

	
	var unckeckAll = new Ext.Button({
		text: "Uncheck All",
		icon: "images/uncheck-icon.png",
//		icon: "images/transparency.png",
		handler: unchecNodes
	});
    
	left_toolbar.add([unckeckAll]);
	
	/* ------------------------------------------------------------------------------
	*  Create the viewport (layout)
	*  ------------------------------------------------------------------------------ */
	
    new Ext.Viewport({
        layout: "border",
        items: [
                tabs, {
            region: "north",
            height: 114,
            html:'<img src="banner_top.jpg" align="left" />'
        }, {
        	region: "west",
        	contentEl: "layers",
        	width: leftPanelWidth,
            split: true,
            autoScroll: true,
            tbar: left_toolbar
        }, {
            region: "south",
            title: "Stakeholders",
            contentEl: "stakeholders",
            collapsible: true,
            height: 112
        }, {
        }]
    });

    
});