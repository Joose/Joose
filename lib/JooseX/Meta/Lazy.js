Role('JooseX.Meta.Lazy', {
	
	have : {
		underConstruction : false,
		
		pendedProps : null
	},
	
	
	methods : {
		
        construct : function () {
        	if (!this.underConstruction) return;
        	
        	if (!(this instanceof Joose.Managed.Role)) {
	        	var superMeta = this.superClass.meta;
	        	
	        	if (superMeta.meta.hasAttribute('underConstruction') && superMeta.underConstruction) superMeta.construct();
        	}
        	
        	var pendedProps = this.pendedProps;
        	
        	delete this.pendedProps;
        	this.underConstruction = false;
        	
        	this.extend(pendedProps);
        	
        	this.stem.close();
        }
		
	},
	
	
	override : {
		
        defaultConstructor: function () {
        	var originalConstructor = this.SUPER();
        	
            return function defaultConstructor() {
                var thisMeta = this.meta;
                
                if (thisMeta.meta.hasAttribute('underConstruction') && thisMeta.underConstruction) thisMeta.construct();
                
                originalConstructor.apply(this, arguments);
            };
        },
        
        
        initialize : function (name, props) {
        	this.underConstruction = true;
        	
        	this.SUPER(name, props);
        },
        
        
        processStem : function () {
        	this.SUPER();
        	
			this.stem.opened = 2;
        },
        
        
        extend : function (props) {
        	if (this.underConstruction) {
        		
        		if (!this.pendedProps) { 
	        		if (!Joose.O.isEmpty(props)) this.pendedProps = props;
	        		return
	        	} else
	        		this.construct();
        	}
        	
        	this.SUPER(props);
        }
		
	},
	
	
	before : {
		
	    addRole : function(){
	        Joose.A.each(arguments, function(arg){
	            var role = (arg.meta instanceof Joose.Managed.Role) ? arg : arg.role;
	            
                var roleMeta = role.meta;
                
                if (roleMeta.meta.hasAttribute('underConstruction') && roleMeta.underConstruction) roleMeta.construct();
	        })
	    }
		
	}
	
});