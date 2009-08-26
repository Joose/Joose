Joose.Namespace.Manager = new Joose.Meta.Class('Joose.Namespace.Manager', {
    
    my : {
        
        have : {
            global : null,
            
            current : null
        },
        
        
        methods : {
            
            initialize : function(){
                var global = this.global = new Joose.Namespace.Keeper('').c
                
                global.meta.ns.container = Joose.top
                global.meta.parent = global
                
                global.meta.ns.addProperty('__global__', global.meta.ns)
                __global__.addProperty('Joose', new Joose.Namespace.Keeper("Joose", { constructor : Joose }).c)
                Joose.meta.ns.addProperty('Namespace', new Joose.Namespace.Keeper("Joose.Namespace", { constructor : Joose.Namespace }).c)
                
                this.current = [ global ]
            },
            
            
            getCurrent: function () {
                return this.current[0]
            },
            
            
            executeIn : function (ns, func, scope, argsArray) {
                var current = this.current
                
                current.unshift(ns)
                var res = func.apply(scope || this, argsArray || [])
                current.shift()
                
                return res
            },
            
            
            earlyCreate : function (name, metaClass, props) {
                var earlyProps = {
                    constructorOnly : true
                }
                
                if (props && props.hasOwnProperty('constructor')) {
                    earlyProps.constructor = props.constructor
                    delete props.constructor
                }
                
                return new metaClass(name, earlyProps).c
            },
            
            
            //this function establishing the full "namespace chain" (including the last element)
            create : function (nsName, metaClass, extend, currentNs) {
                props = extend || {}
                
                var parts = Joose.S.saneSplit(nsName, '.')
                if (!parts.length) throw "Cant prepare namespace with empty name = [" + nsName + "]"
                var object  = currentNs || this.getCurrent()
                var soFar   = Joose.S.saneSplit(object.meta.name, '.')
                
                for(var i = 0; i < parts.length; i++) {
                    var part = parts[i]
                    var isLast = i == parts.length - 1
                    
                    if (part == "meta" || part == "my" || !part) throw "Module name [" + nsName + "] may not include a part called 'meta' or 'my' or empty part."
                    
                    var cur = (object == this.global ? this.global.meta.ns.container : object)[part]//object.meta.ns.getProperty(part)
                    
                    soFar.push(part)
                    var soFarName = soFar.join(".")
                    var needFinalize = false
                    var nsKeeper
                    
                    if (typeof cur == "undefined") {
                        if (isLast) {
                            nsKeeper = this.earlyCreate(soFarName, metaClass, props)
                            needFinalize = true
                        } else
                            nsKeeper = new Joose.Namespace.Keeper(soFarName).c
                        
                        if (object.meta) 
                            object.meta.ns.addProperty(nsKeeper.meta.localName, nsKeeper)
                        else
                            object[nsKeeper.meta.localName] = nsKeeper
                        
                        cur = nsKeeper
                    } else if (isLast && cur && cur.meta) {
                        //XXX needs cleanup and sanitizing
                        if (cur.meta.constructor == metaClass && extend)
                            cur.meta.extend(props)
                        else if (cur.meta instanceof Joose.Namespace.Keeper && metaClass != Joose.Namespace.Keeper) { 
                            cur.meta.plant(this.earlyCreate(soFarName, metaClass, props))
                            needFinalize = true
                        } 
                        else if (metaClass != Joose.Namespace.Keeper)
                            throw "Re-declaration of class " + soFarName + "with different meta is not allowed"
                    } else 
                        if (isLast && !(cur && cur.meta && cur.meta.meta && cur.meta.meta.hasAttribute('ns'))) throw "Trying to setup module " + soFarName + " failed. There is already something: " + cur
                    
                    if (needFinalize) cur.meta.construct(props)
                        
                    object = cur
                }
                
                return object
            }
            
        }
    }
    
}).c