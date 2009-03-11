Joose.Managed.Role = new Joose.Managed.Class('Joose.Managed.Role', {
    
    isa                         : Joose.Managed.Class,
    
    have : {
        defaultSuperClass       : Joose.Proto.Empty
    },
    
    
    methods : {
        
        defaultClassFunctionBody: function () {
            return function () {
                throw "Roles cant be instantiated"
            };
        },
        

        processSuperClass : function(){
            if (this.superClass != this.defaultSuperClass) throw "Roles cant inherit from anything";
        },
        
    
        hasOwnMethod: function (name) { 
            return this.hasMethod(name);
        },
        
        
        hasOwnAttribute: function (name) { 
            return this.hasAttribute(name);
        },
        
    
        addRequirement : function(methodName){
            this.stem.properties.requirements.addProperty(methodName, {});
        }
    },
    

    stem : {
        attributesMC         : Joose.Managed.RoleStem.Attributes,
        methodsMC            : Joose.Managed.RoleStem.Methods,
        requirementsMC       : Joose.Managed.RoleStem.Requirements,
        methodsModifiersMC   : Joose.Managed.RoleStem.MethodModifiers
    }
    
}).c;