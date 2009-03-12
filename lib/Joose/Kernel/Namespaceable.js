Joose.Kernel.Namespaceable = new Joose.Managed.Role('Joose.Kernel.Namespaceable', {

    require : [ 'adoptConstructor' ],
    
    have : {
        parent                  : null,
        
        localName               : null,
        
        nameSpace               : null
    },
    
    
    after: {
        initialize: function () {
            this.localName = this.name.split(".").pop();
            
            this.nameSpace = new Joose.Kernel.Namespace(this.name, { targetClass : this.c });
        }
    },
    
    
    methods : {
        
        getCurrentNamespace: function (){
            var limit = 50;
            var msg = "getCurrentNamespace() failed with limit=" + limit;
            var cur = arguments.callee.caller;
            
            while (cur && limit) {
                if (cur.__JOOSE_MODULE__) return cur.__JOOSE_MODULE__;
                
                //sometimes throws an exception (seems when called from DOM event callback)
                try {
                    cur = cur.caller;
                } catch (e) {
                    cur = null
                }
                limit--;
            }
            
            //cur == null - we have reached the outer space )
            if (limit) return __global__;
            
            throw msg;
        },
        
        
        //this function establishing the full "namespace chain" (including the last element)
        prepareNamespace: function (name) {
            var parts   = name.split(".");
            if (parts.length && !parts[0]) parts.shift();
            
            if (!parts.length) throw "Cant prepare namespace with empty name = [" + name + "]"; 
            
            var object  = this.getCurrentNamespace();
            var soFar   = object.meta.getName().split(".");
            //workaround for "When the string is empty, split returns an array containing one empty string, rather than an empty array."
            if (soFar.length && !soFar[0]) soFar.shift();
            
            for(var i = 0; i < parts.length; i++) {
                var part = parts[i];
                
                if(part == "meta") throw "Module names may not include a part called 'meta'."
                if(!part) throw "Module names may not include an empty part."
                
                soFar.push(part)
                var name = soFar.join(".")
                
                var cur = object.meta.nameSpace.getProperty(part);
                if(typeof cur == "undefined") {
                    var nsKeeper = new Joose.Kernel.NamespaceKeeper(name).c;
                    object.meta.addElement(nsKeeper.meta.localName, nsKeeper);
                    cur = nsKeeper;
                } else {
                    if(!(cur && cur.meta && cur.meta.meta && cur.meta.meta.hasAttribute('nameSpace'))) {
                        throw "Trying to setup module "+name+" failed. There is already something: "+cur
                    }
                }
                object = cur;
            }
            
            return object
        },
        
        
//        create: function (name, props){
//            //last element in namespace chain
//            var element = Joose.Kernel.ProtoModule.prepareNamespace(name)
//
//            element.meta.initializeFromProps(props)
//            
//            return element;
//        },
        
        
        executeInNamespace: function (nameSpace, func, scope, argsArray) {
            var namespaceKeeper = function (func, nameSpace) {
                arguments.callee.__JOOSE_MODULE__ = nameSpace;
                return func.apply(scope || this, argsArray || []);
            };
            
            return namespaceKeeper(func, nameSpace)
        },
     
        
        copyInternalState : function(target) {
            target.parent               = this.parent;
            target.nameSpace            = this.nameSpace;
        }
        
        
//        handlePropbody: function (bodyFunc) {
//            if (bodyFunc) Joose.Kernel.ProtoModule.executeInNamespace(this.c, bodyFunc, this.container, [this.c]);
//        },
//        
//
//        handlePropversion: function (version) {
//            throw "Probably you need to include Depended Role into your deployment";
//        },
//        
//        
//        handlePropuse: function (dependenciesInfo, props) {
//            throw "Probably you need to include Depended Role into your deployment";
//        }
        
    }

    
}).c;
