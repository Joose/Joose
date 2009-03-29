Joose.Kernel.ProtoRole.create('Joose.Kernel.MetaClass.Depended.Transport.AjaxSync', {
    
    requires : [ 'handleLoad' ],
    
    methods : {
        
        load: function (url, onready, onerror) {
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
    
});

//Joose.Kernel.MetaClass.Depended.Transport.AjaxSync.meta.applyToClass(Joose.Kernel.MetaClass);
//Joose.Kernel.MetaClass.Depended.Transport.AjaxSync.meta.applyToClass(Joose.NamespaceKeeper);
//Joose.Kernel.MetaClass.Depended.Transport.AjaxSync.meta.applyToClass(Joose.Kernel.ProtoRole);