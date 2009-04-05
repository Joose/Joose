Joose.DetachedClass = new Joose.MetaClass('Joose.DetachedClass', {
    
    isa                         : Joose.MetaClass,
    
    have : {
    	originalClass : null
    },
    
    stem : {
    	have : {
        	attributesMC         : Joose.Managed.RoleStem.Attributes
    	}
    }
    
}).c;