/*
 * Ext JS Library 3.0 RC1
 * Copyright(c) 2006-2009, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */

/**
 * @class Ext
 */

Ext.ns("Ext.grid", "Ext.dd", "Ext.tree", "Ext.form", "Ext.menu",
       "Ext.state", "Ext.layout", "Ext.app", "Ext.ux", "Ext.chart", "Ext.direct");

Ext.apply(Ext, function(){
    var E = Ext, idSeed = 0;

    return {
        /**
         * URL to a blank file used by Ext when in secure mode for iframe src and onReady src to prevent
         * the IE insecure content warning (defaults to javascript:false).
         * @type String
         */
        SSL_SECURE_URL : "javascript:false",

        /**
        * A reusable empty function
        * @property
         * @type Function
        */
        emptyFn : function(){},

        /**
         * URL to a 1x1 transparent gif image used by Ext to create inline icons with CSS background images. (Defaults to
         * "http://extjs.com/s.gif" and you should change this to a URL on your server).
         * @type String
         */
        BLANK_IMAGE_URL : "http:/"+"/extjs.com/s.gif",

        extendX : function(supr, fn){
            return Ext.extend(supr, fn(supr.prototype));
        },

        /**
        * Returns the current HTML document object as an {@link Ext.Element}.
        * @return Ext.Element The document
        */
        getDoc : function(){
            return Ext.get(document);
        },

        /**
         * Returns true if the passed object is a JavaScript date object, otherwise false.
         * @param {Object} object The object to test
         * @return {Boolean}
         */
        isDate : function(v){
            return Object.prototype.toString.apply(v) === '[object Date]';
        },

        /**
         * Utility method for validating that a value is numeric, returning the specified default value if it is not.
         * @param {Mixed} value Should be a number, but any type will be handled appropriately
         * @param {Number} defaultValue The value to return if the original value is non-numeric
         * @return {Number} Value, if numeric, else defaultValue
         */
        num : function(v, defaultValue){
            v = Number(v == null? NaN : v);
            return isNaN(v)? defaultValue : v;
        },

        /**
         * <p>Utility method for returning a default value if the passed value is empty.</p>
         * <p>The value is deemed to be empty if it is<div class="mdetail-params"><ul>
         * <li>null</li>
         * <li>undefined</li>
         * <li>an empty array</li>
         * <li>a zero length string (Unless the <tt>allowBlank</tt> parameter is <tt>true</tt>)</li>
         * </ul></div>
         * @param {Mixed} value The value to test
         * @param {Mixed} defaultValue The value to return if the original value is empty
         * @param {Boolean} allowBlank (optional) true to allow zero length strings to qualify as non-empty (defaults to false)
         * @return {Mixed} value, if non-empty, else defaultValue
         */
        value : function(v, defaultValue, allowBlank){
            return Ext.isEmpty(v, allowBlank) ? defaultValue : v;
        },

        /**
         * Escapes the passed string for use in a regular expression
         * @param {String} str
         * @return {String}
         */
        escapeRe : function(s) {
            return s.replace(/([.*+?^${}()|[\]\/\\])/g, "\\$1");
        },

        sequence : function(o, name, fn, scope){
            o[name] = o[name].createSequence(fn, scope);
        },

        /**
         * Applies event listeners to elements by selectors when the document is ready.
         * The event name is specified with an @ suffix.
         <pre><code>
         Ext.addBehaviors({
           // add a listener for click on all anchors in element with id foo
           '#foo a@click' : function(e, t){
               // do something
           },

           // add the same listener to multiple selectors (separated by comma BEFORE the @)
           '#foo a, #bar span.some-class@mouseover' : function(){
               // do something
           }
         });
         </code></pre>
         * @param {Object} obj The list of behaviors to apply
         */
        addBehaviors : function(o){
            if(!Ext.isReady){
                Ext.onReady(function(){
                    Ext.addBehaviors(o);
                });
            } else {
                var cache = {}, // simple cache for applying multiple behaviors to same selector does query multiple times
                    parts,
                    b,
                    s;
                for (b in o) {
                    if ((parts = b.split('@'))[1]) { // for Object prototype breakers
                        s = parts[0];
                        if(!cache[s]){
                            cache[s] = Ext.select(s);
                        }
                        cache[s].on(parts[1], o[b]);
                    }
                }
                cache = null;
            }
        },


        // deprecated
        combine : function(){
            var as = arguments, l = as.length, r = [];
            for(var i = 0; i < l; i++){
                var a = as[i];
                if(Ext.isArray(a)){
                    r = r.concat(a);
                }else if(a.length !== undefined && !a.substr){
                    r = r.concat(Array.prototype.slice.call(a, 0));
                }else{
                    r.push(a);
                }
            }
            return r;
        },

        /**
         * Copies a set of named properties fom the source object to the destination object.
         * @param {Object} The destination object.
         * @param {Object} The source object.
         * @param {Array/String} Either an Array of property names, or a comma-delimited list
         * of property names to copy.
         * @return {Object} The modified object.
         * <p>example:<pre><code>
            ImageComponent = Ext.extend(Ext.BoxComponent, {
            initComponent: function() {
                this.autoEl = { tag: 'img' };
                MyComponent.superclass.initComponent.apply(this, arguments);
                this.initialBox = Ext.copyTo({}, this.initialConfig, 'x,y,width,height');
            }
        });
        </code></pre>
        */
        copyTo : function(dest, source, names){
            if(typeof names == 'string'){
                names = names.split(/[,;\s]/);
            }
            for(var i = 0, len = names.length; i< len; i++){
                var n = names[i];
                if(source.hasOwnProperty(n)){
                    dest[n] = source[n];
                }
            }
            return dest;
        },

        /**
         * Attempts to destroy any objects passed to it by removing all event listeners, removing them from the
         * DOM (if applicable) and calling their destroy functions (if available).  This method is primarily
         * intended for arguments of type {@link Ext.Element} and {@link Ext.Component}, but any subclass of
         * {@link Ext.util.Observable} can be passed in.  Any number of elements and/or components can be
         * passed into this function in a single call as separate arguments.
         * @param {Mixed} arg1 An {@link Ext.Element} or {@link Ext.Component} to destroy
         * @param {Mixed} arg2 (optional)
         * @param {Mixed} etc... (optional)
         */
        destroy : function(){
            for(var i = 0, a = arguments, len = a.length; i < len; i++) {
                var as = a[i];
                if(as){
                    if(typeof as.destroy == 'function'){
                        as.destroy();
                    }
                    else if(as.dom){
                        as.removeAllListeners();
                        as.remove();
                    }
                }
            }
        },

        /**
         * Attempts to destroy and then remove a set of named properties of the passed object.
         * @param {Object} o The object (most likely a Component) who's properties you wish to destroy.
         * @param {Mixed} arg1 The name of the property to destroy and remove from the object.
         * @param {Mixed} etc... More property names to destroy and remove.
         */
        destroyMembers : function(o, arg1, arg2, etc){
            for(var i = 1, a = arguments, len = a.length; i < len; i++) {
                Ext.destroy(o[a[i]]);
                delete o[a[i]];
            }
        },

        /**
         * Removes null values
         * @param {Array/NodeList}
         * @returns {Array} Returns the modified array.
         */
        clean : function(arr){
            var ret = [];
            Ext.each(arr, function(v){
                if(!!v) ret.push(v);
            });
            return ret;
        },

        /**
         * Filters the array for unique values
         * @param {Array} The array to filter
         * @returns {Array} Returns the unique array.
         */
        unique : function(arr){
            var ret = [],
                collect = {};

            Ext.each(arr, function(v) {
                if(!collect[v]){
                    ret.push(v);
                }
                collect[v] = true;
            });
            return ret;
        },

        /**
         * Recursively flattens into 1-d array. Injects arrays inline.
         * @param {Array} The array to flatten
         * @returns {Array} Returns the modified array.
         */
        flatten : function(arr){
            var worker = [];
            function rFlatten(a) {
                Ext.each(a, function(v) {
                    Ext.isArray(v) ? rFlatten(v) : worker.push(v);
                });
                return worker;
            };
            return rFlatten(arr);
        },

        /**
         * Returns the minimum value in the array
         * @param {Array|NodeList}
         * @param {Function} comp (optional) a function to perform the comparision which determins minimization.
         *                   If omitted the "<" operator will be used. Note: gt = 1; eq = 0; lt = -1
         * @returns {Object} returns the minimum value in the set.
         */
        min : function(arr, comp){
            var ret = arr[0];
            comp = comp || function(a,b){ return a < b ? -1 : 1 };
            Ext.each(arr, function(v) {
                ret = comp(ret, v) == -1 ? ret : v;
            });
            return ret;
        },

        /**
         * Returns the maximum  value in the array
         * @param {Array|NodeList}
         * @param {Function} comp (optional) a function to perform the comparision which determins minimization.
         *                   If omitted the ">" operator will be used. Note: gt = 1; eq = 0; lt = -1
         * @returns {Object} returns the maximum value in the set.
         */
        max : function(arr, comp){
            var ret = arr[0];
            comp = comp || function(a,b){ return a > b ? 1 : -1 };
            Ext.each(arr, function(v) {
                ret = comp(ret, v) == 1 ? ret : v;
            });
            return ret;
        },

        /**
         * Returns the median value in the set.
         * @param {Array|NodeList} The array to filter
         * @param {Function} sorter (optional) a function that will perform the sorting operation.
         * @param {Function} MedianOperator (optional) a function that will perform the median calculation in the
         *                   event that the length of the list is even. This is optional, but if it is not an array of
         *                   numbers and the length is even it is needed or an error will be thrown.
         * @returns {Number} Returns the median value
         */
        median : function(arr, sorter, medCalc){
            var ret,
                middle,
                remainder;

            if (arr.length) {
                if (arr.length == 1) {
                    ret = arr[0];
                } else {
                    arr = Ext.toArray(arr);
                    sorter ? arr.sort(sorter) : arr.sort();
                    remainder = (middle = (arr.length / 2) - 1) % 1;
                    if( remainder == 0 ){
                        ret = medCalc ? medCalc(arr[middle], arr[middle + 1]) : ((arr[middle] + arr[middle + 1]) / 2);
                    }else{
                        ret = arr[middle + remainder];
                    }
                }
            }
            return ret;
        },

        /**
         * Calculates the mean of the set
         * @param {Array} The array to calculate the mean value of.
         * @returns {Number} The mean.
         */
        mean : function(arr){
           return Ext.sum(arr) / arr.length;
        },

        /**
         * Returns the mode of the set.
         * @param {Array} The array to compute the mode on.
         * @returns {Number} The mode.
         */
        mode : function(arr){
            var collect = {},
                mode = arr[0];

            Ext.each(arr, function(v) {
                collect[v] == undefined ? collect[v] = 0 : collect[v]++;
                mode = collect[mode] < collect[v] ? v : mode;
            });
            return mode;
        },

        /**
         * Calculates the sum of the set
         * @param {Array} The array to calculate the sum value of.
         * @returns {Number} The sum.
         */
        sum : function(arr){
           var ret = 0;
           Ext.each(arr, function(v) {
               ret += v;
           });
           return ret;
        },

        /**
         * Partitions the set into two sets: a true set and a false set.
         * Example: 
         * Example2: 
         * <pre><code>
// Example 1:
Ext.partition([true, false, true, true, false]); // [[true, true, true], [false, false]]

// Example 2:
Ext.partition(
    Ext.query("p"),
    function(val){
        return val.className == "class1"
    }
);
// true are those paragraph elements with a className of "class1",
// false set are those that do not have that className.
         * </code></pre>
         * @param {Array|NodeList} The array to partition
         * @param {Function} truth (optional) a function to determine truth.  If this is omitted the element itself must be able to be
         *                   evaluated for its truthfulness.
         * @returns {Array} [true<Array>,false<Array>]
         */
        partition : function(arr, truth){
            var ret = [[],[]];
            Ext.each(arr, function(v, i, a) {
                ret[ (truth && truth(v, i, a)) || (!truth && v) ? 0 : 1].push(v);
            });
            return ret;
        },

        /**
         * Invokes a method on each item in the set.
         * <pre><code>
// Example:
Ext.invoke(Ext.query("p"), "getAttribute", "id");
// [el1.getAttribute("id"), el2.getAttribute("id"), ..., elN.getAttribute("id")]
         * </code></pre>
         * @param {Array|NodeList(not in IE)} The array of items to invoke the method on.
         * @param {String} The method name to invode
         * @param {Anything} Arguments to send into the method invocation.
         * @returns {Array} The result of invoking the method on each item in the array.
         */
        invoke : function(arr, prop){
            var ret = [],
                args = Array.prototype.slice.call(arguments, 2);
            Ext.each(arr, function(v,i) {
                if (v && typeof v[prop] == "function") {
                    ret.push(v[prop].apply(v, args));
                } else {
                    ret.push(undefined);
                }
            });
            return ret;
        },

        /**
         * Plucks the value of a property from each item in the set
         * <pre><code>
// Example:
Ext.pluck(Ext.query("p"), "className"); // [el1.className, el2.className, ..., elN.className]
         * </code></pre>
         * @param {Array|NodeList} The array of items to pluck the value from.
         * @returns {Array} The value from each item in the set.
         */
        pluck : function(arr, prop){
            var ret = [];
            Ext.each(arr, function(v) {
                ret.push( v[prop] );
            });
            return ret;
        },

        /**
         * <p>Zips N sets together.</p>
         * <pre><code>
// Example 1:
Ext.zip([1,2,3],[4,5,6]); // [[1,4],[2,5],[3,6]]
// Example 2:
Ext.zip(
    [ "+", "-", "+"],
    [  12,  10,  22],
    [  43,  15,  96],
    function(a, b, c){
        return "$" + a + "" + b + "." + c
    }
); // ["$+12.43", "$-10.15", "$+22.96"]
         * </code></pre>
         * @param {Arrays|NodeLists} The array to calculate the sum value of.
         * @param {Function} zipper (optional) this will drive how the items are zipped together.
         * @returns {Array} The zipped set.
         */
        zip : function(){
            var parts = Ext.partition(arguments, function( val ){ return typeof val != "function" }),
                arrs = parts[0],
                fn = parts[1][0],
                len = Ext.max(Ext.pluck(arrs, "length")),
                ret = [];

            for (var i = 0; i < len; i++) {
                ret[i] = [];
                if(fn){
                    ret[i] = fn.apply(fn, Ext.pluck(arrs, i));
                }else{
                    for (var j = 0, aLen = arrs.length; j < aLen; j++){
                        ret[i].push( arrs[j][i] );
                    }
                }
            }
            return ret;
        },

        /**
        * Shorthand for {@link Ext.ComponentMgr#get}
        * @param {String} id
        * @return Ext.Component
        */
        getCmp : function(id){
            return Ext.ComponentMgr.get(id);
        },

        /**
         * By default, Ext intelligently decides whether floating elements should be shimmed. If you are using flash,
         * you may want to set this to true.
         * @type Boolean
         */
        useShims : ((E.isIE && E.isIE6) || (E.isMac && E.isGecko && !E.isGecko3)),

        // inpired by a similar function in mootools library
        /**
         * Returns the type of object that is passed in. If the object passed in is null or undefined it
         * return false otherwise it returns one of the following values:<div class="mdetail-params"><ul>
         * <li><b>string</b>: If the object passed is a string</li>
         * <li><b>number</b>: If the object passed is a number</li>
         * <li><b>boolean</b>: If the object passed is a boolean value</li>
         * <li><b>date</b>: If the object passed is a Date object</li>
         * <li><b>function</b>: If the object passed is a function reference</li>
         * <li><b>object</b>: If the object passed is an object</li>
         * <li><b>array</b>: If the object passed is an array</li>
         * <li><b>regexp</b>: If the object passed is a regular expression</li>
         * <li><b>element</b>: If the object passed is a DOM Element</li>
         * <li><b>nodelist</b>: If the object passed is a DOM NodeList</li>
         * <li><b>textnode</b>: If the object passed is a DOM text node and contains something other than whitespace</li>
         * <li><b>whitespace</b>: If the object passed is a DOM text node and contains only whitespace</li>
         * </ul></div>
         * @param {Mixed} object
         * @return {String}
         */
        type : function(o){
            if(o === undefined || o === null){
                return false;
            }
            if(o.htmlElement){
                return 'element';
            }
            var t = typeof o;
            if(t == 'object' && o.nodeName) {
                switch(o.nodeType) {
                    case 1: return 'element';
                    case 3: return (/\S/).test(o.nodeValue) ? 'textnode' : 'whitespace';
                }
            }
            if(t == 'object' || t == 'function') {
                switch(o.constructor) {
                    case Array: return 'array';
                    case RegExp: return 'regexp';
                    case Date: return 'date';
                }
                if(typeof o.length == 'number' && typeof o.item == 'function') {
                    return 'nodelist';
                }
            }
            return t;
        },

        intercept : function(o, name, fn, scope){
            o[name] = o[name].createInterceptor(fn, scope);
        },

        // internal
        callback : function(cb, scope, args, delay){
            if(Ext.isFunction(cb)){
                if(delay){
                    cb.defer(delay, scope, args || []);
                }else{
                    cb.apply(scope, args || []);
                }
            }
        }
    }
}());

