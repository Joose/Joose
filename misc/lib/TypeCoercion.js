(function (Class, Type) {

//TODO this is a hack to fix the conflict between 
//type constraints and isa object constraints. It 
//probably needs  more elegant solution.
Type('CoercionFrom', {
    where: function(o) {
        if ( o.meta && o.meta.isa(Joose.TypeConstraint) ) {
            return true;
        }
        return false;
    }
});

Class("Joose.TypeCoercion", {
    has: {
        _from: {
            isa: TYPE.CoercionFrom,
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

})(JooseClass, JooseType);
