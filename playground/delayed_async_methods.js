

function Test () {
	
}

function log(msg) {
	console.log(msg)
}

Test.prototype = {
	foo: function () { log("foo") },
	bar: function () { log("bar") }
}

var t = new Test();

function Delay() {
	this.work = [];
}

Delay.prototype = {
	__addDelayer: function (name) {
		var delay = this;
		this[name] = function () {
			delay.work.push([name, arguments])
			return delay;
		}
	},
	__performOn: function (target) {
		var self = target;
		for(var i = 0; i < this.work.length; i++) {
			var work  = this.work[i];
			var name  = work[0];
			var paras = work[1];
			
			if(name) {
				self = self[name](paras);
			} else {
				self = self(paras)
			}
		}
	},
	__mockObject: function (obj) {
		for(var i in obj) {
			if(typeof obj[i] == "function") {
				this.__addDelayer(i)
			}
		}
	}
}

var delayedJQuery = function () {
	var delay = new Delay();
	delay.__mockObject(jQuery);
	delay.work.push([null, arguments])
	return delay;
};

delayedjQuery("#id").show().fadeOut().find("sadfasd").hide()