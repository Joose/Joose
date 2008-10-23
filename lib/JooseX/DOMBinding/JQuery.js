Module("JooseX.DOMBinding", function (module) {
    

    // Role for meta classes that implement bindings between Joose objects and DOM elements
    Role("JQueryMetaRole", {
        requires: ["getAttribute"],
        // and requires attribute $ that includes a jquery object
        
        methods: {
            handlePropbind: function (props) {
                var me    = this;
                var names = [];
                Joose.O.each(props, function (bindingProps, name) {
                    var attr        = me.getAttribute(name);
                    if(!attr) {
                        throw new Error("Cant find attribute "+name+" for binding")
                    }
                    
                    names.push(name)
                    var props       = {
                        selector: null,
                        accessor: "val",
                        args:     [],
                        notifyOn: []
                    };
                    Joose.O.extend(props, bindingProps);
                    
                    var selector = props.selector;
                    var accessor = props.accessor;
                    var args     = props.args;
                    var notifyOn = props.notifyOn;
                    
                    var getterName  = attr.getterName();
                    var setterName  = attr.setterName();
                    
                    // Update from bound element before get
                    me.wrapMethod(getterName, "before", function beforeGet () {
                        var n = name;
                        var $ = this.$;
                        if(selector) {
                            $ = this.$.find(selector)
                        }
                        var value  = $[accessor].apply($, args)
                        this[name] = value
                    })
                    
                    // Update bound element after set
                    me.wrapMethod(setterName, "after", function afterSet () {
                        var value = this[name]
                        var $ = this.$;
                        if(selector) {
                            $ = this.$.find(selector)
                        }
                        var a = [];
                        for(var i = 0; i < args.length; i++) {
                            a.push(args[i])
                        }
                        a.push(value)
                        $[accessor].apply($, a)
                    })
                    
                    me.wrapMethod("draw", "after", function afterGet () {
                        var me = this;
                        for(var i = 0; i < notifyOn.length; i++) {
                            var eventName = notifyOn[i];
                            var target = this.$;
                            if(selector) {
                                target = target.find(selector)
                            }
                            target.bind(eventName, function (e) {
                                me.notify(eventName, this, e)
                            })
                        }
                    })
                });
                
                me.addMethod("redraw", function redraw () {
                    for(var i = 0; i < names.length; i++) {
                        var name   = names[i];
                        var setter = this.meta.getAttribute(name).setterName();
                        var value  = this[name];
                        
                        this[setter](value)
                    }
                })
            }
        }
    })
    
    Role("JQuery", {
        
        metaRoles: [module.JQueryMetaRole],
        
        methods: {
            // puts object onto page. Override to place somewhere else
            draw: function () {
                this.$ = this.create();
                this.destination().append(this.$);
            },
            
            destination: function () {
                return jQuery(document.body)
            },
            
            notify: function (eventName, target, eventObject) {
                
            }
        },
        
        after: {
            initialize: function () {
                this.draw()
            }
        }
    })
})