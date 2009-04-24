Role('JooseX.Namespace.Depended.Transport.ScriptTag', {

    requires : [ 'handleLoad' ],
    
    override : {
        
        load: function (url, onready, onerror) {
            var loaderNode = document.createElement("script");
            
            loaderNode.onload = loaderNode.onreadystatechange = function() {
                if (!loaderNode.readyState || loaderNode.readyState == "loaded" || loaderNode.readyState == "complete" || loaderNode.readyState == 4 && loaderNode.status == 200) {
                    //surely for IE6..
                    setTimeout(onready, 1);
                }
            };
            
            loaderNode.setAttribute("type", "text/javascript");
            loaderNode.setAttribute("src", url);
            document.getElementsByTagName("head")[0].appendChild(loaderNode);
        }
        
    }
    
});

//Joose.Meta.Class.meta.extend({
//    does                        : [ JooseX.Namespace.Depended.Transport.AjaxAsync ]
//});
//
//
//Joose.Meta.Role.meta.extend({
//    does                        : [ JooseX.Namespace.Depended.Transport.AjaxAsync ]
//});
