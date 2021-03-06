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
        // create a new WMS capabilities store

		
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

					var infowindow=Ext.create('Ext.window.Window', {
						itemID:'informationWindow',
						title: 'Layer info',
						modal:false,
						resizable: false,
						animateTarget:item,
						height: 600,
						width: 1100,
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
					});
					infowindow.show().setLoading(true);
					// if the store does not exist we need to create it and load the data, this shoud be more than 1 MB
					if (typeof Ext.data.StoreManager.lookup('layersStore')=='undefined'){
					       var store = Ext.create('GeoExt.data.WmsCapabilitiesStore', {
					            storeId: 'layersStore',
					            url:'../../../cgi-bin/proxy.cgi?url=http%3A%2F%2Fatlas.masdar.ac.ae%3A8080%2Fgeoserver%2Fwms%3Fservice%3Dwms%26request%3DGetCapabilities%26namespace%3Dmasdar',
					            autoLoad: true
					        });
					       store.on('load', function(records, operation, success) {
					    	   var valor=store.findRecord('name', registo.raw.layer.servername);
						        infowindow.add([{html:'<pre style="white-space: pre-wrap;"><b>Layer Title: </br></br></b>'+valor.raw.metadata.title+'</br></br></br><b>Layer abstract: </b></br></br>'+valor.raw.metadata.abstract+'</br></br></br><b>To access this layers from a desktop GIS as a WMS:</b></br></br>WMS URL: <b>http://atlas.masdar.ac.ae:8080/geoserver/masdar/wms</b></br></br>This layer name:<b> '+valor.raw.metadata.name.split(":")[1]+'</pre>'}]);
						        infowindow.setLoading(false);
					    	 });
						
					}else {
						// if the store exists, no need to load the data again
						var store=Ext.data.StoreManager.lookup('layersStore');
						var valor=store.findRecord('name', registo.raw.layer.servername);
				        infowindow.add([{html:'<pre style="white-space: pre-wrap;"><b>Layer Title: </br></br></b>'+valor.raw.metadata.title+'</br></br></br><b>Layer abstract: </b></br></br>'+valor.raw.metadata.abstract+'</br></br></br><b>To access this layers from a desktop GIS as a WMS:</b></br></br>WMS URL: <b>http://atlas.masdar.ac.ae:8080/geoserver/masdar/wms</b></br></br>This layer name:<b> '+valor.raw.metadata.name.split(":")[1]+'</pre>'}]);
				        infowindow.setLoading(false);
					}
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
								        		   var SelectedLayer = record.raw.id.indexOf(registo.raw.layer.id) !== -1
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
					map.layers.forEach(function(entry){ 
						if(entry.visibility && entry.url=='http://atlas.masdar.ac.ae:8080/geoserver/wms'&& entry.auxMaps!=true) {
							entry.setVisibility(false);
							//Now we need to unchek the the active group nodes because geoext does not do it automaticly
							var monthlyTree=Ext.ComponentQuery.query('[itemId=overallLayerTree]')[0];
							monthlyTree.view.store.treeStore.tree.root.childNodes.forEach(function(entry) {
								entry.childNodes.forEach(function(entry) {
									if(entry.data.checked){
										entry.set('checked',false)
									}
								});
							});
							var yearlyTree=Ext.ComponentQuery.query('[itemId=yearLayerTree]')[0];
							yearlyTree.view.store.treeStore.tree.root.childNodes.forEach(function(entry) {

									if(entry.data.checked){
										entry.set('checked',false)
									}

							});
						}

							});
				}
			});
			var action5 = Ext.create('Ext.Action', {
				text: '&nbsp;&nbsp;Bring to front',
				iconCls:"icon_up",
				handler: function(widget, event) {
					//raise the layer
					map.raiseLayer(registo.raw.layer, map.layers.length);
					//now we need to raise the aux maps like borders and roads above the previous layer
					var index;
					var auxmapsnum=map.getLayersBy('auxMaps',true);
					for (index = 0; index < auxmapsnum.length; ++index) {
						map.raiseLayer(auxmapsnum[index],map.layers.length);
					}
					//if the marker is present we need to put the marker above all!
					if (typeof markers!='undefined'){
						map.raiseLayer(markers,map.layers.length);
					}
				}
			});
			


			// create right click contex menu
			var ContextMenu = Ext.create('Ext.menu.Menu', {
				plain: true,
				border: false,
				items: [
						action5,
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

		var map2 = mappanel.map;

		/**
		 * Creating the layer tree to display on the layer tree panel
		 */

		var yearly_prefix='_yearly_';
		var params2 = ["dhi", "ghi", "dni"];
		var params22 = ["DHI", "GHI", "DNI"];
		var paramsDescription = ["Diffuse Horizontal Irradiation", "Global Horizontal Irradiation", "Direct Normal Irradiation"];
		var anualMapyears = ["2012", "2011" , "2010" , "2009" , "2008" , "2006"];
		var anualMapyears2 = ["2012", "2011" , "2010" , "2009" , "2008" , "2006", "2005" , "2004"];//this is because the year 2004 and 2005 that it starts on april
		var month_names2 = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
		var month_names2004 = ["apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];//this is because the year 2004 that it starts on april
		var month_names22 = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		var month_names22004 = ["April", "May", "June", "July", "August", "September", "October", "November", "December"];//this is because the year 2004 that it starts on april
		
		var month_names2005 = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep"];//this is because the year 2004 that it starts on april
		var month_names22005 = ["January", "February", "March", "April", "May", "June", "July", "August", "September"];//this is because the year 2005
		//Monthly Maps Tree
		var year_maps_tree = [];
		for (var i=0; i<anualMapyears2.length; i++){
			var params_by_year = [];
			for (var ii=0; ii<params22.length; ii++){
				var maps_month = [];
				if(i==7){ //this if is because the year 2004 that it starts on april
					for (var iii=0; iii<month_names2004.length; iii++) {
						var layer_title = anualMapyears2[i]+'_'+params22[ii]+'_'+month_names2004[iii];
						var layer_title2 =month_names22004[iii];
						var a = {
								plugins: [{ptype: 'gx_layer'}], 
								layer: map2.getLayersByName(layer_title)[0],
								text: layer_title2,
								qtip: "Right click for context menu"
						};
						maps_month.push(a);
					};
					params_by_year.push({text: params22[ii],checked: false, leaf: false, children: maps_month});
				}else if(i==6){
					for (var iii=0; iii<month_names2005.length; iii++) {
						var layer_title = anualMapyears2[i]+'_'+params22[ii]+'_'+month_names2005[iii];
						var layer_title2 =month_names22005[iii];
						var a = {
								plugins: [{ptype: 'gx_layer'}], 
								layer: map2.getLayersByName(layer_title)[0],
								text: layer_title2,
								qtip: "Right click for context menu"
						};
						maps_month.push(a);
					};
					params_by_year.push({text: params22[ii],checked: false, leaf: false, children: maps_month});
					
				}else{
					for (var iii=0; iii<month_names2.length; iii++) {
						var layer_title = anualMapyears2[i]+'_'+params22[ii]+'_'+month_names2[iii];
						var layer_title2 =month_names22[iii];
						var a = {
								plugins: [{ptype: 'gx_layer'}], 
								layer: map2.getLayersByName(layer_title)[0],
								text: layer_title2,
								qtip: "Right click for context menu"
						};
						maps_month.push(a);
					};
					params_by_year.push({text: params22[ii],checked: false, leaf: false, children: maps_month});
				}

			};
			year_maps_tree.push({text: anualMapyears2[i], leaf: false, children: params_by_year});
		};

		var overallStore = Ext.create('Ext.data.TreeStore', {
			model: 'GeoExt.data.LayerTreeModel',
			root: {children: (year_maps_tree)}
		});

		var overallLayerTree = new GeoExt.tree.Panel({
			store: overallStore,
			rootVisible: false,
			lines: false,
			itemId:'overallLayerTree',
			//to have tha ability to drag and drop the layers in tree
			viewConfig : {
		        enableDD : true,
		        plugins : {
		            ptype : 'treeviewdragdrop'
		        }
		    },
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
////////////////////In case of the group can be checked/unchecked the layers nedd to check/uncheck automaticly			
					node.cascadeBy(function(n){n.set('checked', checked);} );
					if(checked){
						if(node.isExpandable()){
							node.expand();
						}
						if (!node.parentNode.parentNode.isLast() || !node.parentNode.parentNode.isFirst() ){
							node.parentNode.set('checked', checked);
						}
					}
					if(!checked){
						if (!node.parentNode.parentNode.isLast() || !node.parentNode.parentNode.isFirst() ){
//							console.log(node.parentNode.childNodes);
							var hasActiveChilds=false;
							node.parentNode.childNodes.forEach(function(entry) {
								if(entry.data.checked){
									hasActiveChilds=true
								}
							});
							if(!hasActiveChilds){
								node.parentNode.set('checked', checked);
							}
						}
					}
///////////////////////////////////////////////////////////////////////

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
						text: layer_title2,
						qtip: "Right click for context menu"
				};
				maps_year_height.push(a);
			};
			year_maps_tree_by_year.push({text: mapyear.toString(),checked: false, leaf: false, children: maps_year_height});
		};

		var yearStore = Ext.create('Ext.data.TreeStore', {
			model: 'GeoExt.data.LayerTreeModel',
			root: {children: (year_maps_tree_by_year)}
		});

		var yearLayerTree = new GeoExt.tree.Panel({
			store: yearStore,
			rootVisible: false,
			lines: false,
			itemId:'yearLayerTree',
			//to have tha ability to drag and drop the layers in tree
			viewConfig : {
		        enableDD : true,
		        plugins : {
		            ptype : 'treeviewdragdrop'
		        }
		    },
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
////////////////////In case of the group can be checked/unchecked the layers nedd to check/uncheck automaticly			
					node.cascadeBy(function(n){n.set('checked', checked);} );
					if(checked){
						if(node.isExpandable()){
							node.expand();
						}
							node.parentNode.set('checked', checked);
					}
					if(!checked){
						if (!node.parentNode.isLast() || !node.parentNode.isFirst()){
							var hasActiveChilds=false;
							node.parentNode.childNodes.forEach(function(entry) {
								if(entry.data.checked){
									hasActiveChilds=true
								}
							});
							if(!hasActiveChilds){
								node.parentNode.set('checked', checked);
							}
						}
					}
///////////////////////////////////////////////////////////////////////
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
			border: false,
			listeners: {
				activate: function() {
					yearLayerTree.getRootNode().cascadeBy(function(){
						if (typeof this.data.checked=='boolean'){
							this.set( 'checked', false );
						}
			            });
				}
			}
		},{
			title: 'Yearly Maps',
			items: yearLayerTree,
			overflowY: 'auto',
			overflowX: false,
			border: false,
			listeners: {
				activate: function() {
					overallLayerTree.getRootNode().cascadeBy(function(){
						if (typeof this.data.checked=='boolean'){
							this.set( 'checked', false );
						}
			            });
				}
			}
		}];

		Ext.ComponentQuery.query('layertreepanel')[0].add(layerTree);
		Ext.ComponentQuery.query('layertreepanel')[0].setActiveTab(0);
	}
})