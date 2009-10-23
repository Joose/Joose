Joose.Meta.Class = new Joose.Managed.Class('Joose.Meta.Class', {
    
    isa                         : Joose.Managed.Class,
    
    does                        : Joose.Managed.Bootstrap,
    
    have : {
        defaultSuperClass       : Joose.Meta.Object
    },
    
    
    methods : {
        
        defaultConstructor: function () {
            return function () {
                var props = this.BUILD.apply(this, arguments)
                
                var traits = props.trait || props.traits
                delete props.trait
                delete props.traits
                
                if (traits || props.detached) {
                    delete props.detached
                    
                    var classWithTrait = this.meta.subclassOf(this.constructor, { isDetached : true, does : traits || [] })
                    
                    //skipping the BUILD method
                    var f = function () {}
                    f.prototype = classWithTrait.prototype
                    
                    var obj = new f()
                    
                    obj.initialize(props)
                    
                    return obj
                }
                
                this.initialize(props)
            }
        }
        
    }
    
}).c

