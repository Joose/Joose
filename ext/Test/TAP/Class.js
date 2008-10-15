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
    self.plan('no_plan');
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
        fun.call(self);
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
    for (m in self) {
        if (m.match(/^test.+/)) {
            this.run_it(m);
        }
    }
    if (self.planned > self.counter) {
        self.diag('looks like you planned ' + self.planned + ' tests but only ran '
        + self.counter + ' tests');
    } else if (self.planned < self.counter) {
        self.diag('looks like you planned ' + self.planned + ' tests but ran '
        + (self.counter - self.planned) + ' tests extra');
    }
    this.diag('ran ' + self.counter + ' tests out of ' + self.planned);
    this.diag('passed ' + self.passed + ' tests out of ' + self.planned)
    this.diag('failed ' + self.failed + ' tests out of ' + self.planned)
    return self.tests;
};
