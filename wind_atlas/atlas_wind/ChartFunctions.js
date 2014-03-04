//GLOBALS
var num_month = 0;
var num_year = 0;

function chartPlot(chartData, charXPixel, markerslayer2) {
	
//	console.log(chartData);
	//we create the Store that will manipulate the information  
	var store = new Ext.data.ArrayStore({  
	    fields:[{name:'framework'},{name:'users', type:'float'}]  
	});  
	store.loadData(chartData); // loading the information in the store 
	
//console.log(chartData, charXPixel, markerslayer2);

	
	var chart = new Ext.chart.ColumnChart({
//	var chart = new Ext.chart.BarChart({
		    store: store,  
		    url:'../../extjs/resources/charts.swf',  
		    xField: 'framework',  
		    yField: 'users',
	    	yAxis: new Ext.chart.NumericAxis({
                title: 'Wind Speed m/s',
            }),
            xAxis: new Ext.chart.CategoryAxis({
//                title: 'Date',
                reverse: true
            }),
            extraStyle: {
            	yAxis: {
                    titleRotation: -90
                },
            	xAxis: {
                    labelRotation: -90
                },
            }
	});
	
//	alert(charXPixel);
	
	//determine the chart width using the number of items
	var chartWidth="";
	var items=store.data.items.length;
	chartWidth = (200+(items-1)*(400/11));
	
	//create popup to show pixel values
	pop = new Ext.Window({
        title: "Wind Speed Chart",
        width: chartWidth,
        height: 300,
        layout: "fit",
        x: charXPixel+leftPanelWidth+50, // Try to substitute this value with the value of the clicked pixel
        items: [chart],
        resizable: false,
        buttons: [{
            text: 'Close',
            handler: function(){
                pop.close();
//                markerslayer2.clearMarkers();
            }
        }]
    });
	pop.show();
	pop.on('close',function(){
    	markerslayer2.clearMarkers();
	});
}



//function verifyChartLayers(layerChart) {
//	
//	if (layerChart.indexOf("yearly") != -1 )
//		num_year = num_year + 1;
//	else if (layerChart.indexOf("yearly") == -1 )
//		num_month = num_month + 1;
//	
////	console.log(num_month, num_year);
//}


function get_month_name2(month){
	month_names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	return month_names[parseInt(month)-1];
};

function chartDate(labelText) {
	var text = labelText;
	var c;
	
	text_without_prefix = text.substring(24,text.length);
	
	if (text_without_prefix.length == 6 || text_without_prefix.length == 7){
		month = text_without_prefix.slice(-2);
		month_name = get_month_name2(month);
		height = text_without_prefix.substring(0,text_without_prefix.length-3);
		c = "Overall " + height + " " + month_name;
	}
	
	if (text_without_prefix.length == 8 || text_without_prefix.length == 9){
		year = text_without_prefix.slice(-4);
		height = text_without_prefix.substring(0,text_without_prefix.length-5);
		console.log(height);
		c = height + " " + year;
	}
	
	if (text_without_prefix.length == 10 || text_without_prefix.length == 11){
		if (text_without_prefix.slice(-6) == "Annual"){
			height = text_without_prefix.substring(0,text_without_prefix.length-7);
			c = height + "Annual"
		} else {
			height = text_without_prefix.substring(0,text_without_prefix.length-7);
			month_name = get_month_name2(text_without_prefix.slice(-2));
			year_month = text_without_prefix.slice(-6);
			year = year_month.substring(0, year_month.length-2);
			c = height + " " + month_name + " " + year
		}
	}
	
	return c;
}

function formatChartNumber(number2) {
	number = parseFloat(number2);
	finalNumber = Math.round(10*number)/10;
	return finalNumber;
}