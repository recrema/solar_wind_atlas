/**
 * The GeoExt.panel.Map used in the application.  Useful to define map options
 * and stuff.
 * @extends GeoExt.panel.Map
 */
Ext.define('AM.view.Map', {
    // Ext.panel.Panel-specific options:
    extend: 'GeoExt.panel.Map',
    alias : 'widget.mappanel',
    requires: [
        'Ext.window.MessageBox',
        'GeoExt.Action',
        'AM.view.help.Action'
    ],
    border: 0,
    layout: 'fit',
    
//    region: 'west',
//    width: 600,
    // GeoExt.panel.Map-specific options :
//    center: '24, 52',
//    zoom: 5,

    initComponent: function(config) {
//        var me = this,
            tbarItems = [],
            ctrl;
        
//        var map = new OpenLayers.Map(options);

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
                     )
                 ],
    	    displayProjection : 'EPSG:4326',
    	    center: new OpenLayers.LonLat(54.5, 24.5).transform('EPSG:4326', 'EPSG:3857'),
    	    zoom: 7
    	});
    	
    	map.addControl(new OpenLayers.Control.MousePosition());
        
//        map.addControl(new OpenLayers.Control.LayerSwitcher());
    	
    	map.events.register("mousemove", map, function(e) { 
            var position = this.events.getMousePosition(e);
            OpenLayers.Util.getElement("coords").innerHTML = position;
        });
    	
        // ZoomToMaxExtent control, a "button" control
    	tbarItems.push(Ext.create('Ext.button.Button', Ext.create('GeoExt.Action', {
            control: new OpenLayers.Control.ZoomToMaxExtent(),
            map: map,
            text: "max extent",
            tooltip: "zoom to max extent"
        })));

    	tbarItems.push("-");

        // Navigation control
    	tbarItems.push(Ext.create('Ext.button.Button',Ext.create('GeoExt.Action', {
            text: "nav",
            control: new OpenLayers.Control.Navigation(),
            map: map,
            // button options
            toggleGroup: "draw",
            allowDepress: false,
            pressed: true,
            tooltip: "navigate",
            // check item options
            group: "draw",
            checked: true
        })));

    	tbarItems.push("-");

        // Navigation history - two "button" controls
        ctrl = new OpenLayers.Control.NavigationHistory();
        map.addControl(ctrl);
        
        tbarItems.push(Ext.create('Ext.button.Button', Ext.create('GeoExt.Action', {
            text: "previous",
            control: ctrl.previous,
            disabled: true,
            tooltip: "previous in history"
        })));
        
        tbarItems.push(Ext.create('Ext.button.Button', Ext.create('GeoExt.Action', {
            text: "next",
            control: ctrl.next,
            disabled: true,
            tooltip: "next in history"
        })));
        tbarItems.push("->");

        // Help action
        tbarItems.push(
            Ext.create('Ext.button.Button', Ext.create('AM.view.help.Action', {
                windowContentEl: "help"
            }))
        );
        
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
    		month_names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    		return month_names[parseInt(month)-1];
    	};

    	//routine to create month and year maps' variables, add them to the temp array along with the respective WMS requests
    	for (var i=0; i<heights.length; i++){
    		for (year = year_start; year <= year_end; year++){
    			layer_title = layer_text_prefix + " " + year + " at " + heights[i] + "m " + " - Masdar Institute";
    			layer_name = layer_prefix + heights[i] + 'm_' + year;
    			temp[layer_name] = new OpenLayers.Layer.WMS(layer_title, geoserverUrl, {Layers: workspace + ":" + layer_name, format: format, tiled: true, transparent: true, tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom}, layers_configurations);
    			map.addLayers([temp[layer_name]]);
//    			chartLayers.push(temp[layer_name]);
    			for (var ii=0; ii<month_numbers.length; ii++){
    				month_name = get_month_name(month_numbers[ii]);
    				layer_title = layer_text_prefix + " " + month_name + " " + year + " at " + heights[i] + "m " + " - Masdar Institute";
    				layer_name = layer_prefix + heights[i] + 'm_' + year + month_numbers[ii];
    				temp[layer_name] = new OpenLayers.Layer.WMS(layer_title, geoserverUrl, {Layers: workspace + ":" + layer_name, format: format, tiled: true, transparent: true, tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom}, layers_configurations);
    				map.addLayers([temp[layer_name]]);
//    				chartLayers.push(temp[layer_name]);
    			};
    		};
    	};
    	
    	//routine to create overall maps' variables, add them to the temp array along with the respective WMS requests
    	for (var i=0; i<heights.length; i++) {
    		layer_title = layer_text_prefix + " at " + heights[i] + "m Annual" + " - Masdar Institute";
    		layer_name = layer_prefix + heights[i] + 'm_' + "Annual";
    		temp[layer_name] = new OpenLayers.Layer.WMS(layer_title, geoserverUrl, {Layers: workspace + ":" + layer_name, format: format, tiled: true, transparent: true, tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom}, layers_configurations);
    		map.addLayers([temp[layer_name]]);
//    		chartLayers.push(temp[layer_name]);
    		for (var ii=0; ii<month_numbers.length; ii++) {
    			month_name = get_month_name(month_numbers[ii]);
    			layer_title = layer_text_prefix + " at " + heights[i] + "m " + month_name + " - Masdar Institute";
    			layer_name = layer_prefix + heights[i] + 'm_' + month_numbers[ii];
    			temp[layer_name] = new OpenLayers.Layer.WMS(layer_title, geoserverUrl, {Layers: workspace + ":" + layer_name, format: format, tiled: true, transparent: true, tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom}, layers_configurations);
    			map.addLayers([temp[layer_name]]);
//    			chartLayers.push(temp[layer_name]);
    		};
    	};
        
        Ext.apply(this, {
            map: map,
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                items: tbarItems,
                style: {
                    border: 0,
                    padding: 0
                }
            }]
        });
                
        this.callParent(arguments);
    }
});
