Joose.Kernel.Namespace.Manager = new Joose.Kernel.Class('Joose.Kernel.Namespace.Manager', {
    
    my : {
        
        have : {
            global : null
        },
        
        
        methods : {
            
            initialize : function(){
                var global = this.global = new Joose.Kernel.Namespace.Keeper('', {
                    constructor : function(){
                        throw "Global namespace cant be instantiated"
                    }
                }).c;
                
                
                global.meta.ns.container = Joose.top;
                global.meta.parent = global;
                
                global.meta.ns.addProperty('__global__', global.meta.ns);
                
                new Joose.Kernel.Namespace.Keeper("Joose", {
                    constructor : Joose
                });
                
                
                new Joose.Kernel.Namespace.Keeper("Joose.Kernel", {
                    constructor : Joose.Kernel
                });
                
                
                global.meta.ns.addProperty('Joose', Joose)
                
                Joose.meta.ns.addProperty('Kernel', Joose.Kernel);                
            },
            
            
            getCurrent: function (){
                var limit = 50;
                var msg = "getCurrent() failed with limit=" + limit;
                var cur = arguments.callee.caller;
                
                while (cur && limit) {
                    if (cur.__JOOSE_MODULE__) return cur.__JOOSE_MODULE__;
                    
                    //sometimes throws an exception (seems when called from DOM event callback)
                    try {
                        cur = cur.CALLER || cur.caller;
                    } catch (e) {
                        cur = null
                    }
                    limit--;
                }
                
                //cur == null - we have reached the outer space )
                if (limit) return this.global;
                
                throw msg;
            },
            
            
            //this function establishing the full "namespace chain" (including the last element)
            prepare : function (nsName) {
                var parts   = nsName.split(".");
                if (parts.length && !parts[0]) parts.shift();
                
                if (!parts.length) throw "Cant prepare namespace with empty name = [" + nsName + "]"; 
                
                var object  = this.getCurrent();
                var soFar   = object.meta.name.split(".");
                //workaround for "When the string is empty, split returns an array containing one empty string, rather than an empty array."
                if (soFar.length && !soFar[0]) soFar.shift();
                
                for(var i = 0; i < parts.length; i++) {
                    var part = parts[i];
                    
                    if(part == "meta" || part == "my" || !part) throw "Module name [" + nsName + "] may not include a part called 'meta' or 'my' or empty part."
                    
                    soFar.push(part)
                    var name = soFar.join(".")
                    
                    var cur = object.meta.ns.getProperty(part);
                    if(typeof cur == "undefined") {
                        var nsKeeper = new Joose.Kernel.Namespace.Keeper(name).c;
                        object.meta.ns.addProperty(nsKeeper.meta.localName, nsKeeper);
                        cur = nsKeeper;
                    } else {
                        if(!(cur && cur.meta && cur.meta.meta && cur.meta.meta.hasAttribute('ns'))) {
                            throw "Trying to setup module "+name+" failed. There is already something: "+cur
                        }
                    }
                    object = cur;
                }
                
                return object
            },
            
            
            executeIn : function (ns, func, scope, argsArray) {
                var namespaceKeeper = function (func, ns) {
                    arguments.callee.__JOOSE_MODULE__ = ns;
                    return func.apply(scope || this, argsArray || []);
                };
                
                return namespaceKeeper(func, ns)
            },
            
            
            create : function (name, props, metaClass){
                var keeper = this.prepare(name);
                
                if (keeper.meta.meta.hasMethod('plant'))
                    keeper.meta.plant(new metaClass(name, props).c);
                else
                    throw "Double declaration of class is not allowed, use 'Class.meta.extend' instead";
            }
            
        }
    }
    
}).c;