Module("Japache", function () {
    
    Class("ExampleApp", {
        
        methods: {
            handleRequest: function (request) {
                
                var count = parseInt(request.data.count, 10) * 2
                
                return { count: count }
        
            }
        }
        
    })
})