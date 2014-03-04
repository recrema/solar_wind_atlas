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
var geoserverUrl="http://solaratlas.masdar.ac.ae:8080/geoserver/masdar/wms";
var leftPanelWidth = 300;
var allLayers=[];

var uae_emirates, qatar; // These variables represents layers of context

//var chartLayers=[]; // This array is used to add only the necessary layers to build the chart

// create layers


var DHI2004_apr, DHI2004_may, DHI2004_jun, DHI2004_jul, DHI2004_aug, DHI2004_sep, DHI2004_oct, DHI2004_nov, DHI2004_dec;
var DNI2004_apr, DNI2004_may, DNI2004_jun, DNI2004_jul, DNI2004_aug, DNI2004_sep, DNI2004_oct, DNI2004_nov, DNI2004_dec;
var GHI2004_apr, GHI2004_may, GHI2004_jun, GHI2004_jul, GHI2004_aug, GHI2004_sep, GHI2004_oct, GHI2004_nov, GHI2004_dec;

var DNI2005_jan, DNI2005_feb, DNI2005_mar, DNI2005_apr, DNI2005_may, DNI2005_jun, DNI2005_jul, DNI2005_aug, DNI2005_sep;
var DHI2005_jan, DHI2005_feb, DHI2005_mar, DHI2005_apr, DHI2005_may, DHI2005_jun, DHI2005_jul, DHI2005_aug, DHI2005_sep;
var GHI2005_jan, GHI2005_feb, GHI2005_mar, GHI2005_apr, GHI2005_may, GHI2005_jun, GHI2005_jul, GHI2005_aug, GHI2005_sep;

var DNI2006_jan, DNI2006_feb, DNI2006_mar, DNI2006_apr, DNI2006_may, DNI2006_jun, DNI2006_jul, DNI2006_aug, DNI2006_sep, DNI2006_oct, DNI2006_nov, DNI2006_dec;
var DHI2006_jan, DHI2006_feb, DHI2006_mar, DHI2006_apr, DHI2006_may, DHI2006_jun, DHI2006_jul, DHI2006_aug, DHI2006_sep, DHI2006_oct, DHI2006_nov, DHI2006_dec;
var GHI2006_jan, GHI2006_feb, GHI2006_mar, GHI2006_apr, GHI2006_may, GHI2006_jun, GHI2006_jul, GHI2006_aug, GHI2006_sep, GHI2006_oct, GHI2006_nov, GHI2006_dec;

var DNI2008_jan, DNI2008_feb, DNI2008_mar, DNI2008_apr, DNI2008_may, DNI2008_jun, DNI2008_jul, DNI2008_aug, DNI2008_sep, DNI2008_oct, DNI2008_nov, DNI2008_dec;
var DHI2008_jan, DHI2008_feb, DHI2008_mar, DHI2008_apr, DHI2008_may, DHI2008_jun, DHI2008_jul, DHI2008_aug, DHI2008_sep, DHI2008_oct, DHI2008_nov, DHI2008_dec;
var GHI2008_jan, GHI2008_feb, GHI2008_mar, GHI2008_apr, GHI2008_may, GHI2008_jun, GHI2008_jul, GHI2008_aug, GHI2008_sep, GHI2008_oct, GHI2008_nov, GHI2008_dec;

var DNI2009_jan, DNI2009_feb, DNI2009_mar, DNI2009_apr, DNI2009_may, DNI2009_jun, DNI2009_jul, DNI2009_aug, DNI2009_sep, DNI2009_oct, DNI2009_nov, DNI2009_dec;
var DHI2009_jan, DHI2009_feb, DHI2009_mar, DHI2009_apr, DHI2009_may, DHI2009_jun, DHI2009_jul, DHI2009_aug, DHI2009_sep, DHI2009_oct, DHI2009_nov, DHI2009_dec;
var GHI2009_jan, GHI2009_feb, GHI2009_mar, GHI2009_apr, GHI2009_may, GHI2009_jun, GHI2009_jul, GHI2009_aug, GHI2009_sep, GHI2009_oct, GHI2009_nov, GHI2009_dec;

