/*
 * Ext JS Library 3.0 RC1
 * Copyright(c) 2006-2009, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */

/**
 * @class Ext.form.TriggerField
 * @extends Ext.form.TextField
 * Provides a convenient wrapper for TextFields that adds a clickable trigger button (looks like a combobox by default).
 * The trigger has no default action, so you must assign a function to implement the trigger click handler by
 * overriding {@link #onTriggerClick}. You can create a TriggerField directly, as it renders exactly like a combobox
 * for which you can provide a custom implementation.  For example:
 * <pre><code>
var trigger = new Ext.form.TriggerField();
trigger.onTriggerClick = myTriggerFn;
trigger.applyToMarkup('my-field');
</code></pre>
 *
 * However, in general you will most likely want to use TriggerField as the base class for a reusable component.
 * {@link Ext.form.DateField} and {@link Ext.form.ComboBox} are perfect examples of this.
 * 
 * @constructor
 * Create a new TriggerField.
 * @param {Object} config Configuration options (valid {@Ext.form.TextField} config options will also be applied
 * to the base TextField)
 * @xtype trigger
 */
Ext.form.TriggerField = Ext.extend(Ext.form.TextField,  {
    /**
     * @cfg {String} triggerClass
     * An additional CSS class used to style the trigger button.  The trigger will always get the
     * class <tt>'x-form-trigger'</tt> by default and <tt>triggerClass</tt> will be <b>appended</b> if specified.
     */
    /**
     * @cfg {Mixed} triggerConfig
     * <p>A {@link Ext.DomHelper DomHelper} config object specifying the structure of the
     * trigger element for this Field. (Optional).</p>
     * <p>Specify this when you need a customized element to act as the trigger button for a TriggerField.</p>
     * <p>Note that when using this option, it is the developer's responsibility to ensure correct sizing, positioning
     * and appearance of the trigger.  Defaults to:</p>
     * <pre><code>{tag: "img", src: Ext.BLANK_IMAGE_URL, cls: "x-form-trigger " + this.triggerClass}</code></pre>
     */
    /**
     * @cfg {String/Object} autoCreate <p>A {@link Ext.DomHelper DomHelper} element spec, or true for a default
     * element spec. Used to create the {@link Ext.Component#getEl Element} which will encapsulate this Component.
     * See <tt>{@link Ext.Component#autoEl autoEl}</tt> for details.  Defaults to:</p>
     * <pre><code>{tag: "input", type: "text", size: "16", autocomplete: "off"}</code></pre>
     */
    defaultAutoCreate : {tag: "input", type: "text", size: "16", autocomplete: "off"},
    /**
     * @cfg {Boolean} hideTrigger <tt>true</tt> to hide the trigger element and display only the base
     * text field (defaults to <tt>false</tt>)
     */
    hideTrigger:false,
    /**
     * @cfg {Boolean} editable <tt>false</tt> to prevent the user from typing text directly into the field,
     * the field will only respond to a click on the trigger to set the value. (defaults to <tt>true</tt>)
     */
    editable: true,
    /**
     * @hide 
     * @method autoSize
     */
    autoSize: Ext.emptyFn,
    // private
    monitorTab : true,
    // private
    deferHeight : true,
    // private
    mimicing : false,

    // private
    onResize : function(w, h){
        Ext.form.TriggerField.superclass.onResize.call(this, w, h);
        if(typeof w == 'number'){
            this.el.setWidth(this.adjustWidth('input', w - this.trigger.getWidth()));
        }
        this.wrap.setWidth(this.el.getWidth()+this.trigger.getWidth());
    },

    // private
    adjustSize : Ext.BoxComponent.prototype.adjustSize,

    // private
    getResizeEl : function(){
        return this.wrap;
    },

    // private
    getPositionEl : function(){
        return this.wrap;
    },

    // private
    alignErrorIcon : function(){
        if(this.wrap){
            this.errorIcon.alignTo(this.wrap, 'tl-tr', [2, 0]);
        }
    },

    // private
    onRender : function(ct, position){
        Ext.form.TriggerField.superclass.onRender.call(this, ct, position);

        this.wrap = this.el.wrap({cls: "x-form-field-wrap"});
        this.trigger = this.wrap.createChild(this.triggerConfig ||
                {tag: "img", src: Ext.BLANK_IMAGE_URL, cls: "x-form-trigger " + this.triggerClass});
        if(this.hideTrigger){
            this.trigger.setDisplayed(false);
        }
        this.initTrigger();
        if(!this.width){
            this.wrap.setWidth(this.el.getWidth()+this.trigger.getWidth());
        }
        if(!this.editable){
            this.editable = true;
            this.setEditable(false);
        }
    },

    afterRender : function(){
        Ext.form.TriggerField.superclass.afterRender.call(this);
        var y;
        if(Ext.isIE && !this.hideTrigger && this.el.getY() != (y = this.trigger.getY())){
            this.el.position();
            this.el.setY(y);
        }
    },

    // private
    initTrigger : function(){
    	this.mon(this.trigger, 'click', this.onTriggerClick, this, {preventDefault:true});
        this.trigger.addClassOnOver('x-form-trigger-over');
        this.trigger.addClassOnClick('x-form-trigger-click');
    },

    // private
    onDestroy : function(){
		Ext.destroy(this.trigger, this.wrap);
        if (this.mimicing){
            Ext.get(Ext.isIE ? document.body : document).un("mousedown", this.mimicBlur, this);
        }
        Ext.form.TriggerField.superclass.onDestroy.call(this);
    },

    // private
    onFocus : function(){
        Ext.form.TriggerField.superclass.onFocus.call(this);
        if(!this.mimicing){
            this.wrap.addClass('x-trigger-wrap-focus');
            this.mimicing = true;
            Ext.get(Ext.isIE ? document.body : document).on("mousedown", this.mimicBlur, this, {delay: 10});
            if(this.monitorTab){
            	this.el.on('keydown', this.checkTab, this);
            }
        }
    },

    // private
    checkTab : function(e){
        if(e.getKey() == e.TAB){
            this.triggerBlur();
        }
    },

    // private
    onBlur : function(){
        // do nothing
    },

    // private
    mimicBlur : function(e){
        if(!this.wrap.contains(e.target) && this.validateBlur(e)){
            this.triggerBlur();
        }
    },

    // private
    triggerBlur : function(){
        this.mimicing = false;
        Ext.get(Ext.isIE ? document.body : document).un("mousedown", this.mimicBlur, this);
        if(this.monitorTab && this.el){
            this.el.un("keydown", this.checkTab, this);
        }
        this.beforeBlur();
        if(this.wrap){
            this.wrap.removeClass('x-trigger-wrap-focus');
        }
        Ext.form.TriggerField.superclass.onBlur.call(this);
    },

    beforeBlur : Ext.emptyFn, 
    
    /**
     * Allow or prevent the user from directly editing the field text.  If false is passed,
     * the user will only be able to modify the field using the trigger.  This method
     * is the runtime equivalent of setting the 'editable' config option at config time.
     * @param {Boolean} value True to allow the user to directly edit the field text
     */
    setEditable : function(value){
        if(value == this.editable){
            return;
        }
        this.editable = value;
        if(!value){
            this.el.addClass('x-trigger-noedit').on('click', this.onTriggerClick, this).dom.setAttribute('readOnly', true);
        }else{
            this.el.removeClass('x-trigger-noedit').un('click', this.onTriggerClick,  this).dom.removeAttribute('readOnly');
        }
    },

    // private
    // This should be overriden by any subclass that needs to check whether or not the field can be blurred.
    validateBlur : function(e){
        return true;
    },

    // private
    onDisable : function(){
        Ext.form.TriggerField.superclass.onDisable.call(this);
        if(this.wrap){
            this.wrap.addClass(this.disabledClass);
            this.el.removeClass(this.disabledClass);
        }
    },

    // private
    onEnable : function(){
        Ext.form.TriggerField.superclass.onEnable.call(this);
        if(this.wrap){
            this.wrap.removeClass(this.disabledClass);
        }
    },

    // private
    onShow : function(){
        if(this.wrap){
			var s = this.wrap.dom.style;
            s.display = '';
            s.visibility = 'visible';
        }
    },

    // private
    onHide : function(){
        this.wrap.dom.style.display = 'none';
    },

    /**
     * The function that should handle the trigger's click event.  This method does nothing by default
     * until overridden by an implementing function.  See Ext.form.ComboBox and Ext.form.DateField for
     * sample implementations.
     * @method
     * @param {EventObject} e
     */
    onTriggerClick : Ext.emptyFn

    /**
     * @cfg {Boolean} grow @hide
     */
    /**
     * @cfg {Number} growMin @hide
     */
    /**
     * @cfg {Number} growMax @hide
     */
});

