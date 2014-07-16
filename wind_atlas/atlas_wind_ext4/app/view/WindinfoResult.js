Ext.define('AM.view.WindinfoResult', {
	extend: 'Ext.tab.Panel',
	alias: 'widget.windinfoResult',
	border: true,
	hidden: false,
	autoScroll: 'true',


	initComponent: function(config) {
		windinfoResult = this;
        Ext.apply(this, {
        	  items: [
       {
			id:'windinfoResultTab1',
            title: 'Info',
            autoScroll: true,
//            html : 'A message or html with images to help the user how to use the form.',
            contentEl:'windinfoform',

        },
        {
            id   : 'windinfoResultTab2',
            title: 'Tab 2',
            html : 'Another one',
            hidden: true
        },
        {
            id   : 'windinfoResultTab3',
            title: 'Tab 3',
            html : 'Another one',
            hidden: true
        }
        	     ]
        });
		this.callParent(arguments);
	}
})