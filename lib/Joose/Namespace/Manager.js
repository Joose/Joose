Joose.Namespace.Manager = new Joose.Managed.Class('Joose.Namespace.Manager', {
    
    have : {
        global      : null,
        globalNs    : null,
        
        current     : null
    },
    
    
    methods : {
        
        initialize : function () {
            var global = this.global = new Joose.Namespace.Keeper('').c
            
            var globalNs = this.globalNs = global.meta.ns
            
            globalNs.container      = Joose.top
            global.meta.parentNs    = global
            
            this.current = [ global ]
        },
        
        
        getCurrent: function () {
            return this.current[0]
        },
        
        
        executeIn : function (ns, func) {
            var current = this.current
            
            var scope = ns.meta.ns ? ns.meta.ns.container : ns
            
            current.unshift(ns)
            var res = func.apply(scope, [ ns ])
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
            
            earlyProps.traits = props.traits
            delete props.traits
            
            return new metaClass(name, earlyProps).c
        },
        
        
        //this function establishing the full "namespace chain" (including the last element)
        create : function (nsName, metaClass, extend) {
            //if no name provided, then we creating an anonymous class, so just skip all the namespace manipulations
            if (!nsName) return new metaClass(nsName, extend).c
            
            props = extend || {}
            
            var parts = Joose.S.saneSplit(nsName, '.')
            var object  = this.getCurrent()
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
        },
        
        
        
        //this function establishing the full "namespace chain" (including the last element)
        prepareNamespace : function (nsName) {
            
            var parts = Joose.S.saneSplit(nsName, '.')
            var object  = this.getCurrent()
            var soFar   = Joose.S.saneSplit(object.meta.name, '.')
            
            for(var i = 0; i < parts.length; i++) {
                var part = parts[i]
                
                if (part == "meta" || part == "my" || !part) throw "Module name [" + nsName + "] may not include a part called 'meta' or 'my' or empty part."
                
                var cur = (object == this.global ? this.global.meta.ns.container : object)[part]
                
                soFar.push(part)
                
                if (cur === undefined) {
                    var nsKeeper = new Joose.Namespace.Keeper(soFar.join(".")).c
                    
                    var objectMeta = object.meta
                    
                    if (objectMeta && objectMeta.ns) 
                        objectMeta.ns.addProperty(part, nsKeeper)
                    else
                        object[part] = nsKeeper
                    
                    cur = nsKeeper
                }
                    
                object = cur
            }
            
            if (!(object && object.meta && object.meta.ns)) throw "Trying to setup module " + soFarName + " failed. There is already something: " + object
            
            return object
        },
        
        
        prepareArguments : function (name, props) {
            if (typeof name != 'string') {
                props = name
                name = null
            }
            
            var meta
            
            if (props && props.meta) {
                meta = props.meta
                delete props.meta
            }
            
            return {
                name : name,
                meta : meta,
                props : props
            }
        },
        
        
        getDefaultHelperFor : function (metaClass) {
            return function (name, props) {
                var args = Joose.Namespace.Manager.my.prepareArguments(name, props)
                
                args.meta = args.meta || metaClass
                
                return Joose.Namespace.Manager.my.create(args.name, args.meta, args.props)
            }
        },
        
        
        register : function (helperName, metaClass, func) {
            
            if (this.meta.hasMethod(helperName))
                this.global.meta.ns.addProperty(helperName, function () {
                    return Joose.Namespace.Manager.my[helperName].apply(Joose.Namespace.Manager.my, arguments)
                })
            else {
                var methods = {}
                
                methods[helperName] = func || this.getDefaultHelperFor(metaClass)
                
                this.meta.extend({
                    methods : methods
                })
                
                this.register(helperName)
            }
        },
        
        
        Class : function (name, props) {
            var args = this.prepareArguments(name, props)
            
            if (!args.meta)
                if (props && typeof props.isa == 'function')
//                    if (props.isa.meta.isDetached())
//                        args.meta = props.isa.meta.meta.originalClass
//                    else
                        args.meta = props.isa.meta.constructor
                else
                    args.meta = Joose.Meta.Class
                    
            //to allow delayed meta declaration in nested classes
            //if not a class
            if (!args.meta.meta) args.meta = args.meta()
            
            return Joose.Namespace.Manager.my.create(args.name, args.meta, args.props)
        },
        
        
        Module : function (name, props) {
            if (typeof props == 'function') props = { body : props }    
            
            return Joose.Namespace.Manager.my.create(name, Joose.Namespace.Keeper, props)
        }
        
        
        
    }
    
}).c

Joose.Namespace.Manager.my = new Joose.Namespace.Manager()

Joose.Namespace.Manager.my.register('Class')
Joose.Namespace.Manager.my.register('Role', Joose.Meta.Role)
Joose.Namespace.Manager.my.register('Module')