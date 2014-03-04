format = 'image/png8';

function orderLayers(map2) {
//	console.log(map2.layers.length);
	
	for (var counter = 5; counter < map2.layers.length; ++counter) {
		x=map2.layers[counter].element;
//		console.log(x);
//		map2.setLayerIndex(x, 120);
	}	
}

function baseLayers(map2) {
	
	var osm = new OpenLayers.Layer.OSM("Open Street Map");
	
	var hybrid = new OpenLayers.Layer.Google(
        "Google Hybrid",
        {type: google.maps.MapTypeId.HYBRID, numZoomLevels: 22}
	);
	var physical = new OpenLayers.Layer.Google(
        "Google Physical",
        {type: google.maps.MapTypeId.TERRAIN, numZoomLevels: 22}
    );
    var streets = new OpenLayers.Layer.Google(
        "Google Streets", // the default
        {type: google.maps.MapTypeId.STREET, numZoomLevels: 20}
    );
    var satellite = new OpenLayers.Layer.Google(
        "Google Satellite",
        {type: google.maps.MapTypeId.SATELLITE, numZoomLevels: 22}
    );
    
    map2.addLayers([streets, hybrid, physical, satellite, osm]);
    
//    return layers;
}

function contextLayers(map2){
	
	uae_emirates = new OpenLayers.Layer.WMS("United Arab Emirates Boundary",
			geoserverUrl, {
			Layers: "masdar:uae_emirates",
//			STYLES: '',
			format: format,
			tiled: true,
			transparent: true,
			tilesOrigin : map2.maxExtent.left + ',' + map2.maxExtent.bottom
		},
		{
			buffer: 0,
			displayOutsideMaxExtent: true,
			ratio: 1,
			opacity: 1,
			visibility: false
		} 
	);
	
	qatar = new OpenLayers.Layer.WMS("Qatar Boundary",
			geoserverUrl, {
			Layers: "masdar:qatar",
//			STYLES: '',
			format: format,
			tiled: true,
			transparent: true,
			tilesOrigin : map2.maxExtent.left + ',' + map2.maxExtent.bottom
		},
		{
			buffer: 0,
			displayOutsideMaxExtent: true,
			ratio: 1,
			opacity: 1,
			visibility: false
		} 
	);
	
}


