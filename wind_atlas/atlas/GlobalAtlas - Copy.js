/**
 * Copyright (c) 2008-2009 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license.
 * See http://svn.geoext.org/core/trunk/geoext/license.txt for the full text
 * of the license.
 */

var map, mapPanel, LayersToc, controls = [], info, pop;
//var items = [];

var pureCoverage = true;
// pink tile avoidance
OpenLayers.IMAGE_RELOAD_ATTEMPTS = 5;
// make OL compute scale according to WMS spec
OpenLayers.DOTS_PER_INCH = 25.4 / 0.28;

Ext.onReady(function() {
	
	format = 'image/png';
//	if(pureCoverage) {
//        document.getElementById('filterType').disabled = true;
//        document.getElementById('filter').disabled = true;
//        document.getElementById('antialiasSelector').disabled = true;
//        document.getElementById('updateFilterButton').disabled = true;
//        document.getElementById('resetFilterButton').disabled = true;
//        document.getElementById('jpeg').selected = true;
//        format = "image/jpeg";
//    }
	
    var extent = new OpenLayers.Bounds(52, 22, 57, 27);
    
	var bounds = new OpenLayers.Bounds(
                    47.99170000000001, 22.010400000000004,
                    61.98130000000002, 28.000200000000007
	);
	options = {
//			controls: [],
			projection: new OpenLayers.Projection("EPSG:900913"),
			displayProjection: new OpenLayers.Projection('EPSG:4326'),
			units: 'degrees',
			numZoomLevels: 18,
			maxResolution: 156543.0339,
			maxExtent: bounds
	};

	extent.transform(
			new OpenLayers.Projection("EPSG:4326"), options.projection
	);
    
	map = new OpenLayers.Map(options); 
    
	map.addControl(new OpenLayers.Control.MousePosition());
	
	map.events.register("mousemove", map, function(e) { 
        var position = this.events.getMousePosition(e);
        OpenLayers.Util.getElement("coords").innerHTML = position;
    });
	
	var worldview = new GeoExt.Action({
	    text: "World view",
//	    icon: 'images/toolbar/home.gif',
	    control: new OpenLayers.Control.ZoomToMaxExtent(),
	    map: map
	});	
	
	// Navigation history - two "button" controls
    ctrl = new OpenLayers.Control.NavigationHistory();
    map.addControl(ctrl);
	
	var previous = new GeoExt.Action({
        text: "previous",
        control: ctrl.previous,
        disabled: true,
        tooltip: "previous in history"
    });

    var next = new GeoExt.Action({
        text: "next",
        control: ctrl.next,
        disabled: true,
        tooltip: "next in history"
    });
	
	var toolbar = new Ext.Toolbar([worldview, previous, next]);
	
	var mapPanel = new GeoExt.MapPanel({
    	region: "center",
        id: "mappanel",
        title: "Map",
        xtype: "gx_mappanel",
        map: map,
        extent: extent,
        split: true,
        layers: LayersToc,
        controls: controls,
        tbar: toolbar,
		// items: [{
			// xtype: "gx_opacityslider",
			// layer: test,
			// vertical: true,
			// height: 120,
			// x: 10,
			// y: 10,
			// plugins: new GeoExt.LayerOpacitySliderTip({template: '<div>Opacity: {opacity}%</div>'})
		// }]
    });
	
	/* --------------------------------------------------------------------------------
	*  Add Layers to the map
	*  -------------------------------------------------------------------------------- */
		
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
    
    map.addLayers([hybrid, physical, streets, satellite]);

    
	// setup tiled layer
    var DHI2008 = new OpenLayers.Layer.WMS(
		"2008_DHI_yearly", "http://localhost:8080/geoserver/masdar/wms",
		{
			Layers: "masdar:2008_dhi_yearly",
			STYLES: '',
			format: format,
			tiled: true,
			transparent: true,
			tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		},
		{
			buffer: 0,
			displayOutsideMaxExtent: true,
			ratio: 1,
			opacity: 1,
		} 
	);
    
    var DNI2008 = new OpenLayers.Layer.WMS(
    		"2008_DNI_yearly", "http://localhost:8080/geoserver/masdar/wms",
    		{
    			Layers: "masdar:2008_dni_yearly",
    			STYLES: '',
    			format: format,
    			tiled: true,
    			transparent: true,
    			tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
    		},
    		{
    			buffer: 0,
    			displayOutsideMaxExtent: true,
    			ratio: 1,
    			opacity: 1,
    		} 
    	);
    
    var GHI2008 = new OpenLayers.Layer.WMS(
    		"2008_GHI_yearly", "http://localhost:8080/geoserver/masdar/wms",
    		{
    			Layers: "masdar:2008_ghi_yearly",
    			STYLES: '',
    			format: format,
    			tiled: true,
    			transparent: true,
    			tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
    		},
    		{
    			buffer: 0,
    			displayOutsideMaxExtent: true,
    			ratio: 1,
    			opacity: 1,
    		} 
    	);
	
	var DHI2009 = new OpenLayers.Layer.WMS("2009_DHI_yearly",
		    "http://localhost:8080/geoserver/masdar/wms", {
		        layers: "masdar:2009_dhi_yearly",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                isBaseLayer: false,
//                group: 'All Layers/2009',
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
            }
		);
	
	var DNI2009 = new OpenLayers.Layer.WMS("2009_DNI_yearly",
		    "http://localhost:8080/geoserver/masdar/wms", {
		        layers: "masdar:2009_dni_yearly",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                isBaseLayer: false,
//                group: 'All Layers/2009',
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
            }
		);
	
	var GHI2009 = new OpenLayers.Layer.WMS("2009_GHI_yearly",
		    "http://localhost:8080/geoserver/masdar/wms", {
		        layers: "masdar:2009_ghi_yearly",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                isBaseLayer: false,
//                group: 'All Layers/2009',
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
            }
		);
	
	var DHI2010 = new OpenLayers.Layer.WMS("2010_DHI_yearly",
		    "http://localhost:8080/geoserver/masdar/wms", {
		        layers: "masdar:2010_dhi_yearly",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
            }
		);
	
	var DNI2010 = new OpenLayers.Layer.WMS("2010_DNI_yearly",
		    "http://localhost:8080/geoserver/masdar/wms", {
		        layers: "masdar:2010_dni_yearly",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
            }
		);
	
	var GHI2010 = new OpenLayers.Layer.WMS("2010_GHI_yearly",
		    "http://localhost:8080/geoserver/masdar/wms", {
		        layers: "masdar:2010_ghi_yearly",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
            }
		);
	
	map.addLayers([GHI2008, DNI2008, DHI2008, GHI2009, DNI2009, DHI2009, GHI2010, DNI2010, DHI2010]);
		
	/*----------------------------------------------------------*/
    var layerRoot = new Ext.tree.TreeNode({
    	text: "All Layers",
    	expanded: true,
	});
	layerRoot.appendChild(new GeoExt.tree.BaseLayerContainer({
    	text: "Base Layers",
    	map: map,
    	expanded: false,
	}));
	
	layerRoot.appendChild(new GeoExt.tree.OverlayLayerContainer({
		text: "2010",
		layerStore: mapPanel.layers,
		expanded: true,
		enableDD: true,
		loader: {
			filter: function(record) {
            return record.get("layer").name.indexOf("2010") !== -1;
        }},
	}));
	
	layerRoot.appendChild(new GeoExt.tree.OverlayLayerContainer({
		text: "2009",
		layerStore: mapPanel.layers,
		expanded: true,
		enableDD: true,
		visibility: false,
		loader: {
			filter: function(record) {
            return record.get("layer").name.indexOf("2009") !== -1;
		},
        	baseAttrs: {
//            visibility: false,
        }},
	}));
	
	layerRoot.appendChild(new GeoExt.tree.OverlayLayerContainer({
		text: "2008",
		layerStore: mapPanel.layers,
		expanded: true,
		enableDD: true,
		visibility: false,
		loader: {
			filter: function(record) {
            return record.get("layer").name.indexOf("2008") !== -1;
            console.log(record);
        },
        	baseAttrs: {
//    		visibility: false,
        }},
	}));
		
	var LayerTree = new Ext.tree.TreePanel({
//		title: 'Map Layers',
		renderTo: 'layers',
		root: layerRoot,
	});
		
	/* -----------------------------------------------------------------------------------------------
	*  Collect pixel value after mouse click using GetFeatureInfo function and show the value e a popup
	*  ----------------------------------------------------------------------------------------------- */
	
    info = new OpenLayers.Control.WMSGetFeatureInfo({
        url: 'http://localhost:8080/geoserver/masdar/wms', 
//        title: 'Identify features by clicking',
        queryVisible: true,
        eventListeners: {
            getfeatureinfo: function(event) {
            	// Close popup if one is already opened
            	if (pop){
            		pop.hide();
            	}
            	//create popup to show pixel values
            	pop = new GeoExt.Popup({
                    title: "Pixel values",
                    width: 150,
                    autoScroll: true,
                    height: 200,
                    layout: "accordion",
                    map: map,
                    location: event.xy,
                    html: event.text,
                });
            	pop.show();
//            	console.log(event);
            },
        }
    });
    map.addControl(info);
    info.activate();
	
    
	/* ------------------------------------------------------------------------------
	*  Create the viewport (layout)
	*  ------------------------------------------------------------------------------ */
	
    new Ext.Viewport({
        layout: "border",
        items: [mapPanel, {
            region: "north",
            contentEl: "title",
//            height: 50
        }, {
        	region: "west",
        	title: "Layers",
        	contentEl: "layers",
        	width: 200,
            split: true,
        }, {
            region: "east",
            title: "Legends",
            xtype: 'tabpanel',
//            contentEl: "description",
            width: 200,
            collapsible: true,
            split: true,
            activeTab: 0,
            items: [{
            	title: "Monthly scales",
            	html:'<img src="monthly_scales.png" align="center" />',
//            	contentEl: "yealy_legends",
            },{
            	title: "Yearly scales",
            	html:'<img src="yearly_scales.png" />',
//            	contentEl: "monthly_legends",
            }]
        }, {
            region: "south",
            title: "Stakeholders",
            contentEl: "stakeholders",
//            height: 100,
            collapsible: true
        }, {
        }]
    });
    
});