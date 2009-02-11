if (typeof BasicTest6 == 'function' && !BasicTest6.meta) {
    __global__.nonJooseDoubleDeclared = true;
    throw "Double declaration of BasicTest6";
}


BasicTest6 = function() {
    this.version = 0.1;
}

BasicTest6.prototype.result = function () { return 6 };