function yearlyLayers(map2) {
	
	DHI2006_yearly = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2006",
			geoserverUrl, {
				Layers: "masdar:2006_yearly_dhi",
				format: format,
				tiled: true,
				transparent: true,
				tilesOrigin : map2.maxExtent.left + ',' + map2.maxExtent.bottom
			},
			{
				buffer: 0,
				displayOutsideMaxExtent: true,
				ratio: 1,
				opacity: 1,
				visibility: false
			} 
	);

	DNI2006_yearly = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2006",
			geoserverUrl, {
		        layers: "masdar:2006_yearly_dni",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map2.maxExtent.left + ',' + map2.maxExtent.bottom
		    }, {
                buffer: 0,
                isBaseLayer: false,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2006_yearly = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2006",
			geoserverUrl, {
    			Layers: "masdar:2006_yearly_ghi",
    			format: format,
    			tiled: true,
    			transparent: true,
    			tilesOrigin : map2.maxExtent.left + ',' + map2.maxExtent.bottom
    		},
    		{
    			buffer: 0,
    			displayOutsideMaxExtent: true,
    			ratio: 1,
    			opacity: 1,
    			visibility: false
    		} 
    	);
	
	DHI2008_yearly = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2008",
			geoserverUrl, {
				Layers: "masdar:2008_yearly_dhi",
				format: format,
				tiled: true,
				transparent: true,
				tilesOrigin : map2.maxExtent.left + ',' + map2.maxExtent.bottom
			},
			{
				buffer: 0,
				displayOutsideMaxExtent: true,
				ratio: 1,
				opacity: 1,
				visibility: false
			} 
	);

	DNI2008_yearly = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2008",
			geoserverUrl, {
		        layers: "masdar:2008_yearly_dni",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map2.maxExtent.left + ',' + map2.maxExtent.bottom
		    }, {
                buffer: 0,
                isBaseLayer: false,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2008_yearly = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2008",
			geoserverUrl, {
    			Layers: "masdar:2008_yearly_ghi",
    			format: format,
    			tiled: true,
    			transparent: true,
    			tilesOrigin : map2.maxExtent.left + ',' + map2.maxExtent.bottom
    		},
    		{
    			buffer: 0,
    			displayOutsideMaxExtent: true,
    			ratio: 1,
    			opacity: 1,
    			visibility: false
    		} 
    	);
	
	DHI2009_yearly = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2009",
			geoserverUrl, {
		        layers: "masdar:2009_yearly_dhi",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map2.maxExtent.left + ',' + map2.maxExtent.bottom
		    }, {
                buffer: 0,
                isBaseLayer: false,
//                group: 'All Layers/2009',
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DNI2009_yearly = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2009",
			geoserverUrl, {
		        layers: "masdar:2009_yearly_dni",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map2.maxExtent.left + ',' + map2.maxExtent.bottom
		    }, {
                buffer: 0,
                isBaseLayer: false,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2009_yearly = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2009",
			geoserverUrl, {
		        layers: "masdar:2009_yearly_ghi",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map2.maxExtent.left + ',' + map2.maxExtent.bottom
		    }, {
                buffer: 0,
                isBaseLayer: false,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2010_yearly = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2010",
			geoserverUrl, {
		        layers: "masdar:2010_yearly_dhi",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map2.maxExtent.left + ',' + map2.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DNI2010_yearly = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2010",
			geoserverUrl, {
		        layers: "masdar:2010_yearly_dni",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map2.maxExtent.left + ',' + map2.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2010_yearly = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2010",
			geoserverUrl, {
		        layers: "masdar:2010_yearly_ghi",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map2.maxExtent.left + ',' + map2.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2011_yearly = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2011",
			geoserverUrl, {
		        layers: "masdar:2011_yearly_dhi",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map2.maxExtent.left + ',' + map2.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DNI2011_yearly = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2011",
			geoserverUrl, {
		        layers: "masdar:2011_yearly_dni",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map2.maxExtent.left + ',' + map2.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2011_yearly = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2011",
			geoserverUrl, {
		        layers: "masdar:2011_yearly_ghi",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map2.maxExtent.left + ',' + map2.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2012_yearly = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2012",
			geoserverUrl, {
		        layers: "masdar:2012_yearly_dhi",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map2.maxExtent.left + ',' + map2.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DNI2012_yearly = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2012",
			geoserverUrl, {
		        layers: "masdar:2012_yearly_dni",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map2.maxExtent.left + ',' + map2.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2012_yearly = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2012",
			geoserverUrl, {
		        layers: "masdar:2012_yearly_ghi",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map2.maxExtent.left + ',' + map2.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
}

function monthlyLayers2004(map2) {
	
	DNI2004_apr = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2004 April",
			geoserverUrl, {
		        layers: "masdar:2004_DNI_apr",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DNI2004_may = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2004 May",
			geoserverUrl, {
		        layers: "masdar:2004_DNI_may",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DNI2004_jun = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2004 June",
			geoserverUrl, {
		        layers: "masdar:2004_DNI_jun",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DNI2004_jul = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2004 July",
			geoserverUrl, {
		        layers: "masdar:2004_DNI_jul",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DNI2004_aug = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2004 August",
			geoserverUrl, {
		        layers: "masdar:2004_DNI_aug",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DNI2004_sep = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2004 September",
			geoserverUrl, {
		        layers: "masdar:2004_DNI_sep",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	DNI2004_oct = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2004 October",
			geoserverUrl, {
		        layers: "masdar:2004_DNI_oct",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DNI2004_nov = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2004 November",
			geoserverUrl, {
		        layers: "masdar:2004_DNI_nov",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DNI2004_dec = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2004 December",
			geoserverUrl, {
		        layers: "masdar:2004_DNI_dec",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2004_apr = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2004 April",
			geoserverUrl, {
		        layers: "masdar:2004_DHI_apr",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2004_may = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2004 May",
			geoserverUrl, {
		        layers: "masdar:2004_DHI_may",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2004_jun = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2004 June",
			geoserverUrl, {
		        layers: "masdar:2004_DHI_jun",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2004_jul = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2004 July",
			geoserverUrl, {
		        layers: "masdar:2004_DHI_jul",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2004_aug = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2004 August",
			geoserverUrl, {
		        layers: "masdar:2004_DHI_aug",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2004_sep = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2004 September",
			geoserverUrl, {
		        layers: "masdar:2004_DHI_sep",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	DHI2004_oct = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2004 October",
			geoserverUrl, {
		        layers: "masdar:2004_DHI_oct",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2004_nov = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2004 November",
			geoserverUrl, {
		        layers: "masdar:2004_DHI_nov",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2004_dec = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2004 December",
			geoserverUrl, {
		        layers: "masdar:2004_DHI_dec",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2004_apr = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2004 April",
			geoserverUrl, {
		        layers: "masdar:2004_GHI_apr",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2004_may = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2004 May",
			geoserverUrl, {
		        layers: "masdar:2004_GHI_may",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2004_jun = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2004 June",
			geoserverUrl, {
		        layers: "masdar:2004_GHI_jun",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2004_jul = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2004 July",
			geoserverUrl, {
		        layers: "masdar:2004_GHI_jul",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2004_aug = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2004 August",
			geoserverUrl, {
		        layers: "masdar:2004_GHI_aug",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2004_sep = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2004 September",
			geoserverUrl, {
		        layers: "masdar:2004_GHI_sep",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	GHI2004_oct = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2004 October",
			geoserverUrl, {
		        layers: "masdar:2004_GHI_oct",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2004_nov = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2004 November",
			geoserverUrl, {
		        layers: "masdar:2004_GHI_nov",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2004_dec = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2004 December",
			geoserverUrl, {
		        layers: "masdar:2004_GHI_dec",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
}

function monthlyLayers2005(map2) {
	
	DNI2005_jan = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2005 January",
			geoserverUrl, {
		        layers: "masdar:2005_DNI_jan",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DNI2005_feb = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2005 February",
			geoserverUrl, {
		        layers: "masdar:2005_DNI_feb",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DNI2005_mar = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2005 March",
			geoserverUrl, {
		        layers: "masdar:2005_DNI_mar",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DNI2005_apr = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2005 April",
			geoserverUrl, {
		        layers: "masdar:2005_DNI_apr",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DNI2005_may = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2005 May",
			geoserverUrl, {
		        layers: "masdar:2005_DNI_may",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DNI2005_jun = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2005 June",
			geoserverUrl, {
		        layers: "masdar:2005_DNI_jun",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DNI2005_jul = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2005 July",
			geoserverUrl, {
		        layers: "masdar:2005_DNI_jul",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DNI2005_aug = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2005 August",
			geoserverUrl, {
		        layers: "masdar:2005_DNI_aug",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DNI2005_sep = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2005 September",
			geoserverUrl, {
		        layers: "masdar:2005_DNI_sep",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2005_jan = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2005 january",
			geoserverUrl, {
		        layers: "masdar:2005_DHI_jan",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2005_feb = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2005 February",
			geoserverUrl, {
		        layers: "masdar:2005_DHI_feb",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2005_mar = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2005 March",
			geoserverUrl, {
		        layers: "masdar:2005_DHI_mar",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2005_apr = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2005 April",
			geoserverUrl, {
		        layers: "masdar:2005_DHI_apr",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2005_may = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2005 May",
			geoserverUrl, {
		        layers: "masdar:2005_DHI_may",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2005_jun = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2005 June",
			geoserverUrl, {
		        layers: "masdar:2005_DHI_jun",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2005_jul = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2005 July",
			geoserverUrl, {
		        layers: "masdar:2005_DHI_jul",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2005_aug = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2005 August",
			geoserverUrl, {
		        layers: "masdar:2005_DHI_aug",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2005_sep = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2005 September",
			geoserverUrl, {
		        layers: "masdar:2005_DHI_sep",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2005_jan = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2005 January",
			geoserverUrl, {
		        layers: "masdar:2005_GHI_jan",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2005_feb = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2005 February",
			geoserverUrl, {
		        layers: "masdar:2005_GHI_feb",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2005_mar = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2005 March",
			geoserverUrl, {
		        layers: "masdar:2005_GHI_mar",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2005_apr = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2005 April",
			geoserverUrl, {
		        layers: "masdar:2005_GHI_apr",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2005_may = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2005 May",
			geoserverUrl, {
		        layers: "masdar:2005_GHI_may",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2005_jun = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2005 June",
			geoserverUrl, {
		        layers: "masdar:2005_GHI_jun",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2005_jul = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2005 July",
			geoserverUrl, {
		        layers: "masdar:2005_GHI_jul",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2005_aug = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2005 August",
			geoserverUrl, {
		        layers: "masdar:2005_GHI_aug",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2005_sep = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2005 September",
			geoserverUrl, {
		        layers: "masdar:2005_GHI_sep",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
}

function monthlyLayers2006(map2) {
	
	DNI2006_jan = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2006 January",
			geoserverUrl, {
		        layers: "masdar:2006_DNI_jan",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DNI2006_feb = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2006 February",
			geoserverUrl, {
		        layers: "masdar:2006_DNI_feb",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DNI2006_mar = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2006 March",
			geoserverUrl, {
		        layers: "masdar:2006_DNI_mar",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DNI2006_apr = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2006 April",
			geoserverUrl, {
		        layers: "masdar:2006_DNI_apr",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DNI2006_may = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2006 May",
			geoserverUrl, {
		        layers: "masdar:2006_DNI_may",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DNI2006_jun = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2006 June",
			geoserverUrl, {
		        layers: "masdar:2006_DNI_jun",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DNI2006_jul = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2006 July",
			geoserverUrl, {
		        layers: "masdar:2006_DNI_jul",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DNI2006_aug = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2006 August",
			geoserverUrl, {
		        layers: "masdar:2006_DNI_aug",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DNI2006_sep = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2006 September",
			geoserverUrl, {
		        layers: "masdar:2006_DNI_sep",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	DNI2006_oct = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2006 October",
			geoserverUrl, {
		        layers: "masdar:2006_DNI_oct",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DNI2006_nov = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2006 November",
			geoserverUrl, {
		        layers: "masdar:2006_DNI_nov",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DNI2006_dec = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2006 December",
			geoserverUrl, {
		        layers: "masdar:2006_DNI_dec",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2006_jan = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2006 january",
			geoserverUrl, {
		        layers: "masdar:2006_DHI_jan",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2006_feb = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2006 February",
			geoserverUrl, {
		        layers: "masdar:2006_DHI_feb",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2006_mar = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2006 March",
			geoserverUrl, {
		        layers: "masdar:2006_DHI_mar",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2006_apr = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2006 April",
			geoserverUrl, {
		        layers: "masdar:2006_DHI_apr",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2006_may = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2006 May",
			geoserverUrl, {
		        layers: "masdar:2006_DHI_may",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2006_jun = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2006 June",
			geoserverUrl, {
		        layers: "masdar:2006_DHI_jun",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2006_jul = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2006 July",
			geoserverUrl, {
		        layers: "masdar:2006_DHI_jul",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2006_aug = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2006 August",
			geoserverUrl, {
		        layers: "masdar:2006_DHI_aug",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2006_sep = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2006 September",
			geoserverUrl, {
		        layers: "masdar:2006_DHI_sep",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	DHI2006_oct = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2006 October",
			geoserverUrl, {
		        layers: "masdar:2006_DHI_oct",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2006_nov = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2006 November",
			geoserverUrl, {
		        layers: "masdar:2006_DHI_nov",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2006_dec = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2006 December",
			geoserverUrl, {
		        layers: "masdar:2006_DHI_dec",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2006_jan = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2006 January",
			geoserverUrl, {
		        layers: "masdar:2006_GHI_jan",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2006_feb = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2006 February",
			geoserverUrl, {
		        layers: "masdar:2006_GHI_feb",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2006_mar = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2006 March",
			geoserverUrl, {
		        layers: "masdar:2006_GHI_mar",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2006_apr = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2006 April",
			geoserverUrl, {
		        layers: "masdar:2006_GHI_apr",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2006_may = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2006 May",
			geoserverUrl, {
		        layers: "masdar:2006_GHI_may",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2006_jun = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2006 June",
			geoserverUrl, {
		        layers: "masdar:2006_GHI_jun",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2006_jul = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2006 July",
			geoserverUrl, {
		        layers: "masdar:2006_GHI_jul",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2006_aug = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2006 August",
			geoserverUrl, {
		        layers: "masdar:2006_GHI_aug",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2006_sep = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2006 September",
			geoserverUrl, {
		        layers: "masdar:2006_GHI_sep",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	GHI2006_oct = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2006 October",
			geoserverUrl, {
		        layers: "masdar:2006_GHI_oct",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2006_nov = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2006 November",
			geoserverUrl, {
		        layers: "masdar:2006_GHI_nov",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2006_dec = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2006 December",
			geoserverUrl, {
		        layers: "masdar:2006_GHI_dec",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
}

function monthlyLayers2008(map2) {
	
	DNI2008_jan = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2008 January",
			geoserverUrl, {
		        layers: "masdar:2008_DNI_jan",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DNI2008_feb = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2008 February",
			geoserverUrl, {
		        layers: "masdar:2008_DNI_feb",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DNI2008_mar = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2008 March",
			geoserverUrl, {
		        layers: "masdar:2008_DNI_mar",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DNI2008_apr = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2008 April",
			geoserverUrl, {
		        layers: "masdar:2008_DNI_apr",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DNI2008_may = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2008 May",
			geoserverUrl, {
		        layers: "masdar:2008_DNI_may",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DNI2008_jun = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2008 June",
			geoserverUrl, {
		        layers: "masdar:2008_DNI_jun",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DNI2008_jul = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2008 July",
			geoserverUrl, {
		        layers: "masdar:2008_DNI_jul",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DNI2008_aug = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2008 August",
			geoserverUrl, {
		        layers: "masdar:2008_DNI_aug",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DNI2008_sep = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2008 September",
			geoserverUrl, {
		        layers: "masdar:2008_DNI_sep",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	DNI2008_oct = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2008 October",
			geoserverUrl, {
		        layers: "masdar:2008_DNI_oct",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DNI2008_nov = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2008 November",
			geoserverUrl, {
		        layers: "masdar:2008_DNI_nov",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DNI2008_dec = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2008 December",
			geoserverUrl, {
		        layers: "masdar:2008_DNI_dec",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2008_jan = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2008 january",
			geoserverUrl, {
		        layers: "masdar:2008_DHI_jan",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2008_feb = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2008 February",
			geoserverUrl, {
		        layers: "masdar:2008_DHI_feb",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2008_mar = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2008 March",
			geoserverUrl, {
		        layers: "masdar:2008_DHI_mar",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2008_apr = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2008 April",
			geoserverUrl, {
		        layers: "masdar:2008_DHI_apr",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2008_may = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2008 May",
			geoserverUrl, {
		        layers: "masdar:2008_DHI_may",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2008_jun = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2008 June",
			geoserverUrl, {
		        layers: "masdar:2008_DHI_jun",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2008_jul = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2008 July",
			geoserverUrl, {
		        layers: "masdar:2008_DHI_jul",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2008_aug = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2008 August",
			geoserverUrl, {
		        layers: "masdar:2008_DHI_aug",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2008_sep = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2008 September",
			geoserverUrl, {
		        layers: "masdar:2008_DHI_sep",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	DHI2008_oct = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2008 October",
			geoserverUrl, {
		        layers: "masdar:2008_DHI_oct",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2008_nov = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2008 November",
			geoserverUrl, {
		        layers: "masdar:2008_DHI_nov",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2008_dec = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2008 December",
			geoserverUrl, {
		        layers: "masdar:2008_DHI_dec",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2008_jan = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2008 January",
			geoserverUrl, {
		        layers: "masdar:2008_GHI_jan",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2008_feb = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2008 February",
			geoserverUrl, {
		        layers: "masdar:2008_GHI_feb",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2008_mar = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2008 March",
			geoserverUrl, {
		        layers: "masdar:2008_GHI_mar",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2008_apr = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2008 April",
			geoserverUrl, {
		        layers: "masdar:2008_GHI_apr",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2008_may = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2008 May",
			geoserverUrl, {
		        layers: "masdar:2008_GHI_may",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2008_jun = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2008 June",
			geoserverUrl, {
		        layers: "masdar:2008_GHI_jun",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2008_jul = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2008 July",
			geoserverUrl, {
		        layers: "masdar:2008_GHI_jul",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2008_aug = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2008 August",
			geoserverUrl, {
		        layers: "masdar:2008_GHI_aug",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2008_sep = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2008 September",
			geoserverUrl, {
		        layers: "masdar:2008_GHI_sep",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	GHI2008_oct = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2008 October",
			geoserverUrl, {
		        layers: "masdar:2008_GHI_oct",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2008_nov = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2008 November",
			geoserverUrl, {
		        layers: "masdar:2008_GHI_nov",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2008_dec = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2008 December",
			geoserverUrl, {
		        layers: "masdar:2008_GHI_dec",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
}

function monthlyLayers2009(map2) {
	
	DNI2009_jan = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2009 January",
			geoserverUrl, {
		        layers: "masdar:2009_DNI_jan",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DNI2009_feb = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2009 February",
			geoserverUrl, {
		        layers: "masdar:2009_DNI_feb",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DNI2009_mar = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2009 March",
			geoserverUrl, {
		        layers: "masdar:2009_DNI_mar",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DNI2009_apr = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2009 April",
			geoserverUrl, {
		        layers: "masdar:2009_DNI_apr",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DNI2009_may = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2009 May",
			geoserverUrl, {
		        layers: "masdar:2009_DNI_may",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DNI2009_jun = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2009 June",
			geoserverUrl, {
		        layers: "masdar:2009_DNI_jun",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DNI2009_jul = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2009 July",
			geoserverUrl, {
		        layers: "masdar:2009_DNI_jul",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DNI2009_aug = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2009 August",
			geoserverUrl, {
		        layers: "masdar:2009_DNI_aug",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DNI2009_sep = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2009 September",
			geoserverUrl, {
		        layers: "masdar:2009_DNI_sep",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	DNI2009_oct = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2009 October",
			geoserverUrl, {
		        layers: "masdar:2009_DNI_oct",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DNI2009_nov = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2009 November",
			geoserverUrl, {
		        layers: "masdar:2009_DNI_nov",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DNI2009_dec = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2009 December",
			geoserverUrl, {
		        layers: "masdar:2009_DNI_dec",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2009_jan = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2009 january",
			geoserverUrl, {
		        layers: "masdar:2009_DHI_jan",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2009_feb = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2009 February",
			geoserverUrl, {
		        layers: "masdar:2009_DHI_feb",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2009_mar = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2009 March",
			geoserverUrl, {
		        layers: "masdar:2009_DHI_mar",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2009_apr = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2009 April",
			geoserverUrl, {
		        layers: "masdar:2009_DHI_apr",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2009_may = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2009 May",
			geoserverUrl, {
		        layers: "masdar:2009_DHI_may",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2009_jun = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2009 June",
			geoserverUrl, {
		        layers: "masdar:2009_DHI_jun",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2009_jul = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2009 July",
			geoserverUrl, {
		        layers: "masdar:2009_DHI_jul",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2009_aug = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2009 August",
			geoserverUrl, {
		        layers: "masdar:2009_DHI_aug",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2009_sep = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2009 September",
			geoserverUrl, {
		        layers: "masdar:2009_DHI_sep",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	DHI2009_oct = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2009 October",
			geoserverUrl, {
		        layers: "masdar:2009_DHI_oct",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2009_nov = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2009 November",
			geoserverUrl, {
		        layers: "masdar:2009_DHI_nov",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2009_dec = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2009 December",
			geoserverUrl, {
		        layers: "masdar:2009_DHI_dec",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2009_jan = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2009 January",
			geoserverUrl, {
		        layers: "masdar:2009_GHI_jan",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2009_feb = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2009 February",
			geoserverUrl, {
		        layers: "masdar:2009_GHI_feb",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2009_mar = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2009 March",
			geoserverUrl, {
		        layers: "masdar:2009_GHI_mar",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2009_apr = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2009 April",
			geoserverUrl, {
		        layers: "masdar:2009_GHI_apr",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2009_may = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2009 May",
			geoserverUrl, {
		        layers: "masdar:2009_GHI_may",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2009_jun = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2009 June",
			geoserverUrl, {
		        layers: "masdar:2009_GHI_jun",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2009_jul = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2009 July",
			geoserverUrl, {
		        layers: "masdar:2009_GHI_jul",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2009_aug = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2009 August",
			geoserverUrl, {
		        layers: "masdar:2009_GHI_aug",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2009_sep = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2009 September",
			geoserverUrl, {
		        layers: "masdar:2009_GHI_sep",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	GHI2009_oct = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2009 October",
			geoserverUrl, {
		        layers: "masdar:2009_GHI_oct",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2009_nov = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2009 November",
			geoserverUrl, {
		        layers: "masdar:2009_GHI_nov",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2009_dec = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2009 December",
			geoserverUrl, {
		        layers: "masdar:2009_GHI_dec",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
}

function monthlyLayers2010(map2) {
	
	DNI2010_jan = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2010 January",
			geoserverUrl, {
		        layers: "masdar:2010_DNI_jan",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DNI2010_feb = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2010 February",
			geoserverUrl, {
		        layers: "masdar:2010_DNI_feb",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DNI2010_mar = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2010 March",
			geoserverUrl, {
		        layers: "masdar:2010_DNI_mar",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DNI2010_apr = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2010 April",
			geoserverUrl, {
		        layers: "masdar:2010_DNI_apr",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DNI2010_may = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2010 May",
			geoserverUrl, {
		        layers: "masdar:2010_DNI_may",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DNI2010_jun = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2010 June",
			geoserverUrl, {
		        layers: "masdar:2010_DNI_jun",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DNI2010_jul = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2010 July",
			geoserverUrl, {
		        layers: "masdar:2010_DNI_jul",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DNI2010_aug = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2010 August",
			geoserverUrl, {
		        layers: "masdar:2010_DNI_aug",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DNI2010_sep = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2010 September",
			geoserverUrl, {
		        layers: "masdar:2010_DNI_sep",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	DNI2010_oct = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2010 October",
			geoserverUrl, {
		        layers: "masdar:2010_DNI_oct",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DNI2010_nov = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2010 November",
			geoserverUrl, {
		        layers: "masdar:2010_DNI_nov",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DNI2010_dec = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2010 December",
			geoserverUrl, {
		        layers: "masdar:2010_DNI_dec",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2010_jan = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2010 january",
			geoserverUrl, {
		        layers: "masdar:2010_DHI_jan",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2010_feb = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2010 February",
			geoserverUrl, {
		        layers: "masdar:2010_DHI_feb",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2010_mar = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2010 March",
			geoserverUrl, {
		        layers: "masdar:2010_DHI_mar",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2010_apr = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2010 April",
			geoserverUrl, {
		        layers: "masdar:2010_DHI_apr",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2010_may = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2010 May",
			geoserverUrl, {
		        layers: "masdar:2010_DHI_may",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2010_jun = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2010 June",
			geoserverUrl, {
		        layers: "masdar:2010_DHI_jun",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2010_jul = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2010 July",
			geoserverUrl, {
		        layers: "masdar:2010_DHI_jul",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2010_aug = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2010 August",
			geoserverUrl, {
		        layers: "masdar:2010_DHI_aug",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2010_sep = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2010 September",
			geoserverUrl, {
		        layers: "masdar:2010_DHI_sep",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	DHI2010_oct = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2010 October",
			geoserverUrl, {
		        layers: "masdar:2010_DHI_oct",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2010_nov = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2010 November",
			geoserverUrl, {
		        layers: "masdar:2010_DHI_nov",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2010_dec = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2010 December",
			geoserverUrl, {
		        layers: "masdar:2010_DHI_dec",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2010_jan = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2010 January",
			geoserverUrl, {
		        layers: "masdar:2010_GHI_jan",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2010_feb = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2010 February",
			geoserverUrl, {
		        layers: "masdar:2010_GHI_feb",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2010_mar = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2010 March",
			geoserverUrl, {
		        layers: "masdar:2010_GHI_mar",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2010_apr = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2010 April",
			geoserverUrl, {
		        layers: "masdar:2010_GHI_apr",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2010_may = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2010 May",
			geoserverUrl, {
		        layers: "masdar:2010_GHI_may",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2010_jun = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2010 June",
			geoserverUrl, {
		        layers: "masdar:2010_GHI_jun",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2010_jul = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2010 July",
			geoserverUrl, {
		        layers: "masdar:2010_GHI_jul",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2010_aug = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2010 August",
			geoserverUrl, {
		        layers: "masdar:2010_GHI_aug",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2010_sep = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2010 September",
			geoserverUrl, {
		        layers: "masdar:2010_GHI_sep",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	GHI2010_oct = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2010 October",
			geoserverUrl, {
		        layers: "masdar:2010_GHI_oct",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2010_nov = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2010 November",
			geoserverUrl, {
		        layers: "masdar:2010_GHI_nov",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2010_dec = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2010 December",
			geoserverUrl, {
		        layers: "masdar:2010_GHI_dec",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
}

function monthlyLayers2011(map2) {
	
	DNI2011_jan = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2011 January",
			geoserverUrl, {
		        layers: "masdar:2011_DNI_jan",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DNI2011_feb = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2011 February",
			geoserverUrl, {
		        layers: "masdar:2011_DNI_feb",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DNI2011_mar = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2011 March",
			geoserverUrl, {
		        layers: "masdar:2011_DNI_mar",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DNI2011_apr = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2011 April",
			geoserverUrl, {
		        layers: "masdar:2011_DNI_apr",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DNI2011_may = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2011 May",
			geoserverUrl, {
		        layers: "masdar:2011_DNI_may",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DNI2011_jun = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2011 June",
			geoserverUrl, {
		        layers: "masdar:2011_DNI_jun",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DNI2011_jul = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2011 July",
			geoserverUrl, {
		        layers: "masdar:2011_DNI_jul",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DNI2011_aug = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2011 August",
			geoserverUrl, {
		        layers: "masdar:2011_DNI_aug",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DNI2011_sep = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2011 September",
			geoserverUrl, {
		        layers: "masdar:2011_DNI_sep",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	DNI2011_oct = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2011 October",
			geoserverUrl, {
		        layers: "masdar:2011_DNI_oct",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DNI2011_nov = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2011 November",
			geoserverUrl, {
		        layers: "masdar:2011_DNI_nov",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DNI2011_dec = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2011 December",
			geoserverUrl, {
		        layers: "masdar:2011_DNI_dec",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2011_jan = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2011 january",
			geoserverUrl, {
		        layers: "masdar:2011_DHI_jan",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2011_feb = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2011 February",
			geoserverUrl, {
		        layers: "masdar:2011_DHI_feb",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2011_mar = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2011 March",
			geoserverUrl, {
		        layers: "masdar:2011_DHI_mar",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2011_apr = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2011 April",
			geoserverUrl, {
		        layers: "masdar:2011_DHI_apr",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2011_may = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2011 May",
			geoserverUrl, {
		        layers: "masdar:2011_DHI_may",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2011_jun = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2011 June",
			geoserverUrl, {
		        layers: "masdar:2011_DHI_jun",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2011_jul = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2011 July",
			geoserverUrl, {
		        layers: "masdar:2011_DHI_jul",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2011_aug = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2011 August",
			geoserverUrl, {
		        layers: "masdar:2011_DHI_aug",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2011_sep = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2011 September",
			geoserverUrl, {
		        layers: "masdar:2011_DHI_sep",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	DHI2011_oct = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2011 October",
			geoserverUrl, {
		        layers: "masdar:2011_DHI_oct",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2011_nov = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2011 November",
			geoserverUrl, {
		        layers: "masdar:2011_DHI_nov",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2011_dec = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2011 December",
			geoserverUrl, {
		        layers: "masdar:2011_DHI_dec",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2011_jan = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2011 January",
			geoserverUrl, {
		        layers: "masdar:2011_GHI_jan",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2011_feb = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2011 February",
			geoserverUrl, {
		        layers: "masdar:2011_GHI_feb",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2011_mar = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2011 March",
			geoserverUrl, {
		        layers: "masdar:2011_GHI_mar",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2011_apr = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2011 April",
			geoserverUrl, {
		        layers: "masdar:2011_GHI_apr",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2011_may = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2011 May",
			geoserverUrl, {
		        layers: "masdar:2011_GHI_may",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2011_jun = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2011 June",
			geoserverUrl, {
		        layers: "masdar:2011_GHI_jun",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2011_jul = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2011 July",
			geoserverUrl, {
		        layers: "masdar:2011_GHI_jul",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2011_aug = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2011 August",
			geoserverUrl, {
		        layers: "masdar:2011_GHI_aug",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2011_sep = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2011 September",
			geoserverUrl, {
		        layers: "masdar:2011_GHI_sep",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	GHI2011_oct = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2011 October",
			geoserverUrl, {
		        layers: "masdar:2011_GHI_oct",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2011_nov = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2011 November",
			geoserverUrl, {
		        layers: "masdar:2011_GHI_nov",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2011_dec = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2011 December",
			geoserverUrl, {
		        layers: "masdar:2011_GHI_dec",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
}

function monthlyLayers2012(map2) {
	
	DNI2012_jan = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2012 January",
			geoserverUrl, {
		        layers: "masdar:2012_DNI_jan",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DNI2012_feb = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2012 February",
			geoserverUrl, {
		        layers: "masdar:2012_DNI_feb",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DNI2012_mar = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2012 March",
			geoserverUrl, {
		        layers: "masdar:2012_DNI_mar",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DNI2012_apr = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2012 April",
			geoserverUrl, {
		        layers: "masdar:2012_DNI_apr",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DNI2012_may = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2012 May",
			geoserverUrl, {
		        layers: "masdar:2012_DNI_may",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DNI2012_jun = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2012 June",
			geoserverUrl, {
		        layers: "masdar:2012_DNI_jun",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DNI2012_jul = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2012 July",
			geoserverUrl, {
		        layers: "masdar:2012_DNI_jul",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DNI2012_aug = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2012 August",
			geoserverUrl, {
		        layers: "masdar:2012_DNI_aug",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DNI2012_sep = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2012 September",
			geoserverUrl, {
		        layers: "masdar:2012_DNI_sep",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	DNI2012_oct = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2012 October",
			geoserverUrl, {
		        layers: "masdar:2012_DNI_oct",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DNI2012_nov = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2012 November",
			geoserverUrl, {
		        layers: "masdar:2012_DNI_nov",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DNI2012_dec = new OpenLayers.Layer.WMS("Direct Normal Irradiation 2012 December",
			geoserverUrl, {
		        layers: "masdar:2012_DNI_dec",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2012_jan = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2012 january",
			geoserverUrl, {
		        layers: "masdar:2012_DHI_jan",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2012_feb = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2012 February",
			geoserverUrl, {
		        layers: "masdar:2012_DHI_feb",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2012_mar = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2012 March",
			geoserverUrl, {
		        layers: "masdar:2012_DHI_mar",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2012_apr = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2012 April",
			geoserverUrl, {
		        layers: "masdar:2012_DHI_apr",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2012_may = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2012 May",
			geoserverUrl, {
		        layers: "masdar:2012_DHI_may",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2012_jun = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2012 June",
			geoserverUrl, {
		        layers: "masdar:2012_DHI_jun",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2012_jul = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2012 July",
			geoserverUrl, {
		        layers: "masdar:2012_DHI_jul",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2012_aug = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2012 August",
			geoserverUrl, {
		        layers: "masdar:2012_DHI_aug",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2012_sep = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2012 September",
			geoserverUrl, {
		        layers: "masdar:2012_DHI_sep",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	DHI2012_oct = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2012 October",
			geoserverUrl, {
		        layers: "masdar:2012_DHI_oct",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2012_nov = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2012 November",
			geoserverUrl, {
		        layers: "masdar:2012_DHI_nov",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	DHI2012_dec = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2012 December",
			geoserverUrl, {
		        layers: "masdar:2012_DHI_dec",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2012_jan = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2012 January",
			geoserverUrl, {
		        layers: "masdar:2012_GHI_jan",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2012_feb = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2012 February",
			geoserverUrl, {
		        layers: "masdar:2012_GHI_feb",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2012_mar = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2012 March",
			geoserverUrl, {
		        layers: "masdar:2012_GHI_mar",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2012_apr = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2012 April",
			geoserverUrl, {
		        layers: "masdar:2012_GHI_apr",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2012_may = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2012 May",
			geoserverUrl, {
		        layers: "masdar:2012_GHI_may",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2012_jun = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2012 June",
			geoserverUrl, {
		        layers: "masdar:2012_GHI_jun",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2012_jul = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2012 July",
			geoserverUrl, {
		        layers: "masdar:2012_GHI_jul",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2012_aug = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2012 August",
			geoserverUrl, {
		        layers: "masdar:2012_GHI_aug",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2012_sep = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2012 September",
			geoserverUrl, {
		        layers: "masdar:2012_GHI_sep",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	GHI2012_oct = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2012 October",
			geoserverUrl, {
		        layers: "masdar:2012_GHI_oct",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2012_nov = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2012 November",
			geoserverUrl, {
		        layers: "masdar:2012_GHI_nov",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
	
	GHI2012_dec = new OpenLayers.Layer.WMS("Global Horizontal Irradiation 2012 December",
			geoserverUrl, {
		        layers: "masdar:2012_GHI_dec",
		        transparent: true,
		        format: format,
		        tiled: true,
		        tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
		    }, {
                buffer: 0,
                displayOutsideMaxExtent: true,
                ratio: 1,
    			opacity: 1,
    			visibility: false
            }
		);
}