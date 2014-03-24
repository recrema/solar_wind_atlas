Ext.define('AM.view.WindinfoResult', {
	extend: 'Ext.tab.Panel',
	alias: 'widget.windinfoResult',

	border: true,

//	region: 'west',
//	split: 'true',
	hidden: false,
//	bodyStyle: 'transparent:50%;',
	autoScroll: 'true',


	initComponent: function(config) {
		windinfoResult = this;
        Ext.apply(this, {
        	  items: [
       {
			id:'windinfoResultTab1',
            title: 'Warning',
            html : 'A message or html with images to help the user how to use the form.',

        },
        {
            id   : 'windinfoResultTab2',
            title: 'Tab 2',
            html : 'Another one',
            hidden: true
        }
        	     ]
        });
		this.callParent(arguments);
		
		
	}

})