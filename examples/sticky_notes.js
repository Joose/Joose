function log(msg) {
    if(window.console) {
        console.log(msg)
    }
}

$(document).ready(function () {
ORM.openDatabase('JooseStickyNotes7', "1.0", "Test-DB", 200000);

ORM.transaction(function() {
    ORM.executeSql("CREATE TABLE if not exists sticky_note (noteText TEXT, timestamp REAL, left TEXT, top TEXT, zindex REAL);");
});

ORM.transaction(function () {

    JooseX.DOMBinding.JQueryMetaRole.meta.apply(ORM.EntityMetaClass);
    
    var notes = [];

    Class("Note", {
        isa:  ORM.Entity,
        does: [JooseX.DOMBinding.JQuery],
        
        tableName: "sticky_note",
        
        methods: {
            create: function () {
                var me   = this;
                var note = jQuery('<div class=note><div class=closebutton></div><textarea></textarea><div class=timestamp></div></div>');
                note.draggable({
                    //drag: onDrag,
                    stop: function () { me.notify("custom:dragcomplete") }
                });
                
                note.find(".closebutton").click(function () {
                    ORM.transaction(function () {
                        me.destroy()
                        me.$.fadeOut()
                    })
                })
                
                return note
            },
            
            
            // overrides default notify
            notify: function () {
                var me = this;
                ORM.transaction(function () {
                    me.save();
                })
            },
            
            show: function () {
                this.$.fadeIn()
            }
        },
        
        bind: {
            noteText: {
                selector: "textarea",
                notifyOn: ["keyup"]
            },
            timestamp: {
                selector: ".timestamp",
                accessor: "html"
            },
            left: {
                accessor: "css",
                args:     ["left"]
            },
            top: {
                accessor: "css",
                args:      ["top"]
            },
            zindex: {
                accessor: "css",
                args:      ["zIndex"]
            }
        },
        
        after: {
            initialize: function () {
                notes.push(this)
            }
        }
    })
})


window.newNote = function () {
    var note = new Note();
    note.show();
}

window.onORMLoaded = function () {
    ORM.transaction(function () {
        Note.selectAll().draw().redraw().show()
    })
}
})