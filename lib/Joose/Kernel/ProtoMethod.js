//proto Method

// See http://code.google.com/p/joose-js/wiki/JooseMethod
Joose.Kernel.ProtoMethod = Joose.Kernel.Fissiparity.parturiate('Joose.Kernel.ProtoMethod', function (name, func) {
    this.initialize(name, func)
});

Joose.Kernel.ProtoMethod.meta.addGenes({
	
    _name: null,
    _body: null,
//    _props: null,
    _isFromSuperClass: false,
    
    getName:    function () { return this._name },
    getBody:    function () { return this._body },
//    getProps:   function () { return this._props },
    
    isFromSuperClass: function () {
        return this._isFromSuperClass
    },
    
    setIsFromSuperClass: function (bool) {
        this._isFromSuperClass = bool
    },
    
    copy: function () {
        return new this.constructor(this.getName(), this.getBody(), this.getProps())
    },
    
    
    initialize: function (name, func/*, props*/) {
        this._name  = name;
        this._body  = func;
//        this._props = props;
        
        func.name   = name
    
        func.meta   = this
    },
    
//    isClassMethod: function () { return false },
    
    apply:    function (thisObject, args) {
        return this._body.apply(thisObject, args)
    },
    
    
    addToClass: function (c) {
        c.prototype[this.getName()] = this.asFunction()
    },
    
    // direct call
    asFunction:    function () {
        return this._body
    }
});