plan(60)

Role("Eq", {
    requires: "equalTo",
    
    methods: {
        notEqualTo: function (other) {
            return !this.equalTo(other)
        }
    }
})

Role("Comparable", {
    requires: "compare",
    does: Eq,
    
    methods: {
        equalTo:     function (other) { return this.compare(other) == 0 },
        greaterThan: function (other) { return this.compare(other) == 1 },
        lessThan:    function (other) { return this.compare(other) == -1 },
        
        greaterThanOrEqualTo: function (other) {
            return this.greaterThan(other) || this.equalTo(other)
        },
        
        lessThanOrEqualTo: function (other) {
            return this.lessThan(other) || this.equalTo(other)
        }
    }
})

Role("Printable", {
    requires: "stringify"
})

Module("US", function () {
    Class("Currency", {
        does: [Comparable, Printable],
        
        has:  {
            amount: {
                is: rw,
                init: 0
            }
        },
        
        methods: {
            compare: function (other) {
                if(this.getAmount() == other.getAmount()) return 0
                if(this.getAmount() >  other.getAmount()) return 1
                return -1
            },
            
            stringify: function () {
                return ""+this.getAmount()+" USD"
            }
        }
        
        
    })
})

ok(US.Currency.meta.does(Comparable), '... US.Currency does Comparable');
ok(US.Currency.meta.does(Eq), '... US.Currency does Eq');
ok(US.Currency.meta.does(Printable), '... US.Currency does Printable');

var hundred = new US.Currency({amount: 100.00});
isaOk(hundred, US.Currency);

canOk(hundred, 'getAmount');
isEq(hundred.getAmount(), 100, '... got the right amount');

canOk(hundred, 'toString');
isEq(hundred.toString(), '100 USD', '... got the right stringified value');

ok(hundred.meta.does(Comparable), '... US.Currency does Comparable');
ok(hundred.meta.does(Eq), '... US.Currency does Eq');
ok(hundred.meta.does(Printable), '... US.Currency does Printable');

var fifty = new US.Currency({amount: 50.00});
isaOk(fifty, US.Currency);

canOk(fifty, 'getAmount');
isEq(fifty.getAmount(), 50, '... got the right amount');

canOk(fifty, 'stringify');
canOk(fifty, 'toString');
isEq(fifty.toString(), '50 USD', '... got the right stringified value');

ok(hundred.greaterThan(fifty),             '... 100 gt 50');
ok(hundred.greaterThanOrEqualTo(fifty), '... 100 ge 50');
ok(!hundred.lessThan(fifty),               '... !100 lt 50');
ok(!hundred.lessThanOrEqualTo(fifty),   '... !100 le 50');
ok(!hundred.equalTo(fifty),                '... !100 eq 50');
ok(hundred.notEqualTo(fifty),             '... 100 ne 50');

ok(!fifty.greaterThan(hundred),             '... !50 gt 100');
ok(!fifty.greaterThanOrEqualTo(hundred), '... !50 ge 100');
ok(fifty.lessThan(hundred),                 '... 50 lt 100');
ok(fifty.lessThanOrEqualTo(hundred),     '... 50 le 100');
ok(!fifty.equalTo(hundred),                 '... !50 eq 100');
ok(fifty.notEqualTo(hundred),              '... 50 ne 100');

ok(!fifty.greaterThan(fifty),            '... !50 gt 50');
ok(fifty.greaterThanOrEqualTo(fifty), '... !50 ge 50');
ok(!fifty.lessThan(fifty),               '... 50 lt 50');
ok(fifty.lessThanOrEqualTo(fifty),    '... 50 le 50');
ok(fifty.equalTo(fifty),                 '... 50 eq 50');
ok(!fifty.notEqualTo(fifty),            '... !50 ne 50');

// ... check some meta-stuff

// Eq

var eqMeta = Eq.meta;
isaOk(eqMeta, Joose.Role);

ok(eqMeta.hasMethod('notEqualTo'), '... Eq hasMethod not_equalTo');
ok(eqMeta.requiresMethod('equalTo'), '... Eq requiresMethod not_equalTo');

// Comparable

var comparableMeta = Comparable.meta;
isaOk(comparableMeta, Joose.Role);

ok(comparableMeta.does(Eq), '... Comparable does Eq');

Joose.A.each(["equalTo", "notEqualTo", "greaterThan", "greaterThanOrEqualTo", "lessThan", "lessThanOrEqualTo"],
    function (methodName) {
        ok(comparableMeta.hasMethod(methodName), "Comparable has method "+methodName)
    })

ok(comparableMeta.requiresMethod('compare'), '... Comparable requiresMethod compare');


// Printable

var printableMeta = Printable.meta;
isaOk(printableMeta, Joose.Role);

ok(printableMeta.requiresMethod('stringify'), '... Printable requiresMethod toString');

// US.Currency

var currencyMeta = US.Currency.meta;
isaOk(currencyMeta, Joose.Class);

ok(currencyMeta.does(Comparable), '... US.Currency does Comparable');
ok(currencyMeta.does(Eq), '... US.Currency does Eq');
ok(currencyMeta.does(Printable), '... US.Currency does Printable');

Joose.A.each(["toString", "equalTo", "notEqualTo", "greaterThan", "greaterThanOrEqualTo", "lessThan", "lessThanOrEqualTo"],
    function (methodName) {
        ok(currencyMeta.hasMethod(methodName), "US.Currency has method "+methodName)
    })


endTests()