


Class("Currency", {
    does: Eq,
    has:  ["value", {is: rw}],
    methods: {
        initialize: function (value) {
            this.setValue(value)
        },
    
        isEqual: function (cur) {
            return this.getValue() == cur.getValue()
        }
    }
})