var DNI2010_jan, DNI2010_feb, DNI2010_mar, DNI2010_apr, DNI2010_may, DNI2010_jun, DNI2010_jul, DNI2010_aug, DNI2010_sep, DNI2010_oct, DNI2010_nov, DNI2010_dec;
var DHI2010_jan, DHI2010_feb, DHI2010_mar, DHI2010_apr, DHI2010_may, DHI2010_jun, DHI2010_jul, DHI2010_aug, DHI2010_sep, DHI2010_oct, DHI2010_nov, DHI2010_dec;
var GHI2010_jan, GHI2010_feb, GHI2010_mar, GHI2010_apr, GHI2010_may, GHI2010_jun, GHI2010_jul, GHI2010_aug, GHI2010_sep, GHI2010_oct, GHI2010_nov, GHI2010_dec;

var DNI2011_jan, DNI2011_feb, DNI2011_mar, DNI2011_apr, DNI2011_may, DNI2011_jun, DNI2011_jul, DNI2011_aug, DNI2011_sep, DNI2011_oct, DNI2011_nov, DNI2011_dec;
var DHI2011_jan, DHI2011_feb, DHI2011_mar, DHI2011_apr, DHI2011_may, DHI2011_jun, DHI2011_jul, DHI2011_aug, DHI2011_sep, DHI2011_oct, DHI2011_nov, DHI2011_dec;
var GHI2011_jan, GHI2011_feb, GHI2011_mar, GHI2011_apr, GHI2011_may, GHI2011_jun, GHI2011_jul, GHI2011_aug, GHI2011_sep, GHI2011_oct, GHI2011_nov, GHI2011_dec;

var DNI2012_jan, DNI2012_feb, DNI2012_mar, DNI2012_apr, DNI2012_may, DNI2012_jun, DNI2012_jul, DNI2012_aug, DNI2012_sep, DNI2012_oct, DNI2012_nov, DNI2012_dec;
var DHI2012_jan, DHI2012_feb, DHI2012_mar, DHI2012_apr, DHI2012_may, DHI2012_jun, DHI2012_jul, DHI2012_aug, DHI2012_sep, DHI2012_oct, DHI2012_nov, DHI2012_dec;
var GHI2012_jan, GHI2012_feb, GHI2012_mar, GHI2012_apr, GHI2012_may, GHI2012_jun, GHI2012_jul, GHI2012_aug, GHI2012_sep, GHI2012_oct, GHI2012_nov, GHI2012_dec;

