Module("JooseX.IDE", function () {
    Class("ClassBrowser", {
//        classMethods: {
//            test: function () { return "I am just a test" }
//        },
        methods: {
            
            $: function (id) {
                return document.getElementById(id)
            },
            
            initialize: function () {
                this.fillSelect(
                    this.moduleSelect(), 
                    this.getAllModules(),
                    true
                )
            },
	    
            getAllModules: function() {
                var allModules = [];
                function flattenNameSpaceTree(aNamespace) {
                if (aNamespace.meta instanceof Joose.Namespace.Keeper) {
                    allModules.push(aNamespace);
                    Joose.O.eachSafe(aNamespace.meta.ns.properties, 
                    function(prop, name) {
                        flattenNameSpaceTree(prop);
                    });
                }
                }
                Joose.O.eachSafe(__global__.properties, 
                function(property, name) {flattenNameSpaceTree(property)});
                return allModules;
            },
            
            getNames: function (array) {
                var names = [];
                Joose.A.each(array, function (ele) { names.push(ele.meta.getName()) });
                return names
            },
            
            fillSelect: function (select, array, useMeta) {
                
                select.innerHTML = ""
                
                var options = []
                
                Joose.O.each(array, function (thing) {
                    var option = document.createElement("option");
                    var name   = thing.name;
                    if(useMeta) {
                        name = thing.meta.name
                    }
                    option.innerHTML   = name
                    option.valueObject = thing
                    options.push(option)
                })
                Joose.A.each(options, function (option) { select.appendChild(option) })
            },
            
            clearSelect: function (select) {
                select.innerHTML = "";
            },
            
            selectedModule: function (select) {
                var module = this.selectedValueObject(select);
                this.fillSelect(this.classSelect(), this.getAllClasses(module), true)
                this.clearBody()
                this.clearSelect(this.categoriesSelect())
                this.clearSelect(this.elementsSelect())
            },
        
            getAllClasses: function(aModule) {
                var allClasses = [];
                Joose.O.eachSafe(aModule.meta.ns.properties, 
                    function(prop, name) {
                        if (prop.meta instanceof Joose.Proto.Class &&
                            !(prop.meta instanceof Joose.Namespace.Keeper)) {
                            allClasses.push(prop);
                        }
                    });
                return allClasses;
            },
            
            selectedClass: function (select) {
                var c = this.selectedValueObject(select);
                this.fillSelect(this.categoriesSelect(), [
                    {c: c, name: "Instance Methods"},
                    {c: c, name: "Attributes"},
                    {c: c, name: "Class Methods"},
                    {c: c, name: "Class Attributes"},
                ])
                
                var html = "<p><strong>"+c.meta.localName+"</strong></p>"
                html    += "<ul>"
                html    +=   "<li>Super Classes: "+c.meta.superClass+"</li>"
                html    +=   "<li>Roles: "+c.meta.getRoles()+"</li>"
                html    += "</ul>"
                
//                if(c.meta.renderHTML) {
//                    html += "<p>"+c.meta.renderHTML()+"</p>"
//                }
                
               this.$('JooseCBBody').innerHTML = html
            },
            
            clearBody: function () {
                this.$('JooseCBBody').innerHTML = ""
            },
            
            selectedCategory: function (select) {
                var cat = this.selectedValueObject(select);
                var c   = cat.c
                if(cat.name == "Instance Methods") {
                    this.fillSelect(this.elementsSelect(), c.meta.methods)
                }
                if(cat.name == "Class Methods" && c.my) {
                    this.fillSelect(this.elementsSelect(), c.my.meta.methods)
                }
                if(cat.name == "Attributes") {
                    this.fillSelect(this.elementsSelect(), c.meta.attributes)
                }
                if(cat.name == "Class Attributes" && c.my) {
                    this.fillSelect(this.elementsSelect(), c.my.meta.attributes)
                }
            },
            
            selectedElement: function (select) {
                var ele = this.selectedValueObject(select);
                var html = "";
                
                html += "<p><strong>"+ele.name+"</strong></p>"
                
                if(ele instanceof Joose.Managed.Property.MethodModifier) {
                    html += "<pre>"+ele.props.init.toString()+"</pre>"
                } 
                else if(ele instanceof Joose.Managed.Property.Attribute) {
                    html += "<ul>"
                    Joose.O.each(ele.props, function (value, name) {
                        html += "<li>"+name+": "+value+"</li>"
                    })
                    html += "</ul>"
                }
                
                
                this.$('JooseCBBody').innerHTML = html
            },
            
            selectedValueObject: function (select) {
                return select.options[select.selectedIndex].valueObject
            },
            
            elementsSelect: function () {
                return this.$('JooseCBElementsSelect')
            },
            
            categoriesSelect: function () {
                return this.$('JooseCBCategoriesSelect')
            },
            
            classSelect: function () {
                return this.$('JooseCBClassesSelect')
            },
            
            moduleSelect: function () {
                return this.$('JooseCBModulesSelect')
            }
        }
    })
})