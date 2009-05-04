if(!window.console) {
    window.console = {
        log: function log (msg) {
            //$("#stateDialog").html(""+msg+"<br>"+$("#stateDialog").html())
        }
    }
}




Joose.Storage.Unpacker.patchJSON();

$(document).ready(function docReady () {
	
	document.title = "Loading...";
	
	initializeDialogs()

    $("#leftMenu h2").click(function () {
        $(this).parent().find('ul').toggle()
    })

    document.query   = new block.ui.Query();
    
    document.user    = new block.ui.User();

    document.manager = new block.ui.Manager();
    document.manager.setupShortcuts()

    document.grid = new block.ui.shape.Grid({ container: $("#grid") })
    document.grid.draw();
    
    $('.colorPicker').attachColorPicker();
    
    document.propPanel = new block.ui.shape.PropertiesPanel()
    document.propPanel.draw()
    
    $(window).resize(function onResize () {
        document.propPanel.redraw()
        document.grid.redraw()
    })
    $(window).scroll(function onScroll () {
        document.grid.redraw()
    })
    
    $("#share").focus(function () {
        this.select()
    })

    document.shapes = new block.ui.Container({ $: $('#shapeArea')});

    var doc         = new block.ui.Document({ body: document.shapes });
    
    document.sync   = new block.ui.Sync({ doc: doc })
    document.sync.update();
    
    document.sync.startListening()
    
    document.undo   = new block.ui.Undo();
    
    document.customShapes = new block.ui.CustomShapeManager();
    //document.customShapes.fetch("/static/custom-shapes/test.shape.json")

})

function initializeDialogs() {
	$("#stateDialog").dialog()
    $("#stateDialog").dialog("close")
    
    $('#welcomeDialog').dialog({
        height: "400px",
        width:  "500px"
    })
    $('#welcomeDialog').dialog("close")
    
    $('#loadDialog').dialog({
        height: "300px",
        width:  "400px"
    });
    $('#loadDialog').dialog("close")
}

function loadTemplate(url) {
    var template = new block.ui.Template({
        url: url
    })
    
    template.loadAndDraw()
}

function closeWelcomeDialog() {
    $('#welcomeDialog').dialog("close")
}

function showState() {

    var state = document.shapes.prettyPrint()

    $('#stateDialog textarea').val(state)
    $('#Dialog').dialog("open")
}

function showClipboardContent() {
    
    var val = document.manager.getTempStore() || "empty"
    
    $('#stateDialog textarea').val(val)
    $('#stateDialog').dialog("open")
}

function read() {
    $('#shapeArea').html("")
    var json        = document.getElementById("outputArea").value
    if(json != null && json != "") {
        document.shapes = JSON.parse(json);
        document.shapes.draw();
        document.shapes.redraw();
        
        document.sync.getDoc().setBody(document.shapes)
    }
}

function changeName() {
    var current = document.sync.getDoc().getHeader().getTitle()
    var name = prompt('Save as:', current);
    if(name) {
        document.sync.getDoc().getHeader().changeTitle(name)
        return true
    }
    return false
}

function write() {
    document.getElementById("outputArea").value = JSON.stringify(document.shapes)
}

function saveDocument() {
    if(changeName()) {
        document.user.saveCurrentDocument()
    }
}

function loadDocuments() {

    var list = $("#documentList");
    list.html("Loading...")
    
    $('#loadDialog').dialog("open")
    
    var html = "<table class=list>"
    html    += "<tr><th>Name</th><th>Last Update</th></tr>"
    
    document.user.loadDocuments(function (docs) {

        var count = 0;
        Joose.A.each(docs, function (doc) {
            html += "<tr class=listItem onclick=\"loadDocument('"+doc.hash.html()+"')\"><td>"+doc.name.html()+"</td><td>"+doc.lastUpdate.html()+"</td></tr>\n"    
            count++
        })
        
        if(count == 0) {
            html += "<tr><td colspan=2>You have not yet saved any documents.</td></tr>"
        }
        
        html +="</table>"
        
        list.html(html)
        
    })
}

function loadDocument(hash) {
    location.href = "/?id="+hash
}

function saveMessage(msg) {
    $('#saveMessage').html(msg)
}

function doInitialAction() {
    
    window.setTimeout(function () {document.propPanel.redraw()}, 1000) // Safari might have gotten the page height wrong before

    // Only load initial template or display welcome dialog im document is empty
    if(document.shapes.isEmpty()) {
        var template = document.query.param("template")
        if(template && template.length > 0) {
            loadTemplate(template)
        } else {
            $('#welcomeDialog').dialog("open")
        }
    }
    
    var action = document.query.param("action");
    
    if(action == "save") {
        saveDocument()
    }
    
    if(action == "open") {
        loadDocuments()
    }
}