/**
 * @class Ext.form.TwinTriggerField
 * @extends Ext.form.TriggerField
 * TwinTriggerField is not a public class to be used directly.  It is meant as an abstract base class
 * to be extended by an implementing class.  For an example of implementing this class, see the custom
 * SearchField implementation here: http://extjs.com/deploy/ext/examples/form/custom.html
 */
Ext.form.TwinTriggerField = Ext.extend(Ext.form.TriggerField, {
    /**
     * @cfg {Mixed} triggerConfig
     * <p>A {@link Ext.DomHelper DomHelper} config object specifying the structure of the trigger elements
     * for this Field. (Optional).</p>
     * <p>Specify this when you need a customized element to contain the two trigger elements for this Field.
     * Each trigger element must be marked by the CSS class <tt>x-form-trigger</tt> (also see
     * <tt>{@link #trigger1Class}</tt> and <tt>{@link #trigger2Class}</tt>).</p>
     * <p>Note that when using this option, it is the developer's responsibility to ensure correct sizing,
     * positioning and appearance of the triggers.</p>
     */
    /**
     * @cfg {String} trigger1Class
     * An additional CSS class used to style the trigger button.  The trigger will always get the
     * class <tt>'x-form-trigger'</tt> by default and <tt>triggerClass</tt> will be <b>appended</b> if specified.
     */
    /**
     * @cfg {String} trigger2Class
     * An additional CSS class used to style the trigger button.  The trigger will always get the
     * class <tt>'x-form-trigger'</tt> by default and <tt>triggerClass</tt> will be <b>appended</b> if specified.
     */
    initComponent : function(){
        Ext.form.TwinTriggerField.superclass.initComponent.call(this);

        this.triggerConfig = {
            tag:'span', cls:'x-form-twin-triggers', cn:[
            {tag: "img", src: Ext.BLANK_IMAGE_URL, cls: "x-form-trigger " + this.trigger1Class},
            {tag: "img", src: Ext.BLANK_IMAGE_URL, cls: "x-form-trigger " + this.trigger2Class}
        ]};
    },

    getTrigger : function(index){
        return this.triggers[index];
    },

    initTrigger : function(){
        var ts = this.trigger.select('.x-form-trigger', true);
        this.wrap.setStyle('overflow', 'hidden');
        var triggerField = this;
        ts.each(function(t, all, index){
            t.hide = function(){
                var w = triggerField.wrap.getWidth();
                this.dom.style.display = 'none';
                triggerField.el.setWidth(w-triggerField.trigger.getWidth());
            };
            t.show = function(){
                var w = triggerField.wrap.getWidth();
                this.dom.style.display = '';
                triggerField.el.setWidth(w-triggerField.trigger.getWidth());
            };
            var triggerIndex = 'Trigger'+(index+1);

            if(this['hide'+triggerIndex]){
                t.dom.style.display = 'none';
            }
            this.mon(t, 'click', this['on'+triggerIndex+'Click'], this, {preventDefault:true});
            t.addClassOnOver('x-form-trigger-over');
            t.addClassOnClick('x-form-trigger-click');
        }, this);
        this.triggers = ts.elements;
    },

    /**
     * The function that should handle the trigger's click event.  This method does nothing by default
     * until overridden by an implementing function. See {@link Ext.form.TriggerField#onTriggerClick}
     * for additional information.  
     * @method
     * @param {EventObject} e
     */
    onTrigger1Click : Ext.emptyFn,
    /**
     * The function that should handle the trigger's click event.  This method does nothing by default
     * until overridden by an implementing function. See {@link Ext.form.TriggerField#onTriggerClick}
     * for additional information.  
     * @method
     * @param {EventObject} e
     */
    onTrigger2Click : Ext.emptyFn
});
Ext.reg('trigger', Ext.form.TriggerField);