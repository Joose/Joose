/*
 * Ext JS Library 3.0 RC1
 * Copyright(c) 2006-2009, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */

/**
 * @class Ext.chart.Chart
 * @extends Ext.FlashComponent
 * @constructor
 * @xtype chart
 */
Ext.chart.Chart = Ext.extend(Ext.FlashComponent, {
    url: "http:/"+"/yui.yahooapis.com/2.5.1/build/charts/assets/charts.swf",
    refreshBuffer: 100,
    // style defaults
    chartStyle: {
        padding: 10,
        animationEnabled: true,
        font: {
            name: 'Tahoma',
            color: 0x444444,
            size: 11
        },
        dataTip: {
            padding: 5,
            border: {
                color: 0x99bbe8,
                size:1
            },
            background: {
                color: 0xDAE7F6,
                alpha: .9
            },
            font: {
                name: 'Tahoma',
                color: 0x15428B,
                size: 10,
                bold: true
            }
        }
    },

    initComponent : function(){
        Ext.chart.Chart.superclass.initComponent.call(this);

        this.addEvents(
            'itemmouseover',
            'itemmouseout',
            'itemclick',
            'itemdoubleclick',
            'itemdragstart',
            'itemdrag',
            'itemdragend'
        );
    },

    /**
     * Sets a single style value on the Chart instance.
     *
     * @param name {String} Name of the Chart style value to change.
     * @param value {Object} New value to pass to the Chart style.
     */
     setStyle: function(name, value){
             value = Ext.encode(value);
             this.swf.setStyle(name, value);
     },

    /**
     * Resets all styles on the Chart instance.
     *
     * @param styles {Object} Initializer for all Chart styles.
     */
    setStyles: function(styles){
            styles = Ext.encode(styles);
            this.swf.setStyles(styles);
    },

    /**
     * Sets the styles on all series in the Chart.
     *
     * @param styles {Array} Initializer for all Chart series styles.
     */
    setSeriesStyles: function(styles){
            for(var i = 0; i < styles.length; i++){
                    styles[i] = Ext.encode(styles[i]);
            }
            this.swf.setSeriesStyles(styles);
    },

    setCategoryNames : function(names){
        this.swf.setCategoryNames(names);
    },

    setTipRenderer : function(fn){
        var chart = this;
        this.tipFnName = this.createFnProxy(function(item, index, series){
            var record = chart.store.getAt(index);
            return fn(chart, record, index, series);
        }, this.tipFnName);
        this.swf.setDataTipFunction(this.tipFnName);
    },

    setSeries : function(series){
        this.series = series;
        this.refresh();
    },

    /**
     * Changes the data store bound to this chart and refreshes it.
     * @param {Store} store The store to bind to this chart
     */
    bindStore : function(store, initial){
        if(!initial && this.store){
            this.store.un("datachanged", this.refresh, this);
            this.store.un("add", this.delayRefresh, this);
            this.store.un("remove", this.delayRefresh, this);
            this.store.un("update", this.delayRefresh, this);
            this.store.un("clear", this.refresh, this);
            if(store !== this.store && this.store.autoDestroy){
                this.store.destroy();
            }
        }
        if(store){
            store = Ext.StoreMgr.lookup(store);
            store.on("datachanged", this.refresh, this);
            store.on("add", this.delayRefresh, this);
            store.on("remove", this.delayRefresh, this);
            store.on("update", this.delayRefresh, this);
            store.on("clear", this.refresh, this);
        }
        this.store = store;
        if(store && !initial){
            this.refresh();
        }
    },

    onSwfReady : function(isReset){
        Ext.chart.Chart.superclass.onSwfReady.call(this, isReset);

        this.swf.setType(this.type);

        if(this.chartStyle){
			this.setStyles(this.chartStyle);
		}

        if(this.categoryNames){
            this.setCategoryNames(this.categoryNames);
        }

        if(this.tipRenderer){
            this.setTipRenderer(this.tipRenderer);
        }
        if(!isReset){
            this.bindStore(this.store, true);
        }
        this.refresh.defer(10, this);
    },

    delayRefresh : function(){
        if(!this.refreshTask){
            this.refreshTask = new Ext.util.DelayedTask(this.refresh, this);
        }
        this.refreshTask.delay(this.refreshBuffer);
    },

    refresh : function(){
        var styleChanged = false;
        // convert the store data into something YUI charts can understand
        var data = [], rs = this.store.data.items;
        for(var j = 0, len = rs.length; j < len; j++){
            data[j] = rs[j].data;
        }
        //make a copy of the series definitions so that we aren't
        //editing them directly.
        var dataProvider = [];
        var seriesCount = 0;
        var currentSeries = null;
        var i = 0;
        if(this.series){
            seriesCount = this.series.length;
            for(i = 0; i < seriesCount; i++){
                currentSeries = this.series[i];
                var clonedSeries = {};
                for(var prop in currentSeries){
                    if(prop == "style" && currentSeries.style !== null){
                        clonedSeries.style = Ext.encode(currentSeries.style);
                        styleChanged = true;
                        //we don't want to modify the styles again next time
                        //so null out the style property.
                        // this causes issues
                        // currentSeries.style = null;
                    } else{
                        clonedSeries[prop] = currentSeries[prop];
                    }
                }
                dataProvider.push(clonedSeries);
            }
        }

        if(seriesCount > 0){
            for(i = 0; i < seriesCount; i++){
                currentSeries = dataProvider[i];
                if(!currentSeries.type){
                    currentSeries.type = this.type;
                }
                currentSeries.dataProvider = data;
            }
        } else{
            dataProvider.push({type: this.type, dataProvider: data});
        }
        this.swf.setDataProvider(dataProvider, (this.isFirst = (this.isFirst === undefined)));
    },

    createFnProxy : function(fn, old){
        if(old){
            delete window[old];
        }
        var fnName = "extFnProxy" + (++Ext.chart.Chart.PROXY_FN_ID);
        window[fnName] = fn;
        return fnName;
    }
});
Ext.reg('chart', Ext.chart.Chart);
Ext.chart.Chart.PROXY_FN_ID = 0;

