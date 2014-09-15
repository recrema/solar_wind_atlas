/**
 * Help Action
 * @extends Ext.Action
 */
Ext.define('AM.view.request.Action', {
    extend: 'Ext.Action',
    alias : 'widget.requestaction',
    requires: ['AM.view.request.Window'],

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
                    this._window = Ext.create('AM.view.request.Window', {
                        contentEl: this.windowContentEl
                    });
                }
                this._window.show();
            }
        });
        this.callParent(arguments);
    }
});
