Module("block.ui", function () {
    Class("Array", {
        has: {
            array: {
                is: "rw",
                init: function () { return [] }
            }
        },
        methods: {
            initialize: function (array) {
                this.array = array
            },
            each: function (func) {
                var a = this.array
                for(var i = 0, len = a.length; i < len; i++) {
                    func.call(this, a[i])
                }
            },
            call: function (method, paras) {
                this.each(function (ele) {
                    ele[method].apply(ele, paras)
                })
            }
        }
    })
})

function $A(array) {
    return new block.ui.Array(array)
}