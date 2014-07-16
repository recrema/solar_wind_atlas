<?php
error_reporting(E_ERROR); // to change here the error reporting E_ALL for all E_ERROR just for errors!

$baseTempFolder='/var/www/recrema_wind_atlas/wind_atlas/atlas_wind_ext4/tmp/'; // full path to temp folder, the same inside the project
$phantomjsFolder='/var/www/recrema_wind_atlas/wind_atlas/lib/phantomjs/'; // full path to the phantomjs folder, the same inside the project

function delOldFiles() // delete all the files older that 1 day
{
	$files = glob('../tmp/'."*");
	$time  = time();
// 	$a=array();
	foreach($files as $file){
		if(is_file($file)){
			if($time - filemtime($file) >= 60*60*24*1){    // 1 day
// 				array_push($a,$file);
				unlink($file);
			}
		}
	}
// 	return $a;
}


require_once('../../lib/fpdf17/fpdf.php');
require_once('../../lib/FPDI-1.5.1/fpdi.php');

$uniqueId = 'wps_' . time() . getmypid();


$initial_date=str_replace("/", "",$_POST["initial_date"]).$_POST["initial_time"];
$final_date=str_replace("/", "",$_POST["final_date"]).$_POST["final_time"];

$xml_data ='<?xml version="1.0" encoding="UTF-8"?>
<wps:Execute version="1.0.0" service="WPS" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.opengis.net/wps/1.0.0" xmlns:wfs="http://www.opengis.net/wfs" xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wcs="http://www.opengis.net/wcs/1.1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd">
  <ows:Identifier>py:call_wind_roses</ows:Identifier>
  <wps:DataInputs>
    <wps:Input>
      <ows:Identifier>final_date</ows:Identifier>
      <wps:Data>
        <wps:LiteralData>'.$final_date.'</wps:LiteralData>
      </wps:Data>
    </wps:Input>
    <wps:Input>
      <ows:Identifier>initial_date</ows:Identifier>
      <wps:Data>
        <wps:LiteralData>'.$initial_date.'</wps:LiteralData>
      </wps:Data>
    </wps:Input>
    <wps:Input>
      <ows:Identifier>latitude</ows:Identifier>
      <wps:Data>
        <wps:LiteralData>'.$_POST["latitude"].'</wps:LiteralData>
      </wps:Data>
    </wps:Input>
    <wps:Input>
      <ows:Identifier>longitude</ows:Identifier>
      <wps:Data>
        <wps:LiteralData>'.$_POST["longitude"].'</wps:LiteralData>
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


$URL = "http://atlas.masdar.ac.ae:8080/geoserver/wps";
$ch = curl_init($URL);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: text/xml'));
curl_setopt($ch, CURLOPT_POSTFIELDS, "$xml_data");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
$output = curl_exec($ch); #esta vai ser a linha da resposta do wps que vai traser o json para fazer os graficos
curl_close($ch);
//  echo $output;

$rawjson=(json_decode($output,true));
$series1=$rawjson['series1'];
$series6=$rawjson['series6'];

