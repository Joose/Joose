Joose.Managed.Role = new Joose.Managed.Class('Joose.Managed.Role', {
    
    isa                         : Joose.Managed.Class,
    
    have : {
        defaultSuperClass       : Joose.Proto.Empty,
        
	    builderRole				: null,
	    stemRole				: null
    },
    
    
    methods : {
        
        defaultClassFunctionBody: function () {
            return function () {
                throw "Roles cant be instantiated"
            };
        },
        

        processSuperClass : function() {
            if (this.superClass != this.defaultSuperClass) throw "Roles cant inherit from anything";
        },
        
        
	    getBuilderTarget : function(){
	    	if (!this.builderRole) this.builderRole = new this.constructor().c;
	    	
	    	return this.builderRole;
	    },
	    
	
	    getStemTarget : function(){
	    	if (!this.stemRole) this.stemRole = new this.constructor().c;
	    	
	    	return this.stemRole;
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
    	methods : {
	        prepareApply : function() {
	        },
	        
	        
	        apply : function(){
	        },
	        
	        
	        unapply : function(){
	        }
    	}
    },
    
    
    builder : {
    	methods : {
	        requires : function(targetClassMeta, info) {
	            Joose.A.each(info, function(methodName) {
	                targetClassMeta.addRequirement(methodName);
	            }, this);
	        }
    	}
    }
    
}).c;