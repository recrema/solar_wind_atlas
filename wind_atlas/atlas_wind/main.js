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
var geoserverUrl="http://atlas.masdar.ac.ae:8080/geoserver/wind/wms";
var leftPanelWidth = 300;
var allLayers=[];
var windroses_location, windroses_window;

var chartLayers=[]; // This array is used to add only the necessary layers to build the chart

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
	
	//Baselayers
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
	
	var heights = ["10", "50", "80", "100", "120"];
	var month_numbers = ["01", "02" , "03" , "04" , "05" , "06" , "07" , "08" , "09" , "10" , "11" , "12"];
	//collection of years to use
	var year_start = 2003;
	var year_end = 2012;
	var layer_prefix = "uaewindmap_moswindspeed_";//to use in the WMS request due to the layer name in the geoserver
	var layer_text_prefix = "Wind Speed";
	var workspace = "wind";

	var temp = {};
	var layers_configurations = {buffer: 0, displayOutsideMaxExtent: true, ratio: 1, opacity: 1, visibility: false};
	
	//Context layers
	var uae_emirates = new OpenLayers.Layer.WMS("United Arab Emirates Border", geoserverUrl, {Layers: "wind:uae_borders_changed", format: format, tiled: true, transparent: true, tilesOrigin: map.maxExtent.left + ',' + map.maxExtent.bottom}, layers_configurations);
	var uae_main_roads_from_osm = new OpenLayers.Layer.WMS("UAE main roads", geoserverUrl, {Layers: "wind:uae_main_roads_from_osm", format: format, tiled: true, transparent: true, tilesOrigin: map.maxExtent.left + ',' + map.maxExtent.bottom}, layers_configurations);
	var uae_main_transmission_network = new OpenLayers.Layer.WMS("UAE transmission network", geoserverUrl, {Layers: "wind:uae_main_transmission_network", format: format, tiled: true, transparent: true, tilesOrigin: map.maxExtent.left + ',' + map.maxExtent.bottom}, layers_configurations);
	var uae_power_plants = new OpenLayers.Layer.WMS("UAE power plants", geoserverUrl, {Layers: "wind:uae_power_plants", format: format, tiled: true, transparent: true, tilesOrigin: map.maxExtent.left + ',' + map.maxExtent.bottom}, layers_configurations);
	
	map.addLayers([uae_emirates, uae_main_roads_from_osm, uae_main_transmission_network, uae_power_plants]);
	
	function get_month_name(month){
		month_names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		return month_names[parseInt(month)-1];
	};

	//routine to create month and year maps' variables, add them to the temp array along with the respective WMS requests
	for (var i=0; i<heights.length; i++){
		for (year = year_start; year <= year_end; year++){
			layer_title = layer_text_prefix + " " + year + " at " + heights[i] + "m - Masdar Institute";
			layer_name = layer_prefix + heights[i] + 'm_' + year;
			temp[layer_name] = new OpenLayers.Layer.WMS(layer_title, geoserverUrl, {Layers: workspace + ":" + layer_name, format: format, tiled: true, transparent: true, tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom}, layers_configurations);
			map.addLayers([temp[layer_name]]);
			chartLayers.push(temp[layer_name]);
			for (var ii=0; ii<month_numbers.length; ii++){
				month_name = get_month_name(month_numbers[ii]);
				layer_title = layer_text_prefix + " " + month_name + " " + year + " at " + heights[i] + "m - Masdar Institute";
				layer_name = layer_prefix + heights[i] + 'm_' + year + month_numbers[ii];
				temp[layer_name] = new OpenLayers.Layer.WMS(layer_title, geoserverUrl, {Layers: workspace + ":" + layer_name, format: format, tiled: true, transparent: true, tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom}, layers_configurations);
				map.addLayers([temp[layer_name]]);
				chartLayers.push(temp[layer_name]);
			};
		};
	};
	
	//routine to create overall maps' variables, add them to the temp array along with the respective WMS requests
	for (var i=0; i<heights.length; i++) {
		layer_title = layer_text_prefix + " at " + heights[i] + "m Annual" + " - Masdar Institute";
		layer_name = layer_prefix + heights[i] + 'm_' + "Annual";
		temp[layer_name] = new OpenLayers.Layer.WMS(layer_title, geoserverUrl, {Layers: workspace + ":" + layer_name, format: format, tiled: true, transparent: true, tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom}, layers_configurations);
		map.addLayers([temp[layer_name]]);
		chartLayers.push(temp[layer_name]);
		for (var ii=0; ii<month_numbers.length; ii++) {
			month_name = get_month_name(month_numbers[ii]);
			layer_title = layer_text_prefix + " at " + heights[i] + "m " + month_name + " - Masdar Institute";
			layer_name = layer_prefix + heights[i] + 'm_' + month_numbers[ii];
			temp[layer_name] = new OpenLayers.Layer.WMS(layer_title, geoserverUrl, {Layers: workspace + ":" + layer_name, format: format, tiled: true, transparent: true, tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom}, layers_configurations);
			map.addLayers([temp[layer_name]]);
			chartLayers.push(temp[layer_name]);
		};
	};
	
	// create our own layer node UI class, using the RadioButtonMixin
    var LayerNodeUI = Ext.extend(
        GeoExt.tree.LayerNodeUI, new GeoExt.tree.RadioButtonMixin()
    );

	/* --------------------------------------------------------------------------------
	*  Build the different trees for the 3 tabs in the left panel:
	*  		Overall maps
	*  		Year maps
	*  		Month maps
	*  -------------------------------------------------------------------------------- */
    
