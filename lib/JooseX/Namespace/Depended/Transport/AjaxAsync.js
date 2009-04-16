Role('JooseX.Namespace.Depended.Transport.AjaxAsync', {
    
    requires : [ 'handleLoad' ],
    
    override : {
        
        load: function (url, onready, onerror) {
            var req = new JooseX.SimpleRequest();
            
            try {
                req.getText(url, true, function(success, text){
                    if (!success) { onerror(); return }
                    
                    eval(text);
                    
                    onready();
                });
            } catch (e) {
                onerror();
            }
        }
        
    }
    
});


Joose.Meta.Class.meta.extend({
    does                        : [ JooseX.Namespace.Depended, JooseX.Namespace.Depended.Transport.AjaxAsync ]
});


Joose.Meta.Role.meta.extend({
    does                        : [ JooseX.Namespace.Depended, JooseX.Namespace.Depended.Transport.AjaxAsync ]
});
