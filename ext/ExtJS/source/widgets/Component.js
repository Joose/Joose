/*
 * Ext JS Library 3.0 RC1
 * Copyright(c) 2006-2009, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */

/**
 * @class Ext.Component
 * @extends Ext.util.Observable
 * <p>Base class for all Ext components.  All subclasses of Component may participate in the automated
 * Ext component lifecycle of creation, rendering and destruction which is provided by the {@link Ext.Container Container} class.
 * Components may be added to a Container through the {@link Ext.Container#items items} config option at the time the Container is created,
 * or they may be added dynamically via the {@link Ext.Container#add add} method.</p>
 * <p>The Component base class has built-in support for basic hide/show and enable/disable behavior.</p>
 * <p>All Components are registered with the {@link Ext.ComponentMgr} on construction so that they can be referenced at any time via
 * {@link Ext#getCmp}, passing the {@link #id}.</p>
 * <p>All user-developed visual widgets that are required to participate in automated lifecycle and size management should subclass Component (or
 * {@link Ext.BoxComponent} if managed box model handling is required, ie height and width management).</p>
 * <p>Every component has a specific xtype, which is its Ext-specific type name, along with methods for checking the
 * xtype like {@link #getXType} and {@link #isXType}. This is the list of all valid xtypes:</p>
 * <pre>
xtype            Class
-------------    ------------------
box              {@link Ext.BoxComponent}
button           {@link Ext.Button}
buttongroup      {@link Ext.ButtonGroup}
colorpalette     {@link Ext.ColorPalette}
component        {@link Ext.Component}
container        {@link Ext.Container}
cycle            {@link Ext.CycleButton}
dataview         {@link Ext.DataView}
datepicker       {@link Ext.DatePicker}
editor           {@link Ext.Editor}
editorgrid       {@link Ext.grid.EditorGridPanel}
flash            {@link Ext.FlashComponent}
grid             {@link Ext.grid.GridPanel}
listview         {@link Ext.ListView}
panel            {@link Ext.Panel}
progress         {@link Ext.ProgressBar}
propertygrid     {@link Ext.grid.PropertyGrid}
slider           {@link Ext.Slider}
spacer           {@link Ext.Spacer}
splitbutton      {@link Ext.SplitButton}
tabpanel         {@link Ext.TabPanel}
treepanel        {@link Ext.tree.TreePanel}
viewport         {@link Ext.ViewPort}
window           {@link Ext.Window}

Toolbar components
---------------------------------------
paging           {@link Ext.PagingToolbar}
toolbar          {@link Ext.Toolbar}
tbbutton         {@link Ext.Toolbar.Button}        (deprecated; use button)
tbfill           {@link Ext.Toolbar.Fill}
tbitem           {@link Ext.Toolbar.Item}
tbseparator      {@link Ext.Toolbar.Separator}
tbspacer         {@link Ext.Toolbar.Spacer}
tbsplit          {@link Ext.Toolbar.SplitButton}   (deprecated; use splitbutton)
tbtext           {@link Ext.Toolbar.TextItem}

Menu components
---------------------------------------
menu             {@link Ext.menu.Menu}
colormenu        {@link Ext.menu.ColorMenu}
datemenu         {@link Ext.menu.DateMenu}
menubaseitem     {@link Ext.menu.BaseItem}
menucheckitem    {@link Ext.menu.CheckItem}
menuitem         {@link Ext.menu.Item}
menuseparator    {@link Ext.menu.Separator}
menutextitem     {@link Ext.menu.TextItem}

Form components
---------------------------------------
form             {@link Ext.FormPanel}
checkbox         {@link Ext.form.Checkbox}
checkboxgroup    {@link Ext.form.CheckboxGroup}
combo            {@link Ext.form.ComboBox}
datefield        {@link Ext.form.DateField}
displayfield     {@link Ext.form.DisplayField}
field            {@link Ext.form.Field}
fieldset         {@link Ext.form.FieldSet}
hidden           {@link Ext.form.Hidden}
htmleditor       {@link Ext.form.HtmlEditor}
label            {@link Ext.form.Label}
numberfield      {@link Ext.form.NumberField}
radio            {@link Ext.form.Radio}
radiogroup       {@link Ext.form.RadioGroup}
textarea         {@link Ext.form.TextArea}
textfield        {@link Ext.form.TextField}
timefield        {@link Ext.form.TimeField}
trigger          {@link Ext.form.TriggerField}

Chart components
---------------------------------------
chart            {@link Ext.chart.Chart}
barchart         {@link Ext.chart.BarChart}
cartesianchart   {@link Ext.chart.CartesianChart}
columnchart      {@link Ext.chart.ColumnChart}
linechart        {@link Ext.chart.LineChart}
piechart         {@link Ext.chart.PieChart}

Store xtypes
---------------------------------------
arraystore       {@link Ext.data.ArrayStore}
directstore      {@link Ext.data.DirectStore}
jsonstore        {@link Ext.data.JsonStore}
simplestore      {@link Ext.data.SimpleStore}      (deprecated; use arraystore)
store            {@link Ext.data.Store}
xmlstore         {@link Ext.data.XmlStore}
</pre>
 * @constructor
 * @param {Ext.Element/String/Object} config The configuration options may be specified as either:
 * <div class="mdetail-params"><ul>
 * <li><b>an element</b> : 
 * <p class="sub-desc">it is set as the internal element and its id used as the component id</p></li>
 * <li><b>a string</b> : 
 * <p class="sub-desc">it is assumed to be the id of an existing element and is used as the component id</p></li>
 * <li><b>anything else</b> : 
 * <p class="sub-desc">it is assumed to be a standard config object and is applied to the component</p></li>
 * </ul></div>
 */
