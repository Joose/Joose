Role('JooseX.Namespace.Depended.Transport.AjaxSync', {
    
    requires : [ 'handleLoad' ],
    
    override : {
        
        load: function (url, onready, onerror) {
            var req = new JooseX.SimpleRequest();
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
    
});

//Joose.MetaClass.meta.extend({
//    does                        : [ JooseX.Namespace.Depended.Transport.AjaxAsync ]
//});
//
//
//Joose.MetaRole.meta.extend({
//    does                        : [ JooseX.Namespace.Depended.Transport.AjaxAsync ]
//});
