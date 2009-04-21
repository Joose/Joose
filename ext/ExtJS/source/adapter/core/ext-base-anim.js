/*
 * Ext JS Library 3.0 RC1
 * Copyright(c) 2006-2009, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */

(function(){	
	var EXTLIB = Ext.lib,
		noNegativesRE = /width|height|opacity|padding/i,    	
        defaultUnitRE = /width|height|top$|bottom$|left$|right$/i,
        offsetUnitRE =  /\d+(em|%|en|ex|pt|in|cm|mm|pc)$/i;
	
	EXTLIB.Anim = {
        motion : function(el, args, duration, easing, cb, scope) {	        
            return this.run(el, args, duration, easing, cb, scope, EXTLIB.Motion);
        },        

        run : function(el, args, duration, easing, cb, scope, type) {
            type = type || EXTLIB.AnimBase;                        
            var anim = new type(el, args, duration, EXTLIB.Easing[easing] || easing);
	        anim.animate(function() {
		        	if(cb) cb.call(scope);	               
            });            
            return anim;
        }
    };        
    
    EXTLIB.AnimBase = function(el, attrs, duration, method) {
        if (el) {
            this.init(el, attrs, duration, method);
        }
    };
    
    EXTLIB.AnimBase.prototype = {

        doMethod: function(attr, start, end) {
	        var me = this;
            return me.method(me.curFrame, start, end - start, me.totalFrames);
        },

        setAttr: function(attr, val, unit) {
            if (noNegativesRE.test(attr) && val < 0) {
                val = 0;
            }            
            Ext.fly(this.el, '_anim').setStyle(attr, val + unit);
        },

        getAttr: function(attr) {
            var flyEl = fly(this.el),
            	val = flyEl.getStyle(attr),
            	getter;

            if (val !== 'auto' && !offsetUnitRE.test(val)) {
                return parseFloat(val);
            }            
 			getter = flyEl['get' + attr.charAt(0).toUpperCase() + attr.substr(1)];
 			return getter ? getter.call(flyEl) : 0;
        },

        setRunAttr: function(attr) {	        
	        var me = this,
	        	isEmpty = Ext.isEmpty,	        	
            	a = me.attrs[attr],
            	unit = a.unit,
            	by = a.by,
            	from = a.from, 
            	to = a.to,
            	ra = (me.runAttrs[attr] = {}),
            	start,
            	end;

            if (isEmpty(to) && isEmpty(by)) return false;

            start = !isEmpty(from) ? from : me.getAttr(attr);
			end = !isEmpty(to) ? to : [];            
            if (!isEmpty(by)) {
                if (Ext.isArray(start)) { 
	                Ext.each(start, function(v,i,s){ end[i] = v + by[i];});
                } else {
                    end = start + by;
                }
            }

            ra.start = start;
            ra.end = end;
            ra.unit = !isEmpty(unit) ? unit : (defaultUnitRE.test(attr) ? 'px' : '');
        },

        init : function(el, attribute, duration, method) {
            var me = this,
            	actualFrames = 0,            	
            	ease = EXTLIB.Easing,
            	anmgr = EXTLIB.AnimMgr;            	

            me.attrs = attribute || {};  
            me.dur = duration || 1;          
            me.method = method || ease.easeNone;
            me.useSec = true;
            me.curFrame = 0;
            me.totalFrames = anmgr.fps;
            me.el = Ext.getDom(el);
            me.isAnimated = false;
            me.startTime = null;
            me.runAttrs = {};
            
            me.animate = function(callback, scope) {
	            function f() {
		            var me = this;
                	me.onComplete.removeListener(f);                	
	                if (typeof callback == "function") {
	                    callback.call(scope || me, me);
	                }
	            };
	            var me = this;
	            me.onComplete.addListener(f, me);
                me.curFrame = 0;
                me.totalFrames = ( me.useSec ) ? Math.ceil(anmgr.fps * duration) : duration;

                if (!me.isAnimated) anmgr.registerElement(me);
            };
            
            me.stop = function(finish) {
                if (finish) {
                    me.curFrame = me.totalFrames;
                    me._onTween.fire();
                }
                anmgr.stop(me);
            };

            function onStart() {	            
                me.onStart.fire();
                me.runAttrs = {};
                
                for (var attr in me.attrs) {
                	me.setRunAttr(attr);
                }

                me.isAnimated = !!(me.startTime = new Date());                
                actualFrames = 0;                
            };

            function onTween() {
                me.onTween.fire({
                    duration: new Date() - me.startTime,
                    curFrame: me.curFrame
               	});                

                for (var attr in me.runAttrs) {
	                var ra = me.runAttrs[attr];
                    me.setAttr(attr, me.doMethod(attr, ra.start, ra.end), ra.unit);
                }

                actualFrames++;
            };

            function onComplete() {
                me.isAnimated = false;                                
                me.onComplete.fire({
                    duration: (new Date() - me.startTime) / 1000,
                    frames: actualFrames,
                    fps: actualFrames / this.duration
                });
                
                actualFrames = 0;
            };
            
            me.onStart = new Ext.util.Event(me);
            me.onTween = new Ext.util.Event(me);            
            me.onComplete = new Ext.util.Event(me);
            (me._onStart = new Ext.util.Event(me)).addListener(onStart);
            (me._onTween = new Ext.util.Event(me)).addListener(onTween);
            (me._onComplete = new Ext.util.Event(me)).addListener(onComplete); 
        }
    };
         
    EXTLIB.AnimMgr = function() {
        var thread = new Ext.util.TaskRunner(),
        	pub;
        
        function correctFrame(tween) {
            var frames = tween.totalFrames,
            	frame = tween.curFrame,
            	duration = tween.dur,
            	expected = (frame * duration * 1000 / frames),
            	elapsed = (new Date() - tween.startTime),
            	tweak = 0;            	

            if (elapsed < duration * 1000) {
                tweak = Math.round((elapsed / expected - 1) * frame);
            } else {
                tweak = frames - (frame + 1);
            }
            if (tweak > 0 && isFinite(tweak)) {
                if (frame + tweak >= frames) {
                    tweak = frames - (frame + 1);
                }
                tween.curFrame += tweak;
            }
        };	
        
        pub = {
        	fps : 1000,
        	delay : 1,
        	
        	registerElement : function(tween) {                        
	            tween.run = function(tween){ 
		        	if (!tween || !tween.isAnimated) {
	            		return;	
		            }	
		            if (tween.curFrame++ < tween.totalFrames) {			            
		                if (tween.useSec) {
		                    correctFrame(tween);
		                }
		                tween._onTween.fire();
		            } else {             
		                pub.stop(tween);
		            }    
	            };
	            tween.args = [tween];
	            tween.scope = pub;
	            tween.onStop = function(){ 
		           tween._onComplete.fire();	           
		        };		               
		        tween.interval = pub.delay;
	            thread.start(tween);
	            tween._onStart.fire();            
	        },

        	stop : function(tween) {	        
	        	thread.stop(tween);
        	}
    	}
    	return pub;
    }();
    
		 	
    EXTLIB.Easing = {
        easeNone: function (t, b, c, d) {
            return c * t / d + b;
        },

        easeIn: function (t, b, c, d) {
            return c * (t /= d) * t + b;
        },

        easeOut: function (t, b, c, d) {
            return -c * (t /= d) * (t - 2) + b;
        }
	};
 	
// Motion animation	
(function() {	    
    // private
	function bezier (points, t) {
        var len = points.length,
        	tmp = points.slice(0),
        	C = (1 - t),
        	i, 
        	j;
        
        for (j = 1; j < len; ++j) {
            for (i = 0; i < len - j; ++i) {	                
                var ti = tmp[i];
                ti[0] = C * ti[0] + t * tmp[i + 1][0];
                ti[1] = C * ti[1] + t * tmp[i + 1][1];
            }
        }               
        
        return [tmp[0][0], tmp[0][1]];
    }	    
    
    EXTLIB.Motion = function(el, attrs, duration, method) {
        if (el) {
            EXTLIB.Motion.superclass.constructor.call(this, el, attrs, duration, method);
        }
    };

    Ext.extend(EXTLIB.Motion, EXTLIB.AnimBase);
    
    var superclass = EXTLIB.Motion.superclass,        	
    	pointsRE = /^points$/i;	

    Ext.apply(EXTLIB.Motion.prototype, {
        setAttr : function(attr, val, unit) {
	        var setAttr = superclass.setAttr,
	        	me = this;
            if (pointsRE.test(attr)) {
                unit = unit || 'px';
                setAttr.call(me, 'left', val[0], unit);
                setAttr.call(me, 'top', val[1], unit);
            } else {
                setAttr.call(me, attr, val, unit);
            }
        },

        getAttr : function(attr) {	        
	        var getAttr = superclass.getAttr,
	        	me = this;
	        	
			return pointsRE.test(attr) ? 
				   [getAttr.call(me,'left'),getAttr.call(me,'top')] :
				   getAttr.call(me,attr);
        },

        doMethod : function(attr, start, end) {
            var me = this;
            	
           	return pointsRE.test(attr) 
           			? bezier(me.runAttrs[attr],
                			   me.method(me.curFrame, 0, 100, me.totalFrames) / 100)
					: superclass.doMethod.call(me, attr, start, end);
        },

        setRunAttr : function(attr) {
	        var me = this;
            if (pointsRE.test(attr)) {
                var el = me.el,
                	attrs = me.attrs,
                	points = attrs.points,
                	control = points.control || [],  
                	runAttrs = me.runAttrs,	                		                		                	
                	getXY = EXTLIB.Dom.getXY,
                	from = attrs.points.from || getXY(el),	                	
                	start;               	                		                	
                	
            	function translateValues(val, start, to) {
		            var pageXY = to ? getXY(me.el) : [0,0];
		            
		            return val ? [(val[0] || 0) - pageXY[0] + start[0], 
		            			  (val[1] || 0) - pageXY[1] + start[1]]
		            		   : null;
		        }                
            
		        control = typeof control == "string" ? [control] : Ext.toArray(control);

                Ext.fly(el, '_anim').position();
                EXTLIB.Dom.setXY(el, from);
                
                // now set the attribute	
                runAttrs[attr] = [start = me.getAttr('points')].concat(control);
                
				// add end calculation to the attribute array.  It could be null
                runAttrs[attr].push( 
                	translateValues( points.to || points.by || null, start, !Ext.isEmpty(points.to)) 
                );
            }
            else {
                superclass.setRunAttr.call(me, attr);
            }
        }
    });
})();
})();