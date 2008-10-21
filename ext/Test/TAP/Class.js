if (typeof Test == 'undefined') {
    Test = {};
}
if (typeof Test.TAP == 'undefined') {
    if (typeof JSAN != 'undefined') {
        JSAN.use('Test.TAP');
    } else {
        throw new ReferenceError('Test.TAP.Runner is dependent on Test.TAP');
    }
}

/*

=head1 NAME

    Test.TAP.Runner - A Simple Test Harness for Test.TAP

=head1 Synopsis

    var r = new Test.TAP.Runner().
    
    var testobj = {};
    testobj.runtests = function() {
        var t = new Test.TAP();
        t.plan(2);
        t.ok(true, 'true is true');
        t.is(1, 1, 'one is one');
        return t;
    }
    r.run_tests(obj);
=cut

*/

Test.TAP.Class = function() {
    var self = this;
    // call our superclasses constructor as well
    Test.TAP.apply(self, arguments);
};

/*

=head1 Methods

=head2 out()

internal method inherited from L<Test.TAP> see L<Test.TAP> for useage

=cut

=head2 diag()

internal method inherited from L<Test.TAP> see L<Test.TAP> for useage

=cut

=head2 run_it()

runs the tests in a test object and reports on the results

=cut

*/

Test.TAP.Class.prototype = new Test.TAP();

Test.TAP.Class.prototype.run_it = function(method) {
    var self = this;
    var fun = self[method];
    self.diag("trying to run "+method+" tests");
    try {
        if (typeof this.setup == 'function') {
            self.setup();
        }
        fun.call(self);
        if (typeof this.teardown == 'function') {
            self.teardown();
        }
    }
    catch(err) {
        this.diag("Test Suite Crashed!!! (" + err + ")");
    }
};

/*

=head2 run_tests()

    r.run_tests(obj1, obj2);

runs the tests in a list of test objects and reports on the results

=cut

*/

Test.TAP.Class.prototype.run_tests = function() {
    var self = this;
    var counter = 0;
    
    var methods = [];
    for (m in self) {
        if (m.match(/^test.+/)) {
            methods.push(m)
        }
    }
    
    this.finished = true;
    
    var onFinish = function () {
        if (self.planned > self.counter) {
            self.diag('looks like you planned ' + self.planned + ' tests but only ran '
            + self.counter + ' tests');
        } else if (self.planned < self.counter) {
            self.diag('looks like you planned ' + self.planned + ' tests but ran '
            + (self.counter - self.planned) + ' tests extra');
        }
        self.diag('ran ' + self.counter + ' tests out of ' + self.planned);
        self.diag('passed ' + self.passed + ' tests out of ' + self.planned)
        self.diag('failed ' + self.failed + ' tests out of ' + self.planned)
    }
    
    var count = 0;
    var testRunInterval
    if (typeof setInterval == 'undefined') {
        setInterval = function() {
        };
    }
    if (typeof clearInterval == 'undefined') {
        clearInterval = function() {
        }
    }
    var run = function () {
        if(self.finished) {
            if(count > 0) {
                if(self.on_finished) {
                    onFinish()
                    self.on_finished()
                }
            }
            if(methods.length == 0) {
                clearInterval(testRunInterval)
                if(self.on_finished_all) {
                    self.on_finished_all()
                }
            } else {
                self.finished = false;
            }
        } else {
            if(self.planned == "no_plan" || self.planned == 0 || self.counter >= self.planned) {
                self.finished = true
            }
        }
    };
    testRunInterval = setInterval(run, 10)
    run();
    var methodname;
    while (methodname = methods.shift()) {
        self.run_it(methodname);
        count++
    }
    
    return self;
};

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
