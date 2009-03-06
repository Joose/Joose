Joose.Managed.ClassStem.MethodModifiers = new Joose.Proto.Class('Joose.Managed.ClassStem.MethodModifiers', null, Joose.Managed.PropertySet.Mutable, {
    
//    propertyMetaClass : Joose.Managed.Property.MethodModifier,
//    
//    
//    addProperty : function (name, props) {
//        props.definedIn         = this;
//        var modifier = new this.propertyMetaClass(name, props);
//        
//        if (!this.properties[name]) this.properties[name] = [];
//        this.properties[name].push(modifier);
//        
//        return modifier;
//    },
//    
//
//    addPropertyObject : function (object) {
//        var name = object.name;
//        
//        if (!this.properties[name]) this.properties[name] = [];
//        
//        this.properties[name].push(object);
//        
//        return object;
//    },
//    
//    
//    //remove only the last modifier
//    removeProperty : function (name) {
//        if (!this.haveProperty(name)) return undefined;
//        
//        //removes both from container and properties
//        var modifier = this.properties[name].shift();
//        
//        //if all modifiers were removed - clearing the properties
//        if (!this.properties[name].length) this.SUPER(name);
//        
//        return modifier;
//    },
//    
//    
//    alias : function (){
//    },
//    
//    
//    exclude : function (){
//    },
//    
//    
//    flattenTo : function (target){
//        this.each(function(modifiersArr, name){
//            var targetModifiersArr = target.getProperty(name);
//            
//            if (typeof targetModifiersArr == 'undefined') targetModifiersArr = target.properties[name] = []
//            
//            Joose.A.each(modifiersArr, function(modifier) {
//                if (!Joose.A.exists(targetModifiersArr, modifier)) targetModifiersArr.push(modifier);
//            });
//            
//        }, this);
//        
//        return this;
//    },
//    
//    
//    composeTo : function(target){
//        this.flattenTo(target);
//        
//        return this;
//    },
//
//    
//    deCompose : function(){
//        this.each(function(modifiersArr, name){
//            var i = 0; 
//            
//            while (i < modifiersArr.length) {
//                if (modifiersArr[i].definedIn != this) modifiersArr.splice(i,1); else i++;
//            }
//            
//        }, this);
//    }
    
    
}).c;