Ext.Component = function(config){
    config = config || {};
    if(config.initialConfig){
        if(config.isAction){           // actions
            this.baseAction = config;
        }
        config = config.initialConfig; // component cloning / action set up
    }else if(config.tagName || config.dom || typeof config == "string"){ // element object
        config = {applyTo: config, id: config.id || config};
    }

    /**
     * This Component's initial configuration specification. Read-only.
     * @type Object
     * @property initialConfig
     */
    this.initialConfig = config;

    Ext.apply(this, config);
    this.addEvents(
        /**
         * @event disable
         * Fires after the component is disabled.
         * @param {Ext.Component} this
         */
        'disable',
        /**
         * @event enable
         * Fires after the component is enabled.
         * @param {Ext.Component} this
         */
        'enable',
        /**
         * @event beforeshow
         * Fires before the component is shown. Return false to stop the show.
         * @param {Ext.Component} this
         */
        'beforeshow',
        /**
         * @event show
         * Fires after the component is shown.
         * @param {Ext.Component} this
         */
        'show',
        /**
         * @event beforehide
         * Fires before the component is hidden. Return false to stop the hide.
         * @param {Ext.Component} this
         */
        'beforehide',
        /**
         * @event hide
         * Fires after the component is hidden.
         * @param {Ext.Component} this
         */
        'hide',
        /**
         * @event beforerender
         * Fires before the component is rendered. Return false to stop the render.
         * @param {Ext.Component} this
         */
        'beforerender',
        /**
         * @event render
         * Fires after the component markup is rendered.
         * @param {Ext.Component} this
         */
        'render',
        /**
         * @event afterrender
         * Fires after the component rendering is finished.
         * @param {Ext.Component} this
         */
        'afterrender',
        /**
         * @event beforedestroy
         * Fires before the component is destroyed. Return false to stop the destroy.
         * @param {Ext.Component} this
         */
        'beforedestroy',
        /**
         * @event destroy
         * Fires after the component is destroyed.
         * @param {Ext.Component} this
         */
        'destroy',
        /**
         * @event beforestaterestore
         * Fires before the state of the component is restored. Return false to stop the restore.
         * @param {Ext.Component} this
         * @param {Object} state The hash of state values returned from the StateProvider. If this
         * event is not vetoed, then the state object is passed to <b><tt>applyState</tt></b>. By default,
         * that simply copies property values into this Component. The method maybe overriden to
         * provide custom state restoration.
         */
        'beforestaterestore',
        /**
         * @event staterestore
         * Fires after the state of the component is restored.
         * @param {Ext.Component} this
         * @param {Object} state The hash of state values returned from the StateProvider. This is passed
         * to <b><tt>applyState</tt></b>. By default, that simply copies property values into this
         * Component. The method maybe overriden to provide custom state restoration.
         */
        'staterestore',
        /**
         * @event beforestatesave
         * Fires before the state of the component is saved to the configured state provider. Return false to stop the save.
         * @param {Ext.Component} this
         * @param {Object} state The hash of state values. This is determined by calling
         * <b><tt>getState()</tt></b> on the Component. This method must be provided by the
         * developer to return whetever representation of state is required, by default, Ext.Component
         * has a null implementation.
         */
        'beforestatesave',
        /**
         * @event statesave
         * Fires after the state of the component is saved to the configured state provider.
         * @param {Ext.Component} this
         * @param {Object} state The hash of state values. This is determined by calling
         * <b><tt>getState()</tt></b> on the Component. This method must be provided by the
         * developer to return whetever representation of state is required, by default, Ext.Component
         * has a null implementation.
         */
        'statesave'
    );
    this.getId();
    Ext.ComponentMgr.register(this);
    Ext.Component.superclass.constructor.call(this);

    if(this.baseAction){
        this.baseAction.addComponent(this);
    }

    this.initComponent();

    if(this.plugins){
        if(Ext.isArray(this.plugins)){
            for(var i = 0, len = this.plugins.length; i < len; i++){
                this.plugins[i] = this.initPlugin(this.plugins[i]);
            }
        }else{
            this.plugins = this.initPlugin(this.plugins);
        }
    }

    if(this.stateful !== false){
        this.initState(config);
    }

    if(this.applyTo){
        this.applyToMarkup(this.applyTo);
        delete this.applyTo;
    }else if(this.renderTo){
        this.render(this.renderTo);
        delete this.renderTo;
    }
};

// private
Ext.Component.AUTO_ID = 1000;

