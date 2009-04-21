/*
 * Ext JS Library 3.0 RC1
 * Copyright(c) 2006-2009, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */

/**
 * @class Ext.layout.FormLayout
 * @extends Ext.layout.AnchorLayout
 * <p>This layout manager is specifically designed for rendering and managing child Components of
 * {@link Ext.form.FormPanel forms}. It is responsible for rendering the labels of
 * {@link Ext.form.Field Field}s.</p>
 * 
 * <p>This layout manager is used when a Container is configured with the <tt>layout:'form'</tt>
 * {@link Ext.Container#layout layout} config option, and should generally not need to be created directly
 * via the new keyword. See <tt><b>{@link Ext.Container#layout}</b></tt> for additional details.</p>
 * 
 * <p>In an application, it will usually be preferrable to use a {@link Ext.form.FormPanel FormPanel}
 * (which is configured with FormLayout as its layout class by default) since it also provides built-in
 * functionality for {@link Ext.form.BasicForm#doAction loading, validating and submitting} the form.</p>
 * 
 * <p>A {@link Ext.Container Container} <i>using</i> the FormLayout layout manager (eg.
 * {@link Ext.form.FormPanel} or specifying <tt>layout:'form'</tt>) can also accept the following
 * layout-specific config properties:<div class="mdetail-params"><ul>
 * <li><b><tt>{@link Ext.form.FormPanel#hideLabels hideLabels}</tt></b></li>
 * <li><b><tt>{@link Ext.form.FormPanel#labelAlign labelAlign}</tt></b></li>
 * <li><b><tt>{@link Ext.form.FormPanel#labelPad labelPad}</tt></b></li>
 * <li><b><tt>{@link Ext.form.FormPanel#labelSeparator labelSeparator}</tt></b></li>
 * <li><b><tt>{@link Ext.form.FormPanel#labelWidth labelWidth}</tt></b></li>
 * </ul></div></p>
 * 
 * <p>Any Component (including Fields) managed by FormLayout accepts the following as a config option:
 * <div class="mdetail-params"><ul>
 * <li><b><tt>{@link Ext.Component#anchor anchor}</tt></b></li>
 * </ul></div></p>
 * 
 * <p>Any Component managed by FormLayout may be rendered as a form field (with an associated label) by
 * configuring it with a non-null <b><tt>{@link Ext.Component#fieldLabel fieldLabel}</tt></b>. Components configured
 * in this way may be configured with the following options which affect the way the FormLayout renders them:
 * <div class="mdetail-params"><ul>
 * <li><b><tt>{@link Ext.Component#clearCls clearCls}</tt></b></li>
 * <li><b><tt>{@link Ext.Component#fieldLabel fieldLabel}</tt></b></li>
 * <li><b><tt>{@link Ext.Component#hideLabel hideLabel}</tt></b></li>
 * <li><b><tt>{@link Ext.Component#itemCls itemCls}</tt></b></li>
 * <li><b><tt>{@link Ext.Component#labelSeparator labelSeparator}</tt></b></li>
 * <li><b><tt>{@link Ext.Component#labelStyle labelStyle}</tt></b></li>
 * </ul></div></p>
 * 
 * <p>Example usage:</p>
 * <pre><code>
// Required if showing validation messages
Ext.QuickTips.init();

// While you can create a basic Panel with layout:'form', practically
// you should usually use a FormPanel to also get its form functionality
// since it already creates a FormLayout internally.
var form = new Ext.form.FormPanel({
    title: 'Form Layout',
    bodyStyle: 'padding:15px',
    width: 350,
    defaultType: 'textfield',
    defaults: {
        // applied to each contained item
        width: 230,
        msgTarget: 'side'
    },
    items: [{
            fieldLabel: 'First Name',
            name: 'first',
            allowBlank: false,
            {@link Ext.Component#labelSeparator labelSeparator}: ':' // override labelSeparator layout config
        },{
            fieldLabel: 'Last Name',
            name: 'last'
        },{
            fieldLabel: 'Email',
            name: 'email',
            vtype:'email'
        }, {
            xtype: 'textarea',
            hideLabel: true,     // override hideLabels layout config
            name: 'msg',
            anchor: '100% -53'
        }
    ],
    buttons: [
        {text: 'Save'},
        {text: 'Cancel'}
    ],
    layoutConfig: {
        {@link #labelSeparator}: '~' // superseded by assignment below 
    },
    // config options applicable to container when layout='form':
    hideLabels: false,
    labelAlign: 'left',   // or 'right' or 'top'
    {@link Ext.form.FormPanel#labelSeparator labelSeparator}: '>>', // takes precedence over layoutConfig value 
    labelWidth: 65,       // defaults to 100
    labelPad: 8           // defaults to 5, must specify labelWidth to be honored
});
</code></pre>
 */