var GHI2006_yearly, DNI2006_yearly, DHI2006_yearly, GHI2008_yearly, DNI2008_yearly, DHI2008_yearly, GHI2009_yearly, DNI2009_yearly, DHI2009_yearly, GHI2010_yearly, DNI2010_yearly, DHI2010_yearly, GHI2011_yearly, DNI2011_yearly, DHI2011_yearly, GHI2012_yearly, DNI2012_yearly, DHI2012_yearly;

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
	
	baseLayers(map);
	yearlyLayers(map);
	contextLayers(map);
	monthlyLayers2004(map);
	monthlyLayers2005(map);
	monthlyLayers2006(map);
	monthlyLayers2008(map);
	monthlyLayers2009(map);
	monthlyLayers2010(map);
	monthlyLayers2011(map);
	monthlyLayers2012(map);

	map.addLayers([uae_emirates, qatar]);
	
	map.addLayers([DHI2004_apr, DHI2004_may, DHI2004_jun, DHI2004_jul, DHI2004_aug, DHI2004_sep, DHI2004_oct, DHI2004_nov, DHI2004_dec]);
	map.addLayers([DNI2004_apr, DNI2004_may, DNI2004_jun, DNI2004_jul, DNI2004_aug, DNI2004_sep, DNI2004_oct, DNI2004_nov, DNI2004_dec]);
	map.addLayers([GHI2004_apr, GHI2004_may, GHI2004_jun, GHI2004_jul, GHI2004_aug, GHI2004_sep, GHI2004_oct, GHI2004_nov, GHI2004_dec]);
	
	map.addLayers([DNI2005_jan, DNI2005_feb, DNI2005_mar, DNI2005_apr, DNI2005_may, DNI2005_jun, DNI2005_jul, DNI2005_aug, DNI2005_sep]);
	map.addLayers([DHI2005_jan, DHI2005_feb, DHI2005_mar, DHI2005_apr, DHI2005_may, DHI2005_jun, DHI2005_jul, DHI2005_aug, DHI2005_sep]);
	map.addLayers([GHI2005_jan, GHI2005_feb, GHI2005_mar, GHI2005_apr, GHI2005_may, GHI2005_jun, GHI2005_jul, GHI2005_aug, GHI2005_sep]);

	map.addLayers([DNI2006_jan, DNI2006_feb, DNI2006_mar, DNI2006_apr, DNI2006_may, DNI2006_jun, DNI2006_jul, DNI2006_aug, DNI2006_sep, DNI2006_oct, DNI2006_nov, DNI2006_dec]);
	map.addLayers([DHI2006_jan, DHI2006_feb, DHI2006_mar, DHI2006_apr, DHI2006_may, DHI2006_jun, DHI2006_jul, DHI2006_aug, DHI2006_sep, DHI2006_oct, DHI2006_nov, DHI2006_dec]);
	map.addLayers([GHI2006_jan, GHI2006_feb, GHI2006_mar, GHI2006_apr, GHI2006_may, GHI2006_jun, GHI2006_jul, GHI2006_aug, GHI2006_sep, GHI2006_oct, GHI2006_nov, GHI2006_dec]);
	
	map.addLayers([DHI2008_jan, DHI2008_feb, DHI2008_mar, DHI2008_apr, DHI2008_may, DHI2008_jun, DHI2008_jul, DHI2008_aug, DHI2008_sep, DHI2008_oct, DHI2008_nov, DHI2008_dec]);
	map.addLayers([DNI2008_jan, DNI2008_feb, DNI2008_mar, DNI2008_apr, DNI2008_may, DNI2008_jun, DNI2008_jul, DNI2008_aug, DNI2008_sep, DNI2008_oct, DNI2008_nov, DNI2008_dec]);
	map.addLayers([GHI2008_jan, GHI2008_feb, GHI2008_mar, GHI2008_apr, GHI2008_may, GHI2008_jun, GHI2008_jul, GHI2008_aug, GHI2008_sep, GHI2008_oct, GHI2008_nov, GHI2008_dec]);
	
	map.addLayers([DNI2009_jan, DNI2009_feb, DNI2009_mar, DNI2009_apr, DNI2009_may, DNI2009_jun, DNI2009_jul, DNI2009_aug, DNI2009_sep, DNI2009_oct, DNI2009_nov, DNI2009_dec]);
	map.addLayers([DHI2009_jan, DHI2009_feb, DHI2009_mar, DHI2009_apr, DHI2009_may, DHI2009_jun, DHI2009_jul, DHI2009_aug, DHI2009_sep, DHI2009_oct, DHI2009_nov, DHI2009_dec]);
	map.addLayers([GHI2009_jan, GHI2009_feb, GHI2009_mar, GHI2009_apr, GHI2009_may, GHI2009_jun, GHI2009_jul, GHI2009_aug, GHI2009_sep, GHI2009_oct, GHI2009_nov, GHI2009_dec]);

	map.addLayers([DNI2010_jan, DNI2010_feb, DNI2010_mar, DNI2010_apr, DNI2010_may, DNI2010_jun, DNI2010_jul, DNI2010_aug, DNI2010_sep, DNI2010_oct, DNI2010_nov, DNI2010_dec]);
	map.addLayers([DHI2010_jan, DHI2010_feb, DHI2010_mar, DHI2010_apr, DHI2010_may, DHI2010_jun, DHI2010_jul, DHI2010_aug, DHI2010_sep, DHI2010_oct, DHI2010_nov, DHI2010_dec]);
	map.addLayers([GHI2010_jan, GHI2010_feb, GHI2010_mar, GHI2010_apr, GHI2010_may, GHI2010_jun, GHI2010_jul, GHI2010_aug, GHI2010_sep, GHI2010_oct, GHI2010_nov, GHI2010_dec]);
	
	map.addLayers([DNI2011_jan, DNI2011_feb, DNI2011_mar, DNI2011_apr, DNI2011_may, DNI2011_jun, DNI2011_jul, DNI2011_aug, DNI2011_sep, DNI2011_oct, DNI2011_nov, DNI2011_dec]);
	map.addLayers([DHI2011_jan, DHI2011_feb, DHI2011_mar, DHI2011_apr, DHI2011_may, DHI2011_jun, DHI2011_jul, DHI2011_aug, DHI2011_sep, DHI2011_oct, DHI2011_nov, DHI2011_dec]);
	map.addLayers([GHI2011_jan, GHI2011_feb, GHI2011_mar, GHI2011_apr, GHI2011_may, GHI2011_jun, GHI2011_jul, GHI2011_aug, GHI2011_sep, GHI2011_oct, GHI2011_nov, GHI2011_dec]);

	map.addLayers([DNI2012_jan, DNI2012_feb, DNI2012_mar, DNI2012_apr, DNI2012_may, DNI2012_jun, DNI2012_jul, DNI2012_aug, DNI2012_sep, DNI2012_oct, DNI2012_nov, DNI2012_dec]);
	map.addLayers([DHI2012_jan, DHI2012_feb, DHI2012_mar, DHI2012_apr, DHI2012_may, DHI2012_jun, DHI2012_jul, DHI2012_aug, DHI2012_sep, DHI2012_oct, DHI2012_nov, DHI2012_dec]);
	map.addLayers([GHI2012_jan, GHI2012_feb, GHI2012_mar, GHI2012_apr, GHI2012_may, GHI2012_jun, GHI2012_jul, GHI2012_aug, GHI2012_sep, GHI2012_oct, GHI2012_nov, GHI2012_dec]);
	
	map.addLayers([GHI2006_yearly, DNI2006_yearly, DHI2006_yearly, GHI2008_yearly, DNI2008_yearly, DHI2008_yearly, GHI2009_yearly, DNI2009_yearly, DHI2009_yearly, GHI2010_yearly, DNI2010_yearly, DHI2010_yearly, GHI2011_yearly, DNI2011_yearly, DHI2011_yearly, GHI2012_yearly, DNI2012_yearly, DHI2012_yearly]);
	
	/*----------------------------------------------------------*/
	
	var GHItext = "Global Horizontal Irradiation (GHI)";
	var DHItext = "Diffuse Horizontal Irradiation (DHI)";
	var DNItext = "Direct Normal Irradiation (DNI)";
	
	// create our own layer node UI class, using the RadioButtonMixin
    var LayerNodeUI = Ext.extend(
        GeoExt.tree.LayerNodeUI, new GeoExt.tree.RadioButtonMixin()
    );

    maps_by_year = {
    		text: "Years", leaf: false,
    		children: [{
    			text: "2012", leaf: false,
    			children: [{
    				text: "Months", leaf: false,
		    		children: [{
		    		     text: "Dec", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Nov", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Oct", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Sep", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Aug", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Jul", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Jun", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "May", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Apr", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Mar", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Feb", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Jan", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 }]
    				},{
    				text: "Heights", leaf: false,
		    		children: [{
		    		     text: "120m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "100m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "80m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "50m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "10m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 }]
    				}]
		    	},{
    			text: "2011", leaf: false,
    			children: [{
    				text: "Months", leaf: false,
		    		children: [{
		    		     text: "Dec", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Nov", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Oct", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Sep", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Aug", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Jul", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Jun", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "May", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Apr", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Mar", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Feb", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Jan", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 }]
    				},{
    				text: "Heights", leaf: false,
		    		children: [{
		    		     text: "120m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "100m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "80m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "50m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "10m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 }]
    				}]
		    	},{
    			text: "2010", leaf: false,
    			children: [{
    				text: "Months", leaf: false,
		    		children: [{
		    		     text: "Dec", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Nov", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Oct", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Sep", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Aug", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Jul", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Jun", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "May", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Apr", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Mar", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Feb", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Jan", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 }]
    				},{
    				text: "Heights", leaf: false,
		    		children: [{
		    		     text: "120m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "100m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "80m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "50m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "10m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 }]
    				}]
		    	},{
    			text: "2009", leaf: false,
    			children: [{
    				text: "Months", leaf: false,
		    		children: [{
		    		     text: "Dec", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Nov", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Oct", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Sep", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Aug", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Jul", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Jun", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "May", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Apr", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Mar", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Feb", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Jan", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 }]
    				},{
    				text: "Heights", leaf: false,
		    		children: [{
		    		     text: "120m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "100m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "80m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "50m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "10m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 }]
    				}]
		    	},{
    			text: "2008", leaf: false,
    			children: [{
    				text: "Months", leaf: false,
		    		children: [{
		    		     text: "Dec", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Nov", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Oct", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Sep", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Aug", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Jul", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Jun", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "May", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Apr", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Mar", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Feb", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Jan", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 }]
    				},{
    				text: "Heights", leaf: false,
		    		children: [{
		    		     text: "120m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "100m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "80m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "50m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "10m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 }]
    				}]
		    	},{
    			text: "2007", leaf: false,
    			children: [{
    				text: "Months", leaf: false,
		    		children: [{
		    		     text: "Dec", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Nov", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Oct", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Sep", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Aug", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Jul", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Jun", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "May", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Apr", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Mar", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Feb", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Jan", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 }]
    				},{
    				text: "Heights", leaf: false,
		    		children: [{
		    		     text: "120m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "100m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "80m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "50m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "10m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 }]
    				}]
		    	},{
    			text: "2006", leaf: false,
    			children: [{
    				text: "Months", leaf: false,
		    		children: [{
		    		     text: "Dec", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Nov", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Oct", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Sep", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Aug", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Jul", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Jun", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "May", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Apr", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Mar", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Feb", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Jan", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 }]
    				},{
    				text: "Heights", leaf: false,
		    		children: [{
		    		     text: "120m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "100m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "80m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "50m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "10m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 }]
    				}]
		    	},{
    			text: "2005", leaf: false,
    			children: [{
    				text: "Months", leaf: false,
		    		children: [{
		    		     text: "Dec", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Nov", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Oct", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Sep", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Aug", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Jul", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Jun", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "May", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Apr", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Mar", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Feb", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Jan", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 }]
    				},{
    				text: "Heights", leaf: false,
		    		children: [{
		    		     text: "120m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "100m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "80m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "50m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "10m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 }]
    				}]
		    	},{
    			text: "2004", leaf: false,
    			children: [{
    				text: "Months", leaf: false,
		    		children: [{
		    		     text: "Dec", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Nov", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Oct", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Sep", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Aug", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Jul", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Jun", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "May", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Apr", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Mar", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Feb", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Jan", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 }]
    				},{
    				text: "Heights", leaf: false,
		    		children: [{
		    		     text: "120m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "100m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "80m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "50m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "10m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 }]
    				}]
		    	},{
    			text: "2003", leaf: false,
    			children: [{
    				text: "Months", leaf: false,
		    		children: [{
		    		     text: "Dec", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Nov", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Oct", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Sep", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Aug", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Jul", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Jun", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "May", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Apr", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Mar", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Feb", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Jan", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 }]
    				},{
    				text: "Heights", leaf: false,
		    		children: [{
		    		     text: "120m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "100m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "80m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "50m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "10m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 }]
    				}]
		    	}]
    	}
    
    maps_by_month = {
    		text: "Months", leaf: false,
    		children: [{
    			text: "Dec", leaf: false,
    			children: [{
    				text: "Years", leaf: false,
		    		children: [{
		    		     text: "2012", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2011", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2010", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2009", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2008", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2007", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2006", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2005", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2004", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2003", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 }]
    				},{
    				text: "Heights", leaf: false,
		    		children: [{
		    		     text: "120m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "100m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "80m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "50m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "10m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 }]
    				}]
	    	},{
    			text: "Nov", leaf: false,
    			children: [{
    				text: "Years", leaf: false,
		    		children: [{
		    		     text: "2012", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2011", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2010", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2009", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2008", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2007", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2006", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2005", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2004", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2003", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 }]
    				},{
    				text: "Heights", leaf: false,
		    		children: [{
		    		     text: "120m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "100m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "80m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "50m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "10m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 }]
    				}]
	    	},{
    			text: "Oct", leaf: false,
    			children: [{
    				text: "Years", leaf: false,
		    		children: [{
		    		     text: "2012", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2011", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2010", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2009", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2008", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2007", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2006", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2005", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2004", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2003", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 }]
    				},{
    				text: "Heights", leaf: false,
		    		children: [{
		    		     text: "120m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "100m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "80m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "50m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "10m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 }]
    				}]
	    	},{
    			text: "Sep", leaf: false,
    			children: [{
    				text: "Years", leaf: false,
		    		children: [{
		    		     text: "2012", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2011", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2010", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2009", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2008", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2007", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2006", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2005", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2004", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2003", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 }]
    				},{
    				text: "Heights", leaf: false,
		    		children: [{
		    		     text: "120m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "100m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "80m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "50m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "10m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 }]
    				}]
	    	},{
    			text: "Aug", leaf: false,
    			children: [{
    				text: "Years", leaf: false,
		    		children: [{
		    		     text: "2012", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2011", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2010", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2009", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2008", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2007", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2006", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2005", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2004", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2003", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 }]
    				},{
    				text: "Heights", leaf: false,
		    		children: [{
		    		     text: "120m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "100m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "80m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "50m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "10m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 }]
    				}]
	    	},{
    			text: "Jul", leaf: false,
    			children: [{
    				text: "Years", leaf: false,
		    		children: [{
		    		     text: "2012", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2011", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2010", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2009", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2008", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2007", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2006", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2005", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2004", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2003", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 }]
    				},{
    				text: "Heights", leaf: false,
		    		children: [{
		    		     text: "120m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "100m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "80m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "50m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "10m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 }]
    				}]
	    	},{
    			text: "Jun", leaf: false,
    			children: [{
    				text: "Years", leaf: false,
		    		children: [{
		    		     text: "2012", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2011", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2010", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2009", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2008", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2007", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2006", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2005", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2004", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2003", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 }]
    				},{
    				text: "Heights", leaf: false,
		    		children: [{
		    		     text: "120m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "100m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "80m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "50m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "10m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 }]
    				}]
	    	},{
    			text: "May", leaf: false,
    			children: [{
    				text: "Years", leaf: false,
		    		children: [{
		    		     text: "2012", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2011", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2010", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2009", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2008", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2007", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2006", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2005", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2004", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2003", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 }]
    				},{
    				text: "Heights", leaf: false,
		    		children: [{
		    		     text: "120m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "100m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "80m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "50m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "10m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 }]
    				}]
	    	},{
    			text: "Apr", leaf: false,
    			children: [{
    				text: "Years", leaf: false,
		    		children: [{
		    		     text: "2012", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2011", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2010", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2009", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2008", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2007", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2006", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2005", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2004", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2003", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 }]
    				},{
    				text: "Heights", leaf: false,
		    		children: [{
		    		     text: "120m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "100m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "80m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "50m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "10m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 }]
    				}]
	    	},{
    			text: "Mar", leaf: false,
    			children: [{
    				text: "Years", leaf: false,
		    		children: [{
		    		     text: "2012", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2011", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2010", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2009", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2008", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2007", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2006", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2005", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2004", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2003", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 }]
    				},{
    				text: "Heights", leaf: false,
		    		children: [{
		    		     text: "120m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "100m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "80m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "50m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "10m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 }]
    				}]
	    	},{
    			text: "Feb", leaf: false,
    			children: [{
    				text: "Years", leaf: false,
		    		children: [{
		    		     text: "2012", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2011", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2010", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2009", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2008", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2007", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2006", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2005", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2004", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2003", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 }]
    				},{
    				text: "Heights", leaf: false,
		    		children: [{
		    		     text: "120m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "100m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "80m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "50m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "10m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 }]
    				}]
	    	},{
    			text: "Jan", leaf: false,
    			children: [{
    				text: "Years", leaf: false,
		    		children: [{
		    		     text: "2012", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2011", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2010", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2009", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2008", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2007", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2006", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2005", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2004", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2003", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 }]
    				},{
    				text: "Heights", leaf: false,
		    		children: [{
		    		     text: "120m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "100m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "80m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "50m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "10m", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 }]
    				}]
	    	}]
	    }
    
    maps_by_height = {
        	text: "Heights", leaf: false,
        	children: [{
    			text: "120m", leaf: false,
	 		   	children: [{
    				text: "Years", leaf: false,
		    		children: [{
		    		     text: "2012", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2011", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2010", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2009", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2008", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2007", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2006", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2005", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2004", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2003", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 }]
    				},{
    				text: "Months", leaf: false,
		    		children: [{
		    		     text: "Dec", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Nov", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Oct", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Sep", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Aug", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Jul", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Jun", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "May", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Apr", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Mar", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Feb", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Jan", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 }]
    				}]
         	},{
         		text: "100m", leaf: false,
	 			children: [{
    				text: "Years", leaf: false,
		    		children: [{
		    		     text: "2012", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2011", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2010", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2009", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2008", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2007", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2006", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2005", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2004", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2003", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 }]
    				},{
    				text: "Months", leaf: false,
		    		children: [{
		    		     text: "Dec", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Nov", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Oct", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Sep", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Aug", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Jul", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Jun", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "May", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Apr", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Mar", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Feb", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Jan", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 }]
    				}]
         	},{
         		text: "80m", leaf: false,
     			children: [{
    				text: "Years", leaf: false,
		    		children: [{
		    		     text: "2012", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2011", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2010", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2009", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2008", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2007", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2006", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2005", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2004", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "2003", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 }]
    				},{
    				text: "Months", leaf: false,
		    		children: [{
		    		     text: "Dec", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Nov", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Oct", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Sep", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Aug", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Jul", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Jun", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "May", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Apr", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Mar", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Feb", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 },{
		    		     text: "Jan", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
    					 }]
    				}]
         	},{
         		text: "50m", leaf: false,
 			    children: [{
	   				text: "Years", leaf: false,
		    		children: [{
		    		     text: "2012", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
						 },{
		    		     text: "2011", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
						 },{
		    		     text: "2010", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
						 },{
		    		     text: "2009", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
						 },{
		    		     text: "2008", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
						 },{
		    		     text: "2007", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
						 },{
		    		     text: "2006", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
						 },{
		    		     text: "2005", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
						 },{
		    		     text: "2004", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
						 },{
		    		     text: "2003", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
						 }]
					},{
					text: "Months", leaf: false,
		    		children: [{
		    		     text: "Dec", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
						 },{
		    		     text: "Nov", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
						 },{
		    		     text: "Oct", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
						 },{
		    		     text: "Sep", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
						 },{
		    		     text: "Aug", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
						 },{
		    		     text: "Jul", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
						 },{
		    		     text: "Jun", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
						 },{
		    		     text: "May", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
						 },{
		    		     text: "Apr", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
						 },{
		    		     text: "Mar", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
						 },{
		    		     text: "Feb", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
						 },{
		    		     text: "Jan", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
						 }]
					}]
         	},{
         		text: "10m", leaf: false,
 			    children: [{
	   				text: "Years", leaf: false,
		    		children: [{
		    		     text: "2012", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
						 },{
		    		     text: "2011", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
						 },{
		    		     text: "2010", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
						 },{
		    		     text: "2009", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
						 },{
		    		     text: "2008", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
						 },{
		    		     text: "2007", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
						 },{
		    		     text: "2006", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
						 },{
		    		     text: "2005", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
						 },{
		    		     text: "2004", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
						 },{
		    		     text: "2003", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
						 }]
					},{
					text: "Months", leaf: false,
		    		children: [{
		    		     text: "Dec", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
						 },{
		    		     text: "Nov", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
						 },{
		    		     text: "Oct", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
						 },{
		    		     text: "Sep", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
						 },{
		    		     text: "Aug", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
						 },{
		    		     text: "Jul", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
						 },{
		    		     text: "Jun", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
						 },{
		    		     text: "May", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
						 },{
		    		     text: "Apr", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
						 },{
		    		     text: "Mar", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
						 },{
		    		     text: "Feb", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
						 },{
		    		     text: "Jan", leaf: false, checked: false,
		    		     children: [{nodeType: "gx_layer", icon: "images/layerIcon.png", text: DHItext, layer: DHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: DNItext, layer: DNI2012_yearly, radioGroup: "my", uiProvider: "use_radio"},
		    			            {nodeType: "gx_layer", icon: "images/layerIcon.png", text: GHItext, layer: GHI2012_yearly, radioGroup: "my", uiProvider: "use_radio"}]
						 }]
					}]
         	}]
    		
        	}
    
	var treeConfig = ([{
        nodeType: "gx_baselayercontainer"
	}, 	maps_by_year, 
		maps_by_month,
		maps_by_height]);
//    }]);

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
    
    var open_legend = new Ext.Button({
        text: 'Legend',
        icon: "images/legend.png",
    	tooltip: "Show the legend of the active layer",
        handler: function(record){
//        	console.log(record.get("layer").name.indexOf(activeLayer) !== -1),
//        	if (legend)
//        		legend.hide();
//        	legendStyle(activeLayer);
        	if (activeLayerNode) {
        	legend = new Ext.Window({
    	    	title: "Layer legend",
    	    	aligned: top,
    	    	autoWidth: true,
    	    	autoHeight: true,
    	    	x: 350,
    	    	y: 150,
    	    	items: [new GeoExt.LegendPanel({
//    	            layers: mapPanel.layers,
//    	          	title: 'Legend',
    	    		dynamic: false,
            		filter: function(record) {
            			SelectedLayer = record.get("layer").name.indexOf(activeLayerNode) !== -1;
            			return SelectedLayer;
            		},
            		defaults: {
    	          		legendTitle: "<bold>"+activeLayerNode+"</bold><bold><p>kWh/m<sup>2</sup></p></bold>",
    					style: 'padding:5px',
    					baseParams: {
							FORMAT: 'image/png8',
							LEGEND_OPTIONS: 'forceLabels:on'
							}
    					}
    			})
    			]
    	}),
        	legend.show();
        } else alert("You should activate the layer you want to see the legend using the radio buttons in the tree layers (left panel)");
        	}
    });
    
	var left_toolbar = new Ext.Toolbar([open_legend]);
	
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