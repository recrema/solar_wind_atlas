//GLOBALS
var num_month = 0;
var num_year = 0;

function chartPlot(chartData, charXPixel, markerslayer2) {
	
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
                title: 'Irradiation kWh/m2',
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
        title: "Irradiation values chart",
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



function verifyChartLayers(layerChart) {
	
	if (layerChart.indexOf("yearly") != -1 )
		num_year = num_year + 1;
	else if (layerChart.indexOf("yearly") == -1 )
		num_month = num_month + 1;
	
//	console.log(num_month, num_year);
}

function type(typeText) {

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
}

function month(monthText) {
	
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
	
}

function chartDate(labelText) {
	var text = labelText;
	var c;
	
	year = text.substring(0,4);
	
//	text2 = text.indexOf("yearly")
	if(text.indexOf("yearly") != -1){
		typeSubstring = text.substring((text.length - 3), text.length);
		c = type(typeSubstring)  + " - " + year;
	}
	else {
		typeSubstring = text.substring(5, 8);
		monthSubstring = text.substring((text.length - 3), text.length);
		c = type(typeSubstring) + " - " + year + " - " + month(monthSubstring);
	}
	
	return c;
}

function formatChartNumber(number2) {
	number = parseFloat(number2);
	finalNumber = Math.round(10*number)/10;
	return finalNumber;
}