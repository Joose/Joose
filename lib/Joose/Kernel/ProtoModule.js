var protoModuleMeta = new Joose.Kernel.Roles('Joose.Kernel.ProtoModule');

protoModuleMeta.initializeFromProps({
    
    isa: Joose.Kernel.Roles,
    
    has: {
        parent: {},
        
        localName: {},
        
        //object with references to namespace elements
        namespaceElements: {},
        
        //place where the namespace elements are stored. Generally its a "this.c" function (getClassObject()), but for global module it will be a joose.top
        container: {}
    },
    
    after: {
        initialize: function (name, c) {
            this.namespaceElements = {};
            this.localName = this._name.split(".").pop();
            this.container = this.c;
        }
    },
    
    
    classMethods: {
        
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
                
                var cur = object.meta.container[part];
                if(typeof cur == "undefined") {
                    var nsKeeper = new Joose.Kernel.NamespaceKeeper(name).getClassObject();
                    object.meta.addElement(nsKeeper.meta.localName, nsKeeper);
                } else {
                    if(!(cur && cur.meta && cur.meta.meta && cur.meta.meta.isa(Joose.Kernel.ProtoModule))) {
                        throw "Trying to setup module "+name+" failed. There is already something: "+cur
                    }
                }
                object = object.meta.container[part];
            }
            
            return object
        },
        
        
        create: function (name, props){
            //last element in namespace chain
            var element = Joose.Kernel.ProtoModule.prepareNamespace(name)

            element.meta.initializeFromProps(props)
            
            return element;
        },
        
        
        executeInNamespace: function (nameSpace, func, scope, argsArray) {
            var namespaceKeeper = function (func, nameSpace) {
                arguments.callee.__JOOSE_MODULE__ = nameSpace;
                return func.apply(scope || this, argsArray || []);
            };
            
            return namespaceKeeper(func, nameSpace)
        }
        
        
    },
    
    
    before: {
        addClassMethod: function (name, func) {
            if (this.hasElement(name)) throw "Collision between existing namespace element [" + this.namespaceElements[name] + "] and a new classMethod [" + name + "]";
        }
    },
    
    
    methods: {
        
        handlePropbody: function (bodyFunc) {
            if (bodyFunc) Joose.Kernel.ProtoModule.executeInNamespace(this.c, bodyFunc, this.container, [this.c]);
        },
        

        handlePropversion: function (version) {
            throw "Probably you need to include Depended Role into your deployment";
        },
        
        
        handlePropuse: function (dependenciesInfo, props) {
            throw "Probably you need to include Depended Role into your deployment";
        },
        
        
        dependsFrom: function (module) {
            //quick scan
            for (var name in this.dependencies)
                if (this.dependencies.hasOwnProperty(name)) {
                    if (this.dependencies[name].Module == module) return true    
                }
                
            //in-depth scan                
            for (name in this.dependencies)
                if (this.dependencies.hasOwnProperty(name)) {
                    if (this.dependencies[name].Module.meta.dependsFrom(module)) return true    
                }
            
            return false;
        },
        
        
        alias: function (destination) {
            for (var i in this.namespaceElements) {
                if (this.namespaceElements.hasOwnProperty(i)) {
                    if (destination[i] && destination[i] != this.namespaceElements[i]) throw "Aliasing of " + this._name + " to " + destination + " failed, there is already something: " + destination[i];
                    destination[i] = this.namespaceElements[i];
                }
            }
            
            return this;
        },
        
        
        hasElement: function (name) {
            return this.namespaceElements.hasOwnProperty(name) && Boolean(this.namespaceElements[name]);
        },
        
        
        getElement: function(name) {
            //not IE
            if (typeof this.container.hasOwnProperty == 'function') {
                return this.container.hasOwnProperty(name) && this.container[name] || null;
            }
            
            //window in IE has no hasOwnProperty
            return this.container[name]
        },
        
        
        addElement: function (localName, ele) {
            if (this.classCan(localName)) throw "Collision between existing classMethod [" + localName + "] of " + this + " and a new namespace element [" + ele + "]";
            if (this.hasElement(localName)) throw "Adding namespace element failed: namespace element [" + localName + "] already exists in the [" + this._name + "]";
            
            this.namespaceElements[localName] = ele;
            this.container[localName] = ele;
            
            if (ele && ele.meta) ele.meta.parent = this.c;
        },
        
        
        removeElement: function (localName) {
            var ele = this.namespaceElements[localName];
            delete ele.parent;
            
            delete this.namespaceElements[localName];
            try {
                delete this.container[localName];
            } catch (e) {
                //IE messing
                this.container[localName] = undefined;
            }
            
            return ele;
        },
        
        
        getElementNames: function () {
            var names = [];
            Joose.O.eachSafe(this.namespaceElements, function (value, prop) { names.push(prop) });
            return names
        }
    }
});

    
Joose.Kernel.ProtoModule = protoModuleMeta.getClassObject();