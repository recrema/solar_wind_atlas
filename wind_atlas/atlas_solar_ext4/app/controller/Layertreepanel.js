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
		var registo=record;
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
						if(w.itemID=='informationWindow' || w.itemID=='legendWindow') {
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
						html:record.raw.layer.name+'<br>',
						layout: {
							type: 'fit',
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
			var action2 = Ext.create('Ext.Action', {
				text: '&nbsp;&nbsp;Layer legend',
				iconCls:"icon_legend",

				handler: function(widget, event) {
					Ext.WindowManager.each(function(w) { 
						if(w.itemID=='informationWindow' || w.itemID=='legendWindow') {
							w.close();}
					});
					Ext.create('Ext.window.Window', {

						itemID:'legendWindow',
						title: 'Legend',
						modal:false,
						resizable: false,
						animateTarget:item,
						height: 550,
						width: 250,
//						html:record.raw.layer.name+'<br>',
						layout: {
							type: 'fit',
							align: 'middle'
						},
						listeners: {
							beforeshow:function(windw){
								if(registo.data.checked){
								windw.add([
								           new GeoExt.panel.Legend({
								        	   filter: function(record) {
								        		   SelectedLayer = record.raw.id.indexOf(registo.raw.layer.id) !== -1
								        		   return SelectedLayer;
								        	   },
								        	   autoScroll: true,
								        	   defaults: {
								        		   legendTitle: "<bold>"+record.raw.layer.name+"</bold><bold><p>kWh/m<sup>2</sup></p></bold>",
								        		   style: 'padding:5px',
								        		   baseParams: {
								        			   HEIGHT:'15',
								        			   FORMAT: 'image/png',
								        			   LEGEND_OPTIONS: 'forceLabels:on'
								        		   }
								        	   },
								        	   dynamic: false, // this does not work, because of this i have to use the listener!
								           })
								           ]);
								}
								else{
									Ext.Msg.show({
									     title:'Layer legend',
									     msg: 'You can only see the legend of active layers. The layer you checked is not active.',
									     buttons: Ext.Msg.OK,
									     icon: Ext.Msg.INFO
									});
									return false
								}
							},
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

				}
			});
			var action3=Ext.create('Ext.Panel', {
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

			var action4 = Ext.create('Ext.Action', {
				text: '&nbsp;&nbsp;Uncheck All',
				iconCls:"icon_cross",
				handler: function(widget, event) {
					map.layers.forEach(function(entry) 
							{ 
						if(entry.visibility && entry.url=='http://atlas.masdar.ac.ae:8080/geoserver/wms') {
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
				        action3,
				        action4
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

		var yearly_prefix='_yearly_';
		var params2 = ["dhi", "ghi", "dni"];
		var params22 = ["DHI", "GHI", "DNI"];
		var paramsDescription = ["Diffuse Horizontal Irradiation", "Global Horizontal Irradiation", "Direct Normal Irradiation"];
		var anualMapyears = ["2012", "2011" , "2010" , "2009" , "2008" , "2006"];
		var month_names2 = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
		var month_names22 = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

		//Monthly Maps Tree
		var year_maps_tree = [];
		for (var i=0; i<anualMapyears.length; i++){
			var params_by_year = [];
			for (var ii=0; ii<params22.length; ii++){
				var maps_month = [];
				for (var iii=0; iii<month_names2.length; iii++) {
					var layer_title = anualMapyears[i]+'_'+params22[ii]+'_'+month_names2[iii];
					var layer_title2 =month_names22[iii];
					var a = {
							plugins: [{ptype: 'gx_layer'}], 
							layer: map2.getLayersByName(layer_title)[0],
							text: layer_title2
					};
					maps_month.push(a);
				};
				params_by_year.push({text: params22[ii], leaf: false, children: maps_month});
			};
			year_maps_tree.push({text: anualMapyears[i], leaf: false, children: params_by_year});
		};

		var overallStore = Ext.create('Ext.data.TreeStore', {
			model: 'GeoExt.data.LayerTreeModel',
			root: {children: (year_maps_tree)}
		});

		var overallLayerTree = new GeoExt.tree.Panel({
			store: overallStore,
			rootVisible: false,
			lines: false,
			scroll: false, //It removes the scroll from the tree panel 
			border: false,
			listeners: {
				checkchange:function(node, checked){
					if(!checked){
						Ext.WindowManager.each(function(w) { 
							if(w.itemID=='legendWindow') {
								w.close();}
						});
					}

				}
			}

		});

		// Add Right click contex menu action
		overallLayerTree.on('itemcontextmenu', function(view, record, item, index, event){

			layerTreeController.treeContextMenu(view, record, item, index, event);

		},this);

		//Yearly Maps Tree
		var year_maps_tree_by_year = [];
		for (var e=0; e<anualMapyears.length; e++) {
			var maps_year_height = [];
			var mapyear='';
			for (var i=0; i<params2.length; i++) {
				layer_title = paramsDescription[i]+' '+anualMapyears[e];
				layer_title2 = paramsDescription[i]+' ('+params22[i]+')';
				mapyear=anualMapyears[e];
				a = {
						plugins: [{ptype: 'gx_layer'}], 
						layer: map2.getLayersByName(layer_title)[0],
						text: layer_title2
				};
				maps_year_height.push(a);
			};
			year_maps_tree_by_year.push({text: mapyear.toString(), leaf: false, children: maps_year_height});
		};

		var yearStore = Ext.create('Ext.data.TreeStore', {
			model: 'GeoExt.data.LayerTreeModel',
			root: {children: (year_maps_tree_by_year)}
		});

		var yearLayerTree = new GeoExt.tree.Panel({
			store: yearStore,
			rootVisible: false,
			lines: false,
			scroll: false, //It removes the scroll from the tree panel 
			border: false,
			listeners: {
				checkchange:function(node, checked){
					if(!checked){
						Ext.WindowManager.each(function(w) { 
							if(w.itemID=='legendWindow') {
								w.close();}
						});
					}

				}
			}
		});

		// Add Right click contex menu action
		yearLayerTree.on('itemcontextmenu', function(view, record, item, index, event){

			layerTreeController.treeContextMenu(view, record, item, index, event);

		},this);

		var layerTree = [{
			title: 'Monthly Maps',
			items: overallLayerTree,
			overflowY: 'auto',
			overflowX: false,
			border: false
		},{
			title: 'Yearly Maps',
			items: yearLayerTree,
			overflowY: 'auto',
			overflowX: false,
			border: false
		}];

		Ext.ComponentQuery.query('layertreepanel')[0].add(layerTree);
		Ext.ComponentQuery.query('layertreepanel')[0].setActiveTab(0);
	}
})