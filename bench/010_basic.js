StartBenchmark(
    {
        title       : 'Simple class creation time',
        id          : 'class-creation-simple',
        
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
        id          : 'class-instantiation-simple',
        
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
