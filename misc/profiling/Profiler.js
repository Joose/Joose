

Profiler = function (job, desc) {
	this.job         = job;
	this.description = desc;
	this.start       = new Date()	
	this.end         = new Date()
	this.iterations  = 0;
}

Profiler.prototype = {
	run: function (count, scope) {
		this.iterations = count;
		var job         = this.job;
		this.start      = new Date();
		for(var i = 0; i < count; ++i) {
			job.call(scope || window)
		}
		this.end   = new Date();
		return this;
	},
	
	duration: function () {
		return this.end.getTime() - this.start.getTime();
	},
	
	report: function () {
		var duration = this.duration() / 1000;
        var avg = Math.round(duration / this.iterations * 10000) / 10000;
		document.write("" +this.iterations + " iterations of " + this.description + " took " + duration + " seconds. " + avg + "avg. <br>\n")
		return this;
	}
}


