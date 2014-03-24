<?php
error_reporting(E_ALL);

$xml_data ='<?xml version="1.0" encoding="UTF-8"?>
<wps:Execute version="1.0.0" service="WPS" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.opengis.net/wps/1.0.0" xmlns:wfs="http://www.opengis.net/wfs" xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wcs="http://www.opengis.net/wcs/1.1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd">
  <ows:Identifier>py:wind_roses</ows:Identifier>
  <wps:DataInputs>
    <wps:Input>
      <ows:Identifier>latitude</ows:Identifier>
      <wps:Data>
        <wps:LiteralData>435</wps:LiteralData>
      </wps:Data>
    </wps:Input>
    <wps:Input>
      <ows:Identifier>longitude</ows:Identifier>
      <wps:Data>
        <wps:LiteralData>324</wps:LiteralData>
      </wps:Data>
    </wps:Input>
  </wps:DataInputs>
  <wps:ResponseForm>
    <wps:RawDataOutput>
      <ows:Identifier>result</ows:Identifier>
    </wps:RawDataOutput>
  </wps:ResponseForm>
</wps:Execute>';

$dom = new DOMDocument;
$dom->loadXML($xml_data);

// $books = $dom->getElementsByTagName('Identifier');
// foreach ($books as $book) {
// 	echo $book->nodeName, PHP_EOL;
// 	echo '<br>';
// }

// foreach ($dom->getElementsByTagNameNS('http://www.opengis.net/wps/1.0.0', 'Input') as $element) {
// 	echo $element->nodeValue, "<br>";
// }
// foreach ($dom->getElementsByTagNameNS('http://www.opengis.net/ows/1.1', 'Identifier') as $element) {
// 	echo $element->nodeValue, "<br>";
// }

$URL = "http://atlas.masdar.ac.ae:8080/geoserver/wps";
$ch = curl_init($URL);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: text/xml'));
curl_setopt($ch, CURLOPT_POSTFIELDS, "$xml_data");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
#$output = curl_exec($ch); #esta vai ser a linha da resposta do wps que vai traser o json para fazer os graficos
curl_close($ch);

$json="{
        		        chart: {
        		            renderTo: 'container',
        		            polar: true,
        		            type: 'line'
        		        },
        		        
        		        title: {
        		            text: ''
        		        },
						credits: {
				  		    enabled: false
					  	},
        		        
        		        pane: {
        		            size: '85%'
        		        },
        		        
        		       legend: {
        			    	reversed: true,
        			    	align: 'right',
        			    	verticalAlign: 'top',
        			    	y: 100,
        			    	layout: 'vertical'
        			    },
        		    
        		        xAxis: {
        		          tickmarkPlacement: 'on',
        		          categories: ['N', 'E', 'S','W']
        		        },
        		            
        		        yAxis: {
        		            min: 0,
        			        endOnTick: false,
        			        showLastLabel: true,
        			        title: {
        			        	text: ''
        			        },
        		            
        			        labels: {
        			        	formatter: function () {
        			        		return this.value + '%';
        			        	}
        			        }
        		        },
        		        tooltip: {
        			    	valueSuffix: '%',
        			    	followPointer: true
        			    },
        		        
        		       plotOptions: {
        			        series: {
        			        	stacking: 'normal',
        			        	shadow: false,
        			        	groupPadding: 0,
        			        	pointPlacement: 'on'
        			        }
        			    },

        			    series: [{
        		            name: '0-2',
        		            data: [8, 7, 6, 5],
        		        }, {
        		            name: '2-4',
        		            data: [1, 2, 3, 4]
        		        }, {
        		            name: '4-6',
        		            data: [1, 8, 2, 7]
        		        },{
        		            name: '6-8',
        		            data: [1, 8, 2, 7]
        		        }]
        		    }";
file_put_contents('../tmp/chart.json',$json);
exec('phantomjs /var/www/recrema_wind_atlas/wind_atlas/lib/phantomjs/highcharts-convert.js -infile /var/www/recrema_wind_atlas/wind_atlas/atlas_wind_ext4/tmp/chart.json -outfile /var/www/recrema_wind_atlas/wind_atlas/atlas_wind_ext4/tmp/chart.svg -scale 4 -width 600 -constr Chart', $output1, $return1);
unlink('../tmp/chart.json');
############################################################################################################
############################## Second chart ################################################################
$json2="{
        		        chart: {
        		            renderTo: 'container',
        		            polar: true,
        		            type: 'column'
        		        },

        		        title: {
        		            text: ''
        		        },
						credits: {
				  		    enabled: false
					  	},

        		        pane: {
        		            size: '85%'
        		        },

        		       legend: {
        			    	reversed: true,
        			    	align: 'right',
        			    	verticalAlign: 'top',
        			    	y: 100,
        			    	layout: 'vertical'
        			    },

        		        xAxis: {
        		          tickmarkPlacement: 'on',
        		          categories: ['N', 'E', 'S','W']
        		        },

        		        yAxis: {
        		            min: 0,
        			        endOnTick: false,
        			        showLastLabel: true,
        			        title: {
        			        	text: ''
        			        },

        			        labels: {
        			        	formatter: function () {
        			        		return this.value + '%';
        			        	}
        			        }
        		        },
        		        tooltip: {
        			    	valueSuffix: '%',
        			    	followPointer: true
        			    },

        		       plotOptions: {
        			        series: {
        			        	stacking: 'normal',
        			        	shadow: false,
        			        	groupPadding: 0,
        			        	pointPlacement: 'on'
        			        }
        			    },

        			    series: [{
        		            name: '0-2',
        		            data: [8, 7, 6, 5],
        		        }, {
        		            name: '2-4',
        		            data: [1, 2, 3, 4]
        		        }, {
        		            name: '4-6',
        		            data: [1, 8, 2, 7]
        		        },{
        		            name: '6-8',
        		            data: [1, 8, 2, 7]
        		        }]
        		    }";
