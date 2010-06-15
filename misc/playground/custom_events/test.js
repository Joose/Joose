Module("customEvent.dsl", function (m) {
	Class("CustomEvent", {
		isa: Joose.Class,
		
		methods: {
			buildComplete: function () {
				var c = this.getClassObject();
				
				// Add an attribute called $ to the class.
				// this should
				c.addAttribute("$", {
					required: true
				});
			}
		}
	})
})

Module("Test", function (m) {
	Class("TestObserver", {
		meta: CustomEvent,
		
		condition: function (e) {
			return e.target.checked
		},
		
		baseEvent: "change",
		
		events: {
			"selected:choice": function () {
				
			}
		}
	})
	
	Class("SelectedChoice", {
		
		has: {
			baseEvent: {
				init: "change",
				is: "rw"
			},
			action: {
				is: "rw"
			}
		},
		
		methods: {
			
			condition: function (e) {
				return e.target.checked
			},
			
			on: function () {
				alert("Fire")
			}
		}
	})
})