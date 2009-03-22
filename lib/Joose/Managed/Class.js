Joose.Managed.Class = new Joose.Proto.Class('Joose.Managed.Class', {
    
    isa                         : Joose.Proto.Class,
    
    stem                        : null,
    stemClass                   : Joose.Managed.Stem,
    
    builder                     : null,
    builderClass                : Joose.Managed.Builder,
    
    
    initialize: function (name, extend) {
        this.SUPER(name, extend);
        
        this.stem.close();
    },
    
    
    processStem : function(extend){
        this.SUPER();
        
        this.builder    = new this.builderClass({ targetClass : this.c });
        this.stem       = new this.stemClass(this.name, { targetClass : this.c });
        
        var thisMeta = this.meta;
        
        var builderClass = this.getAttributedClass('builderClass');
        if (builderClass) this.addAttribute('builderClass', thisMeta.subClassOf(builderClass));
        
        var stemClass = this.getAttributedClass('stemClass');
        if (stemClass) this.addAttribute('stemClass', thisMeta.subClassOf(stemClass));
    },
    
    
    extend : function (props) {
        if (props.builder) {
        	var builderClass = this.getAttributedClass('builderClass');
        	if (!builderClass) throw "Attempt to extend a builder on non-meta class";
        	
            builderClass.meta.extend(props.builder);
            delete props.builder;
        }
        
        if (props.stem) {
        	var stemClass = this.getAttributedClass('stemClass');
        	if (!stemClass) throw "Attempt to extend a stem on non-meta class";

        	stemClass.meta.extend(props.stem);
            delete props.stem;
        }
        
        this.builder._extend(props);
    },
    
    
    getAttributedClass : function(attributeName) {
    	var attrClass = this.getAttribute(attributeName);
    	if (attrClass instanceof Joose.Managed.Property.Attribute) attrClass = attrClass.value;
    	
    	return attrClass;
    },
    
    
    addMethodModifier: function (name, func, type) {
        var props = {};
        props.init = func;
        props.meta = type;
        
        return this.stem.properties.methodsModifiers.addProperty(name, props)
    },
    
    
    removeMethodModifier: function (name) {
        return this.stem.properties.methodsModifiers.removeProperty(name)
    },
    
    
    addMethod: function (name, func, props) {
        props = props || {};
        props.init = func;
        
        return this.stem.properties.methods.addProperty(name, props)
    },
    
    
    addAttribute: function (name, init, props) {
        props = props || {};
        props.init = init;
        
        return this.stem.properties.attributes.addProperty(name, props);
    },
    
    
    removeMethod : function (name){
        return this.stem.properties.methods.removeProperty(name);
    },

    
    removeAttribute: function (name) {
        return this.stem.properties.attributes.removeProperty(name);
    },
    
    
    hasMethod: function (name) {
        return this.stem.properties.methods.haveProperty(name);
    },
    
    
    hasAttribute: function (name) { 
        return this.stem.properties.attributes.haveProperty(name);
    },
    
    
    hasOwnMethod: function (name) {
        return this.stem.properties.methods.haveOwnProperty(name);
    },
    
    
    hasOwnAttribute: function (name) { 
        return this.stem.properties.attributes.haveOwnProperty(name);
    },
    

    getMethod : function(name) {
        return this.stem.properties.methods.getProperty(name);
    },
    
    
    getAttribute : function(name) {
        return this.stem.properties.attributes.getProperty(name);
    },
    
    
    addRole : function(){
        Joose.A.each(arguments, function(arg){
            var desc = arg;
            
            if (!(desc.meta instanceof Joose.Managed.Role)) {
                desc.propertySet = desc.role.meta.stem;
                delete desc.role;
            } else {
                desc = desc.meta.stem;
            }
            
            this.stem.addComposeInfo(desc);
        }, this)
    },
    
    
    removeRole : function(){
        Joose.A.each(arguments, function(arg){
            this.stem.removeComposeInfo(arg.meta.stem);
        }, this)
    }
    
}).c;