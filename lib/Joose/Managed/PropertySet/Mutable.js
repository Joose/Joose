(function(){
    
    var __ID__ = 1;
    

    Joose.Managed.PropertySet.Mutable = new Joose.Proto.Meta('Joose.Managed.PropertySet.Mutable', null, Joose.Managed.PropertySet, {
    
        ID                  : null,
        
        derivatives         : null,
        
        //initially opened
        opened              : 1,
        
        composedFrom        : null,
        
        
        initialize : function(name, props) {
            this.SUPER(name, props);
            
            this.derivatives  = {};
            this.ID           = __ID__++;
            this.composedFrom = [];
        },
        
        
        setComposeInfo : function(){
            this.ensureOpen();
            
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
                this.composedFrom.push(arg);
                
                var propSet = arg instanceof Joose.Managed.PropertySet ? arg : arg.propertySet;
                    
                propSet.derivatives[this.ID] = this;
            }, this);
        },
        
        
        removeComposeInfo : function(){
            this.ensureOpen();
            
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
            
            return this.SUPER(name, props);
        },
        
    
        addPropertyObject : function (object) {
            this.ensureOpen();
            
            return this.SUPER(object);
        },
        
        
        removeProperty : function (name) {
            this.ensureOpen();
            
            return this.SUPER(name);
        },
        
        
        composeFrom : function() {
            this.ensureOpen();
            
            return this.SUPERARG(this.composedFrom);
        },
        
        
        open : function(){
            this.opened++;
            
            if (this.opened == 1) {
            
                Joose.O.each(this.derivatives, function(propSet){
                    propSet.open();
                });
                
                this.deCompose();
            }
        },
        
        
        close : function(){
            if (!this.opened) throw "Unmatched 'close' operation on property set: [" + this.name + "]";
            
            if (this.opened == 1) {
                this.reCompose();
                
                Joose.O.each(this.derivatives, function(propSet){
                    propSet.close();
                });
            }
            this.opened--;
        },
        
        
        reCompose : function(){
            this.composeFrom();
        },
        
        
        deCompose : function(){
            this.each(function(property, name){
                if (property.definedIn != this) this.removeProperty(name);
            }, this);
        }
        
    }).c;
    
    
})();