//Overall Maps Tree
    var overall_maps_tree = [];
    //by Month
    var overall_maps_tree_by_month = [];
    for (var i=0; i<month_numbers.length; i++){
    	maps_month_height = [];
    	month_name = get_month_name(month_numbers[i]);
    	for (var ii=0; ii<heights.length; ii++) {
			a = {nodeType: "gx_layer", icon: "images/layerIcon.png", layer: temp[layer_prefix + heights[ii] + "m_" + month_numbers[i]], radioGroup: "my", uiProvider: "use_radio"};
			maps_month_height.push(a);
		};
    	overall_maps_tree_by_month.push({text: month_name, leaf: false, children: maps_month_height});
    };
    overall_maps_tree.push({text: "by Month", leaf: false, children: overall_maps_tree_by_month});
    //by Height
    var overall_maps_tree_by_height = [];
    var overall_maps_tree_by_height_Annual = []; //Special case of Overall annual maps
//    console.log(typeof overall_maps_tree_by_height_Annual);
    for (var i=0; i<heights.length; i++) {
    	a = {nodeType: "gx_layer", icon: "images/layerIcon.png", layer: temp[layer_prefix + heights[i] + "m_Annual"], radioGroup: "my", uiProvider: "use_radio"};
    	overall_maps_tree_by_height.push(a);
//    	console.log(temp[layer_prefix + heights[i] + "m_Annual"]);
    };  
    for (var i=0; i<heights.length; i++) {
    	a = {nodeType: "gx_layer", icon: "images/layerIcon.png", layer: temp[layer_prefix + heights[i] + "m_Annual"], radioGroup: "my", uiProvider: "use_radio"};
    	overall_maps_tree_by_height_Annual.push(a);
    	maps_height_month = [];
    	for (var ii=0; ii<month_numbers.length; ii++) {
    		a = {nodeType: "gx_layer", icon: "images/layerIcon.png", layer: temp[layer_prefix + heights[i] + "m_" + month_numbers[ii]], radioGroup: "my", uiProvider: "use_radio"};
    		maps_height_month.push(a);
    	};
    	overall_maps_tree_by_height.push({text: heights[i] + " m", leaf: false, checked: false, children:maps_height_month});
    };
    overall_maps_tree.push({text: "by Height", leaf: false, children: overall_maps_tree_by_height});
    
