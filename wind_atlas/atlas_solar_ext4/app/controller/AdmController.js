/**
 * Admin controller
 * to controll the admin pannel
 */
Ext.define('AM.controller.AdmController', {
    extend: 'Ext.app.Controller',
    views: ['AdmView'],

    init: function () {


        admController = this;
        this.control({
            'mappanel': {
                'launchAdm': this.onAdmLaunch,
            }
        }, this);
    },

    onAdmLaunch: function () {
    	var window=admController.getView('AdmView').create();
    	window.show();
    },


    onLaunch: function () {

        ctrl = this;
    }
});
