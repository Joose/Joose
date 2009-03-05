(function(){
    var __ID__ = 1;
    

    Joose.Managed.PropertySet.Mutable = new Joose.Proto.Meta('Joose.Managed.PropertySet.Mutable', null, Joose.Managed.PropertySet, {
    
        ID                  : null,
        
        propertyMetaClass   : Joose.Managed.Property.Mutable,
        
        derivatives         : null,
        
        //initially opened
        opened              : null,
        
        compositionBroken    : null,
        lastCompose         : null,
        
        
        initialize : function(props) {
            this.SUPER(props);
            
            this.derivatives = {};
            
            this.opened     = 1;
            this.ID         = __ID__++;
        },
        
        
        addProperty : function (name, props) {
            if (!this.opened) throw "Mutation of closed property set";
            
            props.definedIn = this;
            return this.SUPER(name, props);
        },
        
    
        addPropertyObject : function (object) {
            if (!this.opened) throw "Mutation of closed property set";
            
            return this.SUPER(object);
        },
        
        
        removeProperty : function (name) {
            if (!this.opened) throw "Mutation of closed property set";
            
            return this.SUPER(name);
        },
        
        
        composeFrom : function() {
            if (!this.opened) throw "Mutation of closed property set";
            
            if (this.lastCompose) {
                Joose.A.each(this.lastCompose, function(arg) {
                    var propSet = arg instanceof Joose.Managed.PropertySet ? arg : arg.properties;
                        
                    delete propSet.derivatives[this.ID];
                }, this);
            }
            
            Joose.A.each(arguments, function(arg) {
                var propSet = arg instanceof Joose.Managed.PropertySet ? arg : arg.properties;
                    
                propSet.derivatives[this.ID] = this;
            }, this);
            
            var res = this.SUPERARG(arguments);
            
            this.lastCompose = arguments;
            
            return res;
        },
        
        
        open : function(){
            this.opened++;
            
            if (this.opened == 1) {
            
                Joose.O.each(this.derivatives, function(propSet, ID){
                    propSet.open();
                });
                
                this.deCompose();
            }
        },
        
        
        close : function(){
            if (!this.opened) throw "Unmatched 'close' operation";
            
            if (this.opened == 1) {
                this.reCompose();
                
                Joose.O.each(this.derivatives, function(propSet, ID){
                    propSet.close();
                });
            }
            this.opened--;
        },
        
        
        reCompose : function(){
            if (this.lastCompose && this.compositionBroken) {
                this.composeFrom.apply(this, this.lastCompose);
                this.compositionBroken = false;
            }
        },
        
        
        deCompose : function(){
            if (this.lastCompose) this.compositionBroken = true;
            
            this.each(function(property, name){
                if (property.definedIn != this) this.removeProperty(name);
            }, this);
        }
        
    }).c;
    
    
})();

