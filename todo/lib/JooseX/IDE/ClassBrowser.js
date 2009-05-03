Module("JooseX.IDE", function () {
    Class("ClassBrowser", {
        classMethods: {
            test: function () { return "I am just a test" }
        },
        methods: {
            
            $: function (id) {
                return document.getElementById(id)
            },
            
            initialize: function () {
                this.fillSelect(
                    this.moduleSelect(), 
                    Joose.A.grep(Joose.Module.getAllModules(), function (m) { return !m.meta.isEmpty() }),
                    true
                )
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
                    if(thing.getName) {
                        name = thing.getName()
                    }
                    if(useMeta) {
                        name = thing.meta.getName()
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
                this.fillSelect(this.classSelect(), module.meta.getElements(), true)
                this.clearBody()
                this.clearSelect(this.categoriesSelect())
                this.clearSelect(this.elementsSelect())
            },
            
            selectedClass: function (select) {
                var c = this.selectedValueObject(select);
                this.fillSelect(this.categoriesSelect(), [
                    {c: c, name: "Instance Methods"},
                    {c: c, name: "Class Methods"},
                    {c: c, name: "Attributes"}
                ])
                
                var html = "<p><strong>"+c.meta.className()+"</strong></p>"
                html    += "<ul>"
                html    +=   "<li>Super Classes: "+c.meta.getSuperClasses()+"</li>"
                html    +=   "<li>Roles: "+c.meta.getRoles()+"</li>"
                html    += "</ul>"
                
                if(c.meta.renderHTML) {
                    html += "<p>"+c.meta.renderHTML()+"</p>"
                }
                
               this.$('JooseCBBody').innerHTML = html
            },
            
            clearBody: function () {
                this.$('JooseCBBody').innerHTML = ""
            },
            
            selectedCategory: function (select) {
                var cat = this.selectedValueObject(select);
                var c   = cat.c
                if(cat.name == "Instance Methods") {
                    this.fillSelect(this.elementsSelect(), c.meta.getInstanceMethods())
                }
                if(cat.name == "Class Methods") {
                    this.fillSelect(this.elementsSelect(), c.meta.getClassMethods())
                }
                if(cat.name == "Attributes") {
                    this.fillSelect(this.elementsSelect(), c.meta.getAttributes())
                }
            },
            
            selectedElement: function (select) {
                var ele = this.selectedValueObject(select);
                var html = "";
                
                html += "<p><strong>"+ele.getName()+"</strong></p>"
                
                if(ele.meta.isa(Joose.Method)) {
                    html += "<pre>"+ele.getBody().toString()+"</pre>"
                } 
                else if(ele.meta.isa(Joose.Attribute)) {
                    html += "<ul>"
                    Joose.O.each(ele.getProps(), function (value, name) {
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