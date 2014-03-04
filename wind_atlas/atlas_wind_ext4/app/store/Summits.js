/**
 * The store used for summits
 */
Ext.define('AM.store.Summits', {
    extend: 'GeoExt.data.FeatureStore',
    model: 'AM.model.Summit',
    autoLoad: false
});