Ext.extend(Ext.Component, Ext.util.Observable, {
	// Configs below are used for all Components when rendered by FormLayout.
    /**
     * @cfg {String} fieldLabel <p>The label text to display next to this Component (defaults to '').</p>
     * <br><p><b>Note</b>: this config is only used when this Component is rendered by a Container which
     * has been configured to use the <b>{@link Ext.layout.FormLayout FormLayout}</b> layout manager (eg. 
     * {@link Ext.form.FormPanel} or specifying <tt>layout:'form'</tt>).</p><br>
     * <p>Also see <tt>{@link #hideLabel}</tt> and
     * {@link Ext.layout.FormLayout}.{@link Ext.layout.FormLayout#fieldTpl fieldTpl}.</p>
     * Example use:<pre><code>
new Ext.FormPanel({
    height: 100,
    renderTo: Ext.getBody(),
    items: [{
        xtype: 'textfield',
        fieldLabel: 'Name'
    }]
});
</code></pre>
     */
    /**
     * @cfg {String} labelStyle <p>A CSS style specification string to apply directly to this field's
     * label.  Defaults to the container's labelStyle value if set (eg,
     * <tt>{@link Ext.layout.FormLayout#labelStyle}</tt> , or '').</p>
     * <br><p><b>Note</b>: see the note for <tt>{@link #clearCls}</tt>.</p><br>
     * <p>Also see <tt>{@link #hideLabel} and
     * {@link Ext.layout.FormLayout}.{@link Ext.layout.FormLayout#fieldTpl fieldTpl}.</p>
     * Example use:<pre><code>
new Ext.FormPanel({
    height: 100,
    renderTo: Ext.getBody(),
    items: [{
        xtype: 'textfield',
        fieldLabel: 'Name',
        labelStyle: 'font-weight:bold;'
    }]
});
</code></pre>
     */
    /**
     * @cfg {String} labelSeparator <p>The separator to display after the text of each
     * <tt>{@link #fieldLabel}</tt>.  This property may be configured at various levels.
     * The order of precedence is:
     * <div class="mdetail-params"><ul>
     * <li>field / component level</li>
     * <li>container level</li>
     * <li>{@link Ext.layout.FormLayout#labelSeparator layout level} (defaults to colon <tt>':'</tt>)</li>
     * </ul></div>
     * To display no separator for this field's label specify empty string ''.</p>
     * <br><p><b>Note</b>: see the note for <tt>{@link #clearCls}</tt>.</p><br>
     * <p>Also see <tt>{@link #hideLabel}</tt> and
     * {@link Ext.layout.FormLayout}.{@link Ext.layout.FormLayout#fieldTpl fieldTpl}.</p>
     * Example use:<pre><code>
new Ext.FormPanel({
    height: 100,
    renderTo: Ext.getBody(),
    layoutConfig: {
        labelSeparator: '~'   // layout config has lowest priority (defaults to ':')
    },
    {@link Ext.layout.FormLayout#labelSeparator labelSeparator}: '>>',     // config at container level 
    items: [{
        xtype: 'textfield',
        fieldLabel: 'Field 1',
        labelSeparator: '...' // field/component level config supersedes others
    },{
        xtype: 'textfield',
        fieldLabel: 'Field 2' // labelSeparator will be '='
    }]
});
</code></pre>
     */
    /**
     * @cfg {Boolean} hideLabel <p><tt>true</tt> to completely hide the label element
     * ({@link #fieldLabel label} and {@link #labelSeparator separator}). Defaults to <tt>false</tt>.
     * By default, even if you do not specify a <tt>{@link #fieldLabel}</tt> the space will still be
     * reserved so that the field will line up with other fields that do have labels.
     * Setting this to <tt>true</tt> will cause the field to not reserve that space.</p>
     * <br><p><b>Note</b>: see the note for <tt>{@link #clearCls}</tt>.</p><br>
     * Example use:<pre><code>
new Ext.FormPanel({
    height: 100,
    renderTo: Ext.getBody(),
    items: [{
        xtype: 'textfield'
        hideLabel: true
    }]
});
</code></pre>
     */
    /**
     * @cfg {String} clearCls <p>The CSS class used to to apply to the special clearing div rendered
     * directly after each form field wrapper to provide field clearing (defaults to
     * <tt>'x-form-clear-left'</tt>).</p>
     * <br><p><b>Note</b>: this config is only used when this Component is rendered by a Container
     * which has been configured to use the <b>{@link Ext.layout.FormLayout FormLayout}</b> layout
     * manager (eg. {@link Ext.form.FormPanel} or specifying <tt>layout:'form'</tt>) and either a 
     * <tt>{@link #fieldLabel}</tt> is specified or <tt>isFormField=true</tt> is specified.</p><br>
     * <p>See {@link Ext.layout.FormLayout}.{@link Ext.layout.FormLayout#fieldTpl fieldTpl} also.</p>
     */
    /**
     * @cfg {String} itemCls <p>An additional CSS class to apply to the div wrapping the form item
     * element of this field.  If supplied, <tt>itemCls</tt> at the <b>field</b> level will override
     * the default <tt>itemCls</tt> supplied at the <b>container</b> level. The value specified for 
     * <tt>itemCls</tt> will be added to the default class (<tt>'x-form-item'</tt>).</p>
     * <p>Since it is applied to the item wrapper (see
     * {@link Ext.layout.FormLayout}.{@link Ext.layout.FormLayout#fieldTpl fieldTpl}), it allows
     * you to write standard CSS rules that can apply to the field, the label (if specified), or
     * any other element within the markup for the field.</p>
     * <br><p><b>Note</b>: see the note for <tt>{@link #fieldLabel}</tt>.</p><br>
     * Example use:<pre><code>
// Apply a style to the field's label:
&lt;style>
    .required .x-form-item-label {font-weight:bold;color:red;}
&lt;/style>

new Ext.FormPanel({
	height: 100,
	renderTo: Ext.getBody(),
	items: [{
		xtype: 'textfield',
		fieldLabel: 'Name',
		itemCls: 'required' //this label will be styled
	},{
		xtype: 'textfield',
		fieldLabel: 'Favorite Color'
	}]
});
</code></pre>
     */

	// Configs below are used for all Components when rendered by AnchorLayout.
    /**
     * @cfg {String} anchor <p><b>Note</b>: this config is only used when this Component is rendered
     * by a Container which has been configured to use the <b>{@link Ext.layout.AnchorLayout AnchorLayout}</b>
     * layout manager (eg. {@link Ext.form.FormPanel} or specifying <tt>layout:'anchor'</tt>).</p><br>
     * <p>See {@link Ext.layout.AnchorLayout}.{@link Ext.layout.AnchorLayout#anchor anchor} also.</p>
     */

    /**
     * @cfg {String} id
     * <p>The <b>unique</b> id of this component (defaults to an {@link #getId auto-assigned id}).
     * You should assign an id if you need to be able to access the component later and you do
     * not have an object reference available (e.g., using {@link Ext}.{@link Ext#getCmp getCmp}).</p>
     * <p>Note that this id will also be used as the element id for the containing HTML element
     * that is rendered to the page for this component. This allows you to write id-based CSS
     * rules to style the specific instance of this component uniquely, and also to select
     * sub-elements using this component's id as the parent.</p>
     * <p><b>Note</b>: to avoid complications imposed by a unique <tt>id</tt> see <tt>{@link #itemId}</tt>.</p>
     * <p><b>Note</b>: to access the container of an item see <tt>{@link #ownerCt}</tt>.</p>
     */
    /**
     * @cfg {String} itemId
     * <p>An <tt>itemId</tt> can be used as an alternative way to get a reference to a component
     * when no object reference is available.  Instead of using an <tt>{@link #id}</tt> with
     * {@link Ext}.{@link Ext#getCmp getCmp}, use <tt>itemId</tt> with
     * {@link Ext.Container}.{@link Ext.Container#getComponent getComponent} which will retrieve
     * <tt>itemId</tt>'s or <tt>{@link #id}</tt>'s. Since <tt>itemId</tt>'s are an index to the
     * container's internal MixedCollection, the <tt>itemId</tt> is scoped locally to the container -- 
     * avoiding potential conflicts with {@link Ext.ComponentMgr} which requires a <b>unique</b>
     * <tt>{@link #id}</tt>.</p>
     * <pre><code>
var c = new Ext.Panel({ //
    {@link Ext.BoxComponent#height height}: 300,
    {@link #renderTo}: document.body,
    {@link Ext.Container#layout layout}: 'auto',
    {@link Ext.Container#items items}: [
        {
            itemId: 'p1',
            {@link Ext.Panel#title title}: 'Panel 1',
            {@link Ext.BoxComponent#height height}: 150
        },
        {
            itemId: 'p2',
            {@link Ext.Panel#title title}: 'Panel 2',
            {@link Ext.BoxComponent#height height}: 150
        }
    ]
})
p1 = c.{@link Ext.Container#getComponent getComponent}('p1'); // not the same as {@link Ext#getCmp Ext.getCmp()}
p2 = p1.{@link #ownerCt}.{@link Ext.Container#getComponent getComponent}('p2'); // reference via a sibling 
     * </code></pre>
     * <p>Also see <tt>{@link #id}</tt>.</p>
     * <p><b>Note</b>: to access the container of an item see <tt>{@link #ownerCt}</tt>.</p>
     */
    /**
     * @cfg {String} xtype
     * The registered xtype to create. This config option is not used when passing
     * a config object into a constructor. This config option is used only when
     * lazy instantiation is being used, and a child item of a Container is being
     * specified not as a fully instantiated Component, but as a <i>Component config
     * object</i>. The xtype will be looked up at render time up to determine what
     * type of child Component to create.<br><br>
     * The predefined xtypes are listed {@link Ext.Component here}.
     * <br><br>
     * If you subclass Components to create your own Components, you may register
     * them using {@link Ext.ComponentMgr#registerType} in order to be able to
     * take advantage of lazy instantiation and rendering.
     */
    /**
     * @cfg {String} cls
     * An optional extra CSS class that will be added to this component's Element (defaults to '').  This can be
     * useful for adding customized styles to the component or any of its children using standard CSS rules.
     */
    /**
     * @cfg {String} overCls
     * An optional extra CSS class that will be added to this component's Element when the mouse moves
     * over the Element, and removed when the mouse moves out. (defaults to '').  This can be
     * useful for adding customized "active" or "hover" styles to the component or any of its children using standard CSS rules.
     */
    /**
     * @cfg {String} style
     * A custom style specification to be applied to this component's Element.  Should be a valid argument to
     * {@link Ext.Element#applyStyles}.
     */
    /**
     * @cfg {String} ctCls
     * <p>An optional extra CSS class that will be added to this component's container. This can be useful for
     * adding customized styles to the container or any of its children using standard CSS rules.  See
     * {@link Ext.layout.ContainerLayout}.{@link Ext.layout.ContainerLayout#extraCls extraCls} also.</p>
     * <p><b>Note</b>: <tt>ctCls</tt> defaults to <tt>''</tt> except for the following class
     * which assigns a value by default:
     * <div class="mdetail-params"><ul>
     * <li>{@link Ext.layout.Box Box Layout} : <tt>'x-box-layout-ct'</tt></li>
     * </ul></div>
     * To configure the above Class with an extra CSS class append to the default.  For example,
     * for BoxLayout (Hbox and Vbox):<pre><code>
     * ctCls: 'x-box-layout-ct custom-class'
     * </code></pre>
     * </p>
     */
    /**
     * @cfg {Boolean} disabled
     * Render this component disabled (default is false).
     */
    /**
     * @cfg {Boolean} hidden
     * Render this component hidden (default is false).
     */
    /**
     * @cfg {Object/Array} plugins
     * An object or array of objects that will provide custom functionality for this component.  The only
     * requirement for a valid plugin is that it contain an init method that accepts a reference of type Ext.Component.
     * When a component is created, if any plugins are available, the component will call the init method on each
     * plugin, passing a reference to itself.  Each plugin can then call methods or respond to events on the
     * component as needed to provide its functionality.
     */
    /**
     * @cfg {Mixed} applyTo
     * <p>Specify the id of the element, a DOM element or an existing Element corresponding to a DIV
     * that is already present in the document that specifies some structural markup for this
     * component.</p><div><ul>
     * <li><b>Description</b> : <ul>
     * <div class="sub-desc">When <tt>applyTo</tt> is used, constituent parts of the component can also be specified
     * by id or CSS class name within the main element, and the component being created may attempt
     * to create its subcomponents from that markup if applicable.</div>
     * </ul></li>
     * <li><b>Notes</b> : <ul>
     * <div class="sub-desc">When using this config, a call to render() is not required.</div>
     * <div class="sub-desc">If applyTo is specified, any value passed for {@link #renderTo} will be ignored and the target
     * element's parent node will automatically be used as the component's container.</div>
     * </ul></li>
     * </ul></div>
     */
    /**
     * @cfg {Mixed} renderTo
     * <p>Specify the id of the element, a DOM element or an existing Element that this component
     * will be rendered into.</p><div><ul>
     * <li><b>Notes</b> : <ul>
     * <div class="sub-desc">When using this config, a call to render() is not required.</div>
     * <div class="sub-desc">Do <u>not</u> use this option if the Component is to be a child item of
     * a {@link Ext.Container Container}. It is the responsibility of the
     * {@link Ext.Container Container}'s {@link Ext.Container#layout layout manager}
     * to render its child items.</div>
     * </ul></li>
     * </ul></div>
     * <p>See <tt>{@link #render}</tt> also.</p>
     */
    /**
     * @cfg {Boolean} stateful
     * <p>A flag which causes the Component to attempt to restore the state of internal properties
     * from a saved state on startup. The component must have either a {@link #stateId} or {@link #id}
     * assigned for state to be managed.  Auto-generated ids are not guaranteed to be stable across page
     * loads and cannot be relied upon to save and restore the same state for a component.<p>
     * <p>For state saving to work, the state manager's provider must have been set to an implementation
     * of {@link Ext.state.Provider} which overrides the {@link Ext.state.Provider#set set}
     * and {@link Ext.state.Provider#get get} methods to save and recall name/value pairs.
     * A built-in implementation, {@link Ext.state.CookieProvider} is available.</p>
     * <p>To set the state provider for the current page:</p>
     * <pre><code>
Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
</code></pre>
     * <p>A stateful Component attempts to save state when one of the events listed in the {@link #stateEvents}
     * configuration fires.</p>
     * To save state, A stateful Component first serializes its state by calling <b><tt>getState</tt></b>. By default,
     * this function does nothing. The developer must provide an implementation which returns an object hash
     * which represents the Component's restorable state.</p>
     * <p>The value yielded by getState is passed to {@link Ext.state.Manager#set} which uses the configured
     * {@link Ext.state.Provider} to save the object keyed by the Component's {@link stateId}, or,
     * if that is not specified, its {@link #id}.</p>
     * <p>During construction, a stateful Component attempts to <i>restore</i> its state by calling
     * {@link Ext.state.Manager#get} passing the (@link #stateId}, or, if that is not specified, the {@link #id}.</p>
     * <p>The resulting object is passed to <b><tt>applyState</tt></b>. The default implementation of applyState
     * simply copies properties into the object, but a developer may override this to support more behaviour.</p>
     * <p>You can perform extra processing on state save and restore by attaching handlers to the
     * {@link #beforestaterestore}, {@link #staterestore}, {@link #beforestatesave} and {@link #statesave} events</p>
     */
    /**
     * @cfg {String} stateId
     * The unique id for this component to use for state management purposes (defaults to the component id if one was
     * set, otherwise null if the component is using a generated id).
     * <p>See {@link #stateful} for an explanation of saving and restoring Component state.</p>
     */
    /* //internal - to be set by subclasses
     * @cfg {Array} stateEvents
     * An array of events that, when fired, should trigger this component to save its state (defaults to none).
     * These can be any types of events supported by this component, including browser or custom events (e.g.,
     * ['click', 'customerchange']).
     * <p>See {@link #stateful} for an explanation of saving and restoring Component state.</p>
     */

    /**
     * @cfg {Mixed} autoEl
     * <p>A tag name or {@link Ext.DomHelper DomHelper} spec used to create the {@link #getEl Element} which will
     * encapsulate this Component.</p>
     * <p>You do not normally need to specify this. For the base classes {@link Ext.Component}, {@link Ext.BoxComponent},
     * and {@link Ext.Container}, this defaults to <b><tt>'div'</tt></b>. The more complex Ext classes use a more complex
     * DOM structure created by their own onRender methods.</p>
     * <p>This is intended to allow the developer to create application-specific utility Components encapsulated by
     * different DOM elements. Example usage:</p><pre><code>
{
    xtype: 'box',
    autoEl: {
        tag: 'img',
        src: 'http://www.example.com/example.jpg'
    }
}, {
    xtype: 'box',
    autoEl: {
        tag: 'blockquote',
        html: 'autoEl is cool!'
    }
}, {
    xtype: 'container',
    autoEl: 'ul',
    cls: 'ux-unordered-list',
    items: {
        xtype: 'box',
        autoEl: 'li',
        html: 'First list item'
    }
}
</code></pre>
     */
    autoEl : 'div',
    
    /**
     * @cfg {String} disabledClass
     * CSS class added to the component when it is disabled (defaults to "x-item-disabled").
     */
    disabledClass : "x-item-disabled",
    /**
     * @cfg {Boolean} allowDomMove
     * Whether the component can move the Dom node when rendering (defaults to true).
     */
    allowDomMove : true,
    /**
     * @cfg {Boolean} autoShow
     * True if the component should check for hidden classes (e.g. 'x-hidden' or 'x-hide-display') and remove
     * them on render (defaults to false).
     */
    autoShow : false,
    /**
     * @cfg {String} hideMode
     * <p>How this component should be hidden. Supported values are "visibility" (css visibility), "offsets" (negative
     * offset position) and "display" (css display) - defaults to "display".</p>
     * <p>For Containers which may be hidden and shown as part of a {@link Ext.layout.CardLayout card layout} Container such as a
     * {@link Ext.TabPanel TabPanel}, it is recommended that hideMode is configured as "offsets". This ensures
     * that hidden Components still have height and width so that layout managers can perform measurements when
     * calculating layouts.</p>
     */
    hideMode: 'display',
    /**
     * @cfg {Boolean} hideParent
     * True to hide and show the component's container when hide/show is called on the component, false to hide
     * and show the component itself (defaults to false).  For example, this can be used as a shortcut for a hide
     * button on a window by setting hide:true on the button when adding it to its parent container.
     */
    hideParent: false,
    /**
     * <p>Returns the {@link Ext.Element} which encapsulates this Component. This will
     * <i>usually</i> be a &lt;DIV> element created by the class's onRender method, but
     * that may be overridden using the {@link #autoEl} config.</p>
     * <br><p><b>Note</b>: this element will not be available until this Component has been
     * rendered.</b></p><br>
     * <p>To add listeners for <b>DOM events</b> to this Component (as opposed to listeners
     * for this Component's own Observable events), perform the adding of the listener in a
     * render event listener:</p><pre><code>
new Ext.Panel({
    title: 'The Clickable Panel',
    listeners: {
        render: function(p) {
            // Append the Panel to the click handler&#39;s argument list.
            p.getEl().on('click', handlePanelClick.createDelegate(null, [p], true));
        }
    }
});
</code></pre>
     * <p>See also <tt>{@link #getEl getEl}</p>
     * @type Ext.Element
     * @property el
     */
    /**
     * The component's owner {@link Ext.Container} (defaults to undefined, and is set automatically when
     * the component is added to a container).  Read-only.
     * <p><b>Note</b>: to access items within the container see <tt>{@link #itemId}</tt>.</p>
     * @type Ext.Container
     * @property ownerCt
     */
    /**
     * True if this component is hidden. Read-only.
     * @type Boolean
     * @property
     */
    hidden : false,
    /**
     * True if this component is disabled. Read-only.
     * @type Boolean
     * @property
     */
    disabled : false,
    /**
     * True if this component has been rendered. Read-only.
     * @type Boolean
     * @property
     */
    rendered : false,

    // private
    ctype : "Ext.Component",

    // private
    actionMode : "el",

    // private
    getActionEl : function(){
        return this[this.actionMode];
    },

    initPlugin : function(p){
        if(p.ptype && typeof p.init != 'function'){
            p = Ext.ComponentMgr.createPlugin(p);
        }else if(typeof p == 'string'){
            p = Ext.ComponentMgr.createPlugin({
                ptype: p
            });
        }
        p.init(this);
        return p;
    },

    /* // protected
     * Function to be implemented by Component subclasses to be part of standard component initialization flow (it is empty by default).
     * <pre><code>
// Traditional constructor:
Ext.Foo = function(config){
    // call superclass constructor:
    Ext.Foo.superclass.constructor.call(this, config);

    this.addEvents({
        // add events
    });
};
Ext.extend(Ext.Foo, Ext.Bar, {
   // class body
}

// initComponent replaces the constructor:
Ext.Foo = Ext.extend(Ext.Bar, {
    initComponent : function(){
        // call superclass initComponent
        Ext.Container.superclass.initComponent.call(this);

        this.addEvents({
            // add events
        });
    }
}
</code></pre>
     */
    initComponent : Ext.emptyFn,

    /**
     * <p>Render this Component into the passed HTML element.</p>
     * <p><b>If you are using a {@link Ext.Container Container} object to house this Component, then
     * do not use the render method.</b></p>
     * <p>A Container's child Components are rendered by that Container's
     * {@link Ext.Container#layout layout} manager when the Container is first rendered.</p>
     * <p>Certain layout managers allow dynamic addition of child components. Those that do
     * include {@link Ext.layout.CardLayout}, {@link Ext.layout.AnchorLayout},
     * {@link Ext.layout.FormLayout}, {@link Ext.layout.TableLayout}.</p>
     * <p>If the Container is already rendered when a new child Component is added, you may need to call
     * the Container's {@link Ext.Container#doLayout doLayout} to refresh the view which causes any
     * unrendered child Components to be rendered. This is required so that you can add multiple
     * child components if needed while only refreshing the layout once.</p>
     * <p>When creating complex UIs, it is important to remember that sizing and positioning
     * of child items is the responsibility of the Container's {@link Ext.Container#layout layout} manager.
     * If you expect child items to be sized in response to user interactions, you must
     * configure the Container with a layout manager which creates and manages the type of layout you
     * have in mind.</p>
     * <p><b>Omitting the Container's {@link Ext.Container#layout layout} config means that a basic
     * layout manager is used which does nothing but render child components sequentially into the
     * Container. No sizing or positioning will be performed in this situation.</b></p>
     * @param {Element/HTMLElement/String} container (optional) The element this Component should be
     * rendered into. If it is being created from existing markup, this should be omitted.
     * @param {String/Number} position (optional) The element ID or DOM node index within the container <b>before</b>
     * which this component will be inserted (defaults to appending to the end of the container)
     */
    render : function(container, position){
        if(!this.rendered && this.fireEvent("beforerender", this) !== false){
            if(!container && this.el){
                this.el = Ext.get(this.el);
                container = this.el.dom.parentNode;
                this.allowDomMove = false;
            }
            this.container = Ext.get(container);
            if(this.ctCls){
                this.container.addClass(this.ctCls);
            }
            this.rendered = true;
            if(position !== undefined){
                if(typeof position == 'number'){
                    position = this.container.dom.childNodes[position];
                }else{
                    position = Ext.getDom(position);
                }
            }
            this.onRender(this.container, position || null);
            if(this.autoShow){
                this.el.removeClass(['x-hidden','x-hide-' + this.hideMode]);
            }
            if(this.cls){
                this.el.addClass(this.cls);
                delete this.cls;
            }
            if(this.style){
                this.el.applyStyles(this.style);
                delete this.style;
            }
            if(this.overCls){
                this.el.addClassOnOver(this.overCls);
            }
            this.fireEvent("render", this);
            this.afterRender(this.container);
            if(this.hidden){
                this.hide();
            }
            if(this.disabled){
                this.disable();
            }

            if(this.stateful !== false){
                this.initStateEvents();
            }
            this.initRef();
            this.fireEvent("afterrender", this);
        }
        return this;
    },

    initRef : function(){
        if(this.ref){
            var levels = this.ref.split('/');
            var last = levels.length, i = 0;
            var t = this;
            while(i < last){
                if(t.ownerCt){
                    t = t.ownerCt;
                }
                i++;
            }
            t[levels[--i]] = this;
        }
    },

    // private
    initState : function(config){
        if(Ext.state.Manager){
            var id = this.getStateId();
            if(id){
                var state = Ext.state.Manager.get(id);
                if(state){
                    if(this.fireEvent('beforestaterestore', this, state) !== false){
                        this.applyState(state);
                        this.fireEvent('staterestore', this, state);
                    }
                }
            }
        }
    },

    // private
    getStateId : function(){
        return this.stateId || ((this.id.indexOf('ext-comp-') == 0 || this.id.indexOf('ext-gen') == 0) ? null : this.id);
    },

    // private
    initStateEvents : function(){
        if(this.stateEvents){
            for(var i = 0, e; e = this.stateEvents[i]; i++){
                this.on(e, this.saveState, this, {delay:100});
            }
        }
    },

    // private
    applyState : function(state, config){
        if(state){
            Ext.apply(this, state);
        }
    },

    // private
    getState : function(){
        return null;
    },

    // private
    saveState : function(){
        if(Ext.state.Manager && this.stateful !== false){
            var id = this.getStateId();
            if(id){
                var state = this.getState();
                if(this.fireEvent('beforestatesave', this, state) !== false){
                    Ext.state.Manager.set(id, state);
                    this.fireEvent('statesave', this, state);
                }
            }
        }
    },

    /**
     * Apply this component to existing markup that is valid. With this function, no call to render() is required.
     * @param {String/HTMLElement} el
     */
    applyToMarkup : function(el){
        this.allowDomMove = false;
        this.el = Ext.get(el);
        this.render(this.el.dom.parentNode);
    },

    /**
     * Adds a CSS class to the component's underlying element.
     * @param {string} cls The CSS class name to add
     * @return {Ext.Component} this
     */
    addClass : function(cls){
        if(this.el){
            this.el.addClass(cls);
        }else{
            this.cls = this.cls ? this.cls + ' ' + cls : cls;
        }
        return this;
    },

    /**
     * Removes a CSS class from the component's underlying element.
     * @param {string} cls The CSS class name to remove
     * @return {Ext.Component} this
     */
    removeClass : function(cls){
        if(this.el){
            this.el.removeClass(cls);
        }else if(this.cls){
            this.cls = this.cls.split(' ').remove(cls).join(' ');
        }
        return this;
    },

    // private
    // default function is not really useful
    onRender : function(ct, position){
        if(!this.el && this.autoEl){
            if(typeof this.autoEl == 'string'){
                this.el = document.createElement(this.autoEl);
            }else{
                var div = document.createElement('div');
                Ext.DomHelper.overwrite(div, this.autoEl);
                this.el = div.firstChild;
            }
            if (!this.el.id) {
                this.el.id = this.getId();
            }
        }
        if(this.el){
            this.el = Ext.get(this.el);
            if(this.allowDomMove !== false){
                ct.dom.insertBefore(this.el.dom, position);
            }
        }
    },

    // private
    getAutoCreate : function(){
        var cfg = typeof this.autoCreate == "object" ?
                      this.autoCreate : Ext.apply({}, this.defaultAutoCreate);
        if(this.id && !cfg.id){
            cfg.id = this.id;
        }
        return cfg;
    },

    // private
    afterRender : Ext.emptyFn,

    /**
     * Destroys this component by purging any event listeners, removing the component's element from the DOM,
     * removing the component from its {@link Ext.Container} (if applicable) and unregistering it from
     * {@link Ext.ComponentMgr}.  Destruction is generally handled automatically by the framework and this method
     * should usually not need to be called directly.
     */
    destroy : function(){
        if(this.fireEvent("beforedestroy", this) !== false){
            this.beforeDestroy();
            if(this.rendered){
                this.el.removeAllListeners();
                this.el.remove();
                if(this.actionMode == "container" || this.removeMode == "container"){
                    this.container.remove();
                }
            }
            this.onDestroy();
            Ext.ComponentMgr.unregister(this);
            this.fireEvent("destroy", this);
            this.purgeListeners();
        }
    },

    // private
    beforeDestroy : Ext.emptyFn,

    // private
    onDestroy  : Ext.emptyFn,

    /**
     * <p>Returns the {@link Ext.Element} which encapsulates this Component. This will <i>usually</i> be
     * a &lt;DIV> element created by the class's onRender method, but that may be overridden using the {@link #autoEl} config.</p>
     * <p><b>The Element will not be available until this Component has been rendered.</b></p>
     * <p>To add listeners for <b>DOM events</b> to this Component (as opposed to listeners for this Component's
     * own Observable events), perform the adding of the listener in a one-off render event listener:</p><pre><code>
new Ext.Panel({
    title: 'The Clickable Panel',
    listeners: {
        render: function(p) {
            // Append the Panel to the click handler&#39;s argument list.
            p.getEl().on('click', handlePanelClick.createDelegate(null, [p], true));
        },
        single: true  // Remove the listener after first invocation
    }
});
</code></pre>
     * @return {Ext.Element} The Element which encapsulates this Component.
     */
    getEl : function(){
        return this.el;
    },

    /**
     * Returns the id of this component or generates an id:<pre><code>
     * "ext-comp-" + (++Ext.Component.AUTO_ID)
     * </code></pre>
     * @return {String}
     */
    getId : function(){
        return this.id || (this.id = "ext-comp-" + (++Ext.Component.AUTO_ID));
    },

    /**
     * Returns the item id of this component.
     * @return {String}
     */
    getItemId : function(){
        return this.itemId || this.getId();
    },

    /**
     * Try to focus this component.
     * @param {Boolean} selectText (optional) If applicable, true to also select the text in this component
     * @param {Boolean/Number} delay (optional) Delay the focus this number of milliseconds (true for 10 milliseconds)
     * @return {Ext.Component} this
     */
    focus : function(selectText, delay){
        if(delay){
            this.focus.defer(typeof delay == 'number' ? delay : 10, this, [selectText, false]);
            return;
        }
        if(this.rendered){
            this.el.focus();
            if(selectText === true){
                this.el.dom.select();
            }
        }
        return this;
    },

    // private
    blur : function(){
        if(this.rendered){
            this.el.blur();
        }
        return this;
    },

    /**
     * Disable this component.
     * @return {Ext.Component} this
     */
    disable : function(){
        if(this.rendered){
            this.onDisable();
        }
        this.disabled = true;
        this.fireEvent("disable", this);
        return this;
    },

    // private
    onDisable : function(){
        this.getActionEl().addClass(this.disabledClass);
        this.el.dom.disabled = true;
    },

    /**
     * Enable this component.
     * @return {Ext.Component} this
     */
    enable : function(){
        if(this.rendered){
            this.onEnable();
        }
        this.disabled = false;
        this.fireEvent("enable", this);
        return this;
    },

    // private
    onEnable : function(){
        this.getActionEl().removeClass(this.disabledClass);
        this.el.dom.disabled = false;
    },

    /**
     * Convenience function for setting disabled/enabled by boolean.
     * @param {Boolean} disabled
     * @return {Ext.Component} this
     */
    setDisabled : function(disabled){
        return this[disabled ? "disable" : "enable"]();
    },

    /**
     * Show this component.
     * @return {Ext.Component} this
     */
    show: function(){
        if(this.fireEvent("beforeshow", this) !== false){
            this.hidden = false;
            if(this.autoRender){
                this.render(typeof this.autoRender == 'boolean' ? Ext.getBody() : this.autoRender);
            }
            if(this.rendered){
                this.onShow();
            }
            this.fireEvent("show", this);
        }
        return this;
    },

    // private
    onShow : function(){
        if(this.hideParent){
            this.container.removeClass('x-hide-' + this.hideMode);
        }else{
            this.getActionEl().removeClass('x-hide-' + this.hideMode);
        }

    },

    /**
     * Hide this component.
     * @return {Ext.Component} this
     */
    hide: function(){
        if(this.fireEvent("beforehide", this) !== false){
            this.hidden = true;
            if(this.rendered){
                this.onHide();
            }
            this.fireEvent("hide", this);
        }
        return this;
    },

    // private
    onHide : function(){
        if(this.hideParent){
            this.container.addClass('x-hide-' + this.hideMode);
        }else{
            this.getActionEl().addClass('x-hide-' + this.hideMode);
        }
    },

    /**
     * Convenience function to hide or show this component by boolean.
     * @param {Boolean} visible True to show, false to hide
     * @return {Ext.Component} this
     */
    setVisible: function(visible){
        return this[visible ? "show" : "hide"]();
    },

    /**
     * Returns true if this component is visible.
     * @return {Boolean} True if this component is visible, false otherwise.
     */
    isVisible : function(){
        return this.rendered && this.getActionEl().isVisible();
    },

    /**
     * Clone the current component using the original config values passed into this instance by default.
     * @param {Object} overrides A new config containing any properties to override in the cloned version.
     * An id property can be passed on this object, otherwise one will be generated to avoid duplicates.
     * @return {Ext.Component} clone The cloned copy of this component
     */
    cloneConfig : function(overrides){
        overrides = overrides || {};
        var id = overrides.id || Ext.id();
        var cfg = Ext.applyIf(overrides, this.initialConfig);
        cfg.id = id; // prevent dup id
        return new this.constructor(cfg);
    },

    /**
     * Gets the xtype for this component as registered with {@link Ext.ComponentMgr}. For a list of all
     * available xtypes, see the {@link Ext.Component} header. Example usage:
     * <pre><code>
var t = new Ext.form.TextField();
alert(t.getXType());  // alerts 'textfield'
</code></pre>
     * @return {String} The xtype
     */
    getXType : function(){
        return this.constructor.xtype;
    },

    /**
     * <p>Tests whether or not this Component is of a specific xtype. This can test whether this Component is descended
     * from the xtype (default) or whether it is directly of the xtype specified (shallow = true).</p>
     * <p><b>If using your own subclasses, be aware that a Component must register its own xtype
     * to participate in determination of inherited xtypes.</b></p>
     * <p>For a list of all available xtypes, see the {@link Ext.Component} header.</p>
     * <p>Example usage:</p>
     * <pre><code>
var t = new Ext.form.TextField();
var isText = t.isXType('textfield');        // true
var isBoxSubclass = t.isXType('box');       // true, descended from BoxComponent
var isBoxInstance = t.isXType('box', true); // false, not a direct BoxComponent instance
</code></pre>
     * @param {String} xtype The xtype to check for this Component
     * @param {Boolean} shallow (optional) False to check whether this Component is descended from the xtype (this is
     * the default), or true to check whether this Component is directly of the specified xtype.
     * @return {Boolean} True if this component descends from the specified xtype, false otherwise.
     */
    isXType : function(xtype, shallow){
        //assume a string by default
        if (typeof xtype == 'function'){
            xtype = xtype.xtype; //handle being passed the class, eg. Ext.Component
        }else if (typeof xtype == 'object'){
            xtype = xtype.constructor.xtype; //handle being passed an instance
        }
            
        return !shallow ? ('/' + this.getXTypes() + '/').indexOf('/' + xtype + '/') != -1 : this.constructor.xtype == xtype;
    },

    /**
     * <p>Returns this Component's xtype hierarchy as a slash-delimited string. For a list of all
     * available xtypes, see the {@link Ext.Component} header.</p>
     * <p><b>If using your own subclasses, be aware that a Component must register its own xtype
     * to participate in determination of inherited xtypes.</b></p>
     * <p>Example usage:</p>
     * <pre><code>
var t = new Ext.form.TextField();
alert(t.getXTypes());  // alerts 'component/box/field/textfield'
</pre></code>
     * @return {String} The xtype hierarchy string
     */
    getXTypes : function(){
        var tc = this.constructor;
        if(!tc.xtypes){
            var c = [], sc = this;
            while(sc && sc.constructor.xtype){
                c.unshift(sc.constructor.xtype);
                sc = sc.constructor.superclass;
            }
            tc.xtypeChain = c;
            tc.xtypes = c.join('/');
        }
        return tc.xtypes;
    },

    /**
     * Find a container above this component at any level by a custom function. If the passed function returns
     * true, the container will be returned. The passed function is called with the arguments (container, this component).
     * @param {Function} fcn
     * @param {Object} scope (optional)
     * @return {Ext.Container} The first Container for which the custom function returns true
     */
    findParentBy: function(fn) {
        for (var p = this.ownerCt; (p != null) && !fn(p, this); p = p.ownerCt);
        return p || null;
    },

    /**
     * Find a container above this component at any level by xtype or class
     * @param {String/Class} xtype The xtype string for a component, or the class of the component directly
     * @return {Ext.Container} The first Container which matches the given xtype or class
     */
    findParentByType: function(xtype) {
        return typeof xtype == 'function' ?
            this.findParentBy(function(p){
                return p.constructor === xtype;
            }) :
            this.findParentBy(function(p){
                return p.constructor.xtype === xtype;
            });
    },

    getDomPositionEl : function(){
        return this.getPositionEl ? this.getPositionEl() : this.getEl();
    },

    // internal function for auto removal of assigned event handlers on destruction
    mon : function(item, ename, fn, scope, opt){
        if(!this.mons){
            this.mons = [];
            this.on('beforedestroy', function(){
                for(var i= 0, len = this.mons.length; i < len; i++){
                    var m = this.mons[i];
                    m.item.un(m.ename, m.fn, m.scope);
                }
            }, this, {single: true});
        }
		
        if(typeof ename == "object"){
        	var propRe = /^(?:scope|delay|buffer|single|stopEvent|preventDefault|stopPropagation|normalized|args|delegate)$/;
        	
            var o = ename;
            for(var e in o){
                if(propRe.test(e)){
                    continue;
                }
                if(typeof o[e] == "function"){
                    // shared options
			        this.mons.push({
			            item: item, ename: e, fn: o[e], scope: o.scope
			        });
			        item.on(e, o[e], o.scope, o);
                }else{
                    // individual options
			        this.mons.push({
			            item: item, ename: e, fn: o[e], scope: o.scope
			        });
			        item.on(e, o[e]);
                }
            }
            return;
        }

            
        this.mons.push({
            item: item, ename: ename, fn: fn, scope: scope
        });        
        item.on(ename, fn, scope, opt);
    },

    /**
     * Returns the next component in the owning container
     * @return Ext.Component
     */
    nextSibling : function(){
        if(this.ownerCt){
            var index = this.ownerCt.items.indexOf(this);
            if(index != -1 && index+1 < this.ownerCt.items.getCount()){
                return this.ownerCt.items.itemAt(index+1);
            }
        }
        return null;
    },

    /**
     * Returns the previous component in the owning container
     * @return Ext.Component
     */
    previousSibling : function(){
        if(this.ownerCt){
            var index = this.ownerCt.items.indexOf(this);
            if(index > 0){
                return this.ownerCt.items.itemAt(index-1);
            }
        }
        return null;
    },

    /**
     * Provides the link for Observable's fireEvent method to bubble up the ownership hierarchy.
     * @return the Container which owns this Component.
     */
    getBubbleTarget : function(){
        return this.ownerCt;
    }
});

Ext.reg('component', Ext.Component);
