(function(){
    var __ID__ = 1;
    

    Joose.Managed.PropertySet.Mutable = new Joose.Proto.Meta('Joose.Managed.PropertySet.Mutable', null, Joose.Managed.PropertySet, {
    
        ID                  : null,
        
        propertyMetaClass   : Joose.Managed.Property.Mutable,
        
        derivatives         : null,
        
        //initially opened
        opened              : 1,
        
        lastCompose         : null,
        
        
        initialize : function(props) {
            this.SUPER(props);
            
            this.derivatives = {};
            
            this.ID         = __ID__++;
        },
        
        
        addProperty : function (name, props) {
            props.definedIn = this;
            this.open();
            var res = this.SUPER(name, props);
            this.close();
            
            return res;
        },
        
    
        addPropertyObject : function (object) {
            this.open();
            var res = this.SUPER(object);
            this.close();
            
            return res;
        },
        
        
        removeProperty : function (name) {
            this.open();
            var res = this.SUPER(name);
            this.close();
            
            return res;
        },
        
        
        composeFrom : function() {
            if (!arguments.length) throw "Compose operation requires at least one argument";
            
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
            
            this.open();
            var res = this.SUPERARG(arguments);
            this.close();
            
            this.lastCompose = arguments;
            
            return res;
        },
        
        
        
    //    clone : function (){
    //        var res = this.SUPER();
    //        this.derivatives.push(res);
    //        
    //        return res;
    //    },
    //    
    //    
    //    flattenTo : function (target){
    //        this.derivatives.push(target);
    //        
    //        return this.SUPER(target);
    //    },
    //    
    //    
    //    composeTo : function(target){
    //        this.derivatives.push(target);
    //        
    //        return this.SUPER(target);
    //    },
        
        
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
            
            this.opened--;
            if (!this.opened) {
                Joose.O.each(this.derivatives, function(propSet, ID){
                    propSet.close();
                });
                
                this.reCompose();
            }
        },
        
        
        reCompose : function(){
            if (this.lastCompose) this.composeFrom.apply(this, this.lastCompose);
        },
        
        
        deCompose : function(){
            this.each(function(property, name){
                if (property.definedIn != this) this.removeProperty(name);
            }, this);
        }
        
    }).c;
    
    
})();

