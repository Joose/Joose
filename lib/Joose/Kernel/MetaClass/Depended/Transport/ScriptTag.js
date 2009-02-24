Joose.Kernel.ProtoRole.create('Joose.Kernel.MetaClass.Depended.Transport.ScriptTag', {
    
    requires : [ 'handleLoad', 'onLoad' ],
    
    methods : {
        
        load: function (url, onready, onerror) {
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
        }
        
    }
    
});