/*
 * Ext JS Library 3.0 RC1
 * Copyright(c) 2006-2009, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */

/**
 * @class Ext.data.DirectProxy
 * @extends Ext.data.DataProxy
 */
Ext.data.DirectProxy = function(config){
    Ext.apply(this, config);

	// I think this code should be moved to DataProxy but we must first send
	// config object into superclass (not sure why it's not).  Set default api if not set.
	// We have to take care setting the api since it's a complex object.  Ext.apply doesn't
	// do it properly.
	this.api = config.api || {
		load: undefined,
		save: undefined,
		create: undefined,
		destroy: undefined
	};

    if(typeof this.paramOrder == 'string'){
        this.paramOrder = this.paramOrder.split(/[\s,|]/);
    }
    Ext.data.DirectProxy.superclass.constructor.call(this);
};

Ext.extend(Ext.data.DirectProxy, Ext.data.DataProxy, {
	/**
	 * @cfg {Array/String} paramOrder Defaults to <tt>undefined</tt>. A list of params to be executed
	 * server side.  Specify the params in the order in which they must be executed on the server-side
	 * as either (1) an Array of String values, or (2) a String of params delimited by either whitespace,
	 * comma, or pipe. For example,
	 * any of the following would be acceptable:<pre><code>
paramOrder: ['param1','param2','param3']
paramOrder: 'param1 param2 param3'
paramOrder: 'param1,param2,param3'
paramOrder: 'param1|param2|param'
	 </code></pre>
	 */
	paramOrder: undefined,

	/**
	 * @cfg {Boolean} paramsAsHash
	 * Send parameters as a collection of named arguments (defaults to <tt>true</tt>). Providing a
	 * <tt>{@link #paramOrder}</tt> nullifies this configuration.
	 */
	paramsAsHash: true,

	// protected
	doRequest : function(action, rs, params, reader, writer, cb, scope, options) {
		var args = [];
		var directFn = this.api[action];
		switch (action) {
			case 'save':
				args.push(params[reader.meta.idProperty]);	// <-- save(Integer/Integer[], Hash/Hash[])
				args.push(params[writer.dataProperty]);
				break;
			case 'destroy':
				args.push(params[writer.dataProperty]);		// <-- destroy(Int/Int[])
				break;
			case 'create':
				args.push(params[writer.dataProperty]);		// <-- create(Hash)
				break;
			case 'load':
				args.push(params);							// <-- load(Hash)
				break;
		}
		args.push(this.createCallback(action, reader, cb, scope, options));
		directFn.apply(window, args);
	},

	// private
	createCallback : function(action, reader, cb, scope, arg) {
		return {
			callback: (action == 'load') ? function(result, e){
				if (!e.status) {
					this.fireEvent(action+"exception", this, e, result);
					cb.call(scope, null, arg, false);
					return;
				}
				var records;
				try {
					records = reader.readRecords(result);
				}
				catch (ex) {
					this.fireEvent(action+"exception", this, e, result, ex);
					cb.call(scope, null, arg, false);
					return;
				}
				this.fireEvent(action, this, e, arg);
				cb.call(scope, records, arg, true);
			} : function(result, e){
				if(!e.status){
					this.fireEvent(action+"exception", this, e);
        			cb.call(scope, null, e, false);
        			return;
				}
		        this.fireEvent(action, this, result, e, arg);
		        cb.call(scope, result, e, true);
			},
			scope: this
		}
	}
});