//Year Maps Tree
    var year_maps_tree = [];
    //by Year
    var year_maps_tree_by_year = [];
    for (year = year_start; year <= year_end; year++){
    	maps_year_height = [];
    	for (var i=0; i<heights.length; i++) {
			a = {nodeType: "gx_layer", icon: "images/layerIcon.png", layer: temp[layer_prefix + heights[i] + "m_" + year], radioGroup: "my", uiProvider: "use_radio"};
			maps_year_height.push(a);
		};
    	year_maps_tree_by_year.push({text: year.toString(), leaf: false, children: maps_year_height});
    };
    year_maps_tree.push({text: "by Year", leaf: false, children: year_maps_tree_by_year});
    //by Height
    var year_maps_tree_by_height = [];
    for (var i=0; i<heights.length; i++) {
    	maps_height_year = [];
    	for (year = year_start; year <= year_end; year++) {
    		a = {nodeType: "gx_layer", icon: "images/layerIcon.png", layer: temp[layer_prefix + heights[i] + "m_" + year], radioGroup: "my", uiProvider: "use_radio"};
    		maps_height_year.push(a);
    	};
    	year_maps_tree_by_height.push({text: heights[i] + " m", leaf: false, children:maps_height_year});
    };
    year_maps_tree.push({text: "by Height", leaf: false, children: year_maps_tree_by_height});
    
