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
$output = curl_exec($ch);
curl_close($ch);

$arr = array ('success'=>true,'msg'=>$output);

print_r(json_encode($arr));

?>