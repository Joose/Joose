Class("Joose.TypeCoercion", {
    has: {
        _from: {
            isa: Joose.TypeConstraint,
            is:  "rw"
        },
        _via: {
            is: "rw"
        }
    },
    
    methods: {
        coerce: function (value) {
            if(this._from.validateBool(value)) {
                return this._via(value)
            }
            return null
        }
    }
})