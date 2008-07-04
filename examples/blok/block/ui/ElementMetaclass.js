Module("block.ui", function (m) {
    Class("ElementMetaclass", {
        isa: Joose.Class,
        methods: {
            attributeMetaclass: function () {
                return m.ElementAttributeMetaclass
            }
        }
    });
    
    Class("ElementAttributeMetaclass", {
        isa: Joose.Attribute/*,
        
        after: {
            addSetter: function (classObject) {
                var name   = this.setterName();
                var getter = this.getterName();
                var before = function (newVal) {
                    if(this[getter]() != newVal) {
                        this.updated()
                    }
                }
                classObject.meta.wrapMethod(name, "before", before)
                
            }
        }*/
    })
})