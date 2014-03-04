var geoserverUrl="http://solaratlas.masdar.ac.ae:8080/geoserver/masdar/wms";
format = 'image/png8';
workspace = "masdar";
layers_configurations = {buffer: 0, displayOutsideMaxExtent: true, ratio: 1, opacity: 1, visibility: false};
//collection of heights to use
var heights = [10, 50, 80, 100, 120];
//collection of years to use
var year_start = 2003;
var year_end = 2012;
var prefix = "uaewindmap_moswindspeed_";//to use in the WMS request due to the layer name in the geoserver
	
//var x = "a10";
//var y = "a2003";
//
//window[x + y] = "test";
//console.log(a10a2003)
var temp = [];





//routine to create all variables and respective WMS requests
for (height in heights){
//	console.log(heights[height]);
	
//	window[prefix + heights[height]] = heights[height];
//	console.log(prefix + heights[height]);
	
	for (year = year_start; year <= year_end; year++){
		
//		temp[window[prefix + heights[height] + '_' + year]] = heights[height] + "_" + year;
//		console.log(prefix + heights[height] + 'm_' + year);
		
		window[prefix + heights[height] + '_' + year] = new OpenLayers.Layer.WMS("Diffuse Horizontal Irradiation 2006", geoserverUrl, {Layers: workspace + ":2006_yearly_dhi", format: format}, layers_configurations);
		temp.push(window[prefix + heights[height] + '_' + year])
		
//		for (month = 1; month <= 12; month++){
//			console.log(month)
//		}
		
	}
	
}

//console.log(temp);