Ext.layout.FormLayout = Ext.extend(Ext.layout.AnchorLayout, {

    /**
     * @cfg {String} labelSeparator
     * See {@link Ext.form.FormPanel}.{@link Ext.form.FormPanel#labelSeparator labelSeparator}.  Configuration
     * of this property at the <b>container</b> level takes precedence.
     */
    labelSeparator : ':',

    /**
     * Read only. The CSS style specification string added to field labels in this layout if not
     * otherwise {@link Ext.Component#labelStyle specified by each contained field}.
     * @type String
     * @property labelStyle
     */

    // private
    setContainer : function(ct){
        Ext.layout.FormLayout.superclass.setContainer.call(this, ct);
        if(ct.labelAlign){
            ct.addClass('x-form-label-'+ct.labelAlign);
        }

        if(ct.hideLabels){
            this.labelStyle = "display:none";
            this.elementStyle = "padding-left:0;";
            this.labelAdjust = 0;
        }else{
            this.labelSeparator = ct.labelSeparator || this.labelSeparator;
            ct.labelWidth = ct.labelWidth || 100;
            if(typeof ct.labelWidth == 'number'){
                var pad = (typeof ct.labelPad == 'number' ? ct.labelPad : 5);
                this.labelAdjust = ct.labelWidth+pad;
                this.labelStyle = "width:"+ct.labelWidth+"px;";
                this.elementStyle = "padding-left:"+(ct.labelWidth+pad)+'px';
            }
            if(ct.labelAlign == 'top'){
                this.labelStyle = "width:auto;";
                this.labelAdjust = 0;
                this.elementStyle = "padding-left:0;";
            }
        }
    },

    //private
    getLabelStyle: function(s){
        var ls = '', items = [this.labelStyle, s];
        for (var i = 0, len = items.length; i < len; ++i){
            if (items[i]){
                ls += items[i];
                if (ls.substr(-1, 1) != ';'){
                    ls += ';'
                }
            }
        }
        return ls;
    },

    /**
     * <p>Read-only. The <b>{@link Ext.Template#compile compile}d</b> {@link Ext.Template} for rendering
     * the fully wrapped, labeled and styled form Field which takes the following form:</p><pre><code>
var t = new Ext.Template(
    &#39;&lt;div class="x-form-item {itemCls}" tabIndex="-1">&#39;,
        &#39;&lt;&#108;abel for="{id}" style="{labelStyle}" class="x-form-item-&#108;abel">{&#108;abel}{labelSeparator}&lt;/&#108;abel>&#39;,
        &#39;&lt;div class="x-form-element" id="x-form-el-{id}" style="{elementStyle}">&#39;,
        &#39;&lt;/div>&lt;div class="{clearCls}">&lt;/div>&#39;,
    '&lt;/div>'
);
     * </code></pre>
     * <p>A description of the properties within the template follows:</p><div class="mdetail-params"><ul>
     * <li><b><tt>itemCls</tt></b> : String<div class="sub-desc">The CSS class applied to the outermost div wrapper
     * that contains this field label and field element (the default class is <tt>'x-form-item'</tt> and <tt>itemCls</tt>
     * will be added to that). If supplied, <tt>itemCls</tt> at the field level will override the default <tt>itemCls</tt>
     * supplied at the container level.</div></li>
     * <li><b><tt>id</tt></b> : String<div class="sub-desc">The id of the Field</div></li>
     * <li><b><tt>{@link #labelStyle}</tt></b> : String<div class="sub-desc">
     * A CSS style specification string to add to the field label for this field (defaults to <tt>''</tt> or the
     * {@link #labelStyle layout's value for <tt>labelStyle</tt>}).</div></li>
     * <li><b><tt>label</tt></b> : String<div class="sub-desc">The text to display as the label for this
     * field (defaults to <tt>''</tt>)</div></li>
     * <li><b><tt>{@link #labelSeparator}</tt></b> : String<div class="sub-desc">The separator to display after
     * the text of the label for this field (defaults to a colon <tt>':'</tt> or the
     * {@link #labelSeparator layout's value for labelSeparator}). To hide the separator use empty string ''.</div></li>
     * <li><b><tt>elementStyle</tt></b> : String<div class="sub-desc">The styles text for the input element's wrapper.</div></li>
     * <li><b><tt>clearCls</tt></b> : String<div class="sub-desc">The CSS class to apply to the special clearing div
     * rendered directly after each form field wrapper (defaults to <tt>'x-form-clear-left'</tt>)</div></li>
     * </ul></div>
     * <p>Also see <tt>{@link #getTemplateArgs}</tt></p>
     * @type Ext.Template
     * @property fieldTpl
     */

    // private
    renderItem : function(c, position, target){
        if(c && !c.rendered && (c.isFormField || c.fieldLabel) && c.inputType != 'hidden'){
            var args = this.getTemplateArgs(c);
            if(typeof position == 'number'){
                position = target.dom.childNodes[position] || null;
            }
            if(position){
                this.fieldTpl.insertBefore(position, args);
            }else{
                this.fieldTpl.append(target, args);
            }
            c.render('x-form-el-'+c.id);
        }else {
            Ext.layout.FormLayout.superclass.renderItem.apply(this, arguments);
        }
    },

    /**
     * <p>Provides template arguments for rendering the fully wrapped, labeled and styled form Field.</p>
     * <p>This method returns an object hash containing properties used by the layout's {@link #fieldTpl}
     * to create a correctly wrapped, labeled and styled form Field. This may be overriden to
     * create custom layouts. The properties which must be returned are:</p><div class="mdetail-params"><ul>
     * <li><b><tt>itemCls</tt></b> : String<div class="sub-desc">The CSS class applied to the outermost div wrapper
     * that contains this field label and field element (the default class is <tt>'x-form-item'</tt> and <tt>itemCls</tt>
     * will be added to that). If supplied, <tt>itemCls</tt> at the field level will override the default <tt>itemCls</tt>
     * supplied at the container level.</div></li>
     * <li><b><tt>id</tt></b> : String<div class="sub-desc">The id of the Field</div></li>
     * <li><b><tt>{@link #labelStyle}</tt></b> : String<div class="sub-desc">
     * A CSS style specification string to add to the field label for this field (defaults to <tt>''</tt> or the
     * {@link #labelStyle layout's value for <tt>labelStyle</tt>}).</div></li>
     * <li><b><tt>label</tt></b> : String<div class="sub-desc">The text to display as the label for this
     * field (defaults to <tt>''</tt>)</div></li>
     * <li><b><tt>{@link #labelSeparator}</tt></b> : String<div class="sub-desc">The separator to display after
     * the text of the label for this field (defaults to a colon <tt>':'</tt> or the
     * {@link #labelSeparator layout's value for labelSeparator}). To hide the separator use empty string ''.</div></li>
     * <li><b><tt>elementStyle</tt></b> : String<div class="sub-desc">The styles text for the input element's wrapper.</div></li>
     * <li><b><tt>clearCls</tt></b> : String<div class="sub-desc">The CSS class to apply to the special clearing div
     * rendered directly after each form field wrapper (defaults to <tt>'x-form-clear-left'</tt>)</div></li>
     * </ul></div>
     * @param field The {@link Field Ext.form.Field} being rendered.
     * @return An object hash containing the properties required to render the Field.
     */
    getTemplateArgs: function(field) {
        var noLabelSep = !field.fieldLabel || field.hideLabel;
        return {
            id: field.id,
            label: field.fieldLabel,
            labelStyle: field.labelStyle||this.labelStyle||'',
            elementStyle: this.elementStyle||'',
            labelSeparator: noLabelSep ? '' : (typeof field.labelSeparator == 'undefined' ? this.labelSeparator : field.labelSeparator),
            itemCls: (field.itemCls||this.container.itemCls||'') + (field.hideLabel ? ' x-hide-label' : ''),
            clearCls: field.clearCls || 'x-form-clear-left' 
        };
    },
	
    // private
    adjustWidthAnchor : function(value, comp){
        return value - (comp.isFormField || comp.fieldLabel  ? (comp.hideLabel ? 0 : this.labelAdjust) : 0);
    },

    // private
    isValidParent : function(c, target){
        return true;
    }

    /**
     * @property activeItem
     * @hide
     */
});

Ext.Container.LAYOUTS['form'] = Ext.layout.FormLayout;