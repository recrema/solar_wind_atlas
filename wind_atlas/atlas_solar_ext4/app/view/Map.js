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
    	    restrictedExtent: [5697167,2576730,6329311,3096318],
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
      	            new OpenLayers.Layer.WMS("Abu Dhabi SDI BasemapEnglish", 'http://geoportal.abudhabi.ae/arcgis/BaseMapEnglish/MapServer/WMSServer',
      	            		 {Layers: '9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,26,27,28,30,31,32,33,34,36,37,38,39,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,59,60,61,62,63,64,65,66,67,68,69,70,72,73,74,75,77,78,79,80,81,82,83,84', format: format, transparent: true}, 
      	            		 {isBaseLayer:true,visibility: false}
      	             	),
      	            new OpenLayers.Layer.WMS("Abu Dhabi SDI Satellite50m", 'http://geoportal.abudhabi.ae/arcgis/BaseMapSatellite50cm/MapServer/WMSServer',
         	            		 {Layers: '0,1,2,3', format: format, transparent: true}, 
         	            		 {isBaseLayer:true,visibility: false}
         	            )
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
            id:'viewwindinfo',
            enableToggle: true,
        	cls:'wind_info',
        	pressedCls: 'wind_info_pressed',
            group: "info",
            toggleHandler: function(button, state) {
            	if (state) {
            		mapView.fireEvent('initCheckLogin');
            		mapView.fireEvent('onClickActive');
            	}
            	else {
            		mapView.fireEvent('onClickDeactivate');
            	}
            },
            disabled: false,
            tooltip: "Click to get statistics chart"
        }));
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
                                    }, {
                                        text: 'Qatar Border',
                                        checked: false,
                                        cls: 'layermenu_tool',
                                        checkHandler: function (checked) {

                                        	if (checked.checked){
                                            	var layer=map.getLayersByName('Qatar Border')[0];
                                            	layer.setVisibility(true);
                                        	}
                                        	else{
                                            	var layer=map.getLayersByName('Qatar Border')[0];
                                            	layer.setVisibility(false);
                                        	}

                                           }
                                    },
                                ]
                            }
                       },
                       '<b class="menu-title">&nbsp;&nbsp;&nbsp;&nbsp;-----------------------</b>',
                       {
                    	   text:'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Abu Dhabi SDI',
                    	   menu:{
                    		   items:[
                                      {
                                          text: 'BasemapEnglish',
                                          checked: false,
                                          group: 'baselayer',
                                          checkHandler: function (checked) {
                                          	map.setBaseLayer(map.getLayersByName('Abu Dhabi SDI BasemapEnglish')[0]);
                                          }
                                      },{
                                          text: 'Satellite50m',
                                          checked: false,
                                          group: 'baselayer',
                                          checkHandler: function (checked) {
                                          	map.setBaseLayer(map.getLayersByName('Abu Dhabi SDI Satellite50m')[0]);
                                          }
                                      }
                    		    ]
                    	   }  
                       },

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
         * Adding all the solar layers to the map
         */
       
        var geoserverUrl="http://atlas.masdar.ac.ae:8080/geoserver/wms";
        var format= 'image/png';
        var yearly_prefix='_yearly_';
        var params2 = ["dhi", "ghi", "dni"];
        var params22 = ["DHI", "GHI", "DNI"];
        var paramsDescription = ["Diffuse Horizontal Irradiation", "Global Horizontal Irradiation", "Direct Normal Irradiation"];
        var anualMapyears = ["2006", "2008" , "2009" , "2010" , "2011" , "2012"];
        var anualMapyears2 = ["2004", "2005" ,"2006", "2008" , "2009" , "2010" , "2011" , "2012"];
        var workspace = "masdar";
        var month_names2 = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
        var month_names2004 = ["apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];//this is because the year 2004 that it starts on april
        var month_names2005 = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep"];//this is because the year 2004 that it starts on april
    	var temp = {};
    	var layers_configurations = {buffer: 0, displayOutsideMaxExtent: true, ratio: 1, opacity: 1, visibility: false};
        

    	//routine to create solar year maps' variables, add them to the temp array along with the respective WMS requests
    	for (var i=0; i<params2.length; i++){
    		for (var e=0; e<anualMapyears.length; e++){
    			var layer_title = paramsDescription[i]+' '+anualMapyears[e];
    			var layer_name = anualMapyears[e] + yearly_prefix + params2[i];
    			layers_configurations.servername=workspace + ":" +layer_name;
    			temp[layer_name] = new OpenLayers.Layer.WMS(layer_title, geoserverUrl, {Layers: workspace + ":" + layer_name, format: format, tiled: true, transparent: true, tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom}, layers_configurations);
    			map.addLayers([temp[layer_name]]);
    		};
    	};
    	
    	//routine to create solar month maps' variables, add them to the temp array along with the respective WMS requests
    	for (var e=0; e<anualMapyears2.length; e++){
    		for (var i=0; i<params22.length; i++){
    			if(e==0){//this is because the year 2004 that it starts on april
        			for (var ii=0; ii<month_names2004.length; ii++){
        				var layer_title = anualMapyears2[e] + "_"+ params22[i]+'_'+ month_names2004[ii] ;
        				var layer_name = anualMapyears2[e] + "_"+ params22[i]+'_'+ month_names2004[ii];
        				layers_configurations.servername=workspace + ":" +layer_name;
        				temp[layer_name] = new OpenLayers.Layer.WMS(layer_title, geoserverUrl, {Layers: workspace + ":" + layer_name, format: format, tiled: true, transparent: true, tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom}, layers_configurations);
        				map.addLayers([temp[layer_name]]);
        			};
    			} else if(e==1){//this is because the year 2004 that it starts on april
        			for (var ii=0; ii<month_names2005.length; ii++){
        				var layer_title = anualMapyears2[e] + "_"+ params22[i]+'_'+ month_names2005[ii] ;
        				var layer_name = anualMapyears2[e] + "_"+ params22[i]+'_'+ month_names2005[ii];
        				layers_configurations.servername=workspace + ":" +layer_name;
        				temp[layer_name] = new OpenLayers.Layer.WMS(layer_title, geoserverUrl, {Layers: workspace + ":" + layer_name, format: format, tiled: true, transparent: true, tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom}, layers_configurations);
        				map.addLayers([temp[layer_name]]);
        			};
    			} else{
        			for (var ii=0; ii<month_names2.length; ii++){
        				var layer_title = anualMapyears2[e] + "_"+ params22[i]+'_'+ month_names2[ii] ;
        				var layer_name = anualMapyears2[e] + "_"+ params22[i]+'_'+ month_names2[ii];
        				layers_configurations.servername=workspace + ":" +layer_name;
        				temp[layer_name] = new OpenLayers.Layer.WMS(layer_title, geoserverUrl, {Layers: workspace + ":" + layer_name, format: format, tiled: true, transparent: true, tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom}, layers_configurations);
        				map.addLayers([temp[layer_name]]);
        			};

    			}

    		};
    	};
    	
    	//Add the  Context layers
    	layers_configurations.auxMaps=true;
    	var uae_emirates = new OpenLayers.Layer.WMS("United Arab Emirates Border", geoserverUrl, {Layers: "masdar:uae_emirates",transparent: true, format: format}, layers_configurations);
    	var qatar = new OpenLayers.Layer.WMS("Qatar Border", geoserverUrl, {Layers: "masdar:qatar",transparent: true, format: format}, layers_configurations);
    	var uae_main_roads_from_osm = new OpenLayers.Layer.WMS("UAE main roads", geoserverUrl, {Layers: "wind:uae_main_roads_from_osm", format: format, transparent: true}, layers_configurations);
    	var uae_main_transmission_network = new OpenLayers.Layer.WMS("UAE transmission network", geoserverUrl, {Layers: "wind:uae_main_transmission_network", format: format, transparent: true}, layers_configurations);
    	var uae_power_plants = new OpenLayers.Layer.WMS("UAE power plants", geoserverUrl, {Layers: "wind:uae_power_plants", format: format, transparent: true}, layers_configurations);
    	var uae_osm_transmission_network = new OpenLayers.Layer.WMS("UAE OSM transmission network", geoserverUrl, {Layers: "uae_osm_power", format: format, transparent: true}, layers_configurations);
    	map.addLayers([uae_emirates,uae_main_roads_from_osm,uae_main_transmission_network,uae_power_plants,qatar,uae_osm_transmission_network]);
        
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
