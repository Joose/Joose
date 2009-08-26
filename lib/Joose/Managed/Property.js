Joose.Managed = function () { throw "Modules may not be instantiated." }

Joose.Managed.Property = new Joose.Proto.Class('Joose.Managed.Property', {
    
    name            : null,
    
    props           : null,
    value           : null,
    
    definedIn       : null,
    
    
    initialize : function (name, props) {
        this.name           = name
        this.props          = props
        
        this.definedIn      = props.definedIn
        
        delete props.definedIn
        delete props.meta
        
        this.computeValue(props)
    },
    
    
    computeValue : function (props) {
        this.value = props.init
    },    
    
    
    //targetClass is still open at this stage ;)
    prepareApply : function (targetClass) {
    },
    
    
    apply : function (target) {
        target[this.name] = this.value
    },
    
    
    isAppliedTo : function (target) {
        return target[this.name] == this.value
    },
    
    
    unapply : function (from) {
        if (!this.isAppliedTo(from)) throw "Unapply of property [" + this.name + "] from [" + from + "] failed"
        
        delete from[this.name]
    },
    
    
    clone : function (name) {
        return new this.constructor(name || this.name, this.props)
    }
    
    
}).c