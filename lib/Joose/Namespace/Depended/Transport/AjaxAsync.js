Joose.Kernel.ProtoRole.create('Joose.Kernel.MetaClass.Depended.Transport.AjaxAsync', {
    
    requires : [ 'handleLoad' ],
    
    methods : {
        
        load: function (url, onready, onerror) {
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
        }
        
    }
    
});

Joose.Kernel.MetaClass.Depended.Transport.AjaxAsync.meta.applyToClass(Joose.Kernel.MetaClass);
Joose.Kernel.MetaClass.Depended.Transport.AjaxAsync.meta.applyToClass(Joose.NamespaceKeeper);
Joose.Kernel.MetaClass.Depended.Transport.AjaxAsync.meta.applyToClass(Joose.Kernel.ProtoRole);