/**
 * @class Function
 * These functions are available on every Function object (any JavaScript function).
 */
Ext.apply(Function.prototype, {
    /**
     * Create a combined function call sequence of the original function + the passed function.
     * The resulting function returns the results of the original function.
     * The passed fcn is called with the parameters of the original function. Example usage:
     * <pre><code>
var sayHi = function(name){
    alert('Hi, ' + name);
}

sayHi('Fred'); // alerts "Hi, Fred"

var sayGoodbye = sayHi.createSequence(function(name){
    alert('Bye, ' + name);
});

sayGoodbye('Fred'); // both alerts show
</code></pre>
     * @param {Function} fcn The function to sequence
     * @param {Object} scope (optional) The scope of the passed fcn (Defaults to scope of original function or window)
     * @return {Function} The new function
     */
    createSequence : function(fcn, scope){
        var method = this;
        return !Ext.isFunction(fcn) ?
                this :
                function(){
                    var retval = method.apply(this || window, arguments);
                    fcn.apply(scope || this || window, arguments);
                    return retval;
                };
    }
});


/**
 * @class String
 * These functions are available as static methods on the JavaScript String object.
 */
Ext.applyIf(String, {

    /**
     * Escapes the passed string for ' and \
     * @param {String} string The string to escape
     * @return {String} The escaped string
     * @static
     */
    escape : function(string) {
        return string.replace(/('|\\)/g, "\\$1");
    },

    /**
     * Pads the left side of a string with a specified character.  This is especially useful
     * for normalizing number and date strings.  Example usage:
     * <pre><code>
        var s = String.leftPad('123', 5, '0');
        // s now contains the string: '00123'
        </code></pre>
     * @param {String} string The original string
     * @param {Number} size The total length of the output string
     * @param {String} char (optional) The character with which to pad the original string (defaults to empty string " ")
     * @return {String} The padded string
     * @static
     */
    leftPad : function (val, size, ch) {
        var result = String(val);
        if(!ch) {
            ch = " ";
        }
        while (result.length < size) {
            result = ch + result;
        }
        return result;
    }
});

/**
 * Utility function that allows you to easily switch a string between two alternating values.  The passed value
 * is compared to the current string, and if they are equal, the other value that was passed in is returned.  If
 * they are already different, the first value passed in is returned.  Note that this method returns the new value
 * but does not change the current string.
 * <pre><code>
// alternate sort directions
sort = sort.toggle('ASC', 'DESC');

// instead of conditional logic:
sort = (sort == 'ASC' ? 'DESC' : 'ASC');
</code></pre>
 * @param {String} value The value to compare to the current string
 * @param {String} other The new value to use if the string already equals the first value passed in
 * @return {String} The new value
 */
String.prototype.toggle = function(value, other){
    return this == value ? other : value;
};

/**
 * Trims whitespace from either end of a string, leaving spaces within the string intact.  Example:
 * <pre><code>
var s = '  foo bar  ';
alert('-' + s + '-');         //alerts "- foo bar -"
alert('-' + s.trim() + '-');  //alerts "-foo bar-"
</code></pre>
 * @return {String} The trimmed string
 */
String.prototype.trim = function(){
    var re = /^\s+|\s+$/g;
    return function(){ return this.replace(re, ""); };
}();

// here to prevent dependency on Date.js
/**
 Returns the number of milliseconds between this date and date
 @param {Date} date (optional) Defaults to now
 @return {Number} The diff in milliseconds
 @member Date getElapsed
 */
Date.prototype.getElapsed = function(date) {
    return Math.abs((date || new Date()).getTime()-this.getTime());
};


/**
 * @class Number
 */
Ext.applyIf(Number.prototype, {
    /**
     * Checks whether or not the current number is within a desired range.  If the number is already within the
     * range it is returned, otherwise the min or max value is returned depending on which side of the range is
     * exceeded.  Note that this method returns the constrained value but does not change the current number.
     * @param {Number} min The minimum number in the range
     * @param {Number} max The maximum number in the range
     * @return {Number} The constrained value if outside the range, otherwise the current value
     */
    constrain : function(min, max){
        return Math.min(Math.max(this, min), max);
    }
});
