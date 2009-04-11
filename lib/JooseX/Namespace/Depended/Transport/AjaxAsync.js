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


Joose.MetaClass.meta.extend({
    does                        : [ JooseX.Namespace.Depended.Transport.AjaxAsync ]
});


Joose.MetaRole.meta.extend({
    does                        : [ JooseX.Namespace.Depended.Transport.AjaxAsync ]
});
