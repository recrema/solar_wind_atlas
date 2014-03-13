/**
 * Layertree controller
 * Used to manage map layers and showing their related views
 */
Ext.define('AM.controller.Layertreepanel',{
	extend: 'Ext.app.Controller',
	
//	refs:['AM.controller.Map'],
	
//	views: ['AM.view.Layertreepanel'],
	
	init: function() {
    	
        this.control({
            'mappanel': {
                render: this.loadLayersTree
            }
        }, this);
    },
    
    onMapPanelRendered: function(temp) {
    	
    	console.log('onMapPanelRendered rendered');
//    	console.log(Ext.ComponentQuery.query('mappanel').temp);

        // for dev purpose
//        map = mapPanel.map;
//        mapPanel = mapPanel;
    },
    
	loadLayersTree: function(mappanel) {
		
//		console.log('Loading layers Tree');
//		console.log(mappanel.map.getLayersByName);
		map2 = mappanel.map;
//		console.log(map2.getLayersByName('Wind Speed 2003 at 10m  - Masdar Institute'));
		
    	/**
    	 * Creating the layer tree to display on the layer tree panel
    	 */
		
		var heights = ["10", "50", "80", "100", "120"];
		var month_numbers = ["01", "02" , "03" , "04" , "05" , "06" , "07" , "08" , "09" , "10" , "11" , "12"];
		//collection of years to use
		var year_start = 2003;
		var year_end = 2012;
		var layer_text_prefix = "Wind Speed";
		var iconpath = "atlas_wind_ext4/resources/icons/layerIcon.png";
		
		function get_month_name(month){
			month_names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
			return month_names[parseInt(month)-1];
		};
		
    	//Overall Maps Tree
        var overall_maps_tree = [];
        //by Month
        var overall_maps_tree_by_month = [];
        for (var i=0; i<month_numbers.length; i++){
        	maps_month_height = [];
        	month_name = get_month_name(month_numbers[i]);
        	for (var ii=0; ii<heights.length; ii++) {
        		layer_title = layer_text_prefix + " at " + heights[ii] + "m " + month_name + " - Masdar Institute";
    			a = {plugins: [{ptype: 'gx_layer'}], layer: map2.getLayersByName(layer_title)[0]};
    			maps_month_height.push(a);
    		};
        	overall_maps_tree_by_month.push({text: month_name, leaf: false, children: maps_month_height});
        };
        overall_maps_tree.push({text: "by Month", leaf: false, children: overall_maps_tree_by_month});
        //by Height
        var v;
        var overall_maps_tree_by_height = [];
        var overall_maps_tree_by_height_Annual = []; //Special case of Overall annual maps
        for (var i=0; i<heights.length; i++) {
        	layer_title = layer_text_prefix + " at " + heights[i] + "m Annual" + " - Masdar Institute";
        	a = {plugins: [{ptype: 'gx_layer'}], layer: map2.getLayersByName(layer_title)[0]};
        	overall_maps_tree_by_height.push(a);
        	v = a
        };  
        for (var i=0; i<heights.length; i++) {
        	maps_height_month = [];
        	for (var ii=0; ii<month_numbers.length; ii++) {
        		month_name = get_month_name(month_numbers[ii]);
        		layer_title = layer_text_prefix + " at " + heights[i] + "m " + month_name + " - Masdar Institute";
        		a = {plugins: [{ptype: 'gx_layer'}], layer: map2.getLayersByName(layer_title)[0]};
        		maps_height_month.push(a);
        	};
        	overall_maps_tree_by_height.push({text: heights[i] + " m", leaf: false, checked: false, children:maps_height_month});
        };
        overall_maps_tree.push({text: "by Height", leaf: false, children: overall_maps_tree_by_height});
      
        var overallStore = Ext.create('Ext.data.TreeStore', {
        	model: 'GeoExt.data.LayerTreeModel',
        	root: {children: (overall_maps_tree)}
        });
        
        var overallLayerTree = new GeoExt.tree.Panel({
    		store: overallStore,
            rootVisible: false,
            lines: false				
    	});
        
      //Year Maps Tree
        var year_maps_tree = [];
        //by Year
        var year_maps_tree_by_year = [];
        for (year = year_start; year <= year_end; year++){
        	maps_year_height = [];
        	for (var i=0; i<heights.length; i++) {
        		layer_title = layer_text_prefix + " " + year + " at " + heights[i] + "m - Masdar Institute";
    			a = {plugins: [{ptype: 'gx_layer'}], layer: map2.getLayersByName(layer_title)[0]};
    			maps_year_height.push(a);
//    			console.log(layer_title);
//    			console.log(map2.getLayersByName(layer_title));
    		};
        	year_maps_tree_by_year.push({text: year.toString(), leaf: false, children: maps_year_height});
        };
        year_maps_tree.push({text: "by Year", leaf: false, children: year_maps_tree_by_year});
        //by Height
        var year_maps_tree_by_height = [];
        for (var i=0; i<heights.length; i++) {
        	maps_height_year = [];
        	for (year = year_start; year <= year_end; year++) {
        		layer_title = layer_text_prefix + " " + year + " at " + heights[i] + "m - Masdar Institute";
        		a = {plugins: [{ptype: 'gx_layer'}], layer: map2.getLayersByName(layer_title)[0]};        		maps_height_year.push(a);
        	};
        	year_maps_tree_by_height.push({text: heights[i] + " m", leaf: false, children:maps_height_year});
        };
        year_maps_tree.push({text: "by Height", leaf: false, children: year_maps_tree_by_height});
        
        var yearStore = Ext.create('Ext.data.TreeStore', {
        	model: 'GeoExt.data.LayerTreeModel',
        	root: {children: (year_maps_tree)}
        });
        
        var yearLayerTree = new GeoExt.tree.Panel({
    		store: yearStore,
            rootVisible: false,
            lines: false				
    	});
        
        layerTree = [{
    	 	title: 'Overall Maps',
    	 	items: overallLayerTree,
    	 	autoScroll: true
    	 },{
    	 	title: 'Year Maps'
//    	 	items: yearLayerTree
    	 },{
    	 	title: 'Month Maps'
    	// 	items: monthLayerTree
    	 }];
        
        Ext.ComponentQuery.query('layertreepanel')[0].add(layerTree);
        Ext.ComponentQuery.query('layertreepanel')[0].setActiveTab(0);
      //  Ext.ComponentQuery.query('layertreepanel')[0].doLayout();
//        console.log(this.getInitialConfig('layertreepanel'));
//        Ext.ComponentQuery.query('layertreepanel > tabpanel0').doLayout;
	}
	
})