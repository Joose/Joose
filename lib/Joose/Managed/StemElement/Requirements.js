Joose.Managed.StemElement.Requirements = new Joose.Proto.Class('Joose.Managed.StemElement.Requirements', {

	isa : Joose.Managed.PropertySet.Mutable,
    
    targetMeta             : null,
    
    propertyMetaClass : Joose.Managed.Property.Requirement,
    
    
    initialize : function(name, props) {
        Joose.Managed.StemElement.Requirements.superClass.initialize.call(this, name, props)
        
        this.targetMeta        = props.targetMeta
    },
    
    
    alias : function (){
    },
    
    
    exclude : function (){
    },
    
    
    flattenTo : function (target){
        this.each(function(property, name){
            if (!target.haveProperty(name)) target.addPropertyObject(property)
        }, this)
    },
    
    
    composeTo : function(target){
        this.flattenTo(target)
    },
    
    
    prepareApply : function(target){
    }
    
}).c