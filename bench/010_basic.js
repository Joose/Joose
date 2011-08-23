StartBenchmark(
    {
        title       : 'Class creation time',
        
        run         : function () {
            return Class({
                
                has : {
                    foo     : Joose.I.Array,
                    bar     : Joose.I.Object
                },
                
                methods : {
                    
                    doThis : function () {},
                    doThat : function () {}
                }
            })
        }
    
    }, 
    {
        title       : 'Class instantiation time',
        
        prepare     : function () {
            return {
                cls     : Class({
                    
                    has : {
                        foo     : Joose.I.Array,
                        bar     : Joose.I.Object
                    },
                    
                    methods : {
                        
                        doThis : function () {},
                        doThat : function () {}
                    }
                })
            }
        },
        
        run         : function (measurement, prepared) {
            return new prepared.cls()
        }
    }
)    
