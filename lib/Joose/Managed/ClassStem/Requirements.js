Joose.Managed.ClassStem.Requirements = new Joose.Proto.Class('Joose.Managed.ClassStem.Requirements', {

	isa : Joose.Managed.PropertySet.Mutable,
    
    targetMeta             : null,
    
    propertyMetaClass : Joose.Managed.Property.Requirement,
    
    
    initialize : function(name, props) {
        this.SUPER(name, props);
        
        this.targetMeta        = props.targetMeta;
    },
    
    
    alias : function (){
    },
    
    
    exclude : function (){
    },
    
    
    flattenTo : function (target){
        this.each(function(property, name){
            if (!target.getProperty(name)) target.addPropertyObject(property);
        }, this);
        
        return this;
    },
    
    
    composeTo : function(target){
        this.flattenTo(target);
        
        return this;
    }
	
	
	
    
    
    
    

    
//    reCompose : function(){
//        this.prepareApply(this.targetMeta.c);
//        
//        this.SUPER();
//        
//        this.apply(this.targetMeta.c);
//    },
//    
//    
//    deCompose : function(){
//        this.unapply(this.targetMeta.c);
//        
//        this.SUPER();
//    }     

    
}).c;