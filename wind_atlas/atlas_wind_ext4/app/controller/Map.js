/**
 * Map controller
 * Used to manage map layers and showing their related views
 */
Ext.define('AM.controller.Map', {
    extend: 'Ext.app.Controller',
    views: ['Windinfo', 'chart.Window', 'genericWindow'],
    //    requires: ['AM.view.Layertreepanel'],

    init: function () {


        mapController = this;
        this.control({
            'mappanel': {
            	'afterlayout':this.onMapPanelAfterLayout,
                'beforerender': this.onMapPanelBeforeRender,
                'onClickActive': this.onClickActive,
                'onClickDeactivate': this.onClickDeactivate,
                'onClickDraw': this.onClickDraw,
                'offClickDraw': this.offClickDraw,
                'onClickPixel': this.onClickPixel
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
    
    pixelChartGetNames: function (id) {
        function get_month_name(month){
    		var month_names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    		return month_names[parseInt(month)-1];
    	};
    	var arrayId = id.split('_');
    	var name='';
    	if (arrayId[3].length==2){
    		console.log(get_month_name(arrayId[3])+' at '+arrayId[2].split('m')[0]+' m');
    		name=get_month_name(arrayId[3])+' at '+arrayId[2].split('m')[0]+' m';
    	}
    	else if (arrayId[3].length==4){
    		console.log(arrayId[3]+' at '+arrayId[2].split('m')[0]+' m');
    		name=arrayId[3]+' at '+arrayId[2].split('m')[0]+' m';
    	}
    	else if (arrayId[3].length==6 && !(arrayId[3]=='annual')){
    		console.log(get_month_name(arrayId[3].substr(4, 2))+ ' '+arrayId[3].substr(0, 4)+' at '+arrayId[2].split('m')[0]+' m');
    		name=get_month_name(arrayId[3].substr(4, 2))+ ' '+arrayId[3].substr(0, 4)+' at '+arrayId[2].split('m')[0]+' m';
    	}
    	else if (arrayId[3]=='annual'){
    		console.log(arrayId[2].split('m')[0]+' m'+' Annual');
    		name=arrayId[2].split('m')[0]+' m'+' Annual';
    	}
    	
    	return name;
    },

    onClickPixel: function () {
        var panelviewport = Ext.ComponentQuery.query('viewport panel[itemId=p1]')[0];
        var chartWindow = mapController.getView('chart.Window').create();
        chartWindow.animateTarget = 'viewwindinfo';
        chartWindow.html='<div style="font-family:verdana;color:grey;"><center><h3>Wind Speed Values Chart</h3><h4>To view the chart:</h4><br>Click on the desired pixel on the map to view the data value of the checked layer or layers in format of a chart.</center><br><br><b> Note:</b> the chart is built on the fly and only one location at a time can be shown.</div>';
        chartWindow.modal=false;
        chartWindow.itemId='pixelChartWindow';
        chartWindow.remove(Ext.ComponentQuery.query('[itemId=chartWindowClose]')[0]);
        chartWindow.header=true;
        chartWindow.draggable=true;
        chartWindow.on({
    	    close: mapController.onClickPixelDeactivate
        });
        chartWindow.show();
        panelviewport.add(chartWindow);
        Ext.WindowManager.register(chartWindow);
        Ext.WindowManager.bringToFront(chartWindow);
        
        
        
    	if (map.getControlsBy('type','WMSGetFeatureInfo')[0]){
            var existingControl=map.getControlsBy('type','WMSGetFeatureInfo')[0];
            existingControl.activate();
    	}else{
    		var layersGetInfo = [];
    		var layersWMS=map.getLayersByClass("OpenLayers.Layer.WMS");
    		var index;
    		for (index = 0; index < layersWMS.length; ++index) {
    		    if (!layersWMS[index].auxMaps)
    		    {
    		    	layersGetInfo.push(layersWMS[index]);
    		    	}
    		}
    		
            info = new OpenLayers.Control.WMSGetFeatureInfo({
                url: 'http://atlas.masdar.ac.ae:8080/geoserver/wind/wms',
                title: 'Identify features by clicking',
                layers: layersGetInfo,
                queryVisible: true,
                infoFormat: "text/html",
                maxFeatures: 12,
                eventListeners: {
                    getfeatureinfo: function(event) {
                    	var count=0;
                    	var layersWMS=map.getLayersByClass("OpenLayers.Layer.WMS");
                    	for(var i=0;i<layersWMS.length;i++)
                    	{
                    		if (layersWMS[i].visibility && !layersWMS[i].auxMaps ) {
                    			count++;
                    		}
                    	}
                    	if (count > 12) {
                    		var chartWindow = Ext.ComponentQuery.query('[itemId=pixelChartWindow]')[0];
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
    		            	            value=mapController.formatChartNumber($(element).text());
    		            	            data.push([mapController.pixelChartGetNames(id), value]);
//    		            	            console.log(id);
//    		            	            mapController.pixelChartGetNames(id);
    	            	        });
    	            	    });
    	            	    afeatureInfo[section] = obj;
    	            	});
    	            	var json={
    	                        chart: {
    	                            type: 'column'
    	                        },
    	                        title: {
    	                            text: 'Wind Speed Values Chart'
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
    	                                text: '<p> m/s</p>'
    	                            }
    	                        },
    							credits: {
    					  		    enabled: false
    						  	},
    	                        legend: {
    	                            enabled: false
    	                        },
    	                        tooltip: {
    	                            pointFormat: '<b>{point.y:.1f} m/s</b>',
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
    	            	mapController.onChartPixelActivate(json,'panel-1078-innerCt');
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
            map.events.register('click', map, mapController.handlePixelMapClick);
            clickLat = null;
            clickLon = null;

        } else {
            markers.setVisibility(true);
            map.events.register('click', map, mapController.handlePixelMapClick);
        }

//        mapController.openWinInfoForm(clickLat, clickLon);
        //Here i can put something to tell the user to click in the map!
    },
    formatChartNumber: function (number2) {
    	number = parseFloat(number2);
    	finalNumber = Math.round(10*number)/10;
    	return finalNumber;
    },
    handlePixelMapClick: function (e) {

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
    },
    onClickPixelDeactivate: function () {
    	var viewwindinfo= Ext.ComponentQuery.query('[itemId=viewwindinfo]')[0];
    	if (!viewwindinfo.pressed) {
    		markers.setVisibility(false);
    	}
//        markers.setVisibility(false);
        map.events.unregister('click', map, mapController.handlePixelMapClick);
        var existingControl=map.getControlsBy('type','WMSGetFeatureInfo')[0];
        existingControl.deactivate();
    },
    onChartPixelActivate: function (json, targetId) {

  	var chartWindow=Ext.ComponentQuery.query('[itemId=pixelChartWindow]')[0];
  	chartWindow.update('');
  	//no caso de ja la estar um grafico tenho de remover o que ja existe
  	if (Ext.ComponentQuery.query('[itemId=chart1]')[0]){
  		var existingCharts=Ext.ComponentQuery.query('[itemId=chart1]');
  		existingCharts.forEach(function(entry) {
  			var existingChart=entry;
  			existingChart.destroy();
  		});
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
    
    onMapPanelAfterLayout: function (mapPanel, options) {
    	
    	//add the flashing statistics panel
    	mapController.statisticsFlashPanel();
//    	mapController.onstar();
   },
   
   statisticsFlashPanel: function () {
 
	   		if(Ext.ComponentQuery.query('[itemId=statInfoFlash]')[0]){
	   			var statInfo=Ext.ComponentQuery.query('[itemId=statInfoFlash]')[0];
	    	   	     var a=Ext.ComponentQuery.query('headerMain [itemId=middlePanel]')[0];
	    	   	     var windButton=Ext.ComponentQuery.query('[itemId=viewwindinfo]')[0];
	    	   	     var x=windButton.getX();
	    	   	      statInfo.setX(x+15);
	    	   	      statInfo.setY(90);
	   		}else {
	   	       var statInfo=Ext.create('Ext.panel.Panel', {
	   	   	    html: 'Data statistics, analysis and report',
	   	        width: 350,
	   	        itemId:'statInfoFlash',
	   	        height: 40,
	   	       	border: true,
	   	       	baseCls: "windAtlas"
	   	   	});
	   	     var a=Ext.ComponentQuery.query('headerMain [itemId=middlePanel]')[0];
	   	     var windButton=Ext.ComponentQuery.query('[itemId=viewwindinfo]')[0];
	   	     var x=windButton.getX();
	   	      a.add(statInfo);
	   	      statInfo.setX(x+15);
	   	      statInfo.setY(90);
	   	      setTimeout(function(){statInfo.setVisible(false)},2000);
	   	      setTimeout(function(){statInfo.setVisible(true)},2500);
	   	      setTimeout(function(){statInfo.setVisible(false)},3000);
	   	      setTimeout(function(){statInfo.setVisible(true)},3500);
	   	      setTimeout(function(){
	   		    	var panel=Ext.ComponentQuery.query('headerMain [itemId=middlePanel]')[0];
	   		    	var statInfo=Ext.ComponentQuery.query('headerMain [itemId=statInfoFlash]')[0];
	   		    	panel.remove(statInfo);
	   	      }, 10000);
	   		}
  },

    handleMapClick: function (e) {

        var lonlat = map.getLonLatFromViewPortPx(e.xy);
        var position = map.getLonLatFromPixel(e.xy);
        lonlat.transform('EPSG:3857', 'EPSG:4326');

        // get the latitude and longitude after a click
        clickLon = Math.round(lonlat.lon * 100000) / 100000;
        clickLat = Math.round(lonlat.lat * 100000) / 100000;

        var size = new OpenLayers.Size(40, 40);
        //         var offset = new OpenLayers.Pixel(-(size.w/2), -size.h);
        var icon = new OpenLayers.Icon('resources/images/button.gif', size);
        //         var markerslayer = map.getLayer('markers');
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

        	mapController.openWinInfoForm(clickLat, clickLon);

    },

    openWinInfoForm: function (clickLat, clickLon) {
        var windowInfo = Ext.ComponentQuery.query('windinfo')[0];
        var windowInfoForm = Ext.ComponentQuery.query('windinfoForm')[0];

        if (!Ext.ComponentQuery.query('windinfoForm textfield[itemId=f1]')[0]) {
            if (clickLat && clickLon){
            	clickLat=clickLat.toFixed(3);
            	clickLon=clickLon.toFixed(3);
            }
           var field1 = Ext.create('Ext.form.field.Text', {
                itemId: 'f1',
                fieldLabel: 'Latitude',
                name: 'latitude',
                allowBlank: false
            });
           var field2 = Ext.create('Ext.form.field.Text', {
                itemId: 'f2',
                fieldLabel: 'Longitude',
                name: 'longitude',
                allowBlank: false
            });
            
            var field3= Ext.create('Ext.Panel', {
            	border:false,
            	anchor: '100%',
            	layout: {
            		type: 'hbox',
            		align: 'stretch'
            	},
            	items: [
            	        {
            	        	xtype:'datefield',
                            itemId: 'f3',
                            id: 'f3',
            	        	width : 170,
            	        	labelWidth: 60,
                            fieldLabel: 'From',
                            format: 'Y/m/d',
                            name: 'initial_date',
                            value: '2003/01/01',
            	        	maxValue:'2003/12/31',
            	        	minValue:'2003/01/01',
                            endDateField: 'f4',
                            listeners: {
                                'change': function (th, a) {
                                    Ext.getCmp('f4').setMinValue(a);
                                }
                            },
                            allowBlank: false
            	        },
            	        {
            	        	xtype:'timefield',
                        	width : 60,
                        	name: 'initial_time',
                        	format: 'H',
                            minValue: '00',
                            maxValue: '24',
                            increment: 60,
                            value:'00',
                            allowBlank: false
                            },
                            {
                                xtype: 'label',
                                text: 'UTC',
                                margin: '4 0 0 3'
                            }
            	        ]
            });   

            var field4= Ext.create('Ext.Panel', {
            	border:false,
            	anchor: '100%',
            	layout: {
            		type: 'hbox',
            		align: 'stretch'
            	},
            	items: [
            	        {
            	        	xtype:'datefield',
            	        	itemId: 'f4',
            	        	id: 'f4',
            	        	width : 170,
            	        	labelWidth: 60,
            	        	fieldLabel: 'To',
            	        	format: 'Y/m/d',
            	        	value: '2003/06/30',
            	        	name: 'final_date',
            	        	maxValue:'2003/12/31',
            	        	minValue:'2003/01/01',
            	        	startDateField: 'f3',
            	        	listeners: {
            	        		'change': function (th, a) {
            	        			Ext.getCmp('f3').setMaxValue(a);
            	        		}
            	        	},
            	        	allowBlank: false
            	        },
            	        {
            	        	xtype:'timefield',
                        	width : 60,
                        	name: 'in',
                        	format: 'H',
                            minValue: '00',
                            maxValue: '24',
                            increment: 60,
                        	name: 'final_time',
                            value:'23',
                            allowBlank: false
                            },
                            {
                                xtype: 'label',
                                text: 'UTC',
                                margin: '4 0 0 3'
                            }
            	        ]
            });
         	   
            windowInfoForm.add(field1);
            /*
             * The values are here because if you put them when you
             * create the fields, when we do a form reset it will put the first coordinate
             * and will not clear the field!!!
             *
             */
            field1.setValue(clickLat);
            windowInfoForm.add(field2);
            field2.setValue(clickLon);
            windowInfoForm.add(field3);
            windowInfoForm.add(field4);

            var submitbutton = Ext.ComponentQuery.query('windinfoForm button[itemId=windfinfoFormSubmitButton]')[0];
            submitbutton.setHandler(function () {
                Ext.ComponentQuery.query('windinfoResult')[0].setLoading(true);
                loginController.initCheckLogin();
                var form = this.up('form').getForm();
                if (form.isValid()) {
                	submitbutton.setDisabled(true);
                    form.submit({
                        success: function (form, action) {
                            Ext.ComponentQuery.query('windinfoResult')[0].setLoading(false);
                            mapController.openWinInfo(action.result.msg1, 'windinfoResultTab1', 'Wind roses');
                            mapController.openWinInfo(action.result.msg2, 'windinfoResultTab2', 'Wind speed charts');
                            mapController.openWinInfo(action.result.msg3, 'windinfoResultTab3', 'Report');
                            Ext.ComponentQuery.query('windinfoForm button[itemId=windfinfoFormSubmitButton]')[0].setDisabled(false);
                        },
                        failure: function (form, action) {
                            Ext.ComponentQuery.query('windinfoResult')[0].setLoading(false);
                            Ext.ComponentQuery.query('windinfoForm button[itemId=windfinfoFormSubmitButton]')[0].setDisabled(false);
                            if(typeof(action.result)!='undefined'){
                                mapController.openWinInfo(action.result.msg1, 'windinfoResultTab1', 'Error');
                                mapController.openWinInfo(action.result.msg2, 'windinfoResultTab2', 'Server Response');
                                mapController.openWinInfo('', 'windinfoResultTab3', '',true); // hide this tab
                                if(!action.result.msg2){
                                	mapController.openWinInfo('', 'windinfoResultTab2', '',true); // hide this tab
                                }
                            }
                            else{
                                mapController.openWinInfo('No server response! Please try again later!', 'windinfoResultTab1', 'Error');
                                mapController.openWinInfo('', 'windinfoResultTab2', '',true); // hide this tab
                                mapController.openWinInfo('', 'windinfoResultTab3', '',true); // hide this tab
                            }
                            
                        }
                    });
                }
            });
        } else {
            if (clickLat && clickLon){
            	clickLat=clickLat.toFixed(3);
            	clickLon=clickLon.toFixed(3);
            }
            var lat = Ext.ComponentQuery.query('windinfoForm textfield[itemId=f1]')[0];
            lat.setValue(clickLat);
            var long = Ext.ComponentQuery.query('windinfoForm textfield[itemId=f2]')[0];
            long.setValue(clickLon);
        }
        windowInfo.show();
        windowInfoForm.show();
    },


    openWinInfo: function (msg, tab, tabTitle,hide) {

        var windowResultTab = Ext.getCmp(tab);
        windowResultTab.setTitle(tabTitle);
        windowResultTab.tab.show();
        windowResultTab.update(msg, true);
    	if(hide){
    	windowResultTab.tab.hide();
    	}

    },
    onClickActive: function () {
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

        mapController.openWinInfoForm(clickLat, clickLon);
    },

    onClickDeactivate: function () {
        var windowInfo = Ext.ComponentQuery.query('windinfo')[0];
        windowInfo.hide();
        var chartWindow= Ext.ComponentQuery.query('[itemId=pixelChartWindow]')[0];
        if (typeof chartWindow == "undefined"){
        	markers.setVisibility(false);
        }
        map.events.unregister('click', map, mapController.handleMapClick);
    },
    onChartActivate: function (json, targetId) {

        var panelviewport = Ext.ComponentQuery.query('viewport panel[itemId=p1]')[0];
        var chartWindow = mapController.getView('chart.Window').create();
        chartWindow.animateTarget = targetId;
        chartWindow.show();
        panelviewport.add(chartWindow);
        Ext.WindowManager.register(chartWindow);
        Ext.WindowManager.bringToFront(chartWindow);
        testejson=json;
        chartWindow.add([{
            xtype: 'highchart',
            itemId: 'chart1',
            initAnimAfterLoad: false,
            chartConfig: json
        }]);

    },
    handleMeasurements: function (event) {
    	a=event;
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
        //    	var size=map.getSize();
        //    	mapwidth=size.w;
        //        map.addControl(
        //                new OpenLayers.Control.MousePosition({
        //                    prefix: '<div style=\"color: black; font-size: 12px;padding-left: 40%; width:'+mapwidth+'px; align: center;\">Coordinates: ',
        //                    suffix: '</div>',
        //                    separator: ' | ',
        //                    numDigits: 3,
        //                    emptyString: 'Mouse is not over map.'
        //                })
        //            );
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
        mapController.onstar();
    }
});
