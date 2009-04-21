Role('Joosificator', {
	before : {
		render : function(){
			this.title = 'Joosified! ' + this.title;
		}
	}
});

ExtClass('myWindow', {
	isa : Ext.Window,
	
	does : [ Joosificator ]
});

Ext.onReady(function(){

	var win1 = new myWindow({
		title : 'Joose Bridge',
		width : 300,
		height : 300
	});
	
	win1.show();
	
	myWindow.meta.extend({
		doesnt : [ Joosificator ]
	});
	
	
	var win2 = new myWindow({
		title : 'Joose Bridge',
		width : 300,
		height : 300
	});
	
	win2.show();
});