file_put_contents('../tmp/chart2.json',$json2);
exec('phantomjs /var/www/recrema_wind_atlas/wind_atlas/lib/phantomjs/highcharts-convert.js -infile /var/www/recrema_wind_atlas/wind_atlas/atlas_wind_ext4/tmp/chart2.json -outfile /var/www/recrema_wind_atlas/wind_atlas/atlas_wind_ext4/tmp/chart2.svg -scale 4 -width 600 -constr Chart', $output1, $return1);
unlink('../tmp/chart2.json');

############################################################################################################
############################## 3 chart ################################################################
$json3="{
        		        chart: {
        		            renderTo: 'container',
        		            type: 'column'
        		        },

        		        title: {
        		            text: ''
        		        },
						credits: {
				  		    enabled: false
					  	},

        		        pane: {
        		            size: '85%'
        		        },

        		       legend: {
        			    	reversed: true,
        			    	align: 'right',
        			    	verticalAlign: 'top',
        			    	y: 100,
        			    	layout: 'vertical'
        			    },

        		        xAxis: {
        		          tickmarkPlacement: 'on',
        		          categories: ['N', 'E', 'S','W']
        		        },

        		        yAxis: {
        		            min: 0,
        			        endOnTick: false,
        			        showLastLabel: true,
        			        title: {
        			        	text: ''
        			        },

        			        labels: {
        			        	formatter: function () {
        			        		return this.value + '%';
        			        	}
        			        }
        		        },
        		        tooltip: {
        			    	valueSuffix: '%',
        			    	followPointer: true
        			    },

        		       plotOptions: {
        			        series: {
        			        	stacking: 'normal',
        			        	shadow: false,
        			        	groupPadding: 0,
        			        	pointPlacement: 'on'
        			        }
        			    },

        			    series: [{
        		            name: '0-2',
        		            data: [8, 7, 6, 5],
        		        }, {
        		            name: '2-4',
        		            data: [1, 2, 3, 4]
        		        }, {
        		            name: '4-6',
        		            data: [1, 8, 2, 7]
        		        },{
        		            name: '6-8',
        		            data: [1, 8, 2, 7]
        		        }]
        		    }";
file_put_contents('../tmp/chart3.json',$json3);
exec('phantomjs /var/www/recrema_wind_atlas/wind_atlas/lib/phantomjs/highcharts-convert.js -infile /var/www/recrema_wind_atlas/wind_atlas/atlas_wind_ext4/tmp/chart3.json -outfile /var/www/recrema_wind_atlas/wind_atlas/atlas_wind_ext4/tmp/chart3.svg -scale 4 -width 600 -constr Chart', $output1, $return1);
unlink('../tmp/chart3.json');


$output1 = '
		<script>
			function bigImg(x)
			{
			x.style.height="110px";
			x.style.width="170px";
			}
		
			function normalImg(x)
			{
			x.style.height="100px";
			x.style.width="160px";
			}
		</script>
		<br>
		<br>
		<a href="javascript:void(0)"><img src="tmp/chart.svg" width="160" height="100" onmouseover="bigImg(this)" onmouseout="normalImg(this)" onClick="mapController.onChartActivate('.$json.');"></a>
		<a href="javascript:void(0)"><img src="tmp/chart2.svg" width="160" height="100" onmouseover="bigImg(this)" onmouseout="normalImg(this)" onClick="mapController.onChartActivate('.$json2.');"></a>';

$output2 = '
		<script>
			function bigImg(x)
			{
			x.style.height="110px";
			x.style.width="170px";
			}

			function normalImg(x)
			{
			x.style.height="100px";
			x.style.width="160px";
			}
		</script>
		<br>
		<br>
		<a href="javascript:void(0)"><img src="tmp/chart3.svg" width="160" height="100" onmouseover="bigImg(this)" onmouseout="normalImg(this)" onClick="mapController.onChartActivate('.$json3.');"></a>';

$arr = array ('success'=>true,'msg1'=>$output1,'msg2'=>$output2);
print_r(json_encode($arr));
?>