/**
 * Map controller
 * Used to manage map layers and showing their related views
 */
Ext.define('AM.controller.Map', {
    extend: 'Ext.app.Controller',
    
//    requires: ['AM.view.Layertreepanel'],

    init: function() {
    	mapController = this;
        this.control({
            'mappanel': {
                'beforerender': this.onMapPanelBeforeRender,
                'onClickActive': this.onClickActive,
                'onClickDeactivate': this.onClickDeactivate,
               
            },
            'layertreepanel': {
            	'beforerender': this.onLayerTreePanelBeforeRender
            }
        }, this);
    },
    

    onMapPanelBeforeRender: function(mapPanel, options) {
    	
    	console.log('onMapPanelBeforeRender rendered');

        // for dev purpose
        map = mapPanel.map;
        mapPanel = mapPanel;
    },
 
    handleMapClick: function(e) {

        var lonlat = map.getLonLatFromViewPortPx(e.xy);
        var position = map.getLonLatFromPixel(e.xy);
        // use lonlat

        // If you are using OpenStreetMap (etc) tiles and want to convert back 
        // to gps coords add the following line :-
         lonlat.transform('EPSG:3857', 'EPSG:4326');
         
         // get the latitude and longitude after a click
         clickLon=Math.round(lonlat.lon*100000)/100000;
         clickLat=Math.round(lonlat.lat*100000)/100000;
         
         
         var size = new OpenLayers.Size(21,25);
         var offset = new OpenLayers.Pixel(-(size.w/2), -size.h);
         var icon = new OpenLayers.Icon('../lib/openlayers/img/marker.png', size, offset);
//         var markerslayer = map.getLayer('markers');
         var marker = new OpenLayers.Marker(position, icon);
         
         // Remove all the markers if there is already any.
         // At the end this will only allow one marker each time.
         if(markers){
         	markers.clearMarkers(); // Clear all the existing markers
         	markers.addMarker(marker); // Add the new marker
         } else {
         	markers.addMarker(marker); // Add a new marker
         };
         
         // Changing the latitude and logitude on the form so the data location will change for 
         // all the portlet's available
         
         mapController.openWinInfo(clickLat,clickLon);

//         var changeLat = Ext.ComponentQuery.query('[name=latitude]')[0].setValue(Latitude);
//         var changeLon = Ext.ComponentQuery.query('[name=longitude]')[0].setValue(Longitude);
    },
    
    openWinInfo: function(clickLat,clickLon) {
//     	console.log('Lat: ' + clickLat + '; Long: ' + clickLon);
         windowInfo=Ext.ComponentQuery.query('windinfo')[0];
         
         if (!Ext.ComponentQuery.query('windinfo textfield[itemId=f1]')[0]) {
         	
	            var field1 = Ext.create('Ext.form.field.Text',{
	            	itemId: 'f1',
	                fieldLabel: 'Latitude',
	                value: clickLat,
	                name: 'lat',
	                allowBlank: false
	            });
	            var field2 = Ext.create('Ext.form.field.Text',{
	            	itemId: 'f2',
	                fieldLabel: 'Longitude',
	                value: clickLon,
	                name: 'long',
	                allowBlank: false
	            });
	            var field3 = Ext.create('Ext.form.field.Date',{
	            	itemId: 'f3',
	                fieldLabel: 'From',
	                name: 'startdate',
	                allowBlank: false
	            });
	            var field4 = Ext.create('Ext.form.field.Date',{
	            	itemId: 'f4',
	                fieldLabel: 'To',
	                value: new Date(),
	                name: 'startdate',
	                allowBlank: false
	            });
	            windowInfo.add(field1);
	            windowInfo.add(field2);
	            windowInfo.add(field3);
	            windowInfo.add(field4);
         }
         else {
         	lat=Ext.ComponentQuery.query('windinfo textfield[itemId=f1]')[0];
         	lat.setValue(clickLat);
         	long=Ext.ComponentQuery.query('windinfo textfield[itemId=f2]')[0];
         	long.setValue(clickLon);
         }
         windowInfo.show();
    },
    
    onClickActive: function() {
        markers = new OpenLayers.Layer.Markers( 'Markers' ); // warning this variable should not be global see line 35
        map.addLayer(markers);
        
        map.events.register('click', map, mapController.handleMapClick);
        
        var clickLat, clickLon;
    },
    
    onClickDeactivate: function() {
	    windowInfo=Ext.ComponentQuery.query('windinfo')[0];
	    windowInfo.hide();
	    markers.clearMarkers(); // warning this variable should not be global see line 43
	    map.events.unregister('click', map, mapController.handleMapClick);
    },

    onLayerTreePanelBeforeRender: function(layertree2) {
    	
    	console.log('onLayerTreeBeforeRender rendered');
    	layertree = layertree2;
//    	console.log(layertree);
    	var treeConfigYear, treeConfigMonth, treeConfigHeight;
    	
        // for dev purpose
//        map = mapPanel.map;
//        mapPanel = mapPanel;
    },
    

    
    onLaunch: function() {
//    	console.log(Ext.get('tabpanel0'));
    	//Code to upload layers to the map (try to do this from a json string)
    	
//        map.addControl(new OpenLayers.Control.LayerSwitcher());


//        
//        /**
//         * Adding all the wind layers to the map
//         */
//        
//        var geoserverUrl="http://atlas.masdar.ac.ae:8080/geoserver/wind/wms";
//        var format = 'image/png';
//    	var heights = ["10", "50", "80", "100", "120"];
//    	var month_numbers = ["01", "02" , "03" , "04" , "05" , "06" , "07" , "08" , "09" , "10" , "11" , "12"];
//    	var year_start = 2003, year_end = 2012;
//    	var layer_prefix = "uaewindmap_moswindspeed_";//to use in the WMS request due to the layer name in the geoserver
//    	var layer_text_prefix = "Wind Speed";
//    	var workspace = "wind";
//    	var temp = {};
//    	var layers_configurations = {buffer: 0, displayOutsideMaxExtent: true, ratio: 1, opacity: 1, visibility: false};
//        
//        function get_month_name(month){
//    		month_names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//    		return month_names[parseInt(month)-1];
//    	};
//
//    	//routine to create month and year maps' variables, add them to the temp array along with the respective WMS requests
//    	for (var i=0; i<heights.length; i++){
//    		for (year = year_start; year <= year_end; year++){
//    			layer_title = layer_text_prefix + " " + year + " at " + heights[i] + "m " + " - Masdar Institute";
//    			layer_name = layer_prefix + heights[i] + 'm_' + year;
//    			temp[layer_name] = new OpenLayers.Layer.WMS(layer_title, geoserverUrl, {Layers: workspace + ":" + layer_name, format: format, tiled: true, transparent: true, tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom}, layers_configurations);
//    			map.addLayers([temp[layer_name]]);
////    			chartLayers.push(temp[layer_name]);
//    			for (var ii=0; ii<month_numbers.length; ii++){
//    				month_name = get_month_name(month_numbers[ii]);
//    				layer_title = layer_text_prefix + " " + month_name + " " + year + " at " + heights[i] + "m " + " - Masdar Institute";
//    				layer_name = layer_prefix + heights[i] + 'm_' + year + month_numbers[ii];
//    				temp[layer_name] = new OpenLayers.Layer.WMS(layer_title, geoserverUrl, {Layers: workspace + ":" + layer_name, format: format, tiled: true, transparent: true, tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom}, layers_configurations);
//    				map.addLayers([temp[layer_name]]);
////    				chartLayers.push(temp[layer_name]);
//    			};
//    		};
//    	};
//    	
//    	//routine to create overall maps' variables, add them to the temp array along with the respective WMS requests
//    	for (var i=0; i<heights.length; i++) {
//    		layer_title = layer_text_prefix + " at " + heights[i] + "m Annual" + " - Masdar Institute";
//    		layer_name = layer_prefix + heights[i] + 'm_' + "Annual";
//    		temp[layer_name] = new OpenLayers.Layer.WMS(layer_title, geoserverUrl, {Layers: workspace + ":" + layer_name, format: format, tiled: true, transparent: true, tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom}, layers_configurations);
//    		map.addLayers([temp[layer_name]]);
////    		chartLayers.push(temp[layer_name]);
//    		for (var ii=0; ii<month_numbers.length; ii++) {
//    			month_name = get_month_name(month_numbers[ii]);
//    			layer_title = layer_text_prefix + " at " + heights[i] + "m " + month_name + " - Masdar Institute";
//    			layer_name = layer_prefix + heights[i] + 'm_' + month_numbers[ii];
//    			temp[layer_name] = new OpenLayers.Layer.WMS(layer_title, geoserverUrl, {Layers: workspace + ":" + layer_name, format: format, tiled: true, transparent: true, tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom}, layers_configurations);
//    			map.addLayers([temp[layer_name]]);
////    			chartLayers.push(temp[layer_name]);
//    		};
//    	};
    	

////        console.log(Ext.ComponentQuery.query('#layertreepanel'));
//        Ext.ComponentQuery.query('#layertreepanel > #tabpanel0').items = yearLayerTree;//[{
////	        	title: "Overall Maps",
//////	        	id: 'tabpanel0'
////	        	items: yearLayerTree
//////	        },{
//////	        	title: "Year Maps",
////////	        	id: 'tabpanel1'
////////	        	items: monthLayerTree
//////	        },{
//////	        	title: "Month Maps",
////////	        	id: 'tabpanel2'
////////	        	items: heightLayerTree
////	        }];
//        Ext.ComponentQuery.query('#layertreepanel > #tabpanel0').doLayout;
        
        // for dev purpose
        ctrl = this;
    }
});
