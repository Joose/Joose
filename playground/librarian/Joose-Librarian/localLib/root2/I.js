if (typeof I == 'function') throw "Double declaration I";

I = function(){
    this.version = 0.1;
}

I.prototype = {
    result : function () { return 'I' }
}