/**
 * @class Ext.chart.PieChart
 * @extends Ext.chart.Chart
 * @constructor
 * @xtype piechart
 */
Ext.chart.PieChart = Ext.extend(Ext.chart.Chart, {
    type: 'pie',

    onSwfReady : function(isReset){
        Ext.chart.PieChart.superclass.onSwfReady.call(this, isReset);

        this.setDataField(this.dataField);
        this.setCategoryField(this.categoryField);
    },

    setDataField : function(field){
        this.dataField = field;
        this.swf.setDataField(field);
    },

    setCategoryField : function(field){
        this.categoryField = field;
        this.swf.setCategoryField(field);
    }
});
Ext.reg('piechart', Ext.chart.PieChart);

/**
 * @class Ext.chart.CartesianChart
 * @extends Ext.chart.Chart
 * @constructor
 * @xtype cartesianchart
 */
Ext.chart.CartesianChart = Ext.extend(Ext.chart.Chart, {
    onSwfReady : function(isReset){
        Ext.chart.CartesianChart.superclass.onSwfReady.call(this, isReset);

        if(this.xField){
            this.setXField(this.xField);
        }
        if(this.yField){
            this.setYField(this.yField);
        }
        if(this.xAxis){
            this.setXAxis(this.xAxis);
        }
        if(this.yAxis){
            this.setYAxis(this.yAxis);
        }
    },

    setXField : function(value){
        this.xField = value;
        this.swf.setHorizontalField(value);
    },

    setYField : function(value){
        this.yField = value;
        this.swf.setVerticalField(value);
    },

    setXAxis : function(value){
        this.xAxis = this.createAxis('xAxis', value);
        this.swf.setHorizontalAxis(this.xAxis);
    },

    setYAxis : function(value){
        this.yAxis = this.createAxis('yAxis', value);
        this.swf.setVerticalAxis(this.yAxis);
    },

    createAxis : function(axis, value){
        var o = Ext.apply({}, value), oldFn = null;
        if(this[axis]){
            oldFn = this[axis].labelFunction;
        }
        if(o.labelRenderer){
            var fn = o.labelRenderer;
            o.labelFunction = this.createFnProxy(function(v){
                return fn(v);
            }, oldFn);
            delete o.labelRenderer;
        }
        return o;
    }
});
Ext.reg('cartesianchart', Ext.chart.CartesianChart);

