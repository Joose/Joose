(function (Class) {
    
Class("Joose.ClassMethod", {
    isa: Joose.Method,
    after: {
        initialize: function () {
            this._isClassMethod = true
        }
    },
    methods: {
        addToClass: function (c) {
            c[this.getName()] = this.asFunction()
        },
        
        copy: function () {
            return new Joose.ClassMethod(this.getName(), this.getBody(), this.getProps())
        }
    }
})

Joose.bootstrapCompletedClassMethod()

})(JooseClass);