if ($series1=== NULL) {
	$arr = array ('success'=>FALSE,'msg1'=>'An error as occurred in the server! Please come back later.','msg2'=> $output);
	print_r(json_encode($arr));
}
else {
	$json="{
	        		        chart: {
	        		            renderTo: 'container',
	        		            polar: true,
	        		            type: 'column'
	        		        },
	
	        		        title: {
	        		            text: 'Mean wind speed at 10 meters',
								style: {'color': 'grey', 'fontSize': '16px','font-weight':'bold'},
								margin: 20,
								align: 'left',
								x: 85
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
	        		          categories: ['N', 'NNE', 'NE','ENE','E', 'ESE', 'SE','SSE','S', 'SSW', 'SW','WSW','W', 'WNW', 'NW','NNW']

	        		        },
	
	        		        yAxis: {
	        		            min: 0,
	        			        endOnTick: true,
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
	series:".$series1."}";
	
	$json1_2="{
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
								enabled: false
	        			    },
	
	        		        xAxis: {
	        		          tickmarkPlacement: 'on',
	        		          categories: ['N', 'NNE', 'NE','ENE','E', 'ESE', 'SE','SSE','S', 'SSW', 'SW','WSW','W', 'WNW', 'NW','NNW'],

							labels: {
									style: {
										color: '#000000'
									}
	        			        }
	        		        },
	
	        		        yAxis: {
	        		            min: 0,
	        			        endOnTick: true,
	        			        showLastLabel: true,
	        			        title: {
	        			        	text: ''
	        			        },
								offset:0,
	        			        labels: {
									style: {
										color: '#000000',
									},
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
	series:".$series1."}";
	
	
	
	file_put_contents('../tmp/chart'.$uniqueId.'.json',$json1_2);
	exec('phantomjs '.$phantomjsFolder.'highcharts-convert.js -infile '.$baseTempFolder.'chart'.$uniqueId.'.json -outfile '.$baseTempFolder.'chart'.$uniqueId.'.png -scale 4 -width 600 -constr Chart', $output1, $return1);
	unlink('../tmp/chart'.$uniqueId.'.json');
	############################################################################################################
	############################## Second chart ################################################################
	$json2="{
	        		        chart: {
	        		            renderTo: 'container',
	        		            polar: true,
	        		            type: 'column'
	        		        },
	
	        		        title: {
	        		            text: 'Mean wind speed at 50 meters',
								style: {'color': 'grey', 'fontSize': '16px','font-weight':'bold'},
								margin: 20,
								align: 'left',
								x: 85
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
	        		          categories: ['N', 'NNE', 'NE','ENE','E', 'ESE', 'SE','SSE','S', 'SSW', 'SW','WSW','W', 'WNW', 'NW','NNW']
	        		        },
	
	        		        yAxis: {
	        		            min: 0,
	        			        endOnTick: true,
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
	series:[{                name: '>12',                legendIndex: 7,                color: '#7f0000',                data: [0.0, 0.04, 0.0, 0.0, 0.0, 0.0, 0.02, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.02, 0.0]                },{                name: '10-12',                legendIndex: 6,                color: '#ff0000',                data: [0.51, 0.36, 0.02, 0.02, 0.0, 0.0, 0.0, 0.0, 0.06, 0.14, 0.08, 0.0, 0.0, 0.02, 0.0, 0.06]                },{                name: '8-10',                legendIndex: 5,                color: '#ff4900',                data: [2.35, 1.11, 1.03, 0.02, 0.02, 0.04, 0.08, 0.36, 0.59, 0.16, 0.28, 0.08, 0.02, 0.0, 0.02, 0.49]                },{                name: '6-8',                legendIndex: 4,                color: '#ebff13',                data: [3.1, 2.78, 2.69, 0.34, 0.08, 0.12, 0.45, 0.83, 0.71, 0.18, 0.3, 0.08, 0.04, 0.02, 0.36, 0.93]                },{                name: '4-6',                legendIndex: 3,                color: '#23ffdb',                data: [3.95, 4.34, 5.51, 1.88, 0.59, 0.45, 1.38, 1.56, 1.46, 0.79, 0.51, 0.22, 0.32, 0.32, 0.53, 1.97]                },{                name: '2-4',                legendIndex: 2,                color: '#0059ff',                data: [4.4, 4.54, 6.02, 3.93, 1.84, 2.07, 1.86, 1.92, 1.09, 0.67, 0.41, 0.85, 0.65, 1.18, 1.48, 2.59]                },{                name: '0-2',                legendIndex: 1,                color: '#00008f',                data: [1.6, 1.76, 2.03, 2.01, 1.38, 1.4, 0.91, 1.01, 0.63, 0.43, 0.67, 0.83, 0.81, 0.83, 0.57, 0.85]                }]
			        		    }";
	
	$json2_2="{
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
								enabled: false
	        			    },
	
	        		        xAxis: {
	        		          tickmarkPlacement: 'on',
	        		          categories: ['N', 'NNE', 'NE','ENE','E', 'ESE', 'SE','SSE','S', 'SSW', 'SW','WSW','W', 'WNW', 'NW','NNW'],
										labels: {
									style: {
										color: '#000000'
									}
	        			        }
	        		        },
	
	        		        yAxis: {
	        		            min: 0,
	        			        endOnTick: true,
	        			        showLastLabel: true,
	        			        title: {
	        			        	text: ''
	        			        },
	
	        			        labels: {
									style: {
										color: '#000000',
									},
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
	series:[{                name: '>12',                legendIndex: 7,                color: '#7f0000',                data: [0.0, 0.04, 0.0, 0.0, 0.0, 0.0, 0.02, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.02, 0.0]                },{                name: '10-12',                legendIndex: 6,                color: '#ff0000',                data: [0.51, 0.36, 0.02, 0.02, 0.0, 0.0, 0.0, 0.0, 0.06, 0.14, 0.08, 0.0, 0.0, 0.02, 0.0, 0.06]                },{                name: '8-10',                legendIndex: 5,                color: '#ff4900',                data: [2.35, 1.11, 1.03, 0.02, 0.02, 0.04, 0.08, 0.36, 0.59, 0.16, 0.28, 0.08, 0.02, 0.0, 0.02, 0.49]                },{                name: '6-8',                legendIndex: 4,                color: '#ebff13',                data: [3.1, 2.78, 2.69, 0.34, 0.08, 0.12, 0.45, 0.83, 0.71, 0.18, 0.3, 0.08, 0.04, 0.02, 0.36, 0.93]                },{                name: '4-6',                legendIndex: 3,                color: '#23ffdb',                data: [3.95, 4.34, 5.51, 1.88, 0.59, 0.45, 1.38, 1.56, 1.46, 0.79, 0.51, 0.22, 0.32, 0.32, 0.53, 1.97]                },{                name: '2-4',                legendIndex: 2,                color: '#0059ff',                data: [4.4, 4.54, 6.02, 3.93, 1.84, 2.07, 1.86, 1.92, 1.09, 0.67, 0.41, 0.85, 0.65, 1.18, 1.48, 2.59]                },{                name: '0-2',                legendIndex: 1,                color: '#00008f',                data: [1.6, 1.76, 2.03, 2.01, 1.38, 1.4, 0.91, 1.01, 0.63, 0.43, 0.67, 0.83, 0.81, 0.83, 0.57, 0.85]                }]
			        		    }";
	file_put_contents('../tmp/chart2'.$uniqueId.'.json',$json2_2);
	exec('phantomjs '.$phantomjsFolder.'highcharts-convert.js -infile '.$baseTempFolder.'chart2'.$uniqueId.'.json -outfile '.$baseTempFolder.'chart2'.$uniqueId.'.png -scale 4 -width 600 -constr Chart', $output1, $return1);
	unlink('../tmp/chart2'.$uniqueId.'.json');
	
	############################################################################################################
	############################## 3 chart ################################################################
	$json3="{
	        		        chart: {
	        		            renderTo: 'container',
	        		            type: 'column'
	        		        },
	
	        		        title: {
	        		            text: 'Chart Title',
								style: {'color': 'grey', 'fontSize': '16px','font-weight':'bold'},
								margin: 20,
								align: 'left',
								x: 155
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
	        		          categories: ['10m', '50m', '80m','100m','120m']
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
	        			        }
	        			    },
	
	        			    series:$series6
	        		    }";
	$json3_2="{
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
	enabled: false
	},
	
	xAxis: {
	tickmarkPlacement: 'on',
	categories: ['10m', '50m', '80m','100m','120m'],
								labels: {
									style: {
										color: '#000000'
									}
	        			        }
	},
	
	yAxis: {
	        		            min: 0,
	        			        endOnTick: false,
	        			        showLastLabel: true,
	        			        title: {
	        			        	text: ''
	        			        },
	
	        			        labels: {
									style: {
										color: '#000000',
									},
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
	}
	},
	
	series:$series6
	}";
	
	
	file_put_contents('../tmp/chart3'.$uniqueId.'.json',$json3_2);
	exec('phantomjs '.$phantomjsFolder.'highcharts-convert.js -infile '.$baseTempFolder.'chart3'.$uniqueId.'.json -outfile '.$baseTempFolder.'chart3'.$uniqueId.'.png -scale 4 -width 600 -constr Chart', $output1, $return1);
	unlink('../tmp/chart3'.$uniqueId.'.json');
	
	$script = '
				<script>
					function bigImg1(x)
					{
						x.style.border="solid";
						x.style.borderColor="grey";
					}
		
					function normalImg1(x)
					{
						x.style.border="none";
					}
					function bigImg2(x)
					{
						x.style.border="solid";
						x.style.borderColor="grey";
					}
		
					function normalImg2(x)
					{
						x.style.border="none";
					}
					function bigImg3(x)
					{
					}
		
					function normalImg3(x)
					{
						x.style.border="none";
					}
			</script>
			
			
			';
	$output1 = '
			<br>
			<textatlas style="color:grey;margin-left:50px;"><b> 10 Meters</b></textatlas>
			<textatlas style="color:grey;margin-left:100px;"><b> 50 Meters</b></textatlas>
			<textatlas style="color:grey;margin-left:100px;"><b> 80 Meters</b></textatlas>
			<textatlas style="color:grey;margin-left:97px;"><b> 100 Meters</b></textatlas>
			<textatlas style="color:grey;margin-left:95px;"><b> 120 Meters</b></textatlas>
			<br>
			<br>
			<a href="javascript:void(0)"><img id="windRose1" src="tmp/chart'.$uniqueId.'.png" width="160" height="100" onmouseover="bigImg1(this)" onmouseout="normalImg1(this)" onClick="mapController.onChartActivate('.$json.',\'windRose1\');"></a>
			<a href="javascript:void(0)"><img id="windRose2" src="tmp/chart2'.$uniqueId.'.png" width="160" height="100" onmouseover="bigImg1(this)" onmouseout="normalImg1(this)" onClick="mapController.onChartActivate('.$json2.',\'windRose2\');"></a>
			<a href="javascript:void(0)"><img id="windRose3" src="tmp/chart2'.$uniqueId.'.png" width="160" height="100" onmouseover="bigImg1(this)" onmouseout="normalImg1(this)" onClick="mapController.onChartActivate('.$json2.',\'windRose3\');"></a>
			<a href="javascript:void(0)"><img id="windRose4" src="tmp/chart2'.$uniqueId.'.png" width="160" height="100" onmouseover="bigImg1(this)" onmouseout="normalImg1(this)" onClick="mapController.onChartActivate('.$json2.',\'windRose4\');"></a>
			<a href="javascript:void(0)"><img id="windRose5" src="tmp/chart2'.$uniqueId.'.png" width="160" height="100" onmouseover="bigImg1(this)" onmouseout="normalImg1(this)" onClick="mapController.onChartActivate('.$json2.',\'windRose5\');"></a>';
	
	$output2 = '
			<br>
			<br>
			<a href="javascript:void(0)"><img id="windChart2" src="tmp/chart3'.$uniqueId.'.png" width="160" height="100" onmouseover="bigImg2(this)" onmouseout="normalImg2(this)" onClick="mapController.onChartActivate('.$json3.',\'windChart2\');"></a>';

	
	# Open the PDF Template
	$pdf = new FPDI();
	$pagecount=$pdf->setSourceFile('../silah.pdf');
	
	for ($loop = 1; $loop <= $pagecount; $loop++) {
		$tplidx = $pdf->importPage($loop);
	
		$templateSize = array(((float)8.5)*72,((float)11)*72); // all the x y width and height are in inches
	
		$pdf->SetAutoPageBreak(false);
	
		$pdf->addPage('P', $templateSize);
		$pdf->useTemplate($tplidx, 0, 0, $templateSize[0], $templateSize[1]);
		/* ****************************************
		 * 			PAGE 1
		* ****************************************/
		if ($loop == 1){
			
					
					$pdf->Image('../tmp/chart'.$uniqueId.'.png', 0.1*72, 1.9*72, 230, 153);
					
					$pdf->Image('../tmp/chart2'.$uniqueId.'.png', 5.3*72, 1.9*72, 230, 153);
					$pdf->Image('../tmp/chart2'.$uniqueId.'.png', 2.68*72, 1.9*72, 230, 153);
					
					$pdf->Image('../tmp/chart2'.$uniqueId.'.png', 0.2*72, 4.7*72, 230, 153);
					$pdf->Image('../tmp/chart2'.$uniqueId.'.png', 2.7*72, 4.7*72, 230, 153);
					
					$pdf->SetTextColor(0,0,0);
					$pdf->SetFont('Arial', '', 20);
					
					$pdf->SetXY(3.8*72,0.81*72);
					$pdf->Cell(1,10,'Lat: '.$_POST["latitude"].' Long: '.$_POST["longitude"]);
					
					$pdf->SetXY(3.8*72,1.05*72);
					$pdf->Cell(1,10,$_POST["initial_date"].' to '.$_POST["final_date"]);
		}

	}
	
	$pdf->Output('../tmp/report'.$uniqueId.'.pdf');
	sleep(2); # to give time for the pdf to be written in disk
	
	
	
	
	$output3 = '
			<br>
			<br>
			&nbsp;
			&nbsp;
			&nbsp;
			&nbsp;
			&nbsp;
			<a href="tmp/report'.$uniqueId.'.pdf" target="_blank" title="Download PDF Report"><img id="windReport" src="resources/images/download_pdf.png" width="78" height="100" onmouseover="bigImg3(this)" onmouseout="normalImg3(this)"></a>';
	

	
	
	$arr = array ('success'=>true,'msg1'=>$script.$output1,'msg2'=>$output2,'msg3'=>$output3);
	delOldFiles(); //delete old files
	print_r(json_encode($arr));
}

?>