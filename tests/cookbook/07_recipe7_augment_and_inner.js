plan(2)

Module("Page", function (m) {
    Class("Document", {
        has: {
            body: {
                is: rw,
                init: ""
            }
        },
        
        methods: {
            create: function () {
                this.openPage();
                this.INNER()
                this.closePage();
            },
            appendBody: function (appendage) {
                this.setBody(this.getBody() + appendage)
            },
            openPage:  function () { this.appendBody("<page>") },
            closePage: function () { this.appendBody("</page>")}
        }
    });
    
    Class("DocumentWithHeadersAndFooters", {
        isa: m.Document,
        
        augment: {
            create: function () {
                this.createHeader();
                this.INNER();
                this.createFooter();
            }
        },
        
        methods: {
            createHeader: function () { this.appendBody("<header/>") },
            createFooter: function () { this.appendBody("<footer/>") }
        }
        
    })
})

Class("TPSReport", {
    isa: Page.DocumentWithHeadersAndFooters,
    
    augment: {
        create: function () {
            this.createTPSReport()
        }
    },
    
    methods: {
        createTPSReport: function () {
            this.appendBody('<report type="tps"/>')
        }
    }
    
});

var tpsReport = new TPSReport();
isaOk(tpsReport, TPSReport);

tpsReport.create()

isEq(tpsReport.getBody(), '<page><header/><report type="tps"/><footer/></page>', "... got the right TPS report")

endTests()

