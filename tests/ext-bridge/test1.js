Role('Joosificator', {
	before : {
		render : function(){
			this.title = 'Joosified! ' + this.title;
		}
	}
});

Ext.Window.meta.extend({
	does : [ Joosificator ]
});

Ext.onReady(function(){

	var win1 = new Ext.Window({
		title : 'Joose Bridge',
		width : 300,
		height : 300,
		x : 0
	});
	
	win1.show();
	
	Ext.Window.meta.extend({
		doesnt : [ Joosificator ]
	});
	
	
	var win2 = new Ext.Window({
		title : 'Joose Bridge',
		width : 300,
		height : 300,
		x : 400
	});
	
	win2.show();
});
