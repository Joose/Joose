var testtop = this;

Test = function() {};

Test.prototype.top = function() {
    return testtop;
}

Test.prototype.out   = function(text) {
    this.print(text);
};

Test.prototype.diag = function(msg){
    if (!msg) {
        msg = " ";
    }
    this.out('# ' + msg);
};

Test.prototype.mk_tap = function(ok, description){
    if(!this.planned){
        this.out("You tried to run tests without a plan.  Gotta have a plan.");
        throw new Error("You tried to run tests without a plan.  Gotta have a plan.");
    }
    this.counter++;
    this.out(ok + ' ' + this.counter + ' - ' + description);
};

/*

=head1 NAME

    Test.TAP - a 0 dependency TAP compliant test library useable from the commandline

=head1 Synopsis

    var t = new Test.TAP;
    t.plan(3);

    t.ok(true, 'True is True'); # test will pass
    t.is(1, 2, 'one is two'); # test will fail
    
    var obj = {};
    obj.method1 = function() { return true; };

    t.can_ok(obj, 'method1'); # test will pass

=head1 DESCRIPTION

Test.TAP is a javascript testing library that meets the needs of TDD for a commandline environment.

=head1 METHODS

=cut

*/


Test.TAP = function(out) {
    this.planned = 0;
    this.counter = 0;
    this.passed  = 0;
    this.failed  = 0;
    this.print = out || function(text) {
        if(typeof document == 'undefined') {
            document = {};
        }
        if(typeof document.write == 'undefined') { 
            document.write = print;
        } 
        if (typeof print == 'undefined'
            || document.write != print) {
            text += '\n';
        }
        document.write(text);
    };
};

Test.TAP.prototype = new Test;

Test.TAP.prototype.pass = function(description) {
    this.mk_tap('ok', description);    
};

Test.TAP.prototype.fail = function(description) {
    this.mk_tap('not ok', description);
};

Test.TAP.prototype.todo = function(func) {
    var self = this;
    var tapper = self.mk_tap;
    self.mk_tap = function(ok, desc) {
        tapper.apply(self, [ok, "# TODO: "+desc]);
    }
    // TODO shoulnd't we at least wrap this in a exception and output unexpected successes
    func();
    self.mk_tap = tapper;
}

Test.TAP.prototype.skip = function(crit, reason, count, func) {
    var self = this;
    if (crit) {
        var tapper = self.mk_tap;
        self.mk_tap = function(ok, desc) {
            tapper.apply(self, [ok, ]);
        }
        // TODO show better message
        for(var i = 0; i < count; i++) {
            self.pass("# SKIP "+reason)
        }
        self.mk_tap = tapper;
    } else {
        func();
    }
}

/*

=head2 plan()

    t.plan(3);

Sets the test plan. Once set this can not be reset again. An attempt to change the plan once already set will throw an exception.

=cut

*/

Test.TAP.prototype.plan = function(tests) {
    if (tests == 'no_plan') {
        this.planned = tests;
    } else {
        if(this.planned > 0 || this.planned == 'no_plan'){
            throw new Error("you tried to set the plan twice!");
        }
        this.planned = tests;
        this.out('1..' + tests);
    }
};

Test.TAP.prototype._pass_if = function(func, desc){
    var result = func();
    if(result){ this.pass(desc) }
    else      { this.fail(desc) }
}


/*

=head2 diag()

    t.diag('a diagnostic message');

prints out a TAP compliant diagnostic message.

=cut

*/


/*

=head2 is()

    t.is(got, expected, 'test description');

tests that what we got matches what we expected. An equality test.

=cut

*/

Test.TAP.prototype.is = function(got, expected, desc) {
    this._pass_if(function(){ return got == expected; }, desc);
};


/*

=head2 ok()

    t.ok(expression, 'test description');

Test that expression evaluates to true value

=cut

*/

Test.TAP.prototype.ok = function(got, desc) {
    this._pass_if(function(){ return !!got; }, desc);
};


/*

=head2 like()

    t.like('string', /regex/, 'test description');

Tests that a string matches the regex.

=cut

*/

Test.TAP.prototype.like = function(string, regex, desc) {
    this._pass_if(function(){
            if(regex instanceof RegExp) {
                return string.match(regex)
            } else {
                return string.indexOf(regex) != -1
            }
	}, desc)
}

/*

=head2 unlike()

    t.unlike('string', /regex/, 'test description');

The opposite of like. tests that the string doesn't match the regex

=cut

*/

Test.TAP.prototype.unlike = function(string, regex, desc) {
    this._pass_if(function(){
            return !string.match(regex);
	}, desc)
}

/*

=head2 can_ok()

    t.can_ok(obj, 'method1', method2');

tests that the object has the list of methods. outputs diagnostics about which ones are missing if the test fails.

=cut

*/


Test.TAP.prototype.can_ok = function(obj) {
    var desc = 'object can [';
    var pass = true;
    for (i=1; i<arguments.length; i++) {
        if (typeof(obj[arguments[i]]) != 'function') {
            //this.diag('TypeOf ' + arguments[i] + ' method is: ' + typeof(obj[arguments[i]]) );
            //this.diag('TypeOf prototype is: ' + typeof(obj.prototype) );
            if (typeof(obj.prototype) != 'undefined') {
                var result = typeof eval('obj.prototype.' + arguments[i]);
                //this.diag('TypeOf prototype method is: ' + result);
                if (result == 'undefined') {
                    pass = false;
                    this.diag('Missing ' + arguments[i] + ' method');
                }
            } else {
                pass = false;
                this.diag('Missing ' + arguments[i] + ' method');
            }
        }
        desc += ' ' + arguments[i];
    }
    desc += ' ]';
    this._pass_if(function(){
	    return pass;
    }, desc);

}

/*

=head2 throws_ok()

    t.throws_ok(func, /regex/);

Tests that the function throws an exception matching the regex. If the first argument is not a function it throws and exception.

=cut

*/

// exception tests
Test.TAP.prototype.throws_ok = function(func, msg) {
    var errormsg = ' ';
    if (typeof func != 'function')
        this.diag('throws_ok needs a function to run');
    
    try {
        func();
    }
    catch(err) {
        errormsg = err+'';
    }
    this.like(errormsg, msg, 'code threw [' + errormsg + '] expected: [' + msg + ']');
}

Test.TAP.prototype.dies_ok = function(func) {
    var errormsg = ' ';
    var msg = false;
    if (typeof func != 'function')
        this.diag('throws_ok needs a function to run');
    
    try {
        func();
    }
    catch(err) {
        errormsg = err+'';
        msg = true;
    }
    this.ok(msg, 'code died with [' + errormsg + ']');
}

Test.TAP.prototype.lives_ok = function(func, msg) {
    var errormsg = true;
    if (typeof func != 'function')
        this.diag('throws_ok needs a function to run');
    
    try {
        func();
    }
    catch(err) {
        errormsg = false;
    }
    this.ok(errormsg, msg);
}



/*

=head1 SEE ALSO

L<Test.Simple>
L<Test.AnotherWay>

=head1 AUTHOR

Jeremy Wall L<< jeremy@marzhillstudios.com >>

=head1 COPYRIGHT AND LICENSE

Copyright (C) 2007 Jeremy Wall

This library is free software; you can redistribute it and/or modify
it under the same terms as Perl itself, either Perl version 5.8.4 or,
at your option, any later version of Perl 5 you may have available.

=cut

*/

