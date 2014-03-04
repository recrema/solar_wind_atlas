/*
 * This is an experience
 * 
 */


function identifySld(activeLayerIdentification) {
//	var x = activeLayerLegend.getFullRequestString(true);
	var x = activeLayerIdentification.params.LAYERS;
	if (x.indexOf("yearly") != -1) {
		if (x.indexOf("dhi") != -1) {
			sldName="dhi_yearly.xml";
		}
		else
			sldName="dni_ghi_yearly.xml";
	}
	else {
		if (x.indexOf("DHI") != -1) {
			sldName="dhi_monthly.xml";
		}
		else
			sldName="dni_ghi_monthly.xml";
	}
	return sldName;
//	console.log(x);
//	console.log(sldName);
};

function legendStyle(activeLayerLegend) {
	var sldName = identifySld(activeLayerLegend);
	var z = OpenLayers.Format.SLD.read({data: "styles/"+sldName});
	
	
	console.log(z);
	
};