/**
 * @class Ext.chart.LineChart
 * @extends Ext.chart.CartesianChart
 * @constructor
 * @xtype linechart
 */
Ext.chart.LineChart = Ext.extend(Ext.chart.CartesianChart, {
    type: 'line'
});
Ext.reg('linechart', Ext.chart.LineChart);

/**
 * @class Ext.chart.ColumnChart
 * @extends Ext.chart.CartesianChart
 * @constructor
 * @xtype columnchart
 */
Ext.chart.ColumnChart = Ext.extend(Ext.chart.CartesianChart, {
    type: 'column'
});
Ext.reg('columnchart', Ext.chart.ColumnChart);

/**
 * @class Ext.chart.BarChart
 * @extends Ext.chart.CartesianChart
 * @constructor
 * @xtype barchart
 */
Ext.chart.BarChart = Ext.extend(Ext.chart.CartesianChart, {
    type: 'bar'
});
Ext.reg('barchart', Ext.chart.BarChart);



/**
 * @class Ext.chart.Axis
 * Defines a CartesianChart's vertical or horizontal axis.
 * @constructor
 */
Ext.chart.Axis = function(config){
    Ext.apply(this, config);
};

Ext.chart.Axis.prototype =
{
	/**
	 * The type of axis.
	 *
	 * @property type
	 * @type String
	 */
	type: null,

	/**
	 * The direction in which the axis is drawn. May be "horizontal" or "vertical".
	 *
	 * @property orientation
	 * @type String
	 */
	orientation: "horizontal",

	/**
	 * If true, the items on the axis will be drawn in opposite direction.
	 *
	 * @property reverse
	 * @type Boolean
	 */
	reverse: false,

	/**
	 * A string reference to the globally-accessible function that may be called to
	 * determine each of the label values for this axis.
	 *
	 * @property labelFunction
	 * @type String
	 */
	labelFunction: null,

	/**
	 * If true, labels that overlap previously drawn labels on the axis will be hidden.
	 *
	 * @property hideOverlappingLabels
	 * @type Boolean
	 */
	hideOverlappingLabels: true
};

/**
 * @class Ext.chart.NumericAxis
 * @extends Ext.chart.Axis
 * A type of axis whose units are measured in numeric values.
 * @constructor
 */
Ext.chart.NumericAxis = Ext.extend(Ext.chart.Axis, {
	type: "numeric",

	/**
	 * The minimum value drawn by the axis. If not set explicitly, the axis minimum
	 * will be calculated automatically.
	 *
	 * @property minimum
	 * @type Number
	 */
	minimum: NaN,

	/**
	 * The maximum value drawn by the axis. If not set explicitly, the axis maximum
	 * will be calculated automatically.
	 *
	 * @property maximum
	 * @type Number
	 */
	maximum: NaN,

	/**
	 * The spacing between major intervals on this axis.
	 *
	 * @property majorUnit
	 * @type Number
	 */
	majorUnit: NaN,

	/**
	 * The spacing between minor intervals on this axis.
	 *
	 * @property minorUnit
	 * @type Number
	 */
	minorUnit: NaN,

	/**
	 * If true, the labels, ticks, gridlines, and other objects will snap to
	 * the nearest major or minor unit. If false, their position will be based
	 * on the minimum value.
	 *
	 * @property snapToUnits
	 * @type Boolean
	 */
	snapToUnits: true,

	/**
	 * If true, and the bounds are calculated automatically, either the minimum or
	 * maximum will be set to zero.
	 *
	 * @property alwaysShowZero
	 * @type Boolean
	 */
	alwaysShowZero: true,

	/**
	 * The scaling algorithm to use on this axis. May be "linear" or "logarithmic".
	 *
	 * @property scale
	 * @type String
	 */
	scale: "linear"
});

