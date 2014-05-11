/**
 * Layertree controller
 * Used to manage map layers and showing their related views
 */
Ext.define('AM.controller.Layertreepanel',{
	extend: 'Ext.app.Controller',
	
	init: function() {
		layerTreeController = this;
        this.control({
            'mappanel': {
                render: this.loadLayersTree
            }
        }, this);
    },
    
    onMapPanelRendered: function(temp) {
    	
    	console.log('onMapPanelRendered rendered');
    },
    
    treeContextMenu: function(view, record, item, index, event) {
    	// Only add the contex if you click in a map layer, otherwise does nothing
        if (typeof record.raw.layer=='undefined') {
     	   event.stopEvent(); //stop the normal mouse action in browser!

     	   if (record.isExpanded()) {
	           var action1 = Ext.create('Ext.Action', {
	               text: '&nbsp;Collapse',
	               iconCls:"icon_bullet_up",
	               handler: function(widget, event) {
	            	   record.collapse();
	               }
	           });
	           // create right click contex menu
	           var ContextMenu = Ext.create('Ext.menu.Menu', {
	        	   plain: true,
	               items: [
	                       action1
	               ]
	           }); 
	           ContextMenu.showAt(event.getXY());

     	   }
     	   else {

	           var action1 = Ext.create('Ext.Action', {
	               text: '&nbsp;Expand',
	               iconCls:"icon_bullet_down",
	               handler: function(widget, event) {
	            	   record.expand();
	               }
	           });
	           // create right click contex menu
	           var ContextMenu = Ext.create('Ext.menu.Menu', {
	        	   plain: true,
	               items: [
	                       action1
	               ]
	           }); 
	           ContextMenu.showAt(event.getXY());
     	   }
        }
        else {
	        	event.stopEvent(); //stop the normal mouse action in browser!
		      var action1 = Ext.create('Ext.Action', {
		               text: '&nbsp;&nbsp;Layer info',
		               iconCls:"icon_info",
		               
		               handler: function(widget, event) {
		            	   Ext.WindowManager.each(function(w) { 
		            		   if(w.itemID=='informationWindow') {
		            		    w.close();}
		            		});
		            	   Ext.create('Ext.window.Window', {
		            		   	itemID:'informationWindow',
		            		    title: 'Layer info',
		            		    modal:false,
		            		    resizable: false,
		            		   	animateTarget:item,
		            		    height: 200,
		            		    width: 400,
		            		    html:'Some information about the layer!!!!<br><br> For example layer name: <br>'+record.raw.layer.name,
		            		    layout: {
		            		        type: 'hbox',
		            		        align: 'middle'
		            		    },
			            		listeners: {
			            		    show: function(win) {
			            		        if (this.modal) {
			            		            var dom = Ext.dom.Query.select('.x-mask');
			            		            var el = Ext.get(dom[0]);
			            		            el.addCls('loginMask');
			            		        }
			            		    },
			            		    hide:  function(win) {
			            		        if (this.modal) {
			            		            var dom = Ext.dom.Query.select('.x-mask');
			            		            var el = Ext.get(dom[0]);
			            		            el.removeCls('loginMask');
			            		        }
			            		    }
			            		}
		            		}).show();
		            	   a=record;
		               }
		           });
		      var action2=Ext.create('Ext.Panel', {
		        	   defaultType: 'container',
		        	   border: false,
		        	    layout: {
		        	        type: 'hbox',
		        	        // The total column count must be specified here
		        	        align: 'stretch',
		        	    },
		        	    items: [{
		        	        cls:"icon_eye",
		        	        flex: 1
		        	    }, {
		        	    	flex: 3,
		                    xtype: "gx_opacityslider",
		                    layer: record.raw.layer,
		                    changeVisibility: true,
		                    aggressive: true,
		                    vertical: false,
		                    height: 20,
		                    plugins: Ext.create("GeoExt.slider.Tip", {
		                        getText: function(thumb) {
		                            return Ext.String.format('{0}%', thumb.value);
		                        }
		                    })
		                }]
		        	});

	           var action3 = Ext.create('Ext.Action', {
	               text: '&nbsp;&nbsp;Uncheck All',
	               iconCls:"icon_cross",
	               handler: function(widget, event) {
	            	   map.layers.forEach(function(entry) 
	            		{ 
	            		   if(entry.visibility && entry.url=='http://atlas.masdar.ac.ae:8080/geoserver/wind/wms') {
	            			   entry.setVisibility(false);
	            		   }
	            	    
	            	   });
	               }
	           });

	           // create right click contex menu
	           var ContextMenu = Ext.create('Ext.menu.Menu', {
	        	   plain: true,
	        	   border: false,
	               items: [
	                       action1,
	                       action2,
	                       action3
	               ]
	           }); 
	           ContextMenu.showAt(event.getXY());
        }

    },
    
	loadLayersTree: function(mappanel) {
		
		map2 = mappanel.map;
		
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
			var month_names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
			return month_names[parseInt(month)-1];
		};
		
    	//Overall Maps Tree
        var overall_maps_tree = [];
        //by Month
        var overall_maps_tree_by_month = [];
        for (var i=0; i<month_numbers.length; i++){
        	var maps_month_height = [];
        	var month_name = get_month_name(month_numbers[i]);
        	for (var ii=0; ii<heights.length; ii++) {
        		
        		var layer_title = layer_text_prefix + " at " + heights[ii] + "m " + month_name;
    			var a = {
    					plugins: [{ptype: 'gx_layer'}], 
    					layer: map2.getLayersByName(layer_title)[0],
    					text: layer_title
    			};
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
        	layer_title = layer_text_prefix + " at " + heights[i] + "m Annual";
			a = {
					plugins: [{ptype: 'gx_layer'}], 
					layer: map2.getLayersByName(layer_title)[0],
					text: layer_title
			};
        	overall_maps_tree_by_height.push(a);
        	v = a
        };  
        for (var i=0; i<heights.length; i++) {
        	var maps_height_month = [];
        	for (var ii=0; ii<month_numbers.length; ii++) {
        		month_name = get_month_name(month_numbers[ii]);
        		layer_title = layer_text_prefix + " at " + heights[i] + "m " + month_name;
    			a = {
    					plugins: [{ptype: 'gx_layer'}], 
    					layer: map2.getLayersByName(layer_title)[0],
    					text: layer_title
    			};
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
            lines: false,
            scroll: false, //It removes the scroll from the tree panel 
            border: false,
            
    	});
        
        // Add Right click contex menu action
       overallLayerTree.on('itemcontextmenu', function(view, record, item, index, event){

    	   layerTreeController.treeContextMenu(view, record, item, index, event);
            
    },this);
        
      //Year Maps Tree
        var year_maps_tree = [];
        //by Year
        var year_maps_tree_by_year = [];
        for (var year = year_start; year <= year_end; year++){
        	var maps_year_height = [];
        	for (var i=0; i<heights.length; i++) {
        		layer_title = layer_text_prefix + " " + year + " at " + heights[i] + " m";
    			a = {
    					plugins: [{ptype: 'gx_layer'}], 
    					layer: map2.getLayersByName(layer_title)[0],
    					text: layer_title
    			};
    			maps_year_height.push(a);
    		};
        	year_maps_tree_by_year.push({text: year.toString(), leaf: false, children: maps_year_height});
        };
        year_maps_tree.push({text: "by Year", leaf: false, children: year_maps_tree_by_year});
        //by Height
        var year_maps_tree_by_height = [];
        for (var i=0; i<heights.length; i++) {
        	var maps_height_year = [];
        	for (year = year_start; year <= year_end; year++) {
        		layer_title = layer_text_prefix + " " + year + " at " + heights[i] + " m";
    			a = {
    					plugins: [{ptype: 'gx_layer'}], 
    					layer: map2.getLayersByName(layer_title)[0],
    					text: layer_title
    			};
    			maps_height_year.push(a);
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
            lines: false,
            scroll: false, //It removes the scroll from the tree panel 
            border: false,
    	});
        
        // Add Right click contex menu action
        yearLayerTree.on('itemcontextmenu', function(view, record, item, index, event){

     	   layerTreeController.treeContextMenu(view, record, item, index, event);
             
     },this);
        
        
      //Month Maps Tree
        var month_maps_tree = [];
        //by Year
        var month_maps_tree_by_year = [];
        for (year = year_start; year <= year_end; year++){
        	var maps_year_month_height = [];
        	var maps_year_by_month = [];
        	for (var i=0; i<month_numbers.length; i++) {
        		var maps_year_by_month_height = [];
        		month_name = get_month_name(month_numbers[i]);
        		for (var ii=0; ii<heights.length; ii++) {
        			layer_title=layer_text_prefix+' '+month_name+' '+year+' at '+ heights[ii] + 'm';
        			a = {
        					plugins: [{ptype: 'gx_layer'}], 
        					layer: map2.getLayersByName(layer_title)[0],
        					text: layer_title
        			};
    				maps_year_by_month_height.push(a);
        		};
        		maps_year_by_month.push({text: month_name, leaf: false, children:maps_year_by_month_height});
    		};
    		var maps_year_by_height = [];
    		for (var i=0; i<heights.length; i++) {
        		var maps_year_by_height_month = [];
        		for (var ii=0; ii<month_numbers.length; ii++) {
        			month_name = get_month_name(month_numbers[ii]);
        			layer_title=layer_text_prefix+' '+month_name+' '+year+' at '+ heights[i] + 'm';
        			a = {
        					plugins: [{ptype: 'gx_layer'}], 
        					layer: map2.getLayersByName(layer_title)[0],
        					text: layer_title
        			};
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
        	var maps_month_year_height = [];
        	var maps_month_by_year = [];
        	for (year = year_start; year <= year_end; year++) {
        		var maps_month_by_year_height = [];
        		for (var ii=0; ii<heights.length; ii++) {
        			layer_title=layer_text_prefix+' '+month_name+' '+year+' at '+ heights[ii] + 'm';
        			a = {
        					plugins: [{ptype: 'gx_layer'}], 
        					layer: map2.getLayersByName(layer_title)[0],
        					text: layer_title
        			};
    				maps_month_by_year_height.push(a);
        		};
        		maps_month_by_year.push({text: year.toString(), leaf: false, children:maps_month_by_year_height});
    		};
    		var maps_month_by_height = [];
    		for (var ii=0; ii<heights.length; ii++) {
        		var maps_month_by_height_year = [];
        		for (year = year_start; year <= year_end; year++) {
        			layer_title=layer_text_prefix+' '+month_name+' '+year+' at '+ heights[ii] + 'm';
        			a = {
        					plugins: [{ptype: 'gx_layer'}], 
        					layer: map2.getLayersByName(layer_title)[0],
        					text: layer_title
        			};
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
        	var maps_height_month_year = [];
        	var maps_height_by_year = [];
        	for (year = year_start; year <= year_end; year++) {
        		maps_month_by_year_height = [];
        		for (var ii=0; ii<month_numbers.length; ii++) {
        			month_name = get_month_name(month_numbers[ii]);
        			layer_title=layer_text_prefix+' '+month_name+' '+year+' at '+ heights[i] + 'm';
        			a = {
        					plugins: [{ptype: 'gx_layer'}], 
        					layer: map2.getLayersByName(layer_title)[0],
        					text: layer_title
        			};
    				maps_month_by_year_height.push(a);
        		};
        		maps_height_by_year.push({text: year.toString(), leaf: false, children:maps_month_by_year_height});
    		};
    		var maps_height_by_month = [];
    		for (var ii=0; ii<month_numbers.length; ii++) {
    			month_name = get_month_name(month_numbers[ii]);
        		var maps_height_by_month_year = [];
        		for (year = year_start; year <= year_end; year++) {
        			layer_title=layer_text_prefix+' '+month_name+' '+year+' at '+ heights[i] + 'm';
        			a = {
        					plugins: [{ptype: 'gx_layer'}], 
        					layer: map2.getLayersByName(layer_title)[0],
        					text: layer_title
        			};
    				maps_height_by_month_year.push(a);
        		};
        		maps_height_by_month.push({text: month_name, leaf: false, children:maps_height_by_month_year});
    		};
    		maps_height_month_year.push({text: "by Year", leaf: false, children: maps_height_by_year});
    		maps_height_month_year.push({text: "by Month", leaf: false, children: maps_height_by_month});
    		month_maps_tree_by_height.push({text: heights[i] + " m", leaf: false, children: maps_height_month_year});
        };
        month_maps_tree.push({text: "by Height", leaf: false, children: month_maps_tree_by_height});
        
        var monthStore = Ext.create('Ext.data.TreeStore', {
        	model: 'GeoExt.data.LayerTreeModel',
        	root: {children: (month_maps_tree)}
        });
        
        var monthLayerTree = new GeoExt.tree.Panel({
    		store: monthStore,
            rootVisible: false,
            lines: false,
            scroll: false, //It removes the scroll from the tree panel 
            border: false,
    	});

        
        // Add Right click contex menu action
        monthLayerTree.on('itemcontextmenu', function(view, record, item, index, event){

     	   layerTreeController.treeContextMenu(view, record, item, index, event);
             
     },this);

        var layerTree = [{
    	 	title: 'Overall Maps',
    	 	items: overallLayerTree,
    	 	overflowY: 'auto',
    	 	overflowX: false,
    	 	border: false
    	 },{
    	 	title: 'Year Maps',
    	 	items: yearLayerTree,
    	 	overflowY: 'auto',
    	 	overflowX: false,
    	 	border: false
    	 },{
    	 	title: 'Month Maps',
    	 	items: monthLayerTree,
    	 	overflowY: 'auto',
    	 	overflowX: false,
    	 	border: false
    	 }];
        
        Ext.ComponentQuery.query('layertreepanel')[0].add(layerTree);
        Ext.ComponentQuery.query('layertreepanel')[0].setActiveTab(0);
	}
	
})