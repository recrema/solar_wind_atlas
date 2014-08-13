/**
 * Map controller
 * Used to manage map layers and showing their related views
 */
Ext.define('AM.controller.Map', {
    extend: 'Ext.app.Controller',
    views: ['Windinfo', 'chart.Window', 'genericWindow'],

    init: function () {
        num_month = 0;
        num_year = 0;

        mapController = this;
        this.control({
            'mappanel': {
                'beforerender': this.onMapPanelBeforeRender,
                'onClickActive': this.onClickActive,
                'onClickDeactivate': this.onClickDeactivate,
                'onClickDraw': this.onClickDraw,
                'offClickDraw': this.offClickDraw


            },
            'windinfoResult': {
                'onChartActivate': this.onChartActivate
            },
            'layertreepanel': {
                'beforerender': this.onLayerTreePanelBeforeRender
            }
        }, this);
    },


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  	onstar: function() {
 
  		mapController.loading = 0;
		var layer=new OpenLayers.Layer.Vector("imgLayer2", {visibility:false,
    	    attribution: "<img src='resources/images/loading.gif' style='position: fixed;z-index: 20000;right: "+map.getSize().w/2+"px; top: "+map.getSize().h/2+"px'/>" //  ajustar a imagem em funcao do ecra!
    	});
		map.addLayer(layer);
		for (var src in map.layers) {
			var lyr = map.layers[src];
			lyr.events.register('loadstart', lyr, function(){mapController.onup( 1)});
			lyr.events.register('loadend',   lyr, function(){mapController.onup(-1)});
		}
	},

        onup: function(num) {
        	mapController.loading += num;
        	var waitLayer=map.getLayersByName('imgLayer2')[0];
		if (mapController.loading > 0) {
			map.setLayerIndex(waitLayer,map.getNumLayers());
			waitLayer.setVisibility(true);

		} else {
			mapController.loading = 0;
			waitLayer.setVisibility(false);
		}
	},
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    onMapPanelBeforeRender: function (mapPanel, options) {


        // for dev purpose
        map = mapPanel.map;
    },

    handleMapClick: function (e) {

        var lonlat = map.getLonLatFromViewPortPx(e.xy);
        var position = map.getLonLatFromPixel(e.xy);
        lonlat.transform('EPSG:3857', 'EPSG:4326');

        // get the latitude and longitude after a click
        clickLon = Math.round(lonlat.lon * 100000) / 100000;
        clickLat = Math.round(lonlat.lat * 100000) / 100000;


        var size = new OpenLayers.Size(40, 40);
        var icon = new OpenLayers.Icon('resources/images/button.gif', size);
        var marker = new OpenLayers.Marker(position, icon);

        // Remove all the markers if there is already any.
        // At the end this will only allow one marker each time.
        if (markers) {
            markers.clearMarkers(); // Clear all the existing markers
            markers.addMarker(marker); // Add the new marker
        } else {
            markers.addMarker(marker); // Add a new marker
        };

        // Changing the latitude and logitude on the form so the data location will change for 
        // all the portlet's available

//        mapController.openWinInfoForm(clickLat, clickLon);
//        console.log('click');
        
        

        
        
    },


    type: function (typeText) {

    	var z = "";
    	
    	switch (typeText) {
    	case "dhi":
    		z = "DHI";
    		break;
    	case "dni":
    		z = "DNI";
    		break;
    	case "ghi":
    		z = "GHI";
    		break;
    	}
    	
    	return z;
    },

    month: function (monthText) {
    	
    	switch (monthText) {
    	case "jan":
    		m = "January";
    		break;
    	case "feb":
    		m = "February";
    		break;
    	case "mar":
    		m = "March";
    		break;
    	case "apr":
    		m = "April";
    		break;
    	case "may":
    		m = "May";
    		break;
    	case "jun":
    		m = "June";
    		break;
    	case "jul":
    		m = "July";
    		break;
    	case "aug":
    		m = "August";
    		break;
    	case "sep":
    		m = "September";
    		break;
    	case "oct":
    		m = "October";
    		break;
    	case "nov":
    		m = "November";
    		break;
    	case "dec":
    		m = "December";
    		break;
    	}
    	return m;
    	
    },
    verifyChartLayers: function (layerChart) {
    	
    	if (layerChart.indexOf("yearly") != -1 )
    		num_year = num_year + 1;
    	else if (layerChart.indexOf("yearly") == -1 )
    		num_month = num_month + 1;
    },

    chartDate: function (labelText) {
    	var text = labelText;
    	var c;
    	year = text.substring(0,4);
    	if(text.indexOf("yearly") != -1){
    		typeSubstring = text.substring((text.length - 3), text.length);
    		c = mapController.type(typeSubstring)  + " - " + year;
    	}
    	else {
    		typeSubstring = text.substring(5, 8);
    		monthSubstring = text.substring((text.length - 3), text.length);
    		c = mapController.type(typeSubstring) + " - " + year + " - " + mapController.month(monthSubstring);
    	}
    	
    	return c;
    },

    formatChartNumber: function (number2) {
    	number = parseFloat(number2);
    	finalNumber = Math.round(10*number)/10;
    	return finalNumber;
    },
    onClickActive: function () {
        var panelviewport = Ext.ComponentQuery.query('viewport panel[itemId=p1]')[0];
        var chartWindow = mapController.getView('chart.Window').create();
        chartWindow.animateTarget = 'viewwindinfo';
        chartWindow.html='<div style="font-family:verdana;color:grey;"><center><h3>Irradiation Values Chart</h3><h4>To view the chart:</h4><br>Click on the desired pixel on the map to view the data value of the checked layer or layers in format of a chart.</center><br><br><b> Note:</b> the chart is built on the fly and only one location at a time can be shown.</div>';
        chartWindow.show();
        panelviewport.add(chartWindow);
        Ext.WindowManager.register(chartWindow);
        Ext.WindowManager.bringToFront(chartWindow);
        
        
        
    	if (map.getControlsBy('type','WMSGetFeatureInfo')[0]){
            var existingControl=map.getControlsBy('type','WMSGetFeatureInfo')[0];
            existingControl.activate();
    	}else{
            info = new OpenLayers.Control.WMSGetFeatureInfo({
                url: 'http://atlas.masdar.ac.ae:8080/geoserver/wms',
                title: 'Identify features by clicking',
                queryVisible: true,
                infoFormat: "text/html",
                maxFeatures: 12,
                eventListeners: {
                    getfeatureinfo: function(event) {
                    	
                    	var layerTree= Ext.ComponentQuery.query('[itemId=overallLayerTree]')[0];
                    	var count=0;
                    	layerTree.getRootNode().cascadeBy(function(){
    						if ((typeof this.data.checked=='boolean') && this.data.checked && this.data.layer!="" ){
    							count++;
    						}
    			            });
                    	if (count > 12) {
                    		var chartWindow = Ext.ComponentQuery.query('[itemId=chartWindow]')[0];
                    		var existingChart=Ext.ComponentQuery.query('[itemId=chart1]')[0];
                    		if(existingChart){
                        		existingChart.destroy();
                    		}
                    		chartWindow.update('<div style="font-family:verdana;color:grey;"><center><h2>Warning</h2><h3><br>You have more than 12 active layers.</h3><br>Please deactivate some layers and then click on the location again! This chart can only be activated with a maximum of 12 active layers</center><br><br><b></div>');
                    		return;
                    	}
    	            	var dom = $('<table>').html(event.text);
    	            	var afeatureInfo = {};
    	            	var data = [];            	
    	            	$('table:has(.dataLayer)', dom).each(function(){          		
    	            	    var $tbl = $(this);
    	            	    var section = $tbl.find('.dataLayer').text();
    	            	    var obj = [];
    	            	    var $structure = $tbl.find('.dataHeaders');
    	            	    var structure = $structure.find('th').map(function(){return $(this).text().toLowerCase();});
    	            	    var $datarows= $structure.nextAll('tr');
    	            	    var flag = 0;
    	            	    $datarows.each(function(i){
    	            	        obj[i] = {};
    	            	        $(this).find('td').each(function(index,element){
    	            	        		obj[i][structure[index]] = $(element).text();            	            
    		            	            id=structure[index];
    		            	            id2=mapController.chartDate(id);
    		            	            x = mapController.verifyChartLayers(structure[index]);
    		            	            value=mapController.formatChartNumber($(element).text());
    		            	            data.push([id2, value]);
    	            	        });
    	            	    });
    	            	    afeatureInfo[section] = obj;
    	            	});
    	            	var json={
    	                        chart: {
    	                            type: 'column'
    	                        },
    	                        title: {
    	                            text: 'Irradiation Values Chart'
    	                        },
    	                        subtitle: {
    	                            text: 'Source: <a href="http://recrema.masdar.ac.ae" target="_blank">Recrema - Masdar Institute</a>'
    	                        },
    	                        xAxis: {
    	                            type: 'category',
    	                            labels: {
    	                                rotation: -50,
    	                                style: {
    	                                    fontSize: '11px',
    	                                    fontFamily: 'Verdana, sans-serif'
    	                                }
    	                            }
    	                        },
    	                        yAxis: {
    	                            min: 0,
    	                            title: {
    	                                text: '<p>Irradiation kWh/m<sup>2</sup></p>'
    	                            }
    	                        },
    							credits: {
    					  		    enabled: false
    						  	},
    	                        legend: {
    	                            enabled: false
    	                        },
    	                        tooltip: {
    	                            pointFormat: '<b>{point.y:.1f} kWh/m<sup>2</sup></b>',
    	                        },
    	                        series: [{
    	                            name: 'Population',
    	                            data:data.reverse(),
    	                            dataLabels: {
    	                                enabled: true,
    	                                rotation: -90,
    	                                color: '#FFFFFF',
    	                                align: 'right',
    	                                x: 4,
    	                                y: 10,
    	                                style: {
    	                                    fontSize: '13px',
    	                                    fontFamily: 'Verdana, sans-serif',
    	                                    textShadow: '0 0 3px black'
    	                                }
    	                            }
    	                        }]
    	                    };
    	            	mapController.onChartActivate(json,'panel-1078-innerCt');
                    }
                }
            });
            info.type='WMSGetFeatureInfo';
            
            map.addControl(info);
            
            info.activate();
    	}

        if (typeof markers == "undefined") {
            
            markers = new OpenLayers.Layer.Markers('Markers'); // warning this variable should not be global see line 35
            map.addLayer(markers);
            map.events.register('click', map, mapController.handleMapClick);
            clickLat = null;
            clickLon = null;

        } else {
            markers.setVisibility(true);
            map.events.register('click', map, mapController.handleMapClick);
        }

//        mapController.openWinInfoForm(clickLat, clickLon);
        //Here i can put something to tell the user to click in the map!
    },

    onClickDeactivate: function () {
    	if(Ext.ComponentQuery.query('[itemId=chartWindow]')[0]){
    		var chartWindow=Ext.ComponentQuery.query('[itemId=chartWindow]')[0];
    		chartWindow.close();
    	}
        var windowInfo = Ext.ComponentQuery.query('windinfo')[0];
        windowInfo.hide();
        markers.setVisibility(false);
        map.events.unregister('click', map, mapController.handleMapClick);
        var existingControl=map.getControlsBy('type','WMSGetFeatureInfo')[0];
        existingControl.deactivate();
    },
    onChartActivate: function (json, targetId) {

//        var panelviewport = Ext.ComponentQuery.query('viewport panel[itemId=p1]')[0];
//        var chartWindow = mapController.getView('chart.Window').create();
//        chartWindow.animateTarget = targetId;
//        chartWindow.show();
//        panelviewport.add(chartWindow);
//        Ext.WindowManager.register(chartWindow);
//        Ext.WindowManager.bringToFront(chartWindow);
    	var chartWindow=Ext.ComponentQuery.query('[itemId=chartWindow]')[0];
    	chartWindow.update('');
    	//no caso de ja la estar um grafico tenho de remover o que ja existe
    	if (Ext.ComponentQuery.query('[itemId=chart1]')[0]){
    		var existingChart=Ext.ComponentQuery.query('[itemId=chart1]')[0];
    		existingChart.destroy();
    	}
        chartWindow.add([{
            xtype: 'highchart',
            itemId: 'chart1',
            initAnimAfterLoad: false,
            chartConfig: json
        }]);
        chartWindow.on("move",function() { 
        	if (Ext.ComponentQuery.query('[itemId=chart1]')[0]){
        		var existingChart=Ext.ComponentQuery.query('[itemId=chart1]')[0];
        		existingChart.draw();
        	}
        	}, this);
        

    },
    handleMeasurements: function (event) {
        var geometry = event.geometry;
        var units = event.units;
        var order = event.order;
        var measure = event.measure;
        var element = Ext.ComponentQuery.query('panel[itemId=measurePanel]')[0];
        var out = "";
        if(order == 1) {
            out += "Lenght: " + measure.toFixed(3) + " " + units;
            if (event.object.layerSegments.features.length!=0){
            	var lastSegment=event.object.layerSegments.features[event.object.layerSegments.features.length-1];
            	out += "<p>Last segment: " + lastSegment.attributes.measure + " " + lastSegment.attributes.units + "</p>";
            }
        } else {
            out += "Area: " + measure.toFixed(3) + " " + units + "<sup>2</" + "sup>";
            var perimeter=event.object.layerLength.features;
            if (perimeter.length!=0){
            	out += "<p>Perimeter: " + perimeter[0].attributes.measure + " " + perimeter[0].attributes.units + "</p>";
            }
            if (event.object.layerSegments.features.length!=0){
            	var lastSegment=event.object.layerSegments.features[event.object.layerSegments.features.length-1];
            	out += "<p>Last segment: " + lastSegment.attributes.measure + " " + lastSegment.attributes.units + "</p>";
            }
        }
        element.update(out);
        
    },

    onClickDraw: function () {
        if (Ext.ComponentQuery.query('genericWindow')[0]) {
            Ext.ComponentQuery.query('genericWindow')[0].show();
        } else {
            var panelviewport = Ext.ComponentQuery.query('viewport panel[itemId=p1]')[0];
            var genericWindow = mapController.getView('genericWindow').create();
            genericWindow.layout= {
    	        type: 'vbox',
    	        align: 'stretch'
    	    };
            genericWindow.animateTarget = 'drawButton';
            genericWindow.x = 340;
            genericWindow.y = 150;
            genericWindow.resizable = false;
            genericWindow.show();
            panelviewport.add(genericWindow);
            Ext.WindowManager.register(genericWindow);
            Ext.WindowManager.bringToFront(genericWindow);
            genericWindow.add([{
            	
            	xtype:'panel',
            	header:false,
            	bodyPadding: 5,
            	flex:1,
            	items: [{
            		xtype:'button',
            		toggleGroup:'draw',
            		tooltip:'Measure polygon',
            		cls:'polygon_button',
            		pressedCls:'polygon_button_pressed',
            	    style: {
            	        marginLeft: '55px',
            	    },
            	    handler: function() {
            	            if (map.getControlsBy('itemMesureType','polygon')[0]){
            	            	if (map.getControlsBy('itemMesureType','path')[0]){
                	            	var existingControl=map.getControlsBy('itemMesureType','path')[0];
                	            	existingControl.deactivate();
                	            	existingControl.destroy();
                	            }
            	            	if (map.getControlsBy('itemMesureType','RegularPolygon')[0]){
                	            	var existingControl=map.getControlsBy('itemMesureType','path')[0];
                	            	existingControl.deactivate();
                	            	existingControl.destroy();
                	            }
            	            	var existingControl=map.getControlsBy('itemMesureType','polygon')[0];
            	            	existingControl.activate();
            	            }

            	            else{
            	            	if (map.getControlsBy('itemMesureType','path')[0]){
                	            	var existingControl=map.getControlsBy('itemMesureType','path')[0];
                	            	existingControl.deactivate();
                	            	existingControl.destroy();
                	            }
            	            	if (map.getControlsBy('itemMesureType','RegularPolygon')[0]){
                	            	var existingControl=map.getControlsBy('itemMesureType','RegularPolygon')[0];
                	            	existingControl.deactivate();
                	            	existingControl.destroy();
                	            }
            	            	
	            	            var cMeasure = new OpenLayers.Control.DynamicMeasure(OpenLayers.Handler.Polygon);
	            	            cMeasure.itemMesureType='polygon';
	            	            cMeasure.events.on({
	                                "measure": mapController.handleMeasurements,
	                                "measurepartial": mapController.handleMeasurements
	                            });
	            	            cMeasure.setImmediate(true);
	            	            map.addControl(cMeasure);
	            	            cMeasure.activate();
            	            }

            	        }
                },{
            		xtype:'button',
            		cls:'box_button',
            		tooltip:'Measure box',
            		pressedCls:'box_button_pressed',
            		toggleGroup:'draw',
            	    style: {
            	        marginLeft: '15px',
            	    },
            	     handler: function() {
            	            if (map.getControlsBy('itemMesureType','RegularPolygon')[0]){
            	            	if (map.getControlsBy('itemMesureType','path')[0]){
                	            	var existingControl=map.getControlsBy('itemMesureType','path')[0];
                	            	existingControl.deactivate();
                	            	existingControl.destroy();
                	            }
            	            	if (map.getControlsBy('itemMesureType','polygon')[0]){
                	            	var existingControl=map.getControlsBy('itemMesureType','polygon')[0];
                	            	existingControl.deactivate();
                	            	existingControl.destroy();
                	            }
            	            	var existingControl=map.getControlsBy('itemMesureType','RegularPolygon')[0];
            	            	existingControl.activate();
            	            }

            	            else{
            	            	if (map.getControlsBy('itemMesureType','path')[0]){
                	            	var existingControl=map.getControlsBy('itemMesureType','path')[0];
                	            	existingControl.deactivate();
                	            	existingControl.destroy();
                	            }
            	            	if (map.getControlsBy('itemMesureType','polygon')[0]){
                	            	var existingControl=map.getControlsBy('itemMesureType','polygon')[0];
                	            	existingControl.deactivate();
                	            	existingControl.destroy();
                	            }
	            	            var cMeasure = new OpenLayers.Control.DynamicMeasure(OpenLayers.Handler.RegularPolygon);
	            	            cMeasure.itemMesureType='RegularPolygon';
	            	            cMeasure.events.on({
	                                "measure": mapController.handleMeasurements,
	                                "measurepartial": mapController.handleMeasurements
	                            });
	            	            cMeasure.setImmediate(true);
	            	            map.addControl(cMeasure);
	            	            cMeasure.activate();
            	            }

            	        }
                },{
            		xtype:'button',
            		cls:'line_button',
            		tooltip:'Measure line',
            		pressedCls:'line_button_pressed',
            		toggleGroup:'draw',
            	    style: {
            	        marginLeft: '15px',
            	    },
            	     handler: function() {
        	            if (map.getControlsBy('itemMesureType','path')[0]){
        	            	if (map.getControlsBy('itemMesureType','polygon')[0]){
            	            	var existingControl=map.getControlsBy('itemMesureType','polygon')[0];
            	            	existingControl.deactivate();
            	            	existingControl.destroy();
            	            }
        	            	if (map.getControlsBy('itemMesureType','RegularPolygon')[0]){
            	            	var existingControl=map.getControlsBy('itemMesureType','RegularPolygon')[0];
            	            	existingControl.deactivate();
            	            	existingControl.destroy();
            	            }
        	            	var existingControl=map.getControlsBy('itemMesureType','path')[0];
        	            	existingControl.activate();
        	            }
        	            else{
        	            	if (map.getControlsBy('itemMesureType','polygon')[0]){
            	            	var existingControl=map.getControlsBy('itemMesureType','polygon')[0];
            	            	existingControl.deactivate();
            	            	existingControl.destroy();
            	            }
        	            	if (map.getControlsBy('itemMesureType','RegularPolygon')[0]){
            	            	var existingControl=map.getControlsBy('itemMesureType','RegularPolygon')[0];
            	            	existingControl.deactivate();
            	            	existingControl.destroy();
            	            }
            	            var cMeasure = new OpenLayers.Control.DynamicMeasure(OpenLayers.Handler.Path);
            	            cMeasure.itemMesureType='path';
            	            cMeasure.events.on({
                                "measure": mapController.handleMeasurements,
                                "measurepartial": mapController.handleMeasurements
                            });
            	            cMeasure.setImmediate(true);
            	            map.addControl(cMeasure);
            	            cMeasure.activate();
        	            }
            	  }

                }]
            	},{
            		xtype:'panel',
                	itemId:'measurePanel',
                	header:false,
                	bodyPadding: 5,
                	flex:2,
                	html:'<center><p><h5>Click on a button to draw in the map.</h5></p><p><h5>To finish just close this window.</h5></p></center>'
                }

            ]);
            genericWindow.on("close", mapController.onDrawClose, this);
        }
    },
    onDrawClose: function () {
    	if (map.getControlsBy('itemMesureType','polygon')[0]){
        	var existingControl=map.getControlsBy('itemMesureType','polygon')[0];
        	existingControl.deactivate();
        	existingControl.destroy();
        }
    	if (map.getControlsBy('itemMesureType','path')[0]){
        	var existingControl=map.getControlsBy('itemMesureType','path')[0];
        	existingControl.deactivate();
        	existingControl.destroy();
        }
    	if (map.getControlsBy('itemMesureType','RegularPolygon')[0]){
        	var existingControl=map.getControlsBy('itemMesureType','RegularPolygon')[0];
        	existingControl.deactivate();
        	existingControl.destroy();
        }
    },
    offClickDraw: function (mapPanel, options) {


    },

    onLayerTreePanelBeforeRender: function (layertree2) {

        layertree = layertree2;
        var treeConfigYear, treeConfigMonth, treeConfigHeight;

    },

    onLayerTreePanelBeforeRender: function (layertree2) {

        layertree = layertree2;
        var treeConfigYear, treeConfigMonth, treeConfigHeight;

    },

    onLaunch: function () {
        ctrl = this;
        mapController.onstar();
    }
});
