Role('Joosificator', {
	before : {
		render : function(){
			this.title = 'Joosified! ' + this.title;
		}
	}
});


ExtClass('ExtX.Panel', {
	
	isa : Ext.Panel,
	
	does : [ Joosificator ],
	
	before : {
		initComponent : function () {
			Ext.apply(this, {
				height : 300,
				layout : 'column',
				header : true,
				title : 'Test panel',
				
				items : [
					{
						width : 200,
						html : 'yo1'
					},
					{
						width : 200,
						html : 'yo2'
					}
				]
			});
		}
	}
	
});


Ext.onReady(function(){

	var p = new ExtX.Panel({
		
		applyTo : Ext.getBody()
		
	});
	
	
});
