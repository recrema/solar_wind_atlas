var toolbar;
var map;
var ctrl;

function getToolbar () {
	
	toolbar = [
	
		new GeoExt.Action({
	//	    text: "World view",
		    icon: 'zoom_fullextent.png',
		    control: new OpenLayers.Control.ZoomToMaxExtent(),
		    map: map
		}),
		
		new GeoExt.Action({
		    text: "Zoom Window",
		    toggleGroup: 'tool_grp',
		    pressed: false,
	//	    icon: 'zoom_fullextent.png',
		    control: new OpenLayers.Control.ZoomBox(),
		    map: map,
		}),
		
		// Navigation history - two "button" controls
	    ctrl = new OpenLayers.Control.NavigationHistory(),
	    map.addControl(ctrl),
		
		new GeoExt.Action({
	//        text: "previous",
	        control: ctrl.previous,
	        disabled: true,
	        icon: 'previous.png',
	        tooltip: "previous in history"
	    }),
	
	    new GeoExt.Action({
	//        text: "next",
	        control: ctrl.next,
	        disabled: true,
	        icon: 'next.png',
	        tooltip: "next in history"
	    })
];	
	return toolbar;
};