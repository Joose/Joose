(function(){
    
    var __ID__ = 1;
    

    Joose.Managed.PropertySet.Mutable = new Joose.Proto.Class('Joose.Managed.PropertySet.Mutable', {
        
        isa                 : Joose.Managed.PropertySet,
    
        ID                  : null,
        
        derivatives         : null,
        
        //initially opened
        opened              : 1,
        
        composedFrom        : null,
        
        newComposers		: null,
        
        
        initialize : function(name, props) {
            Joose.Managed.PropertySet.Mutable.superClass.initialize.call(this, name, props);
            
            this.derivatives  = {};
            this.ID           = __ID__++;
            this.composedFrom = [];
            this.newComposers = [];
        },
        
        
        setComposeInfo : function(){
            this.ensureOpen();
            
            this.flushComposers(true);
            
            Joose.A.each(this.composedFrom, function(arg) {
                var propSet = arg instanceof Joose.Managed.PropertySet ? arg : arg.propertySet;
                    
                delete propSet.derivatives[this.ID];
            }, this);
            
            this.composedFrom = [];
            
            this.addComposeInfo.apply(this, arguments);
        },
        
        
        addComposeInfo : function(){
            this.ensureOpen();
            
            Joose.A.each(arguments, function(arg) {
                this.newComposers.push(arg);
                
                var propSet = arg instanceof Joose.Managed.PropertySet ? arg : arg.propertySet;
                    
                propSet.derivatives[this.ID] = this;
            }, this);
        },
        
        
        removeComposeInfo : function(){
            this.ensureOpen();
            
            this.flushComposers(true);
            
            Joose.A.each(arguments, function(arg) {
                
                var i = 0;
                
                while (i < this.composedFrom.length) {
                    var propSet = this.composedFrom[i];
                    propSet = propSet instanceof Joose.Managed.PropertySet ? propSet : propSet.propertySet;
                    
                    if (arg == propSet) {
                        delete propSet.derivatives[this.ID];
                        this.composedFrom.splice(i, 1);
                    } else i++;
                }
                
            }, this);
        },
        
        
        ensureOpen : function(){
            if (!this.opened) throw "Mutation of closed property set: [" + this.name + "]";
        },
        
        
        addProperty : function (name, props) {
            this.ensureOpen();
            
            return Joose.Managed.PropertySet.Mutable.superClass.addProperty.call(this, name, props);
        },
        
    
        addPropertyObject : function (object) {
            this.ensureOpen();
            
            return Joose.Managed.PropertySet.Mutable.superClass.addPropertyObject.call(this, object);
        },
        
        
        removeProperty : function (name) {
            this.ensureOpen();
            
            return Joose.Managed.PropertySet.Mutable.superClass.removeProperty.call(this, name);
        },
        
        
	    prepareFlattening : function () {
	    	if (!this.flattening) Joose.Managed.PropertySet.Mutable.superClass.prepareFlattening.call(this);
	    },
	    
	    
	    flushComposers : function(dropFlattening) {
	    	Array.prototype.push.apply(this.composedFrom, this.newComposers);
	    	
	    	this.newComposers = [];
	    	
	    	if (dropFlattening) this.flattening = null;
	    },
    
        
        composeFrom : function() {
            this.ensureOpen();
            
            var composedFrom;
            
            if (this.flattening) 
            	composedFrom = this.newComposers
        	else {
        		this.flushComposers();
        		composedFrom = this.composedFrom;
        	}
            
            return Joose.Managed.PropertySet.Mutable.superClass.composeFrom.apply(this, composedFrom);
        },
        
        
        open : function() {
            this.opened++;
            
            if (this.opened == 1) {
            
                Joose.O.each(this.derivatives, function(propSet) {
                    propSet.flattening = null;
                    propSet.open();
                });
                
                this.deCompose();
            }
        },
        
        
        close : function() {
            if (!this.opened) throw "Unmatched 'close' operation on property set: [" + this.name + "]";
            
            if (this.opened == 1) {
                this.reCompose();
                
                Joose.O.each(this.derivatives, function(propSet){
                    propSet.close();
                });
            }
            this.opened--;
        },
        
        
        reCompose : function() {
            this.composeFrom();
            
            this.flushComposers();
        },
        
        
        deCompose : function() {
            this.each(function(property, name){
                if (property.definedIn != this) this.removeProperty(name);
            }, this);
        }
        
    }).c;
    
    
})();