//Month Maps Tree
    var month_maps_tree = [];
    //by Year
    var month_maps_tree_by_year = [];
    for (year = year_start; year <= year_end; year++){
    	maps_year_month_height = [];
    	maps_year_by_month = [];
    	for (var i=0; i<month_numbers.length; i++) {
    		maps_year_by_month_height = [];
    		month_name = get_month_name(month_numbers[i]);
    		for (var ii=0; ii<heights.length; ii++) {
				a = {nodeType: "gx_layer", icon: "images/layerIcon.png", layer: temp[layer_prefix + heights[ii] + "m_" + year + month_numbers[i]], radioGroup: "my", uiProvider: "use_radio"};
				maps_year_by_month_height.push(a);
    		};
    		maps_year_by_month.push({text: month_name, leaf: false, children:maps_year_by_month_height});
		};
		maps_year_by_height = [];
		for (var i=0; i<heights.length; i++) {
    		maps_year_by_height_month = [];
    		for (var ii=0; ii<month_numbers.length; ii++) {
				a = {nodeType: "gx_layer", icon: "images/layerIcon.png", layer: temp[layer_prefix + heights[i] + "m_" + year + month_numbers[ii]], radioGroup: "my", uiProvider: "use_radio"};
				maps_year_by_height_month.push(a);
    		};
    		maps_year_by_height.push({text: heights[i] + " m", leaf: false, children:maps_year_by_height_month});
		};
		maps_year_month_height.push({text: "by Month", leaf: false, children: maps_year_by_month});
		maps_year_month_height.push({text: "by Height", leaf: false, children: maps_year_by_height});
		month_maps_tree_by_year.push({text: year.toString(), leaf: false, children: maps_year_month_height});
    };
    month_maps_tree.push({text: "by Year", leaf: false, children: month_maps_tree_by_year});
    //by Month
    var month_maps_tree_by_month = [];
    for (var i=0; i<month_numbers.length; i++){
    	month_name = get_month_name(month_numbers[i]);
    	maps_month_year_height = [];
    	maps_month_by_year = [];
    	for (year = year_start; year <= year_end; year++) {
    		maps_month_by_year_height = [];
    		for (var ii=0; ii<heights.length; ii++) {
				a = {nodeType: "gx_layer", icon: "images/layerIcon.png", layer: temp[layer_prefix + heights[ii] + "m_" + year + month_numbers[i]], radioGroup: "my", uiProvider: "use_radio"};
				maps_month_by_year_height.push(a);
    		};
    		maps_month_by_year.push({text: year.toString(), leaf: false, children:maps_month_by_year_height});
		};
		maps_month_by_height = [];
		for (var ii=0; ii<heights.length; ii++) {
    		maps_month_by_height_year = [];
    		for (year = year_start; year <= year_end; year++) {
				a = {nodeType: "gx_layer", icon: "images/layerIcon.png", layer: temp[layer_prefix + heights[ii] + "m_" + year + month_numbers[i]], radioGroup: "my", uiProvider: "use_radio"};
				maps_month_by_height_year.push(a);
    		};
    		maps_month_by_height.push({text: heights[ii] + " m", leaf: false, children:maps_month_by_height_year});
		};
		maps_month_year_height.push({text: "by Year", leaf: false, children: maps_month_by_year});
		maps_month_year_height.push({text: "by Height", leaf: false, children: maps_month_by_height});
		month_maps_tree_by_month.push({text: month_name, leaf: false, children: maps_month_year_height});
    };
    month_maps_tree.push({text: "by Month", leaf: false, children: month_maps_tree_by_month});
    //by Height
    var month_maps_tree_by_height = [];
    for (var i=0; i<heights.length; i++){
    	maps_height_month_year = [];
    	maps_height_by_year = [];
    	for (year = year_start; year <= year_end; year++) {
    		maps_month_by_year_height = [];
    		for (var ii=0; ii<month_numbers.length; ii++) {
				a = {nodeType: "gx_layer", icon: "images/layerIcon.png", layer: temp[layer_prefix + heights[i] + "m_" + year + month_numbers[ii]], radioGroup: "my", uiProvider: "use_radio"};
				maps_month_by_year_height.push(a);
    		};
    		maps_height_by_year.push({text: year.toString(), leaf: false, children:maps_month_by_year_height});
		};
		maps_height_by_month = [];
		for (var ii=0; ii<month_numbers.length; ii++) {
			month_name = get_month_name(month_numbers[ii]);
    		maps_height_by_month_year = [];
    		for (year = year_start; year <= year_end; year++) {
				a = {nodeType: "gx_layer", icon: "images/layerIcon.png", layer: temp[layer_prefix + heights[i] + "m_" + year + month_numbers[ii]], radioGroup: "my", uiProvider: "use_radio"};
				maps_height_by_month_year.push(a);
    		};
    		maps_height_by_month.push({text: month_name, leaf: false, children:maps_height_by_month_year});
		};
		maps_height_month_year.push({text: "by Year", leaf: false, children: maps_height_by_year});
		maps_height_month_year.push({text: "by Month", leaf: false, children: maps_height_by_month});
		month_maps_tree_by_height.push({text: heights[i] + " m", leaf: false, children: maps_height_month_year});
    };
    month_maps_tree.push({text: "by Height", leaf: false, children: month_maps_tree_by_height});
    

    
    //Creating the trees
	var treeConfigYear = (overall_maps_tree);
    var treeConfigMonth = (year_maps_tree);
    var treeConfigHeight = (month_maps_tree);
       
	/* ------------------------------------------------------------------------------
	*  Creating the Tree panel
	*  ------------------------------------------------------------------------------ */
	
    var yearLayerTree = new Ext.tree.TreePanel({
//		title: 'Layers',
//		renderTo: 'yearLayerTree',
		rootVisible: false,
		animate: true,
		enableDD: true,
		autoHeight: true,
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
	        children: treeConfigYear
	    }				
	});
    
    var monthLayerTree = new Ext.tree.TreePanel({
//		title: 'Layers',
//		renderTo: 'yearLayerTree',
		rootVisible: false,
		animate: true,
		enableDD: true,
		autoHeight: true,
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
	        children: treeConfigMonth
	    }				
	});
    
    var heightLayerTree = new Ext.tree.TreePanel({
//		title: 'Layers',
//		renderTo: 'yearLayerTree',
		rootVisible: false,
		animate: true,
		enableDD: true,
		autoHeight: true,
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
	        children: treeConfigHeight
	    }				
	});
	
    /* ------------------------------------------------------------------------------
	*  Adding a mark when the users click the map
	*  ------------------------------------------------------------------------------ */

	markers = new OpenLayers.Layer.Markers( "Markers" );
	markers.id = "Markers";
	map.addLayer(markers);
	var markerslayer, lonlat, xPixel, icon;
	
	map.events.register("click", map, function(e) {
	      //var position = this.events.getMousePosition(e);
		xPixel = e.xy.x;
//		alert(xPixel);
		lonlat = map.getLonLatFromPixel(e.xy);
		var size = new OpenLayers.Size(21,21);
		var offset = new OpenLayers.Pixel(-(size.w/2), -size.h);
		icon = new OpenLayers.Icon('images/button.gif', size);
//		icon = new OpenLayers.Icon('images/marker.png', size, offset);
		markerslayer = map.getLayer('Markers');

//		markerslayer.addMarker(new OpenLayers.Marker(lonlat,icon));

	});
    
	/* ------------------------------------------------------------------------------
	*  Activate the radio listener and get the active layer
	*  ------------------------------------------------------------------------------ */	
		
	var activeLayer, activeLayerNode, activeLayerID;
	var numLayers = map.layers.length;
