Joose.Managed.Meta = new Joose.Proto.Meta('Joose.Managed.Meta', null, Joose.Proto.Meta, {
    
    stem                        : null,
    
    builder                     : null,
    
    defaultSuperClass           : Joose.Managed.Object,
    
    
    initialize: function (name, constructor, superClass, extend) {
        extend = extend || {};
        
        if (extend.isa) {
            var superClass = extend.isa;
            delete extend.isa;
        }
        
        this.prepareCore(superClass);
        
        this.SUPER(name, constructor, superClass, extend);
        
        this.stem.close();
    },
    
    
    prepareCore : function(superClass){
        var builderClass = superClass.meta.builder ? new this.meta.constructor(null, null, superClass.meta.builder.constructor).c : Joose.Managed.Builder;
        var stemClas = superClass.meta.stem ? new this.meta.constructor(null, null, superClass.meta.stem.constructor).c : Joose.Managed.Stem;
        
        this.builder = new builderClass({ targetClass : this.c });
        this.stem = new stemClas({ targetClass : this.c });
    },
    

    extend : function (props) {
        props = props || {};
        
        if (props.builder) {
            this.builder.meta.extend(props.builder);
            delete props.builder;
        }
        
        if (props.stem) {
            this.stem.meta.extend(props.stem);
            delete props.stem;
        }
        
        this.builder.extend(props);
    }
    
    
}).c;