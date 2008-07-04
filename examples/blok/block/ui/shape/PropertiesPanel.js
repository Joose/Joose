Module("block.ui.shape", function (m) {
    Class("PropertiesPanel", {
        isa: block.ui.Shape,
        has: {
            _shape: {
            	is: "rw"
            }
        },
        methods: {
        	
        	// Warning ugly:
        	// ele must be an input or select
        	// ele.id must me a method name or a methodName-firstPara
        	callProp: function (ele, shape, value) {
        		
        		var $ele = $(ele);
        		
        		var id    = ele.id
             	var parts = id.substr(4).split("-");
             	var prop  = parts[0];
             	var optionalPara = parts[1];
             	var paras = [];
             	if(optionalPara) {
             		paras.push(optionalPara)
             	}
             	if(arguments.length > 2) {
             		var val = "" + value;
             		
             		if($ele.attr("addPx")) {
             			val += "px"
             		}
             		paras.push(val)
             	}
             	var does = $ele.attr('jooseDoes');
             	if(shape.meta.can(prop) && (!does || shape.meta.does(shape.meta.classNameToClassObject(does))) ) {
             		ele.disabled = false;
             		var val = shape[prop].apply(shape, paras);
             		if(val != null) {
             			if($ele.attr("addPx")) {
             				val = val.replace(/px/, "")
             			}
             			return val
             		} else {
             			return ""
             		}
             	} else {
             		ele.disabled = true;
             		return "n/a"
             	}
        	},
        	
            place: function () {
            	var me = this;
                
                this.$  = $("#properties");
                
                this.redraw()
                
                this.$.find("input,select").each(function () {
                	
                	var input = $(this);
                	
                	input.change(function () {
                		var shape = me.getShape();
                		if(shape) {
                			me.callProp(this, shape, $(this).val())
                			shape.updateState()
                		}
                	})
                })
            },
            
            show: function () {
            	this.$.show();
            },
            
            hide: function () {
            	this.$.hide();
            },
            
            setShape: function (newEle) {
            	this._shape = newEle
                this.refresh(newEle);
                this.show()
            },
            
            refresh: function (shape) {
            	var me = this;
            	if(shape === this.getShape()) {
            		$('#shapeType').html(shape.type())
            		this.$.find("input, select").each(function () {
            			$(this).val(me.callProp(this, shape))
            		})
            		$.colorPicker.refreshSamples()
            	}
            },
            
            redraw: function () {
                this.$.css("top",$(window).height() - this.$.height());
            }
        }
    })
})