/**
 * @class Ext.chart.TimeAxis
 * @extends Ext.chart.Axis
 * A type of axis whose units are measured in time-based values.
 * @constructor
 */
Ext.chart.TimeAxis = Ext.extend(Ext.chart.Axis, {
	type: "time",

	/**
	 * The minimum value drawn by the axis. If not set explicitly, the axis minimum
	 * will be calculated automatically.
	 *
	 * @property minimum
	 * @type Date
	 */
	minimum: null,

	/**
	 * The maximum value drawn by the axis. If not set explicitly, the axis maximum
	 * will be calculated automatically.
	 *
	 * @property maximum
	 * @type Number
	 */
	maximum: null,

	/**
	 * The spacing between major intervals on this axis.
	 *
	 * @property majorUnit
	 * @type Number
	 */
	majorUnit: NaN,

	/**
	 * The time unit used by the majorUnit.
	 *
	 * @property majorTimeUnit
	 * @type String
	 */
	majorTimeUnit: null,

	/**
	 * The spacing between minor intervals on this axis.
	 *
	 * @property majorUnit
	 * @type Number
	 */
	minorUnit: NaN,

	/**
	 * The time unit used by the minorUnit.
	 *
	 * @property majorTimeUnit
	 * @type String
	 */
	minorTimeUnit: null,

	/**
	 * If true, the labels, ticks, gridlines, and other objects will snap to
	 * the nearest major or minor unit. If false, their position will be based
	 * on the minimum value.
	 *
	 * @property snapToUnits
	 * @type Boolean
	 */
	snapToUnits: true
});

/**
 * @class Ext.chart.CategoryAxis
 * @extends Ext.chart.Axis
 * A type of axis that displays items in categories.
 * @constructor
 */
Ext.chart.CategoryAxis = Ext.extend(Ext.chart.Axis, {
	type: "category",

	/**
	 * A list of category names to display along this axis.
	 *
	 * @property categoryNames
	 * @type Array
	 */
	categoryNames: null
});

/**
 * @class Ext.chart.Series
 * Series class for the charts widget.
 * @constructor
 */
Ext.chart.Series = function(config) { Ext.apply(this, config); };

Ext.chart.Series.prototype =
{
	/**
	 * The type of series.
	 *
	 * @property type
	 * @type String
	 */
	type: null,

	/**
	 * The human-readable name of the series.
	 *
	 * @property displayName
	 * @type String
	 */
	displayName: null
};

/**
 * @class Ext.chart.CartesianSeries
 * @extends Ext.chart.Series
 * CartesianSeries class for the charts widget.
 * @constructor
 */
Ext.chart.CartesianSeries = Ext.extend(Ext.chart.Series, {
	/**
	 * The field used to access the x-axis value from the items from the data source.
	 *
	 * @property xField
	 * @type String
	 */
	xField: null,

	/**
	 * The field used to access the y-axis value from the items from the data source.
	 *
	 * @property yField
	 * @type String
	 */
	yField: null
});

/**
 * @class Ext.chart.ColumnSeries
 * @extends Ext.chart.CartesianSeries
 * ColumnSeries class for the charts widget.
 * @constructor
 */
Ext.chart.ColumnSeries = Ext.extend(Ext.chart.CartesianSeries, {
	type: "column"
});

/**
 * @class Ext.chart.LineSeries
 * @extends Ext.chart.CartesianSeries
 * LineSeries class for the charts widget.
 * @constructor
 */
Ext.chart.LineSeries = Ext.extend(Ext.chart.CartesianSeries, {
	type: "line"
});

/**
 * @class Ext.chart.BarSeries
 * @extends Ext.chart.CartesianSeries
 * BarSeries class for the charts widget.
 * @constructor
 */
Ext.chart.BarSeries = Ext.extend(Ext.chart.CartesianSeries, {
	type: "bar"
});


/**
 * @class Ext.chart.PieSeries
 * @extends Ext.chart.Series
 * PieSeries class for the charts widget.
 * @constructor
 */
Ext.chart.PieSeries = Ext.extend(Ext.chart.Series, {
	type: "pie",
	dataField: null,
	categoryField: null
});