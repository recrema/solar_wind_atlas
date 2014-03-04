/**
 * Help Action
 * @extends Ext.Action
 */
Ext.define('AM.view.help.Action', {
    extend: 'Ext.Action',
    alias : 'widget.helpaction',
    requires: ['AM.view.help.Window'],

    /**
     * @property {String} windowContentEl
     * Sets the window contentEl property
     */
    /**
     * @cfg {Boolean} activateOnEnable
     *  Sets the window contentEl property
     */
    windowContentEl: null,

    /**
     * @private
     * @cfg {_window}
     *  The instance of the help window created.
     */
    _window: null,

    /**
     * @private
     *
     * Create a CF.view.help.Action instance.
     *
     * @param {Object} config (optional) Config object.
     *
     */
    constructor: function(config) {
        Ext.apply(config, {
            handler: function() {
                if (!this._window) {
                    this._window = Ext.create('AM.view.help.Window', {
                        contentEl: this.windowContentEl
                    });
                }
                this._window.show();
            },
            text: "Help"
        });
        this.callParent(arguments);
    }
});