//	console.log(numLayers)
	// get the active layer.
    var registerRadio = function(node){
        if(!node.hasListener("radiochange")) {
            node.on("radiochange", function(node){
            	activeLayerNode = node.layer.name;
            	activeLayerID = node.layer.id;
            	activeLayer = map.getLayer(activeLayerID);
            	map.setLayerIndex(activeLayer, numLayers); // The active layer stays always on top of the other ones
            	map.setLayerIndex(uae_emirates, numLayers+1);
            	map.setLayerIndex(uae_main_roads_from_osm, numLayers+2);
				map.setLayerIndex(uae_main_transmission_network, numLayers+3);
				map.setLayerIndex(uae_power_plants, numLayers+4);
            	map.setLayerIndex(markers, numLayers+5);
            	numLayers = numLayers+1;
            });
        }
    };
    
    yearLayerTree.on({
        "insert": registerRadio,
        "append": registerRadio,
        scope: this
    });
    monthLayerTree.on({
        "insert": registerRadio,
        "append": registerRadio,
        scope: this
    });
    heightLayerTree.on({
        "insert": registerRadio,
        "append": registerRadio,
        scope: this
    });

	/* -----------------------------------------------------------------------------------------------
	*  Collect pixel value after mouse click using GetFeatureInfo function and show a chart with the
	*  values of all selected layers
	*  ----------------------------------------------------------------------------------------------- */
	
    info = new OpenLayers.Control.WMSGetFeatureInfo({
        url: geoserverUrl, 
//        title: 'Identify features by clicking',
        queryVisible: true,
//        infoFormat: "application/vnd.ogc.json",
        infoFormat: "text/html",
        maxFeatures: 12,
        layers: chartLayers,
        eventListeners: {
            getfeatureinfo: function(event) {
            	
//            	console.log(chartLayers);
            	// Close popup if one is already opened and clear all markers
            	if (pop){
            		pop.hide();
            		markerslayer.clearMarkers();
            	};
            	
            	var dom = $('<table>').html(event.text);
            	var afeatureInfo = {};
            	var data = [];
            	
            	$('table:has(.dataLayer)', dom).each(function(){          		
            	    var $tbl = $(this);
            	    var section = $tbl.find('.dataLayer').text();
//            	    console.log(section);
            	    var obj = [];
            	    var $structure = $tbl.find('.dataHeaders');
            	    var structure = $structure.find('th').map(function(){return $(this).text().toLowerCase();});
            	    var $datarows= $structure.nextAll('tr');
            	    var flag = 0;
            	    $datarows.each(function(i){
            	        obj[i] = {};
            	        $(this).find('td').each(function(index,element){
            	        		obj[i][structure[index]] = $(element).text();
	            	            id=structure[index];
	            	            id2=chartDate(id);
//	            	            console.log(id2);
//	            	            x = verifyChartLayers(structure[index]);
	            	            value=formatChartNumber($(element).text());
	            	            data.push([id2, value]);
            	        });
            	    });
            	    afeatureInfo[section] = obj;
            	});
            	
            	markerslayer.addMarker(new OpenLayers.Marker(lonlat,icon)); //add a marker where the user click a pixel 
            	
            	if (this.featurecount>12) {
            		alert(" Please do not turn on more that 12 layers at a time! ");
            		markerslayer.clearMarkers();
            	}            	
            	if ((num_month != 0) && (num_year != 0)) {
//            		alert(" Please chose only yearly or monthly maps! ");
            		markerslayer.clearMarkers();
            	}
            	else
            		chartPlot(data, xPixel, markerslayer);
//            		console.log(data);
	            	//restart values of variables that count the number of layers activated
	            	num_month = 0;
	            	num_year = 0;
            }
        }
    });
    map.addControl(info);
    
	var pixelInfo = new GeoExt.Action({
	    text: "Chart",
	    toggleGroup: 'tool_grp',
	    tooltip: "Show chart with pixel values of the layers that are on",
	    pressed: false,
	    icon: 'images/chart.png',
	    control: info,
	    map: map
	});
    
	toolbar.add(pixelInfo);
	
