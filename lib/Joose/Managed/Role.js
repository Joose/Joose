Joose.Managed.Role = new Joose.Managed.Class('Joose.Managed.Role', {
    
    isa                         : Joose.Managed.Class,
    
    have : {
        defaultSuperClass       : Joose.Proto.Empty
    },
    
    
    methods : {
        
        defaultConstructor : function () {
            return function () {
                throw "Roles cant be instantiated"
            }
        },
        

        processSuperClass : function () {
            if (this.superClass != this.defaultSuperClass) throw "Roles can't inherit from anything"
        },
        
        
        getBuilderTarget : function () {
            if (this.builderClassMutated) return this.builderClass
            
            this.builderClassMutated = true
            
            return this.builderClass = new this.constructor().c
        },
        
    
        getStemTarget : function () {
            if (this.stemClassMutated) return this.stemClass
            
            this.stemClassMutated = true
            
            return this.stemClass = new this.constructor().c
        },
        
    
        hasOwnMethod: function (name) { 
            return this.hasMethod(name)
        },
        
        
        hasOwnAttribute: function (name) { 
            return this.hasAttribute(name)
        },
        
    
        addRequirement : function (methodName) {
            this.stem.properties.requirements.addProperty(methodName, {})
        }
        
    },
    

    stem : {
        methods : {
            prepareApply : function () {
            },
            
            
            apply : function () {
            },
            
            
            unapply : function () {
            }
        }
    },
    
    
    builder : {
        methods : {
            requires : function (targetClassMeta, info) {
                Joose.A.each(info, function (methodName) {
                    targetClassMeta.addRequirement(methodName)
                }, this)
            }
        }
    }
    
}).c