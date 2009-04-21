Class('JooseX.Bridge.Ext', {
	
	meta : Joose.Meta.Class,
	isa : Joose.Meta.Class,
	
	does : [ JooseX.Meta.Lazy ],
	
	methods : {
		
		defaultConstructor : function () {
            return function () {
            	arguments.callee.meta.superClass.apply(this, arguments);
            }
		}
		
	},
	
	
	after : {
		
        processSuperClass: function () {
            var superClass = this.superClass;
            var superProto = superClass.prototype;
            
            this.c.superclass   = superProto;
            
            
            if (!superClass.meta) {
            	
            	var helperClass = new Joose.Proto.Class(null, superProto).c;
            	
            	superClass.meta = helperClass.meta;
            	superProto.meta = helperClass.meta;
            	
            	superClass.meta.c = superClass;
            }
        }
		
	},
	
	
	my : {
		
		methods : {
			
			extend : function (subClass, superClass, extend) {
				
				if (!extend) {
			        extend = superClass;
			        superClass = subClass;
			        subClass = null;
			    }
			    
			    var subExtend = { 
			    	isa : superClass, 
		    		methods : {},
		    		have : {}
		    	}
			    if (subClass) subExtend.constructor = subClass;
			    if (extend.hasOwnProperty('constructor')) subExtend.constructor = extend.constructor;
			    
			    Joose.O.eachSafe(extend, function (value, name) {
	                if (name != 'meta' && name != 'constructor') 
	                    if (typeof value == 'function' && !value.meta) subExtend.methods[name] = value; else subExtend.have[name] = value;
			    });
			    
			    return new JooseX.Bridge.Ext(null, subExtend).c;
			}
		
		}
		
	}

});


Joose.Helper.my.registerHelper('ExtClass', JooseX.Bridge.Ext);