//	windroses_window = new Ext.Window({
//		title: "Something"
//	});
//	
//	var windroses_button = new GeoExt.Action({
//	    text: "Wind Roses",
//	    toggleGroup: 'tool_grp',
//	    tooltip: "Show wind information",
//	    pressed: false,
////	    icon: 'images/chart.png',
//	    control: windroses_window,
//	    map: map
//	});
//	toolbar.add(windroses_button);
    
	/* ------------------------------------------------------------------------------
	*  Adding Boundaies button on top toolbar to activate and desactivate boundaries layers
	*  ------------------------------------------------------------------------------ */
    
    var boundaries_layers = new Ext.Button({
		text: "Context datasets",
		enableToggle: true,
		handler: function (button) {
			if(this.pressed==true){
				uae_emirates.setVisibility(true);
				uae_main_roads_from_osm.setVisibility(true);
				uae_main_transmission_network.setVisibility(true);
				uae_power_plants.setVisibility(true);
				map.setLayerIndex(uae_emirates, 100000);
				map.setLayerIndex(uae_main_roads_from_osm, 100001);
				map.setLayerIndex(uae_main_transmission_network, 100002);
				map.setLayerIndex(uae_power_plants, 100003);
//				qatar.setVisibility(true);
//				map.setLayerIndex(qatar, 10000);
			} else {
				uae_emirates.setVisibility(false);
				uae_main_roads_from_osm.setVisibility(false);
				uae_main_transmission_network.setVisibility(false);
				uae_power_plants.setVisibility(false);
//				qatar.setVisibility(false);
			};
		}
    });
    
	toolbar.add([boundaries_layers]);
	
	
    
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
			map.layers[counter].setVisibility(false);
		};
		if (boundaries_layers.pressed=true){
			boundaries_layers.toggle();
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
            tabs,
            {region: "north",
            height: 114,
            contentEl: "title"
        }, {
        	region: "west",
        	activeTab: 0,
        	width: leftPanelWidth,
            autoScroll: true,
            tbar: left_toolbar,
            split:true,
            layout: {
                type: 'accordion',
                animate: true
            },
            items: [{
                title: 'Layers',
                border: false,
                autoScroll: true,
                items: new Ext.TabPanel({
            		activeTab: 0,
            		animCollapse: true,
//            		autoScroll: true,
            		border: false,
            		defaults:{autoHeight: true},
            		items: [
            		        {
            		        	title: "Overall Maps",
            		        	items: yearLayerTree
            		        },{
            		        	title: "Year Maps",
            		        	items: monthLayerTree
            		        },{
            		        	title: "Month Maps",
            		        	items: heightLayerTree
            		        }]
            	})
            }, {
                title: 'Legend',
                html: '<b>Wind Speed (m/s)</b><br><br><span><img src="windspeed_legend.png"/></span>',
                tabCls: 'right-tab',
                margins: {top:0, right:0, bottom:0, left:10},
                border: false,
                autoScroll: true,
                iconCls: 'settings'
            }]
        }, {
            region: "south",
            title: "Stakeholders",
            contentEl: "stakeholders",
            collapsible: true,
            height: 112
        }]
    });

    
});