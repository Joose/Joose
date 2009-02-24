Joose.Kernel.MetaClass.transports = {
    
    script: function (url, onready, onerror) {
        var loaderNode = document.createElement("script");
        
        loaderNode.onload = loaderNode.onreadystatechange = function() {
            if (!loaderNode.readyState || loaderNode.readyState == "loaded" || loaderNode.readyState == "complete" || loaderNode.readyState == 4 && loaderNode.status == 200) {
                //surely for IE6..
                setTimeout(function(){ onready() }, 1);
            }
        };
        
        loaderNode.setAttribute("type", "text/javascript");
        loaderNode.setAttribute("src", url);
        document.getElementsByTagName("head")[0].appendChild(loaderNode);
    },
    
    
    ajaxAsync: function (url, onready, onerror) {
        var req = new Joose.SimpleRequest();
        
        try {
            req.getText(url, true, function(success, text){
                if (!success) { onerror(); return }
                
                eval(text);
                
                onready();
            });
        } catch (e) {
            onerror();
        }
    },
    
    
    ajaxSync: function (url, onready, onerror) {
        var req = new Joose.SimpleRequest();
        var text; 
        
        try {
            text = req.getText(url);
        } catch (e) {
            onerror();
            return;
        }
        
        eval(text);
        onready();
    }
    
}
