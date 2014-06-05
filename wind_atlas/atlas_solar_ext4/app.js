/**
 * Ext.Loader
 */
Ext.Loader.setConfig({
    enabled: true,
    disableCaching: false,
    paths: {
        GeoExt: "../lib/geoext2-2.0.1/src/GeoExt",
        Chart : "../lib/highcharts_sencha-master/Chart",
        // for dev use
//        Ext: "http://cdn.sencha.com/ext/gpl/4.2.1/src"
        // for build purpose
//        Ext: "ext-4.2.1.883/src"
    }
});

Ext.require([
    // We need to require this class, even though it is used by Ext.EventObjectImpl
    // see: http://www.sencha.com/forum/showthread.php?262124-Missed-(-)-dependency-reference-to-a-Ext.util.Point-in-Ext.EventObjectImpl
    'Ext.util.Point'
]);

/**
 * AM.app
 * A MVC application demo that uses GeoExt and Ext components to display
 * geospatial data.
 */
Ext.application({
    name: 'AM',
    appFolder: 'app/',
    controllers: [
        'Map',
        'Layertreepanel',
        'LoginController',
        'AdmController'
//        'Layertree'
    ],
    autoCreateViewport: true
});

/**
 * For dev purpose only
 */
var ctrl, map, mapPanel;