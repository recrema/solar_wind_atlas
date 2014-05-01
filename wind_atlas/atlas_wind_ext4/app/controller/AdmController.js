/**
 * Admin controller
 * to controll the admin pannel
 */
Ext.define('AM.controller.AdmController', {
    extend: 'Ext.app.Controller',
    views: ['AdmView'],
    //    requires: ['AM.view.Layertreepanel'],

    init: function () {


        admController = this;
        this.control({
            'mappanel': {
                'launchAdm': this.onAdmLaunch,

            }
        }, this);
    },


    
    onAdmLaunch: function () {
    	console.log('admin pannel launched');
    	var window=admController.getView('AdmView').create();
    	window.show();
    },


    onLaunch: function () {

        ctrl = this;
    }
});
