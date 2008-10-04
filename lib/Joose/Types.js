(function () {
	Type('Any', {
	    where: function(o) {
			// Shouldn't this always return true?
	        if ( typeof o != 'undefined' ) {
	            return true;
	        }
	        return false;
	    }
	});


	Type('Null', {
	    uses: TYPE.Any,
	    where: function(o) {
	        if (o === null) {
	            return true;
	        }
	        return false;
	    }
	});

	Type('Obj', {
	    uses: TYPE.Any,
	    where: function (o) {
	        if ( o instanceof Object ) {
	            return true;
	        }
	        return false;
	    }
	});

	Type('Str', {
	    uses: TYPE.Any,
	    where: function(S) {
	        if ( typeof S == 'string' || S instanceof String ) {
	            return true;
	        }
	        return false
	    },
	    coerce: [{
	        from: TYPE.Any,
	        via:  function (value) {
	            if(value == null) {
	                return ""
	            } else {
	                return "" + value
	            }
	        }
	    }]
	});

	Type('Num', {
	    uses: TYPE.Any,
	    where: function(N) {
	        if ( typeof N == 'number' || N instanceof Number ) {
	            return true;
	        }
	        return false
	    },
	    coerce: [{
	        from: TYPE.Str,
	        via:  function (value) {
	            return parseFloat(value)
	        }
	    }]
	});

	Type('Bool', {
	    uses: TYPE.Any,
	    where: function(B) {
	        if (B === true || B === false) {
	            return true;
	        }
	        return false;
	    }
	});

	Type('Int', {
	    uses: TYPE.Num,
	    where: function(n) {
	        var sn = String(n);
	        if ( sn.match(/^\d*\.\d$/) ) {
	            return false;
	        }
	        return true;
	    }
	});

	//TODO(jwall): Float is starting to look superfluous Floats are a superset of Int
	//and javascript has no good way to differentiate between Num and Float
	//It's only benefit is semantic sugar. TYPE.Float = TYPE.Num?
	Type('Float', {
	    uses: TYPE.Num,
	    where: function(n) {
	        return true
	    }
	});

	Type('Func', {
	    uses: TYPE.Obj,
	    where: function (f) {
	        if ( typeof f == 'function' ) {
	            return true;
	        }
	        return false;
	    }
	});

	Type('Array', {
	    uses: TYPE.Obj,
	    where: function (A) {
	        if ( A instanceof Array ) {
	            return true;
	        }
	        return false;
	    }
	});

	Type('Date', {
	    uses: TYPE.Obj,
	    where: function (D) {
	        if ( D instanceof Date ) {
	            return true;
	        }
	        return false;
	    }
	});

	Type('Joose', {
	    uses: TYPE.Obj,
	    where: function (o) {
	        //TODO not sure if this is correct yet.
	        if ( o.meta && o.meta.meta.isa(Joose.Class) ) {
	            return true;
	        }
	        return false;
	    }
	});	
})()