//
///**
// * @class
// * @name Joose.Bridge.Ext
// * @desc This package provides fully backward-compatible drop-in replacement for Ext.extend, which turns standard Ext classes into <a href="http://code.google.com/p/joose-js/">Joose</a> Classes.
// * After including this package you can derive new classes in standard way
//<pre>
//Ext.myWindow = Joose.Bridge.Ext.extend(Ext.Window, {
//	
//	initComponent : function (){
//		Ext.myWindow.superclass.initComponent.call(this);
//		this.width = 800;
//	}
//	
//});
//</pre>
//or in the native Joose way:
//<pre>
//ExtClass('Ext.myWindow', {
//	isa : Ext.Window,
//	
//	after : {
//		initComponent : function (){
//			this.width = 800;
//		}
//	}
//	
//});
//</pre>
//in both cases you can use any of Joose features with your classes, for example - apply Roles, either statically, during creation:
//<pre>
//Role('Joosificator', {
//	before : {
//		render : function(){
//			this.title = "Joosified: " + this.title;
//		}
//	}
//});
//
//ExtClass('Ext.myWindow', {
//	isa : Ext.Window,
//	
//	does : [Joosificator],
//	
//	...
//});
//</pre>
//or dynamically, at run-time:
//<pre>
//Ext.myWindow.meta.applyRole(Joosificator);
//</pre>
// * <br/>See the <a href="http://extjs.com/forum/showthread.php?t=55968">forum thread</a> for additional details and <a href="http://code.google.com/p/joose-js/">Joose</a> home page for complete manual on Joose.
// * @version 0.1
// * @author <a href="http://extjs.com/forum/member.php?u=36826">SamuraiJack</a>
// * @license <a href="http://www.gnu.org/licenses/lgpl.html">LGPL 3.0</a>
// */
//Joose.Bridge = { Ext : {} };
//
//Joose.Bridge.Ext.collectMetaData = function (jooseClass, source) {
//    for (var property in source) {
//    	if (source.hasOwnProperty(property))	{
//    		if (typeof source[property] == 'function') {
//    			if (property != 'constructor') jooseClass.meta.addMethod(property, source[property]);
//    		} else {
//    			if (property != 'meta') jooseClass.meta.addAttribute(property, { init : source[property] });
//    		}
//    	}
//    }
//}
//
//
//Class('Joose.ExtClass', {
//	isa : Joose.Class,
//	
//	methods : {
//		
//	    defaultClassFunctionBody: function () {
//	        var f = function () {
//	            var parent = arguments.callee.meta.getSuperClass();
//	            
//	            if (parent) parent.apply(this, arguments);
//	            
//	            this.initialize.apply(this, arguments);
//	        };
//	        joose.addToString(f, function () {
//	            return this.meta.className()
//	        })
//	        return f;
//	    },
//	    
//	    applyRole : function (roles) {
//	    	if (!(roles instanceof Array)) roles = [ roles ];
//	    	
//	    	for (var i = 0; i < roles.length; i++) {
//	    		this.addRole(roles[i]);
//	    		roles[i].meta.applyMethodModifiers(this.c);
//	    	}
//	    }
//	    
//	},
//	
//	before : {
//		
//		initializeFromProps : function(props) {
//            if('isa' in props) {
//                this.handlePropisa(props.isa);
//                delete props.isa;
//            }
//		},
//		
//	    addSuperClass:    function (classObject) {
//		    if (!classObject.meta) {
//		    	Joose.Bridge.Ext.joosify(classObject);
//			    Joose.Bridge.Ext.collectMetaData(classObject, classObject.prototype);
//		    }
//		    
//		    var F = function(){};
//		    F.prototype = classObject.prototype;
//		    
//		    this.c.prototype = new F();
//		    this.c.prototype.constructor = this.c;
//		    
//		    classObject.prototype.constructor = classObject;
//		    
//		    this.c.superclass = classObject.prototype;
//		    
//		    this.c.prototype.meta = this;
//		    
//	        this.addInitializer();
//	        this.addToString();
//	        this.addDetacher();
//	    }
//		
//	}
//	
//});
//
//
///**
// * Class builder for meta-class Joose.ExtClass, which provide compatibility with Joose. This is the exact analog of standard Class function in Joose, 
// * see <a href="http://code.google.com/p/joose-js/wiki/BuildingAClass">this page</a> for examples. This function is copied into global scope and is using for creation of new classes.
// * @name Joose.Bridge.Ext#ExtClass
// * @methodOf Joose.Bridge.Ext
// * @param {String} name The name of the class, being created
// * @param {Object} [overrides] A literal with members, from which the new Class is constructed. See Joose manual.
// * @return {Class} The class constructor.
// */
//Joose.Bridge.Ext.ExtClass = function(name, props) {
//	props = props || {};
//	props.meta = Joose.ExtClass;
//	return Class(name, props);
//}
//
//ExtClass = Joose.Bridge.Ext.ExtClass;
//
//
//Joose.Bridge.Ext.joosify = function (sourceClass) {
//	var MetaClass = Joose.ExtClass;
//	
//	var metaClass = new MetaClass();
//	metaClass.builder = MetaClass;
//	sourceClass = metaClass.createClass(null, sourceClass);
//	sourceClass.meta.builder = MetaClass;
//}
//
///**
// * Improved <b>Ext.ux.extend</b>. Provides exactly the same interface as standard <b>Ext.ux.extend</b> plus it converts both classes into Joose Classes..<br>
// * @name Joose.Bridge.Ext#extend
// * @methodOf Joose.Bridge.Ext
// * @param {Class} subClass The class inheriting the functionality
// * @param {Class} superClass The class being extended
// * @param {Object} [overrides] A literal with members which are copied into the subclass's prototype, and are therefore shared between all instances of the new class.
// * @return {Class} The subclass constructor.
// */
//Joose.Bridge.Ext.extend = function (subClass, superClass, overrides) {
//	
//	//native Ext
//	if (typeof superClass == 'object'){
//        overrides = superClass;
//        superClass = subClass;
//        subClass = overrides.constructor != Object ? overrides.constructor : function(){ superClass.apply(this, arguments); };
//    }
//    
//	//Joose comes into play
//	Joose.Bridge.Ext.joosify(subClass);
//    subClass.meta.addSuperClass(superClass);
//    
//    Joose.Bridge.Ext.collectMetaData(subClass, overrides);
//    
//    return subClass;
//}
