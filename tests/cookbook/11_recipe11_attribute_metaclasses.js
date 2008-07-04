plan(1)

Module("MyApp.Meta.Attribute", function () {
    Class("Labeled", {
        isa: Joose.Attribute,
        has: {
            label: {
                is: rw,
                predicate: "hasLabel"
            }
        },
        
        after: {
            handleProps: function () {
                this.handleLabel()
            }
        },
        
        methods: {
            handleLabel: function () {
                var props = this.getProps();
                
                if(props.label != null) {
                    this.setLabel(props.label)
                }
            }
        }
    })
});

Module("MyApp", function () {
    Class("Website", {
        has: {
            url: {
                metaclass: MyApp.Meta.Attribute.Labeled,
                is: rw,
                label: "The site's URL"
            },
            name: {
                is: rw
            }
        },
        methods: {
            dump: function () {
                var dumpValue = "";
                
                var attributes = this.meta.getAttributes();
                
                var me = this;
                
                Joose.O.each(attributes, function (attribute, name) {
                    if(attribute.meta.isa(MyApp.Meta.Attribute.Labeled) && attribute.hasLabel()) {
                        dumpValue += attribute.getLabel()
                    } else {
                        dumpValue += name;
                    }
                    
                    var getter = attribute.getterName();
                    dumpValue += ": " + me[getter]()+"; "
                })
                
                return dumpValue
                
            }
        }
    })
})

var app = new MyApp.Website({ url: "http://www.google.com", name: "Google" });

isEq(app.dump(), "The site's URL: http://www.google.com; name: Google; ", "Dump is correct")
endTests()

