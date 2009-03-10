Joose.Managed.Role = new Joose.Managed.Class('Joose.Managed.Role', {
    
    isa                         : Joose.Managed.Class,
    
    have : {
        defaultSuperClass       : Joose.Proto.Empty,
        
        stemClass : new Joose.Proto.Class(null, {
            isa : Joose.Managed.Stem,
        
            attributesMC         : Joose.Managed.RoleStem.Attributes,
            methodsMC            : Joose.Managed.RoleStem.Methods,
            requirementsMC       : Joose.Managed.RoleStem.Requirements,
            methodsModifiersMC   : Joose.Managed.RoleStem.MethodModifiers
            
        }).c
    },
    
    
    methods : {
        
        defaultClassFunctionBody: function () {
            return function () {
                throw "Roles cant be instantiated"
            };
        },
        

        prepareStem : function(extend){
            this.builderClass = new this.meta.constructor('builder_of_' + this.name, { 
                isa : this.meta.builderClass
            }).c;
            
//            var stemExtend = extend.stem || {};
//            stemExtend.isa = this.meta.stemClass || this.stemClass;
//            delete extend.stem;
//            
//            this.stemClass = new this.meta.constructor('stem_of_' + this.name, stemExtend).c;
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
    }
    

//    stem : {
//        attributesMC         : Joose.Managed.RoleStem.Attributes,
//        methodsMC            : Joose.Managed.RoleStem.Methods,
//        requirementsMC       : Joose.Managed.RoleStem.Requirements,
//        methodsModifiersMC   : Joose.Managed.RoleStem.MethodModifiers
//    }
    
}).c;