/**
 * Login controller
 * Used to manage the login
 */
Ext.define('AM.controller.LoginController', {
    extend: 'Ext.app.Controller',
    views: ['LoginView'],

    init: function () {
        loginController = this;
        this.control({
            'mappanel': {
                'launchLogin': this.onLoginLaunch,
                'initCheckLogin':this.initCheckLogin,
            }
        	
        }, this);
    },

    initCheckLogin:function () {
        Ext.Ajax.request({
            url : "php/LoginController.php",
            method : "POST",
            params : {_action:'1'},
            callback : function(options,success,result){
              var response = Ext.decode(result.responseText);
              if(response.success){
            	  loginController.onLogin(response);
              }
              else{
            	  loginController.onLogout();
              }
            }
          });
    },
    
    
    
    onLoginLaunch: function () {
    	var window=loginController.getView('LoginView').create();
    	window.show();
    },
    onLogin: function (result) {
        if(typeof(loginView) != "undefined" && loginView !== null) {
        	loginView.close();
        }
        Ext.ComponentQuery.query('mappanel #loginButton')[0].hide();
        if(typeof(Ext.ComponentQuery.query('mappanel #logOutButton')[0]) != "undefined" && Ext.ComponentQuery.query('mappanel #logOutButton')[0]!== null) {
        	return false
        }
        else {
	        var itemsToolbar=Ext.ComponentQuery.query('mappanel #itemsToolbar')[0];
	        var requestAction=Ext.create('Ext.button.Button', Ext.create('AM.view.request.Action', {
	        	itemId:"reqButton",
	        	disabled: false,
	        	tooltip: "Request Tailored Report",
	            id: "reqButton",
	            cls:'request_button'
	        }));
	        itemsToolbar.add(
	        		{
	        			xtype:"label",
	        			itemId:"labelLogin",
	        			text: 'Welcome: '+result.user
	        		},
	        		{ xtype: 'tbseparator',
	        			itemId:'loginSeparator'
	        			},requestAction,{ xtype: 'tbspacer',
		                	itemId:'loginSpace'},
	            	{
	            		xtype:"button",
	            		cls:'admin_button',
	                    itemId:"admButton",
	                    id: "admButton",
	                    handler: function(state) {
	                    	var mapView=Ext.ComponentQuery.query('mappanel')[0];
	                    	mapView.fireEvent('launchAdm');
	                    },
	                    disabled: false,
	                    tooltip: "Admin Panel"
	                },{ xtype: 'tbspacer',
	                	itemId:'loginSpace'},
	            	{
	            		xtype:"button",
	                    cls: 'logout_button',
	                    itemId:"logOutButton",
	                    id: "logOutButton",
	                    handler: function() {
	                    	loginController.onLogout();
	                    },
	                    disabled: false,
	                    tooltip: "Logout"
	                }
	        		
	        );
	        
	        statInfo=Ext.ComponentQuery.query('headerMain [itemId=statInfoFlash]')[0];
	        if(statInfo){
	        	statInfo.destroy();
	        }

        }
    },

    
    onLogout: function () {
    	
        Ext.Ajax.request({
            url : "php/LoginController.php",
            method : "POST",
            params : {_action:'2'},
            callback : function(options,success,result){
              var response = Ext.decode(result.responseText);
              if(response.success){
            	  Ext.ComponentQuery.query('mappanel #logOutButton')[0].destroy();
            	  Ext.ComponentQuery.query('mappanel #admButton')[0].destroy();
            	  Ext.ComponentQuery.query('mappanel #reqButton')[0].destroy();
            	  Ext.ComponentQuery.query('mappanel #loginSeparator')[0].destroy();
            	  Ext.ComponentQuery.query('mappanel #loginSpace')[0].destroy();
            	  Ext.ComponentQuery.query('mappanel #labelLogin')[0].destroy();
            	  Ext.ComponentQuery.query('mappanel #loginButton')[0].show();
              }else{
                  if(typeof(Ext.ComponentQuery.query('mappanel #logOutButton')[0]) != "undefined" && Ext.ComponentQuery.query('mappanel #logOutButton')[0]!== null) {
                	  Ext.ComponentQuery.query('mappanel #logOutButton')[0].destroy();
                	  Ext.ComponentQuery.query('mappanel #admButton')[0].destroy();
                	  Ext.ComponentQuery.query('mappanel #reqButton')[0].destroy();
                	  Ext.ComponentQuery.query('mappanel #loginSeparator')[0].destroy();
                	  Ext.ComponentQuery.query('mappanel #loginSpace')[0].destroy();
                	  Ext.ComponentQuery.query('mappanel #labelLogin')[0].destroy();
                	  Ext.ComponentQuery.query('mappanel #loginButton')[0].show();
                  }
              }
            }
          });

    },
    

    onLaunch: function () {

        ctrl = this;
    }
});
