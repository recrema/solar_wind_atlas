/**
 * The GeoExt.panel.Map used in the application.  Useful to define map options
 * and stuff.
 * @extends GeoExt.panel.Map
 */
Ext.define('AM.view.Map', {
    extend: 'GeoExt.panel.Map',
    alias : 'widget.mappanel',
	border: true,
    requires: [
        'Ext.window.MessageBox',
        'GeoExt.Action',
        'AM.view.help.Action'
    ],

    initComponent: function(config) {

    		var mapView = this,
            tbarItems = [],
            ctrl;

    	var map = new OpenLayers.Map('map', {
    	    projection : 'EPSG:3857',
    	    layers: [

    	     	    new OpenLayers.Layer.Google(
    				        "Google Streets",
    				        {numZoomLevels: 20}
    					),
    				new OpenLayers.Layer.Google(
    				        "Google Hybrid",
    				        {type: google.maps.MapTypeId.HYBRID, numZoomLevels: 20}
    				    ),
    				new OpenLayers.Layer.Google(
    				        "Google Satellite",
    				        {type: google.maps.MapTypeId.SATELLITE, numZoomLevels: 22}
    				    ),
    				new OpenLayers.Layer.Google(
    				        "Google Physical",
    				        {type: google.maps.MapTypeId.TERRAIN}
    				    ),
    				new OpenLayers.Layer.OSM(
    	                 "Open Street Map"
    	             ),
    	            new OpenLayers.Layer.Vector("imgLayer", {
    	        	    attribution: "<img src='resources/images/windspeed_legend.png' style=' padding-right: 10px;'/>" //  ajustar a imagem em funcao do ecra!
    	        	}),      
    	             
                 ],
    	    displayProjection : 'EPSG:4326',
    	    center: new OpenLayers.LonLat(54.5, 24.5).transform('EPSG:4326', 'EPSG:3857'),
    	    zoom: 7
    	});

    	map.events.register("updatesize", map, function() { 
        	var controlMouse = map.getControlsBy("CLASS_NAME", "OpenLayers.Control.MousePosition")[0];
        	map.removeControl(controlMouse);
        	var size=map.getSize();
        	var mapwidth=size.w;
        	var mapheight=size.h;
            map.addControl(
                    new OpenLayers.Control.MousePosition({
                        prefix: '<div style=\"color: grey; font-size: 12px;padding-left: 40%; width:'+mapwidth+'px;\">wgs84 coordinates: ',
                        suffix: '</div>',
                        separator: ' | ',
                        numDigits: 3,
                        emptyString: '<div style=\"color: grey; font-size: 12px;padding-left: 40%; width:'+mapwidth+'px;\">Mouse is not over map.</div>'
                    })
                );
        });
	
        tbarItems.push("->");

        tbarItems.push(Ext.create('Ext.button.Button', {
            toggleGroup: "info",
            itemId:'viewwindinfo',
            enableToggle: true,
        	cls:'wind_info',
        	pressedCls: 'wind_info_pressed',
            group: "info",
            tooltip: "Data statistics, analysis and report",
            disabled: false,
            toggleHandler: function(button, state) {
            	if (state) {
            		mapView.fireEvent('initCheckLogin');
            		mapView.fireEvent('onClickActive');
            		
            	}
            	else {
            		mapView.fireEvent('onClickDeactivate');
            	}
            }
            }
        ));
        tbarItems.push(
                Ext.create('Ext.button.Button', {
                	cls:'toolbox_button',
                    id:"toolboxMenu",
                    menu:{  xtype: 'menu',
                        plain: true,
                        border: false,
                        items: [
                                 {
                                	xtype:'button',
                                    text: "Measure",
                                    id: 'drawButton',

                                    cls:'measure_button',
                                    handler: function(state) {
                                    	mapView.fireEvent('onClickDraw');
                                    },
                                    disabled: false,
                                    tooltip: "Click to measure"
                                }
                                ]
                    	}
                	}));
        tbarItems.push(Ext.create('Ext.button.Button', {
            cls:'context_maps',
            toggleGroup: "layers",
            enableToggle: false,
            group: "layers",
            menu:{
                xtype: 'menu',
                plain: true,
                border: false,
                items: [
                        {
                            text: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Layer Maps',
                            menu: {        // <-- submenu by nested config object
                                items: [
                                    {
                                        text: 'UAE Border',
                                        checked: false,
                                        cls: 'layermenu_tool',
                                        checkHandler: function (checked) {

                                        	if (checked.checked){
                                            	var layer=map.getLayersByName('United Arab Emirates Border')[0];
                                            	layer.setVisibility(true);
                                        	}
                                        	else{
                                            	var layer=map.getLayersByName('United Arab Emirates Border')[0];
                                            	layer.setVisibility(false);
                                        	}

                                           }
                                    }, {
                                        text: 'UAE Main Roads',
                                        checked: false,
                                        checkHandler: function (checked) {
                                        	if (checked.checked){
                                            	var layer=map.getLayersByName('UAE main roads')[0];
                                            	layer.setVisibility(true);
                                        	}
                                        	else{
                                            	var layer=map.getLayersByName('UAE main roads')[0];
                                            	layer.setVisibility(false);
                                        	}
                                           }
                                    }, {
                                        text: 'UAE Transmission Network',
                                        checked: false,
                                        checkHandler: function (checked) {
                                        	if (checked.checked){
                                            	var layer=map.getLayersByName('UAE transmission network')[0];
                                            	layer.setVisibility(true);
                                        	}
                                        	else{
                                            	var layer=map.getLayersByName('UAE transmission network')[0];
                                            	layer.setVisibility(false);
                                        	}
                                           }
                                    }, {
                                        text: 'UAE Power Plants',
                                        checked: false,
                                        checkHandler: function (checked) {
                                        	if (checked.checked){
                                            	var layer=map.getLayersByName('UAE power plants')[0];
                                            	layer.setVisibility(true);
                                        	}
                                        	else{
                                            	var layer=map.getLayersByName('UAE power plants')[0];
                                            	layer.setVisibility(false);
                                        	}
                                           }
                                    }, {
                                        text: 'UAE OSM Transmission Network',
                                        checked: false,
                                        checkHandler: function (checked) {
                                        	if (checked.checked){
                                            	var layer=map.getLayersByName('UAE OSM transmission network')[0];
                                            	layer.setVisibility(true);
                                        	}
                                        	else{
                                            	var layer=map.getLayersByName('UAE OSM transmission network')[0];
                                            	layer.setVisibility(false);
                                        	}
                                           }
                                    }
                                ]
                            }
                       },
                       '<b class="menu-title">&nbsp;&nbsp;&nbsp;&nbsp;-----------------------</b>',
                       {
                           text: 'Google Street',
                           checked: true,
                           group: 'baselayer',
                           checkHandler: function (checked) {
                           	map.setBaseLayer(map.getLayersByName('Google Streets')[0]);
                           }
                       },
                      {
                           text: 'Google Hybrid',
                           checked: false,
                           group: 'baselayer',
                           checkHandler: function (checked) {
                           	map.setBaseLayer(map.getLayersByName('Google Hybrid')[0]);
                           }
                       }, {
                           text: 'Google Satellite',
                           checked: false,
                           group: 'baselayer',
                           checkHandler: function (checked) {
                           	map.setBaseLayer(map.getLayersByName('Google Satellite')[0]);
                           }
                       }, {
                           text: 'Google Physical',
                           checked: false,
                           group: 'baselayer',
                           checkHandler: function (checked) {
                           	map.setBaseLayer(map.getLayersByName('Google Physical')[0]);
                           }
                       }, {
                           text: 'Open Street Map',
                           checked: false,
                           group: 'baselayer',
                           checkHandler: function (checked) {
                           	map.setBaseLayer(map.getLayersByName('Open Street Map')[0]);
                           }
                       }
                        ]
            },
            disabled: false,
            tooltip: "Click to add/remove context layers"
        }));
        
     // Help action
        var helpAction=Ext.create('Ext.button.Button', Ext.create('AM.view.help.Action', {
            id: "helpButton",
            cls:'help_button',
            windowContentEl: "help"
        }));
        var feedbackAction=Ext.create('Ext.button.Button', Ext.create('AM.view.feedback.Action', {
            id: "feedbackButton",
            cls:'feedback_button'
        }));
        tbarItems.push(
                Ext.create('Ext.button.Button', {
                    id:"helpMenu",
                    cls:'help_menu',
                    toggleGroup: "layers",
                    enableToggle: false,
                    group: "layers",
                    menu:{  xtype: 'menu',
                        plain: true,
                        border: false,
                        items: [
                                helpAction,
                                feedbackAction
                                ]
                    	}
                	}));

        tbarItems.push("->");
        tbarItems.push(Ext.create('Ext.button.Button', {
            cls:'login_button',
            id: 'loginButton',
            itemId:'loginButton',
            handler: function(state) {
            	mapView.fireEvent('launchLogin');
            },
            disabled: false,
            tooltip: "Click to login"
        }));
        
        /**
         * Adding all the wind layers to the map
         */
        
        var geoserverUrl="http://atlas.masdar.ac.ae:8080/geoserver/wind/wms";
        var format = 'image/png';
    	var heights = ["10", "50", "80", "100", "120"];
    	var month_numbers = ["01", "02" , "03" , "04" , "05" , "06" , "07" , "08" , "09" , "10" , "11" , "12"];
    	var year_start = 2003, year_end = 2012;
    	var layer_prefix = "uaewindmap_moswindspeed_";//to use in the WMS request due to the layer name in the geoserver
    	var layer_text_prefix = "Wind Speed";
    	var workspace = "wind";
    	var temp = {};
    	var layers_configurations = {buffer: 0, displayOutsideMaxExtent: true, ratio: 1, opacity: 1, visibility: false};
        

    	
        function get_month_name(month){
    		var month_names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    		return month_names[parseInt(month)-1];
    	};

    	//routine to create month and year maps' variables, add them to the temp array along with the respective WMS requests
    	for (var i=0; i<heights.length; i++){
    		for (var year = year_start; year <= year_end; year++){
    			var layer_title = layer_text_prefix + " " + year + " at " + heights[i] + " m" ;
    			var layer_name = layer_prefix + heights[i] + 'm_' + year;
    			layers_configurations.servername=workspace + ":" +layer_name;
    			temp[layer_name] = new OpenLayers.Layer.WMS(layer_title, geoserverUrl, {Layers: workspace + ":" + layer_name, format: format, tiled: true, transparent: true, tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom}, layers_configurations);
    			map.addLayers([temp[layer_name]]);
    			for (var ii=0; ii<month_numbers.length; ii++){
    				var month_name = get_month_name(month_numbers[ii]);
    				layer_title = layer_text_prefix + " " + month_name + " " + year + " at " + heights[i] + "m" ;
    				layer_name = layer_prefix + heights[i] + 'm_' + year + month_numbers[ii];
    				layers_configurations.servername=workspace + ":" +layer_name;
    				temp[layer_name] = new OpenLayers.Layer.WMS(layer_title, geoserverUrl, {Layers: workspace + ":" + layer_name, format: format, tiled: true, transparent: true, tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom}, layers_configurations);
    				map.addLayers([temp[layer_name]]);
    			};
    		};
    	};
    	
//    	routine to create overall maps' variables, add them to the temp array along with the respective WMS requests
    	for (var i=0; i<heights.length; i++) {
    		layer_title = layer_text_prefix + " at " + heights[i] + "m Annual" ;
    		layer_name = layer_prefix + heights[i] + 'm_' + "Annual";
    		layers_configurations.servername=workspace + ":" +layer_name;
    		temp[layer_name] = new OpenLayers.Layer.WMS(layer_title, geoserverUrl, {Layers: workspace + ":" + layer_name, format: format, tiled: true, transparent: true, tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom}, layers_configurations);
    		map.addLayers([temp[layer_name]]);
    		for (var ii=0; ii<month_numbers.length; ii++) {
    			month_name = get_month_name(month_numbers[ii]);

    			layer_title = layer_text_prefix + " at " + heights[i] + "m " + month_name ;
    			layer_name = layer_prefix + heights[i] + 'm_' + month_numbers[ii];
    			layers_configurations.servername=workspace + ":" +layer_name;
    			temp[layer_name] = new OpenLayers.Layer.WMS(layer_title, geoserverUrl, {Layers: workspace + ":" + layer_name, format: format, tiled: true, transparent: true, tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom}, layers_configurations);
    			map.addLayers([temp[layer_name]]);
    		};
    	};
    	

    	//Add the  Context layers
    	layers_configurations.auxMaps=true;
    	var uae_emirates = new OpenLayers.Layer.WMS("United Arab Emirates Border", geoserverUrl, {Layers: "wind:uae_borders_changed",transparent: true, format: format}, layers_configurations);
    	var uae_main_roads_from_osm = new OpenLayers.Layer.WMS("UAE main roads", geoserverUrl, {Layers: "wind:uae_main_roads_from_osm", format: format, transparent: true}, layers_configurations);
    	var uae_main_transmission_network = new OpenLayers.Layer.WMS("UAE transmission network", geoserverUrl, {Layers: "wind:uae_main_transmission_network", format: format, transparent: true}, layers_configurations);
    	var uae_power_plants = new OpenLayers.Layer.WMS("UAE power plants", geoserverUrl, {Layers: "wind:uae_power_plants", format: format, transparent: true}, layers_configurations);
    	var uae_osm_transmission_network = new OpenLayers.Layer.WMS("UAE OSM transmission network", geoserverUrl, {Layers: "uae_osm_power", format: format, transparent: true}, layers_configurations);
    	map.addLayers([uae_emirates,uae_main_roads_from_osm,uae_main_transmission_network,uae_power_plants,uae_osm_transmission_network]);
        
        Ext.apply(this, {
            map: map,
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                cls:'toolbar',
                itemId:'itemsToolbar',
                items: tbarItems,
                style: {
                    border: 0,
                    padding: 0
                }
            }]
        });
        a=this;
        mapView.fireEvent('initCheckLogin');
        this.callParent(arguments);
    }
});
